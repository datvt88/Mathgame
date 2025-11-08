'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CharacterSelect from '@/components/CharacterSelect';
import { Character } from '@/lib/characters';
import getSoundManager from '@/lib/soundManager';

export default function Home() {
  const router = useRouter();
  const [showCharacterSelect, setShowCharacterSelect] = useState(false);

  const handleCharacterSelect = (character: Character) => {
    // Play select sound
    getSoundManager().playSelect();

    // Save selected character to sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedCharacter', JSON.stringify(character));
    }
    // Navigate to game
    router.push('/game');
  };

  const handleStartClick = () => {
    getSoundManager().playClick();
    setShowCharacterSelect(true);
  };

  if (showCharacterSelect) {
    return (
      <div className="container">
        <CharacterSelect onSelect={handleCharacterSelect} />
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
          <li>Chọn nhân vật yêu thích của bạn</li>
          <li>Trả lời 10 câu hỏi toán học</li>
          <li>Sau khi hoàn thành, nhận trang bị dựa trên số câu đúng!</li>
          <li>Càng nhiều câu đúng, càng nhiều trang bị và Pokemon!</li>
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
