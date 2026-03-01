import React from 'react';
import '../App.css'

const Header = ({ onFilterChange, stats, currentFilter }) => {
  const statsList = Object.entries(stats).map(([key, value]) => ({
    label: key.replace(/([A-Z])/g, ' $1').toUpperCase(),
    value: value,
    key: key
  }));

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">📊 Explorer's Dashboard Bug</h1>

        <div className="stats-grid">
          {statsList.map((stat) => (
            <div className="stat-card" key={stat.key}>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="filter-section">
          <span className="filter-label">Filter Users:</span>
          <div className="filter-buttons">
            {['all', 'active', 'inactive'].map((filter) => (
              <button
                className={`filter-btn ${currentFilter === filter ? 'active' : ''}`}
                key={filter}
                onClick={() => onFilterChange(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header