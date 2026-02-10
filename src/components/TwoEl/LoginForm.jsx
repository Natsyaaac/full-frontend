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


  useEffect(() => {  // menggunakan useEffect untuk nama fungsi 
    const checkAllInputs = () => {  // membuaat variable  checkAllInputs
      const allInputs = Object.values(formData).join(' ');  // membuat variable allInputs untuk menyimpan data dari form input 
      const detections = detectXSS(allInputs); // membuat variable detections untuk menyimpan detectXSS yang dibuat di file sanitizer untuk menyaring keyword berbahaya
      setXssDetections(detections);  // simpan hadil detecsi ke setXssDetections parameter detections untuk membuat data itu bisa ditampilkan 
    };

    checkAllInputs(); // pengecekan seluruh input dan mengulangi untuk inputan selanjutnya 
  }, [formData]);


  const handleSubmit = async (e) => {  // fungsi async untuk mengirim data form 
    e.preventDefault(); // pencegahan dari default browser 

    const validationErrors = validateForm() // pengecekan error pada form seperti kesalah type atau lainya 

    if (Object.keys(validationErrors).length > 0) {  // jika error di temukan 
      setErrors(validationErrors); // set error dan tampilkan 
      return; // kembalikan nilai untuk error selanjutnya 
    }

    setIsSubmitting(true); // jika tidak ada kirim data 

    await new Promise(resolve => setTimeout(resolve, 1500)); // menunggu 1500 untuk pengecekan data 

    onLogin({ // menyimpan object ke array yang sudah tersedia 
      username: formData.username,  // menyimpan nama user 
      email: formData.email, // email user 
      loginTime: new Date().toISOString() // menyimpan waktu user login 
      // dibuat string menggunakaan toISOString()
    });

    setIsSubmitting(false);  // set false agar form itu menghilang setelah login 
  }

  const handleInputChange = (e) => { // membuat variable handleInputChange dengan parameter e 
    const { name, value } = e.target; // membuat variable name dan value diisi dengan target dari form 

    const sanitizedValue = escapeHTML(value); // membuat variable sanitizedValue diisi dengan escapeHTML (dari file sanitizer) dengan parameter value yang sudah dibuat tadi 

    setFormData(prev => ({  // memnyalin semua object dari set formdata dan menyimpan di prev 
      ...prev,
      [name]: sanitizedValue  // melakukan pengecekan name jika ada input berbahaya 
    }));

    if (value.trim()) {  // jika value kosong menggunakan trim() bawaan js
      setInputHistory(prev => [  // membuat wadah untuk hasil history yang dilakukan sebelumnya (jika ada)
        {
          field: name, // setting nama
          value: sanitizedValue.substring(0, 50) + (sanitizedValue.length > 50 ? '...' : ''), // setting value dengan substring minimal 50 jika teks 50 lebih tampikan ... untuk tampilan saja 
          timestamp: new Date().toLocaleTimeString(), // set waktu baru sesuai dengan negara masing masing 
          xssDetected: detectXSS(value).length > 0  // set deteksi xss untuk pengecekan value jika lebih dari 0 atau ada 
        },

        ...prev.slice(0, 9) // batasi agar cuma 10 history 
      ])
    }

    if (errors[name]) {  // jika ada error pada nama 
      setErrors(prev => ({ // seterror dan membuat salinan nama 
        ...prev,
        [name]: '' // nama dibikin kosong agar isi tidak masuk ke object data 
      }))
    }
  }


  const validateForm = () => { // variable baru untuk digunakan di fungsi lain 
    const newErrors = {};  // untuk menyimpan error
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // menyimpan karakter regex

    if (!formData.username.trim()) {  // pengecekan jika input nama user kosong
      newErrors.username = 'Username Harus ada';
    } else if (formData.username.length < 3) { // pengecekan jika input nama user lebih kecil dari 3
      newErrors.username = 'username Harus lebih dari 3 karakter';
    } else if (!validateFormInput(formData.username)) { // pengecekan karakter berbahaya menggunakan validateFormInput(dari file sanitizer) di input user nama 
      newErrors.username = 'Username tidak boleh karakter yang invalid';
    }

    if (!formData.email.trim()) { // pengecekan jika input email kosong
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) { // pengecekan karakter regex di inputan email
      newErrors.email = 'Invalid email format';
    } else if (!validateFormInput(formData.email)) { // pengencekan karakter berbahaya menggunakan validateFormInput(dari file sanitizer) di input email
      newErrors.email = 'Email contains invalid karakter';
    }

    if (!formData.password) {  // pengecekan jika password kosong 
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) { // pengecekan password harus lebih besar dari 8 karakter 
      newErrors.password = 'Password must be at least 8 char';
    } else if (!validateFormInput(formData.password)) { // pengecekan karakter berbahaya menggunakan validateFormInput(dari file sanitizer) di input password
      newErrors.password = 'Password contains invalid characters';
    }

    if (xssDetections.length > 0) {  // pengecekan jika ada keyword berbahaya lebih itu 
      newErrors.security = 'Potential security threat detected'
    }

    return newErrors; // membersihkan dan mengembalikan nilai 
  }


  const testXSS = (testCase) => {  // membuat fungsi baru
    setFormData(prev => ({ // membuat object palsu 
      ...prev,
      username: testCase, // set nama dari array yang sudah menyimpan object 
      password: 'test123' // set password test123 
    }))

    // fungsi ini berguna unutuk membuat isi form palsi untuk pengetesan pada input nama 
  }

  const testCases = [ // variabel baru berfungsi sebagai array untuk menyimpan object yang diperlukan untuk pengetesan 
    { label: 'Normal Input', value: 'john_doe' },
    { label: 'Script Tag', value: '<script>alert("xss")</script>' },
    { label: 'Event Handler', value: '" onmouseover="alert(1)' },
    { label: 'JavaScript', value: 'javascript:alert("xss")' },
    { label: 'Image XSS', value: '<img src="x" onerror="alert(1)">' }
  ];

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>🔒 Secure Login System</h2>
        <p>Anti-XSS Protected Form</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
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
                <div key={index} className={`detection-item ${detection.severity}`}>
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
            value={formData.username}
            onChange={handleInputChange}
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
            value={formData.email}
            onChange={handleInputChange}
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
              value={formData.password}
              onChange={handleInputChange}
              placeholder='••••••••'
              className={errors.password ? 'error' : ''}
              maxLength='100'
            />
            <button className="password-toggle"
              type='button'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {errors.password && <div className="error-message">{errors.password}</div>}

          {formData.password && (
            <div className="password-strength">
              <div className="strength-meter">
                <div className="strength-fill"
                  style={{
                    width: `${Math.min(formData.password.length * 10, 100)}%`,
                    backgroundColor: formData.password.length >= 8 ? '#10b981' : '#f59e0b'
                  }}
                />
              </div>
              <small>
                {formData.password.length >= 8 ? 'Strong' : 'Weak'} password
              </small>
            </div>
          )}
        </div>

        <button className="submit-btn"
          type='submit'
          disabled={isSubmitting || xssDetections.length > 0}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Securing Login...
            </>
          ) : (
            <>
              <span className="btn-icon">🔐</span>
              Secure Login
            </>
          )}
        </button>

        <div className="security-status">
          <div className={`status-indicator ${xssDetections.length > 0 ? 'danger' : 'safe'}`}>
            <span>
              {xssDetections.length > 0 ? `${xssDetections.length} XSS Attempt(s) Blocked` : 'No threats detected'}
            </span>
          </div>
        </div>
      </form>



    </div>
  )
}

export default LoginForm

