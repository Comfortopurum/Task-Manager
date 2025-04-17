import React from 'react';
import { useTasks, TimeFrame } from '../../hooks/useTasks';

interface MonthlyOverviewProps {
  timeFrame: TimeFrame;
}

export const MonthlyOverview: React.FC<MonthlyOverviewProps> = ({ timeFrame }) => {
  const { tasks, loading } = useTasks();
  
  // Filter tasks based on timeFrame
  const filteredTasks = tasks.filter(task => task.timeFrame === timeFrame);
  
  // Calculate stats
  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter(task => task.status === 'completed').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Calculate average weekly tasks
  const avgWeeklyTasks = totalTasks > 0 ? (totalTasks / 4).toFixed(1) : '0';
  
  // Calculate total time spent this month
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
      <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-lg shadow-sm">
        <h3 className="text-base font-medium text-pink-800 mb-2">Monthly Tasks</h3>
        <div className="flex items-end">
          <span className="text-3xl font-bold text-pink-900">{totalTasks}</span>
          <span className="ml-2 text-sm text-pink-700">
            {completedTasks} completed / {totalTasks - completedTasks} pending
          </span>
        </div>
        <p className="text-sm text-pink-600 mt-2">Average {avgWeeklyTasks} tasks per week</p>
      </div>
      
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg shadow-sm">
        <h3 className="text-base font-medium text-orange-800 mb-2">Monthly Progress</h3>
        <div className="flex items-center">
          <span className="text-3xl font-bold text-orange-900">{completionRate}%</span>
          <div className="ml-4 w-full max-w-[150px] bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-orange-600 h-2.5 rounded-full" 
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-lg shadow-sm">
        <h3 className="text-base font-medium text-cyan-800 mb-2">Time Spent This Month</h3>
        <div className="flex items-end">
          <span className="text-3xl font-bold text-cyan-900">
            {hours}h {minutes}m
          </span>
        </div>
      </div>
    </div>
  );
};