import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFilm, FaHeart, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="navbar-container">
        <motion.div
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="logo-link">
            <FaFilm className="logo-icon" />
            <span className="logo-text">TMDB</span>
          </Link>
        </motion.div>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              <motion.span
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Home
              </motion.span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/favorites" className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}>
              <motion.span
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaHeart className="nav-icon" />
                Favorites
              </motion.span>
            </Link>
          </li>
          <li className="nav-item">
            <motion.button
              className="theme-toggle"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </motion.button>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
}

export default Navbar;
