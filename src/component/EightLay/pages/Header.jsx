import React from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'


const Header = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }
};

export default Header;
