import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieCredits } from '../../services/tmdbApi';
import { getImageUrl, formatRating, formatDate, toggleFavorite, isInFavorites } from '../../utils/helpers';
import Loader from '../../components/Loader/Loader';
import './MovieDetails.css';

function MovieDetails({ onBack }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const movieData = await getMovieDetails(id);
        const creditsData = await getMovieCredits(id);
        setMovie(movieData);
        setCredits(creditsData);
        setIsFavorite(isInFavorites(id, JSON.parse(localStorage.getItem('favoriteMovies')) || []));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleFavoriteClick = () => {
    if (movie) {
      const result = toggleFavorite(movie);
      setIsFavorite(result);
    }
  };

  if (loading) return <Loader />;

  if (error || !movie) {
    return (
      <div className="movie-details-container">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="error-message">Error: {error || 'Movie not found'}</div>
      </div>
    );
  }

  const cast = credits?.cast?.slice(0, 10) || [];

  return (
    <div className="movie-details-container">
      <button className="back-btn" onClick={onBack}>← Back</button>

      <div className="details-content">
        <div className="details-poster">
          <img
            src={getImageUrl(movie.poster_path, 500)}
            alt={movie.title}
            onError={(e) => {e.target.src = 'https://via.placeholder.com/500x750?text=No+Image'}}
          />
          <button 
            className={`favorite-btn-large ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? '❤️ Favorite' : '🤍 Add to Favorites'}
          </button>
        </div>

        <div className="details-info">
          <h1>{movie.title}</h1>
          
          <div className="details-meta">
            <span className="rating">⭐ {formatRating(movie.vote_average)}/10</span>
            <span className="release-date">{formatDate(movie.release_date)}</span>
            <span className="runtime">{movie.runtime} min</span>
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div className="genres">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="genre-tag">{genre.name}</span>
              ))}
            </div>
          )}

          <div className="overview-section">
            <h2>Overview</h2>
            <p>{movie.overview || 'No description available'}</p>
          </div>

          {movie.budget > 0 && (
            <div className="budget-info">
              <p><strong>Budget:</strong> ${movie.budget?.toLocaleString() || 'N/A'}</p>
              <p><strong>Revenue:</strong> ${movie.revenue?.toLocaleString() || 'N/A'}</p>
            </div>
          )}

          {cast.length > 0 && (
            <div className="cast-section">
              <h2>Cast</h2>
              <div className="cast-list">
                {cast.map((actor) => (
                  <div key={actor.id} className="cast-member">
                    {actor.profile_path && (
                      <img src={getImageUrl(actor.profile_path, 185)} alt={actor.name} />
                    )}
                    <p className="actor-name">{actor.name}</p>
                    <p className="character-name">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
