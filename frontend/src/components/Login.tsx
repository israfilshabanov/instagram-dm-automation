import React, { useState } from 'react';
import { Lock, LogIn, AlertCircle } from 'lucide-react';
import '../index.css';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        setTimeout(() => {
            if (password === 'admin123' || password === 'gizlisifre') {
                onLogin();
            } else {
                setError('Yanlış şifrə');
            }
            setLoading(false);
        }, 500);
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: '400px',
            padding: '0 1rem'
        }}>
            <div className="glass-panel" style={{ 
                width: '100%',
                textAlign: 'center'
            }}>
                {/* Logo / Icon */}
                <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem'
                }}>
                    <Lock size={28} color="white" />
                </div>

                {/* Title */}
                <h1 style={{ 
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    margin: '0 0 0.5rem',
                    background: 'linear-gradient(to right, #6366f1, #a855f7)', 
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent'
                }}>
                    Instagram DM
                </h1>
                <p style={{ 
                    margin: '0 0 2rem', 
                    color: '#94a3b8',
                    fontSize: '0.9375rem'
                }}>
                    Yönetici Girişi
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '1rem' 
                }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="password"
                            placeholder="Şifrəni daxil edin"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem 1rem 1rem 3rem',
                                fontSize: '1rem',
                                borderRadius: '12px',
                                border: error ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(0,0,0,0.2)'
                            }}
                        />
                        <Lock 
                            size={18} 
                            color="#64748b" 
                            style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)'
                            }}
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <div style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            color: '#ef4444', 
                            fontSize: '0.875rem',
                            padding: '0.75rem',
                            background: 'rgba(239, 68, 68, 0.1)',
                            borderRadius: '8px'
                        }}>
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || !password}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            width: '100%',
                            padding: '1rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: 'white',
                            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: loading || !password ? 'not-allowed' : 'pointer',
                            opacity: loading || !password ? 0.6 : 1,
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {loading ? (
                            'Yüklənir...'
                        ) : (
                            <>
                                <LogIn size={18} />
                                Daxil ol
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
