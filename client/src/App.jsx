import React, { useState } from 'react';
import CareerForm from './components/CareerForm';
import CareerResult from './components/CareerResult';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [predictionData, setPredictionData] = useState(null);
  const [inputData, setInputData] = useState(null);
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  };

  const handlePredict = async ({ title, experience, country, techStack }) => {
    setLoading(true);
    setError(null);
    setPredictionData(null);
    setInputData({ title, experience, country, techStack });

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, experience, country, techStack }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Server returned an error. Please try again.');
      }

      setPredictionData(result);
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err.message || 'Failed to connect to CareerLens API. Make sure the backend is running.');
      setInputData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="theme-toggle-container">
        <button 
          onClick={toggleTheme} 
          className="theme-toggle-btn" 
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            /* Sun icon */
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: '1.25rem', height: '1.25rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          ) : (
            /* Moon icon */
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: '1.25rem', height: '1.25rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>

      <header className="app-header">
        <h1 className="app-title">CareerLens</h1>
        <p className="app-tagline">
          "Where does your career go next?" — AI-powered talent diagnostic. Predict your salary ceiling, AI risk, and discover high-growth strategic pivots.
        </p>
      </header>

      <main style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {error && (
          <div className="error-banner">
            <svg className="error-banner-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
            <button 
              type="button" 
              className="error-banner-close" 
              onClick={() => setError(null)}
              aria-label="Close error message"
            >
              &times;
            </button>
          </div>
        )}

        <CareerForm onSubmit={handlePredict} loading={loading} />

        {predictionData && !loading && (
          <CareerResult data={predictionData} inputData={inputData} />
        )}
      </main>

      <footer className="app-footer">
        <p>
          CareerLens — Powered by Gemini + React + Express.
        </p>
      </footer>
    </>
  );
}
