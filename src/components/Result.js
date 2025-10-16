import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const score = state?.score || 0;

  let message = 'Try again, brave explorer!';
  if (score === 5) message = '🏆 You found the Golden Treasure!';
  else if (score >= 3) message = '🥈 You found the Silver Treasure!';
  else if (score >= 1) message = '🥉 You found the Bronze Treasure!';

  return (
    <div className="container">
      <h1>Game Over!</h1>
      <p>You got {score} out of 5 questions right.</p>
      <h2>{message}</h2>
      <button onClick={() => navigate('/')}>Play Again</button>
    </div>
  );
}

export default Result;