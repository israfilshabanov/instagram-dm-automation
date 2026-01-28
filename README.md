# Instagram DM Otomasyonu (ManyChat + OpenAI GPT-4)

Instagram DM mesajlarını **ManyChat** ve **OpenAI GPT-4** kullanarak otomatik yanıtlayan bir sistem.

## 🏗️ Proje Yapısı

```
├── backend/          # Node.js/Express API (TypeScript)
│   ├── src/index.ts  # Ana sunucu dosyası
│   └── dist/         # Derlenmiş JS dosyaları
├── frontend/         # React Admin Paneli (Vite + TypeScript)
│   └── src/          # React bileşenleri
├── docs/             # Proje dokümantasyonu
└── memory-bank/      # Proje hafızası ve notlar
```

## 🚀 Hızlı Başlangıç

### Backend (Node.js)

```bash
cd backend
npm install
cp .env.example .env  # .env dosyasını oluştur ve değerleri gir
npm run build         # TypeScript derle
npm start             # Sunucuyu başlat (production)
npm run dev           # Geliştirme modu
```

### Frontend (React)

```bash
cd frontend
npm install
cp .env.example .env  # API URL'yi ayarla
npm run dev           # Geliştirme sunucusu (http://localhost:5173)
npm run build         # Production build
```

## ⚙️ Environment Variables

### Backend (`backend/.env`)
| Değişken | Açıklama |
|----------|----------|
| `OPENAI_API_KEY` | OpenAI API anahtarı |
| `MANYCHAT_API_KEY` | ManyChat API anahtarı (Pro hesap) |
| `MANYCHAT_FLOW_NS` | ManyChat "Send AI Response" flow ID |
| `PORT` | Sunucu portu (varsayılan: 3000) |

### Frontend (`frontend/.env`)
| Değişken | Açıklama |
|----------|----------|
| `VITE_API_URL` | Backend API URL'si |

## 📡 API Endpoints

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/` | Sunucu durumu |
| GET | `/health` | Health check |
| POST | `/webhook` | ManyChat webhook (DM alır) |
| POST | `/admin/savePrompt` | Sistem promptunu kaydet |
| POST | `/admin/testPrompt` | AI cevabını test et |

## 🌐 Deployment

### Backend → Railway
1. Railway'de yeni proje oluştur
2. GitHub reposunu bağla (`backend` klasörü)
3. Environment variables ekle
4. Deploy et → URL'yi al

### Frontend → Netlify
1. Netlify'da yeni site oluştur
2. GitHub reposunu bağla (`frontend` klasörü)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Environment variables ekle (`VITE_API_URL`)

## 📋 Gereksinimler

- Node.js 18+
- OpenAI API Key
- ManyChat Pro Hesabı
- Railway hesabı (backend için)
- Netlify hesabı (frontend için)

## 📄 Lisans

MIT
