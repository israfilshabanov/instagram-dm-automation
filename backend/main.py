from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import RealDictCursor
import os
import json
import httpx
from openai import OpenAI

# Çevresel değişkenleri yükle
load_dotenv()

# Supabase PostgreSQL bağlantısı
DATABASE_URL = os.getenv("DATABASE_URL", "")

app = FastAPI(
    title="Instagram DM Automation API",
    description="ManyChat + OpenAI GPT-4 Entegrasyon Backend'i",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenAI Client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Global sistem prompt
current_system_prompt = """Sən peşəkar bir Instagram asistentisən.

DİL QAYDALARI:
- Defolt olaraq Azərbaycan dilində cavab ver.
- İstifadəçi hansı dildə yazırsa, o dildə cavab ver (Türk dilində yazırsa Türkcə, Rus dilində yazırsa Rusca).
- Əgər dil aydın deyilsə, Azərbaycan dilində cavab ver.

DAVRANIS QAYDALARI:
- İstifadəçilərin suallarına nəzakətli, qısa və yardımsevər cavablar ver.
- Linkləri aça bilmirsən. Qiymət soruşularsa "Ətraflı məlumat üçün veb saytımızı ziyarət edin" de.
- Həmişə dostcanlı və peşəkar ol."""

# --- Pydantic Models ---
class WebhookPayload(BaseModel):
    id: int  # ManyChat contact ID
    last_input_text: str  # Kullanıcının son mesajı
    
    class Config:
        extra = "ignore"  # Ekstra alanları yoksay

class ServiceGroup(BaseModel):
    """Xidmət qrupu modeli"""
    serviceName: Optional[str] = ""  # Xidmət adı
    ageGroups: Optional[str] = ""  # Yaş qrupları (məs: 6-12, 13-18, böyüklər)
    schedule: Optional[str] = ""  # Cədvəl (məs: B.e-Cümə 18:00-20:00)
    levels: Optional[str] = ""  # Səviyyələr (başlanğıc, orta, qabaqcıl)
    maxParticipants: Optional[str] = ""  # Maksimum iştirakçı sayı
    price: Optional[str] = ""  # Qiymət

class BriefData(BaseModel):
    """Tam işletmə profili - 40 sual bazasında"""
    
    # BÖLÜM 1: ƏSAS MƏLUMATLAR
    businessName: str  # 1. İşletmənin rəsmi adı
    businessDescription: Optional[str] = ""  # 2. Qısa təsvir
    yearsInBusiness: Optional[str] = ""  # 3. Neçə ildir fəaliyyət göstərir
    mission: Optional[str] = ""  # 4. Missiya
    coreValues: Optional[str] = ""  # 5. Əsas dəyərlər
    
    # BÖLÜM 2: XİDMƏTLƏR VƏ QRUPLAR
    servicesList: Optional[str] = ""  # 6. Xidmətlər siyahısı
    serviceDetails: Optional[str] = ""  # 7-12. Yaş qrupları, cədvəl, səviyyələr (JSON string)
    hasTrialClass: Optional[str] = ""  # Sınaq dərsi varmı?
    groupVsIndividual: Optional[str] = ""  # Qrup/fərdi dərslər
    
    # BÖLÜM 3: QİYMƏTLƏR
    pricingDetails: Optional[str] = ""  # 13. Qiymət cədvəli
    subscriptionPlans: Optional[str] = ""  # 14. Aylıq abunə
    packageDiscounts: Optional[str] = ""  # 15. Paket endirimləri
    familyDiscounts: Optional[str] = ""  # 16. Ailə/qrup endirimi
    paymentMethods: Optional[str] = ""  # 17. Ödəniş üsulları
    priceResponsePolicy: Optional[str] = ""  # 18. Qiymət soruşanda nə cavab verilsin?
    
    # BÖLÜM 4: İŞ SAATLARI VƏ MƏKAN
    workingDays: Optional[str] = ""  # 19. İş günləri
    workingHours: Optional[str] = ""  # 20. İş saatları
    holidaySchedule: Optional[str] = ""  # 21. Bayram günləri
    mainAddress: Optional[str] = ""  # 22. Əsas ünvan
    directionsInfo: Optional[str] = ""  # 23. Necə gəlmək olar
    otherBranches: Optional[str] = ""  # 24. Digər filiallar
    onlineServices: Optional[str] = ""  # 25. Onlayn xidmət
    
    # BÖLÜM 5: ƏLAQƏ VƏ QEYDİYYAT
    phoneNumber: Optional[str] = ""  # 26. Telefon (WhatsApp)
    email: Optional[str] = ""  # 27. Email
    website: Optional[str] = ""  # 28. Veb sayt
    socialMedia: Optional[str] = ""  # 29. Sosial media
    registrationProcess: Optional[str] = ""  # 30. Qeydiyyat prosesi
    
    # BÖLÜM 6: TƏZ-TƏZ SORUŞULAN SUALLAR
    faq: Optional[str] = ""  # 31. SSS və cavablar
    
    # BÖLÜM 7: ÜSLİP VƏ DİL
    preferredLanguage: Optional[str] = "Azərbaycan dili"  # 32. Dil
    communicationStyle: Optional[str] = ""  # 33. Rəsmi/samimi
    useEmojis: Optional[str] = ""  # 34. Emoji istifadəsi
    responseLength: Optional[str] = ""  # 35. Qısa/ətraflı cavablar
    
    # BÖLÜM 8: MƏHDUDIYYƏTLƏR
    mentionCompetitors: Optional[str] = ""  # 36. Rəqiblərdən danışılsınmı
    exactPricing: Optional[str] = ""  # 37. Dəqiq qiymət verilsinmi
    topicsToAvoid: Optional[str] = ""  # 38. Qaçınılacaq mövzular
    urgentCases: Optional[str] = ""  # 39. Təcili hallar
    complaintHandling: Optional[str] = ""  # 40. Şikayət idarəetməsi

class BriefPayload(BaseModel):
    briefData: BriefData

class PromptPayload(BaseModel):
    prompt: str

class TestPayload(BaseModel):
    message: str


# --- Database Functions (Supabase PostgreSQL with psycopg2) ---
def get_db_connection():
    """Veritabanı bağlantısı al"""
    if not DATABASE_URL:
        return None
    try:
        return psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    except Exception as e:
        print(f"Veritabanı bağlantı hatası: {e}")
        return None

def init_database():
    """Veritabanı bağlantısını kontrol et"""
    if not DATABASE_URL:
        print("DATABASE_URL tanımlı değil!")
        return
    
    conn = get_db_connection()
    if conn:
        print("Veritabanı bağlantısı başarılı!")
        conn.close()

def load_config_sync():
    """Supabase'den config yükle (sync)"""
    if not DATABASE_URL:
        return {}
    
    conn = get_db_connection()
    if not conn:
        return {}
    
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT key, value FROM config")
            rows = cur.fetchall()
            config = {}
            for row in rows:
                config[row['key']] = json.loads(row['value'])
            return config
    except Exception as e:
        print(f"Config yükleme hatası: {e}")
        return {}
    finally:
        conn.close()

def save_config_sync(data: dict):
    """Config'i Supabase'e kaydet (sync)"""
    if not DATABASE_URL:
        print("DATABASE_URL tanımlı değil - config kaydedilemedi!")
        return
    
    conn = get_db_connection()
    if not conn:
        return
    
    try:
        with conn.cursor() as cur:
            for key, value in data.items():
                json_value = json.dumps(value, ensure_ascii=False)
                # UPSERT - varsa güncelle, yoksa ekle
                cur.execute("""
                    INSERT INTO config (key, value, updated_at) 
                    VALUES (%s, %s, CURRENT_TIMESTAMP)
                    ON CONFLICT (key) 
                    DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP
                """, (key, json_value))
            conn.commit()
        print(f"Config Supabase'e kaydedildi!")
    except Exception as e:
        print(f"Config kaydetme hatası: {e}")
        conn.rollback()
    finally:
        conn.close()

def generate_prompt_with_ai(brief: BriefData) -> str:
    """Brief data'dan doğrudan sistem promptu oluştur - tüm bilgiler dahil"""
    
    # Doğrudan tüm bilgileri içeren şablon - AI özet yapmaz, bilgi uyduramaz
    return f"""Sən {brief.businessName} üçün peşəkar AI asistentisən - işletmənin DİJİTAL İKİZİsən.
Instagram DM-lərdə müştərilərə cavab verirsən. Aşağıdakı məlumatları ƏZBƏR bilirsən və YALNIZ bu məlumatları istifadə edirsən.

════════════════════════════════════════
🏢 İŞLƏTMƏ HAQQINDA
════════════════════════════════════════
Ad: {brief.businessName}
Təsvir: {brief.businessDescription}
Fəaliyyət müddəti: {brief.yearsInBusiness}
Missiya: {brief.mission}
Əsas dəyərlər: {brief.coreValues}

════════════════════════════════════════
🎯 XİDMƏTLƏR
════════════════════════════════════════
{brief.servicesList}

Yaş qrupları və detallar:
{brief.serviceDetails}

Sınaq dərsi: {brief.hasTrialClass}
Qrup/Fərdi: {brief.groupVsIndividual}

════════════════════════════════════════
💰 QİYMƏTLƏR (DƏQİQ MƏLUMAT)
════════════════════════════════════════
{brief.pricingDetails}

Abunə planları: {brief.subscriptionPlans}
Ailə endirimi: {brief.familyDiscounts}
Ödəniş üsulları: {brief.paymentMethods}

⚠️ Qiymət soruşanda: {brief.priceResponsePolicy}

════════════════════════════════════════
🕐 İŞ SAATLARI
════════════════════════════════════════
İş günləri: {brief.workingDays}
İş saatları: {brief.workingHours}
Bayramlar: {brief.holidaySchedule}

════════════════════════════════════════
📍 MƏKAN VƏ ÜNVAN
════════════════════════════════════════
Əsas ünvan: {brief.mainAddress}
Gəliş yolu: {brief.directionsInfo}
Filiallar: {brief.otherBranches}
Onlayn xidmət: {brief.onlineServices}

════════════════════════════════════════
📞 ƏLAQƏ MƏLUMATLARI (ÇOX VACİB!)
════════════════════════════════════════
Telefon: {brief.phoneNumber}
Email: {brief.email}
Sosial media: {brief.socialMedia}
Qeydiyyat: {brief.registrationProcess}

⚠️ TƏCİLİ HALLARDA: {brief.urgentCases}

════════════════════════════════════════
❓ TƏZ-TƏZ SORUŞULAN SUALLAR
════════════════════════════════════════
{brief.faq}

════════════════════════════════════════
🗣️ CAVAB VERMƏ QAYDALARI
════════════════════════════════════════
Dil: {brief.preferredLanguage}
Üslub: {brief.communicationStyle}
Emoji istifadəsi: {brief.useEmojis}
Cavab uzunluğu: {brief.responseLength}

════════════════════════════════════════
🚫 MƏHDUDIYYƏTLƏR
════════════════════════════════════════
- Rəqiblər haqqında: {brief.mentionCompetitors}
- Qaçınılacaq mövzular: {brief.topicsToAvoid}
- Şikayət idarəetməsi: {brief.complaintHandling}
- Linkləri aça bilmirsən - əlaqə məlumatlarını paylaş
- Bilmədiyin şeyi UYDURMA - "Dəqiq məlumat üçün bizimlə əlaqə saxlayın" de

════════════════════════════════════════
⚡ KRİTİK QAYDALAR
════════════════════════════════════════
1. YALNIZ yuxarıdakı məlumatları istifadə et
2. Telefon soruşanda HƏMIŞƏ bu nömrələri ver: {brief.phoneNumber}
3. Ünvan soruşanda HƏMIŞƏ bu ünvanı ver: {brief.mainAddress}
4. Qiymət soruşanda dəqiq qiymətləri ver, sonra əlaqə saxlamağı məsləhət gör
5. HEÇ VAXT məlumat UYDURMA - bilmirsənsə əlaqə nömrəsini ver
6. Həmişə {brief.communicationStyle} ol və {brief.useEmojis} emoji istifadə et"""

# --- Helper Functions ---
async def send_to_manychat(subscriber_id: str, message: str):
    manychat_key = os.getenv("MANYCHAT_API_KEY")
    flow_ns = os.getenv("MANYCHAT_FLOW_NS")
    
    if not manychat_key:
        print("ManyChat API Key eksik!")
        return
    
    headers = {
        "Authorization": f"Bearer {manychat_key}",
        "Content-Type": "application/json"
    }
    
    async with httpx.AsyncClient() as http:
        try:
            # Adım 1: Custom Field güncelle (setCustomFieldByName kullan)
            field_response = await http.post(
                "https://api.manychat.com/fb/subscriber/setCustomFieldByName",
                json={
                    "subscriber_id": int(subscriber_id),
                    "field_name": "AI_Response",
                    "field_value": message
                },
                headers=headers
            )
            print(f"[ManyChat] Field güncellendi: {subscriber_id}")
            print(f"[ManyChat] Field Response: {field_response.text}")
            
            # Adım 2: Flow tetikle (eğer flow_ns varsa)
            if flow_ns:
                flow_response = await http.post(
                    "https://api.manychat.com/fb/sending/sendFlow",
                    json={
                        "subscriber_id": int(subscriber_id),
                        "flow_ns": flow_ns
                    },
                    headers=headers
                )
                print(f"[ManyChat] Flow tetiklendi: {subscriber_id}")
                print(f"[ManyChat] Flow Response: {flow_response.text}")
        except Exception as e:
            print(f"ManyChat API Hatası: {e}")


async def process_webhook(subscriber_id: str, user_message: str):
    """
    Webhook işlemi - GPT-4o ile cache desteği
    NOT: Human Takeover ManyChat tarafından otomatik yönetilir
         Sahip Live Chat açtığında ManyChat botu otomatik durdurur
    """
    global current_system_prompt
    
    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",  # 2.5M token/gün ücretsiz + Prompt Caching
            messages=[
                {"role": "system", "content": current_system_prompt},
                {"role": "user", "content": user_message}
            ],
            temperature=0.7
        )
        reply = completion.choices[0].message.content or "Üzr istəyirəm, hazırda cavab verə bilmirəm."
        print(f"[OpenAI] Cevap: {reply}")
        
        # Cache bilgisi
        if hasattr(completion, 'usage') and completion.usage:
            cached = getattr(completion.usage, 'prompt_tokens_details', {})
            if cached:
                print(f"[OpenAI Cache] {cached}")
        
        await send_to_manychat(subscriber_id, reply)
    except Exception as e:
        print(f"İşlem Hatası: {e}")

