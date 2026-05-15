import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // clear previous errors
    
    try {
      // Send credentials securely to the Python backend
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAuth(true);
        navigate('/software'); // Redirect to software page upon successful login
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('Failed to connect to the backend server.');
    }
  };

  return (
    <section className="container">
      <div className="hero-content login-card">
        <h1>Secure Login</h1>
        <p>Please enter your credentials to access IT resources.</p>
        
        {error && <div className="error-message">{error}</div>}
        
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
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="cta-btn login-btn">Login</button>
        </form>
      </div>
    </section>
  );
}

export default Login;