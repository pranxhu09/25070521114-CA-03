import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './App.css';

const Nav = ({ onOpenPostModal, onOpenAuthModal, currentUser, onLogout, gigCount = 4, dbStatus }) => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="devgigs-nav">
      <div className="nav-inner">
        {/* Brand */}
        <Link to="/" className="brand-wrapper">
          <div className="brand-logo-icon">⚡</div>
          <span className="brand-text">DevGigs</span>
          <span className="brand-badge">CA-03</span>
          <span
            className={`db-status-badge ${dbStatus?.online ? '' : 'offline'}`}
            title={dbStatus?.online ? `MongoDB Connected: ${dbStatus.db}` : 'MongoDB Local / In-Memory'}
          >
            <span className="db-status-dot"></span>
            <span>{dbStatus?.online ? 'sitSecB' : 'Local'}</span>
          </span>
        </Link>

        {/* Professional Navigation Routes */}
        <ul className="nav-links-menu">
          <li>
            <Link to="/" className={`nav-link-btn ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}>
              <span>Explore</span>
            </Link>
          </li>
          <li>
            <Link to="/gigs" className={`nav-link-btn ${isActive('/gigs') ? 'active' : ''}`}>
              <span>Job Board</span>
              <span style={{ fontSize: '0.72rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.1rem 0.45rem', borderRadius: '9999px', fontWeight: 700 }}>
                {gigCount}
              </span>
            </Link>
          </li>
          <li>
            <Link to="/services" className={`nav-link-btn ${isActive('/services') ? 'active' : ''}`}>
              <span>Services</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={`nav-link-btn ${isActive('/dashboard') ? 'active' : ''}`}>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/about" className={`nav-link-btn ${isActive('/about') ? 'active' : ''}`}>
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link to="/contact" className={`nav-link-btn ${isActive('/contact') ? 'active' : ''}`}>
              <span>Contact!</span>
            </Link>
          </li>
        </ul>

        {/* Right Actions */}
        <div className="nav-actions-group">
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #38bdf8, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', color: '#fff' }}>
                  {(currentUser.name || 'U')[0].toUpperCase()}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
                    {currentUser.name}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>
                    ● Authenticated
                  </span>
                </div>
              </div>
              <button onClick={onLogout} className="btn-ghost" style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}>
                Logout
              </button>
            </div>
          ) : (
            <button onClick={onOpenAuthModal} className="btn-ghost">
              Sign In
            </button>
          )}

          <Link to="/post-gig" className="btn-gradient-primary">
            <span>+</span> Post a Gig
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
