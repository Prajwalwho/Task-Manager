#  Task Manager

A simple **full-stack Task Manager application** built as a technical assignment to demonstrate frontend and backend development skills.

The application allows users to **create, view, update, and delete tasks** with clean API integration, validation, and error handling.

---

##  Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Storage:** In-memory storage (data resets when backend restarts)

---

##  Project Structure

```text
task-manager/
├── backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/
│   │   │   └── tasks.js
│   │   └── store/
│   │       └── taskStore.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── tasks.js
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   └── TaskList.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

##  Features

- View all tasks
- Add a new task
- Mark task as completed / incomplete
- Delete a task
- Loading state handling
- Error state handling
- Input validation
- REST API integration

---

##  Setup & Run

### Option 1 — Run both from root (if configured)

```bash
npm install
npm run dev
```

---

### Option 2 — Run separately (recommended)

### Terminal 1 — Backend

```bash
cd backend
npm install
node src/index.js
```

Backend runs at:

```text
http://localhost:3001
```

---

### Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a new task |
| PATCH | `/tasks/:id` | Update task completion status |
| DELETE | `/tasks/:id` | Delete a task |

---

##  Task Data Model

```json
{
  "id": "unique-id",
  "title": "Complete assignment",
  "completed": false,
  "createdAt": "2026-04-11T12:00:00.000Z"
}
```

---

##  Assumptions & Trade-offs

- Used **in-memory storage** to keep the assignment intentionally small and quick to run
- No database integration was added as it was optional
- No authentication was implemented since it was not part of the requirements
- Focused more on **clean code structure, API design, and functionality** than advanced UI styling

---

##  Notes

This project was built with the goal of demonstrating:

- component-based frontend structure
- state management
- RESTful API design
- clean backend routing
- validation and error handling
- separation of concerns

---