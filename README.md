# 🎮 Game Toán Pokemon - Lớp 1

Game học toán tương tác cho học sinh Lớp 1 với Pokemon, AI thông minh và hệ thống phần thưởng hấp dẫn!

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![AI](https://img.shields.io/badge/AI-Gemini-purple)

## ✨ Tính Năng Mới v2.0

### 🎯 Gameplay Nâng Cấp
- ✅ **200+ câu hỏi** toán học đa dạng (tăng từ 5 lên 10 câu/lần chơi)
- ✅ **2 cấp độ**: Dễ 😊 (1-10) và Khó 🔥 (1-20)
- ✅ **10 dạng bài**: Cộng, trừ, đếm, quy luật, hình học, so sánh, số thiếu
- ✅ **Câu hỏi hình học**: Vuông, tròn, tam giác, chữ nhật, ngôi sao, trái tim
- ✅ **Theo dõi thời gian**: Thống kê chi tiết từng câu và tổng thời gian
- ✅ **11 robot nhiều màu** trong phần thưởng

### 🤖 AI Thông Minh (Google Gemini)
- 🧠 **Đánh giá kết quả**: Nhận xét cá nhân hóa từ AI giáo viên
- 📊 **Phân tích chi tiết**: Điểm số, tốc độ, khuyến nghị cải thiện
- 💡 **Tạo câu hỏi tự động**: AI sinh câu hỏi mới (optional)
- 🎯 **Gợi ý thông minh**: Hỗ trợ khi gặp khó khăn

### 🎨 Giao Diện
- 🌈 Gradient cards đẹp mắt
- 🎵 Hệ thống âm thanh hoàn chỉnh
- 📱 Responsive design
- ⚡ Next.js App Router
- 🎭 8 nhân vật Pokemon

## 🚀 Quick Start

### Cài Đặt Local

```bash
# Clone repository
git clone https://github.com/datvt88/Mathgame.git
cd Mathgame

# Cài dependencies
npm install

# Chạy development server
npm run dev
```

Mở trình duyệt: **http://localhost:3000**

### Kích Hoạt AI (Optional)

1. **Lấy API Key**: https://makersuite.google.com/app/apikey
2. **Tạo file `.env.local`**:
   ```bash
   cp .env.example .env.local
   ```
3. **Thêm API key**:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=AIzaSy...your_key_here
   ```
4. **Restart**: `npm run dev`

📖 Chi tiết: [GEMINI_SETUP.md](./GEMINI_SETUP.md)

## 📦 Deploy Lên Vercel

### Nhanh Nhất (1-Click Deploy)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/datvt88/Mathgame)

Sau khi deploy:
1. Vào **Settings** → **Environment Variables**
2. Thêm: `NEXT_PUBLIC_GEMINI_API_KEY` = `AIzaSy...`
3. **Redeploy**

### Thủ Công

```bash
# Deploy với Vercel CLI
npm i -g vercel
vercel

# Thêm env variables trong Vercel Dashboard
```

📖 Chi tiết: [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)

## 🎮 Cách Chơi

1. **Chọn Độ Khó**: 😊 Dễ hoặc 🔥 Khó
2. **Chọn Pokemon**: 8 nhân vật để lựa chọn
3. **Trả Lời 10 Câu**: Nhiều dạng bài toán khác nhau
4. **Nhận Kết Quả**:
   - 📊 Điểm số và thời gian
   - 🎁 Pokemon & 11 robot trang bị
   - 🤖 Nhận xét từ AI giáo viên

## 📚 10 Dạng Bài Toán

| Icon | Dạng | Mô Tả | Ví Dụ |
|------|------|-------|-------|
| 🔄 | **Quy luật** | Tìm pattern tiếp theo | AB AB AB → ? |
| ➕ | **Phép cộng** | Hình ảnh + số | 🍎🍎 + 🍎🍎🍎 = ? |
| ➖ | **Phép trừ** | Bớt đi bao nhiêu | 10 - 3 = ? |
| 🔢 | **Đếm** | Đếm số đồ vật | Có bao nhiêu 🍎? |
| ⚖️ | **So sánh** | Nhiều/ít hơn | 🐶 hay 🐱 nhiều hơn? |
| ❓ | **Số thiếu** | Tìm số trong dãy | 1,2,?,4,5 |
| 🟦 | **Đếm hình** | Đếm hình học | Có bao nhiêu ⭐? |
| 🔺 | **Dãy hình** | Pattern hình học | 🔵🔺🔵🔺→? |
| 🎯 | **Quy luật ABC** | Phức tạp hơn | ABC ABC → ? |
| 🔢 | **Nhảy 2** | Đếm nhảy | 2,4,?,8,10 |

## 🎯 Cấu Trúc Project

```
Mathgame/
├── app/
│   ├── page.tsx              # Trang chủ + chọn độ khó
│   ├── game/
│   │   └── page.tsx          # Game chính (10 câu)
│   └── globals.css
├── components/
│   ├── CharacterSelect.tsx   # Chọn Pokemon
│   ├── CharacterDisplay.tsx  # Hiển thị nhân vật + trang bị
│   ├── QuestionCard.tsx      # Hiển thị câu hỏi
│   └── PokemonReward.tsx     # Phần thưởng
├── lib/
│   ├── gameLogic.ts          # 200+ câu hỏi, hình học
│   ├── gemini.ts             # ⭐ Gemini AI integration
│   ├── characters.ts         # 8 Pokemon
│   ├── equipment.ts          # 29 items (11 robots)
│   ├── pokemon.ts            # 18 Pokemon rewards
│   └── soundManager.ts       # Âm thanh
└── docs/
    ├── GEMINI_SETUP.md       # Hướng dẫn config AI
    └── VERCEL_DEPLOY.md      # Hướng dẫn deploy
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + Gradients
- **AI**: Google Gemini API
- **Deployment**: Vercel
- **Audio**: Web Audio API

## 📊 Thống Kê Ấn Tượng

- 📝 **200+** câu hỏi toán học
- 🎭 **8** nhân vật Pokemon
- 🎁 **29** items trang bị (11 robot đa màu)
- 🤖 **18** Pokemon phần thưởng
- 🎨 **10** dạng bài toán
- ⏱️ **2** cấp độ (Easy/Hard)
- 🤖 **3** tính năng AI

## 🎁 Hệ Thống Phần Thưởng

### Pokemon (18 loại)
- **Common**: Rattata, Pidgey, Caterpie, Weedle
- **Uncommon**: Psyduck, Jigglypuff, Meowth, Oddish
- **Rare**: Growlithe, Magnemite, Ponyta, Cubone
- **Epic**: Eevee, Snorlax, Lapras, Dratini
- **Legendary**: Articuno, Moltres

### Trang Bị (29 items)
- **Mũ** (4): Phù thủy, Vương miện, Lưỡi trai, Sinh nhật
- **Kính** (3): Học giả, Mát, Bơi
- **Phụ kiện** (13): Huy chương + **8 Robot màu** 🤖
- **Công cụ** (9): Bút, Sách + **3 Robot bay** 🚀

## 🔐 Bảo Mật & Best Practices

- ✅ API key trong environment variables
- ✅ `.env.local` trong `.gitignore`
- ✅ Không có secrets trong code
- ✅ Validation phía client
- ✅ Graceful degradation (hoạt động không cần AI)

## 📖 Documentation

- [GEMINI_SETUP.md](./GEMINI_SETUP.md) - Hướng dẫn cấu hình Gemini AI
- [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) - Hướng dẫn deploy production

## 🤝 Contributing

Đóng góp luôn được chào đón!

1. Fork repo
2. Tạo branch: `git checkout -b feature/AmazingFeature`
3. Commit: `git commit -m 'Add AmazingFeature'`
4. Push: `git push origin feature/AmazingFeature`
5. Tạo Pull Request

## 📝 License

MIT License - Tự do sử dụng cho mục đích giáo dục

## 👨‍💻 Author

**datvt88** - [GitHub](https://github.com/datvt88)

## 🎯 Roadmap

- [ ] Thêm chế độ multiplayer
- [ ] Leaderboard toàn cầu
- [ ] Thêm dạng bài phân số
- [ ] Voice recognition cho câu trả lời
- [ ] PWA support (offline mode)
- [ ] Thêm ngôn ngữ (English)

## 🙏 Credits

- Pokemon characters © Nintendo/Game Freak
- Google Gemini AI © Google
- Icons from Unicode emoji standard
- Sound effects from Web Audio API

## 📞 Support

Gặp vấn đề? Tạo [Issue](https://github.com/datvt88/Mathgame/issues)!

---

**Made with ❤️ for Grade 1 students**

🎮 **[Chơi Ngay!](https://mathgame-pokemon.vercel.app)** (Coming soon)
