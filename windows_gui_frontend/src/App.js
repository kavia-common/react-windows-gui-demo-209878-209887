import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import HealthStatus from './components/HealthStatus';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <header className="App-header">
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <div className="hero">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="title">React Windows GUI Demo</h1>
          <p className="subtitle">Modern UI with Ocean Professional theme</p>
          <p className="current-theme">
            Current theme: <strong>{theme}</strong>
          </p>
        </div>

        <div className="content">
          <HealthStatus />
        </div>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
