import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const updates = [
    { 
      id: 1, 
      date: 'Today', 
      title: 'Routing & Home Page', 
      description: 'Configured the routing so that the Home page is the default landing page when you first visit the site.' 
    },
    { 
      id: 2, 
      date: 'Today', 
      title: 'UI Tweaks & Bug Fixes', 
      description: 'Fixed the search bar alignment on the software page and resolved the card expansion stacking issue.' 
    },
    { 
      id: 3, 
      date: 'Today', 
      title: 'Guest Access Added', 
      description: 'Added a "Continue as Guest" button to quickly browse without an account.' 
    },
    { 
      id: 4, 
      date: 'Today', 
      title: 'Complete UI Overhaul', 
      description: 'Introduced a new glassmorphism design, Outfit typography, and dynamic hover animations across all pages.' 
    },
    { 
      id: 5, 
      date: 'Yesterday', 
      title: 'Software Catalog Launched', 
      description: 'Launched the searchable software downloads page with an expanding card interface for detailed app descriptions.' 
    }
  ];

  return (
    <section className="container animate-fade-in">
      <div className="hero-content animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h1 className="gradient-text">Welcome to IT Space</h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text)' }}>Your ultimate destination for software, documentation, and IT resources. Everything you need, centralized in one place.</p>
        <Link to="/software" className="cta-btn">Browse Downloads</Link>
        
        <div style={{ marginTop: '3rem', textAlign: 'left', padding: '1.5rem', background: 'var(--bg)', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Recent Updates
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {updates.map((update, index) => (
              <div key={update.id} style={{ paddingBottom: index !== updates.length - 1 ? '1.25rem' : '0', borderBottom: index !== updates.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-h)', fontWeight: '600' }}>{update.title}</h3>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text)', backgroundColor: 'var(--code-bg)', padding: '4px 10px', borderRadius: '999px', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {update.date}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text)', lineHeight: '1.5' }}>{update.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;