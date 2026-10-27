import React, { useState } from 'react';
import Footer from './homeComp/footer';
import './App.css';

const Contact = ({ showToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      if (showToast) showToast('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', category: 'General Inquiry', message: '' });
      if (showToast) showToast('Inquiry dispatched! Our advisory team will respond within 4 hours.');
    }, 600);
  };

  return (
    <>
      <div className="page-container">
        <div className="page-header">
          <span className="page-badge">Support & Advisory</span>
          <h1 className="page-title">
            Have Questions or Need <br />
            <span style={{ color: '#38bdf8' }}>Custom Engineering Talent?</span>
          </h1>
          <p className="page-desc">
            Connect with our team for platform questions, enterprise developer vetting, or technical support for our CA-03 platform.
          </p>
        </div>

        <div className="contact-layout">
          {/* Left info */}
          <div className="contact-info-card">
            <h3>Enterprise & Academic Hub</h3>
            <p style={{ color: '#94a3b8', marginBottom: '2.5rem', lineHeight: 1.7 }}>
              Submit your inquiry or visit our engineering lab on campus. We assist with custom talent matching and API integrations.
            </p>

            <div className="contact-info-item">
              <span className="contact-info-icon">📍</span>
              <div>
                <strong style={{ display: 'block', color: '#f8fafc', marginBottom: '0.2rem' }}>Campus & Research Lab</strong>
                <span style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
                  Symbiosis Institute of Technology (SIT), Section B Lab
                </span>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-icon">📧</span>
              <div>
                <strong style={{ display: 'block', color: '#f8fafc', marginBottom: '0.2rem' }}>Direct Support Email</strong>
                <span style={{ color: '#94a3b8', fontSize: '0.92rem' }}>support@devgigs.tech</span>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-icon">⚡</span>
              <div>
                <strong style={{ display: 'block', color: '#f8fafc', marginBottom: '0.2rem' }}>REST API Gateway</strong>
                <span style={{ color: '#34d399', fontSize: '0.92rem', fontFamily: 'var(--font-code)' }}>
                  http://localhost:5000 (Express & MongoDB)
                </span>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-icon">🗄️</span>
              <div>
                <strong style={{ display: 'block', color: '#f8fafc', marginBottom: '0.2rem' }}>Database Cluster</strong>
                <span style={{ color: '#818cf8', fontSize: '0.92rem', fontFamily: 'var(--font-code)' }}>
                  mongodb://localhost:27017 (sitSecB.gigs)
                </span>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="rahul@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Topic Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Enterprise Hiring">Enterprise Developer Hiring</option>
                    <option value="API Support">REST API & MongoDB Query</option>
                    <option value="Billing & Escrow">Billing & Escrow</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Contract Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Your Message *</label>
                <textarea
                  rows="4"
                  placeholder="Describe your inquiry or technical requirement in detail..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-gradient-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: '1rem', marginTop: '0.5rem' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Transmitting Message...' : 'Send Message to DevGigs ➔'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
