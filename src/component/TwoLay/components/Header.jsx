import React from 'react'
import '../App.css'

const Header = ({ onAddTask, taskCount }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>📋 Task Flow</h1>
          <span className="badge">{taskCount}</span>
        </div>

        <button className="add-button" onClick={onAddTask}>
          <span className="plus">+</span> New Task
        </button>
      </div>
    </header>
  );
};

export default Header