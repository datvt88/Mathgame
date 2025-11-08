# 🎮 Pokemon Math Game - Grade 1

Game toán học tương tác cho học sinh Lớp 1 với hệ thống phần thưởng Pokemon từ túi bí ẩn!

## ✨ Tính Năng

### 🎯 Các Dạng Bài Toán
1. **Đoán Hình Tiếp Theo** (Pattern Recognition) - Ưu tiên cao
   - Nhận biết và dự đoán chuỗi hình ảnh
   - Các mẫu luân phiên và lặp lại
   - Phát triển tư duy logic

2. **Đếm và Tính Toán với Hình Ảnh**
   - Đếm số lượng emoji
   - Phép cộng với hình ảnh trực quan
   - Phép trừ với hình minh họa

### 🎁 Hệ Thống Phần Thưởng Pokemon
- **Túi bí ẩn**: Bóc túi để nhận Pokemon
- **5 độ hiếm**: Common, Uncommon, Rare, Epic, Legendary
- **18 Pokemon khác nhau** với emoji đại diện
- **Phần thưởng theo điểm**:
  - 5/5 điểm → 5 túi bí ẩn
  - 4/5 điểm → 4 túi bí ẩn
  - 3/5 điểm → 3 túi bí ẩn
  - 2/5 điểm → 2 túi bí ẩn
  - 0-1/5 điểm → 1 túi bí ẩn

### 🎨 Giao Diện
- Thiết kế gradient đẹp mắt
- Animation mượt mà khi mở túi
- Responsive, thân thiện với mọi thiết bị
- Emoji colorful cho trẻ em

## 🚀 Cài Đặt và Chạy

### Yêu Cầu
- Node.js 18+
- npm hoặc yarn

### Các Bước

1. **Cài đặt dependencies**
```bash
npm install
```

2. **Chạy development server**
```bash
npm run dev
```

3. **Mở trình duyệt**
```
http://localhost:3000
```

4. **Build cho production**
```bash
npm run build
npm start
```

## 📁 Cấu Trúc Dự Án

```
pokemon-math-game/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Trang chủ
│   ├── game/
│   │   └── page.tsx        # Trang game chính
│   └── globals.css         # Global styles
├── components/
│   ├── QuestionCard.tsx    # Component hiển thị câu hỏi
│   └── PokemonReward.tsx   # Component phần thưởng Pokemon
├── lib/
│   ├── gameLogic.ts        # Logic sinh câu hỏi
│   └── pokemon.ts          # Dữ liệu Pokemon
├── next.config.js          # NextJS config
├── tsconfig.json           # TypeScript config
└── package.json
```

## 🎮 Cách Chơi

1. **Bắt đầu**: Click "Bắt Đầu Chơi" từ trang chủ
2. **Trả lời câu hỏi**: Chọn đáp án đúng từ các lựa chọn
3. **Nhận phản hồi**: Ngay lập tức biết đúng/sai
4. **Hoàn thành**: Sau 5 câu hỏi, nhận túi bí ẩn
5. **Bóc túi**: Click vào từng túi để nhận Pokemon
6. **Chơi lại**: Click "Chơi Lại" để bắt đầu vòng mới

## 🔧 Công Nghệ

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **React**: 19.0.0

## 📝 Tùy Chỉnh

### Thêm Pokemon Mới
Chỉnh sửa file `lib/pokemon.ts`:
```typescript
{ id: 19, name: 'Mew', emoji: '😺', rarity: 'legendary', color: '#FF1493' }
```

### Thêm Dạng Câu Hỏi Mới
Chỉnh sửa file `lib/gameLogic.ts` và thêm function generator mới.

### Điều Chỉnh Độ Khó
- Thay đổi số range trong các hàm generate
- Điều chỉnh số lượng câu hỏi trong `generateQuestions(5)`

## 🎯 Phù Hợp Cho

- Học sinh Lớp 1 (6-7 tuổi)
- Luyện tập toán học cơ bản
- Phát triển nhận biết patterns
- Học tập qua game hóa

## 📄 License

MIT License - Tự do sử dụng cho mục đích giáo dục

## 🤝 Đóng Góp

Mọi đóng góp đều được chào đón! Hãy tạo Pull Request hoặc mở Issue để thảo luận.

---

Made with ❤️ for Grade 1 students
