import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('themeDarkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('themeDarkMode', JSON.stringify(isDarkMode));
    
    // Update document class
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const colors = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const darkTheme = {
  bg: '#1a1a1a',
  bgSecondary: '#2a2a2a',
  bgTertiary: '#333333',
  text: '#ffffff',
  textSecondary: '#cccccc',
  textTertiary: '#999999',
  accent: '#ffd700',
  accentHover: '#ffed4e',
  border: '#333333',
  shadow: 'rgba(0, 0, 0, 0.5)',
};

export const lightTheme = {
  bg: '#ffffff',
  bgSecondary: '#f5f5f5',
  bgTertiary: '#e8e8e8',
  text: '#1a1a1a',
  textSecondary: '#333333',
  textTertiary: '#666666',
  accent: '#1976d2',
  accentHover: '#1565c0',
  border: '#e0e0e0',
  shadow: 'rgba(0, 0, 0, 0.1)',
};
