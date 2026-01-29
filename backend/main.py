from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import httpx
from openai import OpenAI

# Çevresel değişkenleri yükle
load_dotenv()

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

class PromptPayload(BaseModel):
    prompt: str

class TestPayload(BaseModel):
    message: str

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
    global current_system_prompt
    try:
        completion = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": current_system_prompt},
                {"role": "user", "content": user_message}
            ],
            temperature=0.7
        )
        reply = completion.choices[0].message.content or "Üzgünüm, şu an cevap veremiyorum."
        print(f"[OpenAI] Cevap: {reply}")
        await send_to_manychat(subscriber_id, reply)
    except Exception as e:
        print(f"İşlem Hatası: {e}")

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
def save_prompt(payload: PromptPayload):
    global current_system_prompt
    current_system_prompt = payload.prompt
    print(f"Sistem Promptu Güncellendi: {current_system_prompt}")
    return {"status": "success", "message": "Prompt güncellendi"}

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
