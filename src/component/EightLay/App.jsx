import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./App.css";
import Login from './pages/Login'
import ProtectedRoute from './pages/ProtectedRoute';
import Layout from './pages/Layout'
import Home from './pages/Home'


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      /* 
        - useEffect dijalankan setelah render pertama karena dependency array kosong
        - fungsi checkauth dengan async 
      */

      try {

        await new Promise(resolve => setTimeout(resolve, 1500))
        const token = localStorage.getItem('token')
        const userData = localStorage.getItem('user')
        /* 
          - menunggu Promise delay resolve (1500) sebelum melanjutkan eksekusi kode 
          - mengambil token ke dalam localstorage bawaan browser
          - mengambil data user ke dalam localstorage bawaan browser
        */

        if (token && userData) {
          setUser(JSON.parse(userData))
          setIsAuthenticated(true)
          /* 
            - pengecekan token dan userdata operasi (&&/AND)
            - jika ada, data usser string json dari localstorage dibuah jadi format yang bisa dipakai  
          */
        }
      } catch (error) {
        console.error('Auth check failed: ', error)
        /* 
        - bagian catch untuk menangkap error jika ada kesalaahan dalam pengambilan data atau lainya 
        */
      } finally {
        setLoading(false)
        /* 
          - finnaly selalu dijalankan baik sukses maupun gagal untuk menghetikan loading 
        */
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path='/login' element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              setUser={setUser}
            />
          } />

          <Route path='/' element={
            <ProtectedRoute isAuthenticated={isAuthenticated} >
              <Layout user={user}>
                <Home /> 
              </Layout>
            </ProtectedRoute>
          } />

          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
