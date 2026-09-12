# E-Learning Platform (MERN Stack)

A full-stack E-Learning platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This platform allows instructors to create and manage courses, and students to browse and enroll in them.

##  Features

**Authentication & Authorization:**
- Secure JWT (JSON Web Token) authentication.
- Role-Based Access Control (RBAC) separating `student` and `instructor` privileges.
- Single Sign-On via **Google Authentication**.

**Student Features:**
- Browse all available courses.
- Enroll in courses (preventing duplicate enrollments).
- View a dedicated dashboard of enrolled courses.
- Interact with a ChatGPT-powered advisor to get personalized course suggestions based on career goals.

**Instructor Features:**
- Create and publish new courses.
- View a dedicated dashboard of managed courses.
- View a detailed list of students enrolled in their specific courses.

## 💻 Tech Stack
- **Frontend:** React.js (Vite), Tailwind CSS, React Router DOM, Axios, React Google OAuth.
- **Backend:** Node.js, Express.js, JWT, Bcrypt.js, Google Auth Library, OpenAI API.
- **Database:** MongoDB (Mongoose ORM).

---

## Local Development Setup

### Prerequisites
- Node.js installed on your machine.
- A MongoDB URI 
- A Google Cloud Client ID for OAuth.

### 1. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `backend` folder and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   GOOGLE_CLIENT_ID=your_google_client_id
   OPENAI_API_KEY=your_openai_api_key
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `frontend` folder and add:
   ```env
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`.

---

##  System Architecture & Database Design

The application follows a MVC architecture for the backend API and a component-based structure for the React frontend.

### Database Collections (MongoDB)
1. **Users:** Stores user details, hashed passwords, and roles (`student` or `instructor`).
2. **Courses:** Stores course details and a reference (`ObjectId`) to the Instructor who created it.
3. **Enrollments:** A pivot collection linking a `student (User)` and a `Course`. It utilizes a Compound Unique Index to prevent double-enrollments.

---

##  API Endpoints Documentation

### User Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/users/register` | Register a new user | Public |
| POST | `/api/users/login` | Authenticate user & get JWT | Public |
| POST | `/api/users/google` | Authenticate via Google OAuth | Public |

### Course Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/courses` | Fetch all courses | Protected |
| POST | `/api/courses` | Create a new course | Instructor |
| GET | `/api/courses/instructor/my-courses` | Get instructor's created courses | Instructor |
| PUT | `/api/courses/:id` | Update a specific course | Instructor |
| DELETE | `/api/courses/:id` | Delete a specific course | Instructor |

### Enrollments
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/enrollments` | Enroll in a course | Student |
| GET | `/api/enrollments/my-enrollments` | Get student's enrolled courses | Student |
| GET | `/api/enrollments/course/:courseId` | Get all students in a course | Instructor |

### AI Integration
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/ai/recommendations` | Get GPT course suggestions | Student |

---


