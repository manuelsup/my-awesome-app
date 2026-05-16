import React, { useState, useEffect } from 'react';
import { supabase } from './utils/supabase';

function Software() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.card')) {
        setExpandedId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchSoftware = async () => {
      const { data, error } = await supabase.from('software').select('*').order('name', { ascending: true });
      if (error) {
        console.error("Error fetching software", error);
        setError("Could not load software. Please make sure the 'software' table exists in Supabase.");
      } else if (data) {
        setDownloads(data);
      }
      setLoading(false);
    };
    fetchSoftware();
  }, []);

  // Filter downloads based on search term
  const filteredDownloads = downloads.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="container animate-fade-in" style={{ position: 'relative' }}>
      <div className="animate-slide-up" style={{ textAlign: 'center', marginBottom: '40px', animationDelay: '0.1s' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Downloads</h1>
        <p>Select a file below to start downloading.</p>
      </div>

      <div className="animate-slide-up" style={{ position: 'relative', width: '100%', maxWidth: '450px', margin: '0 auto 40px', animationDelay: '0.2s' }}>
        <svg style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', zIndex: 1 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Search for software..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Background Overlay for expanded card */}
      {expandedId && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)', zIndex: 50, transition: 'opacity 0.3s' }}
          onClick={() => setExpandedId(null)}
        />
      )}

      <div className="downloads-list">
        {filteredDownloads.length > 0 ? (
          filteredDownloads.map((file, index) => (
            <div 
              key={file.id}
              className="animate-slide-up"
              style={{
                position: expandedId === file.id ? 'relative' : 'static',
                zIndex: expandedId === file.id ? 100 : 1,
                animationDelay: `${0.2 + (index * 0.05)}s`
              }}
            >
              <div 
                className="card" 
                onClick={() => toggleExpand(file.id)}
                style={{ 
                  cursor: 'pointer',
                  transform: expandedId === file.id ? 'scale(1.1) translateY(-10px)' : '',
                  boxShadow: expandedId === file.id ? 'var(--shadow-glow)' : '',
                }}
              >
                <img 
                  src={file.icon} 
                  alt={`${file.name} logo`} 
                  style={{ width: '64px', height: '64px', padding: '10px', backgroundColor: 'var(--bg)', borderRadius: '16px', objectFit: 'contain', marginBottom: '16px' }} 
                  onError={(e) => { e.target.src = 'https://www.google.com/s2/favicons?domain=example.com&sz=128'; }}
                />
                <h2>{file.name}</h2>
                
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text)', backgroundColor: 'var(--code-bg)', padding: '4px 12px', borderRadius: '999px' }}>{file.version}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text)', backgroundColor: 'var(--code-bg)', padding: '4px 12px', borderRadius: '999px' }}>{file.size}</span>
                </div>

                <div style={{ 
                  maxHeight: expandedId === file.id ? '200px' : '0px',
                  opacity: expandedId === file.id ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease-in-out',
                  marginTop: expandedId === file.id ? '8px' : '0px',
                  marginBottom: expandedId === file.id ? '15px' : '0px',
                  color: 'var(--text)', 
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }}>
                  <p style={{ margin: 0 }}>{file.description}</p>
                </div>
                <a href={file.link} download target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ width: '100%', textDecoration: 'none' }}>
                  <button className="download-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    Download
                  </button>
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No downloads found matching "{searchTerm}".</p>
        )}
      </div>
    </section>
  );
}

export default Software;