import requests
import json

url = "https://instagram-dm-automation-production.up.railway.app/admin/savePrompt"

brief_data = {
    "briefData": {
        "businessName": "Shabanov Sport Academy ",
        "businessDescription": "Shabanov Sport Academy — Gəncədə fəaliyyət göstərən peşəkar idman akademiyası.\nBurada uşaqlar və gənclər üçün fiziki inkişaf, özünü müdafiə və sağlam həyat tərzi əsasdır.\nMəqsədimiz təkcə idman öyrətmək deyil, güc, intizam və qalib ruhunu formalaşdırmaqdır 💪",
        "yearsInBusiness": "8 il",
        "mission": "Sağlam, güclü və özünə inanan nəsil yetişdirmək.\nİdman vasitəsilə intizam, hörmət və qalib ruhunu aşılamaq, hər bir üzvün potensialını maksimum səviyyəyə çatdırmaq.",
        "coreValues": "Peşəkarlıq Təhlükəsizlik İntizam Daimi inkişaf Qalib ruh",
        "servicesList": "1️⃣ Döyüş və Özünü Müdafiə\nÖzünü Müdafiə – real həyat situasiyalarında təhlükəsizliyi təmin edən texnikalar.\nMMA (Mixed Martial Arts) – əl–ayaq zərbələri, yer mübarizəsi, strategiya; tam döyüş bacarığı.\nGrappling – güləş və torba üzərində texnikalar; güc və çevikliyi artırır.\nSanda / Kung Fu döyüşü – sürət, çeviklik, koordinasiya və balans.\nÜmumi Fiziki Hazırlıq – dözümlülük, sürət, güc və koordinasiya üçün kompleks məşqlər.\nCore və Bədən Gücü – qarın, bel, ayaq və qol əzələlərini maksimum inkişaf etdirir.\nPlyometriya və Funksional Məşqlər – partlayıcı güc və sürət üçün.\nAkrobatika və Çeviklik – bədən nəzarəti, elastiklik və sosial bacarıqlar üçün.",
        "serviceDetails": "1️⃣Uşaqlar (5–11 yaş)\nMesaj:\nUşaqlar üçün:\nÖzünü Müdafiə\nAkrobatika və Çeviklik\nƏl–ayaq zərbələri & Güləş\nÜmumi Fiziki Hazırlıq\n\n2️⃣Gənclər (12–18 yaş)\nMesaj:\nGənclər üçün:\nMMA, Sanda, Grappling\nBədən gücü və çeviklik\nÖzünü Müdafiə & Taktiki hazırlıq\n\n3️⃣Fərdi / Professional / Biznes\nMesaj:\nFərdi / Professional üçün:\nSürət, çeviklik, dözümlülük\nGüc və pleyometriya\nFərdi məşq planı və peşəkar nəzarət\n\n✅Əlavə Xidmətlər\nMesaj:\nTurnir / Yarış Hazırlığı\nVIP & Fərdi Dərslər\nFitness + Döyüş paketləri\nSınaq dərsləri / Pulsuz ilk məşq\n",
        "hasTrialClass": "Bəli,ilk dərs və özünü yoxlama pulsuzdu",
        "groupVsIndividual": "(Həm qrup -hım vip personal) Özünü Müdafiə MMA Grappling Sanda Ümumi Fiziki Hazırlıq Akrobatika & Çeviklik Turnir / Yarış Hazırlığı Fərdi & VIP Məşqlər",
        "pricingDetails": "Ayliq:100 azn &12 məşq\nAyliq:80 azn   &8 məşq\nAyliq:60 azn   &4 məşq\nFərdi:1/dərs 30azn ",
        "subscriptionPlans": "3 ay 250azn qrup",
        "packageDiscounts": "",
        "familyDiscounts": "2-ci üzvə 15% endirim",
        "paymentMethods": "Nəgd,kart",
        "priceResponsePolicy": "Ayliq qrup məşqlər 100 azn\nFərdi 250 azn dən başlayir",
        "workingDays": "2-4-6 ci günlər ",
        "workingHours": "18:00-19:30 19:30-21:00 Fərdi məşqlər isə uygun vaxtina salinir",
        "holidaySchedule": "Nadir halarda",
        "mainAddress": "Binəqədi.r Səttar bəhlulzadə 101\n2 nömrəli məktəb\n102 nomrəli məktəb",
        "directionsInfo": "Gənclik metrodan Ayna Sultanova parta qedən marşrutlat  ilə",
        "otherBranches": "Gənclik Ayna Sultanova",
        "onlineServices": "Zoom ilə fərdi dəslər",
        "phoneNumber": "+994775479747  +994512353986",
        "email": "İsrafisbanov@gmail.com",
        "website": "",
        "socialMedia": "Coach_shabanov\nİsrafil Şabanov",
        "registrationProcess": "WhatsApp 0775479747\nZəng nömrə 0512353986",
        "faq": "Qiymət ayliq 80azn 8 məşq 100 azn 12 məşq\nFərdi/vip ayliq 250 azn 12 məşq\nİlk sinaq dərs pulsuz",
        "preferredLanguage": "Azərbaycan dili Rus dili",
        "communicationStyle": "Səmimi ",
        "useEmojis": "Mativasion",
        "responseLength": "Qisa və konkret",
        "mentionCompetitors": "Xeyr",
        "exactPricing": "Tam dəqiqliyi telefon və ya WhatsApp ilə öyrənmək daha məsləhət ",
        "topicsToAvoid": "Siyasət,din,şəxsi həyat",
        "urgentCases": "+994512353986",
        "complaintHandling": "Üzür istəyorəm menecerə yonlətsin"
    }
}

print("Shabanov Sport Academy - Dijital İkiz Oluşturuluyor...")
print("=" * 50)

try:
    response = requests.post(url, json=brief_data, timeout=120)
    print(f"Status Code: {response.status_code}")
    print(f"Response Text: {response.text[:500] if response.text else 'BOŞ'}")
    
    if response.status_code == 200:
        result = response.json()
        if result.get("success"):
            print("✅ UĞURLU! Dijital ikiz oluşturuldu!")
            print("\n" + "=" * 50)
            print("OLUŞTURULAN SİSTEM PROMPTU:")
            print("=" * 50)
            print(result.get("generatedPrompt", "")[:2000])
        else:
            print("❌ XƏTA:", result)
    else:
        print(f"❌ HTTP Xəta: {response.status_code}")
except Exception as e:
    print(f"❌ Bağlantı xətası: {e}")
