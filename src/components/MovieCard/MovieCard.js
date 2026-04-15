import React, { useState } from 'react';
import { getImageUrl, formatRating, toggleFavorite, isInFavorites } from '../../utils/helpers';
import './MovieCard.css';

function MovieCard({ movie, onMovieClick }) {
  const [isFavorite, setIsFavorite] = useState(isInFavorites(movie.id, JSON.parse(localStorage.getItem('favoriteMovies')) || []));

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    const result = toggleFavorite(movie);
    setIsFavorite(result);
  };

  return (
    <div className="movie-card" onClick={() => onMovieClick(movie.id)}>
      <div className="movie-poster-container">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="movie-poster"
          onError={(e) => {e.target.src = 'https://via.placeholder.com/250x350?text=No+Image'}}
        />
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          ❤️
        </button>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-rating">⭐ {formatRating(movie.vote_average)}/10</p>
        <p className="movie-release-date">{movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}</p>
        <p className="movie-overview">{movie.overview ? movie.overview.substring(0, 100) + '...' : 'No description'}</p>
      </div>
    </div>
  );
}

export default MovieCard;
