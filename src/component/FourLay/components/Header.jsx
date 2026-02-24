import React from 'react';
import '../App.css';

const Header = ({ orderCount, onAddOrder}) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>📋Order Flow</h1>
          <span className="badge">{orderCount}</span>
        </div>

        <button className="add-button" onClick={onAddOrder}>
          <span className="plus">+</span> New Task
        </button>
      </div>
    </header>
  )
}

export default Header