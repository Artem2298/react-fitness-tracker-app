# ArtoFit — Frontend

React 19 SPA for the ArtoFit fitness tracker.

## Setup

```bash
npm install
npm run dev    # http://localhost:5173
```

## Tech

- React 19 + React Router v7
- Vite (bundler)
- Tailwind CSS 3 + shadcn/ui
- Axios (API client)
- Zod (validation)

## Structure

```
src/
├── components/    # Reusable UI (TrainingCard, UserSidebar, etc.)
├── context/       # React Context (UserProvider)
├── lib/           # API client, constants, validation schemas
├── pages/         # Route pages (Home, TrainingPage, UserProfile)
├── router/        # Route definitions
└── services/      # API service layer
```

Requires backend running on `http://localhost:3000`.
