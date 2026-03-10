
# 🚀 Dev Social

A full-stack social media application built using the MERN stack (MongoDB, Express.js, React, Node.js) with real-time features and modern authentication mechanisms.

> This project started as a CRUD practice application and evolved into a feature-rich social platform with authentication, authorization, real-time notifications, follow system, and personalized dashboards.

---

## 📌 Overview

**Dev Social** allows users to:

* Create and manage posts (with image + caption)
* Like posts
* Follow / Unfollow other users
* Receive real-time notifications for likes and follows
* View other user profiles
* Manage their own personalized dashboard

The project follows a structured **MVC architecture** in the backend and uses **Context API** for frontend state management.

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Context API (State Management)
* Axios
* Socket.io Client

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose ODM)
* JWT (Authentication)
* bcryptjs (Password Hashing)
* Firebase (Google Authentication)
* Multer (Image handling)
* Socket.io (Real-time notifications)

---

## 🏗 Backend Architecture (MVC Pattern)

```
server/
 └── src/
     ├── controllers/
     ├── models/
     ├── routes/
     ├── middleware/
     ├── services/
     ├── utils/
     ├── DB/
     └── app.js
server.js (Server entry point)
```

### Architecture Highlights

* **Controllers** → Business logic handling
* **Models** → Mongoose schemas (User, Post, Notification)
* **Routes** → API endpoint definitions
* **Middleware** → JWT Authentication (isAuth)
* **Utils/Services** → Token generation, Firebase admin setup, storage handling
* **app.js** → Express app setup, global middleware, socket configuration
* **server.js** → Server initialization & listening

This separation ensures scalability, maintainability, and clean code structure.

---

## 🔐 Authentication & Authorization

Implemented:

* ✅ Local Authentication (Email + Password)

  * Password hashed using bcryptjs
  * JWT-based authorization
* ✅ Google Authentication (Firebase)
* ✅ Protected Routes using custom `isAuth` middleware
* ✅ Role-based access control for secured endpoints

---

## ✨ Core Features

### 📝 Post Management

* Create Post (Image + Caption)
* Update Post
* Delete Post
* View all posts (Feed)
* View single post

### ❤️ Like System

* Like / Unlike post
* Prevent duplicate likes
* Real-time notification to post owner

### 👥 Follow System

* Follow / Unfollow users
* Followers & Following count
* Real-time notification on follow

### 🔔 Real-Time Notifications

* Like notifications
* Follow notifications
* Socket.io integration for instant updates

### 👤 User Profiles

* View other users’ profiles
* View posts created by specific user
* Follow directly from profile
* View followers & following list

### 📊 Personalized Dashboard

Each user has:

* Their own posts
* Profile information
* Total post count
* Followers count
* Following count

---

## 🔄 Real-Time Functionality

Implemented using **Socket.io**:

* Instant like notifications
* Instant follow notifications
* Live updates without page refresh

This enhances user engagement and simulates real social media behavior.

---

## 🧠 Key Learning & Challenges Solved

* Implemented full JWT-based authentication flow
* Managed secure password hashing & token generation
* Integrated Google OAuth using Firebase
* Designed MongoDB schemas for relational-like user-post interactions
* Handled real-time communication using Socket.io
* Prevented duplicate likes & optimized follow/unfollow logic
* Structured backend using MVC for scalability
* Used AI tools as a debugging and productivity assistant to resolve edge cases and improve development speed

---

## 📂 Frontend Structure

```
client/
 └── src/
     ├── components/
     ├── pages/
     ├── context/
     ├── utils/
     ├── socket.js
     ├── App.jsx
```

### Frontend Highlights

* Context API for:

  * Auth state
  * Posts state
  * Notifications state
* Axios instance with centralized configuration
* Reusable components (FeedPost, Sidebar, Header, etc.)
* Clean and responsive UI using Tailwind CSS

---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd dev-social
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FIREBASE_CONFIG=your_firebase_config


# firebase environment varialbles
FIREBASE_PROJECT_ID = your_firebase_project_id
FIREBASE_CLIENT_EMAIL = your_firebase_client_email
FIREBASE_PRIVATE_KEY = your firebase_private_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

### 4 create .env.example

```
VITE_FIREBASE_APIKEY=your_key_here
VITE_BACKEND_URL=your_backend_url
```

---

## 📈 Future Improvements

* Pagination & Infinite Scroll
* Comment System
* Media optimization
* Deployment (Docker + CI/CD)
* Redis caching for notifications
* Role-based permissions extension

---

## 🎯 Why This Project Matters

This project demonstrates:

* Strong understanding of full-stack development
* Authentication & authorization implementation
* Real-time systems using WebSockets
* Clean backend architecture (MVC)
* State management in React
* Scalable project structuring

---

## 👨‍💻 Author - Suraj Kumar

Built independently as a hands-on full-stack learning project, evolving feature by feature from basic CRUD to a real-time social media system.

---

## 👨‍💻 live link:-
https://devsocial-orpin.vercel.app/

---
