import { useState } from "react";

const LoginForm = ({ onLogin, switchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length === 0) {
      const userData = {
        email: formData.email,
        name: formData.email.split('@')[0], // Ambil nama dari email
        rememberMe
      }
      onLogin(userData)
    } else {
      setErrors(validationErrors)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }
  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email tidak valid'
    }

    if (!formData.password) {
      newErrors.password = 'Password wajib diisi'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 6 karakter'
    }

    return newErrors
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login ke Akun Anda</h2>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Masukan Nama email Anda"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>


      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Masukan Password"
          className={errors.password ? 'error' : ''}
        />
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>

      <div className="form-options">
        <div className="checkbox-group">
          <input type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe">Ingat saya</label>
        </div>
        <a href="#" className="forgot-password">Lupa password?</a>
      </div>

      <button type="submit" className="submit-btn">Login</button>

      <div className="auth-switch">
        <p>Belum punya akun? <button type="button" onClick={switchToRegister} className="switch-link">Daftar di sini</button></p>
      </div>

      <div className="social-login">
        <p>Atau login dengan:</p>
        <div className="social-buttons">
          <button type="button" className="social-btn google">Google</button>
          <button type="button" className="social-btn facebook">Facebook</button>
        </div>
      </div>
    </form>
  )
}

export default LoginForm