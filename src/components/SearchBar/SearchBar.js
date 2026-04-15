import React from 'react';
import './SearchBar.css';

function SearchBar({ searchTerm, onSearchChange, onSearchSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies, actors, genres..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-btn">
        🔍 Search
      </button>
    </form>
  );
}

export default SearchBar;
