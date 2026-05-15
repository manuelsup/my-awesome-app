import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="container">
      <div className="hero-content">
        <h1 className="gradient-text">Welcome to IT Space</h1>
        <p>Your ultimate destination for software, documentation, and IT resources. Everything you need, centralized in one place.</p>
        <Link to="/software" className="cta-btn">Browse Downloads</Link>
      </div>
    </section>
  );
}

export default Home;