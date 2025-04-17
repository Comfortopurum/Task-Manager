import React from 'react';
import { TaskItem } from './TaskItem';
import { useTasks, TimeFrame } from '../../hooks/useTasks';

interface TaskListProps {
  timeFrame: TimeFrame;
}

export const TaskList: React.FC<TaskListProps> = ({ timeFrame }) => {
  const { tasks, loading } = useTasks();

  // Filter tasks based on the timeFrame property
  const filteredTasks = tasks.filter(task => task.timeFrame === timeFrame);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <p className="text-gray-500">No tasks for this {timeFrame} view yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-lg font-medium text-gray-900 mb-2">
        {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Tasks
      </h2>
      
        
        <div className="divide-y divide-gray-200">
          {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      
    </div>
  );
};