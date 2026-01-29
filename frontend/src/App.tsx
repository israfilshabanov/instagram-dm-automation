import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProjectBrief from './components/ProjectBrief';
import ChatTester from './components/ChatTester';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          {/* Ana sayfa - direkt Brief */}
          <Route path="/" element={<Navigate to="/brief" replace />} />

          {/* Brief sayfası */}
          <Route path="/brief" element={
            <div style={{
              width: '100%',
              minHeight: '100vh',
              padding: '0'
            }}>
              {/* Header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
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
              </div>
              
              {/* Brief Form - Full Width */}
              <ProjectBrief />
            </div>
          } />

          {/* Admin paneli */}
          <Route path="/admin" element={
            <div style={{
              width: '100%',
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '1rem',
              minHeight: '100vh'
            }}>
              <h1 style={{ margin: '0 0 1.5rem', fontSize: '1.25rem', fontWeight: '600' }}>
                Admin Paneli
              </h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '1.5rem' }}>
                <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
                  <ProjectBrief />
                </div>
                <div className="glass-panel">
                  <ChatTester />
                </div>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
