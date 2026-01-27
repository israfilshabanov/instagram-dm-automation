# Instagram DM Otomasyonu (ManyChat + OpenAI)

Bu proje, Instagram DM mesajlarını ManyChat ve OpenAI GPT-4 kullanarak otomatik yanıtlamak için geliştirilmiştir.

## Proje Yapısı

-   **`/backend`**: Python (FastAPI) tabanlı sunucu. ManyChat webhook'larını karşılar ve OpenAI ile konuşur.
-   **`/frontend`**: React (TypeScript) tabanlı Admin Paneli. Sistem promptunu ve ayarları yönetir.
-   **`/memory-bank`**: Proje dokümantasyonu ve hafızası.

## Kurulum

### Backend (Python)

1.  `cd backend`
2.  Sanal ortam oluşturun: `python -m venv venv`
3.  Aktif edin: `venv\Scripts\activate` (Windows)
4.  Bağımlılıkları yükleyin: `pip install -r requirements.txt`
5.  Başlatın: `uvicorn main:app --reload`

### Frontend (React)

1.  `cd frontend`
2.  Paketleri yükleyin: `npm install`
3.  Başlatın: `npm run dev`

## Gereksinimler

-   Python 3.10+
-   Node.js 18+
-   OpenAI API Key
-   ManyChat Pro Hesabı
