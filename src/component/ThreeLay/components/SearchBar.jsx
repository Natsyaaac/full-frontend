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

          // saat user mengetik onChange mengirim nilai baru, onSearchChange  updaate state (biasanya di parent), komponen di render ulang , value ikut berubah 
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
            // (genres.map(...))loop setiap item di array genres, (genre => (...)) untuk tiap item return 1 elemen option, (<option value={genre} key={genre}>) value=nilai yang dipilih saat option dipilih, key=indentitas unik untuk bantu react saat render ulang, {genre}=didalam option teks yang tampil ke user 
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

              // {serachTerm} menampilkan teks pencarian yang sedang aktif 
              // onClick={() => onSearchChange('')} saat tombol x diklik fungsi dipanggil dengan nilai kosong 
              // dampaknya state {searchTerm} jadi kosong input/search hasilnya ikut reset 
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

export default SearchBar