import React, { useState } from 'react';

const COUNTRIES = [
  'India',
  'United States',
  'United Kingdom',
  'Germany',
  'Canada',
  'Australia',
  'Singapore',
  'Netherlands'
];

const EXPERIENCE_LEVELS = [
  { label: 'Junior / Entry-level (0-2 years)', value: 'Entry-level (0-2 years)' },
  { label: 'Mid-level (3-5 years)', value: 'Mid-level (3-5 years)' },
  { label: 'Senior (6-10 years)', value: 'Senior (6-10 years)' },
  { label: 'Lead / Principal / Staff (10+ years)', value: 'Lead/Principal (10+ years)' }
];

export default function CareerForm({ onSubmit, loading }) {
  const [title, setTitle] = useState('');
  const [experience, setExperience] = useState('Mid-level (3-5 years)');
  const [country, setCountry] = useState('India');
  const [techStack, setTechStack] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    if (!title.trim() || !techStack.trim()) return;

    onSubmit({
      title: title.trim(),
      experience,
      country,
      techStack: techStack.trim()
    });
  };

  const isFormValid = title.trim().length > 0 && techStack.trim().length > 0;

  return (
    <div className="glass-panel">
      <div className="card-title">
        <span>Career Parameters</span>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="wave-spinner">
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
          </div>
          <p className="loading-text">Mapping Career Vector...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-content">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title-input" className="form-label">Job Title</label>
              <input
                id="title-input"
                type="text"
                className="text-input"
                placeholder="e.g. Software Engineer, Product Manager"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience-input" className="form-label">Experience Level</label>
              <select
                id="experience-input"
                className="select-input"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                {EXPERIENCE_LEVELS.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="country-input" className="form-label">Country</label>
              <select
                id="country-input"
                className="select-input"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {COUNTRIES.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tech-stack-input" className="form-label">Core Tech Stack</label>
              <input
                id="tech-stack-input"
                type="text"
                className="text-input"
                placeholder="e.g. React, Node.js, AWS, Postgres"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={!isFormValid || loading}
          >
            <span>Scan Career Lens</span>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: '1.25rem', height: '1.25rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      )}
    </div>
  );
}
