'use client';

import { Pokemon } from '@/lib/pokemon';
import { useState } from 'react';

interface PokemonRewardProps {
  pokemon: Pokemon[];
  onContinue: () => void;
}

export default function PokemonReward({ pokemon, onContinue }: PokemonRewardProps) {
  const [openedBags, setOpenedBags] = useState<number[]>([]);

  const openBag = (index: number) => {
    if (!openedBags.includes(index)) {
      setOpenedBags([...openedBags, index]);
    }
  };

  const allOpened = openedBags.length === pokemon.length;

  return (
    <div className="question-container">
      <h2 className="result-message">
        🎉 Chúc mừng! Bạn nhận được {pokemon.length} túi bí ẩn!
      </h2>

      <p style={{ textAlign: 'center', fontSize: '1.2em', color: '#666', marginBottom: '30px' }}>
        Nhấn vào từng túi để mở và nhận Pokemon! 🎁
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', margin: '40px 0' }}>
        {pokemon.map((poke, index) => (
          <div key={index}>
            {!openedBags.includes(index) ? (
              <div
                className="mystery-bag"
                onClick={() => openBag(index)}
              >
                🎁
              </div>
            ) : (
              <div className="pokemon-card">
                <div className="pokemon-image">{poke.emoji}</div>
                <div className="pokemon-name">{poke.name}</div>
                <div className={`pokemon-rarity rarity-${poke.rarity}`}>
                  {poke.rarity.toUpperCase()}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {allOpened && (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button className="button" onClick={onContinue}>
            Chơi Lại 🔄
          </button>
        </div>
      )}
    </div>
  );
}
