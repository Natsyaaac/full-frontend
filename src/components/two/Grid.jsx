import React, { useState } from 'react';
import './Grid.css';

function GridGithubApp() {
  const [activeTab, setActiveTab] = useState('overview');
  const [notification, setNotifications] = useState(3);

  const repositories = [
    {
      id: 1,
      title: 'react-dark-dashboard',
      description: 'Modern dark mode dashboard built with React and Tailwind CSS',
      language: 'TypeScript',
      languageColor: '#3178c6',
      stars: 1245,
      forks: 234,
      isPublic: true
    },
    {
      id: 2,
      title: 'nextjs-ecommerce',
      description: 'Full-featured e-commerce platform built with Next.js 14',
      language: 'JavaScript',
      languageColor: '#f1e05a',
      stars: 892,
      forks: 156,
      isPublic: true
    },
    {
      id: 3,
      title: 'ai-code-assistant',
      description: 'AI-powered code completion and documentation tool',
      language: 'Python',
      languageColor: '#3572A5',
      stars: 2103,
      forks: 421,
      isPublic: false
    },
    {
      id: 4,
      title: 'portfolio-v3',
      description: 'Personal developer portfolio with 3D animations',
      language: 'TypeScript',
      languageColor: '#3178c6',
      stars: 567,
      forks: 89,
      isPublic: true
    },
    {
      id: 5,
      title: 'design-system',
      description: 'Component library and design system for React applications',
      language: 'TypeScript',
      languageColor: '#3178c6',
      stars: 734,
      forks: 123,
      isPublic: true
    },
    {
      id: 6,
      title: 'dev-tools-cli',
      description: 'CLI tool for developers with git utilities and automation',
      language: 'Golang',
      languageColor: '#00ADD8',
      stars: 456,
      forks: 78,
      isPublic: true
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', count: null },
    { id: 'repositories', label: 'Repositories', count: 24 },
    { id: 'projects', label: 'Projects', count: 3 },
    { id: 'packages', label: 'Packages', count: 2 },
    { id: 'stars', label: 'Stars', count: 128 }
  ]

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a href='#' className="nav-logo">
            <i className="fab fa-github"></i>
            Github
          </a>

          <div className="search-container">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              className="search-input"
              placeholder='Search Github...'
            />
          </div>

          <div className="nav-icons">
            <button className="icon-btn">
              <i className="far fa-bell"></i>
              {notification > 0 && (
                <span className="notification-badge">
                  {notification}
                </span>
              )}
            </button>

            <button className="icon-btn">
              <i className="fas fa-plus"></i>
            </button>

            <button className="icon-btn">
              <img src="https://i.pinimg.com/736x/7c/b9/09/7cb9097cf4218e943c771fea092a0c42.jpg?v=4" alt="Profile"
                style={{ width: '30px', height: '30px', borderRadius: '50%' }}
              />
            </button>
          </div>
        </div>
      </nav>

      <div className="main-container">
        {/* Profile Sidebar */}
        <aside className="profile-sidebar">
          <div className="profile-avatar">
            <img src="https://i.pinimg.com/736x/7c/b9/09/7cb9097cf4218e943c771fea092a0c42.jpg?v=4" alt="Developer Avatar"
            />
          </div>

          <h1 className="profile-name">Luvluv</h1>
          <p className="profile-username">@luvluv</p>

          <button className="edit-profile-btn">
            <i className="fas fa-pencil-alt"></i>
            Edit Profile
          </button>

          {/* Stats */}
          <div className="stats-overview">
            <h3 className="stats-title">Developer Stats</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">1.2k</div>
                <div className="stat-label">Folowers</div>
              </div>

              <div className="stat-item">
                <div className="stat-number">384</div>
                <div className="stat-label">Following</div>
              </div>

              <div className="stat-item">
                <div className="stat-number">24</div>
                <div className="stat-label">Repos</div>
              </div>

              <div className="stat-item">
                <div className="stat-number">128</div>
                <div className="stat-label">Stars</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="main-content">
          {/* Tab Menu */}
          <div className="tab-menu">
            <ul className="tab-list">
              {tabs.map(tab => (
                <li
                  key={tab.id}
                  className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span className="tab-count">{tab.count}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Repositories */}
          <div className="section-header">
            <h2 className="section-title">Popular repositories</h2>
            <a href="#" className="customize-link">
              <i className="fas fa-thumbtack"></i>
              Costumize your pins
            </a>
          </div>

          <div className="repo-grid">
            {repositories.map(repo => (
              <div className="repo-card" key={repo.id}>
                <div className="repo-header">
                  <a href="#" className="repo-title">
                    <i className="far fa-bookmark"></i>
                    {repo.title}
                  </a>
                  {repo.isPublic && (
                    <span className="repo-badge">Public</span>
                  )}
                </div>

                <p className="repo-description">{repo.description}</p>

                <div className="repo-footer">
                  <div className="repo-language">
                    <span className="language-color"
                      style={{ backgroundColor: repo.backgroundColor }}
                    ></span>
                    {repo.language}
                  </div>

                  <div className="repo-stats">
                    <div className="repo-stat">
                      <i className="far fa-star"></i>
                      {repo.stars.toLocaleString()}
                    </div>
                    <div className="repo-stat">
                      <i className="fas fa-code-branch"></i>
                      {repo.forks}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
    </>
  )
}

export default GridGithubApp;