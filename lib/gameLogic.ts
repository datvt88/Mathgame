export type QuestionType = 'pattern' | 'image-addition' | 'image-subtraction' | 'counting' | 'comparison' | 'missing-number';

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: (string | number)[];
  correctAnswer: string | number;
  images?: string[];
  pattern?: string[];
}

const EMOJIS = {
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🦒', '🦓', '🐘', '🦛', '🦏', '🐪', '🐫', '🦙', '🦘', '🐔', '🐧', '🦆', '🦅', '🦉', '🐝'],
  fruits: ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🥝', '🍍', '🥭', '🍈', '🫐', '🥥', '🍅', '🥑', '🍆', '🌽', '🥕'],
  objects: ['⭐', '❤️', '💎', '🌟', '🎈', '🎁', '🏀', '⚽', '🎨', '🎭', '🎪', '🎯', '🎲', '🧸', '🪀', '🎮', '🎸', '🎹', '🥁', '🎺', '🎻', '🪗', '🎬', '🎤', '🎧', '🎼', '🏆', '🥇', '🏅', '🎖️'],
  shapes: ['🔴', '🔵', '🟢', '🟡', '🟠', '🟣', '⚫', '⚪', '🟤', '🔶', '🔷', '🔸', '🔹', '💠', '🔺', '🔻', '◼️', '◻️', '▪️', '▫️'],
  nature: ['🌸', '🌺', '🌻', '🌼', '🌷', '🌹', '🏵️', '💐', '🌲', '🌳', '🌴', '🍀', '🍁', '🍂', '🌾', '🌵', '🌱', '🌿', '☘️', '🌾'],
  food: ['🍕', '🍔', '🍟', '🌭', '🍿', '🧁', '🍰', '🎂', '🍪', '🍩', '🍦', '🍧', '🍨', '🧊', '🥤', '🥐', '🥨', '🥯', '🥞', '🧇'],
  vehicles: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🛵', '🏍️', '🚲', '🛴', '✈️', '🚁'],
  sports: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '⛳', '🥊', '🥋', '⛸️'],
};

// Generate unique ID using timestamp + random for better uniqueness
let idCounter = 0;
function generateId(): number {
  return Date.now() * 1000 + (idCounter++ % 1000);
}

