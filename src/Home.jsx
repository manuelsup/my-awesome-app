import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './utils/supabase';

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      const { data: todos } = await supabase.from('todos').select();
      if (todos) {
        setTodos(todos);
      }
    }
    getTodos();
  }, []);

  return (
    <section className="container animate-fade-in">
      <div className="hero-content animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h1 className="gradient-text">Welcome to IT Space</h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text)' }}>Your ultimate destination for software, documentation, and IT resources. Everything you need, centralized in one place.</p>
        <Link to="/software" className="cta-btn">Browse Downloads</Link>
        
        <div style={{ marginTop: '2.5rem', textAlign: 'left', padding: '1.5rem', background: 'var(--bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h2>Todos</h2>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Home;