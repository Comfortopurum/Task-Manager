import React, { useState } from 'react';
import { TaskForm } from '../components/tasks/TaskForm';
import { TaskList } from '../components/tasks/TaskList';
import { DailyOverview } from '../components/dashboard/DailyOverview';
import { WeeklyOverview } from '../components/dashboard/WeeklyOverview';
import { MonthlyOverview } from '../components/dashboard/MonthlyOverview';
import { TimeFrame } from '../hooks/useTasks';

export const Dashboard: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('daily');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      <div className="py-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h2 className="text-lg font-medium text-white mb-4 md:mb-0">Time Tracking Overview</h2>
              <div className="flex flex-wrap gap-2">
                {(['daily', 'weekly', 'monthly'] as TimeFrame[]).map((frame) => (
                  <button
                    key={frame}
                    onClick={() => setTimeFrame(frame)}
                    className={`px-3 py-1 text-sm rounded-md focus:outline-none ${
                      timeFrame === frame
                        ? 'bg-white text-indigo-700'
                        : 'text-white bg-indigo-700 bg-opacity-20 hover:bg-opacity-30'
                    }`}
                  >
                    {frame.charAt(0).toUpperCase() + frame.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6">
            {timeFrame === 'daily' && <DailyOverview timeFrame="daily" />}
            {timeFrame === 'weekly' && <WeeklyOverview timeFrame="weekly" />}
            {timeFrame === 'monthly' && <MonthlyOverview timeFrame="monthly" />}
          </div>
        </div>

        <div className="mt-8">
          <TaskForm timeFrame={timeFrame} />
          <TaskList timeFrame={timeFrame} />
        </div>
      </div>
    </div>
  );
};