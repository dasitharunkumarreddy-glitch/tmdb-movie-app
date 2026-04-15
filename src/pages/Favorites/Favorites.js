import React, { useState, useEffect } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import { getFavorites } from '../../utils/helpers';
import './Favorites.css';

function Favorites({ onMovieClick }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = getFavorites();
    setFavorites(storedFavorites);
  }, []);

  const refreshFavorites = () => {
    const storedFavorites = getFavorites();
    setFavorites(storedFavorites);
  };

  return (
    <div className="favorites-container">
      <h1>My Favorite Movies</h1>
      
      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>You haven't added any movies to your favorites yet.</p>
          <p>Start exploring and add your favorite movies! ❤️</p>
        </div>
      ) : (
        <>
          <p className="favorites-count">You have {favorites.length} favorite movie(s)</p>
          <div className="movies-grid">
            {favorites.map((movie) => (
              <MovieCard 
                key={movie.id}
                movie={movie}
                onMovieClick={() => {
                  onMovieClick(movie.id);
                  refreshFavorites();
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Favorites;
