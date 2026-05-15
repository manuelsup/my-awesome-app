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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // clear previous errors
    setSuccess('');
    
    try {
      // Choose the endpoint based on whether we are logging in or signing up
      const endpoint = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/signup';

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
    <section className="container">
      <div className="hero-content login-card">
        <h1 style={{ marginBottom: '0.5rem', lineHeight: '1.2' }}>{isLogin ? 'Secure Login' : 'Create an Account'}</h1>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.5' }}>
          {isLogin 
            ? 'Please enter your credentials to access IT resources.' 
            : 'Sign up to get access to internal tools and resources.'}
        </p>
        
        {error && <div className="error-message" style={{ color: '#ef4444', marginBottom: '1rem', fontWeight: 'bold' }}>{error}</div>}
        {success && <div className="success-message" style={{ color: '#22c55e', marginBottom: '1rem', fontWeight: 'bold' }}>{success}</div>}
        
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
                style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.85rem', cursor: 'pointer', padding: 0, fontWeight: 'bold' }}
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
          
          <p 
            style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#64748b', cursor: 'pointer' }}
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