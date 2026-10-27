import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './homeComp/footer';
import './App.css';

const Dashboard = ({ gigs, onUpdateStatus, onDeleteGig, onSelectGigForDrawer }) => {
  const totalGigs = gigs.length;
  const openCount = gigs.filter(g => (g.status || '').toLowerCase() === 'open').length;
  const inProgressCount = gigs.filter(g => (g.status || '').toLowerCase() === 'in-progress').length;
  const completedCount = gigs.filter(g => (g.status || '').toLowerCase() === 'completed').length;

  // Calculate total budget volume
  const totalVolume = gigs.reduce((acc, gig) => {
    const num = parseInt((gig.budget || '0').replace(/[^0-9]/g, '')) || 0;
    return acc + num;
  }, 0);

  return (
    <>
      <div className="page-container">
        <div className="page-header" style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="page-badge">Management Console</span>
              <h1 className="page-title" style={{ fontSize: '2.5rem', marginBottom: '0.4rem' }}>
                Employer & Developer <span style={{ color: '#38bdf8' }}>Dashboard</span>
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
                Track live contracts, manage lifecycle states, and monitor database records in real-time.
              </p>
            </div>

            <Link to="/post-gig" className="btn-gradient-primary">
              <span>+</span> Post New Contract
            </Link>
          </div>
        </div>

        {/* 4 METRIC CARDS */}
        <div className="dashboard-grid">
          <div className="metric-card">
            <div className="label">Total Contracts</div>
            <div className="value">{totalGigs}</div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.4rem' }}>
              Stored in MongoDB collection
            </div>
          </div>

          <div className="metric-card">
            <div className="label">Total Budget Volume</div>
            <div className="value" style={{ color: '#10b981' }}>
              ${totalVolume.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.4rem' }}>
              Aggregated across all listings
            </div>
          </div>

          <div className="metric-card">
            <div className="label">Active In-Progress</div>
            <div className="value" style={{ color: '#f59e0b' }}>
              {inProgressCount}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.4rem' }}>
              Currently under active development
            </div>
          </div>

          <div className="metric-card">
            <div className="label">Completed Contracts</div>
            <div className="value" style={{ color: '#818cf8' }}>
              {completedCount}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.4rem' }}>
              Successfully delivered milestones
            </div>
          </div>
        </div>

        {/* CONTRACTS DATA TABLE */}
        <div className="data-table-wrapper">
          <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Active Database Records (sitSecB.gigs)</h3>
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Connected via Express REST API (Port 5000)</span>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Project Details</th>
                <th>Category</th>
                <th>Client / Poster</th>
                <th>Budget</th>
                <th>Status (PUT /update)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {gigs.map((gig) => (
                <tr key={gig._id}>
                  <td>
                    <strong
                      style={{ color: '#f8fafc', cursor: 'pointer', display: 'block', marginBottom: '0.2rem' }}
                      onClick={() => onSelectGigForDrawer && onSelectGigForDrawer(gig)}
                    >
                      {gig.title}
                    </strong>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      ID: {String(gig._id).substring(0, 16)}...
                    </span>
                  </td>
                  <td>
                    <span className="card-cat-badge">{gig.category || 'Engineering'}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#e2e8f0' }}>{gig.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{gig.email}</div>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--font-code)', fontWeight: 700, color: '#10b981' }}>
                      {gig.budget}
                    </span>
                  </td>
                  <td>
                    <select
                      value={gig.status || 'Open'}
                      onChange={(e) => onUpdateStatus(gig._id, e.target.value)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        borderRadius: '9999px',
                        border: '1px solid var(--border-medium)',
                        background:
                          gig.status === 'Open'
                            ? 'rgba(16, 185, 129, 0.15)'
                            : gig.status === 'In-Progress'
                            ? 'rgba(245, 158, 11, 0.15)'
                            : 'rgba(99, 102, 241, 0.15)',
                        color:
                          gig.status === 'Open'
                            ? '#34d399'
                            : gig.status === 'In-Progress'
                            ? '#fbbf24'
                            : '#a5b4fc',
                        width: 'auto'
                      }}
                    >
                      <option value="Open">Open</option>
                      <option value="In-Progress">In-Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => onSelectGigForDrawer && onSelectGigForDrawer(gig)}
                        className="btn-view-scope"
                        style={{ padding: '0.35rem 0.65rem' }}
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => onDeleteGig(gig._id)}
                        className="btn-delete-card"
                        style={{ padding: '0.35rem 0.65rem' }}
                        title="Delete from MongoDB"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
