import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>🎯 Math Treasure Hunt</h1>
      <p>Welcome! Solve math problems and collect treasure coins!</p>
      <button onClick={() => navigate('/game')}>Start Game</button>
    </div>
  );
}

export default Home;