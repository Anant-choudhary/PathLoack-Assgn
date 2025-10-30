import React from 'react';
import { X } from 'lucide-react';
import { TaskItem } from './TaskItem';
import { TaskItem as TaskItemType } from '../types/task';

interface TaskListProps {
  tasks: TaskItemType[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <X size={48} className="mx-auto mb-3 opacity-50" />
        <p className="text-lg">No tasks found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};