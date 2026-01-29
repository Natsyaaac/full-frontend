import './Grid.css'
import { useState } from 'react'


function GridLayoutMobile() {
  const [activeTab, setActiveTab] = useState('https')
  const [pinned, setPinned] = useState(false)
  const [watching, setWatching] = useState(true)
  const [forked, setForked] = useState(false)
  const [starred, setStarred] = useState(true)

  const copyToClipboard = () => {
    const url = activeTab === 'https'
      ? 'https://github.com/username/project-name.git'
      : 'git@github.com:username/project-name.git'

    navigator.clipboard.writeText(url)
    alert('URL copied to clipboard!')
  }

  return (
    <div className="container">
      <div className="repo-header">
        <div className="repo-title">
          <h1>react-dark-ui</h1>
          <span></span>
          <h1>github-inspired</h1>
          <span className="badge">
            <i className="fas a-globe"></i>
            Public
          </span>
        </div>

        <div className="actions">
          <button
            className={`action-btn ${pinned ? 'active' : ''}`}
            onClick={() => setPinned(!pinned)}
          >
            <i
              className={`fas ${pinned ? 'fa-star' : 'fa-thumbtack'}`}
            ></i>
            {pinned ? 'Pinned' : 'Pin'}
          </button>

          <button
            className={`action-btn ${watching ? 'active' : ''}`}
            onClick={() => setWatching(!watching)}
          >
            <i className="fas fa-eye"></i>
            {watching ? 'Watching' : 'Watch'} • 128
          </button>

          <button
            className={`action-btn ${forked ? 'active' : ''}`}
            onClick={() => setForked(!forked)}
          >
            <i className="fas fa-code-branch"></i>
            {forked ? 'Forked' : 'Fork'} • 42
          </button>

          <button
            className={`action-btn ${starred ? 'active' : ''}`}
            onClick={() => setStarred(!starred)}
          >
            <i className={`fas ${starred ? 'fa-star' : 'fa-star'}`}></i>
            {starred ? 'Starred' : 'Star'} • 1.2k
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="cards-grid">
        <div className="card">
          <h3><i className="fas fa-book"></i> Documentation</h3>
          <p>Complete guide to getting started with this project. Includes</p>

          <div className="card-stats">
            <div className="stat">
              <i className="fas fa-file-alt"></i>
              <span>24 pages</span>
            </div>

            <div className="stat">
              <i className="fas fa-clock"></i>
              <span>Update 2 days ago</span>
            </div>
          </div>

          <button className="cta-btn">
            <i className="fas fa-book-open"></i> Read Documentation
          </button>
        </div>

        <div className="card">
          <h3>
            <i className="fas fa-rocket"></i> Quick Start
          </h3>
          <p>Jump right into project with our quick start guide. Clone the repo and run a single command to see it in action.</p>

          <div className="card-stats">
            <div className="stat">
              <i className="fas fa-download"></i>
              <span>1.4 MB</span>
            </div>

            <div className="stat">
              <i className="fas fa-code"></i>
              <span>TypeScript + React</span>
            </div>
          </div>

          <button className="cta-btn secondary">
            <i className="fas fa-play circle"></i> Quick Start Guide
          </button>
        </div>
      </div>

      {/* Quick Setup */}
      <div className="quick-setup">
        <h2><i className="fas fa-bolt"></i> Quick setup</h2>

        <div className="setup-tabs">
          <button
            className={`tab-btn ${activeTab === 'https' ? 'active' : ''}`}
            onClick={() => setActiveTab('https')}
          >
            <i className="fas fa-lock"></i>HTTPS
          </button>

          <button
            className={`tab-btn ${activeTab === 'ssh' ? 'active' : ''}`}
            onClick={() => setActiveTab('ssh')}
          >
            <i className="fas fa-key"></i>SSH
          </button>
        </div>

        <div style={{ position: 'relative' }}>
          <input type="text"
            className='url-input'
            readOnly
            value={
              activeTab === 'https'
                ? 'https://github.com/username/react-dark-ui.git'
                : 'git@github.com:username/react-dark-ui.git'
            }
          />

          <button className="copy-btn" onClick={copyToClipboard}>
            <i className="fa fa-copy"></i> Copy
          </button>
        </div>

        <p
          style={{ color: '#8b949e', fontSize: '0.9rem', marginTop: '1rem'}}
        >
          <i className="fas fa-info-circle"></i> Run <code style={{ background: '#0d1117', padding: '2px 6px', borderRadius: '4px' }}>Git clone</code>with the copied URL
        </p>
      </div>
    </div>
  );
};

export default GridLayoutMobile;