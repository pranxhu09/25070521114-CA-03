import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './homeComp/footer';
import './App.css';

const Services = () => {
  const serviceCategories = [
    {
      icon: '🌐',
      title: 'Full-Stack Web Development',
      badge: 'Most Popular',
      desc: 'End-to-end responsive web applications engineered with React 19, Next.js, Node.js, Express, and MongoDB.',
      pricing: 'From $1,500',
      duration: '1-3 Weeks Delivery',
      skills: ['React 19', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'REST APIs']
    },
    {
      icon: '📱',
      title: 'Mobile App Engineering',
      badge: 'High Demand',
      desc: 'Cross-platform native iOS & Android applications built with React Native and Flutter with real-time sync.',
      pricing: 'From $2,200',
      duration: '2-4 Weeks Delivery',
      skills: ['React Native', 'Flutter', 'iOS & Android', 'Push Notifications', 'Firebase']
    },
    {
      icon: '🤖',
      title: 'AI & Machine Learning Agents',
      badge: 'Trending',
      desc: 'Autonomous LLM agents, custom RAG pipelines, semantic vector search, and automated NLP reasoning workflows.',
      pricing: 'From $2,800',
      duration: '2-3 Weeks Delivery',
      skills: ['Python', 'FastAPI', 'LangChain', 'OpenAI API', 'Pinecone', 'Vector DBs']
    },
    {
      icon: '☁️',
      title: 'Cloud Architecture & DevOps',
      badge: 'Infrastructure',
      desc: 'Containerization, Kubernetes clustering, CI/CD automated deployment, and high-availability cloud architecture.',
      pricing: 'From $1,800',
      duration: '1-2 Weeks Delivery',
      skills: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'GitHub Actions', 'Terraform']
    },
    {
      icon: '🎨',
      title: 'UI/UX Design & Design Systems',
      badge: 'Creative',
      desc: 'Pixel-perfect interactive Figma design systems, accessible component libraries, and slick micro-interactions.',
      pricing: 'From $1,200',
      duration: '1-2 Weeks Delivery',
      skills: ['Figma', 'Design Systems', 'Micro-Interactions', 'Prototyping', 'WCAG A11y']
    },
    {
      icon: '⚡',
      title: 'Database & Performance Tuning',
      badge: 'Specialized',
      desc: 'MongoDB query indexing, schema optimization, Redis memory caching, and database migration with zero downtime.',
      pricing: 'From $1,400',
      duration: '3-7 Days Delivery',
      skills: ['MongoDB Indexing', 'PostgreSQL', 'Redis Caching', 'Query Optimization']
    }
  ];

  return (
    <>
      <div className="page-container">
        <div className="page-header">
          <span className="page-badge">Vetted Technical Capabilities</span>
          <h1 className="page-title">
            Specialized Engineering Services <br />
            <span style={{ color: '#38bdf8' }}>For Every Stage of Your Product</span>
          </h1>
          <p className="page-desc">
            Whether you need a dedicated senior engineer for a fast sprint or a turnkey MVP built from scratch, our verified talent delivers production-grade code.
          </p>
        </div>

        <div className="services-grid">
          {serviceCategories.map((service, idx) => (
            <div key={idx} className="feature-box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div className="feature-icon">{service.icon}</div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '9999px', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
                    {service.badge}
                  </span>
                </div>

                <h3>{service.title}</h3>
                <p style={{ marginBottom: '1.25rem' }}>{service.desc}</p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {service.skills.map((s, sIdx) => (
                    <span key={sIdx} className="tag-skill-chip">{s}</span>
                  ))}
                </div>
              </div>

              <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-code)', fontSize: '1.1rem', fontWeight: 800, color: '#10b981', display: 'block' }}>
                    {service.pricing}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{service.duration}</span>
                </div>

                <Link to="/post-gig" className="btn-gradient-primary" style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem' }}>
                  Hire Now ➔
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: '24px', padding: '3.5rem 2rem', textAlign: 'center', boxShadow: 'var(--shadow-card)' }}>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem', fontWeight: 800 }}>Need a Custom Team or Fractional Engineering Pod?</h2>
          <p style={{ color: '#94a3b8', maxWidth: '680px', margin: '0 auto 2.5rem', fontSize: '1.1rem' }}>
            We assemble dedicated sprint pods with guaranteed delivery milestones, direct repository access, and weekly demo reviews.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/post-gig" className="btn-gradient-primary" style={{ padding: '0.85rem 2.2rem', fontSize: '1.05rem' }}>
              Publish a Project Brief ➔
            </Link>
            <Link to="/contact" className="btn-ghost" style={{ padding: '0.85rem 2.2rem', fontSize: '1.05rem' }}>
              Speak with Advisors
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Services;