function getRandomEmoji(category: keyof typeof EMOJIS): string {
  const emojis = EMOJIS[category];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

function generatePatternQuestion(): Question {
  const patterns = [
    // Simple alternating patterns (AB AB AB...)
    () => {
      const categories = ['shapes', 'animals', 'fruits', 'objects', 'nature', 'food', 'vehicles', 'sports'];
      const category = categories[Math.floor(Math.random() * categories.length)] as keyof typeof EMOJIS;
      const emoji1 = getRandomEmoji(category);
      let emoji2 = getRandomEmoji(category);
      while (emoji2 === emoji1) {
        emoji2 = getRandomEmoji(category);
      }
      const pattern = [emoji1, emoji2, emoji1, emoji2, emoji1];
      const options = [emoji1, emoji2, getRandomEmoji(category), getRandomEmoji(category)];
      return {
        pattern,
        correctAnswer: emoji2,
        options: [...new Set(options)].slice(0, 4),
        question: 'Hình nào tiếp theo?',
      };
    },

    // Three-element repeating pattern (ABC ABC...)
    () => {
      const emoji1 = getRandomEmoji('animals');
      const emoji2 = getRandomEmoji('fruits');
      const emoji3 = getRandomEmoji('objects');
      const pattern = [emoji1, emoji2, emoji3, emoji1, emoji2];
      const options = [emoji3, emoji1, getRandomEmoji('animals'), getRandomEmoji('fruits')];
      return {
        pattern,
        correctAnswer: emoji3,
        options: [...new Set(options)].slice(0, 4),
        question: 'Con vật/hình nào tiếp theo?',
      };
    },

    // Increasing count pattern (1,2,3,4)
    () => {
      const category = Math.random() > 0.5 ? 'fruits' : 'objects';
      const emoji = getRandomEmoji(category);
      const pattern = [emoji, emoji + emoji, emoji + emoji + emoji];
      const correctAnswer = emoji + emoji + emoji + emoji;
      return {
        pattern,
        correctAnswer,
        options: [
          correctAnswer,
          emoji,
          emoji + emoji,
          emoji + emoji + emoji + emoji + emoji,
        ],
        question: 'Nhóm nào tiếp theo?',
      };
    },

    // AAB pattern
    () => {
      const category = ['nature', 'shapes', 'sports'][Math.floor(Math.random() * 3)] as keyof typeof EMOJIS;
      const emoji1 = getRandomEmoji(category);
      let emoji2 = getRandomEmoji(category);
      while (emoji2 === emoji1) {
        emoji2 = getRandomEmoji(category);
      }
      const pattern = [emoji1, emoji1, emoji2, emoji1, emoji1];
      const options = [emoji1, emoji2, getRandomEmoji(category), getRandomEmoji(category)];
      return {
        pattern,
        correctAnswer: emoji2,
        options: [...new Set(options)].slice(0, 4),
        question: 'Hình nào tiếp theo?',
      };
    },

    // ABB pattern
    () => {
      const category = ['food', 'vehicles', 'animals'][Math.floor(Math.random() * 3)] as keyof typeof EMOJIS;
      const emoji1 = getRandomEmoji(category);
      let emoji2 = getRandomEmoji(category);
      while (emoji2 === emoji1) {
        emoji2 = getRandomEmoji(category);
      }
      const pattern = [emoji1, emoji2, emoji2, emoji1, emoji2];
      const options = [emoji1, emoji2, getRandomEmoji(category), getRandomEmoji(category)];
      return {
        pattern,
        correctAnswer: emoji2,
        options: [...new Set(options)].slice(0, 4),
        question: 'Hình nào tiếp theo?',
      };
    },

    // Decreasing count pattern (4,3,2,1)
    () => {
      const emoji = getRandomEmoji('objects');
      const pattern = [emoji + emoji + emoji + emoji, emoji + emoji + emoji, emoji + emoji];
      const correctAnswer = emoji;
      return {
        pattern,
        correctAnswer,
        options: [
          correctAnswer,
          emoji + emoji,
          emoji + emoji + emoji,
          emoji + emoji + emoji + emoji,
        ],
        question: 'Nhóm nào tiếp theo?',
      };
    },

    // ABAB pattern (different order)
    () => {
      const emoji1 = getRandomEmoji('vehicles');
      let emoji2 = getRandomEmoji('vehicles');
      while (emoji2 === emoji1) {
        emoji2 = getRandomEmoji('vehicles');
      }
      const pattern = [emoji1, emoji2, emoji1, emoji2, emoji1];
      const options = [emoji2, emoji1, getRandomEmoji('vehicles'), getRandomEmoji('vehicles')];
      return {
        pattern,
        correctAnswer: emoji2,
        options: [...new Set(options)].slice(0, 4),
        question: 'Xe nào tiếp theo?',
      };
    },

    // AABB pattern
    () => {
      const emoji1 = getRandomEmoji('sports');
      let emoji2 = getRandomEmoji('sports');
      while (emoji2 === emoji1) {
        emoji2 = getRandomEmoji('sports');
      }
      const pattern = [emoji1, emoji1, emoji2, emoji2, emoji1];
      const options = [emoji1, emoji2, getRandomEmoji('sports'), getRandomEmoji('sports')];
      return {
        pattern,
        correctAnswer: emoji1,
        options: [...new Set(options)].slice(0, 4),
        question: 'Hình nào tiếp theo?',
      };
    },

    // AAAB pattern
    () => {
      const emoji1 = getRandomEmoji('shapes');
      let emoji2 = getRandomEmoji('shapes');
      while (emoji2 === emoji1) {
        emoji2 = getRandomEmoji('shapes');
      }
      const pattern = [emoji1, emoji1, emoji1, emoji2, emoji1];
      const options = [emoji1, emoji2, getRandomEmoji('shapes'), getRandomEmoji('shapes')];
      return {
        pattern,
        correctAnswer: emoji1,
        options: [...new Set(options)].slice(0, 4),
        question: 'Hình nào tiếp theo?',
      };
    },

    // ABBB pattern
    () => {
      const emoji1 = getRandomEmoji('nature');
      let emoji2 = getRandomEmoji('nature');
      while (emoji2 === emoji1) {
        emoji2 = getRandomEmoji('nature');
      }
      const pattern = [emoji1, emoji2, emoji2, emoji2, emoji1];
      const options = [emoji2, emoji1, getRandomEmoji('nature'), getRandomEmoji('nature')];
      return {
        pattern,
        correctAnswer: emoji2,
        options: [...new Set(options)].slice(0, 4),
        question: 'Hình nào tiếp theo?',
      };
    },

    // Increasing by 2 pattern (2,4,6)
    () => {
      const emoji = getRandomEmoji('fruits');
      const pattern = [emoji + emoji, emoji + emoji + emoji + emoji];
      const correctAnswer = emoji + emoji + emoji + emoji + emoji + emoji;
      return {
        pattern,
        correctAnswer,
        options: [
          correctAnswer,
          emoji + emoji,
          emoji + emoji + emoji + emoji,
          emoji + emoji + emoji + emoji + emoji + emoji + emoji + emoji,
        ],
        question: 'Nhóm nào tiếp theo?',
      };
    },

    // ABCD pattern
    () => {
      const emoji1 = getRandomEmoji('animals');
      const emoji2 = getRandomEmoji('fruits');
      const emoji3 = getRandomEmoji('vehicles');
      const emoji4 = getRandomEmoji('sports');
      const pattern = [emoji1, emoji2, emoji3, emoji4, emoji1];
      const options = [emoji2, emoji3, emoji4, emoji1];
      return {
        pattern,
        correctAnswer: emoji2,
        options: [...new Set(options)].slice(0, 4),
        question: 'Hình nào tiếp theo?',
      };
    },
  ];

  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)]();

  return {
    id: generateId(),
    type: 'pattern',
    question: selectedPattern.question,
    pattern: selectedPattern.pattern,
    correctAnswer: selectedPattern.correctAnswer,
    options: selectedPattern.options,
  };
}

