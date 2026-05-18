# AI-Based Employee Performance Analytics & Recommendation System

Full-stack MERN app for HR/Admin users to manage employees, analyze performance, and generate AI-powered recommendations using an OpenRouter/OpenAI-compatible API.

## Features
- JWT auth with bcrypt password hashing
- Add/list/search/update/delete employees
- MongoDB schema validation + duplicate email handling
- AI recommendation endpoint for promotion, ranking, training suggestions, and feedback
- React frontend with form handling, search/filter, analytics cards, rankings, and AI recommendation display
- Axios API integration and protected routes

## Tech Stack
React + Vite, Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, Axios, OpenRouter/OpenAI-compatible API

## Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Default API Endpoints

### Auth
- POST `/api/auth/signup`
- POST `/api/auth/login`
- GET `/api/auth/me`

### Employees
- POST `/api/employees`
- GET `/api/employees`
- GET `/api/employees/search?department=Development`
- PATCH `/api/employees/:id`
- DELETE `/api/employees/:id`

### AI
- POST `/api/ai/recommend`

## Render Deployment
Deploy backend as Web Service and frontend as Static Site. Add environment variables from `.env.example`.
