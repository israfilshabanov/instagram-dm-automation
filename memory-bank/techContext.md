# Teknik Bağlam (Technical Context)

## Teknoloji Yığını (Tech Stack)
-   **Backend Dili:** Node.js 18+ (TypeScript)
    -   *Framework:* Express.js
    -   *Runtime:* Node.js
-   **Frontend (Admin):** React (TypeScript)
    -   *Build Aracı:* Vite
-   **AI Motoru:** OpenAI GPT-4 API
-   **Platform:** Instagram Automation by ManyChat
-   **Hosting (Planlanan):**
    -   Backend: Railway
    -   Frontend: Netlify

## Geliştirme Ortamı
-   **IDE:** Google Antigravity IDE (VS Code uyumlu)
-   **Paket Yöneticisi:** `npm` (her iki taraf için)
-   **Versiyon Kontrol:** Git

## Temel Bağımlılıklar (Backend)
-   `express`: Web sunucusu.
-   `dotenv`: Çevresel değişkenler.
-   `openai`: OpenAI Node.js SDK.
-   `axios`: HTTP istekleri (ManyChat API için).
-   `cors`: Admin paneli erişimi için.
-   `typescript`, `ts-node`, `@types/*`: Tip güvenliği ve geliştirme araçları.

## Konfigürasyon
-   **Çevresel Değişkenler (Environment Variables):**
    -   `OPENAI_API_KEY`: GPT-4 için gizli anahtar.
    -   `MANYCHAT_API_KEY`: ManyChat Public API için Bearer token.
    -   `MANYCHAT_FLOW_NS`: "Send AI Response" akışının Namespace ID'si.
    -   `PORT`: Sunucu portu (3000).
    -   `ADMIN_PASSWORD`: Admin Paneli şifresi.
