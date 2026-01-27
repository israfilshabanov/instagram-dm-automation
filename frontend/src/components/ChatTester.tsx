import React, { useState } from 'react';
import { testPrompt } from '../services/api';

interface Message {
    role: 'user' | 'ai';
    content: string;
}

const ChatTester: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput('');
        setLoading(true);

        try {
            const res = await testPrompt(userMsg);
            setMessages(prev => [...prev, { role: 'ai', content: res.reply || 'Cevap yok.' }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'ai', content: '❌ Hata: AI cevap veremedi.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3>Test Sohbeti</h3>
            <div style={{
                flex: 1,
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
                overflowY: 'auto',
                maxHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
            }}>
                {messages.length === 0 && <p style={{ color: '#666', textAlign: 'center' }}>Test mesajı gönderin...</p>}
                {messages.map((m, i) => (
                    <div key={i} style={{
                        alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                        background: m.role === 'user' ? 'var(--primary-color)' : '#334155',
                        padding: '0.5rem 1rem',
                        borderRadius: '12px',
                        maxWidth: '80%'
                    }}>
                        <strong>{m.role === 'user' ? 'Sen' : 'AI'}:</strong> {m.content}
                    </div>
                ))}
                {loading && <div style={{ alignSelf: 'flex-start', color: '#888' }}>yazıyor...</div>}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                    style={{ flex: 1 }}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Bir mesaj yazın..."
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                />
                <button
                    onClick={handleSend}
                    disabled={loading}
                    style={{
                        background: 'var(--secondary-color)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0 1.5rem'
                    }}
                >
                    Gönder
                </button>
            </div>
        </div>
    );
};

export default ChatTester;
