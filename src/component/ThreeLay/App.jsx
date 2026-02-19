import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieList  from './components/MovieList';
import './App.css';
import MovieDetail from './components/MovieDetail';

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('All');


  useEffect(() => {
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

  useEffect(() => {
    const filterMovies = () => { // fungsi untuk menfilter data berdasarkan search dan genre
      let filtered = [...movies];  // membuat shallow copy agar tidak mengubah state asli

      if (searchTerm) {  // menfilter berdasarkan title (case-imsensitive)
        filtered = filtered.filter(movie =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (genreFilter !== 'All') {
        filtered = filtered.filter(movie =>
          movie.genre.includes(genreFilter)
        );

        //] menfilter berdasarkan genre yang dipilih 
      }

      setFilteredMovies(filtered) // menyimpan hasil  filter ke state  
    };

    filterMovies(); // dijalankan saat mount dan setiap searchTerm, genreFilter, movies berubah 
  }, [searchTerm, genreFilter, movies])

  const handleMovieSelect = async (movie) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300)); // delay 300mms sebelum mwnyimpan data 
      setSelectedMovie(movie); // menyimpan hasil filter 
    } catch (error) {
      console.error('Error selecting movie:', error) // tangkap error 
    }
  };

  const toggleWatched = async (movieId) => {  // \fungsi async untuk mengubah status watched berdasarkan movieId
    try {
      const response = await fetch(`/api/movies/toggle/${movieId}`, {  // mengirim request POST ke backend untuk toggle status movie
        method: 'POST'
      });
      const updatedMovie = await response.json()  // mengurai response json menjadi object movie terbaru dari server 

      setMovies(prevMovies =>  
        prevMovies.map(movie =>
          movie.id === movieId ? updatedMovie : movie // mengganti movie yang id-nya sesuai dengan yang dipilih dengan data baru (immutability) kalau tidak biarkan saja 
        )
      );

      const statsResponse = await fetch('/api/stats');  // mengambil ulang daya statistik perubahan 

      const newStats = await statsResponse.json(); // mengurai response stats menjadi object 

      setStats(newStats); // memperbarui state statistik 


    } catch (error) {
      console.error('Error toggling watched:', error); // menangkap dan menampilkan error jika request gagal 
    }
  };

  const genres = ['All', ...new Set(movies.map(movie => movie.genre))]; // membuat array genre unik dari daftar movies lalu menambakan opsi 'All' di awal 

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading amazing movies...</p>
      </div>
    );
  }

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
         <SearchBar   
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          genreFilter={genreFilter}
          onGenreChange={setGenreFilter}
          genres={genres}
         />

          {selectedMovie && (
            <MovieDetail 
              movie={selectedMovie}
              onToggleWatched={toggleWatched}
            /> 
          )}
        </aside>

        <main className="movie-grid-container">
          <MovieList 
            movies={filteredMovies}
            onMovieSelect={handleMovieSelect}
            selectedMovieId={selectedMovie?.id}
          />

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