import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="spinner"></div>
        <p className="loading-text">Loading movies...</p>
      </div>
    </div>
  );
}

export default Loader;
