import React from 'react';
import './MovieDetail.css';

const MovieDetail = ({ movie, onToggleWatched }) => {
  return (
    <div className="movie-detail-container">
      <h2 className="detail-title">📽️ Movie Details</h2>
      
      <div className="detail-content">
        <h3 className="detail-movie-title">{movie.title}</h3>
        
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Genre:</span>
            <span className="detail-value genre-tag">{movie.genre}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Year:</span>
            <span className="detail-value">{movie.year}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Rating:</span>
            <span className="detail-value rating-highlight">
              ★ {movie.rating}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Status:</span>
            <span className={`detail-value status-badge ${movie.watched ? 'status-watched' : 'status-unwatched'}`}>
              {movie.watched ? 'Watched' : 'Not Watched'}
            </span>
          </div>
        </div>

        <button 
          className={`toggle-button ${movie.watched ? 'watched' : 'unwatched'}`}
          onClick={() => onToggleWatched(movie.id)}
        >
          {movie.watched ? 'Mark as Unwatched' : 'Mark as Watched'}
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;