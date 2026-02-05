import { useState } from "react";
import './Grid.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => { // medefinisikan handleLogin dengan parameter e
    e.preventDefault()
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true) // disini aku cuma mau belajar doanh penggunaan usesate di Authentication password dan username sudah di set mungkin akan beda kalo menggunakan object atau database

      // setIsLoggedIn(true) // berhasil login
    }
  }

  const handleLogout = () => { // mendefinisikan handleLogout
    setIsLoggedIn(false) // dibuat false agar user logout dan tidak bisa melihat halaman
    setUsername('') // set username kosonh
    setPassword('') // set password kosong 
  }

  return (

    <div className="app">
      <header className="header">
        <h1>Belajar CSS Layout & Authentication</h1>
      </header>

      <main className="main-content">
        <section className="lesson-section">
          <h2>1. User Authentication</h2>
          <p className="lesson-description">
            Authentication adalah proses verifikasi identitas pengguna.
            Biasanya menggunakan username/email dan password.
          </p>

          <div className="auth-demo">
            <h3>Demo Login Sederhana</h3>

            {!isLoggedIn ? (
              <form className="login-form"
                onSubmit={handleLogin}
              >
                <div className="form-group">
                  <label>Username:</label>
                  <input type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="User"
                  />
                </div>

                <div className="form-group">
                  <label>Password:</label>
                  <input type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                  />
                </div>
                <button type="submit"
                  className="login-btn"
                >Login</button>
                <p className="hint">Coba: username = user, password = password</p>
              </form>
            ) : (
              <div className="welcome">
                <h3>🎉 Login Berhasil!</h3>
                <p>Sekarang Anda sudah login. Ini contoh sederhana authentication di React.</p>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            )}

            <div className="code-example">
              <h4>Konsep dalam React:</h4>
              <ul>
                <li><strong>useState</strong> untuk menyimpan status login</li>
                <li><strong>Conditional Rendering</strong> untuk tampilan berbeda berdasarkan status login</li>
                <li><strong>Event Handling</strong> untuk form submission</li>
              </ul>
            </div>
          </div>
        </section>



      </main>
    </div>
  )
}

export default App;