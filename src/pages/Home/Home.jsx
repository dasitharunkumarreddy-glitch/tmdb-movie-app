import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPlus } from 'react-icons/fa';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieCard from '../../components/MovieCard/MovieCard';
import Loader from '../../components/Loader/Loader';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import './Home.css';

function Home({ onMovieClick, onAddToFavorites }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const { movies, loading, error, totalPages } = useFetchMovies(searchTerm, page);

  useEffect(() => {
    // Get a featured movie for the hero section
    if (movies && movies.length > 0 && !searchTerm) {
      setFeaturedMovie(movies[0]);
    }
  }, [movies, searchTerm]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleSearchSubmit = () => {
    setPage(1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
    window.scrollTo(0, 0);
  };

  const handlePlayMovie = (movie) => {
    // Navigate to the movie details page by ID
    onMovieClick(movie.id);
  };

  if (error) {
    return (
      <div className="home-container">
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="hero-section">
        {featuredMovie && (
          <>
            <div
              className="hero-backdrop"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`
              }}
            />
            <div className="hero-overlay" />
            <div className="hero-content">
              <motion.h1
                className="hero-title"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {featuredMovie.title}
              </motion.h1>
              <motion.p
                className="hero-description"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {featuredMovie.overview.length > 200
                  ? `${featuredMovie.overview.substring(0, 200)}...`
                  : featuredMovie.overview
                }
              </motion.p>
              <motion.div
                className="hero-rating"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <span className="rating-stars">⭐</span>
                <span className="rating-value">{featuredMovie.vote_average?.toFixed(1)}</span>
                <span className="rating-year">
                  {featuredMovie.release_date?.split('-')[0]}
                </span>
              </motion.div>
              <motion.div
                className="hero-buttons"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <motion.button
                  className="hero-btn play-btn"
                  onClick={() => handlePlayMovie(featuredMovie)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlay className="btn-icon" />
                  Play
                </motion.button>
                <motion.button
                  className="hero-btn favorite-btn"
                  onClick={() => onAddToFavorites(featuredMovie)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlus className="btn-icon" />
                  My List
                </motion.button>
              </motion.div>
            </div>
          </>
        )}
      </section>

      {/* Search Bar */}
      <motion.div
        className="search-section"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />
      </motion.div>

      {/* Movies Section */}
      <section className="movies-section">
        <motion.h2
          className="section-title"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {searchTerm ? `Results for "${searchTerm}"` : 'Popular Movies'}
        </motion.h2>

        {loading ? (
          <Loader />
        ) : (
          <>
            <motion.div
              className="movies-grid"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              {movies && movies.length > 0 ? (
                movies.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
                  >
                    <MovieCard
                      movie={movie}
                      onMovieClick={onMovieClick}
                      onAddToFavorites={onAddToFavorites}
                    />
                  </motion.div>
                ))
              ) : (
                <p className="no-movies">No movies found</p>
              )}
            </motion.div>

            {movies.length > 0 && (
              <motion.div
                className="pagination"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
              >
                <motion.button
                  className="pagination-btn"
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ← Previous
                </motion.button>
                <span className="page-info">Page {page} of {totalPages}</span>
                <motion.button
                  className="pagination-btn"
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next →
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </section>
    </motion.div>
  );
}

export default Home;
