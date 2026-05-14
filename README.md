# Pluralsight Recommend - AI Course Discovery Platform

A premium MERN-stack application designed to accelerate learning through AI-powered course matching, verified skill assessments, and dynamic learning path generation.

![Auth Preview](https://img.shields.io/badge/Status-Complete-success)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)
![JWT Auth](https://img.shields.io/badge/Auth-JWT--Secure-psorange)

## 🚀 Features

### 🔐 Secure Authentication Gateway
- **Entry point protection:** Dedicated login/register gateway for all users.
- **JWT Security:** Stateful session management with tokens valid for 7 days.
- **Bcrypt Hashing:** One-way encrypted password storage for maximum security.

### 🧠 AI-Powered Course Explorer
- **Masonry Layout:** Dynamic, visual-first grid for course discovery.
- **Contextual Matching:** Every course card features a "Match Score" calculated against your unique interest tags.
- **Deep Filtering:** Filter by difficulty (Novice to Expert), platform, and match probability.

### 🏆 Verified Skill Assessments
- **Multi-user Isolation:** Assessments are tied to individual User IDs and stored in MongoDB.
- **Skill IQ:** Dynamic scoring system with percentile ranking and proficiency levels.
- **Progress Tracking:** History of all assessments taken, with badge-style proficiency tags.

### 🗺️ Dynamic Learning Paths
- **Custom Generation:** AI synthesizes personalized learning journeys based on your career goals.
- **Step-by-Step Guidance:** Follow curated sequences of courses from Pluralsight and other top providers.
- **User Specific:** Each learner maintains their own library of generated paths.

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Tailwind CSS, Framer Motion, Lucide Icons, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas via Mongoose |
| **Security** | JSON Web Tokens (JWT), bcryptjs |
| **Styling** | Vanilla CSS + Tailwind Utility Classes |

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account (or local MongoDB)

### 1. Clone the Repository
```bash
git clone https://github.com/kavinilavuramalingam0-ui/Course-Recommendation-platform.git
cd Course-Recommendation-platform
```

### 2. Backend Configuration
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```
Seed the database with initial data:
```bash
node seed.js
```
Start the server:
```bash
npm run dev
```

### 3. Frontend Configuration
```bash
cd ../frontend
npm install
```
Start the development server:
```bash
npm run dev
```

## 📂 Project Architecture

```text
├── backend/
│   ├── controllers/    # Business logic (Auth, Paths, Assessments)
│   ├── middleware/     # JWT Auth & Error Handling
│   ├── models/         # Mongoose Schemas (User, Course, Assessment)
│   ├── routes/         # Express API Endpoints
│   ├── services/       # Recommendation & Logic engines
│   └── seed.js         # Initial Database Seeding
└── frontend/
    ├── src/
    │   ├── components/ # Atomic UI Components
    │   ├── context/    # User & Auth State Management
    │   ├── data/       # Static question banks & constants
    │   └── services/   # Axios API Client
```

## 👨‍💻 Author
**Kavinilavuramalingam**
- Build for FSD AI Workshop bootcamp.

---
*Note: This project is a functional prototype built for educational purposes, demonstrating advanced MERN stack integration and AI-driven personalization.*