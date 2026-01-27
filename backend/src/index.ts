import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { OpenAI } from 'openai';
import axios from 'axios';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// OpenAI İstemcisi
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

// --- Helper Functions ---

// 1. Sistem Promptu Üretici (Şimdilik sabit, sonra Admin Panel'den dinamik olacak)
const generateSystemPrompt = (): string => {
    return `Sen profesyonel bir Instagram asistanısın. 
  Kullanıcıların sorularına nazik, kısa ve yardımsever cevaplar ver.
  Dil: Kullanıcının dili veya Türkçe/Azerice.
  Linkleri açamazsın. Fiyat sorulursa "Detaylı bilgi için web sitemizi ziyaret edin" de.`;
};

// 2. ManyChat'e Cevap Gönderme (2 Adımlı: Set Field + Send Flow)
const sendToManyChat = async (subscriberId: string, message: string) => {
    const manychatKey = process.env.MANYCHAT_API_KEY;
    const flowNs = process.env.MANYCHAT_FLOW_NS;

    if (!manychatKey || !flowNs) {
        console.error('ManyChat API Key veya Flow NS eksik!');
        return;
    }

    try {
        // Adım 1: Özel Alanı Güncelle (AI_Response)
        await axios.post(
            'https://api.manychat.com/fb/subscriber/setCustomField',
            {
                subscriber_id: subscriberId,
                field_name: 'AI_Response',
                field_value: message,
            },
            {
                headers: {
                    Authorization: `Bearer ${manychatKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(`[ManyChat] Field güncellendi: ${subscriberId}`);

        // Adım 2: Akışı Tetikle
        await axios.post(
            'https://api.manychat.com/fb/sending/sendFlow',
            {
                subscriber_id: subscriberId,
                flow_ns: flowNs,
            },
            {
                headers: {
                    Authorization: `Bearer ${manychatKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(`[ManyChat] Flow tetiklendi: ${subscriberId}`);
    } catch (error: any) {
        console.error('ManyChat API Hatası:', error.response?.data || error.message);
    }
};

// --- Routes ---

app.get('/', (req: Request, res: Response) => {
    res.send({ message: 'Instagram DM Otomasyonu API (Node.js) Çalışıyor' });
});

app.get('/health', (req: Request, res: Response) => {
    res.send({ status: 'ok' });
});

// ManyChat Webhook Endpoint
app.post('/webhook', async (req: Request, res: Response) => {
    const body = req.body;
    console.log('Webhook Payload:', JSON.stringify(body, null, 2));

    // ManyChat'ten gelen verileri al
    // Not: ManyChat "External Request" ile body'yi biz belirleriz.
    // Beklenen format: { "subscriber_id": "...", "message": "..." }
    const subscriberId = body.subscriber_id;
    const userMessage = body.message;

    if (!subscriberId || !userMessage) {
        res.status(400).send({ error: 'Eksik parametreler (subscriber_id, message)' });
        return;
    }

    // 1. ManyChat'e hemen 200 OK dön (Zaman aşımını önlemek için)
    res.status(200).send({ status: 'received' });

    // 2. Asenkron İşlemler (Arka planda çalışır)
    (async () => {
        try {
            // OpenAI'den cevap al
            // const systemPrompt = generateSystemPrompt(); // Eski statik çağrı

            const completion = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: currentSystemPrompt }, // Dinamik prompt kullanımı
                    { role: 'user', content: userMessage },
                ],
                temperature: 0.7,
            });

            const replyText = completion.choices[0].message?.content || 'Üzgünüm, şu an cevap veremiyorum.';
            console.log(`[OpenAI] Cevap: ${replyText}`);

            // ManyChat'e gönder
            await sendToManyChat(subscriberId, replyText);

        } catch (error: any) {
            console.error('İşlem Hatası:', error.message);
            // Opsiyonel: Hata durumunda ManyChat'e "Sistem meşgul" mesajı gönderilebilir.
        }
    })();
});

// --- Admin API Routes ---

// Global prompt saklama (geçici - memory içi)
let currentSystemPrompt = `Sen profesyonel bir Instagram asistanısın. 
Kullanıcıların sorularına nazik, kısa ve yardımsever cevaplar ver.
Dil: Kullanıcının dili veya Türkçe/Azerice.
Linkleri açamazsın. Fiyat sorulursa "Detaylı bilgi için web sitemizi ziyaret edin" de.`;

app.post('/admin/savePrompt', (req: Request, res: Response) => {
    const { prompt } = req.body;
    if (prompt) {
        currentSystemPrompt = prompt;
        console.log('Sistem Promptu Güncellendi:', currentSystemPrompt);
        res.send({ status: 'success', message: 'Prompt güncellendi' });
    } else {
        res.status(400).send({ error: 'Prompt metni eksik' });
    }
});

app.post('/admin/testPrompt', async (req: Request, res: Response) => {
    const { message } = req.body;

    if (!message) {
        res.status(400).send({ error: 'Mesaj eksik' });
        return;
    }

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: currentSystemPrompt },
                { role: 'user', content: message },
            ],
            temperature: 0.7,
        });

        res.send({ reply: completion.choices[0].message?.content });
    } catch (error: any) {
        console.error('Test Hatası:', error.message);
        res.status(500).send({ error: error.message });
    }
});

// Güncellenmiş generateSystemPrompt fonksiyonu artık global değişkeni kullanmalı
// (Helper fonksiyonun üzerine yazıyoruz veya doğrudan değişkeni kullanıyoruz)
// Not: Aşağıdaki webhook handler içinde generateSystemPrompt() değil, doğrudan currentSystemPrompt kullanacağız.

app.listen(port, () => {
    console.log(`[server]: Sunucu http://localhost:${port} adresinde çalışıyor`);
});
