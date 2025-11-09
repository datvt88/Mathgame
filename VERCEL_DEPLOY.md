# 🚀 Hướng Dẫn Deploy Lên Vercel

## Phương Pháp 1: Deploy Qua Dashboard (Khuyên Dùng)

### Bước 1: Kết Nối Repository
1. Truy cập https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Chọn repository GitHub/GitLab của bạn
4. Click **"Import"**

### Bước 2: Cấu Hình Project
1. **Framework Preset**: Next.js (tự động detect)
2. **Root Directory**: `./` (mặc định)
3. **Build Command**: `npm run build` (mặc định)
4. **Output Directory**: `.next` (mặc định)

### Bước 3: Thêm Environment Variables
**QUAN TRỌNG:** Thêm Gemini API key trước khi deploy

1. Mở rộng phần **"Environment Variables"**
2. Thêm biến:
   - **Name**: `NEXT_PUBLIC_GEMINI_API_KEY`
   - **Value**: `AIzaSy...` (API key từ Google AI Studio)
   - **Environment**: Chọn cả 3 (Production, Preview, Development)

### Bước 4: Deploy
1. Click **"Deploy"**
2. Đợi 2-3 phút để Vercel build
3. Deploy thành công! 🎉

### Bước 5: Truy Cập Website
- URL: `https://your-project-name.vercel.app`
- Vercel sẽ hiển thị URL sau khi deploy xong

---

## Phương Pháp 2: Deploy Qua CLI

### Bước 1: Cài Đặt Vercel CLI
```bash
npm i -g vercel
```

### Bước 2: Login
```bash
vercel login
```

### Bước 3: Deploy Lần Đầu
```bash
# Từ thư mục project
vercel

# Trả lời các câu hỏi:
# Set up and deploy? Yes
# Which scope? (chọn account)
# Link to existing project? No
# Project name? (enter hoặc để mặc định)
# In which directory? ./
# Override settings? No
```

### Bước 4: Thêm Environment Variable
```bash
# Thêm API key
vercel env add NEXT_PUBLIC_GEMINI_API_KEY production

# Paste API key của bạn khi được hỏi
# Làm tương tự cho preview và development
vercel env add NEXT_PUBLIC_GEMINI_API_KEY preview
vercel env add NEXT_PUBLIC_GEMINI_API_KEY development
```

### Bước 5: Deploy Production
```bash
vercel --prod
```

---

## Cập Nhật Sau Deploy

### Tự Động (Khuyên Dùng)
Vercel tự động deploy khi bạn push code lên main/master branch

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### Thủ Công
```bash
# Deploy preview
vercel

# Deploy production
vercel --prod
```

---

## Quản Lý Environment Variables

### Xem Tất Cả Variables
```bash
vercel env ls
```

### Thêm Variable Mới
```bash
vercel env add VARIABLE_NAME production
```

### Xóa Variable
```bash
vercel env rm VARIABLE_NAME production
```

### Pull Variables Về Local (để test)
```bash
vercel env pull .env.local
```

---

## Domain Tùy Chỉnh

### Thêm Domain Riêng
1. Vào Dashboard → Project → Settings → Domains
2. Nhập domain của bạn (ví dụ: `mathgame.com`)
3. Follow hướng dẫn cấu hình DNS

### Domain Miễn Phí
Vercel tự động cung cấp domain:
- `your-project.vercel.app`
- `your-project-git-branch.vercel.app` (cho mỗi branch)

---

## Tính Năng Vercel

### ✅ Tự Động
- 🔄 **Auto Deploy**: Mỗi lần push code
- 🌿 **Branch Preview**: Mỗi branch có URL riêng
- 📊 **Analytics**: Thống kê traffic
- ⚡ **Edge Network**: CDN toàn cầu nhanh

### ✅ Miễn Phí
- Unlimited deployments
- 100GB bandwidth/tháng
- Automatic HTTPS
- Preview deployments

---

## Troubleshooting

### Build Failed
```bash
# Xem logs chi tiết
vercel logs your-deployment-url

# Hoặc trên Dashboard
Deployments → Click deployment → View Logs
```

### Environment Variables Không Load
```bash
# Redeploy để apply env mới
vercel --prod

# Hoặc từ Dashboard
Deployments → ⋯ → Redeploy
```

### Project Không Tìm Thấy
```bash
# Link lại project
vercel link
```

---

## Checklist Trước Deploy

- [ ] Code đã push lên GitHub/GitLab
- [ ] Package.json có đầy đủ dependencies
- [ ] Đã test local (`npm run build` && `npm start`)
- [ ] Đã có Gemini API key
- [ ] File .env.local KHÔNG được commit (đã có trong .gitignore)
- [ ] README.md có hướng dẫn rõ ràng

---

## Links Hữu Ích

- 📘 Vercel Docs: https://vercel.com/docs
- 🔑 Gemini API: https://makersuite.google.com/app/apikey
- 💬 Vercel Support: https://vercel.com/support
- 📊 Dashboard: https://vercel.com/dashboard

---

## Lưu Ý Bảo Mật

⚠️ **QUAN TRỌNG:**
- ❌ KHÔNG commit file `.env.local` lên Git
- ❌ KHÔNG share API key công khai
- ✅ Chỉ thêm env variables qua Vercel Dashboard hoặc CLI
- ✅ Sử dụng `NEXT_PUBLIC_` prefix cho client-side variables

---

**Chúc bạn deploy thành công! 🎉**

Nếu gặp vấn đề, xem thêm [GEMINI_SETUP.md](./GEMINI_SETUP.md)
