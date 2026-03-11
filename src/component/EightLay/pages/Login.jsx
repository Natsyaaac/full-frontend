import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'


const Login = ({ setIsAuthenticated, setUser }) => {
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    // fungsi henldeChange untuk merubah task (judul atau deskripsi) 

    const { name, value } = e.target
    /* 
    destructing untuk mengambil name dan value dari elemen input yang memicu event
    */
    setFormData(prev => ({
      ...prev,
      [name]: value

      /*
        menyalin semua inputan masuk (shallow copy)
        overide nama dengan yang baru 
      */
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('1. Mencoba login dengan:', formData)
    /* 
      -fungsi submit dengan event object dari event handler
      -e.preventDefault() untuk mencegah default reload daei browser
      -console untuk debugging 
    */
    setErrors({})
    // reset supaya eroro lama tidak muncul lagi 
    const newErrors = {}
    // untuk menyimpan error yang muncul 

    if (formData.username !== "admin" && formData.username !== "user") {
      newErrors.username = "Username tidak ditemukan"

      /* 
        - pengecekan jika admin atau user tidak sama dengan inputan tampilkan error 
      */
    }

    else {
      if (
        (formData.username === "admin" && formData.password !== "admin123") ||
        (formData.username === "user" && formData.password !== "user123")
      ) {
        newErrors.password = "Password salah"
      }

      /* 
        - pengecekan jika username valid tapi passowrd salah tampilkan errors
      */
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return

      /*
        -Object.keys(newErrors) mengambil semua key error
        - jika jumlah nya lebih dari 0 berarti ada error 
        - kirim error ke state React
        - return mengehntikan fungsi sehingga axios tidak dijalankan 
      */
    }

    setIsLoading(true)
    setLoginError('')
    /* 
      -mengaktifkan loading 
      -membuat error menjadi tidak 
    */

    try {
      const response = await axios.post(
        'http://localhost:3001/api/login',
        formData,

        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        /*
          -mengirim http post request ke endpoint login menggunakan axios 
          - data formdata dikirim sebagai body request 
          - header content-type menunjukan data dikirim dalam format JSON
        */
      )
      console.log('2. Response:', response)
      console.log('3. Response data:', response.data)
      /*
        - console untuk debug response server dan response data yang dikirimkan 
      */

      if (response.data && response.data.success) {
        console.log('4. Login sukses, menyimpan data...')

        localStorage.setItem('token', response.data.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.data))

        setUser(response.data.data)
        setIsAuthenticated(true)
        console.log('5. Redirect ke dashboard...')

        navigate('/')

        /* 
          - debugin untuk jika user berhasil login 
          - menyimpan token hasil login dan data user ke localstorage dalam bentuk JSON string
          - menyimpan data user ke state react 
          - menandakan bahwa 
          fungsi dari react router untuk berpindah ke halaman utama
        */
      } else {
        console.log('Login gagal:', response.data.message)
        setLoginError(response.data.message || 'Login gagal')

        /*
          - debugging jika user gagal login  
          - set login error, error dari response data atau pesan error biasa (operasi or/||)
        */
      }
    } catch (error) {
      console.error('Error detail: ', error)
      /* 
        - menangkap error yang terjadi pada request http dan menampilkan pesan error setelah error terjadi
      */
      if (error.response) {
        setLoginError('Login gagal')
        /* 
          - pengecekan jika error disebabkan mengirim response server tampilkan pesan error data, atau pesat teks error (||)
        */
      } else if (error.request) {
        setLoginError('Tidak bisa connect ke server')
        /* 
          - pengecekan error dari request yang sudah dikirim tapi server tidak meresponse dan set error tesk (tidak bisa ...)

        */
      } else {
        setLoginError('Terjadi kesalahan')
        /* 
          - pengecekan jika error disebabkanhal lain (koneksi atau lainya)
        */
      }
    } finally {
      setIsLoading(false)
      /* 
        - finally akan tetap dijalankan walaupun dengan kondisi error ataupun tidak untuk menghetikan loading 
      */
    }
  }


  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-brand">
          <div className="brand-content">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h1>TaskFlow</h1>
            <p>Manage your tasks efficiently with our modern task management system.</p>

            <div className="brand-features">
              <div className="feature">
                <span>✓</span>
                <span>Task Organization</span>
              </div>
              <div className="feature">
                <span>✓</span>
                <span>Priority Management</span>
              </div>
              <div className="feature">
                <span>✓</span>
                <span>Progress Tracking</span>
              </div>
            </div>
          </div>
        </div>

        <div className="login-form-section">
          <div className="from-wrapper">
            <h2>Welcome Back!</h2>
            <p>Plese Login to your</p>

            <div className="demo-info">
              <p>🔑 Demo Credentials:</p>
              <p>👤 Admin: <strong>admin</strong>/<strong>admin123</strong></p>
              <p>👤 User: <strong>user</strong>/<strong>user123</strong></p>
            </div>

            {loginError && (
              <div className="login-error">
                ❌ {loginError}
              </div>
            )}

            <form onSubmit={handleSubmit} className='login-form'>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id='username'
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                  placeholder='Enter username'
                  className={errors.username ? 'error' : ''}
                  disabled={isLoading}
                />
                {errors.username && (
                  <div className="error-message">
                    {errors.username}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Enter password'
                  className={errors.username ? 'error' : ''}
                  disabled={isLoading}
                />
                {errors.password && (
                  <div className="error-message">
                    {errors.password}
                  </div>
                )}
              </div>

              <button className="login-btn"
                type='submit'
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading-spinner-small"></span>
                ) : (
                  'Login'
                )}
              </button>

              <div className="login-footer">
                <a href="#">or create account</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;
