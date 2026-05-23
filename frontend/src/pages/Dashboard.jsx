import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import * as api from "../api/tasks";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const data = await api.fetchTasks();
                setTasks(data);
            } catch (_err) {
                setError("Could not load tasks. Is the server running?");
            } finally {
                setLoading(false);
            }
        };
        loadTasks();
    }, []);

    const handleAdd = async (title) => {
        const newTask = await api.createTask(title);
        setTasks((prev) => [newTask, ...prev]);
    };

    const handleToggle = async (id, completed) => {
        const updated = await api.updateTask(id, { completed });
        setTasks((prev) =>
            prev.map((task) => (task._id === id ? updated : task))
        );
    };

    const handleDelete = async (id) => {
        await api.deleteTask(id);
        setTasks((prev) => prev.filter((task) => task._id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-indigo-600">Task Manager</h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">Hi, {user.name} 👋</span>
                    <button
                        onClick={logout}
                        className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main content */}
            <div className="max-w-2xl mx-auto mt-10 px-4">
                <TaskForm onAdd={handleAdd} />
                {loading && (
                    <p className="text-center text-gray-400 mt-6">Loading tasks...</p>
                )}
                {error && (
                    <p className="text-center text-red-500 mt-6">{error}</p>
                )}
                {!loading && !error && (
                    <TaskList
                        tasks={tasks}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                    />
                )}
            </div>
        </div>
    );
};

export default Dashboard;