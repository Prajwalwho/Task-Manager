import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import * as api from "./api/tasks";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all tasks on page load
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await api.fetchTasks();
        setTasks(data);
      } catch{
        setError("Could not load tasks. Is the server running?");
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const handleAdd = async (title) => {
    const newTask = await api.createTask(title);
    setTasks((prev) => [...prev, newTask]);
  };

  const handleToggle = async (id, completed) => {
    const updated = await api.updateTask(id, completed);
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? updated : task))
    );
  };

  const handleDelete = async (id) => {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm onAdd={handleAdd} />
      {loading && <p className="loading">Loading tasks...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default App;