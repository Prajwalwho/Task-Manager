const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET /tasks — get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// POST /tasks — create a new task
router.post("/", async (req, res) => {
  try {
    const { title, priority, category, dueDate } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    const task = await Task.create({ title, priority, category, dueDate });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// PATCH /tasks/:id — update task
router.patch("/:id", async (req, res) => {
  try {
    const { completed, title, priority, category, dueDate } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed, title, priority, category, dueDate },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE /tasks/:id — delete a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;