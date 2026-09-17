# E-Learning Platform (MERN Stack + AWS + CI/CD)

A full-stack E-Learning platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This platform allows instructors to create comprehensive week-by-week courses, upload resources to AWS S3, and manage students. Students can browse, enroll, and interact with an AI course advisor.

The project is fully deployed using AWS EC2, S3, and automated via GitHub Actions CI/CD.

---

##  Features

**Authentication & Security:**
- Secure JWT (JSON Web Token) authentication.
- True Email Verification System via `nodemailer` (6-digit OTP verified upon signup).
- Strict Regex Password Validation enforcing strong passwords (symbols,mixed case length).
- High-security Session Management utilizing `sessionStorage` to natively purge tokens upon browser closure.
- Role-Based Access Control (RBAC) separating `student` and `instructor` privileges.
- Single Sign-On via **Google Authentication**.

**Enhanced UI/UX:**
- Interactive real-time search functionality across Course Listings and Dashboards.
- Graceful Loading State Overlays providing immediate visual feedback during data queries.
- Reusable React Confirmation Modals protecting against accidental enrollments, unenrollments, and administrative course deletions.

**Student Experience:**
- Browse all available courses.
- Seamless enrollment system preventing duplicate enrollments.
- Dedicated learning dashboard enrolled courses.
- Interact with an AI-powered course advisor for personalized career and course suggestions.

**Instructor Experience:**
- Create and publish new courses.
- Build  **week-by-week curriculums** with links and PDF uploads.
- Create global quizzes with multiple-choice questions.
- View a detailed list of students enrolled in specific courses.

**Cloud & DevOps (AWS + CI/CD):**
- **Cloud Storage:** Secure file uploads (PDFs, Videos) directly to AWS S3 using `multer-s3`.
- **Unified Hosting:** Both the Frontend and Backend are deployed onto a single AWS EC2 instance running dynamically via PM2.
- **CI/CD Pipeline:** Fully automated full-stack deployment using GitHub Actions directly to EC2 via SSH. 

---

##  Tech Stack

- **Frontend:** React.js (Vite), Tailwind CSS, React Router DOM, Axios, React Google OAuth.
- **Backend:** Node.js, Express.js, JWT, Bcrypt.js, Google Auth Library, OpenAI API, AWS SDK.
- **Database:** MongoDB Atlas (Mongoose ORM).   
- **Cloud & DevOps:** AWS EC2, AWS S3, AWS IAM, GitHub Actions, PM2.

---

##  System Architecture

The system adheres to an MVC (Model-View-Controller) architectural pattern. The dynamic React frontend serves as the View layer and communicates natively with the Express.js REST API. The Node.js backend functions as the centralized Controller: it validates incoming requests, enforces JWT based authentication and executes transactions with the MongoDB database (Model).

To enhance the user experience, the backend seamlessly integrates with several external services. It securely verifies users via Google OAuth services, manages dynamic file uploads through AWS S3, and queries the OpenAI GPT API alongside a custom tracking algorithm to deliver highly accurate course recommendations.

**Architecture Flow:**
`React Frontend (Client) ➔ Node.js & Express.js (REST API) ➔ MongoDB (Database)`
*(External Integrations: Google OAuth, OpenAI API, AWS S3)*

---

##  Live Deployment Architecture

The full-stack application is deployed natively onto a unified cloud environment:

1. **Frontend & Backend (AWS EC2):** Both the React frontend and Node.js backend are hosted simultaneously on an Ubuntu AWS EC2 instance. Express sequentially serves the static frontend `.dist` build while handling core REST API routes.
2. **Media Storage (AWS S3):** Used exclusively to dynamically serve large user-uploaded media files (PDFs, videos), ensuring the main EC2 server bandwidth remains strictly optimized.
3. **Database (MongoDB Atlas):** Managed cloud database cluster.
4. **CI/CD (GitHub Actions):** Pushing code to the `develop` branch automatically triggers a GitHub Actions pipeline. It securely connects to the EC2 server via SSH, actively generates environment variables, builds the frontend natively, and restarts the PM2 process without manual interjection.

---

##  Local Development Setup

### Prerequisites
- Node.js (v18+)
- MongoDB URI (Atlas)
- Google Cloud Client ID 
- AWS IAM Credentials 

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
   INSTRUCTOR_SECRET=your_secret_code_for_instructor_signup
   GOOGLE_CLIENT_ID=your_google_client_id
   OPENAI_API_KEY=your_openai_api_key
   
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=ap-southeast-2
   AWS_S3_BUCKET=your_s3_uploads_bucket_name
   
   EMAIL_USER=your_gmail_address
   EMAIL_PASS=your_16_char_google_app_password
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
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`.

---

## Database Collections (MongoDB)

1. **Users:** Stores user details, hashed passwords, roles (`student` or `instructor`), and an array of `enrolledCourses` containing ObjectIDs referring to the Courses collection.
2. **Courses:** Stores course details, week-by-week curriculum, quizzes, S3 file URLs, and a reference to the Instructor.

---

##  API Endpoints Documentation

### User Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/users/register` | Register a new user & trigger OTP email | Public |
| POST | `/api/users/verify-email` | Verify 6-digit email OTP | Public |
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

### File Uploads (AWS S3)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/upload` | Upload PDF/Video to AWS S3 | Instructor |

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
