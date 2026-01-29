import React, { useState } from 'react';
import { 
    Building2, Target, Wallet, MapPin, Phone, HelpCircle, Palette, ShieldAlert, 
    ChevronLeft, ChevronRight, Sparkles, Loader2, X, Check
} from 'lucide-react';
import { savePrompt, type BriefData } from '../services/api';

const ProjectBrief: React.FC = () => {
    const [activeSection, setActiveSection] = useState(0);
    const [formData, setFormData] = useState<BriefData>({
        businessName: '', businessDescription: '', yearsInBusiness: '', mission: '', coreValues: '',
        servicesList: '', serviceDetails: '', hasTrialClass: '', groupVsIndividual: '',
        pricingDetails: '', subscriptionPlans: '', packageDiscounts: '', familyDiscounts: '', paymentMethods: '', priceResponsePolicy: '',
        workingDays: '', workingHours: '', holidaySchedule: '', mainAddress: '', directionsInfo: '', otherBranches: '', onlineServices: '',
        phoneNumber: '', email: '', website: '', socialMedia: '', registrationProcess: '',
        faq: '', preferredLanguage: 'Azərbaycan dili', communicationStyle: '', useEmojis: '', responseLength: '',
        mentionCompetitors: '', exactPricing: '', topicsToAvoid: '', urgentCases: '', complaintHandling: ''
    });
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleChange = (field: keyof BriefData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (!formData.businessName.trim()) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        setLoading(true);
        try {
            await savePrompt(formData);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
        } catch (error) {
            console.error(error);
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        } finally {
            setLoading(false);
        }
    };

    const sections = [
        { title: 'Əsas Məlumatlar', icon: Building2, fields: [
            { key: 'businessName', label: 'İşletmənin rəsmi adı', sub: 'Rəsmi biznes adınız', required: true, placeholder: 'Məs: Mehman Kung Fu Academy', type: 'input' },
            { key: 'businessDescription', label: 'İşletmə təsviri', sub: 'Qısa təqdimat', placeholder: 'Gəncədə professional döyüş sənəti təlimləri...', type: 'textarea', rows: 3 },
            { key: 'yearsInBusiness', label: 'Fəaliyyət müddəti', sub: 'Neçə ildir işləyirsiniz?', placeholder: 'Məs: 5 il', type: 'input' },
            { key: 'mission', label: 'Missiya', sub: 'Əsas məqsədiniz', placeholder: 'İşletmənizin əsas məqsədi...', type: 'textarea', rows: 2 },
            { key: 'coreValues', label: 'Əsas dəyərlər', sub: 'Şirkət dəyərləri', placeholder: 'Peşəkarlıq, Nəzakət, İntizam...', type: 'input' }
        ]},
        { title: 'Xidmətlər', icon: Target, fields: [
            { key: 'servicesList', label: 'Xidmətlər siyahısı', sub: 'Təklif etdiyiniz xidmətlər', placeholder: 'Kung Fu, Taekwondo, Boks...', type: 'textarea', rows: 3 },
            { key: 'serviceDetails', label: 'Xidmət detalları', sub: 'Yaş qrupları, səviyyələr', placeholder: 'Uşaq qrupu (5-10 yaş), Yeniyetmə...', type: 'textarea', rows: 4 },
            { key: 'hasTrialClass', label: 'Sınaq dərsi', sub: 'Pulsuz sınaq varmı?', placeholder: 'Bəli, ilk dərs pulsuzdur', type: 'input' },
            { key: 'groupVsIndividual', label: 'Dərs növləri', sub: 'Qrup / Fərdi', placeholder: 'Həm qrup, həm fərdi dərslər var', type: 'input' }
        ]},
        { title: 'Qiymətlər', icon: Wallet, fields: [
            { key: 'pricingDetails', label: 'Qiymət cədvəli', sub: 'Xidmət qiymətləri', placeholder: 'Aylıq: 50 AZN, Fərdi: 30 AZN/dərs', type: 'textarea', rows: 3 },
            { key: 'subscriptionPlans', label: 'Abunə planları', sub: 'Paket seçimləri', placeholder: '1 ay - 50 AZN, 3 ay - 130 AZN', type: 'textarea', rows: 2 },
            { key: 'packageDiscounts', label: 'Endirim', sub: 'Paket endirimləri', placeholder: '6 aylıq alana 1 ay pulsuz', type: 'input' },
            { key: 'familyDiscounts', label: 'Ailə endirimi', sub: 'Ailə üzvləri üçün', placeholder: '2-ci üzvə 20% endirim', type: 'input' },
            { key: 'paymentMethods', label: 'Ödəniş üsulları', sub: 'Qəbul edilən üsullar', placeholder: 'Nağd, Kart, Bank köçürməsi', type: 'input' },
            { key: 'priceResponsePolicy', label: 'Qiymət siyasəti', sub: 'Necə cavab verilsin?', placeholder: 'Dəqiq qiymət verin və ya telefona yönləndirin', type: 'textarea', rows: 2 }
        ]},
        { title: 'Məkan və Vaxt', icon: MapPin, fields: [
            { key: 'workingDays', label: 'İş günləri', sub: 'Həftənin hansı günləri?', placeholder: 'Bazar ertəsi - Şənbə', type: 'input' },
            { key: 'workingHours', label: 'İş saatları', sub: 'Açılış-bağlanış', placeholder: '09:00 - 21:00', type: 'input' },
            { key: 'holidaySchedule', label: 'Bayramlar', sub: 'Bayram günləri', placeholder: 'Bayram günləri bağlıyıq', type: 'input' },
            { key: 'mainAddress', label: 'Ünvan', sub: 'Əsas məkan', placeholder: 'Gəncə ş., Nizami küç. 45', type: 'textarea', rows: 2 },
            { key: 'directionsInfo', label: 'Yol tarifi', sub: 'Necə gəlmək olar?', placeholder: 'Metro "28 May"dan 5 dəq piyada', type: 'textarea', rows: 2 },
            { key: 'otherBranches', label: 'Filiallar', sub: 'Digər məkanlar', placeholder: 'Bakı filialı: ...', type: 'textarea', rows: 2 },
            { key: 'onlineServices', label: 'Onlayn xidmət', sub: 'Uzaqdan dərslər', placeholder: 'Zoom ilə fərdi dərslər', type: 'input' }
        ]},
        { title: 'Əlaqə', icon: Phone, fields: [
            { key: 'phoneNumber', label: 'Telefon', sub: 'Əlaqə nömrəsi', placeholder: '+994 50 123 45 67', type: 'input' },
            { key: 'email', label: 'Email', sub: 'Elektron poçt', placeholder: 'info@example.com', type: 'input' },
            { key: 'website', label: 'Veb sayt', sub: 'İnternet səhifəsi', placeholder: 'www.example.com', type: 'input' },
            { key: 'socialMedia', label: 'Sosial media', sub: 'Hesablarınız', placeholder: '@instagram, /facebook', type: 'textarea', rows: 2 },
            { key: 'registrationProcess', label: 'Qeydiyyat', sub: 'Necə yazılmaq olar?', placeholder: 'DM yazın və ya zəng edin', type: 'textarea', rows: 2 }
        ]},
        { title: 'SSS', icon: HelpCircle, fields: [
            { key: 'faq', label: 'Tez-tez soruşulan suallar', sub: 'Ən azı 5-10 sual-cavab yazın', placeholder: 'S: Qiymət nə qədərdir?\nC: Aylıq 50 AZN.\n\nS: Sınaq var?\nC: Bəli, ilk dərs pulsuz.', type: 'textarea', rows: 10 }
        ]},
        { title: 'Üslub', icon: Palette, fields: [
            { key: 'preferredLanguage', label: 'Dil', sub: 'Əsas dil', placeholder: 'Azərbaycan dili', type: 'input' },
            { key: 'communicationStyle', label: 'Ton', sub: 'Ünsiyyət tərzi', placeholder: 'Samimi və dostcanlı', type: 'input' },
            { key: 'useEmojis', label: 'Emoji', sub: 'İstifadə edilsinmi?', placeholder: 'Bəli, amma az', type: 'input' },
            { key: 'responseLength', label: 'Cavab uzunluğu', sub: 'Qısa / Orta / Uzun', placeholder: 'Qısa və konkret', type: 'input' }
        ]},
        { title: 'Məhdudiyyətlər', icon: ShieldAlert, fields: [
            { key: 'mentionCompetitors', label: 'Rəqiblər', sub: 'Danışılsınmı?', placeholder: 'Xeyr', type: 'input' },
            { key: 'exactPricing', label: 'Dəqiq qiymət', sub: 'Verilsinmi?', placeholder: 'Bəli', type: 'input' },
            { key: 'topicsToAvoid', label: 'Qaçınılacaq mövzular', sub: 'Toxunulmaz mövzular', placeholder: 'Siyasət, din, şəxsi həyat', type: 'textarea', rows: 3 },
            { key: 'urgentCases', label: 'Təcili hallar', sub: 'Nə etsin?', placeholder: 'Telefon nömrəsini versin', type: 'input' },
            { key: 'complaintHandling', label: 'Şikayətlər', sub: 'Necə cavab versin?', placeholder: 'Üzr istəyib menecerə yönləndirsin', type: 'textarea', rows: 2 }
        ]}
    ];

    const currentSection = sections[activeSection];
    const IconComponent = currentSection.icon;

    return (
        <div style={{ 
            width: '100%',
            minHeight: '100vh',
            background: '#0f172a'
        }}>
            {/* Header */}
            <div style={{
                padding: '1rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(17, 17, 24, 0.95)',
                position: 'sticky',
                top: 0,
                zIndex: 40,
                textAlign: 'center'
            }}>
                <h1 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>
                    Dijital İkiz Yaradıcısı
                </h1>
            </div>
            
            {/* Form Content */}
            <div style={{ 
                padding: '1rem',
                maxWidth: '100%'
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

            {/* Success Toast */}
            {showSuccess && (
                <div style={{
                    position: 'fixed',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem 1.5rem',
                    background: 'rgba(6, 78, 59, 0.95)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '1rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(12px)',
                    zIndex: 50,
                    maxWidth: '90%',
                    width: 'fit-content'
                }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#22c55e',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        <Check size={18} color="white" />
                    </div>
                    <div>
                        <p style={{ margin: 0, fontWeight: '600', fontSize: '0.875rem' }}>Uğurlu əməliyyat!</p>
                        <p style={{ margin: '0.125rem 0 0', fontSize: '0.75rem', color: 'rgba(187, 247, 208, 0.9)' }}>Dijital ikiz uğurla yaradıldı.</p>
                    </div>
                    <button 
                        onClick={() => setShowSuccess(false)}
                        style={{ marginLeft: '0.5rem', background: 'none', border: 'none', color: 'rgba(187, 247, 208, 0.7)', cursor: 'pointer', padding: '4px' }}
                    >
                        <X size={18} />
                    </button>
                </div>
            )}

            {/* Error Toast */}
            {showError && (
                <div style={{
                    position: 'fixed',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem 1.5rem',
                    background: 'rgba(127, 29, 29, 0.95)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '1rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(12px)',
                    zIndex: 50,
                    maxWidth: '90%',
                    width: 'fit-content'
                }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#ef4444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        <X size={18} color="white" />
                    </div>
                    <div>
                        <p style={{ margin: 0, fontWeight: '600', fontSize: '0.875rem' }}>Xəta!</p>
                        <p style={{ margin: '0.125rem 0 0', fontSize: '0.75rem', color: 'rgba(254, 202, 202, 0.9)' }}>İşletmə adı mütləqdir.</p>
                    </div>
                    <button 
                        onClick={() => setShowError(false)}
                        style={{ marginLeft: '0.5rem', background: 'none', border: 'none', color: 'rgba(254, 202, 202, 0.7)', cursor: 'pointer', padding: '4px' }}
                    >
                        <X size={18} />
                    </button>
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
        </div>
    );
};

export default ProjectBrief;
