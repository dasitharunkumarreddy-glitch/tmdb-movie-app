const API_KEY = '97be5595148680de62bd11d97917f4e6';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchJson = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    const message = data.status_message || 'TMDB API error';
    throw new Error(`${message} (status ${response.status})`);
  }
  return data;
};

export const getPopularMovies = async (page = 1) => {
  try {
    return await fetchJson(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    return await fetchJson(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=${page}`
    );
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    return await fetchJson(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getMovieCredits = async (movieId) => {
  try {
    return await fetchJson(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
    );
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw error;
  }
};

export const getMovieReviews = async (movieId) => {
  try {
    return await fetchJson(
      `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`
    );
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
};

export const getTrendingMovies = async (page = 1) => {
  try {
    return await fetchJson(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`
    );
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    return await fetchJson(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US&page=${page}`
    );
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
};

export const getGenres = async () => {
  try {
    return await fetchJson(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};
