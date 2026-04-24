import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { searchMovies } from '../../services/tmdbApi';
import './SearchBar.css';

function SearchBar({ searchTerm, onSearchChange, onSearchSubmit }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Debounced search for suggestions
  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      if (searchTerm.trim().length > 2) {
        setIsLoading(true);
        try {
          const results = await searchMovies(searchTerm, 1);
          setSuggestions(results.slice(0, 5)); // Show top 5 suggestions
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearchSubmit();
  };

  const handleSuggestionClick = (movie) => {
    onSearchChange(movie.title);
    setShowSuggestions(false);
    onSearchSubmit();
  };

  const handleClearSearch = () => {
    onSearchChange('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <motion.form
        className="search-bar"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="search-input-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for movies, TV shows, actors..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => searchTerm.length > 2 && setShowSuggestions(true)}
            className="search-input"
          />
          {searchTerm && (
            <motion.button
              type="button"
              className="clear-btn"
              onClick={handleClearSearch}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes />
            </motion.button>
          )}
          {isLoading && <div className="search-loading">⟳</div>}
        </div>

        <motion.button
          type="submit"
          className="search-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!searchTerm.trim()}
        >
          <FaSearch />
          <span className="btn-text">Search</span>
        </motion.button>
      </motion.form>

      {/* Search Suggestions */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            ref={suggestionsRef}
            className="suggestions-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {suggestions.map((movie, index) => (
              <motion.div
                key={movie.id}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(movie)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <div className="suggestion-poster">
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/50x75?text=No+Img';
                    }}
                  />
                </div>
                <div className="suggestion-info">
                  <div className="suggestion-title">{movie.title}</div>
                  <div className="suggestion-year">
                    {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                    {movie.vote_average && (
                      <span className="suggestion-rating">
                        ⭐ {movie.vote_average.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchBar;
