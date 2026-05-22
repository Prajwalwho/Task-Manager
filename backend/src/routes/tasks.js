const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const protect = require("../middleware/auth");

// Protect all routes below
router.use(protect);

// GET /tasks — get all tasks for logged in user
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
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

    const task = await Task.create({
      user: req.user._id,
      title,
      priority,
      category,
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// PATCH /tasks/:id — update task
router.patch("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const { completed, title, priority, category, dueDate } = req.body;

    if (completed !== undefined) task.completed = completed;
    if (title) task.title = title;
    if (priority) task.priority = priority;
    if (category) task.category = category;
    if (dueDate) task.dueDate = dueDate;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE /tasks/:id — delete a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
