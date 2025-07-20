# 🧠 LexCell - Vocabulary Learning App

A mobile-only vocabulary learning app with a brutalist, terminal-inspired design. LexCell helps users learn and retain vocabulary through active recall and AI scoring.

## 🎯 Features

### Core Learning Modes
- **New Word Mode**: Learn new words with AI-powered definition scoring
- **Review Mode**: Recall previously learned words with streak tracking

### Design Philosophy
- Brutalist terminal UI with dark background and neon green text
- Monospaced fonts (JetBrains Mono)
- No ornamentation - pure functionality
- Mobile-first design

## 🧱 Tech Stack

### Frontend
- **Expo + React Native** (mobile only)
- **TypeScript** for type safety
- **React Navigation** (tab-based)
- **Nativewind** (Tailwind CSS for RN)
- **AsyncStorage** for local persistence

### Backend (Coming Soon)
- **Railway** for hosting
- **Express.js/Fastify**
- **PostgreSQL** (Railway/Supabase)
- **Google Sign-In** (Firebase Auth)
- **OpenAI GPT-4** for definition scoring

## 🗂️ Project Structure

```
lexcell/
├── app/                  # Entry points + routing
├── components/           # Reusable UI elements
├── screens/              # NewWordScreen, ReviewScreen, etc.
├── api/                  # OpenAI + backend requests
├── hooks/                # useSession, useWordQueue, etc.
├── utils/                # scoring, formatting, etc.
├── styles/               # Font config, themes
├── types/                # TypeScript definitions
├── assets/               # Fonts, icons
└── App.tsx
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. **Clone and install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web (for testing)
   npm run web
   ```

## 🎨 Design System

### Colors
- **Background**: `#000000` (Pure black)
- **Text**: `#00FF00` (Neon green)
- **Accent**: `#00CC00` (Darker green)
- **Muted**: `#006600` (Very dark green)
- **Error**: `#FF0000` (Red)
- **Warning**: `#FFFF00` (Yellow)

### Typography
- **Primary Font**: JetBrains Mono
- **Fallback**: System monospace

### Spacing
- Consistent 4px grid system
- Standard spacing: 4, 8, 16, 24, 32, 48px

## 🔧 Development

### Key Components
- `NewWordScreen`: Main learning interface
- `ReviewScreen`: Word recall and review
- `App.tsx`: Navigation and app structure

### State Management
- Local state with React hooks
- AsyncStorage for persistence
- Context API for global state (planned)

### API Integration
- Mock scoring system (ready for OpenAI integration)
- Difficulty adaptation algorithm
- Progress tracking

## 📱 Current Status

### ✅ Completed
- [x] Project scaffolding with Expo + TypeScript
- [x] Nativewind configuration
- [x] Bottom tab navigation
- [x] Brutalist terminal UI design
- [x] New Word and Review screens
- [x] Mock scoring system
- [x] TypeScript type definitions

### 🚧 In Progress
- [ ] Google Sign-In integration
- [ ] OpenAI API integration
- [ ] Backend API development
- [ ] Database schema and migrations

### 📋 Planned
- [ ] User authentication flow
- [ ] Word database and management
- [ ] Progress analytics
- [ ] Offline support
- [ ] Push notifications
- [ ] Social features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ and ☕ for vocabulary enthusiasts** 