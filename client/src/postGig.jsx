import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './homeComp/footer';
import './App.css';

const PostGig = ({ onCreateGig }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: 26,
    title: '',
    category: 'Full Stack',
    budget: '$2,500',
    skills: 'React, Node.js, Express, MongoDB',
    description: 'We are seeking an experienced developer to take full ownership of our web application feature roadmap.',
    status: 'Open'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onCreateGig) {
      await onCreateGig(formData);
    }
    navigate('/gigs');
  };

  return (
    <>
      <div className="page-container">
        <div className="page-header">
          <span className="page-badge">Employer Portal</span>
          <h1 className="page-title">
            Publish a New <span style={{ color: '#38bdf8' }}>Developer Contract</span>
          </h1>
          <p className="page-desc">
            Define your technical requirements, deliverables, and compensation. Your listing will be saved directly into MongoDB and broadcast to our verified developer network.
          </p>
        </div>

        <div className="contact-layout">
          {/* Form */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: '24px', padding: '2.5rem', boxShadow: 'var(--shadow-card)' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem', fontWeight: 700 }}>Project Details</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Contract Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Next.js 15 & AI Agent Developer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Client / Company Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Sarah Lin (Founder)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Client Email Address *</label>
                  <input
                    type="email"
                    placeholder="sarah@techstartup.io"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Budget ($ USD) *</label>
                  <input
                    type="text"
                    placeholder="e.g. $3,500"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Engineering Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="AI / ML">AI / ML</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Mobile App">Mobile App</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Required Tech Stack (comma separated) *</label>
                <input
                  type="text"
                  placeholder="React, TypeScript, Node.js, MongoDB"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Project Scope & Deliverables *</label>
                <textarea
                  rows="4"
                  placeholder="Provide explicit context on milestones, architecture, and expected timelines..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Initial Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Open">Open (Accepting Proposals)</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Client Account Password (hashed with bcrypt)</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-gradient-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: '1rem', marginTop: '1rem' }}
              >
                Publish Contract to MongoDB ➔
              </button>
            </form>
          </div>

          {/* Live Preview Card */}
          <div>
            <div style={{ position: 'sticky', top: '100px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Live Card Preview
                </span>
                <span style={{ fontSize: '0.75rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                  ● Real-Time
                </span>
              </div>

              <div className="luxury-card" style={{ transform: 'none', boxShadow: 'var(--shadow-card)' }}>
                <div>
                  <div className="card-top-meta">
                    <span className="card-cat-badge">{formData.category || 'Category'}</span>
                    <span className={`card-state-pill state-${(formData.status || 'open').toLowerCase().replace(' ', '-')}`}>
                      ● {formData.status || 'Open'}
                    </span>
                  </div>

                  <h3 className="card-title">
                    {formData.title || 'Untitled Developer Contract'}
                  </h3>

                  <p className="card-summary">
                    {formData.description || 'Description will appear here as you type.'}
                  </p>

                  <div className="card-skills-row">
                    {formData.skills
                      ? formData.skills.split(',').map((s, idx) => (
                          <span key={idx} className="tag-skill-chip">{s.trim()}</span>
                        ))
                      : <span className="tag-skill-chip">Required Skills</span>}
                  </div>
                </div>

                <div>
                  <div className="card-client-footer">
                    <div className="client-snippet">
                      <div className="client-mini-avatar">
                        {(formData.name || 'C')[0]?.toUpperCase() || 'C'}
                      </div>
                      <div className="client-meta-names">
                        <strong>{formData.name || 'Client Name'}</strong>
                        <span>{formData.email || 'client@domain.com'}</span>
                      </div>
                    </div>

                    <div className="card-budget-display">
                      <span className="budget-amount">{formData.budget || '$0'}</span>
                      <span className="budget-subtext">Fixed Price</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', color: '#64748b', fontSize: '0.82rem', padding: '0.5rem 0' }}>
                    Previewing how applicants will view your listing
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PostGig;
