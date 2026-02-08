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
      </div>
    </div>
  )
}

export default Dashboard;