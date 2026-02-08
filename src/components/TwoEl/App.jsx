import './styles.css'
import { useState } from 'react';
import LoginForm from './LoginForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [securityLogs, setSecurityLogs] = useState([]);

  const handleLogin = (userData) => { // medefinisikan handleLogin dengan parameter userData
    setIsAuthenticated(true);  // setting true kalo berhasil login dan bisa melihat halaman utama
    setCurrentUser(userData); // sett mendapatkan data dari hasil login 

    addSecurityLog(`User ${userData.username} logged in`, 'success')  // logs yang akan ditampilkan 
  };

  const handleLogout = () => { // mendefinisikan handleLogout
    addSecurityLog(`User ${currentUser?.username} logged out`, 'info'); // log yang ditampilkan 
    setIsAuthenticated(false); // set false agar user tidak bisa ke halaman utama
    setCurrentUser(null) // data user dibuat null 
  }

  const addSecurityLog = (message, type) => { // mendefinisikan addSecurityLog dengan parameterr message dan type 
    const log = {  // mendefinisikan log untuk menyimpan object 
      id: Date.now(), // membuat integer fake memakai date.now 
      message, // set pesan
      type, // set  type 
      timestamp: new Date().toLocaleDateString() //set waktu yang di sesuaikan negara masing masing 
    };
    setSecurityLogs(prev => [log, ...prev.slice(0, 19)]);

    // pemmbatas hanya bisa 20 logs aja yang muncul 
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="shield">🛡️</span>
            <h1>Anti-XSS Security System</h1>
          </div>

          <div className="security-tag">
            <span className="tag">React</span>
            <span className="tag">Anti-XSS</span>
            <span className="tag">Secure</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        {isAuthenticated ? (
          <div className="">
            <p>p</p>
          </div>
        ) : (
          <div className="login-page">
            <div className="login-info">
              <h2>Secure Authentication</h2>
              <p>This system implements advanced XSS protection:</p>
              <ul className="feature-list">
                <li>✅ Real-time input sanitization</li>
                <li>✅ HTML entity escaping</li>
                <li>✅ Script tag removal</li>
                <li>✅ Event handler blocking</li>
                <li>✅ JavaScript protocol filtering</li>
                <li>✅ SQL injection prevention</li>
              </ul>
            </div>

            <LoginForm onLogin={handleLogin} />
          </div>
        )}
      </main>

      <div className="security-logs">
        <h4>Security Logs</h4>
        <div className="logs-container">
          {securityLogs.map(log => (
            <div className={`log-entry ${log.type}`} key={log.id}>
              <span className="log-time">[{log.timestamp}]</span>
              <span className='log-message'>{log.message}</span>
            </div>
          ))}
        </div>
      </div>


      <footer className="app-footer">
        <p>© 2023 Anti-XSS Security System | All inputs are sanitized for protection</p>
        <small>This is a demonstration of XSS prevention techniques in React</small>
      </footer>
    </div>
  )
}

export default App