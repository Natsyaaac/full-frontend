import { useState } from "react";

const RegisterForm = ({ onRegister, switchToLogin }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  return (
    <form onSubmit className="auth-form">
      <h2>Buat Akun Baru</h2>

      <div className="form-group">
        <label htmlFor="name">Nama Lengkap</label>
        <input type="text"
          id="name"
          name="name"
          value
          onChange
          placeholder="Masukan nama lengkap"
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email"
          id="email"
          name="email"
          value
          onChange
          placeholder="Masukan email"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password"
            id="password"
            name="password"
            value
            onChange
            placeholder="Masukan password"
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Konfirmasi Password</label>
          <input type="password"
            id="confirmPassword"
            name="confirmPassword"
            value
            onChange
            placeholder="Ulangi password"
            className={errors.confirmPassword ? 'error' : ''}
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>
      </div>

      <div className="form-group checkbox-terms">
        <input type="checkbox"
          id="terms"
          checked
          onChange
        />
        <label htmlFor="terms">Saya menyetujui <a href="#">syarat dan ketentuan</a></label>
        {errors.terms && <span className="error-message">{errors.terms}</span>}
      </div>

      <button type="submit" className="submit-btn">Daftar</button>

      <div className="auth-switch">
        <p>Sudah punya akun? <button type="button" onClick={switchToLogin} className="switch-link">Login di sini</button></p>
      </div>
    </form>
  )
}

export default RegisterForm 