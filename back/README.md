# ArtoFit — Backend

Express.js REST API for the ArtoFit fitness tracker.

## Setup

```bash
npm install
npx prisma generate
npm run dev    # http://localhost:3000
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start with nodemon |
| `npm start` | Start with Node.js |
| `npm run db` | Open Prisma Studio |
| `npm run migrate` | Run database migrations |

## Tech

- Express.js + CORS
- Prisma ORM (singleton pattern)
- SQLite database
- RESTful CRUD for users, trainings, comments, follows
