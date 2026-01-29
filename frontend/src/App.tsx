import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import Login from './components/Login';
import ProjectBrief from './components/ProjectBrief';
import ChatTester from './components/ChatTester';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const LogoutButton = () => (
    <button
      onClick={() => setIsAuthenticated(false)}
      style={{ 
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'rgba(255,255,255,0.05)', 
        border: '1px solid rgba(255,255,255,0.1)', 
        color: '#94a3b8', 
        padding: '0.5rem 1rem', 
        borderRadius: '8px',
        fontSize: '0.875rem',
        fontWeight: '500'
      }}
    >
      <LogOut size={16} />
      <span className="hide-mobile">Çıxış</span>
    </button>
  );

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          {/* Ana sayfa - Login */}
          <Route path="/" element={
            !isAuthenticated ? (
              <Login onLogin={() => setIsAuthenticated(true)} />
            ) : (
              <Navigate to="/brief" replace />
            )
          } />

          {/* Brief sayfası */}
          <Route path="/brief" element={
            !isAuthenticated ? (
              <Login onLogin={() => setIsAuthenticated(true)} />
            ) : (
              <div style={{
                width: '100%',
                minHeight: '100vh',
                padding: '0'
              }}>
                {/* Header */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '1rem',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(17, 17, 24, 0.8)',
                  backdropFilter: 'blur(10px)',
                  position: 'sticky',
                  top: 0,
                  zIndex: 40
                }}>
                  <h1 style={{ 
                    margin: 0, 
                    fontSize: '1.125rem',
                    fontWeight: '600'
                  }}>
                    Dijital İkiz Yaradıcısı
                  </h1>
                  <LogoutButton />
                </div>
                
                {/* Brief Form - Full Width */}
                <ProjectBrief />
              </div>
            )
          } />

          {/* Admin paneli */}
          <Route path="/admin" element={
            !isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <div style={{
                width: '100%',
                maxWidth: '1200px',
                padding: '1rem',
                minHeight: '100vh'
              }}>
                {/* Header */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '1.5rem',
                  padding: '0.5rem 0'
                }}>
                  <h1 style={{ 
                    margin: 0, 
                    fontSize: 'clamp(1rem, 4vw, 1.5rem)',
                    fontWeight: '600'
                  }}>
                    Admin Paneli
                  </h1>
                  <LogoutButton />
                </div>

                {/* Content */}
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
                  gap: '1.5rem'
                }}>
                  <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
                    <ProjectBrief />
                  </div>
                  <div className="glass-panel">
                    <ChatTester />
                  </div>
                </div>
              </div>
            )
          } />
        </Routes>
      </div>

      {/* Responsive CSS */}
      <style>{`
        .hide-mobile {
          display: inline;
        }
        @media (max-width: 480px) {
          .hide-mobile {
            display: none;
          }
        }
      `}</style>
    </BrowserRouter>
  );
}

export default App;
