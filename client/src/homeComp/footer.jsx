import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Footer = () => {
  return (
    <footer className="luxury-footer">
      <div className="footer-inner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #38bdf8, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white' }}>
              ⚡
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800 }}>DevGigs</span>
            <span className="brand-badge">CA-03</span>
          </div>

          <p className="footer-subtext">
            The next-generation marketplace connecting engineering teams with verified freelance software developers. Engineered for speed, security, and transparent collaboration.
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem', padding: '0.35rem 0.85rem', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', fontSize: '0.8rem', color: '#34d399' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
            <span>All Systems Operational (Port 5000 / 5173)</span>
          </div>
        </div>

        <div>
          <h4 className="footer-heading">Platform Routes</h4>
          <ul className="footer-list">
            <li><Link to="/">Explore Contracts</Link></li>
            <li><Link to="/gigs">All Gigs & Job Board</Link></li>
            <li><Link to="/post-gig">Post a Requirement</Link></li>
            <li><Link to="/dashboard">Developer Dashboard</Link></li>
            <li><Link to="/services">Vetted Services</Link></li>
            <li><Link to="/about">About Platform</Link></li>
            <li><Link to="/contact">Support & Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Architecture & Stack</h4>
          <ul className="footer-list">
            <li><span style={{ color: '#94a3b8' }}>Client: React 18 / Vite</span></li>
            <li><span style={{ color: '#94a3b8' }}>Routing: React Router DOM 6</span></li>
            <li><span style={{ color: '#94a3b8' }}>Backend: Node.js / Express</span></li>
            <li><span style={{ color: '#94a3b8' }}>Database: MongoDB Native</span></li>
            <li><span style={{ color: '#94a3b8' }}>Security: bcryptjs & JWT</span></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Academic Metadata</h4>
          <ul className="footer-list">
            <li><strong style={{ color: '#f8fafc' }}>Course:</strong> Continuous Assessment 03</li>
            <li><strong style={{ color: '#f8fafc' }}>Institution:</strong> SIT, Sec B</li>
            <li><strong style={{ color: '#f8fafc' }}>Instructor:</strong> Somesh Chutel</li>
            <li><strong style={{ color: '#f8fafc' }}>Database:</strong> <code>sitSecB</code> (Port 27017)</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p>&copy; {new Date().getFullYear()} DevGigs Platform. Built for Symbiosis Institute of Technology Coursework.</p>
        <p>MongoDB Native Driver • REST API v1.0</p>
      </div>
    </footer>
  );
};

export default Footer;
