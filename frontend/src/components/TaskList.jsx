import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggle, onDelete, onReorder }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      onReorder(active.id, over.id);
    }
  };

  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-10">
        No tasks found!
      </p>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tasks.map((t) => t._id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default TaskList;