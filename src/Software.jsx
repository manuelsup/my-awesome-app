import React, { useState, useEffect } from 'react';

function Software() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the click is not inside an element with the class 'card', close the expanded card
      if (!event.target.closest('.card')) {
        setExpandedId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      // Cleanup the event listener when the component unmounts
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const downloads = [
    { id: 1, name: "Google Chrome", version: "Latest", size: "1.5 MB", link: "https://www.google.com/chrome/", icon: "https://www.google.com/s2/favicons?domain=google.com&sz=128", description: "A fast, secure, and free web browser built for the modern web." },
    { id: 2, name: "Microsoft Office", version: "365", size: "Varies", link: "https://www.office.com/", icon: "https://www.google.com/s2/favicons?domain=office.com&sz=128", description: "Productivity software suite including Word, Excel, PowerPoint, and more." },
    { id: 3, name: "Everest System Download ", version: "v2.0", size: "120 MB", link: "https://portal.everestsystem.org/signintool/", icon: "https://www.google.com/s2/favicons?domain=everestsystem.org&sz=128", description: "Internal IT portal and system management tool." },
    { id: 4, name: "Mozilla Firefox", version: "Latest", size: "Varies", link: "https://www.mozilla.org/firefox/new/", icon: "https://www.google.com/s2/favicons?domain=mozilla.org&sz=128", description: "A free and open-source web browser developed by the Mozilla Foundation." },
    { id: 5, name: "Visual Studio Code", version: "Latest", size: "88.5 MB", link: "https://code.visualstudio.com/", icon: "https://www.google.com/s2/favicons?domain=visualstudio.com&sz=128", description: "A powerful, lightweight code editor for developers." },
    { id: 6, name: "VLC Media Player", version: "Latest", size: "40 MB", link: "https://www.videolan.org/vlc/", icon: "https://www.google.com/s2/favicons?domain=videolan.org&sz=128", description: "A free and open-source cross-platform multimedia player." },
    { id: 7, name: "7-Zip", version: "Latest", size: "1.5 MB", link: "https://www.7-zip.org/", icon: "https://www.google.com/s2/favicons?domain=7-zip.org&sz=128", description: "A free file archiver with a high compression ratio." },
    { id: 8, name: "Spotify", version: "Latest", size: "Varies", link: "https://www.spotify.com/download/", icon: "https://www.google.com/s2/favicons?domain=spotify.com&sz=128", description: "Digital music, podcast, and video service." },
    { id: 9, name: "Slack", version: "Latest", size: "Varies", link: "https://slack.com/downloads/", icon: "https://www.google.com/s2/favicons?domain=slack.com&sz=128", description: "Messaging app for business that connects people to the information they need." },
    { id: 10, name: "Zoom", version: "Latest", size: "Varies", link: "https://zoom.us/download", icon: "https://www.google.com/s2/favicons?domain=zoom.us&sz=128", description: "Video conferencing, web conferencing, webinars, and screen sharing." },
    { id: 11, name: "Discord", version: "Latest", size: "Varies", link: "https://discord.com/download", icon: "https://www.google.com/s2/favicons?domain=discord.com&sz=128", description: "Voice, video and text chat app." },
    { id: 12, name: "Bluebook (AP/SAT Testing App)", version: "Latest", size: "Varies", link: "https://bluebook.collegeboard.org/", icon: "https://www.google.com/s2/favicons?domain=collegeboard.org&sz=128", description: "College Board's digital testing application for AP and SAT exams." },
    { id: 13, name: "NWEA Secure Testing Browser", version: "Latest", size: "Varies", link: "https://nwea.force.com/nweaconnection/s/article/Secure-Testing-Browser-Download", icon: "https://www.google.com/s2/favicons?domain=nwea.org&sz=128", description: "Secure browser for MAP Growth assessments." },
    { id: 14, name: "DRC INSIGHT Secure App", version: "Latest", size: "Varies", link: "https://www.drcedirect.com/", icon: "https://www.google.com/s2/favicons?domain=drcedirect.com&sz=128", description: "Secure testing engine for online assessments." },
    { id: 15, name: "TestNav (Pearson)", version: "Latest", size: "Varies", link: "https://download.testnav.com/", icon: "https://www.google.com/s2/favicons?domain=pearson.com&sz=128", description: "Test delivery system used by Pearson for online assessments." },
    { id: 17, name: "i-Ready Connect", version: "Web App", size: "N/A", link: "https://i-readyconnect.com/", icon: "https://www.google.com/s2/favicons?domain=i-ready.com&sz=128", description: "Online assessment and instruction portal." },
    { id: 18, name: "WinRAR", version: "Latest", size: "3.4 MB", link: "https://www.win-rar.com/download.html", icon: "https://www.google.com/s2/favicons?domain=win-rar.com&sz=128", description: "A powerful archive manager and data compression utility." },
    { id: 19, name: "Audacity", version: "Latest", size: "Varies", link: "https://www.audacityteam.org/download/", icon: "https://www.google.com/s2/favicons?domain=audacityteam.org&sz=128", description: "Free, open source, cross-platform audio software for multi-track recording and editing." },
  ];

  // Filter downloads based on search term
  const filteredDownloads = downloads.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="container animate-fade-in" style={{ position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }} className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Downloads</h1>
        <p>Select a file below to start downloading.</p>
      </div>

      <div className="animate-slide-up" style={{ position: 'relative', width: '100%', maxWidth: '450px', margin: '0 auto 40px', animationDelay: '0.2s' }}>
        <svg style={{ position: 'absolute', left: '18px', top: '22px', transform: 'translateY(-50%)', color: '#94a3b8', zIndex: 1 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              className="card animate-slide-up" 
              onClick={() => toggleExpand(file.id)}
              style={{ 
                cursor: 'pointer',
                transform: expandedId === file.id ? 'scale(1.1) translateY(-10px)' : '',
                boxShadow: expandedId === file.id ? 'var(--shadow-glow)' : '',
                zIndex: expandedId === file.id ? 100 : 1,
                position: expandedId === file.id ? 'relative' : 'static',
                animationDelay: `${0.2 + (index * 0.05)}s`
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
          ))
        ) : (
          <p>No downloads found matching "{searchTerm}".</p>
        )}
      </div>
    </section>
  );
}

export default Software;