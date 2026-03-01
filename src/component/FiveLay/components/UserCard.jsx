import '../App.css';

const UserCard = ({ user }) => {
  const { name, email, role, active, id } = user;
  // melakukan object destructing untuk mengeektraj properti, sehingga tiap properti menjadi variable terpisah tanpa mengakses user.name, user.emal dst

  const roleStyle = {
    admin: { bg: '#ff4757', icon: '👑' },
    editor: { bg: '#ffa502', icon: '✏️' },
    user: { bg: '#70a1ff', icon: '👤' }
    // object literal yang berfungsi sebagai lookup table, memtakan setiap role ke konfigurasi style 
  };

  const currentRoleStyle = roleStyle[role] || roleStyle.user;
  // mengakses properti object roleStyle secara dinamis berdasarkan nilai var rol, jika role tidak ditemukan maka menggunakan default style 
  return (
    <div className={`user-card ${active ? 'active': 'inactive'}`}>
      <div className="user-avatar">
        <span className="avatar-icon">
          {String.fromCharCode(65 + ((Number(id) -1) % 26))
          // dipakai untuk mengubah id jadi huruf A-Z secara berulang 
          }
        </span>
      </div>

      <div className="user-info">
        <h3 className="user-name">{name}</h3>
        <p className="user-email">{email}</p>

        <div className="user-meta">
          <span className="user-role"
            style={{
              backgroundColor: currentRoleStyle.bg
            }}
          >
            {currentRoleStyle.icon} {role}
          </span>
          <span className={`user-status ${active ? 'online' : 'offline'}`}>
            {active ? '● Active' : '○ Offline'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserCard