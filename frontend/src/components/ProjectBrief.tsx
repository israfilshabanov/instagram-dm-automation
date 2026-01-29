import React, { useState } from 'react';
import { savePrompt, type BriefData } from '../services/api';

const ProjectBrief: React.FC = () => {
    const [activeSection, setActiveSection] = useState(0);
    const [formData, setFormData] = useState<BriefData>({
        // BÖLÜM 1: ƏSAS MƏLUMATLAR
        businessName: '',
        businessDescription: '',
        yearsInBusiness: '',
        mission: '',
        coreValues: '',
        // BÖLÜM 2: XİDMƏTLƏR VƏ QRUPLAR
        servicesList: '',
        serviceDetails: '',
        hasTrialClass: '',
        groupVsIndividual: '',
        // BÖLÜM 3: QİYMƏTLƏR
        pricingDetails: '',
        subscriptionPlans: '',
        packageDiscounts: '',
        familyDiscounts: '',
        paymentMethods: '',
        priceResponsePolicy: '',
        // BÖLÜM 4: İŞ SAATLARI VƏ MƏKAN
        workingDays: '',
        workingHours: '',
        holidaySchedule: '',
        mainAddress: '',
        directionsInfo: '',
        otherBranches: '',
        onlineServices: '',
        // BÖLÜM 5: ƏLAQƏ VƏ QEYDİYYAT
        phoneNumber: '',
        email: '',
        website: '',
        socialMedia: '',
        registrationProcess: '',
        // BÖLÜM 6: SSS
        faq: '',
        // BÖLÜM 7: ÜSLİP VƏ DİL
        preferredLanguage: 'Azərbaycan dili',
        communicationStyle: '',
        useEmojis: '',
        responseLength: '',
        // BÖLÜM 8: MƏHDUDIYYƏTLƏR
        mentionCompetitors: '',
        exactPricing: '',
        topicsToAvoid: '',
        urgentCases: '',
        complaintHandling: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [showPreview, setShowPreview] = useState(false);

    const handleChange = (field: keyof BriefData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (!formData.businessName.trim()) {
            setMessage('❌ İşletmə adı mütləqdir!');
            return;
        }
        
        setLoading(true);
        try {
            const response = await savePrompt(formData);
            if (response.generatedPrompt) {
                setGeneratedPrompt(response.generatedPrompt);
                setShowPreview(true);
            }
            setMessage('✅ Dijital ikiz uğurla yaradıldı!');
        } catch (error) {
            console.error(error);
            setMessage('❌ Xəta baş verdi.');
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(''), 5000);
        }
    };

    // 8 bölüm - hər biri öz sualları ilə
    const sections = [
        {
            title: '📋 Əsas Məlumatlar',
            fields: [
                { key: 'businessName', label: 'İşletmənin rəsmi adı *', placeholder: 'Məs: Mehman Kung Fu Academy', type: 'input' },
                { key: 'businessDescription', label: 'İşletmənizi bir cümlə ilə təsvir edin', placeholder: 'Məs: Gəncədə professional döyüş sənəti təlimləri...', type: 'textarea', rows: 2 },
                { key: 'yearsInBusiness', label: 'Neçə ildir fəaliyyət göstərirsiniz?', placeholder: 'Məs: 5 il', type: 'input' },
                { key: 'mission', label: 'Missiya', placeholder: 'İşletmənizin əsas məqsədi...', type: 'textarea', rows: 2 },
                { key: 'coreValues', label: 'Əsas dəyərlər', placeholder: 'Məs: Peşəkarlıq, Nəzakət, İntizam...', type: 'input' }
            ]
        },
        {
            title: '🎯 Xidmətlər və Qruplar',
            fields: [
                { key: 'servicesList', label: 'Xidmətlər siyahısı', placeholder: 'Bütün xidmətlərinizi sadalayın...', type: 'textarea', rows: 3 },
                { key: 'serviceDetails', label: 'Xidmət detalları (yaş qrupları, cədvəl, səviyyələr)', placeholder: 'Məs:\n• Kung Fu (6-12 yaş): B.e-Cümə 16:00-17:30\n• Kung Fu (13-18 yaş): B.e-Cümə 18:00-19:30\n• Böyüklər: Ş-B 10:00-12:00', type: 'textarea', rows: 5 },
                { key: 'hasTrialClass', label: 'Sınaq dərsi / Pulsuz tanışlıq varmı?', placeholder: 'Məs: Bəli, ilk dərs pulsuzdur', type: 'input' },
                { key: 'groupVsIndividual', label: 'Qrup və fərdi dərslər', placeholder: 'Məs: Həm qrup (max 15 nəfər), həm fərdi dərslər var', type: 'input' }
            ]
        },
        {
            title: '💰 Qiymətlər',
            fields: [
                { key: 'pricingDetails', label: 'Qiymət cədvəli', placeholder: 'Hər xidmət üçün qiymətlər...', type: 'textarea', rows: 3 },
                { key: 'subscriptionPlans', label: 'Aylıq abunə planları', placeholder: 'Məs: Aylıq - 50 AZN, 3 aylıq - 130 AZN', type: 'textarea', rows: 2 },
                { key: 'packageDiscounts', label: 'Paket endirimləri', placeholder: 'Məs: 6 aylıq alana 1 ay pulsuz', type: 'input' },
                { key: 'familyDiscounts', label: 'Ailə / Qrup endirimi', placeholder: 'Məs: 2-ci ailə üzvünə 20% endirim', type: 'input' },
                { key: 'paymentMethods', label: 'Ödəniş üsulları', placeholder: 'Məs: Nağd, Kart, Bank köçürməsi', type: 'input' },
                { key: 'priceResponsePolicy', label: 'Qiymət soruşanda necə cavab verilsin?', placeholder: 'Məs: Dəqiq qiymət verin / Əlaqə üçün yönləndirin', type: 'textarea', rows: 2 }
            ]
        },
        {
            title: '📍 İş Saatları və Məkan',
            fields: [
                { key: 'workingDays', label: 'İş günləri', placeholder: 'Məs: Bazar ertəsi - Cümə', type: 'input' },
                { key: 'workingHours', label: 'İş saatları', placeholder: 'Məs: 09:00 - 21:00', type: 'input' },
                { key: 'holidaySchedule', label: 'Bayram günləri cədvəli', placeholder: 'Məs: Bayram günləri bağlıyıq', type: 'input' },
                { key: 'mainAddress', label: 'Əsas ünvan', placeholder: 'Tam ünvan...', type: 'textarea', rows: 2 },
                { key: 'directionsInfo', label: 'Necə gəlmək olar?', placeholder: 'Məs: Metro "28 May" stansiyasından 5 dəq piyada...', type: 'textarea', rows: 2 },
                { key: 'otherBranches', label: 'Digər filiallar (varsa)', placeholder: 'Digər məkanların ünvanları...', type: 'textarea', rows: 2 },
                { key: 'onlineServices', label: 'Onlayn xidmət varmı?', placeholder: 'Məs: Bəli, Zoom üzərindən fərdi dərslər', type: 'input' }
            ]
        },
        {
            title: '📞 Əlaqə və Qeydiyyat',
            fields: [
                { key: 'phoneNumber', label: 'Telefon (WhatsApp?)', placeholder: 'Məs: +994 50 123 45 67 (WhatsApp var)', type: 'input' },
                { key: 'email', label: 'Email', placeholder: 'Məs: info@example.com', type: 'input' },
                { key: 'website', label: 'Veb sayt', placeholder: 'Məs: www.example.com', type: 'input' },
                { key: 'socialMedia', label: 'Sosial media hesabları', placeholder: 'Məs: Instagram: @example, Facebook: /example', type: 'textarea', rows: 2 },
                { key: 'registrationProcess', label: 'Qeydiyyat prosesi', placeholder: 'Məs: DM yazın, formu doldurun, və ya zəng edin', type: 'textarea', rows: 2 }
            ]
        },
        {
            title: '❓ Tez-Tez Soruşulan Suallar',
            fields: [
                { key: 'faq', label: 'SSS və Cavablar (ən azı 5-10 sual)', placeholder: 'S: Qiymət nə qədərdir?\nC: Aylıq abunə 50 AZN-dir.\n\nS: Sınaq dərsi varmı?\nC: Bəli, ilk dərs pulsuzdur.\n\nS: Neçə yaşdan qəbul edirsiniz?\nC: 6 yaşdan yuxarı...', type: 'textarea', rows: 8 }
            ]
        },
        {
            title: '🎨 Üslub və Dil',
            fields: [
                { key: 'preferredLanguage', label: 'Tercih edilən dil', placeholder: 'Məs: Azərbaycan dili', type: 'input' },
                { key: 'communicationStyle', label: 'Üslub (Rəsmi / Samimi)', placeholder: 'Məs: Samimi və dostcanlı, amma peşəkar', type: 'input' },
                { key: 'useEmojis', label: 'Emoji istifadə edilsinmi?', placeholder: 'Məs: Bəli, amma çox deyil', type: 'input' },
                { key: 'responseLength', label: 'Cavab uzunluğu', placeholder: 'Məs: Qısa və konkret', type: 'input' }
            ]
        },
        {
            title: '⚠️ Məhdudiyyətlər',
            fields: [
                { key: 'mentionCompetitors', label: 'Rəqiblərdən danışılsınmı?', placeholder: 'Məs: Xeyr, heç vaxt', type: 'input' },
                { key: 'exactPricing', label: 'Dəqiq qiymət verilsinmi?', placeholder: 'Məs: Bəli / Xeyr, yönləndirmə edilsin', type: 'input' },
                { key: 'topicsToAvoid', label: 'Qaçınılacaq mövzular', placeholder: 'Məs: Siyasət, din, rəqiblər...', type: 'textarea', rows: 2 },
                { key: 'urgentCases', label: 'Təcili hallarda nə edilsin?', placeholder: 'Məs: Telefon nömrəsini verin', type: 'input' },
                { key: 'complaintHandling', label: 'Şikayət gəldikdə necə cavab verilsin?', placeholder: 'Məs: Üzr istəyin və əlaqə üçün yönləndirin', type: 'textarea', rows: 2 }
            ]
        }
    ];

    return (
        <div className="glass-panel" style={{ flex: 1, maxHeight: '85vh', overflowY: 'auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.6rem' }}>🤖 Dijital İkiz Yaradıcısı</h3>
                <p style={{ margin: '0.5rem 0 0', opacity: 0.7, fontSize: '0.9rem' }}>
                    İşletməniz üçün AI asistanın şəxsiyyətini və biliklərini konfiqurasiya edin
                </p>
            </div>

            {/* Section Tabs */}
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '0.5rem', 
                marginBottom: '1.5rem',
                padding: '0.5rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '12px'
            }}>
                {sections.map((section, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveSection(index)}
                        style={{
                            padding: '0.6rem 1rem',
                            borderRadius: '8px',
                            border: 'none',
                            background: activeSection === index 
                                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                                : 'rgba(255,255,255,0.1)',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: activeSection === index ? 'bold' : 'normal',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {section.title}
                    </button>
                ))}
            </div>

            {/* Active Section Fields */}
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(0,0,0,0.15)',
                borderRadius: '12px',
                marginBottom: '1rem'
            }}>
                <h4 style={{ margin: 0, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                    {sections[activeSection].title}
                </h4>
                {sections[activeSection].fields.map((field: { key: string; label: string; placeholder: string; type: string; rows?: number }) => (
                    <div key={field.key} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                        <label style={{ fontWeight: '500', fontSize: '0.9rem', opacity: 0.9 }}>{field.label}</label>
                        {field.type === 'input' ? (
                            <input
                                placeholder={field.placeholder}
                                value={formData[field.key as keyof BriefData]}
                                onChange={e => handleChange(field.key as keyof BriefData, e.target.value)}
                                style={{
                                    padding: '0.7rem',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    background: 'rgba(0,0,0,0.3)',
                                    color: 'white',
                                    fontSize: '0.95rem'
                                }}
                            />
                        ) : (
                            <textarea
                                placeholder={field.placeholder}
                                rows={field.rows || 3}
                                value={formData[field.key as keyof BriefData]}
                                onChange={e => handleChange(field.key as keyof BriefData, e.target.value)}
                                style={{
                                    padding: '0.7rem',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    background: 'rgba(0,0,0,0.3)',
                                    color: 'white',
                                    resize: 'vertical',
                                    fontSize: '0.95rem'
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Navigation & Save */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '12px'
            }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={() => setActiveSection(prev => Math.max(0, prev - 1))}
                        disabled={activeSection === 0}
                        style={{
                            padding: '0.7rem 1.2rem',
                            borderRadius: '8px',
                            border: 'none',
                            background: activeSection === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
                            color: 'white',
                            cursor: activeSection === 0 ? 'not-allowed' : 'pointer',
                            opacity: activeSection === 0 ? 0.5 : 1
                        }}
                    >
                        ← Əvvəlki
                    </button>
                    <button
                        onClick={() => setActiveSection(prev => Math.min(sections.length - 1, prev + 1))}
                        disabled={activeSection === sections.length - 1}
                        style={{
                            padding: '0.7rem 1.2rem',
                            borderRadius: '8px',
                            border: 'none',
                            background: activeSection === sections.length - 1 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
                            color: 'white',
                            cursor: activeSection === sections.length - 1 ? 'not-allowed' : 'pointer',
                            opacity: activeSection === sections.length - 1 ? 0.5 : 1
                        }}
                    >
                        Növbəti →
                    </button>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                        {activeSection + 1} / {sections.length}
                    </span>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '0.8rem 1.5rem',
                            borderRadius: '10px',
                            fontWeight: 'bold',
                            fontSize: '0.95rem',
                            cursor: loading ? 'wait' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {loading ? '🔄 Yaradılır...' : '✨ Dijital İkizi Yarat'}
                    </button>
                </div>
            </div>

            {/* Message */}
            {message && (
                <div style={{ 
                    marginTop: '1rem',
                    padding: '0.8rem 1rem', 
                    borderRadius: '8px',
                    background: message.includes('✅') ? 'rgba(0,255,100,0.15)' : 'rgba(255,0,0,0.15)',
                    textAlign: 'center'
                }}>
                    {message}
                </div>
            )}

            {/* Generated Prompt Preview */}
            {showPreview && generatedPrompt && (
                <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: 'rgba(102, 126, 234, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(102, 126, 234, 0.3)'
                }}>
                    <h4 style={{ margin: '0 0 0.5rem' }}>📝 Yaradılan Sistem Promptu:</h4>
                    <pre style={{ 
                        whiteSpace: 'pre-wrap', 
                        fontSize: '0.8rem',
                        background: 'rgba(0,0,0,0.3)',
                        padding: '1rem',
                        borderRadius: '8px',
                        maxHeight: '250px',
                        overflowY: 'auto',
                        lineHeight: '1.5'
                    }}>
                        {generatedPrompt}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default ProjectBrief;
