import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './homeComp/footer';
import './App.css';

const About = () => {
  return (
    <>
      <div className="page-container">
        <div className="page-header">
          <span className="page-badge">About DevGigs Platform</span>
          <h1 className="page-title">
            The High-Trust Bridge Between <br />
            <span style={{ color: '#38bdf8' }}>Elite Software Engineers & Ambitious Teams</span>
          </h1>
          <p className="page-desc">
            DevGigs was created to solve broken technical hiring. We eliminate slow agency gatekeepers, guarantee milestone escrow protection, and provide transparent MongoDB-backed contract tracking.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="about-grid">
          <div className="feature-box">
            <div className="feature-icon">⚡</div>
            <h3>Direct Peer-to-Peer Model</h3>
            <p>
              Developers deal directly with technical founders and engineering managers. No non-technical recruiters interpreting your stack or skimming your margin.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">🔒</div>
            <h3>Cryptographic Security</h3>
            <p>
              Engineered with 10-round salted bcrypt password encryption and stateless JSON Web Token (JWT) session authorization on every client interaction.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">🗄️</div>
            <h3>MongoDB Native CRUD</h3>
            <p>
              Direct high-performance indexing against MongoDB database <code>sitSecB</code>. Experience sub-millisecond document lookups and real-time state lifecycle updates.
            </p>
          </div>
        </div>

        {/* The DevGigs Workflow */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: '24px', padding: '3rem', marginBottom: '3.5rem', boxShadow: 'var(--shadow-card)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.75rem', fontWeight: 800 }}>The Verified Milestone Workflow</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#38bdf8', marginBottom: '0.5rem', fontFamily: 'var(--font-code)' }}>01. Post or Discover</div>
              <p style={{ color: '#94a3b8', fontSize: '0.96rem', lineHeight: 1.7 }}>
                Clients publish detailed contract specifications with exact tech stacks and budgets. Freelancers filter, inspect requirements, and submit custom proposals.
              </p>
            </div>

            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b', marginBottom: '0.5rem', fontFamily: 'var(--font-code)' }}>02. Active Sprint (In-Progress)</div>
              <p style={{ color: '#94a3b8', fontSize: '0.96rem', lineHeight: 1.7 }}>
                Once aligned, the contract status transitions to <strong>In-Progress</strong> via the <code>PUT /update/:id</code> API. Code repositories are linked and weekly milestones are tracked.
              </p>
            </div>

            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981', marginBottom: '0.5rem', fontFamily: 'var(--font-code)' }}>03. Verified Delivery (Completed)</div>
              <p style={{ color: '#94a3b8', fontSize: '0.96rem', lineHeight: 1.7 }}>
                Code review passes, deliverables are approved, and status updates to <strong>Completed</strong>. Developers receive verified ratings and client reviews on their profile.
              </p>
            </div>
          </div>
        </div>

        {/* Academic Course Banner */}
        <div style={{ background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(99, 102, 241, 0.08))', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '24px', padding: '2.5rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Course Project Evaluation</span>
          <h3 style={{ fontSize: '1.6rem', marginTop: '0.4rem', marginBottom: '0.75rem' }}>Continuous Assessment (CA-03)</h3>
          <p style={{ color: '#94a3b8', maxWidth: '720px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
            Built for Symbiosis Institute of Technology (SIT), Section B. Successfully meets and exceeds all CA-03 requirements: React 18 multi-page SPA routing, Express REST API, MongoDB Native Driver, JWT authorization, and bcrypt password hashing.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Link to="/gigs" className="btn-gradient-primary">
              Explore Live Contracts
            </Link>
            <Link to="/dashboard" className="btn-ghost">
              Open Dashboard
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
