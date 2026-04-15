import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieCard from '../../components/MovieCard/MovieCard';
import Loader from '../../components/Loader/Loader';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import './Home.css';

function Home({ onMovieClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { movies, loading, error, totalPages } = useFetchMovies(searchTerm, page);

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

  if (error) {
    return (
      <div className="home-container">
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="movies-grid">
            {movies && movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard 
                  key={movie.id}
                  movie={movie}
                  onMovieClick={onMovieClick}
                />
              ))
            ) : (
              <p className="no-movies">No movies found</p>
            )}
          </div>

          {movies.length > 0 && (
            <div className="pagination">
              <button 
                className="pagination-btn"
                onClick={handlePreviousPage}
                disabled={page === 1}
              >
                ← Previous
              </button>
              <span className="page-info">Page {page} of {totalPages}</span>
              <button 
                className="pagination-btn"
                onClick={handleNextPage}
                disabled={page === totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
