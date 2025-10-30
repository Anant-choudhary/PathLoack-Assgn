import React, { useState, useEffect } from 'react';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { FilterTabs } from './components/FilterTabs';
import { taskService } from './services/taskService';
import { TaskItem, FilterType } from './types/task';

export default function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setIsLoading(true);
    const fetchedTasks = await taskService.getTasks();
    setTasks(fetchedTasks);
    setIsLoading(false);
  };

  const handleAddTask = async (description: string) => {
    const newTask = await taskService.addTask(description);
    if (newTask) {
      setTasks([...tasks, newTask]);
    }
  };

  const handleToggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updatedTask = await taskService.updateTask(id, {
      isComplete: !task.isComplete
    });

    if (updatedTask) {
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    }
  };

  const handleDeleteTask = async (id: string) => {
    const success = await taskService.deleteTask(id);
    if (success) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.isComplete;
    if (filter === 'completed') return task.isComplete;
    return true;
  });

  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.isComplete).length,
    completed: tasks.filter((t) => t.isComplete).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Task Manager</h1>

          <TaskInput onAdd={handleAddTask} />

          <FilterTabs
            filter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />

          {isLoading ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">Loading tasks...</p>
            </div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          )}
        </div>
      </div>
    </div>
  );
}