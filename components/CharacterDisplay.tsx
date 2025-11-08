'use client';

import { Character } from '@/lib/characters';
import { PlayerEquipment } from '@/lib/equipment';

interface CharacterDisplayProps {
  character: Character;
  equipment: PlayerEquipment;
  score?: number;
}

export default function CharacterDisplay({ character, equipment, score }: CharacterDisplayProps) {
  return (
    <div className="character-display">
      <div
        className="character-avatar"
        style={{
          background: `linear-gradient(135deg, ${character.color}33, ${character.color}99)`,
          borderColor: character.color,
        }}
      >
        <div className="character-main-emoji">{character.emoji}</div>

        {/* Hat */}
        {equipment.hat && (
          <div className="equipment-slot equipment-hat" title={equipment.hat.name}>
            {equipment.hat.emoji}
          </div>
        )}

        {/* Glasses */}
        {equipment.glasses && (
          <div className="equipment-slot equipment-glasses" title={equipment.glasses.name}>
            {equipment.glasses.emoji}
          </div>
        )}

        {/* Accessory */}
        {equipment.accessory && (
          <div className="equipment-slot equipment-accessory" title={equipment.accessory.name}>
            {equipment.accessory.emoji}
          </div>
        )}

        {/* Tool */}
        {equipment.tool && (
          <div className="equipment-slot equipment-tool" title={equipment.tool.name}>
            {equipment.tool.emoji}
          </div>
        )}
      </div>

      <div className="character-info">
        <h3 className="character-name-display">{character.name}</h3>
        {score !== undefined && (
          <div className="character-score">
            Điểm: {score} ⭐
          </div>
        )}
      </div>
    </div>
  );
}
