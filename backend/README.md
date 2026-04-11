# Task Manager — Backend

## Setup

cd backend
npm install

## Run

node src/index.js

Server starts at http://localhost:3001

## API Endpoints

| Method | Endpoint      | Description        |
|--------|---------------|--------------------|
| GET    | /tasks        | Get all tasks      |
| POST   | /tasks        | Create a task      |
| PATCH  | /tasks/:id    | Update completed   |
| DELETE | /tasks/:id    | Delete a task      |

## Notes
- In-memory storage (resets on server restart)
- No database needed for this exercise