function generateImageAddition(): Question {
  const categories = ['fruits', 'animals', 'objects', 'vehicles', 'sports'];
  const category = categories[Math.floor(Math.random() * categories.length)] as keyof typeof EMOJIS;
  const emoji = getRandomEmoji(category);

  // Vary difficulty: easier (1-4) or harder (1-6)
  const maxNum = Math.random() > 0.6 ? 6 : 4;
  const num1 = Math.floor(Math.random() * maxNum) + 1;
  const num2 = Math.floor(Math.random() * maxNum) + 1;
  const answer = num1 + num2;

  const images = [
    ...Array(num1).fill(emoji),
    ...Array(num2).fill(emoji),
  ];

  const options = [
    answer,
    answer + 1,
    answer - 1,
    answer + 2,
  ].filter(n => n > 0);

  return {
    id: generateId(),
    type: 'image-addition',
    question: `${num1} + ${num2} = ?`,
    images,
    correctAnswer: answer,
    options: [...new Set(options)].sort(() => Math.random() - 0.5).slice(0, 4),
  };
}

function generateImageSubtraction(): Question {
  const categories = ['animals', 'fruits', 'vehicles', 'sports', 'objects'];
  const category = categories[Math.floor(Math.random() * categories.length)] as keyof typeof EMOJIS;
  const emoji = getRandomEmoji(category);

  // Vary difficulty
  const total = Math.floor(Math.random() * 8) + 3; // 3-10
  const subtract = Math.floor(Math.random() * (total - 1)) + 1;
  const answer = total - subtract;

  const images = Array(total).fill(emoji);

  const options = [
    answer,
    answer + 1,
    answer - 1,
    total,
    subtract,
  ].filter(n => n >= 0 && n <= total);

  return {
    id: generateId(),
    type: 'image-subtraction',
    question: `Có ${total} ${emoji}. Nếu bớt đi ${subtract} ${emoji}, còn lại bao nhiêu?`,
    images: Array(answer).fill(emoji),
    correctAnswer: answer,
    options: [...new Set(options)].sort(() => Math.random() - 0.5).slice(0, 4),
  };
}

