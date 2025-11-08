'use client';

import { Question } from '@/lib/gameLogic';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string | number) => void;
  selectedAnswer: string | number | null;
}

export default function QuestionCard({ question, onAnswer, selectedAnswer }: QuestionCardProps) {

  if (question.type === 'pattern') {
    return (
      <div className="question-container">
        <h2 className="question-text">{question.question}</h2>

        <div className="pattern-grid">
          {question.pattern?.map((item, index) => (
            <div key={index} className="pattern-item">
              {item}
            </div>
          ))}
          <div className="pattern-item empty">
            ?
          </div>
        </div>

        <div className="answer-options">
          {question.options?.map((option, index) => (
            <button
              key={index}
              className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
              onClick={() => onAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (question.type === 'image-addition' || question.type === 'counting') {
    return (
      <div className="question-container">
        <h2 className="question-text">{question.question}</h2>

        <div className="image-grid">
          {question.images?.map((emoji, index) => (
            <div key={index} className="image-item">
              {emoji}
            </div>
          ))}
        </div>

        <div className="answer-options">
          {question.options?.map((option, index) => (
            <button
              key={index}
              className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
              onClick={() => onAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (question.type === 'image-subtraction') {
    return (
      <div className="question-container">
        <h2 className="question-text">{question.question}</h2>

        <div className="image-grid">
          {question.images?.map((emoji, index) => (
            <div key={index} className="image-item">
              {emoji}
            </div>
          ))}
        </div>

        <div className="answer-options">
          {question.options?.map((option, index) => (
            <button
              key={index}
              className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
              onClick={() => onAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
