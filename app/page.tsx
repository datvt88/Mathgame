'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="container">
      <h1 className="title">🎮 Pokemon Math Game</h1>
      <p className="subtitle">
        Giải các bài toán và nhận Pokemon từ túi bí ẩn! 🎁
      </p>

      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <div style={{ fontSize: '6em', margin: '20px 0' }}>
          ⚡🔥💧🌱
        </div>
        <p style={{ fontSize: '1.2em', color: '#666', marginBottom: '30px' }}>
          ✨ Đoán hình tiếp theo trong chuỗi<br />
          ✨ Đếm và tính toán với hình ảnh<br />
          ✨ Bóc túi bí ẩn nhận Pokemon quý hiếm
        </p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          className="button"
          onClick={() => router.push('/game')}
        >
          Bắt Đầu Chơi 🚀
        </button>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center', color: '#999', fontSize: '0.9em' }}>
        <p>🎯 Dành cho học sinh Lớp 1</p>
        <p>💡 5 câu hỏi mỗi lượt chơi</p>
      </div>
    </div>
  );
}
