import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('All');


  useEffect(() =>{  
    const fetchData = async () => {  // fungsi async untuk mengambil data saat komponen mount 
      try {
        setLoading(true);  // aktifkan loadingg sebelum proses fetch dimulai 

        const [moviesResponse, setResponse] = await Promise.all([  
          fetch('/api/movies'), 
          fetch('/api/stats')

          // menjalankan dua fetch secara paralel dan menunggu keduanya selesai 
        ]);

        const moviesData = await moviesResponse.json(); 
        const statsData = await setResponse.json();

        // mengubah response menjadi object Javascript (parse JSON)

        setMovies(moviesData);  // menyimpan data movie dari API ke state 
        setFilteredMovies(moviesData);  // mengisi data awal list yang ditampilkan 
        setStats(statsData); // menyimpan data statistik ke state
      } catch (error) {
        console.error('Error fetching data: ', error)  // menangkap error jika fetch gagal 
      } finally {
        setLoading(false)  // mematikan loading setelah smeua proses selesai (berhasil atau gagal)
      }
    };

    fetchData();  // memaggil fungsi fetch saat komponen pertama kali dirender 
  }, [])  // dependency kosong > effect hanya berjalan sekali saat mount 

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎬 Daily Movie Explorer</h1>
        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Total Movies</span>
              <span className="stat-value">{stats.total}</span>
            </div>

            <div className="stat-card">
              <span className="stat-label">Watched</span>
              <span className="stat-value">{stats.watched}</span>
            </div>

            <div className="stat-card">
              <span className="stat-label">Unwatched</span>
              <span className="stat-value">{stats.unwatched}</span>
            </div>

            <div className="stat-card">
              <span className="stat-label">Avg Rating</span>
              <span className="stat-value">{stats.averageRating}</span>
            </div>
          </div>
        )}
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <div className="">SearchBar</div>

          {selectedMovie && (
            <div className="">Moviedetail</div>
          )}
        </aside>

        <main className="movie-grid-container">
          <div className="">MovieList</div>

          {filteredMovies.length === 0 && (
            <div className="no-results">
              <p>No movies found matching your criteria</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App  