const API_KEY = '3ac40a1825a427df09141f0759960867';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=${page}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getMovieCredits = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw error;
  }
};

export const getMovieReviews = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
};

export const getTrendingMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US&page=${page}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
};

export const getGenres = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};
