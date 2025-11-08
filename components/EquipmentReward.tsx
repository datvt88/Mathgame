'use client';

import { useState } from 'react';
import { Equipment } from '@/lib/equipment';

interface EquipmentRewardProps {
  equipment: Equipment;
  onClose: () => void;
}

export default function EquipmentReward({ equipment, onClose }: EquipmentRewardProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`equipment-reward-overlay ${isVisible ? 'visible' : ''}`}>
      <div className="equipment-reward-card">
        <h2 className="equipment-reward-title">🎉 Phần Thưởng Mới! 🎉</h2>

        <div
          className="equipment-reward-emoji"
          style={{
            background: `linear-gradient(135deg, ${equipment.color}33, ${equipment.color}99)`,
          }}
        >
          {equipment.emoji}
        </div>

        <h3 className="equipment-reward-name">{equipment.name}</h3>
        <p className="equipment-reward-description">{equipment.description}</p>

        <div className="equipment-reward-slot">
          Loại: {getSlotName(equipment.slot)}
        </div>

        <button className="equipment-reward-button" onClick={handleClose}>
          Tuyệt Vời! ✨
        </button>
      </div>
    </div>
  );
}

function getSlotName(slot: string): string {
  const names: Record<string, string> = {
    hat: 'Mũ',
    glasses: 'Kính',
    accessory: 'Phụ Kiện',
    tool: 'Công Cụ',
  };
  return names[slot] || slot;
}
