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


          </aside>
        </div>
      </main>
    </div>
  )

}

export default TaskManagerApp;