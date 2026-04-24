import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import Favorites from './pages/Favorites/Favorites';
import './App.css';

function AppContent() {
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleAddToFavorites = (movie) => {
    // The toggleFavorite function in helpers.js handles the localStorage logic
    // We can add any additional logic here if needed (like showing a toast notification)
    console.log('Added to favorites:', movie.title);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <main className="main-content content-wrapper">
        <Routes>
          <Route path="/" element={<Home onMovieClick={handleMovieClick} onAddToFavorites={handleAddToFavorites} />} />
          <Route path="/movie/:id" element={<MovieDetails onBack={handleBack} />} />
          <Route path="/favorites" element={<Favorites onMovieClick={handleMovieClick} />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
