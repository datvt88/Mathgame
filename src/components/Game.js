import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function generateQuestions() {
  const questions = [];
  for (let i = 0; i < 5; i++) {
    const a = Math.floor(Math.random() * 11) + 1;
    const b = Math.floor(Math.random() * 11) + 1;
    const isAddition = Math.random() > 0.5;
    const question = isAddition ? `${a} + ${b}` : `${a + b} - ${b}`;
    const answer = isAddition ? a + b : a;
    questions.push({ question, answer });
  }
  return questions;
}

function Game() {
  const [questions] = useState(generateQuestions());
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (parseInt(input) === questions[current].answer) {
      setScore(score + 1);
    }
    if (current < 4) {
      setCurrent(current + 1);
      setInput('');
    } else {
      navigate('/result', { state: { score } });
    }
  };

  return (
    <div className="container">
      <h2>Question {current + 1}</h2>
      <p>{questions[current].question}</p>
      <input type="number" value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Game;