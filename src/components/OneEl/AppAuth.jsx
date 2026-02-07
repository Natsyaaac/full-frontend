import { useState } from "react";
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import DashboardAuth from './Dashboard'
import './styles.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);


  const handleLogin = (userData) => { // mendefinisikan handleLogin dengan parameter userData
    setIsAuthenticated(true) // set user true jika berhasil login
    setCurrentUser(userData) // simpan data user ke userdata jika memakai objeck atau database dia akan tersimpan disitu 
  }

  const handleLogout = () => { // mendefiniskan handleLogout 
    setIsAuthenticated(false) // set user false jika user logout 
    setCurrentUser(null) // set data user null atau tidak ada 
  }

  const handleRegister = (userData) => { // mendefiiniskan handleRegister dengan parameter userData
    setIsAuthenticated(true) // set user true jika berhasil login
    setCurrentUser(userData)  // simpan data user ke userdata jika memakai objeck atau database dia akan tersimpan disitu 
  }

  //karna ini cuma latihan memamhami penggunaan usestate pada login setiap user login atau register itu akan selalu true atau berhasil login dikarenakan tidak ada object yang tersimpan ke dtaabase ataupun ke array 

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Website Autentikasi Pengguna</h1>
        {isAuthenticated && (
          //jika berhasil login tampilkan ini 

          <div className="user-info">
            <span>Halo, {currentUser?.name || currentUser?.email}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        )}
      </header>

      <main className="main-content">
        {isAuthenticated ? (
          // jika berhasil login tampilkan ini 
          <DashboardAuth user={currentUser} onLogout={handleLogout} />
        ) : (
          // jika false atau tidak login tampilkan ini 
          <div className="auth-container">
            <div className="auth-tabs">
              <button
                className={`tab-btn ${!showRegister ? 'active' : ''}`}
                // jika bukan showrigister set active / set tidak active
                onClick={() => setShowRegister(false)}
              >
                Login
              </button>
              <button
                className={`tab-btn ${showRegister ? 'active' : ''}`}
                // jika showregister set active / set tidak active
                onClick={() => setShowRegister(true)}
              //showRegister itu parameter yang digunakan untuk menampilkan halaman register 
              >
                Register
              </button>
            </div>

            {showRegister ? (
              <RegisterForm onRegister={handleRegister}
                switchToLogin={() => setShowRegister(false)} />
            ) : (
              <LoginForm onLogin={handleLogin}
                switchToRegister={() => setShowRegister(true)} />
            )}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2023 Website Autentikasi. Dibuat dengan React + Vite</p>
        <div className="tech-tags">
          <span>Grid</span>
          <span>Flexbox</span>
          <span>Media Query</span>
          <span>useState</span>
        </div>
      </footer>
    </div>
  )
}

export default App;