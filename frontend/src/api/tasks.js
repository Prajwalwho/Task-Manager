const BASE_URL = "http://localhost:3001/tasks";

export const fetchTasks = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

export const createTask = async (title) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
};

export const updateTask = async (id, completed) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
};

export const deleteTask = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete task");
  return res.json();
};