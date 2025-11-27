# In-Focus News

A modern, feature-rich news aggregation platform built with React, TypeScript, and Firebase. Stay informed with real-time news from around the world, personalized bookmarks, and intelligent article recommendations.

![In-Focus News](https://img.shields.io/badge/React-18.3-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue) ![Firebase](https://img.shields.io/badge/Firebase-11.0-orange) ![Vite](https://img.shields.io/badge/Vite-6.0-purple)

## 🌟 Features

### Core Functionality

- **Real-time News Feed**: Access the latest headlines from trusted sources worldwide via NewsData.io API
- **Advanced Search**: Filter news by keywords, categories, and date ranges with persistent URL state
- **Category Browsing**: Explore news across Technology, Business, Politics, World, and more
- **Related Articles**: Discover similar content based on article categories
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices

### User Features

- **Firebase Authentication**: Secure sign-in with email/password or Google OAuth
- **Guest Mode**: Browse anonymously without creating an account
- **Bookmarks**: Save articles for later reading (authenticated users)
- **Comments & Likes**: Engage with articles through real-time interactions
- **User Profiles**: Manage your account and view saved articles
- **Dark/Light Mode**: Toggle between themes with persistent preferences

### Technical Highlights

- **Type-Safe**: Full TypeScript implementation with strict type checking
- **State Management**: Zustand for efficient global state
- **API Integration**: NewsData.io for news content, Firebase for backend services
- **Modern UI**: Shadcn/ui components with Tailwind CSS styling
- **SEO Optimized**: Open Graph and Twitter Card meta tags for social sharing
- **Performance**: Vite for lightning-fast development and optimized builds

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase project (for authentication and database)
- NewsData.io API key (optional - falls back to mock data)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/KarimWG7/In-Focus-News.git
cd in-focus-news
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# NewsData.io API (optional)
VITE_NEWS_API_KEY=your_newsdata_api_key
```

4. **Run the development server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── feed/           # News feed components
│   ├── header/         # Navigation and header
│   ├── post/           # Article detail components
│   ├── profile/        # User profile components
│   ├── search/         # Search functionality
│   ├── ui/             # Shadcn/ui base components
│   └── welcome/        # Landing page components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
│   ├── firebase.ts     # Firebase configuration
│   ├── newsApi.ts      # News API client
│   └── utils.ts        # Helper functions
├── pages/              # Route pages
├── services/           # API service layers
│   ├── newsService.ts  # News API integration
│   ├── mockNewsService.ts  # Fallback mock data
│   ├── interactionService.ts  # Comments & likes
│   └── bookmarkService.ts  # Bookmark management
├── store/              # Zustand state stores
├── types/              # TypeScript type definitions
└── main.tsx           # Application entry point
```

## 🔧 Technology Stack

### Frontend

- **React** - UI library with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation build tool
- **React Router** - Client-side routing with data loading
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality, accessible component library

### Backend & Services

- **Firebase**
  - Authentication (Email/Password, Google OAuth, Anonymous)
  - Firestore Database (comments, likes, bookmarks)
  - Real-time updates
- **NewsData.io API** - News aggregation service
- **Axios** - HTTP client with interceptors

### State & Data

- **Zustand** - Lightweight state management
- **Zod** - Runtime type validation

### Developer Experience

- **ESLint** - Code linting with React-specific rules
- **TypeScript ESLint** - Type-aware linting
- **Vite Plugin React** - Fast refresh and optimizations

## 🎨 Key Features Explained

### News API Integration

The app integrates with NewsData.io API with intelligent fallback:

- **Free Tier Optimized**: Respects 10 articles/request limit
- **Language Filter**: All requests filtered for English content
- **Error Handling**: Graceful degradation to mock data if API unavailable
- **Content Parsing**: Handles restricted content fields in free tier

### Authentication Flow

- **Email/Password**: Traditional authentication with Firebase
- **Google OAuth**: One-click sign-in with Google account
- **Guest Mode**: Anonymous browsing with limited features
- **Protected Routes**: Automatic redirection for authenticated-only pages

### Search & Filtering

- **URL Persistence**: Search state saved in URL for sharing/bookmarking
- **Client-side Sorting**: Relevance, newest, and oldest sorting
- **Category Filtering**: Filter by news categories
- **Date Range**: Custom date range selection with calendar UI

### Real-time Interactions

- **Comments**: Add and view comments on articles (stored in Firestore)
- **Likes**: Like/unlike articles with optimistic UI updates
- **Bookmarks**: Save articles to your profile for later reading

## 🔐 Environment Variables

| Variable                            | Description                  | Required |
| ----------------------------------- | ---------------------------- | -------- |
| `VITE_FIREBASE_API_KEY`             | Firebase API key             | Yes      |
| `VITE_FIREBASE_AUTH_DOMAIN`         | Firebase auth domain         | Yes      |
| `VITE_FIREBASE_PROJECT_ID`          | Firebase project ID          | Yes      |
| `VITE_FIREBASE_STORAGE_BUCKET`      | Firebase storage bucket      | Yes      |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes      |
| `VITE_FIREBASE_APP_ID`              | Firebase app ID              | Yes      |
| `VITE_NEWS_API_KEY`                 | NewsData.io API key          | No\*     |

\*If not provided, the app uses mock data for development

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [NewsData.io](https://newsdata.io) for the news API
- [Shadcn/ui](https://ui.shadcn.com) for the beautiful component library
- [Firebase](https://firebase.google.com) for backend services
- [Lucide Icons](https://lucide.dev) for the icon set

## 📧 Contact

Karim Ghanem - [@KarimWG7](https://github.com/KarimWG7)

Project Link: [https://github.com/KarimWG7/In-Focus-News](https://github.com/KarimWG7/In-Focus-News)

🟦[LinkedIn](https://www.linkedin.com/in/karim-ghanem-a02359354/)

---

Built with ❤️ using React and TypeScript
