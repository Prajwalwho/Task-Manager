# Task Manager

A production-ready full-stack Task Manager application built with React, Node.js, Express, and MongoDB.

This project started as a basic internship assignment and was extended into a complete full-stack application with authentication, drag & drop functionality, filtering, dark mode, and Docker support.

The goal of this project was not just to implement CRUD operations, but to build and structure the application like a real-world production-style product.

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Context API
- dnd-kit

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Authentication & Security

- JWT (jsonwebtoken)
- bcryptjs

## DevOps

- Docker
- docker-compose

---

# Project Structure

```text
Task_Manager/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── Task.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── tasks.js
│   │   └── index.js
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── tasks.js
│   │   ├── components/
│   │   │   ├── FilterBar.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   └── TaskList.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useDarkMode.js
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

# Features

## Authentication & Security

- JWT based authentication
- Secure password hashing using bcrypt
- Protected routes for authenticated users only
- User-specific private task data

## Task Management

- Create, update, delete, and complete tasks
- Task priority levels (High / Medium / Low)
- Task categories and due dates
- Real-time search functionality
- Status filtering (All / Active / Completed)
- Priority filtering

## User Experience

- Drag & drop task reordering
- Responsive UI
- Persistent dark mode
- Loading and error state handling
- Clean dashboard interface

## DevOps & Deployment

- Dockerized frontend and backend
- Multi-container setup using docker-compose
- MongoDB Atlas cloud database
- Environment variable configuration

---

# Architecture Overview

```text
React Frontend
       ↓
Express REST API
       ↓
MongoDB Atlas Database
```

---

# Setup & Run

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Docker Desktop
- MongoDB Atlas account

---

## Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
PORT=3001
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## Option 1 — Run with Docker (Recommended)

From the project root folder:

```bash
docker-compose up --build
```

Frontend:

```txt
http://localhost:5173
```

Backend:

```txt
http://localhost:3001
```

To stop containers:

```bash
docker-compose down
```

---

## Option 2 — Run Manually

### Backend

```bash
cd backend
npm install
node src/index.js
```

Backend runs at:

```txt
http://localhost:3001
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```txt
http://localhost:5173
```

---

# API Endpoints

## Authentication Routes

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| POST   | `/auth/register` | Register a new user         |
| POST   | `/auth/login`    | Login and receive JWT token |

---

## Task Routes (Protected)

Requires:

```txt
Authorization: Bearer <token>
```

| Method | Endpoint     | Description                      |
| ------ | ------------ | -------------------------------- |
| GET    | `/tasks`     | Get all tasks for logged-in user |
| POST   | `/tasks`     | Create a new task                |
| PATCH  | `/tasks/:id` | Update a task                    |
| DELETE | `/tasks/:id` | Delete a task                    |

---

# Task Data Model

```json
{
  "_id": "mongodb-object-id",
  "user": "user-object-id",
  "title": "Complete assignment",
  "completed": false,
  "priority": "high",
  "category": "Work",
  "dueDate": "2026-06-01T00:00:00.000Z",
  "createdAt": "2026-05-24T12:00:00.000Z",
  "updatedAt": "2026-05-24T12:00:00.000Z"
}
```

---

# Engineering Concepts Demonstrated

- Full-stack application architecture
- REST API design
- JWT authentication and route protection
- MongoDB schema design using Mongoose
- React component-based architecture
- Global state management with Context API
- Custom React hooks
- Secure password hashing
- Docker containerization
- Environment-based configuration
- Separation of concerns
- Responsive UI development

---

# Assumptions & Trade-offs

- MongoDB Atlas was used instead of local MongoDB for easier setup and cloud persistence
- JWT tokens expire after 7 days
- Drag & drop ordering is currently managed locally and is not persisted in the database
- Context API was used instead of Redux to keep state management lightweight
- Focus was placed on clean architecture and maintainability over complex animations

---

# Future Improvements

- Persist drag & drop ordering in the database
- Add pagination for large task lists
- Add refresh token authentication
- Add unit and integration testing
- Add CI/CD pipeline using GitHub Actions
- Add task collaboration and sharing
- Add real-time updates using Socket.IO
- Add analytics dashboard

---

# What This Project Demonstrates

This project demonstrates the ability to:

- Design and build a complete full-stack application
- Implement authentication and authorization securely
- Structure scalable frontend and backend architecture
- Build reusable and maintainable React components
- Work with cloud databases and REST APIs
- Dockerize and configure applications for deployment
- Apply clean software engineering practices

---

# Author

Prajwal Singh
