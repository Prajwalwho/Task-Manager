import { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      setError("Task title cannot be empty");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await onAdd(title);
      setTitle(""); // clear input after success
    } catch {
      setError("Failed to add task. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TaskForm;