'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CharacterSelect from '@/components/CharacterSelect';
import { Character } from '@/lib/characters';

export default function Home() {
  const router = useRouter();
  const [showCharacterSelect, setShowCharacterSelect] = useState(false);

  const handleCharacterSelect = (character: Character) => {
    // Save selected character to sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedCharacter', JSON.stringify(character));
    }
    // Navigate to game
    router.push('/game');
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
          onClick={() => setShowCharacterSelect(true)}
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
          <li>Trả lời 5 câu hỏi toán học</li>
          <li>Mỗi câu đúng sẽ nhận được trang bị mới!</li>
          <li>Cuối game, nhận Pokemon theo số câu đúng</li>
        </ol>
      </div>
    </div>
  );
}
