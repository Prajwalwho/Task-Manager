# Task Manager

A simple full stack Task Manager app built with React (frontend) and Node.js + Express (backend).

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js, Express
- **Storage**: In-memory (resets on server restart)

## Project Structure

task-manager/
├── backend/
│   └── src/
│       ├── index.js
│       ├── routes/tasks.js
│       └── store/taskStore.js
└── frontend/
└── src/
├── api/tasks.js
├── components/
│   ├── TaskForm.jsx
│   ├── TaskItem.jsx
│   └── TaskList.jsx
└── App.jsx

## Setup & Run

### Option 1 — Run both together (from root folder)

```bash
npm install
npm run dev
```

### Option 2 — Run separately

Terminal 1 (backend):
```bash
cd backend
npm install
node src/index.js
```

Terminal 2 (frontend):
```bash
cd frontend
npm install
npm run dev
```

- Frontend runs at: http://localhost:5173  
- Backend runs at: http://localhost:3001

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tasks | Get all tasks |
| POST | /tasks | Create a task |
| PATCH | /tasks/:id | Toggle completed |
| DELETE | /tasks/:id | Delete a task |

## Assumptions & Trade-offs

- Used in-memory storage instead of a database to keep setup simple
- No authentication as it was not required
- Focused on clean structure and working functionality over styling