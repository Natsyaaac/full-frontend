import React from 'react';
import './MovieList.css';

const MovieList = ({ movies, onMovieSelect, selectedMovieId }) => {
  // Using map to render movie cards
  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <div 
          key={movie.id} 
          className={`movie-card ${selectedMovieId === movie.id ? 'selected' : ''} ${movie.watched ? 'watched' : ''}`}
          onClick={() => onMovieSelect(movie)}
        >
          <div className="movie-card-header">
            <h3 className="movie-title">{movie.title}</h3>
            <span className={`movie-badge ${movie.watched ? 'watched-badge' : 'unwatched-badge'}`}>
              {movie.watched ? '✓ Watched' : '○ Unwatched'}
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

export default MovieList;