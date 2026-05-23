import useDarkMode from "../hooks/useDarkMode";
import { useState, useEffect } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { useAuth } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import * as api from "../api/tasks";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { darkMode, toggleDarkMode } = useDarkMode();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState({ status: "all", priority: "all" });

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

    const handleAdd = async (title, priority, category, dueDate) => {
        const newTask = await api.createTask(title, priority, category, dueDate);
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

    const handleReorder = (activeId, overId) => {
        setTasks((prev) => {
            const oldIndex = prev.findIndex((t) => t._id === activeId);
            const newIndex = prev.findIndex((t) => t._id === overId);
            return arrayMove(prev, oldIndex, newIndex);
        });
    };

    // Filter and search logic
    const filteredTasks = tasks
        .filter((task) => {
            if (filter.status === "active") return !task.completed;
            if (filter.status === "completed") return task.completed;
            return true;
        })
        .filter((task) => {
            if (filter.priority !== "all") return task.priority === filter.priority;
            return true;
        })
        .filter((task) =>
            task.title.toLowerCase().includes(search.toLowerCase())
        );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Navbar */}
            <nav className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-indigo-600">Task Manager</h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        Hi, {user.name} 👋
                    </span>

                    {/* Dark mode toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-3 py-2 rounded-lg"
                    >
                        {darkMode ? "☀️ Light" : "🌙 Dark"}
                    </button>

                    <button
                        onClick={logout}
                        className="text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main content */}
            <div className="max-w-2xl mx-auto mt-10 px-4">
                <TaskForm onAdd={handleAdd} />
                <SearchBar search={search} onSearch={setSearch} />
                <FilterBar filter={filter} onFilter={setFilter} />

                {loading && (
                    <p className="text-center text-gray-400 mt-6">Loading tasks...</p>
                )}
                {error && (
                    <p className="text-center text-red-500 mt-6">{error}</p>
                )}
                {!loading && !error && (
                    <TaskList
                        tasks={filteredTasks}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                        onReorder={handleReorder}
                    />
                )}

                {/* Task count */}
                {!loading && !error && (
                    <p className="text-center text-xs text-gray-400 mt-4">
                        {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""} found
                    </p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;