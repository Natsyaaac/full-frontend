import React from 'react'
import '../App.css'

const MovieList = ({ movies, onMovieSelect, selectedMovieId }) => {
  return (
    <div className="movie-grid">
      {movies.map(movie => (
        // movies.map(...) loop setiap item arry movies, (movie) => (...)) untuk tiap item return 1 elemen card ('movie-card')
        <div
          className={`movie-card ${selectedMovieId === movie.id ? 'selected' : ''} ${movie.watched ? 'watched' : ''}`}
          onClick={() => onMovieSelect(movie)}
          key={movie.id}
        // classname{...} mennetukan css secara dinamis. tambah selected kalau filim ini dipilih, ditambah watched kalau sudah ditandai ditonton 
        //onClick={...} event handler klik. saat card di klik fungsi dipanggil dan dikirim object movie, gunanya update state(film aktif/detail film)
        // key={...} membantu react. membedakan item saat re-render supaya efisen dan tidak salah update
        >
          <div className="movie-card-header">
            <h3 className="movie-title">{movie.title}</h3>
            <span className=
              {`movie-badge ${movie.watched ? 'watched-badge' : 'unwatched-badge'}`}
              // clasname={...} menentukan css dinamis, tambah watched-badge jika film sudah ditonto, atau tambah 'unwatched-badge' jika belum ditonton 
              // semua mempengaruhi isi didalam span
            >
              {movie.watched ? '✓ Watched' : '○ Unwatched'
                // boolean jika movie.watched true tampilakn teks '✓ Watched', jika false '○ Unwatched'
              }
              
            </span>
          </div>

          <div className="movie-details">
            <span className="movie-genre">{movie.genre}</span>
            <span className="movie-year">{movie.year}</span>
          </div>

          <div className="movie-rating">
            <span className="rating-star">★</span>
            <span className="rating-value">{movie.rating}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList