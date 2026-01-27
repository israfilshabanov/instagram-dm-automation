import React, { useState } from 'react';
import { savePrompt } from '../services/api';

const ProjectBrief: React.FC = () => {
    const [formData, setFormData] = useState({
        businessName: '',
        description: '',
        services: '',
        tone: '',
        faq: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const generatePrompt = () => {
        return `Sen ${formData.businessName || '[İşletme Adı]'} için profesyonel bir asistansın.
    
Hakkımızda: ${formData.description}
Hizmetler: ${formData.services}
Ton/Üslup: ${formData.tone}
Sık Sorulan Sorular: ${formData.faq}

Kullanıcıların sorularına bu bilgiler ışığında cevap ver. Linkleri açamazsın.`;
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const prompt = generatePrompt();
            await savePrompt(prompt);
            setMessage('✅ Ayarlar başarıyla kaydedildi!');
        } catch (error) {
            console.error(error);
            setMessage('❌ Kayıt başarısız oldu.');
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <div className="glass-panel" style={{ flex: 1 }}>
            <h3>Proje Özeti (Ayarlar)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    placeholder="İşletme Adı"
                    value={formData.businessName}
                    onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                />
                <textarea
                    placeholder="İşletme Tanımı ve Misyonu"
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
                <textarea
                    placeholder="Hizmetler / Ürünler"
                    rows={3}
                    value={formData.services}
                    onChange={e => setFormData({ ...formData, services: e.target.value })}
                />
                <input
                    placeholder="Tercih Edilen Dil ve Ton (Örn: Samimi, Azerice)"
                    value={formData.tone}
                    onChange={e => setFormData({ ...formData, tone: e.target.value })}
                />
                <textarea
                    placeholder="Sık Sorulan Sorular (Fiyat, Konum vb.)"
                    rows={3}
                    value={formData.faq}
                    onChange={e => setFormData({ ...formData, faq: e.target.value })}
                />

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        style={{
                            background: 'var(--primary-color)',
                            color: 'white',
                            border: 'none',
                            padding: '0.8rem 1.5rem',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Kaydediliyor...' : 'Kaydet ve Güncelle'}
                    </button>
                    {message && <span>{message}</span>}
                </div>
            </div>
        </div>
    );
};

export default ProjectBrief;
