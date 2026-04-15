// Format rating to 1 decimal place
export const formatRating = (rating) => {
  return rating ? rating.toFixed(1) : 'N/A';
};

// Get image URL from TMDB
export const getImageUrl = (path, width = 500) => {
  if (!path) {
    return 'https://via.placeholder.com/500x750?text=No+Image';
  }
  return `https://image.tmdb.org/t/p/w${width}${path}`;
};

// Format date to readable format
export const formatDate = (dateString) => {
  if (!dateString) return 'TBA';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Truncate text to specific length
export const truncateText = (text, length) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

// Get color based on rating
export const getRatingColor = (rating) => {
  if (rating >= 8) return '#4CAF50';
  if (rating >= 6) return '#FF9800';
  return '#F44336';
};

// Check if movie is in favorites
export const isInFavorites = (movieId, favorites) => {
  return favorites.some(movie => movie.id === movieId);
};

// Add/Remove movie from favorites (localStorage)
export const toggleFavorite = (movie) => {
  const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
  const isAlreadyFavorite = favorites.some(fav => fav.id === movie.id);
  
  if (isAlreadyFavorite) {
    const updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
  } else {
    favorites.push(movie);
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
  }
  
  return !isAlreadyFavorite;
};

// Get favorites from localStorage
export const getFavorites = () => {
  return JSON.parse(localStorage.getItem('favoriteMovies')) || [];
};
