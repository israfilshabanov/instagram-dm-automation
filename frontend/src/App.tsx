import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ProjectBrief from './components/ProjectBrief';
import ChatTester from './components/ChatTester';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          {/* Ana sayfa - Login */}
          <Route path="/" element={
            !isAuthenticated ? (
              <Login onLogin={() => setIsAuthenticated(true)} />
            ) : (
              <Navigate to="/admin" replace />
            )
          } />

          {/* Brief sayfası - Doğrudan erişim */}
          <Route path="/brief" element={
            !isAuthenticated ? (
              <Login onLogin={() => setIsAuthenticated(true)} />
            ) : (
              <div className="app-container">
                <div className="glass-panel" style={{ width: '800px', minHeight: '600px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h1 style={{ margin: 0, fontSize: '1.4rem' }}>📋 İşletmə Məlumatları</h1>
                    <button
                      onClick={() => setIsAuthenticated(false)}
                      style={{ background: 'transparent', border: '1px solid #475569', color: '#94a3b8', padding: '0.4rem 1rem', borderRadius: '6px' }}
                    >
                      Çıxış
                    </button>
                  </div>
                  <ProjectBrief />
                </div>
              </div>
            )
          } />

          {/* Admin paneli */}
          <Route path="/admin" element={
            !isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <div className="glass-panel" style={{ width: '1000px', minHeight: '600px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h1 style={{ margin: 0 }}>Admin Paneli</h1>
                  <button
                    onClick={() => setIsAuthenticated(false)}
                    style={{ background: 'transparent', border: '1px solid #475569', color: '#94a3b8', padding: '0.4rem 1rem', borderRadius: '6px' }}
                  >
                    Çıxış
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '2rem', flex: 1, alignItems: 'stretch' }}>
                  <ProjectBrief />
                  <ChatTester />
                </div>
              </div>
            )
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
