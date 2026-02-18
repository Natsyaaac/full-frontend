import '../App.css'
import React from 'react';


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

      <div className="search-input-wraper">
        <input
          type="text"
          placeholder='Search movies...'
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className='search-input'
        />
      </div>

      <div className="filter-section">
        <label className="filter-label">Genre:</label>
        <select 
          value={genreFilter}
          onChange={(e) => onGenreChange(e.target.value)}
          className='genre-select'
        >
          {genres.map(genre => (
            <option value={genre} key={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      
    </div>
  )
}

export default SearchBar