import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import MovieDetail from './MovieDetail';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('All');

  // Async/Await implementation
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Parallel requests with Promise.all
        const [moviesResponse, statsResponse] = await Promise.all([
          fetch('/api/movies'),
          fetch('/api/stats')
        ]);

        const moviesData = await moviesResponse.json();
        const statsData = await statsResponse.json();

        setMovies(moviesData);
        setFilteredMovies(moviesData);
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter implementation with closure
  useEffect(() => {
    // Closure: filter function captures searchTerm and genreFilter
    const filterMovies = () => {
      let filtered = [...movies];

      // Filter by search term (includes implementation)
      if (searchTerm) {
        filtered = filtered.filter(movie => 
          movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filter by genre
      if (genreFilter !== 'All') {
        filtered = filtered.filter(movie => 
          movie.genre.includes(genreFilter)
        );
      }

      setFilteredMovies(filtered);
    };

    filterMovies();
  }, [searchTerm, genreFilter, movies]);

  const handleMovieSelect = async (movie) => {
    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 300));
      setSelectedMovie(movie);
    } catch (error) {
      console.error('Error selecting movie:', error);
    }
  };

  const toggleWatched = async (movieId) => {
    try {
      const response = await fetch(`/api/movies/toggle/${movieId}`, {
        method: 'POST'
      });
      const updatedMovie = await response.json();
      
      // Update movies with map
      setMovies(prevMovies => 
        prevMovies.map(movie => 
          movie.id === movieId ? updatedMovie : movie
        )
      );

      // Update stats
      const statsResponse = await fetch('/api/stats');
      const newStats = await statsResponse.json();
      setStats(newStats);
    } catch (error) {
      console.error('Error toggling watched:', error);
    }
  };

  // Get unique genres using map and filter
  const genres = ['All', ...new Set(movies.map(movie => movie.genre))];

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

export default App;