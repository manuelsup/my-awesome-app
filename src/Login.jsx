import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setAuth }) {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(''); // For successful signup messages
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    setAuth(true);
    navigate('/software');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // clear previous errors
    setSuccess('');
    
    try {
      // Update these URLs to point to your new live Render backend!
      // Make sure to replace YOUR-RENDER-URL.onrender.com with your actual Render web address
      const baseUrl = 'https://my-awesome-app-1.onrender.com';
      const endpoint = isLogin ? `${baseUrl}/api/login` : `${baseUrl}/api/signup`;

      // Send credentials securely to the Python backend
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (isLogin) {
          setAuth(true);
          navigate('/software'); // Redirect to software page upon successful login
        } else {
          // On successful signup, switch back to login mode so they can sign in
          setSuccess('Account created successfully! Please log in.');
          setIsLogin(true);
          setPassword(''); // Clear the password field
        }
      } else {
        setError(data.message || (isLogin ? 'Invalid username or password' : 'Failed to create account'));
      }
    } catch (err) {
      setError('Failed to connect to the backend server.');
    }
  };

  return (
    <section className="container animate-fade-in">
      <div className="login-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h1 style={{ marginBottom: '0.5rem', lineHeight: '1.2' }}>{isLogin ? 'Secure Login' : 'Create an Account'}</h1>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.5', color: 'var(--text)' }}>
          {isLogin 
            ? 'Please enter your credentials to access IT resources.' 
            : 'Sign up to get access to internal tools and resources.'}
        </p>
        
        {error && <div className="error-message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          {error}
        </div>}
        {success && <div className="success-message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          {success}
        </div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ margin: 0 }}>Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: '0.85rem', cursor: 'pointer', padding: 0, fontWeight: 'bold' }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="cta-btn login-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
          
          <button 
            type="button" 
            onClick={handleGuestLogin}
            style={{ 
              width: '100%', 
              marginTop: '10px', 
              padding: '14px',
              background: 'var(--bg)', 
              color: 'var(--text-h)', 
              border: '1px solid var(--border)',
              borderRadius: '10px',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--code-bg)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            Continue as Guest
          </button>
          
          <p 
            style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text)', cursor: 'pointer', textAlign: 'center', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.target.style.color = 'var(--accent)'}
            onMouseOut={(e) => e.target.style.color = 'var(--text)'}
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setSuccess('');
            }}
          >
            {isLogin 
              ? "Don't have an account? Sign up here." 
              : "Already have an account? Log in here."}
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;