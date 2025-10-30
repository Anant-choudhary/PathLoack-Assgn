import React from 'react';
import { Trash2, Check } from 'lucide-react';
import { TaskItem as TaskItemType } from '../types/task';

interface TaskItemProps {
  task: TaskItemType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <button
        onClick={() => onToggle(task.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          task.isComplete
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-green-500'
        }`}
      >
        {task.isComplete && <Check size={16} className="text-white" />}
      </button>
      
      <span
        className={`flex-1 ${
          task.isComplete
            ? 'text-gray-400 line-through'
            : 'text-gray-800'
        }`}
      >
        {task.description}
      </span>
      
      <button
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        aria-label="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};