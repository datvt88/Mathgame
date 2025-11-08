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
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵'],
  fruits: ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🥝', '🍍', '🥭', '🍈', '🫐', '🥥'],
  objects: ['⭐', '❤️', '💎', '🌟', '🎈', '🎁', '🏀', '⚽', '🎨', '🎭', '🎪', '🎯', '🎲', '🧸', '🪀'],
  shapes: ['🔴', '🔵', '🟢', '🟡', '🟠', '🟣', '⚫', '⚪', '🟤', '🔶', '🔷', '🔸', '🔹', '💠', '🔺'],
  nature: ['🌸', '🌺', '🌻', '🌼', '🌷', '🌹', '🏵️', '💐', '🌲', '🌳', '🌴', '🍀', '🍁', '🍂', '🌾'],
  food: ['🍕', '🍔', '🍟', '🌭', '🍿', '🧁', '🍰', '🎂', '🍪', '🍩', '🍦', '🍧', '🍨', '🧊', '🥤'],
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
      const emoji1 = getRandomEmoji('shapes');
      let emoji2 = getRandomEmoji('shapes');
      while (emoji2 === emoji1) {
        emoji2 = getRandomEmoji('shapes');
      }
      const pattern = [emoji1, emoji2, emoji1, emoji2, emoji1];
      const options = [emoji1, emoji2, getRandomEmoji('shapes'), getRandomEmoji('shapes')];
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

    // Increasing count pattern
    () => {
      const emoji = getRandomEmoji('fruits');
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
      const emoji1 = getRandomEmoji('nature');
      let emoji2 = getRandomEmoji('nature');
      while (emoji2 === emoji1) {
        emoji2 = getRandomEmoji('nature');
      }
      const pattern = [emoji1, emoji1, emoji2, emoji1, emoji1];
      const options = [emoji1, emoji2, getRandomEmoji('nature'), getRandomEmoji('nature')];
      return {
        pattern,
        correctAnswer: emoji2,
        options: [...new Set(options)].slice(0, 4),
        question: 'Hình nào tiếp theo?',
      };
    },

    // ABB pattern
    () => {
      const emoji1 = getRandomEmoji('food');
      let emoji2 = getRandomEmoji('food');
      while (emoji2 === emoji1) {
        emoji2 = getRandomEmoji('food');
      }
      const pattern = [emoji1, emoji2, emoji2, emoji1, emoji2];
      const options = [emoji1, emoji2, getRandomEmoji('food'), getRandomEmoji('food')];
      return {
        pattern,
        correctAnswer: emoji2,
        options: [...new Set(options)].slice(0, 4),
        question: 'Món ăn nào tiếp theo?',
      };
    },

    // Decreasing count pattern
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
  const emoji = getRandomEmoji('fruits');
  const num1 = Math.floor(Math.random() * 5) + 1;
  const num2 = Math.floor(Math.random() * 5) + 1;
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
  const emoji = getRandomEmoji('animals');
  const total = Math.floor(Math.random() * 7) + 4; // 4-10
  const subtract = Math.floor(Math.random() * (total - 1)) + 1;
  const answer = total - subtract;

  const images = Array(total).fill(emoji);

  const options = [
    answer,
    answer + 1,
    answer - 1,
    total,
  ].filter(n => n > 0 && n <= total);

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
  const emoji = getRandomEmoji('objects');
  const count = Math.floor(Math.random() * 8) + 2; // 2-9
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
  const emoji1 = getRandomEmoji('animals');
  const emoji2 = getRandomEmoji('fruits');

  const count1 = Math.floor(Math.random() * 5) + 3; // 3-7
  const count2 = Math.floor(Math.random() * 5) + 3; // 3-7

  while (count1 === count2) {
    // Make sure they're different
    return generateComparison();
  }

  const images = [
    ...Array(count1).fill(emoji1),
    ...Array(count2).fill(emoji2),
  ];

  let question = '';
  let correctAnswer = '';

  if (count1 > count2) {
    question = `${emoji1} hay ${emoji2} nhiều hơn?`;
    correctAnswer = emoji1;
  } else {
    question = `${emoji1} hay ${emoji2} nhiều hơn?`;
    correctAnswer = emoji2;
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
  const start = Math.floor(Math.random() * 5) + 1; // 1-5
  const sequence = [start, start + 1, '?', start + 3, start + 4];
  const correctAnswer = start + 2;

  const options = [
    correctAnswer,
    correctAnswer + 1,
    correctAnswer - 1,
    correctAnswer + 2,
  ].filter(n => n > 0);

  return {
    id: generateId(),
    type: 'missing-number',
    question: 'Số nào còn thiếu?',
    pattern: sequence.map(n => n.toString()),
    correctAnswer,
    options: [...new Set(options)].sort(() => Math.random() - 0.5).slice(0, 4),
  };
}

export function generateQuestion(): Question {
  const types: (() => Question)[] = [
    generatePatternQuestion,
    generatePatternQuestion,
    generateImageAddition,
    generateImageSubtraction,
    generateCounting,
    generateComparison,
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
