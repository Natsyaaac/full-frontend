import React from "react";
import { Navigate } from "react-router-dom";
import '../App.css'


const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  return children
}

export default ProtectedRoute