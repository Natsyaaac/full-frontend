import { useState } from "react";
import { escapeHTML, sanitizeForHTML, validateFormInput } from './utils/sanitizer'

const UserManagement = ({ users, onAddUser, onDeleteUser, isSafeMode }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'User'
  });

  const [errors, setErrors] = useState({});
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const roles = ['Admin', 'User', 'Moderator', 'Guest'];

  return (
    <div className="user-managemnt">
      <div className="section-header">
        <h3>👥 User Management</h3>
        <div className="security-badge">
          <span className={`badge ${isSafeMode ? 'safe' : 'warmimg'}`}>
            {isSafeMode ?  '🔒 Safe Mode' : '⚠️ Unsafe Mode'}
          </span>
        </div>
      </div>
  
      <div className="add-user-form">
        <h4>Add New User</h4>
        <form onSubmit>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name"
                name="name"
                value
                onChange
                placeholder="Enter full name"
                className={errors.name ? 'error' : ''}
                maxLength='50'
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
              {newUser.name && (
                <div className="input-priview">
                  <small>Priview: {isSafeMode ?escapeHTML(newUser.name) : newUser.name}</small>
                </div>
              )}
            </div>


            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value 
                onChange
                placeholder="user@example.com"
                className={errors.email ? 'error' : ''}
                maxLength='100' 
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select 
                name="role" 
                id="role"
                value
                onChange
                className={errors.role ? 'error' : ''}
                >
                  {roles.map(role => (
                    <option value key={role}>{role}</option>
                  ))}
                </select>
                {errors.role && <div className="error-message">{errors.role}</div>}
            </div>


            <div className="form-group">
              <label>&nbsp;</label>
              <button type="submit" className="btn-add">
                <span className="btn-icon">➕</span> Add User
              </button>
            </div>
          </div>
        </form>
      </div>




    </div>
  )
}
export default UserManagement;