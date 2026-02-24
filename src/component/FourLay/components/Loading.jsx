import React from 'react'
import '../App.css'

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
      <p className="loading-text">Memuat Order</p>
    </div>
  )
}

export default Loading