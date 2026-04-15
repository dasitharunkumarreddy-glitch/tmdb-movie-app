import { useState, useEffect } from 'react';
import { getPopularMovies, searchMovies } from '../services/tmdbApi';

export const useFetchMovies = (searchTerm = '', page = 1) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (searchTerm.trim()) {
          data = await searchMovies(searchTerm, page);
        } else {
          data = await getPopularMovies(page);
        }
        
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 0);
      } catch (err) {
        setError(err.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm, page]);

  return { movies, loading, error, totalPages };
};