# --- Startup Event ---
@app.on_event("startup")
def startup_event():
    global current_system_prompt
    # Veritabanı bağlantısını test et
    init_database()
    # Kayıtlı config'i yükle
    config = load_config_sync()
    if config.get("systemPrompt"):
        current_system_prompt = config["systemPrompt"]
        print(f"Kayıtlı sistem promptu yüklendi: {current_system_prompt[:50]}...")

# --- Routes ---
@app.get("/")
def read_root():
    return {"message": "Instagram DM Otomasyonu API Çalışıyor (Python/FastAPI)"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/webhook")
async def webhook(payload: WebhookPayload, background_tasks: BackgroundTasks):
    print(f"Webhook Payload: {payload}")
    background_tasks.add_task(process_webhook, str(payload.id), payload.last_input_text)
    return {"status": "received"}

@app.post("/admin/savePrompt")
def save_prompt(payload: BriefPayload):
    global current_system_prompt
    
    brief = payload.briefData
    print(f"Brief alındı: {brief.businessName}")
    
    # AI ile sistem promptu oluştur
    generated_prompt = generate_prompt_with_ai(brief)
    current_system_prompt = generated_prompt
    
    # Config'i Supabase'e kaydet (brief + prompt)
    config = {
        "briefData": brief.model_dump(),
        "systemPrompt": generated_prompt
    }
    save_config_sync(config)
    
    print(f"Sistem Promptu Güncellendi: {current_system_prompt[:100]}...")
    return {
        "success": True, 
        "message": "Dijital ikiz oluşturuldu",
        "generatedPrompt": generated_prompt
    }

@app.post("/admin/testPrompt")
def test_prompt(payload: TestPayload):
    global current_system_prompt
    try:
        completion = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": current_system_prompt},
                {"role": "user", "content": payload.message}
            ],
            temperature=0.7
        )
        return {"reply": completion.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

