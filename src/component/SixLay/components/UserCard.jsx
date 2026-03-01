import '../App.css'

const UserCard = ({ user }) => {
  const { id, name, email, role, active } = user

  const roleStyle = {
    admin: { bg: '#ff4757', icon: '👑' },
    editor: { bg: '#ffa502', icon: '✏️' },
    user: { bg: '#70a1ff', icon: '👤' }
  }

  const currentRoleStyle = roleStyle[role] || roleStyle.user;
  return (
    <div className={`user-card ${active ? 'active' : 'inactive'}`}>
      <div className="user-avatar">
        <span className="avatar-icon">
          {String.fromCharCode(65 + ((Number(id) - 1) % 26))}
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
  )
};

export default UserCard