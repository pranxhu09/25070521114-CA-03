import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Header = ({ totalGigs, openGigs, onSearchChange, searchTerm, onSelectCategory }) => {
  return (
    <header className="hero-stage">
      <div className="hero-grid">
        {/* Left Column: Headline & Search */}
        <div>
          <div className="hero-tag">
            <span className="status-live-dot"></span>
            <span>Live Express + MongoDB API (Port 5000)</span>
          </div>

          <h1 className="hero-headline">
            Where Modern Teams Hire <br />
            <span className="gradient-title-text">Elite Software Freelancers</span>
          </h1>

          <p className="hero-lead-text">
            Skip bureaucratic recruitment agencies. Connect directly with verified full-stack, mobile, and AI developers on flexible milestone contracts.
          </p>

          {/* Quick Search */}
          <div className="hero-search-box">
            <span style={{ fontSize: '1.2rem', paddingLeft: '0.5rem', color: '#64748b' }}>🔍</span>
            <input
              type="text"
              placeholder="Search contracts by role, skill (React, Python...) or poster..."
              value={searchTerm || ''}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            />
            <Link to="/gigs" className="btn-gradient-primary" style={{ whiteSpace: 'nowrap', padding: '0.55rem 1.1rem' }}>
              Explore Jobs ➔
            </Link>
          </div>

          {/* Preset Chips */}
          <div className="hero-preset-tags">
            <span>Popular:</span>
            {['React', 'Node.js', 'AI Agents', 'Next.js', 'Docker', 'Mobile App'].map((tech) => (
              <span
                key={tech}
                className="preset-chip"
                onClick={() => onSearchChange && onSearchChange(tech)}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Featured Developer Spotlight Card */}
        <div>
          <div className="hero-spotlight-card">
            <div className="spotlight-badge">
              <span>★</span> Top Rated Developer Spotlight
            </div>

            <div className="spotlight-header">
              <div className="spotlight-avatar">
                👨‍💻
              </div>
              <div>
                <h3 className="spotlight-dev-name">Aarav Mehta</h3>
                <p className="spotlight-dev-role">Principal Full-Stack & Cloud Architect</p>
              </div>
            </div>

            <div className="spotlight-stats-row">
              <div className="spotlight-stat-item">
                <strong>4.99 ★</strong>
                <span>Rating</span>
              </div>
              <div className="spotlight-stat-item">
                <strong>47</strong>
                <span>Projects Done</span>
              </div>
              <div className="spotlight-stat-item">
                <strong>100%</strong>
                <span>Job Success</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
              <span className="tag-skill-chip" style={{ color: '#38bdf8' }}>React 19</span>
              <span className="tag-skill-chip" style={{ color: '#818cf8' }}>Node.js / Express</span>
              <span className="tag-skill-chip" style={{ color: '#34d399' }}>MongoDB</span>
              <span className="tag-skill-chip" style={{ color: '#f59e0b' }}>AWS & Docker</span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/post-gig" className="btn-gradient-primary" style={{ flex: 1, justifyContent: 'center' }}>
                Hire for a Project
              </Link>
              <Link to="/services" className="btn-ghost" style={{ flex: 1, textAlign: 'center' }}>
                View All Talent
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
