import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'


const Login = ({ setIsAuthenticated, setUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('1. Mencoba login dengan:', formData)

    setIsLoading(true)
    setLoginError('')

    try {
      const response = await axios.post(
        'http://localhost:3001/api/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      console.log('2. Response:', response)
      console.log('3. Response data:', response.data)

      if (response.data && response.data.success) {
        console.log('4. Login sukses, menyimpan data...')

        localStorage.setItem('token', response.data.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.data))

        setUser(response.data.data)
        setIsAuthenticated(true)
        console.log('5. Redirect ke dashboard...')

        navigate('/')
      } else {
        console.log('Login gagal:', response.data.message)
        setLoginError(response.data.message || 'Login gagal')
      }
    } catch (error) {
      console.error('Error detail: ', error)
      if (error.response) {
        setLoginError(error.response.data.message || 'Login gagal')
      } else if (error.request) {
        setLoginError('Tidak bisa connect ke server')
      } else {
        setLoginError('Terjadi kesalahan')
      }
    } finally {
      setIsLoading(false)
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
      </div>
    </div>
  )
};

export default Login;
