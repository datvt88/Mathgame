export type PokemonRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface Pokemon {
  id: number;
  name: string;
  emoji: string;
  rarity: PokemonRarity;
  color: string;
}

export const POKEMON_LIST: Pokemon[] = [
  // Common (50% chance)
  { id: 1, name: 'Pikachu', emoji: '⚡', rarity: 'common', color: '#FFD700' },
  { id: 2, name: 'Charmander', emoji: '🔥', rarity: 'common', color: '#FF6347' },
  { id: 3, name: 'Squirtle', emoji: '💧', rarity: 'common', color: '#1E90FF' },
  { id: 4, name: 'Bulbasaur', emoji: '🌱', rarity: 'common', color: '#32CD32' },
  { id: 5, name: 'Eevee', emoji: '🦊', rarity: 'common', color: '#D2691E' },
  { id: 6, name: 'Jigglypuff', emoji: '🎵', rarity: 'common', color: '#FFB6C1' },

  // Uncommon (25% chance)
  { id: 7, name: 'Psyduck', emoji: '🦆', rarity: 'uncommon', color: '#FFD700' },
  { id: 8, name: 'Snorlax', emoji: '😴', rarity: 'uncommon', color: '#4682B4' },
  { id: 9, name: 'Meowth', emoji: '🐱', rarity: 'uncommon', color: '#F4E4C1' },
  { id: 10, name: 'Pidgey', emoji: '🐦', rarity: 'uncommon', color: '#8B4513' },

  // Rare (15% chance)
  { id: 11, name: 'Lapras', emoji: '🌊', rarity: 'rare', color: '#4169E1' },
  { id: 12, name: 'Dragonite', emoji: '🐉', rarity: 'rare', color: '#FF8C00' },
  { id: 13, name: 'Gengar', emoji: '👻', rarity: 'rare', color: '#9370DB' },

  // Epic (7% chance)
  { id: 14, name: 'Charizard', emoji: '🔥🐲', rarity: 'epic', color: '#DC143C' },
  { id: 15, name: 'Gyarados', emoji: '🐍', rarity: 'epic', color: '#4169E1' },

  // Legendary (3% chance)
  { id: 16, name: 'Mewtwo', emoji: '💜', rarity: 'legendary', color: '#8B008B' },
  { id: 17, name: 'Lugia', emoji: '🕊️', rarity: 'legendary', color: '#B0C4DE' },
  { id: 18, name: 'Ho-Oh', emoji: '🦅', rarity: 'legendary', color: '#FFD700' },
];

const RARITY_WEIGHTS: Record<PokemonRarity, number> = {
  common: 50,
  uncommon: 25,
  rare: 15,
  epic: 7,
  legendary: 3,
};

export function getRandomPokemon(): Pokemon {
  const random = Math.random() * 100;
  let cumulative = 0;

  // Loop from common to legendary for correct probability distribution
  for (const rarity of ['common', 'uncommon', 'rare', 'epic', 'legendary'] as PokemonRarity[]) {
    cumulative += RARITY_WEIGHTS[rarity];
    if (random < cumulative) {
      const pokemonOfRarity = POKEMON_LIST.filter(p => p.rarity === rarity);
      return pokemonOfRarity[Math.floor(Math.random() * pokemonOfRarity.length)];
    }
  }

  return POKEMON_LIST[0]; // Fallback
}

export function getPokemonsByScore(score: number, total: number): Pokemon[] {
  const percentage = (score / total) * 100;
  let count = 0;

  if (percentage === 100) {
    count = 5; // Perfect score
  } else if (percentage >= 80) {
    count = 4; // Great
  } else if (percentage >= 60) {
    count = 3; // Good
  } else if (percentage >= 40) {
    count = 2; // Okay
  } else {
    count = 1; // Try again
  }

  const pokemon: Pokemon[] = [];
  for (let i = 0; i < count; i++) {
    pokemon.push(getRandomPokemon());
  }

  return pokemon;
}
