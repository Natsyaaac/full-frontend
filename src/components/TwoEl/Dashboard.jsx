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

          <form onSubmit className="content-form">
            <div className="form-group">
              <label>Enter Content (try XSS):</label>
              <textarea
                value
                onChange
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
                onClick
                type="button"
              >
                Load Dangerous Example
              </button>

              <button className="btn-clear"
                type="button"
                onClick
              >
                Clear
              </button>
            </div>
          </form>


          
        </div>
      </div>
    </div>
  )
}

export default Dashboard;