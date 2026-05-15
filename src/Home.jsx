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
    <section className="container">
      <div className="hero-content">
        <h1 className="gradient-text">Welcome to IT Space</h1>
        <p>Your ultimate destination for software, documentation, and IT resources. Everything you need, centralized in one place.</p>
        <Link to="/software" className="cta-btn">Browse Downloads</Link>
        
        <div style={{ marginTop: '2rem', textAlign: 'left' }}>
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