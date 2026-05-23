import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskItem = ({ task, onToggle, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColors = {
    high: "bg-red-100 text-red-600",
    medium: "bg-yellow-100 text-yellow-600",
    low: "bg-green-100 text-green-600",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm mb-3"
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing"
      >
        ⠿
      </button>

      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task._id, !task.completed)}
        className="w-4 h-4 accent-indigo-600"
      />

      <div className="flex-1">
        <p
          className={`text-sm font-medium ${task.completed
              ? "line-through text-gray-400"
              : "text-gray-700"
            }`}
        >
          {task.title}
        </p>
        <div className="flex gap-2 mt-1">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority]
              }`}
          >
            {task.priority}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
            {task.category}
          </span>
          {task.dueDate && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-500">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => onDelete(task._id)}
        className="text-sm text-red-400 hover:text-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;