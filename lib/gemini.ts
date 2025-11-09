import { GoogleGenerativeAI } from '@google/generative-ai';
import { Question, DifficultyLevel } from './gameLogic';

// Initialize Gemini AI
// API key is loaded from environment variables:
// - Local development: .env.local file
// - Vercel production: Environment Variables in project settings
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

// Helper function to check if API is configured
function isAPIConfigured(): boolean {
  return API_KEY.length > 0 &&
         !API_KEY.includes('YOUR_API_KEY') &&
         !API_KEY.includes('Demo') &&
         API_KEY.startsWith('AIzaSy');
}

// Export function to check API status from components
export function checkGeminiAPIStatus(): { connected: boolean; message: string } {
  if (!API_KEY || API_KEY.length === 0) {
    return {
      connected: false,
      message: 'Chưa cấu hình API Key'
    };
  }

  if (API_KEY.includes('YOUR_API_KEY') || API_KEY.includes('Demo')) {
    return {
      connected: false,
      message: 'API Key chưa được thiết lập đúng'
    };
  }

  if (!API_KEY.startsWith('AIzaSy')) {
    return {
      connected: false,
      message: 'API Key không hợp lệ'
    };
  }

  return {
    connected: true,
    message: 'Đã kết nối Gemini AI'
  };
}

// Lazy initialization - only create when API key is valid
function getGeminiAI(): GoogleGenerativeAI | null {
  if (!isAPIConfigured()) {
    console.warn('⚠️ Gemini API key not configured properly. AI features disabled.');
    return null;
  }
  return new GoogleGenerativeAI(API_KEY);
}

export interface GameResult {
  score: number;
  totalQuestions: number;
  totalTime: number;
  questionTimes: number[];
  difficulty: DifficultyLevel;
}

/**
 * Generate a math question using Gemini AI
 */
export async function generateAIQuestion(difficulty: DifficultyLevel): Promise<Question | null> {
  try {
    const genAI = getGeminiAI();
    if (!genAI) {
      console.log('Gemini AI not available - API key not configured');
      return null;
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Bạn là một giáo viên toán học cho học sinh lớp 1 (6-7 tuổi).
Hãy tạo MỘT câu hỏi toán học với độ khó "${difficulty === 'easy' ? 'dễ' : 'khó'}".

Yêu cầu:
- Độ khó DỄ: số từ 1-10, phép tính đơn giản
- Độ khó KHÓ: số từ 1-20, có thể kết hợp nhiều phép tính

Các dạng bài có thể tạo:
1. Phép cộng: "? + ? = ?"
2. Phép trừ: "? - ? = ?"
3. Đếm đồ vật
4. So sánh số lớn/nhỏ
5. Tìm số thiếu trong dãy
6. Nhận biết quy luật

Trả về JSON với format sau (QUAN TRỌNG: chỉ trả về JSON, không có text khác):
{
  "type": "addition" | "subtraction" | "counting" | "comparison" | "missing-number" | "pattern",
  "question": "Câu hỏi bằng tiếng Việt",
  "correctAnswer": số hoặc chuỗi đáp án đúng,
  "options": [4 đáp án để chọn, bao gồm đáp án đúng],
  "difficulty": "${difficulty}"
}

Ví dụ:
{
  "type": "addition",
  "question": "3 + 5 = ?",
  "correctAnswer": 8,
  "options": [7, 8, 9, 10],
  "difficulty": "easy"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found in Gemini response');
      return null;
    }

    const questionData = JSON.parse(jsonMatch[0]);

    // Create Question object
    const question: Question = {
      id: Date.now(),
      type: questionData.type || 'image-addition',
      question: questionData.question,
      correctAnswer: questionData.correctAnswer,
      options: questionData.options,
      difficulty: difficulty,
    };

    return question;
  } catch (error) {
    console.error('Error generating AI question:', error);
    return null;
  }
}

/**
 * Evaluate game results using Gemini AI
 */
export async function evaluateGameResults(result: GameResult): Promise<string> {
  // Calculate score percentage for use in both AI and fallback
  const scorePercent = (result.score / result.totalQuestions) * 100;

  try {
    const genAI = getGeminiAI();
    if (!genAI) {
      // Fallback evaluation when AI is not available
      return `Chúc mừng bạn đã hoàn thành! Bạn làm đúng ${result.score}/${result.totalQuestions} câu (${scorePercent.toFixed(0)}%) trong ${Math.floor(result.totalTime / 1000)} giây. ${
        scorePercent >= 80 ? 'Kết quả tuyệt vời! 🎉 Tiếp tục cố gắng nhé!' : 'Hãy luyện tập thêm để tiến bộ hơn! 💪'
      }`;
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const avgTimePerQuestion = result.totalTime / result.totalQuestions / 1000; // in seconds

    const prompt = `Bạn là một giáo viên toán học đang đánh giá kết quả học tập của học sinh lớp 1.

Kết quả của học sinh:
- Số câu đúng: ${result.score}/${result.totalQuestions} (${scorePercent.toFixed(1)}%)
- Tổng thời gian: ${Math.floor(result.totalTime / 1000)} giây
- Thời gian trung bình mỗi câu: ${avgTimePerQuestion.toFixed(1)} giây
- Độ khó: ${result.difficulty === 'easy' ? 'Dễ' : 'Khó'}

Hãy đưa ra nhận xét:
1. Đánh giá kết quả (xuất sắc/tốt/khá/cần cố gắng)
2. Nhận xét về độ chính xác
3. Nhận xét về tốc độ làm bài
4. 2-3 lời khuyên cụ thể để cải thiện

Viết bằng giọng điệu thân thiện, động viên, phù hợp với học sinh lớp 1. Độ dài khoảng 100-150 từ.`;

    const aiResult = await model.generateContent(prompt);
    const response = await aiResult.response;
    return response.text();
  } catch (error) {
    console.error('Error evaluating with AI:', error);
    return `Chúc mừng bạn đã hoàn thành! Bạn làm đúng ${result.score}/${result.totalQuestions} câu trong ${Math.floor(result.totalTime / 1000)} giây. ${
      scorePercent >= 80 ? 'Kết quả tuyệt vời! 🎉' : 'Hãy cố gắng thêm nhé! 💪'
    }`;
  }
}

/**
 * Get AI-powered hints for a question
 */
export async function getQuestionHint(question: Question): Promise<string> {
  try {
    const genAI = getGeminiAI();
    if (!genAI) {
      return 'Hãy đọc kỹ đề bài và thử từng đáp án nhé! 💡';
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Bạn là giáo viên toán học. Học sinh lớp 1 đang gặp khó khăn với câu hỏi:
"${question.question}"

Đáp án đúng là: ${question.correctAnswer}

Hãy đưa ra một gợi ý (hint) để giúp học sinh tự tìm ra đáp án, KHÔNG nêu trực tiếp đáp án.
Gợi ý nên ngắn gọn (1-2 câu), dễ hiểu và phù hợp với học sinh lớp 1.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting hint:', error);
    return 'Hãy đọc kỹ đề bài và thử từng đáp án nhé! 💡';
  }
}
