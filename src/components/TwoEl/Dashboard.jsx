import { useState, useEffect } from "react";
import { sanitizeForHTML, escapeHTML } from "./utils/sanitizer";
// import UserManagement from './UserManagement';

const Dashboard = ({ user, onLogout }) => {
  const [userContent, setUserContent] = useState('');
  const [displayContent, setDisplayContent] = useState('');
  const [isSafeMode, setIsSafeMode] = useState(true);
  const [xssAttempts, setXssAttempts] = useState(0);

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' }
  ]);

  const dangerousContent = '<script>alert("XSS Attack!")</script><p style="color: red;">This is dangerous</p>';

  const handleContentSubmit = (e) => {  // variable handleContentSubmit untuk pengecekan karakter berbahaya 
    e.preventDefault(); // pencegahan default browser 

    if (isSafeMode) {  // mode aman 
      const sanitized = sanitizeForHTML(userContent); // untuk menyimpan sanitized dengan parameter userContent 
      setDisplayContent(sanitized); // sanitasi seblum content ditampilkan 

      if (sanitized !== userContent) { // pengecekan jika ada kontent yang di sanitasi 
        setXssAttempts(prev => prev + 1) // tmenambahkan counter percobaan XSS sebagai monitoring keamanan 
        alert('⚠️ Potensi XSS terdeteksi dan telah disanitasi!') // kasih alert 
      }
    } else {
      setDisplayContent(userContent); // tetap tampilkan konten walaupun tidak di sanitasi (hanyak untuk demo )
      alert(`⚠️ PERINGATAN: Mode tidak aman aktif! Input tidak disanitasi!`) // kasih alert 
    }
  };

  const addUser = (userData) => {  // melakukan penambahan data user 
    const sanitizedUser = {  // untuk mbuat objeck dari user saat melakukan input untuk menjaga imuntabilty dan menghindari modifikasi langsung terhadap userData
      ...userData, // menyalin semua inputan user 
      name: escapeHTML(userData.name), // mensanitasi untuk inputan user nama
      email: escapeHTML(userData.email), // mensanitasi untuk inputan user email
      role: escapeHTML(userData.role) // mensanitasi untuk inputan user role
    };

    setUsers(prev => [...prev, { ...sanitizedUser, id: Date.now() }])  // setiap user menambahkan data tetapkan id waktu sekarang dengan menggunakan Date.now
  };

  const deleteUser = (userId) => {  // melakukan pengahpusah data user 
    setUsers(prev => prev.filter(user => user.id !== userId)) // jika user menghapus data nya salin semua data dan tetapkan yang ada selain yang dihapus 
  }; 

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="user-info">
          <div className="user-avatar">
            {user.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="user-details">
            <h3>Welcome, {escapeHTML(user.username)}</h3>
            <p>{user.email}</p>
            <small>Last login: {new Date(user.loginTime).toLocaleString()}</small>
          </div>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="security-controls">
          <div className="control-group">
            <label className="switch">
              <input type="checkbox"
                checked={isSafeMode}
                onChange={(e) => setIsSafeMode(e.target.checked)}
              />
              <span className="slider"></span>
            </label>

            <div className="control-label">
              <strong>Safe Mode: {isSafeMode ? 'ON' : 'OFF'}</strong>
              <small>
                {isSafeMode
                  ? 'Semua input disanitasi untuk mencegah XSS'
                  : '⚠️ Mode tidak aman - input tidak disanitasi'}
              </small>
            </div>
          </div>

          <div className="security-stats">
            <div className="stat-item">
              <span className="stat-label">XSS Attempts Blocked:</span>
              <span className="stat-value">{xssAttempts}</span>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h3>Content Editor</h3>
          <p className="section-description">
            {isSafeMode
              ? '🔒 Input aman: Semua script dan HTML berbahaya akan disanitasi'
              : '⚠️ Mode berbahaya: Input akan ditampilkan apa adanya'}
          </p>

          <form onSubmit={handleContentSubmit} className="content-form">
            <div className="form-group">
              <label>Enter Content (try XSS):</label>
              <textarea
                value={userContent}
                onChange={(e) => setUserContent(e.target.value)}
                placeholder="Try: <script>alert('xss')</script>"
                rows="4"
              />
              <div className="form-hint">
                Mode: <strong>{isSafeMode ? 'Safe' : 'Unsafe'}</strong> |
                Length: {userContent.length} chars
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-primary">
                Display Content
              </button>

              <button className="btn-secondary"
                onClick={() => setUserContent(dangerousContent)}
                type="button"
              >
                Load Dangerous Example
              </button>

              <button className="btn-clear"
                type="button"
                onClick={() => {
                  setUserContent('');
                  setDisplayContent('');
                }}
              >
                Clear
              </button>
            </div>
          </form>

          <div className="display-section">
            <h4>Display Output:</h4>
            <div className={`display-area ${isSafeMode ? 'safe' : 'unsafe'}`}>{displayContent ? (
              <>
                <div className="raw-output">
                  <strong>Raw HTML:</strong>
                  <pre>{displayContent}</pre>
                </div>

                <div className="rendered-output">
                  <strong>Rendered:</strong>
                  <div
                    className="output-content"
                    dangerouslySetInnerHTML={{ __html: displayContent }}></div>
                </div>
              </>
            ) : (
              <div className="empty-content">
                <p>No content to display. Try entering something above.</p>
              </div>
            )}
            </div>

            {displayContent && (
              <div className="security-analysis">
                <h5>Security Analysis:</h5>
                <div className="analysis-grid">
                  <div className="analysis-item">
                    <span className="analysis-label">Script Tags:</span>
                    <span className={`analysis-value ${displayContent.includes('<script') ? 'danger' : 'safe'}`}>
                      {displayContent.includes('<script') ? 'Found' : 'None'}
                    </span>
                  </div>
                  <div className="analysis-item">
                    <span className="analysis-label">Event Handlers:</span>
                    <span className={`analysis-value ${/on\w+=/i.test(displayContent) ? 'danger' : 'safe'}`}>
                      {/on\w+=/i.test(displayContent) ? 'Found' : 'None'}
                    </span>
                  </div>
                  <div className="analysis-item">
                    <span className="analysis-label">JavaScript URLs:</span>
                    <span className={`analysis-value ${/javascript:/i.test(displayContent) ? 'danger' : 'safe'}`}>
                      {/javascript:/i.test(displayContent) ? 'Found' : 'None'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;