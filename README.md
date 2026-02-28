# 🌍 GeoDiscover

[![CI](https://github.com/paulmwangi/geodiscover/actions/workflows/ci.yml/badge.svg)](https://github.com/paulmwangi/geodiscover/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> A geolocation-based event discovery platform combining interactive maps with real-time event data. Explore concerts, sports, workshops, and community gatherings near you.

---

## ✨ Features

- 🗺️ **Interactive Maps** — Leaflet & Mapbox GL integration with marker clustering
- 🎫 **Live Event Data** — SeatGeek API integration for real-time events (with graceful fallback)
- 🔐 **Authentication** — Clerk-based auth with role-based access control
- 🌗 **Dark/Light Mode** — System preference detection with manual toggle
- 📱 **Responsive Design** — Mobile-first layout with adaptive navigation
- ♿ **Accessible** — WCAG 2.2 compliant with keyboard navigation and ARIA labels
- 🛡️ **Secure APIs** — Rate limiting, input sanitization, and security headers
- 🎨 **Design System** — Consistent tokens for colors, typography, and spacing

## 📁 Project Structure

```
geodiscover/
├── components/        # Reusable UI components
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ThemeToggle.tsx
│   ├── LeafletMap.tsx
│   └── ...
├── pages/             # Next.js pages & API routes
│   ├── api/           # Backend API endpoints
│   ├── index.tsx      # Home page
│   ├── events.tsx     # Event explorer
│   ├── about.tsx      # About page
│   ├── contact.tsx    # Contact form
│   └── blog.tsx       # Blog
├── lib/               # Shared utilities
│   ├── rate-limit.ts  # API rate limiting
│   ├── sanitize.ts    # Input sanitization
│   └── theme.tsx      # Theme provider
├── styles/            # Global CSS & design tokens
├── types/             # TypeScript type definitions
├── constants/         # App constants
├── utils/             # Helper functions
├── tests/             # Test files
├── public/            # Static assets & robots.txt
└── .github/workflows/ # CI/CD pipeline
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/paulmwangi/geodiscover.git
cd geodiscover

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | ✅ |
| `CLERK_SECRET_KEY` | Clerk secret key | ✅ |
| `SEATGEEK_CLIENT_ID` | SeatGeek API client ID ([get one free](https://seatgeek.com/account/develop)) | Optional |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key | Optional |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | Optional |

### Development

```bash
# Start development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## 🧪 CI/CD

This project uses **GitHub Actions** for continuous integration:

- ✅ Linting with ESLint
- ✅ TypeScript type checking
- ✅ Production builds on Node.js 18 & 20

## 🛡️ Security

- **Rate Limiting** — API routes are protected against abuse
- **Input Sanitization** — All user inputs are sanitized
- **Security Headers** — X-Content-Type-Options, X-Frame-Options, XSS Protection
- **Environment Variables** — All secrets stored in `.env` (never committed)

## 🎨 Design System

The project uses a comprehensive design token system via Tailwind CSS:

- **Colors**: Primary (indigo), Accent (emerald), Surface variants
- **Typography**: Fluid scaling with `clamp()` for responsive text
- **Spacing**: Extended scale for consistent layouts
- **Animations**: Fade-in, slide-up/down transitions
- **Shadows**: Glass morphism and neomorphism effects

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

### Manual

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ by the GeoDiscover team
