import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About</h3>
          <p>TMDB Movie App - Discover and explore millions of movies and TV shows.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Data Source</h3>
          <p><a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">The Movie Database (TMDB)</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} TMDB Movie App. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
