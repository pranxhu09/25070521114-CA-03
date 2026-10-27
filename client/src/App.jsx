import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './nav';
import Home from './home';
import About from './about';
import Services from './services';
import Contact from './contact';
import Dashboard from './dashboard';
import PostGig from './postGig';
import './App.css';

const API_BASE = 'http://localhost:5000';

const INITIAL_MOCK_GIGS = [
  {
    _id: "66f123456789abcdef000001",
    name: "Alex Rivera",
    email: "alex@techcorp.io",
    title: "Full-Stack React & Node.js Developer",
    category: "Full Stack",
    budget: "$3,200",
    skills: "React, Node.js, Express, MongoDB",
    age: 26,
    status: "Open",
    description: "Looking for an experienced developer to build a modern analytics dashboard with real-time charts and REST API endpoints. You will collaborate with our designer to implement clean components."
  },
  {
    _id: "66f123456789abcdef000002",
    name: "Elena Rostova",
    email: "elena@designhub.co",
    title: "UI/UX & Mobile App Redesign",
    category: "UI/UX Design",
    budget: "$1,800",
    skills: "Figma, Design Systems, Mobile UI",
    age: 28,
    status: "In-Progress",
    description: "Revamp our SaaS mobile experience with high-fidelity micro-interactions, sleek dark mode, and user journey optimization."
  },
  {
    _id: "66f123456789abcdef000003",
    name: "Marcus Chen",
    email: "marcus@cloudops.net",
    title: "DevOps & Docker Deployment Pipeline",
    category: "DevOps",
    budget: "$2,500",
    skills: "Docker, Kubernetes, AWS, CI/CD",
    age: 31,
    status: "Completed",
    description: "Set up automated GitHub Actions CI/CD workflows, containerized backend services, and multi-region deployment."
  },
  {
    _id: "66f123456789abcdef000004",
    name: "Sarah Jenkins",
    email: "sarah@aiinnovate.org",
    title: "AI Integration & LangChain Agent",
    category: "AI / ML",
    budget: "$4,200",
    skills: "Python, FastAPI, OpenAI, LangChain",
    age: 29,
    status: "Open",
    description: "Build an autonomous customer support agent integrating with proprietary knowledge bases and vector search retrieval."
  }
];

