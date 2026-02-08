import { useState, useEffect } from 'react';
import { validateFormInput, detectXSS, escapeHTML } from './utils/sanitizer';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [xssDetections, setXssDetections] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputHistory, setInputHistory] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>🔒 Secure Login System</h2>
        <p>Anti-XSS Protected Form</p>
      </div>

      <form onSubmit className="login-form">
        {errors.security && (
          <div className="alert alert-danger">
            <strong>⚠️ Security Alert:</strong> {errors.security}
          </div>
        )}

        {xssDetections.length > 0 && (
          <div className="xss-warning">
            <div className="warning-header">
              <span className="warning-icon">🚨</span>
              <strong>XSS Detection Active</strong>
            </div>

            <div className="detection-list">
              {xssDetections.map((detection, index) => (
                <div className={`detection-item ${detection.severity}`}>
                  <span className="detection-type">{detection.type}</span>
                  <span className="detection-severity">({detection.severity})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="username">
            <span className="label-icon">👤</span>
            Username
          </label>
          <input
            type="text"
            id='username'
            name='username'
            value
            onChange
            placeholder='Enter yout username'
            className={errors.username ? 'error' : ''}
            maxLength='50'
          />
          {errors.username && <div className="error-message">{errors.username}</div>}

          {formData.username && (
            <div className="sanitized-priview">
              <small>Sanitized: {formData.username}</small>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            <span className="label-icon">📧</span>
            Email Address
          </label>
          <input
            type="email"
            id='email'
            name='email'
            value
            onChange
            placeholder='user@example.com'
            className={errors.email ? 'error' : ''}
            maxLength='100'
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password">
            <span className="label-icon">🔑</span>
            Password
          </label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              value
              onChange
              placeholder='••••••••'
              className={errors.password ? 'error' : ''}
              maxLength='100'
            />
            <button className="password-toggle"
              type='button'
              onClick
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>

        
      </form>
    </div>
  )
}

export default LoginForm

