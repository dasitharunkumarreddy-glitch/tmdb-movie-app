import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

function Navbar() {
  const { isDarkMode, toggleTheme, colors } = useTheme();

  return (
    <nav className="navbar" style={{ backgroundColor: colors.bgSecondary, borderBottomColor: colors.accent }}>
      <div className="navbar-container">
        <div className="navbar-logo" style={{ color: colors.accent }}>
          🎬 TMDB Movie App
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/" className="nav-link" style={{ color: colors.text }}>Home</a>
          </li>
          <li className="nav-item">
            <a href="/favorites" className="nav-link" style={{ color: colors.text }}>Favorites</a>
          </li>
          <li className="nav-item">
            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              style={{ 
                color: colors.accent,
                borderColor: colors.accent
              }}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
