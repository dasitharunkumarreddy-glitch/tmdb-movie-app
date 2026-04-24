import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPlus, FaCheck } from 'react-icons/fa';
import { getImageUrl, formatRating, toggleFavorite, isInFavorites } from '../../utils/helpers';
import './MovieCard.css';

function MovieCard({ movie, onMovieClick, onAddToFavorites }) {
  const [isFavorite, setIsFavorite] = useState(isInFavorites(movie.id, JSON.parse(localStorage.getItem('favoriteMovies')) || []));
  const [isHovered, setIsHovered] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    const result = toggleFavorite(movie);
    setIsFavorite(result);
    if (onAddToFavorites) {
      onAddToFavorites(movie);
    }
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    onMovieClick(movie.id);
  };

  return (
    <motion.div
      className="movie-card"
      onClick={() => onMovieClick(movie.id)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="movie-poster-container">
        <motion.img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="movie-poster"
          onError={(e) => {e.target.src = 'https://via.placeholder.com/250x350?text=No+Image'}}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />

        {/* Hover Overlay */}
        <motion.div
          className="hover-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            className="play-btn-overlay"
            onClick={handlePlayClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <FaPlay />
          </motion.button>

          <motion.button
            className="favorite-btn-overlay"
            onClick={handleFavoriteClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {isFavorite ? <FaCheck /> : <FaPlus />}
          </motion.button>
        </motion.div>

        {/* Favorite Button (always visible) */}
        <motion.button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isFavorite ? '✓' : '+'}
        </motion.button>
      </div>

      <div className="movie-info">
        <motion.h3
          className="movie-title"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {movie.title}
        </motion.h3>

        <div className="movie-meta">
          <motion.span
            className="movie-rating"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            ⭐ {formatRating(movie.vote_average)}
          </motion.span>
          <span className="movie-year">
            {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
          </span>
        </div>

        <motion.p
          className="movie-overview"
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
        >
          {movie.overview ? movie.overview.substring(0, 120) + '...' : 'No description available'}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default MovieCard;
