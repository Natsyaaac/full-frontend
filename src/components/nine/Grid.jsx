import React, { useEffect, useState } from 'react';
import './Grid.css'

function TaskManagerApp() {
  // State untuk daftar tugas
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Mempelajari React Hooks', description: 'Memahami useState, useEffect, dan useContext', category: 'belajar', priority: 'high', completed: true, dueDate: '2023-10-15' },
    { id: 2, title: 'Membeli bahan makanan', description: 'Susu, telur, roti, sayuran', category: 'personal', priority: 'medium', completed: false, dueDate: '2023-10-20' },
    { id: 3, title: 'Meeting dengan klien', description: 'Presentasi progress proyek website', category: 'kerja', priority: 'high', completed: false, dueDate: '2023-10-18' },
    { id: 4, title: 'Olahraga pagi', description: 'Lari 5km di taman', category: 'kesehatan', priority: 'low', completed: true, dueDate: '2023-10-16' },
    { id: 5, title: 'Update portofolio', description: 'Menambahkan proyek terbaru ke website portofolio', category: 'kerja', priority: 'medium', completed: false, dueDate: '2023-10-25' },
  ]);

  // State untuk form input tugas baru
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'personal',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0]
  })

  // State untuk filter dan sortir
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [showCompleted, setShowCompleted] = useState(true);

  // State untuk pencarian
  const [searchTerm, setSearchTerm] = useState('');

  const taskStats = { // mendefinisika 
    total: tasks.length, // menghitung total semua objeck dalam array
    completed: tasks.filter(task => task.completed).length, // menghitung object yang completed (task => task.completed) menggunakan filter dari javascript
    pending: tasks.filter(task => !task.completed).length, // menghitung object yang tidak completed (!task.completed) / tidak sama , menggunakan filter javascript 
    highPriority: tasks.filter(task => task.priority === 'high' && !task.completed).length, // Menfilter object yang high prioritas task nya dan belum completed (task => task.priority === 'high' && !task.completed)
    overdue: tasks.filter(task => {
      if (task.completed) return false; // jika task sudah selesai dia false
      const dueDate = new Date(task.dueDate); // medefinisikan hari di object task 
      const today = new Date(); // mendefinisikan hari ini menggunakan Date()
      today.setHours(0, 0, 0, 0); // setingg jam untuk hari ini 
      return dueDate < today; // kembalikan nilai jika waktu duedate lebih kecil dari hari ini yang artinya sudah terlambat 
    }).length
  }

  const addTask = () => {
    if (!newTask.title.trim()) { // Jika judul tas kosong kasih peringatan 
      alert('Judul tugas harus diisi!');
      return; // kembalikan ke semula
    }

    const taskToadd = {
      id: tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1, // semua id task  jika lebih besar dari 0 (Math. max) mengunci nilai maksimum dari id lalu membuat parameter jika id lebih besar dari 0 di tambah 1 dan seterus nya
      title: newTask.title, // menambah judul
      description: newTask.description, // menambah deskripsi 
      category: newTask.category, // menambah kategori 
      priority: newTask.priority, // menambah prioritas 
      completed: false, // task di set false untuk completed
      dueDate: newTask.dueDate // menambah waktu jatuh tempo
    };

    setTasks([...tasks, taskToadd]); // memasukan semua object tadi ke array 

    setNewTask({ // setting saat task kekirim 
      title: '', // judul dibikin kosonh
      description: '', // deskripsi dibikin kosong
      category: 'personal',  // di setting personal
      priority: 'medium', // di setting medium 
      dueDate: new Date().toISOString().split('T')[0] // disetting hari ini 

      // toISOString() mengubah object date jadi string format ISO 
      // .split('T') memecah string berdasarkan huruf t 
      //[0]/ atau index pertama yaitu mengambil bagian tanggal nya saja 
    })
  }

  const filteredAndSortedTasks = tasks
    .filter(task => { // filter task

      if (filterCategory !== 'all' && task.category !== filterCategory) return false; // jika category tidak sama dengan (all)/semua kategori dan task category (task.category) tidak sama dengan filter category jadi mengelompokan kategori tertentu saja 

      // return false : kembalikan ke nilai false

      if (filterPriority !== 'all' && task.priority !== filterPriority) return false; // jika prioritas tidak sama dengan (all)/semua prioritas dan task prioritas (task.priority) tidak sama dengan filter priority sama dengan yang kategori mengelompokan semua prioritas 

      // return false : kembalikan ke nilai false

      if (!showCompleted && task.completed) return false; // jika tidak selesai (!showCompleted) dan task completed 
      // kembalikan ke nilai false

      if (searchTerm && task.completed) return false; // jika search dan task complete task akan disembuyikan saat search
      // kembalikan ke nilai false

      if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase()) && !task.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;

      // kalau user mengetikan sesuatu dan tesk itu tidak ada di judul dan tidak ada di descriptionn buang task

      return true; // jika lolos semua task ini dipakai
    })
    .sort((a, b) => {
      switch (sortBy) { // switch case untuk sort 
        case 'dueDate': // case jatuh tempo
          return new Date(a.dueDate) - new Date(b.dueDate); // tanggal yang lebih kecil tampil dulu dari pada tanggal yang lebih besar 
        case 'priority': // case prioritas 
          const priorityOrder = { high: 1, medium: 2, low: 3 }; // mendefinisikan object medium low dan high object 
          return priorityOrder[a.priority] - priorityOrder[b.priority]; // kembalikan nilai a dikurangi nikai b prioritas 
        case 'title': // case title 
          return a.title.localeCompare(b.title); // menggunakan localeCompare () membanding kan huruf a dan b 
        default:
          return 0; // kembalikan nili 0 yaitu mengosonhkan semua input 
      }
    })

  const getCategoryIcon = (category) => {  // mendefinisikan getCategoryIcon dengan parameter (category)
    switch (category) { // menggunakan swirch case untuk menambah icon
      case 'kerja': return '💼'; // case kerja kembalikan icon kerja 
      case 'belajar': return '📚'; // case belajar kembalikan icon belajar
      case 'personal': return '👤'; // case personal kembalikan icon belajar
      case 'kesehatan': return '🏃'; // case kesehatan kembalikan icon kesehatan
      default: return '📝'; // nilai default return catatan
    }
  }

  const deleteTask = (id) => { // mendefiniskan deleteTask dengan parameter id
    setTasks(tasks.filter(task => task.id !== id)) //setTask task.filter(menggunakan filter dari javascript)menyalin semua objeck, membuat parameter baru task.id tidak sama dengan id yang sudah di hapus 
  }

  const toggleComplete = (id) => { // mendefinisikan toggleComplete dengan parameter id
    setTasks(tasks.map(task => // menyalin semua objeck di tasks aray dan menggunakan map untuk melihat isi objeck
      task.id === id ? { ...task, completed: !task.completed } : task //jika task id sama task yang tidak completed diubah menjadi completed dan :task mengubah isi objeck
    ))
  }

  const editTask = (id, updatedTask) => {  // mendefinisikan editTask dengan parameter (id, updatedTask)
    setTasks(tasks.map(task => // menyalin semua object tasks menggunakan map dari javascipt jika task.id sama dengan id (upadte) set objeck tasks ke updateTask (yaitu mengubah title di object dan menyimpan ke baru : task)
      task.id === id ? { ...task, ...updatedTask } : task
    ))
  }

  const getPriorityColor = (priority) => { // medefiniskan getPriorityColor dengan parameter priority 
    switch (priority) { // menggunakan switch untuk mengubah warna badge
      case 'high': return '#ff6b6b'; // jika case 'high' kemablikan warna #ff6b6b
      case 'medium': return '#ffd93d'; // jika case 'medium' kembalikan warna #ffd93d
      case 'low': return '#6bcf7f'; // jika case 'low' kembalikan warna #6bcf7f
      default: return '#cccccc'; // default return nilai warna #cccccc
    }
  };
  console.log('Task baru', newTask);
  console.log('Task baru hari ini', tasks)

  return (
    <div className="task-manager">
      <header className="app-header">
        <div className="header-content">
          <h1>Task Manager Pro</h1>
          <p className="subtitle">Kelola tugas Anda dengan efisien menggunakan React useState</p>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <span className="stat-value">{taskStats.total}</span>
              <div className="stat-label">Total Tugas</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <span className="stat-value">{taskStats.completed}</span>
              <span className="stat-label">Selesai</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <span className="stat-value">{taskStats.pending}</span>
              <span className="stat-label">Belum Selesai</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🚨</div>
            <div className="stat-info">
              <span className="stat-value">{taskStats.overdue}</span>
              <span className="stat-label">Terlambat</span>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="layout-container">
          <aside className="sidebar">
            <section className="input-section">
              <h2>➕ Tambah Tugas Baru</h2>

              <div className="form-group">
                <label htmlFor="title">Judul Tugas </label>
                <input type="text"
                  id='title'
                  placeholder='Apa yang perlu dilakukan?'
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className='form-input'
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Deskripsi</label>
                <textarea id="description"
                  placeholder='Detail tugas...'
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className='form-textarea'
                  rows='3'
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Kategori</label>
                  <select id="category"
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    className='form-select'
                  >
                    <option value="personal">Personal</option>
                    <option value="kerja">Kerja</option>
                    <option value="belajar">Belajar</option>
                    <option value="kesehatan">Kesehatan</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="priority">Prioritas</label>
                  <select id="priority"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className='form-select'
                  >
                    <option value="low">Rendah</option>
                    <option value="medium">Sedang</option>
                    <option value="high">Tinggi</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="dueDate">Tanggal Jatuh Tempo</label>
                <input type="date"
                  id='dueDate'
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className='form-input'
                />
              </div>

              <button className="add-btn" onClick={addTask}>
                <span className='btn-icon'>+</span> Tambahkan Tugas
              </button>
            </section>

            <section className="filter-section">
              <h3>🔍Filter & Urutkan</h3>

              <div className="form-group">
                <label htmlFor="search">Cari Tugas</label>
                <input type="text"
                  id='search'
                  placeholder='Cari berdasarkan judul atau deskripsi...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='form-input'
                />
              </div>

              <div className="form-group">
                <label htmlFor="categoryFilter">Filter Kategori</label>
                <select id="categoryFilter"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className='form-select'
                >
                  <option value="all">Semua Kategori</option>
                  <option value="personal">Personal</option>
                  <option value="kerja">Kerja</option>
                  <option value="belajar">Belajar</option>
                  <option value="kesehatan">Kesehatan</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="priorityFilter">Filter Prioritas</label>
                <select id="priorityFilter"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className='form-select'
                >
                  <option value="all">Semua Prioritas</option>
                  <option value="high">Tinggi</option>
                  <option value="medium">Sedang</option>
                  <option value="low">Rendah</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="sortBy">Urutkan Berdasarkan</label>
                <select id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className='form-select'
                >
                  <option value="dueDate">Tanggal Jatuh Tempo</option>
                  <option value="priority">Prioritas</option>
                  <option value="title">Judul (A-Z)</option>
                </select>
              </div>

              <div className="toggle-group">
                <label className='toggle-label'>
                  <input type="checkbox"
                    checked={showCompleted}
                    onChange={() => setShowCompleted(!showCompleted)}
                    className='toggle-input'
                  />
                  <span className="toggle-slider"></span>
                  <span className="toggle-text">Tampilkan tugas selesai</span>
                </label>
              </div>
            </section>
          </aside>

          <section className="main-content">
            <div className="content-header">
              <h2>📋Daftar Tugas ({filteredAndSortedTasks.length})</h2>
              <div className="category-tags">
                <button
                  className={`category-tag ${filterCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterCategory('all')}
                >
                  Semua
                </button>

                <button
                  className={`category-tag ${filterCategory === 'personal' ? 'active' : ''}`}
                  onClick={() => setFilterCategory('personal')}
                >
                  👤 Personal
                </button>

                <button
                  className={`category-tag ${filterCategory === 'kerja' ? 'active' : ''}`}
                  onClick={() => setFilterCategory('kerja')}
                >
                  💼 Kerja
                </button>

                <button
                  className={`category-tag ${filterCategory === 'belajar' ? 'active' : ''}`}
                  onClick={() => setFilterCategory('belajar')}
                >
                  📚 Belajar
                </button>

                <button
                  className={`category-tag ${filterCategory === 'kesehatan' ? 'active' : ''}`}
                  onClick={() => setFilterCategory('kesehatan')}
                >
                  🏃 Kesehatan
                </button>
              </div>
            </div>

            {filteredAndSortedTasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <h3>Tidak ada tugas yang sesuai</h3>
                <p>Coba ubah filter atau tambahkan tugas baru</p>
              </div>
            ) : (
              <div className="task-grid">
                {filteredAndSortedTasks.map(task => {
                  const isOverdue = !task.completed && new Date(task.dueDate) < new Date();

                  return (
                    <div className={`task-card ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}
                    >
                      <div className="task-header">
                        <div className="task-category">
                          <span className="category-icon">{getCategoryIcon(task.category)}</span>
                          <span className="category-name">{task.category}</span>
                        </div>

                        <div className="priority-badge"
                          style={{ background: getPriorityColor(task.priority) }}
                        >
                          {task.priority === 'high' ? 'Tinggi' : task.priority == 'medium' ? 'Sedang' : 'Rendah'}
                        </div>
                      </div>

                      <div className="task-body">
                        <div className="task-title-row">
                          <h3 className="task-title">{task.title}</h3>
                          {task.completed && (
                            <span className="completed-badge">✅ Selesai</span>
                          )}
                          {isOverdue && (
                            <span className="overdue-badge">⚠️ Terlambat</span>
                          )}
                        </div>

                        <p className="task-description">{task.description}</p>

                        <div className="task-meta">
                          <div className="due-date">
                            <span className="meta-icon">📅</span>
                            <span className="meta-text">
                              Jatuh tempo: {new Date(task.dueDate).toLocaleDateString('id-ID')}
                            </span>
                            {isOverdue && (
                              <span className="days-overdue">
                                ({Math.ceil((new Date() - new Date(task.dueDate)) / (1000 * 60 * 60 * 24))} hari terlambat)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="task-actions">
                        <button
                          onClick={() => toggleComplete(task.id)}
                          className={`action-btn ${task.completed ? 'undo-btn' : 'complete-btn'}`}
                        >
                          {task.completed ? '↩️ Batalkan' : '✅ Selesai'}
                        </button>

                        <button className="action-btn delete-btn"
                          onClick={() => deleteTask(task.id)}
                        >
                          🗑️ Hapus
                        </button>

                        <button
                          onClick={() => {
                            const newTile = prompt('Edit judul tugas:',
                              task.title);
                            if (newTile && newTile.trim()) {
                              editTask(task.id, { title: newTile });
                            }
                          }}
                          className='action-btn edit-btn'
                        >
                          ✏️ Edit
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="summary-section">
              <h3>Ringkasan Productivitas</h3>
              <div className="summary-cards">
                <div className="summary-card">
                  <h4>Presentase Penyelesaian</h4>
                  <div className="progress-container">
                    <div className="progress-bar"
                      style={{ width: `${taskStats.total > 0 ? (taskStats.completed / taskStats.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <p className='progress-text'>
                    {taskStats.total > 0 ? Math.round((taskStats.completed / taskStats.total) * 100) : 0}% tugas selesai
                  </p>
                </div>

                <div className="summary-card">
                  <h4>Prioritas Tertinggi</h4>
                  <p className="priority-summary">
                    <span className="priority-high">🚨 {taskStats.highPriority} tugas prioritas tinggi</span> belum selesai
                  </p>
                </div>

                <div className="summary-card">
                  <h4>Tugas Terlambat</h4>
                  <p className="overdue-summary">
                    {taskStats.overdue > 0 ? (
                      <span className="overdue-alert">⚠️ {taskStats.overdue} tugas perlu perhatian segera!</span>
                    ) : (
                      <span className="on-time">🎉 Semua tugas tepat waktu!</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2023 Task Manager Pro - Implementasi React useState dengan Flexbox & Grid</p>
        <p>Data tersimpan dalam state komponen dan diperbarui secara real-time</p>
      </footer>
    </div>
  )

}

export default TaskManagerApp;