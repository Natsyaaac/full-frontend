const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Selamat Datang di Dashboard</h2>
        <p>Anda berhasil login ke sistem autentikasi</p>
      </div>


      <div className="dashboard-grid">
        <div className="dashboard-card profile-card">
          <h3>Profil Pengguna</h3>
          <div className="profile-info">
            <div className="avatar">{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</div>
            <div className="profile-details">
              <p><strong>Nama:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Bergabung:</strong> {user.joinDate || 'Hari ini'}</p>
            </div>
          </div>
        </div>


        <div className="dashboard-card stats-card">
          <h3>Statistik Akun</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">12</span>
              <span className="stat-label">Aktivitas</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3</span>
              <span className="stat-label">Pesan</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5</span>
              <span className="stat-label">Notifikasi</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1</span>
              <span className="stat-label">Perangkat</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card actions-card">
          <h3>Actions</h3>
          <div className="actions-list">
            <button className="action-btn">Edit Profil</button>
            <button className="action-btn">Ubah Password</button>
            <button className="action-btn">Pengaturan Privasi</button>
            <button className="action-btn logout-action" onClick={onLogout}>Logout</button>
          </div>
        </div>

        <div className="dashboard-card recent-card">
          <h3>Aktivitas Terakhir</h3>
          <ul className="activity-list">
            <li>Login berhasil - Hari ini</li>
            <li>Update profil - 2 hari lalu</li>
            <li>Ganti password - 1 minggu lalu</li>
            <li>Login dari perangkat baru - 2 minggu lalu</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard