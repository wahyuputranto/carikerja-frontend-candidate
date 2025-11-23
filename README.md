# CariKerja - Frontend Candidate

Platform pencarian kerja modern untuk kandidat dengan tampilan yang menarik dan user-friendly, didesain khusus untuk target pengguna usia 18-30 tahun.

## 🎨 Features

- ✨ **Modern UI/UX** - Desain modern dengan glassmorphism, gradients, dan smooth animations
- 📱 **Mobile-First** - Responsive design yang optimal untuk semua perangkat
- 🎯 **Multi-Step Registration** - Wizard pendaftaran yang mudah dan intuitif
- 📄 **Document Upload** - Upload dokumen dengan drag & drop dan progress tracking
- 🔐 **Authentication** - Login dan register dengan validasi lengkap
- 🎨 **Vibrant Colors** - Palet warna yang menarik dan engaging
- ⚡ **Fast Performance** - Dibangun dengan Vite untuk performa optimal

## 🛠️ Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Vue Router** - Official router for Vue.js
- **Pinia** - State management for Vue
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - Promise based HTTP client

## 📦 Installation

1. Clone repository
```bash
git clone <repository-url>
cd carikerja-frontend-candidate
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
```

Edit `.env` file dan sesuaikan dengan konfigurasi backend Anda:
```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=CariKerja
```

4. Run development server
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── assets/          # Static assets (images, fonts, etc)
├── components/      # Reusable Vue components
│   ├── layout/     # Layout components (NavBar, Footer, etc)
│   └── ui/         # UI components (Button, Card, etc)
├── composables/     # Vue composables (reusable logic)
├── router/          # Vue Router configuration
├── services/        # API services
├── stores/          # Pinia stores
├── utils/           # Utility functions
├── views/           # Page components
│   └── auth/       # Authentication pages
├── App.vue          # Root component
├── main.js          # Application entry point
└── style.css        # Global styles
```

## 📄 Available Pages

- **Home** (`/`) - Landing page dengan hero section dan features
- **Login** (`/login`) - Halaman login
- **Register** (`/register`) - Multi-step registration wizard
- **Dashboard** (`/dashboard`) - User dashboard dengan stats dan quick actions
- **Jobs** (`/jobs`) - Daftar lowongan kerja
- **Job Detail** (`/jobs/:id`) - Detail lowongan kerja
- **Profile** (`/profile`) - Halaman profil user
- **Applications** (`/applications`) - Daftar lamaran dengan status tracking
- **Upload Documents** (`/upload-documents`) - Upload dokumen persyaratan

## 🎨 Design System

### Colors

- **Primary** - Blue gradient (Sky to Ocean)
- **Secondary** - Purple gradient (Lavender to Violet)
- **Accent** - Orange gradient (Sunset to Flame)

### Components

- **Glass** - Glassmorphism effect untuk cards dan modals
- **Buttons** - Multiple variants (primary, secondary, accent, outline)
- **Inputs** - Modern input fields dengan focus states
- **Badges** - Status badges dengan color coding
- **Cards** - Interactive cards dengan hover effects

### Animations

- Fade in/out
- Slide up/down
- Scale in
- Floating
- Shimmer loading

## 🔧 Development

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Lint code
```bash
npm run lint
```

## 🌐 API Integration

Frontend ini terintegrasi dengan backend Go API. Pastikan backend sudah running di `http://localhost:8080` atau sesuaikan `VITE_API_URL` di file `.env`.

### API Endpoints yang digunakan:

- `POST /auth/register` - Register kandidat baru
- `POST /auth/login` - Login kandidat
- `GET /auth/me` - Get user profile
- `GET /master/documents` - Get master document types
- `GET /master/jobs` - Get job listings
- `POST /upload/init` - Initialize document upload
- `POST /upload/complete` - Complete document upload

## 🎯 Target Audience

Platform ini didesain khusus untuk:
- **Usia**: 18-30 tahun
- **Tech-savvy**: Familiar dengan teknologi modern
- **Mobile-first**: Mayoritas akses dari mobile devices
- **Visual-oriented**: Menyukai desain yang menarik dan colorful

## 📱 Mobile Optimization

- Responsive breakpoints untuk semua ukuran layar
- Touch-friendly UI elements
- Optimized images dan assets
- Fast loading dengan code splitting
- PWA-ready (dapat ditambahkan)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Docker
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 📝 License

Copyright © 2025 CariKerja. All rights reserved.

## 👥 Contributors

- Development Team

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Made with ❤️ for Indonesian job seekers
