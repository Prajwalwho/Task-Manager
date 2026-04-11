const express = require("express");
const router = express.Router();
const store = require("../store/taskStore");

// GET /tasks — return all tasks
router.get("/", (req, res) => {
  const tasks = store.getAllTasks();
  res.json(tasks);
});

// POST /tasks — create a new task
router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const task = store.createTask(title);
  res.status(201).json(task);
});

// PATCH /tasks/:id — mark task as complete or incomplete
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (typeof completed !== "boolean") {
    return res.status(400).json({ error: "completed must be a boolean" });
  }

  const task = store.updateTask(id, completed);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

// DELETE /tasks/:id — delete a task
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deleted = store.deleteTask(id);

  if (!deleted) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json({ message: "Task deleted successfully" });
});

module.exports = router;