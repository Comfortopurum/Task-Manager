import React from 'react';
import { useTasks, TimeFrame } from '../../hooks/useTasks';

interface DailyOverviewProps {
  timeFrame: TimeFrame;
}

export const DailyOverview: React.FC<DailyOverviewProps> = ({ timeFrame }) => {
  const { tasks, loading } = useTasks();
  
  // Filter tasks based on timeFrame
  const filteredTasks = tasks.filter(task => task.timeFrame === timeFrame);
  
  // Calculate stats
  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter(task => task.status === 'completed').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Calculate total time spent (assuming duration is in minutes)
  const totalMinutes = filteredTasks.reduce((total, task) => total + (task.duration || 0), 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-sm">
        <h3 className="text-base font-medium text-blue-800 mb-2">Daily Tasks</h3>
        <div className="flex items-end">
          <span className="text-3xl font-bold text-blue-900">{totalTasks}</span>
          <span className="ml-2 text-sm text-blue-700">
            {completedTasks} completed / {totalTasks - completedTasks} pending
          </span>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-sm">
        <h3 className="text-base font-medium text-green-800 mb-2">Completion Rate</h3>
        <div className="flex items-center">
          <span className="text-3xl font-bold text-green-900">{completionRate}%</span>
          <div className="ml-4 w-full max-w-[150px] bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-sm">
        <h3 className="text-base font-medium text-purple-800 mb-2">Time Spent Today</h3>
        <div className="flex items-end">
          <span className="text-3xl font-bold text-purple-900">
            {hours}h {minutes}m
          </span>
        </div>
      </div>
      
    </div>
  );
};