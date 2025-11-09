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

## Cấu Hình Trên Vercel (Production)

### Bước 1: Deploy Project lên Vercel
```bash
# Cài đặt Vercel CLI (nếu chưa có)
npm i -g vercel

# Deploy project
vercel
```

### Bước 2: Thêm Environment Variable
1. Vào Vercel Dashboard: https://vercel.com/dashboard
2. Chọn project của bạn
3. Vào tab **Settings**
4. Chọn **Environment Variables** ở sidebar
5. Thêm biến mới:
   - **Name**: `NEXT_PUBLIC_GEMINI_API_KEY`
   - **Value**: `AIzaSy...` (API key của bạn)
   - **Environment**: Chọn **Production**, **Preview**, và **Development**
6. Click **Save**

### Bước 3: Redeploy
```bash
# Trigger deployment mới để áp dụng env variables
vercel --prod
```

**Lưu ý quan trọng:**
- ⚠️ Biến environment phải bắt đầu với `NEXT_PUBLIC_` để Next.js có thể truy cập từ client-side
- ✅ Không cần commit file `.env.local` lên Git
- ✅ Vercel sẽ tự động inject environment variables vào build

## Alternative: Vercel Dashboard

Nếu bạn đã link repo với Vercel (GitHub/GitLab):
1. Push code lên repository
2. Vercel tự động deploy
3. Thêm Environment Variable như hướng dẫn trên
4. Vercel tự động redeploy với env mới

## Kiểm Tra Hoạt Động

Sau khi cấu hình, chạy game và:

1. ✅ Chọn độ khó (Dễ/Khó)
2. ✅ Chơi và hoàn thành 10 câu hỏi
3. ✅ Xem màn hình kết quả
4. ✅ Nhận xét từ AI sẽ xuất hiện trong ô "🤖 Nhận Xét Từ AI Giáo Viên"

Nếu thấy "Đang phân tích kết quả..." → API đang hoạt động
Nếu thấy nhận xét chi tiết → Thành công! 🎉

## Troubleshooting

### Local Development

**Lỗi: "API key not valid"**
- ✅ Kiểm tra lại API key đã copy đúng chưa
- ✅ Đảm bảo không có khoảng trắng thừa
- ✅ API key phải bắt đầu với `AIzaSy`

**Lỗi: "Quota exceeded"**
- ⚠️ Bạn đã vượt giới hạn miễn phí
- ⏰ Chờ 24h hoặc nâng cấp lên gói trả phí

**AI không hiển thị:**
- 🔍 Mở Console (F12) để xem lỗi
- 📁 Kiểm tra file `.env.local` đã tồn tại chưa
- 🔄 Restart lại dev server (`npm run dev`)

### Vercel Production

**AI không hoạt động sau khi deploy:**
1. Kiểm tra Environment Variables:
   - Vào Vercel Dashboard → Project → Settings → Environment Variables
   - Đảm bảo `NEXT_PUBLIC_GEMINI_API_KEY` đã được thêm
   - Kiểm tra value có đúng không (bắt đầu với `AIzaSy`)

2. Kiểm tra logs:
   - Vào Vercel Dashboard → Project → Deployments
   - Click vào deployment mới nhất
   - Xem logs có lỗi gì không

3. Trigger redeploy:
   ```bash
   # Từ terminal
   vercel --prod

   # Hoặc từ Dashboard
   Deployments → ⋯ → Redeploy
   ```

**Console warning "API key not configured":**
- ✅ Điều này là bình thường khi chưa config API key
- ✅ Game vẫn hoạt động nhưng không có tính năng AI
- ⚡ Thêm API key vào Vercel Environment Variables để kích hoạt AI

**Làm sao kiểm tra API key đã hoạt động?**
```javascript
// Thêm vào browser console
console.log('API Key length:', process.env.NEXT_PUBLIC_GEMINI_API_KEY?.length || 0);
console.log('API Key starts with AIzaSy:',
  process.env.NEXT_PUBLIC_GEMINI_API_KEY?.startsWith('AIzaSy') || false
);
```

## Hỗ Trợ

Nếu gặp vấn đề, vui lòng tạo issue tại:
https://github.com/datvt88/Mathgame/issues
