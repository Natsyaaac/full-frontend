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

  const handleSubmit = (e) => {  // mendefinisikan handleSubmit dengan parameter e
    e.preventDefault() // preventDefault mencegah default bawaan browser seperti reload otomatis 
    const validationErrors = validateForm() // mendefiniskan validationErrors dan mengisinya dengan validasi form 

    if (Object.keys(validationErrors).length === 0) {  // jika objeck kunci(yaitu validasi error nya) itu 0 atau tidak ada
      const userData = { //  mendefinisikan user data yang didalam nya ada objeck
        name: formData.name,  // object nama yang ditambahkann ke formdata
        email: formData.email, // object email yang ditambahkan ke formdata
        joinDate: new Date().toLocaleDateString() // set hari baru dengan tanggal yang disesuaikan dengan negaraa menggunakan toLocaleDateString
      }
      onRegister(userData) // set user berhasil register   
    } else { // else 
      setErrors(validationErrors) // set errors jika ada error
    }
  }

  const handleChange = (e) => {  // mendefinisikan handleChange dengan parameter e
    const { name, value } = e.target // mendefiniskan object name dan value dan mengisi nya denga parameter e target
    setFormData({ // mennyalin ulang data 
      ...formData, // data 
      [name]: value // jika user mengedit nama nama tersebut akan dimasukan kedalam object
    })

    if (errors[name]) { // jika nama errors
      setErrors({ // seting errors
        ...errors, // errors nnya
        [name]: '' // nama di setting kosong 
      })
    }
  }


  const validateForm = () => { // mendefiniskan validateForm 
    const newErrors = {} // medefinisikan newErrors untuk menyimpan object object error

    if (!formData.name.trim()) { // jika nama formdata kosonng, tampilkan error
      newErrors.name = 'Nama lengkap wajib diisi'
    }

    if (!formData.email.trim()) { // jika email formdata kosong, tampilkan error
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) { // jika format email tidak mengandung karakter tersebut diatas tampilkan error
      newErrors.email = 'Email tidak valid'
    }

    if (!formData.password) { // jika formdata password tidak ada // tampilkan error
      newErrors.password = 'Password wajib diisi'
    } else if (formData.password.length < 8) { // jika pasword panjang huruf lebih kecil dari 8
      newErrors.password = 'Password minimal 6 karakter'
    } 

    if (!formData.confirmPassword) {  // jika confirmpassworf tidak ada // tampilkan error 
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi'
    } else if (formData.password !== formData.confirmPassword) { // jika format data password tidak sama dengan confirmPassword tampilkan error 
      newErrors.confirmPassword = 'Password tidak cocok'
    }

    if (!agreedToTerms) {  // jika tidak ada agreetoterms tampilkan error 
      newErrors.terms = 'Anda harus menyetujui syarat dan ketentuan'
    }
    return newErrors
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Buat Akun Baru</h2>

      <div className="form-group">
        <label htmlFor="name">Nama Lengkap</label>
        <input type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
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
          value={formData.email}
          onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
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
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Ulangi password"
            className={errors.confirmPassword ? 'error' : ''}
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>
      </div>

      <div className="form-group checkbox-terms">
        <input type="checkbox"
          id="terms"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
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