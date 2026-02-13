import { useState } from "react";
import { escapeHTML, sanitizeForHTML, validateFormInput } from './utils/sanitizer'

const UserManagement = ({ users, onAddUser, onDeleteUser, isSafeMode }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'User'
  });

  const [errors, setErrors] = useState({});
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const roles = ['Admin', 'User', 'Moderator', 'Guest'];


  const handleInputChange = (e) => {  // function ini adalah generic handler untuk semua input field, ia bekerja berdasarkan atribute name pada input sehingga satu function bisa menangani banyak field
    const { name, value } = e.target; // mengambil properti 'name' dan value dari elemen input yang sedang dirubah , 'name' digunakan sebagai penentu field mana di state yang akan diperbarui

    const sanitizedValue = isSafeMode ? escapeHTML(value) : value;  //jika mode aktif, maka value disanitasi untuk mencegah, jika tidak, maka value apa adanya, sanitasi di frontend membantu mengurangi risiko, tetapi tetap harus divalidasi ulang di backend 

    setNewUser(prev => ({  // menggunakan callback dengan parameter prev untuk memastikan kita memakai state terbaru 
      ...prev, // menyalin seluruh propertu sebelumnya agar field lain tidak terhapus 
      [name]: sanitizedValue // menggunakan coputed property name untuk memperbarui field tertentu, sesuai dengan atribute 'name' dari input yang berubah  
    }));

    if (errors[name]) {  //  mengecek apakah sebelumnya field ini memiliki error 
      setErrors(prev => ({  // callback dengan parameter prev untuk menyalin error sebelumnya agar error lain tidak hilang 
        ...prev,
        [name]: '' // menghapus pesan error hanya untuk field yang sedang diperbaiki oleh user 
      }));
    }
  };

  const handleSearch = (e) => {  // fungsi ini menangani perubahan pada input pencarian, setiap user mengetik nilai akan langsung disimpan 
    const value = isSafeMode ? escapeHTML(e.target.value) : e.target.value; // mengambil value dari input, jika mode keamanan aktif, value disanitasi
    setSearchTerm(value) // menyimpan nilai penacrian ke state  
  };

  const filteredUsers = users.filter(user => {  // filter() akan mengembalikan array baru, setiap user akan diuji , dan hanya mengembalikan true yang akan masuk ke array hasil 

    if (filter !== 'all' && user.role !== filter) {  //  jika filter bukan "all" dan role user tidak sesuai dengan filter
    // maka user tidak dimasukan ke hasil 
      return false; 
    }

    if (searchTerm) { // jika ada kta a pencarian 
    // makan pencarian akan dilakukan pada beberapa field

      const searchLower = searchTerm.toLowerCase(); // mengubah searchTerm menjadi huruf kecil
      // agar pencarian bersifat tidak peduli huruf besar / kecil 
      return (
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.role.toLowerCase().includes(searchLower)
      )
        // mengembalikan true jika slah satu field mengandung kata yang dicari 
        // includes disini bekerja pada string bukan array, untuk mengecek apakah ada substring didalam teks 
    };

    //jika tidak ada searchTerm,
    //maka user yang lolos filter akan tetap dimasukan ke hasil 
    return true;
  });
  return (
    <div className="user-managemnt">
      <div className="section-header">
        <h3>👥 User Management</h3>
        <div className="security-badge">
          <span className={`badge ${isSafeMode ? 'safe' : 'warning'}`}>
            {isSafeMode ? '🔒 Safe Mode' : '⚠️ Unsafe Mode'}
          </span>
        </div>
      </div>

      <div className="add-user-form">
        <h4>Add New User</h4>
        <form onSubmit>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className={errors.name ? 'error' : ''}
                maxLength='50'
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
              {newUser.name && (
                <div className="input-priview">
                  <small>Priview: {isSafeMode ? escapeHTML(newUser.name) : newUser.name}</small>
                </div>
              )}
            </div>


            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                placeholder="user@example.com"
                className={errors.email ? 'error' : ''}
                maxLength='100'
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                name="role"
                id="role"
                value={newUser.role}
                onChange={handleInputChange}
                className={errors.role ? 'error' : ''}
              >
                {roles.map(role => (
                  <option value={role} key={role}>{role}</option>
                ))}
              </select>
              {errors.role && <div className="error-message">{errors.role}</div>}
            </div>


            <div className="form-group">
              <label>&nbsp;</label>
              <button type="submit" className="btn-add">
                <span className="btn-icon">➕</span> Add User
              </button>
            </div>
          </div>
        </form>
      </div>



      <div className="user-controls">
        <div className="filter-controls">
          <div className="filter-group">
            <label>Filter by Role</label>
            <select
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div className="search-group">
            <label>Search Users:</label>
            <div className="search-input">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by name, email, or role..."
                maxLength='100'
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          <div className="stats-group">
            <div className="stat">
              <span className="stat-label">Total Users:</span>
              <span className="stat-value">{users.length}</span>
            </div>
            <span className="stat">
              <span className="stat-label">Filtered</span>
              <span className="stat-value">{filteredUsers.length}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserManagement;