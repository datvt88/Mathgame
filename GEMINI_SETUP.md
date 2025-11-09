# Hướng Dẫn Cấu Hình Gemini AI

## Giới Thiệu

Game Toán Pokemon hiện đã tích hợp **Google Gemini AI** để:
- 🤖 Tạo câu hỏi toán học thông minh
- 📊 Đánh giá kết quả học tập chi tiết
- 💡 Đưa ra gợi ý và lời khuyên cá nhân hóa

## Cách Lấy API Key

1. **Truy cập Google AI Studio**
   - Mở trình duyệt và vào: https://makersuite.google.com/app/apikey
   - Hoặc: https://aistudio.google.com/app/apikey

2. **Đăng nhập tài khoản Google**
   - Sử dụng tài khoản Google của bạn

3. **Tạo API Key**
   - Click nút "Create API Key"
   - Copy API key được tạo ra

## Cách Cấu Hình

### Bước 1: Tạo file `.env.local`

Trong thư mục gốc của project, tạo file `.env.local`:

```bash
# Copy từ .env.example
cp .env.example .env.local
```

### Bước 2: Thêm API Key

Mở file `.env.local` và thay thế API key:

```env
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSy...your_actual_api_key_here
```

### Bước 3: Restart Development Server

```bash
npm run dev
```

## Tính Năng AI

### 1. AI Question Generation (Tạo Câu Hỏi)

Hàm: `generateAIQuestion(difficulty)`

```typescript
import { generateAIQuestion } from '@/lib/gemini';

// Tạo câu hỏi dễ
const easyQuestion = await generateAIQuestion('easy');

// Tạo câu hỏi khó
const hardQuestion = await generateAIQuestion('hard');
```

### 2. AI Evaluation (Đánh Giá Kết Quả)

Hàm: `evaluateGameResults(result)`

```typescript
import { evaluateGameResults } from '@/lib/gemini';

const result = {
  score: 8,
  totalQuestions: 10,
  totalTime: 120000, // milliseconds
  questionTimes: [12000, 15000, ...],
  difficulty: 'easy'
};

const evaluation = await evaluateGameResults(result);
console.log(evaluation); // Nhận xét chi tiết từ AI
```

### 3. AI Hints (Gợi Ý)

Hàm: `getQuestionHint(question)`

```typescript
import { getQuestionHint } from '@/lib/gemini';

const hint = await getQuestionHint(currentQuestion);
// Trả về gợi ý giúp học sinh tự tìm đáp án
```

## Lưu Ý Quan Trọng

⚠️ **Bảo Mật API Key:**
- KHÔNG commit file `.env.local` lên Git
- KHÔNG share API key công khai
- File `.env.local` đã được thêm vào `.gitignore`

💡 **Giới Hạn Sử Dụng:**
- Google Gemini API có giới hạn request miễn phí
- Nếu vượt quota, cần nâng cấp lên gói trả phí
- Xem thêm tại: https://ai.google.dev/pricing

🔒 **Production:**
- Nên sử dụng environment variables từ hosting platform
- Vercel: Settings → Environment Variables
- Netlify: Site settings → Build & deploy → Environment

## Kiểm Tra Hoạt Động

Sau khi cấu hình, chạy game và:

1. ✅ Chọn độ khó (Dễ/Khó)
2. ✅ Chơi và hoàn thành 10 câu hỏi
3. ✅ Xem màn hình kết quả
4. ✅ Nhận xét từ AI sẽ xuất hiện trong ô "🤖 Nhận Xét Từ AI Giáo Viên"

Nếu thấy "Đang phân tích kết quả..." → API đang hoạt động
Nếu thấy nhận xét chi tiết → Thành công! 🎉

## Troubleshooting

**Lỗi: "API key not valid"**
- Kiểm tra lại API key đã copy đúng chưa
- Đảm bảo không có khoảng trắng thừa

**Lỗi: "Quota exceeded"**
- Bạn đã vượt giới hạn miễn phí
- Chờ 24h hoặc nâng cấp lên gói trả phí

**AI không hiển thị:**
- Mở Console (F12) để xem lỗi
- Kiểm tra file `.env.local` đã tồn tại chưa
- Restart lại dev server

## Hỗ Trợ

Nếu gặp vấn đề, vui lòng tạo issue tại:
https://github.com/datvt88/Mathgame/issues
