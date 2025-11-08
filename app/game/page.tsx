'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { generateQuestions, Question } from '@/lib/gameLogic';
import { getPokemonsByScore, Pokemon } from '@/lib/pokemon';
import { Character, CHARACTERS } from '@/lib/characters';
import { Equipment, PlayerEquipment, getRandomEquipment } from '@/lib/equipment';
import QuestionCard from '@/components/QuestionCard';
import PokemonReward from '@/components/PokemonReward';
import CharacterDisplay from '@/components/CharacterDisplay';
import getSoundManager from '@/lib/soundManager';

export default function GamePage() {
  const router = useRouter();
  const [character, setCharacter] = useState<Character | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [earnedPokemon, setEarnedPokemon] = useState<Pokemon[]>([]);
  const [equipment, setEquipment] = useState<PlayerEquipment>({});
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Load selected character from sessionStorage
    if (typeof window !== 'undefined') {
      const savedCharacter = sessionStorage.getItem('selectedCharacter');
      if (savedCharacter) {
        setCharacter(JSON.parse(savedCharacter));
      } else {
        // If no character selected, use default (Pikachu)
        setCharacter(CHARACTERS[0]);
      }

      // Load mute state
      const savedMute = localStorage.getItem('isMuted');
      if (savedMute) {
        const muted = savedMute === 'true';
        setIsMuted(muted);
        getSoundManager().setMuted(muted);
      }
    }

    // Generate 10 questions when component mounts
    setQuestions(generateQuestions(10));
  }, []);

  const handleAnswer = (answer: string | number) => {
    if (showFeedback) return; // Prevent multiple submissions

    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Play sound
    const soundManager = getSoundManager();
    if (correct) {
      soundManager.playCorrect();
      setScore(score + 1);
    } else {
      soundManager.playIncorrect();
    }

    // Auto advance after 1.5 seconds (no popup between questions)
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
      // Game finished - calculate final score and award equipment based on score
      const finalScore = score + (isCorrect ? 1 : 0);
      const pokemon = getPokemonsByScore(finalScore, questions.length);
      setEarnedPokemon(pokemon);

      // Award equipment based on correct answers
      const earnedEquipment: PlayerEquipment = {};
      const numEquipment = Math.min(finalScore, 4); // Max 4 equipment items (one per slot)

      for (let i = 0; i < numEquipment; i++) {
        const item = getRandomEquipment();
        // Ensure we don't overwrite existing slots with the same type
        if (!earnedEquipment[item.slot]) {
          earnedEquipment[item.slot] = item;
        }
      }

      setEquipment(earnedEquipment);
      setGameFinished(true);

      // Play level complete sound
      setTimeout(() => {
        getSoundManager().playLevelComplete();
      }, 300);
    }
  };

  const handleRestart = () => {
    getSoundManager().playClick();
    router.push('/');
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    getSoundManager().setMuted(newMuted);

    if (typeof window !== 'undefined') {
      localStorage.setItem('isMuted', newMuted.toString());
    }
  };

  if (!character || questions.length === 0) {
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

        {/* Show character with all earned equipment */}
        <CharacterDisplay character={character} equipment={equipment} score={score} />

        <div className="score-display">
          Điểm của bạn: {score}/{questions.length}
        </div>

        {score === questions.length && (
          <div style={{ textAlign: 'center', fontSize: '1.5em', color: '#f39c12', margin: '20px 0', fontWeight: 'bold' }}>
            🏆 Hoàn Hảo! Bạn thật xuất sắc! 🏆
          </div>
        )}

        {score >= questions.length * 0.8 && score < questions.length && (
          <div style={{ textAlign: 'center', fontSize: '1.3em', color: '#27ae60', margin: '20px 0', fontWeight: 'bold' }}>
            ⭐ Tuyệt vời! Bạn làm rất tốt! ⭐
          </div>
        )}

        <PokemonReward pokemon={earnedPokemon} onContinue={handleRestart} />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="container">
      {/* Mute button */}
      <button
        className="mute-button"
        onClick={toggleMute}
        title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      {/* Character display at top */}
      <CharacterDisplay character={character} equipment={equipment} />

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
