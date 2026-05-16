import React, { useState } from 'react'
import { HashRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Software from './Software'
import Login from './Login'

import Admin from './Admin'

// A wrapper component that redirects users to /login if they aren't authenticated
function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  // State to track if the user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
  <Router>
    <div className="app">
      <nav className="navbar">
        <div className="navbar-brand">IT Space</div>
        <div className="navbar-links">
          <NavLink to="/">Home</NavLink>
          {/* Only show secure links if logged in */}
          {isAuthenticated && (
            <>
              <NavLink to="/software">Software</NavLink>
              <NavLink to="/admin">Admin</NavLink>
            </>
          )}
          
          {isAuthenticated ? (
            <a href="#logout" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</a>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </div>
      </nav>
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
          <Route path="/software" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Software /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Admin /></ProtectedRoute>} />
          {/* Catch-all route: Automatically redirects any unknown URL to the Home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} IT Space. All rights reserved.</p>
      </footer>
    </div>
  </Router>
)

}

export default App
