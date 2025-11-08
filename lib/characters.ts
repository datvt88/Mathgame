export interface Character {
  id: number;
  name: string;
  emoji: string;
  description: string;
  color: string;
}

export const CHARACTERS: Character[] = [
  {
    id: 1,
    name: 'Bé Pikachu',
    emoji: '⚡',
    description: 'Nhanh nhẹn và thông minh',
    color: '#FFD700',
  },
  {
    id: 2,
    name: 'Bé Charmander',
    emoji: '🔥',
    description: 'Nhiệt huyết và dũng cảm',
    color: '#FF6347',
  },
  {
    id: 3,
    name: 'Bé Squirtle',
    emoji: '💧',
    description: 'Bình tĩnh và sáng tạo',
    color: '#1E90FF',
  },
  {
    id: 4,
    name: 'Bé Bulbasaur',
    emoji: '🌱',
    description: 'Kiên nhẫn và chu đáo',
    color: '#32CD32',
  },
  {
    id: 5,
    name: 'Bé Eevee',
    emoji: '🦊',
    description: 'Năng động và linh hoạt',
    color: '#D2691E',
  },
  {
    id: 6,
    name: 'Bé Jigglypuff',
    emoji: '🎵',
    description: 'Vui vẻ và yêu âm nhạc',
    color: '#FFB6C1',
  },
];

export function getCharacterById(id: number): Character | undefined {
  return CHARACTERS.find(c => c.id === id);
}
