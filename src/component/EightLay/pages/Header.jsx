import React from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'


const Header = ({user}) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }
  /* 
    - fungsi handleClick untuk logout 
    - menghapus dari localstorage toke dan user 
    - navigasi kembali ke login 
  */

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>TaskFlow</span>
        </div>

        <div className="header-user">
          <span className="header-user-name">
            {user?.username || 'User'}
          </span>
          <button className="header-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
};

export default Header;