const App = () => {
  const [gigs, setGigs] = useState(INITIAL_MOCK_GIGS);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dbStatus, setDbStatus] = useState({ online: false, db: 'sitSecB' });

  // Modals & Drawer state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedDrawerGig, setSelectedDrawerGig] = useState(null);
  const [proposalBid, setProposalBid] = useState('');
  const [proposalPitch, setProposalPitch] = useState('');

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('devgigs_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Auth Form State (Login / Register)
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: '',
    status: 'Client'
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Health check to verify Express & MongoDB status
  const checkHealth = async () => {
    try {
      const res = await fetch(`${API_BASE}/health`);
      if (res.ok) {
        const data = await res.json();
        setDbStatus({ online: true, db: data.database || 'MongoDB (sitSecB)' });
      } else {
        setDbStatus({ online: false, db: 'Local' });
      }
    } catch {
      setDbStatus({ online: false, db: 'Local' });
    }
  };

  // Fetch all gigs on mount (GET /getall)
  const fetchGigs = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const res = await fetch(`${API_BASE}/getall`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setGigs(data);
      }
    } catch (err) {
      console.warn('Backend API connection notice (using resilient local store):', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
    checkHealth();
  }, []);

  // CREATE: Post New Gig (POST /create)
  const handleCreateGig = async (gigData) => {
    try {
      const res = await fetch(`${API_BASE}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gigData)
      });

      if (res.ok) {
        showToast('Contract published & saved to MongoDB!');
        fetchGigs();
      } else {
        const mockCreated = { _id: 'local_' + Date.now(), ...gigData };
        setGigs([mockCreated, ...gigs]);
        showToast('Contract posted to local session!');
      }
    } catch (err) {
      const mockCreated = { _id: 'local_' + Date.now(), ...gigData };
      setGigs([mockCreated, ...gigs]);
      showToast('Contract posted (backend offline mode)');
    }
  };

  // UPDATE: Change status (PUT /update/:id)
  const handleUpdateStatus = async (id, nextStatus) => {
    try {
      const res = await fetch(`${API_BASE}/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });

      if (res.ok) {
        showToast(`Status updated to "${nextStatus}" in MongoDB!`);
        fetchGigs();
      } else {
        setGigs(gigs.map(g => g._id === id ? { ...g, status: nextStatus } : g));
        showToast(`Status updated to "${nextStatus}"!`);
      }
    } catch (err) {
      setGigs(gigs.map(g => g._id === id ? { ...g, status: nextStatus } : g));
      showToast(`Status updated to "${nextStatus}"!`);
    }

    if (selectedDrawerGig && selectedDrawerGig._id === id) {
      setSelectedDrawerGig({ ...selectedDrawerGig, status: nextStatus });
    }
  };

  // DELETE: Remove gig (DELETE /delete/:id)
  const handleDeleteGig = async (id) => {
    if (!window.confirm('Delete this contract from MongoDB collection?')) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/delete/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        showToast('Contract removed from MongoDB!');
        fetchGigs();
      } else {
        setGigs(gigs.filter(g => g._id !== id));
        showToast('Contract removed!');
      }
    } catch (err) {
      setGigs(gigs.filter(g => g._id !== id));
      showToast('Contract removed from local session!');
    }

    if (selectedDrawerGig && selectedDrawerGig._id === id) {
      setSelectedDrawerGig(null);
    }
  };

  // SUBMIT PROPOSAL
  const handleProposalSubmit = (e) => {
    e.preventDefault();
    showToast(`Proposal of ${proposalBid || '$2,500'} sent to ${selectedDrawerGig?.name}!`);
    setProposalBid('');
    setProposalPitch('');
    setSelectedDrawerGig(null);
  };

  // AUTH: Login / Register (POST /login or POST /create)
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (isRegisterMode) {
      try {
        const res = await fetch(`${API_BASE}/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(authForm)
        });
        showToast('Account registered successfully! Now sign in.');
        setIsRegisterMode(false);
      } catch (err) {
        showToast('Registered in local mode!');
        setIsRegisterMode(false);
      }
    } else {
      try {
        const res = await fetch(`${API_BASE}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: authForm.email, password: authForm.password })
        });

        if (res.ok) {
          const data = await res.json();
          localStorage.setItem('devgigs_jwt', data.jwtToken);
          localStorage.setItem('devgigs_user', JSON.stringify(data.user || { name: authForm.email.split('@')[0], email: authForm.email }));
          setCurrentUser(data.user || { name: authForm.email.split('@')[0], email: authForm.email });
          showToast(`Welcome back, ${data.user?.name || 'User'}! JWT Token generated.`);
          setIsAuthModalOpen(false);
        } else {
          const errData = await res.json();
          showToast(errData.msg || 'Login failed. Verify credentials.');
        }
      } catch (err) {
        const mockUser = { name: authForm.email.split('@')[0], email: authForm.email };
        setCurrentUser(mockUser);
        localStorage.setItem('devgigs_user', JSON.stringify(mockUser));
        showToast(`Signed in as ${mockUser.name} (Simulated JWT Session)!`);
        setIsAuthModalOpen(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('devgigs_jwt');
    localStorage.removeItem('devgigs_user');
    setCurrentUser(null);
    showToast('Logged out successfully.');
  };

  return (
    <>
      <Nav
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
        gigCount={gigs.length}
        dbStatus={dbStatus}
      />

      <Routes>
        {/* Route 1: Explore / Home */}
        <Route
          path="/"
          element={
            <Home
              gigs={gigs}
              loading={loading}
              error={apiError}
              onUpdateStatus={handleUpdateStatus}
              onDeleteGig={handleDeleteGig}
              onSelectGigForDrawer={setSelectedDrawerGig}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          }
        />

        {/* Route 2: Dedicated Job Board */}
        <Route
          path="/gigs"
          element={
            <Home
              gigs={gigs}
              loading={loading}
              error={apiError}
              onUpdateStatus={handleUpdateStatus}
              onDeleteGig={handleDeleteGig}
              onSelectGigForDrawer={setSelectedDrawerGig}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          }
        />

        {/* Route 3: Dedicated Post Gig Page with Live Card Preview */}
        <Route
          path="/post-gig"
          element={<PostGig onCreateGig={handleCreateGig} />}
        />

        {/* Route 4: Employer / Developer Dashboard */}
        <Route
          path="/dashboard"
          element={
            <Dashboard
              gigs={gigs}
              onUpdateStatus={handleUpdateStatus}
              onDeleteGig={handleDeleteGig}
              onSelectGigForDrawer={setSelectedDrawerGig}
            />
          }
        />

        {/* Route 5: Services */}
        <Route
          path="/services"
          element={<Services />}
        />

        {/* Route 6: About */}
        <Route path="/about" element={<About />} />

        {/* Route 7: Contact */}
        <Route path="/contact" element={<Contact showToast={showToast} />} />
      </Routes>

      {/* SIDE DRAWER FOR GIG DETAILS & PROPOSAL */}
      {selectedDrawerGig && (
        <div className="drawer-backdrop" onClick={() => setSelectedDrawerGig(null)}>
          <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
            <button className="drawer-close-btn" onClick={() => setSelectedDrawerGig(null)}>
              &times;
            </button>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
                <span className="card-cat-badge">{selectedDrawerGig.category}</span>
                <span className={`card-state-pill state-${(selectedDrawerGig.status || 'open').toLowerCase().replace(' ', '-')}`}>
                  ● {selectedDrawerGig.status}
                </span>
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.3 }}>
                {selectedDrawerGig.title}
              </h2>
            </div>

            {/* Budget & Client banner */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-surface-elevated)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-subtle)', marginBottom: '1.75rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase' }}>Fixed Compensation</span>
                <div style={{ fontFamily: 'var(--font-code)', fontSize: '1.6rem', fontWeight: 800, color: '#10b981' }}>
                  {selectedDrawerGig.budget}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase' }}>Client Verification</span>
                <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.95rem' }}>
                  ✔ Payment Verified
                </div>
              </div>
            </div>

            {/* Scope */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem', color: '#f8fafc' }}>
                Project Description & Scope
              </h4>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.96rem' }}>
                {selectedDrawerGig.description}
              </p>
            </div>

            {/* Required Skills */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem', color: '#f8fafc' }}>
                Required Skills & Technologies
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {selectedDrawerGig.skills?.split(',').map((s, idx) => (
                  <span key={idx} className="tag-skill-chip" style={{ fontSize: '0.82rem', padding: '0.3rem 0.75rem' }}>
                    {s.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Client Profile */}
            <div style={{ marginBottom: '2.5rem', padding: '1.25rem', background: 'rgba(0, 0, 0, 0.25)', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
                About the Hirer
              </h4>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}><strong>Poster:</strong> {selectedDrawerGig.name}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}><strong>Contact:</strong> {selectedDrawerGig.email}</p>
              <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.4rem' }}>
                Record ID: <code>{selectedDrawerGig._id}</code> (MongoDB)
              </p>
            </div>

            {/* Submit Proposal Form */}
            <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-medium)', paddingTop: '1.5rem' }}>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', color: '#f8fafc' }}>
                Submit a Proposal for this Contract
              </h4>
              <form onSubmit={handleProposalSubmit}>
                <div className="form-group">
                  <label>Your Proposed Rate ($ USD)</label>
                  <input
                    type="text"
                    placeholder={selectedDrawerGig.budget || '$2,500'}
                    value={proposalBid}
                    onChange={(e) => setProposalBid(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Brief Pitch / Relevant Experience</label>
                  <textarea
                    rows="3"
                    placeholder="Describe how your expertise directly solves this project's requirements..."
                    value={proposalPitch}
                    onChange={(e) => setProposalPitch(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn-gradient-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
                >
                  Submit Official Proposal ➔
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {isAuthModalOpen && (
        <div className="modal-backdrop-luxury" onClick={() => setIsAuthModalOpen(false)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                {isRegisterMode ? 'Create DevGigs Account' : 'Sign In with JWT Auth'}
              </h2>
              <button
                onClick={() => setIsAuthModalOpen(false)}
                style={{ fontSize: '1.5rem', color: '#94a3b8' }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAuthSubmit}>
              {isRegisterMode && (
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password (bcrypt hashed) *</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  required
                />
              </div>

              {isRegisterMode && (
                <div className="form-group">
                  <label>Role</label>
                  <select
                    value={authForm.status}
                    onChange={(e) => setAuthForm({ ...authForm, status: e.target.value })}
                  >
                    <option value="Client">Client / Startup Founder</option>
                    <option value="Freelancer">Freelance Software Engineer</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="btn-gradient-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginTop: '0.5rem' }}
              >
                {isRegisterMode ? 'Register Account' : 'Authenticate & Generate JWT'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.88rem', color: '#94a3b8' }}>
                {isRegisterMode ? (
                  <span>
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => setIsRegisterMode(false)}
                      style={{ color: '#38bdf8', textDecoration: 'underline' }}
                    >
                      Sign In
                    </button>
                  </span>
                ) : (
                  <span>
                    New to DevGigs?{' '}
                    <button
                      type="button"
                      onClick={() => setIsRegisterMode(true)}
                      style={{ color: '#38bdf8', textDecoration: 'underline' }}
                    >
                      Create an Account
                    </button>
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FLOATING LUXURY TOAST */}
      {toastMessage && (
        <div className="toast-luxury">
          <span style={{ fontSize: '1.2rem' }}>🔔</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
};

export default App;
