import React, { useState } from 'react';
import { savePrompt, type BriefData } from '../services/api';
import { 
    Building2, 
    Target, 
    Wallet, 
    MapPin, 
    Phone, 
    HelpCircle, 
    Palette, 
    ShieldAlert,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Check,
    Loader2
} from 'lucide-react';

const ProjectBrief: React.FC = () => {
    const [activeSection, setActiveSection] = useState(0);
    const [formData, setFormData] = useState<BriefData>({
        businessName: '',
        businessDescription: '',
        yearsInBusiness: '',
        mission: '',
        coreValues: '',
        servicesList: '',
        serviceDetails: '',
        hasTrialClass: '',
        groupVsIndividual: '',
        pricingDetails: '',
        subscriptionPlans: '',
        packageDiscounts: '',
        familyDiscounts: '',
        paymentMethods: '',
        priceResponsePolicy: '',
        workingDays: '',
        workingHours: '',
        holidaySchedule: '',
        mainAddress: '',
        directionsInfo: '',
        otherBranches: '',
        onlineServices: '',
        phoneNumber: '',
        email: '',
        website: '',
        socialMedia: '',
        registrationProcess: '',
        faq: '',
        preferredLanguage: 'Azərbaycan dili',
        communicationStyle: '',
        useEmojis: '',
        responseLength: '',
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
            setMessage('error:İşletmə adı mütləqdir!');
            return;
        }
        
        setLoading(true);
        try {
            const response = await savePrompt(formData);
            if (response.generatedPrompt) {
                setGeneratedPrompt(response.generatedPrompt);
                setShowPreview(true);
            }
            setMessage('success:Dijital ikiz uğurla yaradıldı!');
        } catch (error) {
            console.error(error);
            setMessage('error:Xəta baş verdi.');
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(''), 5000);
        }
    };

    const sections = [
        {
            title: 'Əsas Məlumatlar',
            icon: Building2,
            fields: [
                { key: 'businessName', label: 'İşletmənin rəsmi adı', required: true, placeholder: 'Məs: Mehman Kung Fu Academy', type: 'input' },
                { key: 'businessDescription', label: 'İşletmənizi bir cümlə ilə təsvir edin', placeholder: 'Məs: Gəncədə professional döyüş sənəti təlimləri...', type: 'textarea', rows: 2 },
                { key: 'yearsInBusiness', label: 'Neçə ildir fəaliyyət göstərirsiniz?', placeholder: 'Məs: 5 il', type: 'input' },
                { key: 'mission', label: 'Missiya', placeholder: 'İşletmənizin əsas məqsədi...', type: 'textarea', rows: 2 },
                { key: 'coreValues', label: 'Əsas dəyərlər', placeholder: 'Məs: Peşəkarlıq, Nəzakət, İntizam...', type: 'input' }
            ]
        },
        {
            title: 'Xidmətlər və Qruplar',
            icon: Target,
            fields: [
                { key: 'servicesList', label: 'Xidmətlər siyahısı', placeholder: 'Bütün xidmətlərinizi sadalayın...', type: 'textarea', rows: 3 },
                { key: 'serviceDetails', label: 'Xidmət detalları', placeholder: 'Yaş qrupları, cədvəl, səviyyələr...', type: 'textarea', rows: 4 },
                { key: 'hasTrialClass', label: 'Sınaq dərsi varmı?', placeholder: 'Məs: Bəli, ilk dərs pulsuzdur', type: 'input' },
                { key: 'groupVsIndividual', label: 'Qrup və fərdi dərslər', placeholder: 'Məs: Həm qrup, həm fərdi dərslər var', type: 'input' }
            ]
        },
        {
            title: 'Qiymətlər',
            icon: Wallet,
            fields: [
                { key: 'pricingDetails', label: 'Qiymət cədvəli', placeholder: 'Hər xidmət üçün qiymətlər...', type: 'textarea', rows: 3 },
                { key: 'subscriptionPlans', label: 'Abunə planları', placeholder: 'Məs: Aylıq - 50 AZN, 3 aylıq - 130 AZN', type: 'textarea', rows: 2 },
                { key: 'packageDiscounts', label: 'Paket endirimləri', placeholder: 'Məs: 6 aylıq alana 1 ay pulsuz', type: 'input' },
                { key: 'familyDiscounts', label: 'Ailə endirimi', placeholder: 'Məs: 2-ci ailə üzvünə 20% endirim', type: 'input' },
                { key: 'paymentMethods', label: 'Ödəniş üsulları', placeholder: 'Məs: Nağd, Kart, Bank köçürməsi', type: 'input' },
                { key: 'priceResponsePolicy', label: 'Qiymət soruşanda necə cavab verilsin?', placeholder: 'Dəqiq qiymət verin və ya yönləndirin', type: 'textarea', rows: 2 }
            ]
        },
        {
            title: 'İş Saatları və Məkan',
            icon: MapPin,
            fields: [
                { key: 'workingDays', label: 'İş günləri', placeholder: 'Məs: Bazar ertəsi - Cümə', type: 'input' },
                { key: 'workingHours', label: 'İş saatları', placeholder: 'Məs: 09:00 - 21:00', type: 'input' },
                { key: 'holidaySchedule', label: 'Bayram günləri', placeholder: 'Məs: Bayram günləri bağlıyıq', type: 'input' },
                { key: 'mainAddress', label: 'Əsas ünvan', placeholder: 'Tam ünvan...', type: 'textarea', rows: 2 },
                { key: 'directionsInfo', label: 'Necə gəlmək olar?', placeholder: 'Məs: Metro stansiyasından 5 dəq...', type: 'textarea', rows: 2 },
                { key: 'otherBranches', label: 'Digər filiallar', placeholder: 'Digər məkanların ünvanları...', type: 'textarea', rows: 2 },
                { key: 'onlineServices', label: 'Onlayn xidmət', placeholder: 'Məs: Zoom üzərindən fərdi dərslər', type: 'input' }
            ]
        },
        {
            title: 'Əlaqə və Qeydiyyat',
            icon: Phone,
            fields: [
                { key: 'phoneNumber', label: 'Telefon', placeholder: 'Məs: +994 50 123 45 67', type: 'input' },
                { key: 'email', label: 'Email', placeholder: 'Məs: info@example.com', type: 'input' },
                { key: 'website', label: 'Veb sayt', placeholder: 'Məs: www.example.com', type: 'input' },
                { key: 'socialMedia', label: 'Sosial media', placeholder: 'Instagram, Facebook, TikTok...', type: 'textarea', rows: 2 },
                { key: 'registrationProcess', label: 'Qeydiyyat prosesi', placeholder: 'Necə qeydiyyatdan keçmək olar?', type: 'textarea', rows: 2 }
            ]
        },
        {
            title: 'Tez-Tez Soruşulan Suallar',
            icon: HelpCircle,
            fields: [
                { key: 'faq', label: 'SSS və Cavablar (ən azı 5-10 sual)', placeholder: 'S: Qiymət nə qədərdir?\nC: Aylıq abunə 50 AZN-dir.\n\nS: Sınaq dərsi varmı?\nC: Bəli, ilk dərs pulsuzdur.', type: 'textarea', rows: 8 }
            ]
        },
        {
            title: 'Üslub və Dil',
            icon: Palette,
            fields: [
                { key: 'preferredLanguage', label: 'Tercih edilən dil', placeholder: 'Məs: Azərbaycan dili', type: 'input' },
                { key: 'communicationStyle', label: 'Üslub', placeholder: 'Məs: Samimi və dostcanlı', type: 'input' },
                { key: 'useEmojis', label: 'Emoji istifadəsi', placeholder: 'Məs: Bəli, amma çox deyil', type: 'input' },
                { key: 'responseLength', label: 'Cavab uzunluğu', placeholder: 'Məs: Qısa və konkret', type: 'input' }
            ]
        },
        {
            title: 'Məhdudiyyətlər',
            icon: ShieldAlert,
            fields: [
                { key: 'mentionCompetitors', label: 'Rəqiblərdən danışılsınmı?', placeholder: 'Məs: Xeyr, heç vaxt', type: 'input' },
                { key: 'exactPricing', label: 'Dəqiq qiymət verilsinmi?', placeholder: 'Bəli / Xeyr', type: 'input' },
                { key: 'topicsToAvoid', label: 'Qaçınılacaq mövzular', placeholder: 'Məs: Siyasət, din...', type: 'textarea', rows: 2 },
                { key: 'urgentCases', label: 'Təcili hallarda', placeholder: 'Məs: Telefon nömrəsini verin', type: 'input' },
                { key: 'complaintHandling', label: 'Şikayət idarəetməsi', placeholder: 'Üzr istəyin və yönləndirin', type: 'textarea', rows: 2 }
            ]
        }
    ];

    const currentSection = sections[activeSection];
    const IconComponent = currentSection.icon;

    return (
        <div style={{ 
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '1rem'
        }}>
            {/* Progress Bar */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.75rem'
                }}>
                    <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                        Addım {activeSection + 1} / {sections.length}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                        {Math.round(((activeSection + 1) / sections.length) * 100)}%
                    </span>
                </div>
                <div style={{ 
                    height: '4px', 
                    background: 'rgba(255,255,255,0.1)', 
                    borderRadius: '2px',
                    overflow: 'hidden'
                }}>
                    <div style={{ 
                        height: '100%',
                        width: `${((activeSection + 1) / sections.length) * 100}%`,
                        background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                        borderRadius: '2px',
                        transition: 'width 0.3s ease'
                    }} />
                </div>
            </div>

            {/* Step Indicators - Horizontal scroll on mobile */}
            <div style={{ 
                display: 'flex',
                gap: '0.375rem',
                marginBottom: '1.5rem',
                overflowX: 'auto',
                paddingBottom: '0.5rem',
                WebkitOverflowScrolling: 'touch'
            }}>
                {sections.map((section, index) => {
                    const SectionIcon = section.icon;
                    const isActive = index === activeSection;
                    const isCompleted = index < activeSection;
                    
                    return (
                        <button
                            key={index}
                            onClick={() => setActiveSection(index)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.375rem',
                                padding: '0.5rem 0.75rem',
                                background: isActive 
                                    ? 'linear-gradient(135deg, #6366f1, #a855f7)'
                                    : isCompleted 
                                        ? 'rgba(34, 197, 94, 0.15)'
                                        : 'rgba(255,255,255,0.05)',
                                border: 'none',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                flexShrink: 0,
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {isCompleted ? (
                                <Check size={14} color="#22c55e" />
                            ) : (
                                <SectionIcon size={14} color={isActive ? 'white' : '#94a3b8'} />
                            )}
                            <span style={{ 
                                fontSize: '0.75rem', 
                                color: isActive ? '#fff' : isCompleted ? '#22c55e' : '#94a3b8',
                                fontWeight: isActive ? '600' : '500'
                            }}>
                                {section.title}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Current Section Header */}
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem',
                marginBottom: '1rem',
                padding: '0.75rem',
                background: 'rgba(99, 102, 241, 0.1)',
                borderRadius: '10px',
                border: '1px solid rgba(99, 102, 241, 0.2)'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                }}>
                    <IconComponent size={20} color="white" />
                </div>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>
                        {currentSection.title}
                    </h2>
                    <p style={{ margin: '0.125rem 0 0', fontSize: '0.8125rem', color: '#94a3b8' }}>
                        {currentSection.fields.length} sual
                    </p>
                </div>
            </div>

            {/* Form Fields */}
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem',
                marginBottom: '1.5rem'
            }}>
                {currentSection.fields.map((field: { key: string; label: string; placeholder: string; type: string; rows?: number; required?: boolean }) => (
                    <div key={field.key}>
                        <label style={{ 
                            display: 'block',
                            marginBottom: '0.375rem',
                            fontSize: '0.8125rem',
                            fontWeight: '500',
                            color: '#e2e8f0'
                        }}>
                            {field.label}
                            {field.required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
                        </label>
                        {field.type === 'input' ? (
                            <input
                                placeholder={field.placeholder}
                                value={formData[field.key as keyof BriefData]}
                                onChange={e => handleChange(field.key as keyof BriefData, e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(0,0,0,0.2)',
                                    color: 'white',
                                    fontSize: '0.875rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={e => e.target.style.borderColor = '#6366f1'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                        ) : (
                            <textarea
                                placeholder={field.placeholder}
                                rows={field.rows || 3}
                                value={formData[field.key as keyof BriefData]}
                                onChange={e => handleChange(field.key as keyof BriefData, e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(0,0,0,0.2)',
                                    color: 'white',
                                    fontSize: '0.875rem',
                                    resize: 'vertical',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease',
                                    boxSizing: 'border-box',
                                    fontFamily: 'inherit'
                                }}
                                onFocus={e => e.target.style.borderColor = '#6366f1'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Navigation */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.75rem'
            }}>
                <button
                    onClick={() => setActiveSection(prev => Math.max(0, prev - 1))}
                    disabled={activeSection === 0}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        padding: '0.625rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'transparent',
                        color: activeSection === 0 ? '#64748b' : '#e2e8f0',
                        cursor: activeSection === 0 ? 'not-allowed' : 'pointer',
                        fontSize: '0.8125rem',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <ChevronLeft size={16} />
                    Əvvəlki
                </button>

                {activeSection === sections.length - 1 ? (
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.375rem',
                            padding: '0.625rem 1rem',
                            borderRadius: '8px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                            color: 'white',
                            cursor: loading ? 'wait' : 'pointer',
                            fontSize: '0.8125rem',
                            fontWeight: '600',
                            opacity: loading ? 0.7 : 1,
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
                                Yaradılır...
                            </>
                        ) : (
                            <>
                                <Sparkles size={14} />
                                Yarat
                            </>
                        )}
                    </button>
                ) : (
                    <button
                        onClick={() => setActiveSection(prev => Math.min(sections.length - 1, prev + 1))}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.375rem',
                            padding: '0.625rem 1rem',
                            borderRadius: '8px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '0.8125rem',
                            fontWeight: '500',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Növbəti
                        <ChevronRight size={16} />
                    </button>
                )}
            </div>

            {/* Message */}
            {message && (
                <div style={{ 
                    marginTop: '1.5rem',
                    padding: '1rem 1.25rem', 
                    borderRadius: '10px',
                    background: message.startsWith('success') 
                        ? 'rgba(34, 197, 94, 0.15)' 
                        : 'rgba(239, 68, 68, 0.15)',
                    border: message.startsWith('success')
                        ? '1px solid rgba(34, 197, 94, 0.3)'
                        : '1px solid rgba(239, 68, 68, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                }}>
                    {message.startsWith('success') ? (
                        <Check size={20} color="#22c55e" />
                    ) : (
                        <ShieldAlert size={20} color="#ef4444" />
                    )}
                    <span style={{ color: message.startsWith('success') ? '#22c55e' : '#ef4444' }}>
                        {message.split(':')[1]}
                    </span>
                </div>
            )}

            {/* Generated Prompt Preview */}
            {showPreview && generatedPrompt && (
                <div style={{
                    marginTop: '1.5rem',
                    padding: '1.25rem',
                    background: 'rgba(99, 102, 241, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(99, 102, 241, 0.2)'
                }}>
                    <h4 style={{ 
                        margin: '0 0 1rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        fontSize: '1rem'
                    }}>
                        <Sparkles size={18} color="#a855f7" />
                        Yaradılan Sistem Promptu
                    </h4>
                    <pre style={{ 
                        whiteSpace: 'pre-wrap', 
                        fontSize: '0.8125rem',
                        background: 'rgba(0,0,0,0.3)',
                        padding: '1rem',
                        borderRadius: '8px',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        lineHeight: '1.6',
                        margin: 0
                    }}>
                        {generatedPrompt}
                    </pre>
                </div>
            )}

            {/* Spin animation for loader */}
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default ProjectBrief;
