
import { useContext, useState } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DataContext } from '../contexts/Data';

const Task = ({ task }) => {
  const { isDark } = useContext(DataContext);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-2 ${
        isDark ? 'bg-gray-300' : 'bg-slate-600'
      } m-2 shadow-md rounded-md cursor-pointer`}
    >
      {task.text}
    </div>
  );
};

const Column = ({ title, status, tasks }) => {
  const { isDark } = useContext(DataContext);
  return (
    <div
      className={`w-full lg:w-1/3 ${
        isDark ? 'bg-gray-400' : 'bg-slate-800'
      } p-4 rounded-md`}
      data-status={status}
    >
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', status: 'todo' },
    { id: 2, text: 'Task 2', status: 'todo' },
    { id: 3, text: 'Task 3', status: 'in-progress' },
    { id: 4, text: 'Task 4', status: 'in-progress' },
    { id: 5, text: 'Task 5', status: 'done' },
    { id: 6, text: 'Task 6', status: 'done' },
  ]);

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    const overColumn = over.data.current?.status
      ? over
      : document.querySelector(`[data-status="${over.id}"]`);
    const newStatus = overColumn?.getAttribute('data-status');

    setTasks((prevTasks) => {
      if (newStatus && activeTask.status !== newStatus) {
        // Move task to a different column and update its status
        const updatedTasks = prevTasks.map((task) =>
          task.id === active.id ? { ...task, status: newStatus } : task,
        );
        return arrayMove(
          updatedTasks,
          prevTasks.findIndex((task) => task.id === active.id),
          prevTasks.findIndex((task) => task.id === over.id),
        );
      } else {
        // Reorder tasks within the same column
        const oldIndex = prevTasks.findIndex((task) => task.id === active.id);
        const newIndex = prevTasks.findIndex((task) => task.id === over.id);
        return arrayMove(prevTasks, oldIndex, newIndex);
      }
    });
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
      <div className="flex flex-col lg:flex-row gap-4 p-4">
        <Column
          title="To-Do"
          status="todo"
          tasks={tasks.filter((t) => t.status === 'todo')}
        />
        <Column
          title="In Progress"
          status="in-progress"
          tasks={tasks.filter((t) => t.status === 'in-progress')}
        />
        <Column
          title="Done"
          status="done"
          tasks={tasks.filter((t) => t.status === 'done')}
        />
      </div>
    </DndContext>
  );
}
