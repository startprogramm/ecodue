# EcoDu - Educational Environmental Learning Platform

EcoDu is an interactive educational website focused on environmental education. Users can watch video lessons, take quizzes, comment on content, and track their learning progress.

## Features

### User Authentication
- User registration with email and password
- Secure login system
- Profile management (edit name, bio, avatar)
- Session management with automatic redirects

### Video Lessons
- Interactive video lessons on environmental topics:
  - Plastik ifloslanish (Plastic Pollution)
  - O'rmonlar kesilishi (Deforestation)
  - Havo ifloslanishi (Air Pollution)
  - Suv ifloslanishi (Water Pollution)
  - Yovvoyi tabiat (Wildlife)
- Authenticated users can comment on lessons
- Real-time comment display with user profiles

### Quiz System
- Create and manage quizzes for each lesson
- Multiple-choice questions
- Track quiz attempts and scores
- View quiz history on dashboard

### User Dashboard
- View quiz statistics and progress
- See average scores
- Track comments posted
- View recent quiz attempts

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Vite for build tooling and development
- Swiper.js for carousels
- Font Awesome for icons

### Backend
- Supabase for backend services:
  - PostgreSQL database
  - Authentication system
  - Row Level Security (RLS) for data protection
  - Real-time subscriptions

## Database Schema

### Tables
1. **profiles** - User profile information
2. **lessons** - Video lesson data
3. **quizzes** - Quiz metadata
4. **questions** - Quiz questions and answers
5. **quiz_attempts** - User quiz submissions and scores
6. **comments** - User comments on lessons

## Project Structure

```
ecodu/
├── index.html              # Homepage
├── login.html              # Login page
├── register.html           # Registration page
├── profile.html            # User profile page
├── dashboard.html          # User dashboard
├── plastik-ifloslanish.html # Lesson pages
├── auth.js                 # Authentication functions
├── supabase-client.js      # Supabase configuration
├── quiz.js                 # Quiz functionality
├── comments.js             # Comments functionality
├── main.js                 # Homepage scripts
├── lesson-page.js          # Lesson page scripts
├── style.css               # Main styles
├── watch-video.css         # Video page styles
└── vite.config.js          # Vite configuration
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Usage

### For Users
1. Register a new account at `/register.html`
2. Log in with your credentials
3. Browse video lessons
4. Comment on lessons
5. Take quizzes to test your knowledge
6. View your progress on the dashboard

### For Administrators
To add new lessons or quizzes, you can use the Supabase dashboard or create custom admin pages using the provided API functions.

## Security

- All user passwords are securely hashed
- Row Level Security (RLS) is enabled on all tables
- Users can only modify their own data
- Authentication state is validated on all protected pages

## Future Enhancements

- Quiz creation interface for administrators
- Lesson progress tracking
- Certificates for completed courses
- Social sharing features
- Multilingual support
- Mobile app version

## License

All rights reserved © 2025 EcoDu Team