function generateCounting(): Question {
  const categories = ['objects', 'animals', 'fruits', 'vehicles', 'sports', 'nature'];
  const category = categories[Math.floor(Math.random() * categories.length)] as keyof typeof EMOJIS;
  const emoji = getRandomEmoji(category);

  // Vary difficulty: easier (2-7) or harder (5-12)
  const isHarder = Math.random() > 0.7;
  const count = isHarder
    ? Math.floor(Math.random() * 8) + 5  // 5-12
    : Math.floor(Math.random() * 6) + 2; // 2-7

  const images = Array(count).fill(emoji);

  const options = [
    count,
    count + 1,
    count - 1,
    count + 2,
  ].filter(n => n > 0);

  return {
    id: generateId(),
    type: 'counting',
    question: `Đếm có bao nhiêu ${emoji}?`,
    images,
    correctAnswer: count,
    options: [...new Set(options)].sort(() => Math.random() - 0.5).slice(0, 4),
  };
}

function generateComparison(): Question {
  const category1Options = ['animals', 'fruits', 'vehicles', 'sports'];
  const category2Options = ['objects', 'nature', 'shapes', 'food'];

  const cat1 = category1Options[Math.floor(Math.random() * category1Options.length)] as keyof typeof EMOJIS;
  const cat2 = category2Options[Math.floor(Math.random() * category2Options.length)] as keyof typeof EMOJIS;

  const emoji1 = getRandomEmoji(cat1);
  const emoji2 = getRandomEmoji(cat2);

  // Vary difficulty
  const maxCount = Math.random() > 0.5 ? 8 : 6;
  let count1 = Math.floor(Math.random() * maxCount) + 2;
  let count2 = Math.floor(Math.random() * maxCount) + 2;

  // Make sure they're different
  while (count1 === count2) {
    count2 = Math.floor(Math.random() * maxCount) + 2;
  }

  const images = [
    ...Array(count1).fill(emoji1),
    ...Array(count2).fill(emoji2),
  ];

  let question = '';
  let correctAnswer = '';

  // Vary question types
  const questionType = Math.random();
  if (questionType < 0.5) {
    // "nhiều hơn" (more than)
    if (count1 > count2) {
      question = `${emoji1} hay ${emoji2} nhiều hơn?`;
      correctAnswer = emoji1;
    } else {
      question = `${emoji1} hay ${emoji2} nhiều hơn?`;
      correctAnswer = emoji2;
    }
  } else {
    // "ít hơn" (less than)
    if (count1 < count2) {
      question = `${emoji1} hay ${emoji2} ít hơn?`;
      correctAnswer = emoji1;
    } else {
      question = `${emoji1} hay ${emoji2} ít hơn?`;
      correctAnswer = emoji2;
    }
  }

  const options = [emoji1, emoji2, '🤷 Bằng nhau', getRandomEmoji('shapes')];

  return {
    id: generateId(),
    type: 'comparison',
    question,
    images,
    correctAnswer,
    options: [...new Set(options)].slice(0, 4),
  };
}

