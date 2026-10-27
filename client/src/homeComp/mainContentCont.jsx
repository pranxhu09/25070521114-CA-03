import React, { useState } from 'react';
import '../App.css';

const MainContent = ({
  gigs,
  loading,
  error,
  onUpdateStatus,
  onDeleteGig,
  onSelectGigForDrawer,
  searchTerm,
  setSearchTerm
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['All', 'Full Stack', 'UI/UX Design', 'AI / ML', 'DevOps', 'Mobile App'];

  // Counts for status pills
  const totalCount = gigs.length;
  const openCount = gigs.filter(g => (g.status || '').toLowerCase() === 'open').length;
  const inProgressCount = gigs.filter(g => (g.status || '').toLowerCase() === 'in-progress').length;
  const completedCount = gigs.filter(g => (g.status || '').toLowerCase() === 'completed').length;

  // Filter logic
  let filteredGigs = gigs.filter((gig) => {
    const textToSearch = `${gig.title || ''} ${gig.skills || ''} ${gig.name || ''} ${gig.category || ''}`.toLowerCase();
    const matchesSearch = !searchTerm || textToSearch.includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      (gig.category && gig.category.toLowerCase() === selectedCategory.toLowerCase());

    const matchesStatus =
      selectedStatus === 'All' ||
      (gig.status && gig.status.toLowerCase() === selectedStatus.toLowerCase());

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sorting
  filteredGigs.sort((a, b) => {
    if (sortBy === 'newest') return (b._id > a._id ? 1 : -1);
    if (sortBy === 'budget-high') {
      const getNum = (str) => parseInt((str || '0').replace(/[^0-9]/g, '')) || 0;
      return getNum(b.budget) - getNum(a.budget);
    }
    if (sortBy === 'budget-low') {
      const getNum = (str) => parseInt((str || '0').replace(/[^0-9]/g, '')) || 0;
      return getNum(a.budget) - getNum(b.budget);
    }
    return 0;
  });

  const getStatusClass = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'open':
        return 'card-state-pill state-open';
      case 'in-progress':
        return 'card-state-pill state-in-progress';
      case 'completed':
        return 'card-state-pill state-completed';
      default:
        return 'card-state-pill state-open';
    }
  };

  const getNextStatus = (currentStatus) => {
    switch ((currentStatus || '').toLowerCase()) {
      case 'open':
        return 'In-Progress';
      case 'in-progress':
        return 'Completed';
      case 'completed':
        return 'Open';
      default:
        return 'In-Progress';
    }
  };

  return (
    <section className="portal-main-area">
      {/* TOOLBAR */}
      <div className="portal-toolbar">
        {/* Upper: Category Tabs */}
        <div className="toolbar-upper-row">
          <div className="category-tabs-group">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`category-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="sort-select-box">
            <span>Sort By:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Latest Contracts</option>
              <option value="budget-high">Budget: High to Low</option>
              <option value="budget-low">Budget: Low to High</option>
            </select>
          </div>
        </div>

        {/* Lower: Status Counters */}
        <div className="toolbar-lower-row">
          <div className="status-counter-pills">
            <button
              onClick={() => setSelectedStatus('All')}
              className={`status-count-btn ${selectedStatus === 'All' ? 'active' : ''}`}
            >
              <span>All Contracts</span>
              <span className="status-count-badge">{totalCount}</span>
            </button>

            <button
              onClick={() => setSelectedStatus('Open')}
              className={`status-count-btn ${selectedStatus === 'Open' ? 'active' : ''}`}
            >
              <span style={{ color: '#10b981' }}>●</span>
              <span>Open</span>
              <span className="status-count-badge">{openCount}</span>
            </button>

            <button
              onClick={() => setSelectedStatus('In-Progress')}
              className={`status-count-btn ${selectedStatus === 'In-Progress' ? 'active' : ''}`}
            >
              <span style={{ color: '#f59e0b' }}>●</span>
              <span>In-Progress</span>
              <span className="status-count-badge">{inProgressCount}</span>
            </button>

            <button
              onClick={() => setSelectedStatus('Completed')}
              className={`status-count-btn ${selectedStatus === 'Completed' ? 'active' : ''}`}
            >
              <span style={{ color: '#a5b4fc' }}>●</span>
              <span>Completed</span>
              <span className="status-count-badge">{completedCount}</span>
            </button>
          </div>

          <div style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
            Showing <strong>{filteredGigs.length}</strong> verified opportunities
          </div>
        </div>
      </div>

      {/* LOADING INDICATOR */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#94a3b8' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem', animation: 'spin 1.5s linear infinite' }}>⚙️</div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#f8fafc' }}>Synchronizing with MongoDB Collection...</h3>
          <p style={{ color: '#64748b' }}>Querying database <code>sitSecB</code> on port 5000</p>
        </div>
      )}

      {/* ERROR NOTICE */}
      {error && !loading && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1.2rem', borderRadius: '12px', color: '#f87171', marginBottom: '2rem' }}>
          <strong>Notice:</strong> {error}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && filteredGigs.length === 0 && (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔎</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No matching contracts found</h3>
          <p style={{ color: '#94a3b8', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
            Try resetting your search query or switch status categories to explore other active opportunities.
          </p>
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedStatus('All'); if (setSearchTerm) setSearchTerm(''); }}
            className="btn-ghost"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* GIGS CARDS GRID */}
      {!loading && filteredGigs.length > 0 && (
        <div className="gigs-luxury-grid">
          {filteredGigs.map((gig) => {
            const gigId = gig._id;
            return (
              <div key={gigId} className="luxury-card">
                <div>
                  <div className="card-top-meta">
                    <span className="card-cat-badge">{gig.category || 'Engineering'}</span>
                    <span className={getStatusClass(gig.status)}>
                      ● {gig.status || 'Open'}
                    </span>
                  </div>

                  <h3
                    className="card-title"
                    onClick={() => onSelectGigForDrawer && onSelectGigForDrawer(gig)}
                  >
                    {gig.title || `${gig.name}'s Project`}
                  </h3>

                  <p className="card-summary">{gig.description || 'No detailed scope provided.'}</p>

                  <div className="card-skills-row">
                    {gig.skills
                      ? gig.skills.split(',').map((s, idx) => (
                          <span key={idx} className="tag-skill-chip">
                            {s.trim()}
                          </span>
                        ))
                      : <span className="tag-skill-chip">Full Stack</span>}
                  </div>
                </div>

                <div>
                  <div className="card-client-footer">
                    <div className="client-snippet">
                      <div className="client-mini-avatar">
                        {(gig.name || 'C')[0].toUpperCase()}
                      </div>
                      <div className="client-meta-names">
                        <strong>{gig.name || 'Anonymous Client'}</strong>
                        <span>{gig.email || 'verified@client.io'}</span>
                      </div>
                    </div>

                    <div className="card-budget-display">
                      <span className="budget-amount">{gig.budget || '$1,500'}</span>
                      <span className="budget-subtext">Fixed Price</span>
                    </div>
                  </div>

                  <div className="card-actions-bar">
                    <button
                      onClick={() => onUpdateStatus(gigId, getNextStatus(gig.status))}
                      className="btn-cycle-state"
                      title="Advance status lifecycle in MongoDB"
                    >
                      Cycle: <strong>{getNextStatus(gig.status)}</strong> ➔
                    </button>

                    <button
                      onClick={() => onSelectGigForDrawer && onSelectGigForDrawer(gig)}
                      className="btn-view-scope"
                    >
                      View Scope
                    </button>

                    <button
                      onClick={() => onDeleteGig(gigId)}
                      className="btn-delete-card"
                      title="Delete contract from MongoDB collection"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MainContent;
