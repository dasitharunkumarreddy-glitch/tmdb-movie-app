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

  const handleBack = () => {
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home onMovieClick={handleMovieClick} />} />
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
