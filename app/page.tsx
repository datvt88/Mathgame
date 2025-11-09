'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CHARACTERS } from '@/lib/characters';
import getSoundManager from '@/lib/soundManager';

export default function Home() {
  const router = useRouter();
  const [showDifficultySelect, setShowDifficultySelect] = useState(false);

  const handleStartClick = () => {
    getSoundManager().playClick();
    setShowDifficultySelect(true);
  };

  const handleDifficultySelect = (difficulty: 'easy' | 'hard') => {
    getSoundManager().playClick();

    // Auto-assign default character (Pikachu) and save difficulty
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedCharacter', JSON.stringify(CHARACTERS[0]));
      sessionStorage.setItem('selectedDifficulty', difficulty);
    }

    // Navigate directly to game
    router.push('/game');
  };

  if (showDifficultySelect) {
    return (
      <div className="container">
        <h1 className="title">📊 Chọn Độ Khó</h1>
        <p className="subtitle" style={{ marginBottom: '40px' }}>
          Hãy chọn mức độ phù hợp với bạn!
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          {/* Easy Mode */}
          <div
            onClick={() => handleDifficultySelect('easy')}
            style={{
              background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
              padding: '30px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{ textAlign: 'center', fontSize: '4em', marginBottom: '15px' }}>😊</div>
            <h2 style={{ textAlign: 'center', color: '#2c3e50', fontSize: '1.8em', marginBottom: '10px' }}>DỄ</h2>
            <ul style={{ color: '#34495e', fontSize: '1.1em', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Số từ 1-10</li>
              <li>Phép tính đơn giản</li>
              <li>Thời gian thoải mái</li>
              <li>Phù hợp mới bắt đầu</li>
            </ul>
          </div>

          {/* Hard Mode */}
          <div
            onClick={() => handleDifficultySelect('hard')}
            style={{
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              padding: '30px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{ textAlign: 'center', fontSize: '4em', marginBottom: '15px' }}>🔥</div>
            <h2 style={{ textAlign: 'center', color: '#2c3e50', fontSize: '1.8em', marginBottom: '10px' }}>KHÓ</h2>
            <ul style={{ color: '#34495e', fontSize: '1.1em', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Số từ 1-20</li>
              <li>Bài toán phức tạp hơn</li>
              <li>Thử thách trí tuệ</li>
              <li>Cho bạn giỏi toán</li>
            </ul>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            className="button"
            onClick={() => setShowDifficultySelect(false)}
            style={{ background: '#95a5a6' }}
          >
            ← Quay Lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">🎮 Game Toán Pokemon</h1>
      <p className="subtitle">
        Học toán vui vẻ cùng Pokemon! 🌟
      </p>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <p style={{ fontSize: '1.5em', marginBottom: '20px', color: '#333' }}>
          Trả lời đúng câu hỏi để nhận trang bị cho nhân vật của bạn! 🎁
        </p>
        <p style={{ fontSize: '1.2em', marginBottom: '40px', color: '#666' }}>
          Dành cho học sinh Lớp 1 📚
        </p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          className="button"
          onClick={handleStartClick}
        >
          Bắt Đầu Chơi 🚀
        </button>
      </div>

      <div style={{ marginTop: '50px', padding: '20px', background: '#f8f9fa', borderRadius: '15px' }}>
        <h3 style={{ color: '#667eea', marginBottom: '15px', textAlign: 'center' }}>
          📖 Cách Chơi
        </h3>
        <ol style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', paddingLeft: '30px' }}>
          <li>Chọn độ khó phù hợp với bạn</li>
          <li>Trả lời 10 câu hỏi toán học</li>
          <li>Sau khi hoàn thành, nhận trang bị dựa trên số câu đúng!</li>
          <li>Càng nhiều câu đúng, càng nhiều trang bị và Pokemon!</li>
          <li>Nhận đánh giá từ AI Giáo viên khi hoàn thành!</li>
        </ol>
      </div>

      <div style={{ marginTop: '30px', padding: '15px', background: '#e8f4f8', borderRadius: '15px', border: '2px solid #667eea' }}>
        <h3 style={{ color: '#667eea', marginBottom: '10px', textAlign: 'center', fontSize: '1.2em' }}>
          🎯 Các Dạng Bài Toán
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', fontSize: '1em', color: '#333' }}>
          <div style={{ textAlign: 'center', padding: '10px' }}>🔄 Tìm quy luật</div>
          <div style={{ textAlign: 'center', padding: '10px' }}>➕ Phép cộng</div>
          <div style={{ textAlign: 'center', padding: '10px' }}>➖ Phép trừ</div>
          <div style={{ textAlign: 'center', padding: '10px' }}>🔢 Đếm số</div>
          <div style={{ textAlign: 'center', padding: '10px' }}>⚖️ So sánh</div>
          <div style={{ textAlign: 'center', padding: '10px' }}>❓ Số thiếu</div>
        </div>
      </div>
    </div>
  );
}
