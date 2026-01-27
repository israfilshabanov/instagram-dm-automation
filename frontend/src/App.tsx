import { useState } from 'react';
import Login from './components/Login';
import ProjectBrief from './components/ProjectBrief';
import ChatTester from './components/ChatTester';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="app-container">
      {!isAuthenticated ? (
        <Login onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <div className="glass-panel" style={{ width: '1000px', minHeight: '600px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ margin: 0 }}>Admin Paneli</h1>
            <button
              onClick={() => setIsAuthenticated(false)}
              style={{ background: 'transparent', border: '1px solid #475569', color: '#94a3b8', padding: '0.4rem 1rem', borderRadius: '6px' }}
            >
              Çıkış
            </button>
          </div>

          <div style={{ display: 'flex', gap: '2rem', flex: 1, alignItems: 'stretch' }}>
            <ProjectBrief />
            <ChatTester />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