function generateMissingNumber(): Question {
  const patterns = [
    // Missing in middle: 1, 2, ?, 4, 5
    () => {
      const start = Math.floor(Math.random() * 6) + 1; // 1-6
      const sequence = [start, start + 1, '?', start + 3, start + 4];
      const correctAnswer = start + 2;

      const options = [
        correctAnswer,
        correctAnswer + 1,
        correctAnswer - 1,
        correctAnswer + 2,
      ].filter(n => n > 0);

      return { sequence, correctAnswer, options };
    },

    // Missing at start: ?, 2, 3, 4, 5
    () => {
      const start = Math.floor(Math.random() * 5) + 2; // 2-6
      const sequence = ['?', start, start + 1, start + 2, start + 3];
      const correctAnswer = start - 1;

      const options = [
        correctAnswer,
        correctAnswer + 1,
        correctAnswer + 2,
        start,
      ].filter(n => n > 0);

      return { sequence, correctAnswer, options };
    },

    // Missing at end: 1, 2, 3, 4, ?
    () => {
      const start = Math.floor(Math.random() * 4) + 1; // 1-4
      const sequence = [start, start + 1, start + 2, start + 3, '?'];
      const correctAnswer = start + 4;

      const options = [
        correctAnswer,
        correctAnswer - 1,
        correctAnswer + 1,
        start,
      ];

      return { sequence, correctAnswer, options };
    },

    // Count by 2s: 2, 4, ?, 8, 10
    () => {
      const start = (Math.floor(Math.random() * 3) + 1) * 2; // 2, 4, or 6
      const sequence = [start, start + 2, '?', start + 6, start + 8];
      const correctAnswer = start + 4;

      const options = [
        correctAnswer,
        correctAnswer + 2,
        correctAnswer - 2,
        start,
      ];

      return { sequence, correctAnswer, options };
    },

    // Different position: 1, ?, 3, 4, 5
    () => {
      const start = Math.floor(Math.random() * 5) + 1; // 1-5
      const sequence = [start, '?', start + 2, start + 3, start + 4];
      const correctAnswer = start + 1;

      const options = [
        correctAnswer,
        correctAnswer + 1,
        correctAnswer - 1,
        start + 2,
      ].filter(n => n > 0);

      return { sequence, correctAnswer, options };
    },

    // Different position: 1, 2, 3, ?, 5
    () => {
      const start = Math.floor(Math.random() * 5) + 1; // 1-5
      const sequence = [start, start + 1, start + 2, '?', start + 4];
      const correctAnswer = start + 3;

      const options = [
        correctAnswer,
        correctAnswer + 1,
        correctAnswer - 1,
        start,
      ];

      return { sequence, correctAnswer, options };
    },
  ];

  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)]();

  return {
    id: generateId(),
    type: 'missing-number',
    question: 'Số nào còn thiếu?',
    pattern: selectedPattern.sequence.map(n => n.toString()),
    correctAnswer: selectedPattern.correctAnswer,
    options: [...new Set(selectedPattern.options)].sort(() => Math.random() - 0.5).slice(0, 4),
  };
}

export function generateQuestion(): Question {
  // Balanced distribution across question types for better variety
  const types: (() => Question)[] = [
    generatePatternQuestion,
    generatePatternQuestion,
    generatePatternQuestion,
    generateImageAddition,
    generateImageAddition,
    generateImageAddition,
    generateImageSubtraction,
    generateImageSubtraction,
    generateImageSubtraction,
    generateCounting,
    generateCounting,
    generateCounting,
    generateComparison,
    generateComparison,
    generateMissingNumber,
    generateMissingNumber,
  ];

  const generator = types[Math.floor(Math.random() * types.length)];
  return generator();
}

export function generateQuestions(count: number): Question[] {
  const questions: Question[] = [];
  for (let i = 0; i < count; i++) {
    questions.push(generateQuestion());
  }
  return questions;
}
