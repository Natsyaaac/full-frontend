import React from 'react';
import './SearchBar.css';

const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  genreFilter, 
  onGenreChange, 
  genres 
}) => {
  return (
    <div className="search-bar-container">
      <h2 className="search-title">🔍 Search & Filter</h2>
      
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-section">
        <label className="filter-label">Genre:</label>
        <select 
          value={genreFilter} 
          onChange={(e) => onGenreChange(e.target.value)}
          className="genre-select"
        >
          {genres.map(genre => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="active-filters">
        {searchTerm && (
          <div className="filter-tag">
            Search: "{searchTerm}"
            <button 
              className="remove-filter"
              onClick={() => onSearchChange('')}
            >
              ×
            </button>
          </div>
        )}
        
        {genreFilter !== 'All' && (
          <div className="filter-tag">
            Genre: {genreFilter}
            <button 
              className="remove-filter"
              onClick={() => onGenreChange('All')}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;