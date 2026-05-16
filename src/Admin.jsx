import React, { useState, useEffect } from 'react';
import { supabase } from './utils/supabase';

function Admin() {
  const [softwareList, setSoftwareList] = useState([]);
  const [updatesList, setUpdatesList] = useState([]);

  // Software Form State
  const [swName, setSwName] = useState('');
  const [swVersion, setSwVersion] = useState('');
  const [swSize, setSwSize] = useState('');
  const [swLink, setSwLink] = useState('');
  const [swIcon, setSwIcon] = useState('');
  const [swDescription, setSwDescription] = useState('');

  // Update Form State
  const [upDate, setUpDate] = useState('');
  const [upTitle, setUpTitle] = useState('');
  const [upDescription, setUpDescription] = useState('');

  const [message, setMessage] = useState({ text: '', type: '' });

  const fetchData = async () => {
    const { data: sData, error: sErr } = await supabase.from('software').select('*').order('created_at', { ascending: false });
    if (sData) setSoftwareList(sData);
    if (sErr) console.error("Error fetching software", sErr);

    const { data: uData, error: uErr } = await supabase.from('updates').select('*').order('created_at', { ascending: false });
    if (uData) setUpdatesList(uData);
    if (uErr) console.error("Error fetching updates", uErr);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddSoftware = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('software').insert([
      { name: swName, version: swVersion, size: swSize, link: swLink, icon: swIcon, description: swDescription }
    ]);
    if (error) {
      setMessage({ text: 'Error adding software: ' + error.message, type: 'error' });
    } else {
      setMessage({ text: 'Software added successfully!', type: 'success' });
      setSwName(''); setSwVersion(''); setSwSize(''); setSwLink(''); setSwIcon(''); setSwDescription('');
      fetchData();
    }
  };

  const handleAddUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('updates').insert([
      { date: upDate, title: upTitle, description: upDescription }
    ]);
    if (error) {
      setMessage({ text: 'Error adding update: ' + error.message, type: 'error' });
    } else {
      setMessage({ text: 'Update added successfully!', type: 'success' });
      setUpDate(''); setUpTitle(''); setUpDescription('');
      fetchData();
    }
  };

  const handleDeleteSoftware = async (id) => {
    if(!window.confirm("Are you sure you want to delete this software?")) return;
    const { error } = await supabase.from('software').delete().eq('id', id);
    if (!error) fetchData();
  };

  const handleDeleteUpdate = async (id) => {
    if(!window.confirm("Are you sure you want to delete this update?")) return;
    const { error } = await supabase.from('updates').delete().eq('id', id);
    if (!error) fetchData();
  };

  return (
    <section className="container animate-fade-in" style={{ alignItems: 'stretch' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }} className="animate-slide-up">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Admin Dashboard</h1>
        <p>Manage software listings and recent updates directly from the database.</p>
        
        {message.text && (
          <div className={message.type === 'error' ? 'error-message' : 'success-message'} style={{ maxWidth: '600px', margin: '0 auto' }}>
            {message.text}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        
        {/* Software Management */}
        <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Add New Software</h2>
          <form onSubmit={handleAddSoftware} className="login-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" value={swName} onChange={e => setSwName(e.target.value)} required placeholder="e.g. Google Chrome" />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Version</label>
                <input type="text" value={swVersion} onChange={e => setSwVersion(e.target.value)} placeholder="e.g. Latest" />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Size</label>
                <input type="text" value={swSize} onChange={e => setSwSize(e.target.value)} placeholder="e.g. 50 MB" />
              </div>
            </div>
            <div className="form-group">
              <label>Download Link</label>
              <input type="url" value={swLink} onChange={e => setSwLink(e.target.value)} required placeholder="https://..." />
            </div>
            <div className="form-group">
              <label>Icon URL</label>
              <input type="url" value={swIcon} onChange={e => setSwIcon(e.target.value)} required placeholder="https://..." />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={swDescription} onChange={e => setSwDescription(e.target.value)} required style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-h)', minHeight: '80px', boxSizing: 'border-box' }}></textarea>
            </div>
            <button type="submit" className="cta-btn" style={{ width: '100%', marginTop: '0.5rem' }}>Add Software</button>
          </form>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Existing Software</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
            {softwareList.map(sw => (
              <div key={sw.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-h)' }}>{sw.name}</span>
                <button onClick={() => handleDeleteSoftware(sw.id)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>Delete</button>
              </div>
            ))}
            {softwareList.length === 0 && <p style={{ fontSize: '0.9rem' }}>No software found in database.</p>}
          </div>
        </div>

        {/* Updates Management */}
        <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Add New Update</h2>
          <form onSubmit={handleAddUpdate} className="login-form">
            <div className="form-group">
              <label>Date Label</label>
              <input type="text" value={upDate} onChange={e => setUpDate(e.target.value)} required placeholder="e.g. Today or May 15" />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input type="text" value={upTitle} onChange={e => setUpTitle(e.target.value)} required placeholder="e.g. Added Dark Mode" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={upDescription} onChange={e => setUpDescription(e.target.value)} required style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-h)', minHeight: '120px', boxSizing: 'border-box' }}></textarea>
            </div>
            <button type="submit" className="cta-btn" style={{ width: '100%', marginTop: '0.5rem' }}>Post Update</button>
          </form>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Existing Updates</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
            {updatesList.map(up => (
              <div key={up.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-h)' }}>{up.title} <span style={{ color: 'var(--text)', fontSize: '0.8rem' }}>({up.date})</span></span>
                <button onClick={() => handleDeleteUpdate(up.id)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>Delete</button>
              </div>
            ))}
            {updatesList.length === 0 && <p style={{ fontSize: '0.9rem' }}>No updates found in database.</p>}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Admin;
