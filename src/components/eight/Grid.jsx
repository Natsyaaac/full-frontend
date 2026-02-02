import React, { useState, useEffect, use } from 'react';
import './Grid.css'

function App() {
  const [books, setBooks] = useState([
    { id: 1, title: 'React untuk Pemula', author: 'John Doe', year: 2022, read: true },
    { id: 2, title: 'JavaScript Modern', author: 'Jane Smith', year: 2021, read: false },
    { id: 3, title: 'CSS Mastery', author: 'Alex Johnson', year: 2023, read: true },
    { id: 4, title: 'TypeScript Fundamentals', author: 'Robert Brown', year: 2022, read: true },
  ]);

  // State untuk input form buku baru 
  const [newBook, setNewBook] = useState({
    title: '', // input judul buku
    author: '', // input penulis buku 
    year: new Date().getFullYear(), // input tahun buku terbit 
  });

  // ini fungsi untuk menambah buku baru 
  const addBook = () => {
    //validasi jika judul buku atau nama penulis kosong dia akan menampilkan pesan alert 
    if (!newBook.title.trim() || !newBook.author.trim()) {
      alert(`Judul dan penulis buku harus diisi!`);
      return; // menghentikan nilai fungsi 
    }

    // menambah hasil inputan buku kedalam array 
    const bookToadd = {
      id: books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1, // membuat id unik dengan mengambil id terbesar lalu ditambah 1
      title: newBook.title, // menambah judul buku
      author: newBook.author, // penulis buku
      year: parseInt(newBook.year), // tahun terbit buku
      read: false, // setting ke belom dibaca 
    };

    setBooks([...books, bookToadd]); // simpab buku ke ke state books menggunakan setBooks

    // mengosongkan input title author dan tahun di setting kosong 
    setNewBook({
      title: '',
      author: '',
      year: '',
    });
  }

  // state untuk filter buku 
  const [filter, setFilter] = useState('all'); // 'all', 'read', 'unread'

  // ini adalah filter untuk buku berdasarkan status dibaca atau belum
  const filteredBooks = books.filter(book => {
    if (filter === 'read') return book.read; // jika filter sama denga  read kembalikan nilai buku terbaca 
    if (filter === 'unread') return !book.read; // jika filter samma dengan unread kembalikan nilai tidak buku terbaca 
    return true; // tampilkan semua buku 

    // read dan unread terjadi karna sudah dibuat nilai nya jadi jika === read book.read (buku yang sudah dibaca nilai true) sebaliknnya jika === unread !book.read (buku yang belum dibaca karna ada tanda ini ! artinya tidak sama dengan buku yang dibaca ) sisinya return true atau semua buku 
  });

  const stats = {
    total: books.length, // total dari kesemua buku
    read: books.filter(book => book.read).length, // total buku yang dibaca 
    unread: books.filter(book => !book.read).length, // total buku yang belum dibaca 
  }


  console.log('buku yanng sudah dibaca', stats.read)
  console.log('buku yang belum dibaca ', stats.unread)

  useEffect(() => {
    console.log('buku telah disimpah ke array', books)
  }, [books])

  useEffect(() => {
    console.log('state newbook berubah', newBook)
  }, [newBook]) // state berubah mengikuti inputan user secara realtime
  return (
    <div className="app">
      <header className="app-header">
        <h1>Manajemen Perpustakaan Pribadi</h1>
        <p className="subtitle">Menggunakana React useStaet untuk data yang berubah</p>
      </header>

      <div className="app-main">
        <section className="input-section">
          <h2>Tambah Buku Baru</h2>
          <div className="input-group">
            <input type="text"
              placeholder='Judul Buku'
              className='text-input'
              value={newBook.title}
              onChange={(e) => setNewBook({
                ...
                newBook, title: e.target.value
              })}
            />

            <input type="text"
              placeholder='Penulis'
              className='text-input'
              value={newBook.author}
              onChange={(e) => setNewBook({
                ...
                newBook, author: e.target.value
              })}
            />

            <input type="number"
              placeholder='Tahun Terbit'
              className='text-input'
              value={newBook.year}
              onChange={(e) => setNewBook({
                ...
                newBook, year: e.target.value
              })}
              min={1900}
              max={new Date().getFullYear()}
            />
            <button className="add-button"
              onClick={addBook}>
              + Tambah Buku
            </button>
          </div>
        </section>

        {/* Bagian filter dan statistik */}
        <section className="fitur-section">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Semua ({stats.total})
            </button>

            <button
              className={`filter-btn ${filter === 'read' ? 'active' : ''}`}
              onClick={() => setFilter('read')}
            >
              Sudah Dibaca ({stats.read})
            </button>

            <button
              className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
              onClick={() => setFilter('unread')}
            >
              Belum Dibaca ({stats.unread})
            </button>
          </div>

          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">Total Buku:</span>
              <span className="stat-value">{stats.total}</span>
            </div>

            <div className="stat-item">
              <span className="stat-label">Presentase Dibaca:</span>
              <span className="stat-value">
                {stats.total > 0 ? Math.round((stats.read / stats.total) * 100) : 0} %
              </span>
            </div>
          </div>
        </section>

        {/* Daftar buku menggunakan CSS Grid */}
        <section className="books-section">
          <h2>Koleksi Buku ({filteredBooks.length})</h2>

          {filteredBooks.length === 0 ? (
            <div className="empty-message">
              <p>Tidak ada buku yang sesuai dengan filter. Coba ubah filter atau tambahkan buku baru.</p>
            </div>
          ) : (
            <div className="books-grid">
              {filteredBooks.map(book => (
                <div
                  key={book.id}
                  className={`book-card ${book.read ? 'read' : 'unread'}`}>
                  <div className="book-header">
                    <h3>{book.title}</h3>
                    <span className={`status-badge ${book.read ? 'read-badge' : 'unread-badge'}`}>
                      {book.read ? 'Dibaca' : 'Belum'}
                    </span>
                  </div>

                  <div className="book-details">
                    <p><strong>Penulis: </strong>{book.author}</p>
                    <p><strong>Tahun: </strong>{book.year}</p>
                  </div>
                  <div className="book-actions">
                    <button
                      onClick={() => toggle}
                      className={`action-btn`}
                    >
                      {book.read ? 'Tandai Belum Dibaca' : 'Tandai Sudah Dibaca'}
                    </button>

                    <button
                      onClick={() => remov}
                      className='action-btn delete-btn'
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>



      </div>
    </div>
  )
}

export default App