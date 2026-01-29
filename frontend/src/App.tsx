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

          {/* Brief sayfası - TAM EKRAN */}
          <Route path="/brief" element={<ProjectBrief />} />

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
