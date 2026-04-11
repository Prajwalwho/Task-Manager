const { v4: uuidv4 } = require("uuid");

let tasks = [];

const getAllTasks = () => tasks;

const createTask = (title) => {
  const task = {
    id: uuidv4(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
};

const updateTask = (id, completed) => {
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  task.completed = completed;
  return task;
};

const deleteTask = (id) => {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
