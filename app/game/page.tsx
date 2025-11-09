'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { generateQuestions, Question, DifficultyLevel } from '@/lib/gameLogic';
import { getPokemonsByScore, Pokemon } from '@/lib/pokemon';
import { Character, CHARACTERS } from '@/lib/characters';
import { Equipment, PlayerEquipment, getRandomEquipment } from '@/lib/equipment';
import QuestionCard from '@/components/QuestionCard';
import PokemonReward from '@/components/PokemonReward';
import CharacterDisplay from '@/components/CharacterDisplay';
import GeminiStatus from '@/components/GeminiStatus';
import getSoundManager from '@/lib/soundManager';
import { evaluateGameResults, GameResult } from '@/lib/gemini';

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
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [questionTimes, setQuestionTimes] = useState<number[]>([]);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [aiEvaluation, setAiEvaluation] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy');

  useEffect(() => {
    // Load selected character and difficulty from sessionStorage
    if (typeof window !== 'undefined') {
      const savedCharacter = sessionStorage.getItem('selectedCharacter');
      if (savedCharacter) {
        setCharacter(JSON.parse(savedCharacter));
      } else {
        // If no character selected, use default (Pikachu)
        setCharacter(CHARACTERS[0]);
      }

      // Load difficulty
      const savedDifficulty = sessionStorage.getItem('selectedDifficulty') as DifficultyLevel | null;
      if (savedDifficulty === 'easy' || savedDifficulty === 'hard') {
        setDifficulty(savedDifficulty);
      }

      // Load mute state
      const savedMute = localStorage.getItem('isMuted');
      if (savedMute) {
        const muted = savedMute === 'true';
        setIsMuted(muted);
        getSoundManager().setMuted(muted);
      }
    }

    // Generate 10 questions when component mounts (will use the loaded difficulty)
    setQuestions(generateQuestions(10, difficulty));
  }, [difficulty]);

  // Get AI evaluation when game finishes
  useEffect(() => {
    if (gameFinished && totalTime > 0 && !isEvaluating && !aiEvaluation) {
      setIsEvaluating(true);

      const gameResult: GameResult = {
        score,
        totalQuestions: questions.length,
        totalTime,
        questionTimes,
        difficulty,
      };

      evaluateGameResults(gameResult)
        .then(evaluation => {
          setAiEvaluation(evaluation);
          setIsEvaluating(false);
        })
        .catch(error => {
          console.error('Error getting AI evaluation:', error);
          setIsEvaluating(false);
        });
    }
  }, [gameFinished, totalTime, score, questions.length, questionTimes, difficulty, isEvaluating, aiEvaluation]);

  const handleAnswer = (answer: string | number) => {
    if (showFeedback) return; // Prevent multiple submissions

    // Calculate time taken for this question
    const timeSpent = Date.now() - questionStartTime;

    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Save question time
    setQuestionTimes(prev => [...prev, timeSpent]);

    // Play sound
    const soundManager = getSoundManager();
    if (correct) {
      soundManager.playCorrect();
      setScore(prevScore => prevScore + 1);
    } else {
      soundManager.playIncorrect();
    }

    // Auto advance after 1.5 seconds (no popup between questions)
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);

      // Use functional updates to avoid closure issues
      setCurrentQuestionIndex(prevIndex => {
        const nextIndex = prevIndex + 1;

        // Check if this was the last question
        if (nextIndex >= questions.length) {
          // Game finished - calculate final score based on current score state
          setScore(currentScore => {
            // Calculate total time
            setQuestionTimes(allTimes => {
              const total = allTimes.reduce((sum, t) => sum + t, 0) + timeSpent;
              setTotalTime(total);
              return allTimes;
            });

            const pokemon = getPokemonsByScore(currentScore, questions.length);
            setEarnedPokemon(pokemon);

            // Award equipment based on correct answers
            const earnedEquipment: PlayerEquipment = {};
            const numEquipment = Math.min(currentScore, 4); // Max 4 equipment items (one per slot)

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

            return currentScore;
          });

          return prevIndex; // Don't increment since game is finished
        }

        // Reset timer for next question
        setQuestionStartTime(Date.now());
        return nextIndex;
      });
    }, 1500);
  };

  const handleNext = () => {
    // This function is now only used by manual navigation
    setShowFeedback(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
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

        {/* Gemini API Status */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <GeminiStatus />
        </div>

        {/* Show character with all earned equipment */}
        <CharacterDisplay character={character} equipment={equipment} score={score} />

        <div className="score-display">
          Điểm của bạn: {score}/{questions.length}
        </div>

        <div style={{ textAlign: 'center', fontSize: '1.2em', color: '#667eea', margin: '15px 0' }}>
          ⏱️ Thời gian: {Math.floor(totalTime / 1000)}s
        </div>

        <div style={{ textAlign: 'center', fontSize: '1em', color: '#888', margin: '10px 0' }}>
          Trung bình: {Math.floor(totalTime / questions.length / 1000)}s/câu
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

        {/* AI Evaluation */}
        <div style={{
          margin: '30px auto',
          padding: '20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '15px',
          maxWidth: '600px',
          color: 'white',
        }}>
          <h3 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '1.3em' }}>
            🤖 Nhận Xét Từ AI Giáo Viên
          </h3>
          {isEvaluating ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '1.2em', marginBottom: '10px' }}>⏳ Đang phân tích kết quả...</div>
              <div style={{ fontSize: '0.9em', opacity: 0.8 }}>Gemini AI đang đánh giá bài làm của bạn</div>
            </div>
          ) : aiEvaluation ? (
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '15px',
              borderRadius: '10px',
              fontSize: '1.1em',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
            }}>
              {aiEvaluation}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '15px' }}>
              <div style={{ fontSize: '1.1em', marginBottom: '10px' }}>⚠️ Không thể tải nhận xét AI</div>
              <div style={{ fontSize: '0.9em', opacity: 0.8 }}>
                Kiểm tra trạng thái kết nối Gemini AI ở trên
              </div>
            </div>
          )}
        </div>

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
