# ArtoFit — Fitness Training Tracker

Full-stack web application for tracking sports activities (running, cycling, swimming, walking, skiing). Built with **React** + **Express** + **Prisma**.

## Features

- **Training management** — create, view and delete training sessions with a built-in timer
- **Activity types** — support for RUN, WALK, BIKE, SWIM, SKI with color-coded badges
- **Public feed** — share trainings publicly and browse other users' activities
- **User profile** — personal dashboard with stats (total distance, duration, activity breakdown)
- **Responsive design** — works on desktop and mobile (hamburger menu, adaptive grid)
- **Form validation** — client-side validation with Zod schemas

## Tech Stack

### Frontend
- **React 19** — functional components, hooks (`useState`, `useEffect`, `useRef`, `useContext`)
- **React Router v7** — client-side routing with `useRoutes`, `NavLink` (active states)
- **Tailwind CSS 3** — utility-first styling, dark theme, responsive breakpoints
- **shadcn/ui** — accessible UI components (Card, Button, Input, Label, Textarea)
- **Axios** — centralized API client with base URL config
- **Zod** — schema-based form validation
- **Lucide React** — icon library

### Backend
- **Express.js** — REST API server with CORS configuration
- **Prisma ORM** — database access with singleton pattern, SQLite
- **RESTful API** — full CRUD for users, trainings, comments, follows

### Architecture
- **Custom hooks** — `useTrainings` (CRUD + state), `useTimer` (interval management)
- **Error Boundary** — catches render errors with user-friendly fallback UI
- **Component decomposition** — reusable components (`TrainingCard`, `TrainingFormModal`, `UserSidebar`, `Spinner`, `ErrorMessage`)
- **Service layer** — API calls separated into `trainingService.js` and `userService.js`
- **Shared constants** — `TRAINING_TYPES` defined once, used across all components
- **Context API** — global user state management via `UserProvider`

## Project Structure

```
front/src/
├── components/
│   ├── ui/              # shadcn/ui base components
│   ├── ErrorBoundary.jsx # Error boundary for render errors
│   ├── Header.jsx       # Sticky nav with mobile menu
│   ├── Post.jsx         # Public training feed
│   ├── TrainingCard.jsx # Single training card
│   ├── TrainingFormModal.jsx # New training form
│   └── UserSidebar.jsx  # Profile sidebar with stats
├── context/
│   └── UserContext.jsx   # React Context for user state
├── hooks/
│   ├── useTrainings.js  # Training CRUD + loading/error state
│   └── useTimer.js      # Timer with start/stop/reset
├── lib/
│   ├── api.js           # Axios instance
│   ├── constants.js     # Shared constants (training types)
│   ├── validation.js    # Zod schemas
│   └── utils.js         # Tailwind class merge utility
├── pages/
│   ├── Home.jsx         # Landing page with hero + feed
│   ├── TrainingPage.jsx # Training management
│   ├── UserProfile.jsx  # Profile with stats dashboard
│   ├── About.jsx        # About page
│   └── NotFound.jsx     # 404 page
├── router/
│   └── index.jsx        # Route definitions
└── services/
    ├── trainingService.js  # Training API calls
    └── userService.js      # User API calls

back/src/
├── controllers/         # Express route handlers
├── routes/              # Express route definitions
└── lib/
    └── prisma.js        # Prisma singleton
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get specific user |
| POST | `/users` | Create user |
| PATCH | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |
| GET | `/training` | Get all trainings |
| GET | `/training/public` | Get public trainings |
| GET | `/training/user/:userId` | Get user's trainings |
| POST | `/training` | Create training |
| PATCH | `/training/:id` | Update training |
| DELETE | `/training/:id` | Delete training |
| GET | `/follows/:id/following` | Get following list |
| GET | `/follows/:id/followers` | Get followers list |
| POST | `/follows` | Follow user |
| DELETE | `/follows` | Unfollow user |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/<your-username>/vaj-run-app.git
cd vaj-run-app

# Backend
cd back
npm install
npx prisma generate
npm run dev          # starts on http://localhost:3000

# Frontend (separate terminal)
cd front
npm install
npm run dev          # starts on http://localhost:5173
```
