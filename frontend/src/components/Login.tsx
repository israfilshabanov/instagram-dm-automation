import React, { useState } from 'react';
import '../index.css';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basit doğrulama (Prod ortamında backend üzerinden yapılmalı)
        // Şimdilik .env'deki şifre ile eşleşme simülasyonu
        // Gerçekte backend'e istek atılır. Burası frontend-only demo.
        if (password === 'admin123' || password === 'gizlisifre') {
            onLogin();
        } else {
            setError('Hatalı şifre');
        }
    };

    return (
        <div className="glass-panel" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1.5rem', background: 'linear-gradient(to right, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                Instagram DM Otomasyonu
            </h2>
            <p style={{ marginBottom: '2rem', color: '#94a3b8' }}>Yönetici Girişi</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="password"
                    placeholder="Şifre Giriniz"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <span style={{ color: '#ef4444', fontSize: '0.9rem' }}>{error}</span>}

                <button
                    type="submit"
                    style={{
                        background: 'linear-gradient(to right, var(--primary-color), var(--secondary-color))',
                        border: 'none',
                        padding: '0.8rem',
                        color: 'white',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        marginTop: '1rem'
                    }}
                >
                    Giriş Yap
                </button>
            </form>
        </div>
    );
};

export default Login;
