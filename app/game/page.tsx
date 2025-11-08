'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { generateQuestions, Question } from '@/lib/gameLogic';
import { getPokemonsByScore, Pokemon } from '@/lib/pokemon';
import QuestionCard from '@/components/QuestionCard';
import PokemonReward from '@/components/PokemonReward';

export default function GamePage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [earnedPokemon, setEarnedPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    // Generate 5 questions when component mounts
    setQuestions(generateQuestions(5));
  }, []);

  const handleAnswer = (answer: string | number) => {
    if (showFeedback) return; // Prevent multiple submissions

    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
    }

    // Auto advance after 1.5 seconds
    setTimeout(() => {
      handleNext();
    }, 1500);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Game finished
      const pokemon = getPokemonsByScore(score + (isCorrect ? 1 : 0), questions.length);
      setEarnedPokemon(pokemon);
      setGameFinished(true);
    }
  };

  const handleRestart = () => {
    router.push('/');
  };

  if (questions.length === 0) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', fontSize: '2em' }}>
          Đang tải... ⏳
        </div>
      </div>
    );
  }

  if (gameFinished) {
    return (
      <div className="container">
        <h1 className="title">🎊 Kết Quả</h1>
        <div className="score-display">
          Điểm của bạn: {score}/{questions.length}
        </div>

        <PokemonReward pokemon={earnedPokemon} onContinue={handleRestart} />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="container">
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#667eea' }}>
            Câu {currentQuestionIndex + 1}/{questions.length}
          </span>
          <span style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#764ba2' }}>
            Điểm: {score}
          </span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <QuestionCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        selectedAnswer={selectedAnswer}
      />

      {showFeedback && (
        <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? '✅ Chính xác! Tuyệt vời!' : '❌ Sai rồi. Đáp án đúng là: ' + currentQuestion.correctAnswer}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          className="button"
          onClick={handleRestart}
          style={{ background: '#95a5a6' }}
        >
          Về Trang Chủ 🏠
        </button>
      </div>
    </div>
  );
}
