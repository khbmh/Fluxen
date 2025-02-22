import { useContext, useState, useEffect } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DataContext } from '../contexts/Data';
// import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique ID generation

// Task Component
const Task = ({ task, onEdit, onDelete, onMove }) => {
  const { isDark } = useContext(DataContext);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 ${
        isDark ? 'bg-blue-100' : 'bg-slate-600'
      } m-2 rounded-md cursor-grab active:cursor-grabbing`}
    >
      <h3 className="font-bold">{task.title}</h3>
      <p className="text-sm">{task.description}</p>
      <p className="text-xs text-gray-500 mt-2">
        Created: {new Date(task.timestamp).toLocaleString()}
      </p>
      <div className="mt-2 flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)} // Correctly passing the task ID
          className="text-sm bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
        <select
          value={task.status}
          onChange={(e) => onMove(task.id, e.target.value)} // Correctly passing the task ID
          className="text-sm bg-green-500 text-white px-2 py-1 rounded"
        >
          <option value="todo">To-Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
};

// Column Component
const Column = ({ title, status, tasks, onEdit, onDelete, onMove }) => {
  const { isDark } = useContext(DataContext);
  return (
    <div
      className={`flex-1 ${
        isDark ? 'bg-gray-100' : 'bg-slate-800'
      } p-4 rounded-md`}
      data-status={status}
    >
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onMove={onMove}
          />
        ))}
      </SortableContext>
    </div>
  );
};

// Main KanbanBoard Component
export default function KanbanBoard() {
  const { isDark } = useContext(DataContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'todo',
  });
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;
    const task = {
      // id: uuidv4(), // Generate a unique ID
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      timestamp: Date.now(),
    };
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    setNewTask({ title: '', description: '', status: 'todo' });
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const saveEdit = () => {
    if (!newTask.title.trim()) return;
    const updatedTasks = tasks.map((task) =>
      task.id === editTask.id ? { ...task, ...newTask } : task,
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    setEditTask(null);
    setNewTask({ title: '', description: '', status: 'todo' });
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const moveTask = (id, status) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status } : task,
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    const newStatus = over.data.current?.status || over.id;

    const updatedTasks = tasks.map((task) =>
      task.id === activeTask.id ? { ...task, status: newStatus } : task,
    );

    const newOrder = arrayMove(
      updatedTasks,
      tasks.findIndex((task) => task.id === active.id),
      tasks.findIndex((task) => task.id === over.id),
    );

    setTasks(newOrder);
    saveTasksToLocalStorage(newOrder);
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
      <div className="flex flex-col lg:flex-row gap-4 p-4">
        <div className="w-full lg:w-1/3">
          <h2 className="text-lg font-bold mb-2">Add/Edit Task</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title (required)"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              maxLength={50}
              className={`w-full ${
                isDark ? 'bg-white border-black' : 'bg-black border-white'
              } p-2 mb-2 border rounded`}
            />
            <textarea
              placeholder="Description (optional)"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              maxLength={200}
              className={`w-full ${
                isDark ? 'bg-white border-black' : 'bg-black border-white'
              } p-2 mb-2 border rounded`}
            />
            <select
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
              className={`w-full ${
                isDark ? 'bg-white border-black' : 'bg-black border-white'
              } p-2 mb-2 border rounded`}
            >
              <option value="todo">To-Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            {editTask ? (
              <button
                onClick={saveEdit}
                className="w-full bg-green-500 text-white p-2 rounded"
              >
                Save Edit
              </button>
            ) : (
              <button
                onClick={addTask}
                className="w-full bg-blue-500 text-white p-2 rounded"
              >
                Add Task
              </button>
            )}
          </div>
        </div>
        <Column
          title="To-Do"
          status="todo"
          tasks={tasks.filter((t) => t.status === 'todo')}
          onEdit={handleEdit}
          onDelete={deleteTask}
          onMove={moveTask}
        />
        <Column
          title="In Progress"
          status="in-progress"
          tasks={tasks.filter((t) => t.status === 'in-progress')}
          onEdit={handleEdit}
          onDelete={deleteTask}
          onMove={moveTask}
        />
        <Column
          title="Done"
          status="done"
          tasks={tasks.filter((t) => t.status === 'done')}
          onEdit={handleEdit}
          onDelete={deleteTask}
          onMove={moveTask}
        />
      </div>
    </DndContext>
  );
}
