'use client';

import { Character, CHARACTERS } from '@/lib/characters';

interface CharacterSelectProps {
  onSelect: (character: Character) => void;
}

export default function CharacterSelect({ onSelect }: CharacterSelectProps) {
  return (
    <div className="character-select-container">
      <h2 className="character-select-title">
        Chọn Nhân Vật Của Bạn! 🎮
      </h2>
      <p className="character-select-subtitle">
        Hãy chọn một người bạn để cùng học toán nhé!
      </p>

      <div className="character-grid">
        {CHARACTERS.map((character) => (
          <button
            key={character.id}
            className="character-card"
            onClick={() => onSelect(character)}
            style={{
              borderColor: character.color,
            }}
          >
            <div
              className="character-emoji"
              style={{
                background: `linear-gradient(135deg, ${character.color}33, ${character.color}66)`,
              }}
            >
              {character.emoji}
            </div>
            <h3 className="character-name">{character.name}</h3>
            <p className="character-description">{character.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
