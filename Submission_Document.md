# Project Report: AI-Based Employee Performance Analytics & Recommendation System

## Student Details
**Name: Shashank Singh** 
**Roll Number: 202401100300227** 
**Branch & Section: CSE-AI/D** 
**Subject:** AI Driven Full Stack Development (AI308B)

---

## Part 1: Project URLs
- **Live Frontend URL:** `[Insert Render Frontend URL here]`
- **Backend API URL:** `[Insert Render Backend URL here]`
- **GitHub Repository Link:** `[Insert your GitHub repo link here]`

---

## Part 2: Code Structure & Implementation

### 1. Frontend Components (`frontend/src/components/`)
The frontend is built using React components as requested:
- `App.jsx`: Main orchestrator, manages state (user, employees, filtering).
- `Auth.jsx`: Handles JWT Login and Signup.
- `EmployeeRegistrationForm.jsx`: Captures new employee details and posts to the API.
- `EmployeeListPage.jsx`: Renders the list of employees, allowing score updates and deletion.
- `SearchAndFilterSection.jsx`: Manages department-based search and filter resets.
- `AIRecommendationDisplay.jsx`: Connects to OpenRouter AI and displays JSON recommendations.

### 2. Backend Architecture (`backend/src/`)
- `routes/`: Express routers for `/api/auth`, `/api/employees`, and `/api/ai`.
- `controllers/`: Business logic, such as `addEmployee`, `searchEmployees`, and `recommend` (OpenRouter API).
- `models/`: Mongoose schemas with validation for `User` and `Employee` (duplicate email checks, score validation).
- `middleware/`: Contains `authMiddleware` for protecting routes and `errorMiddleware` for global error handling.

---

## Part 3: Execution Output (Screenshots)

### Frontend UI Output
*(Paste a screenshot of your running frontend UI below)*
`[Insert UI Screenshot here]`

### MongoDB Data Storage
*(Paste a screenshot of your MongoDB cluster or Compass showing the stored Employee/User documents below)*
`[Insert MongoDB Screenshot here]`

---

## Part 4: API Testing (Postman/Thunder Client Screenshots)

*(Paste screenshots of the following successful API calls below)*

**1. Authentication (Signup/Login)**
`[Insert POST /api/auth/signup or /api/auth/login screenshot here]`

**2. Add Employee**
`[Insert POST /api/employees screenshot here]`

**3. Get All Employees**
`[Insert GET /api/employees screenshot here]`

**4. Search Employee**
`[Insert GET /api/employees/search?department=Development screenshot here]`

**5. AI Recommendation**
`[Insert POST /api/ai/recommend screenshot here]`

---

## Part 5: Deployment on Render

*(Paste a screenshot of your successful Render deployment dashboards below)*
`[Insert Render Backend Web Service Screenshot here]`
`[Insert Render Frontend Static Site Screenshot here]`

---

**Note to Student:** After pasting the images in place of the bracketed texts, export this document as a PDF to submit on Moodle.
