import React, { useState } from 'react';
import { useTasks, TimeFrame } from '../hooks/useTasks';
import { MonthlyOverview } from '../components/dashboard/MonthlyOverview';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

// Task type definition (expand as needed based on your actual Task type)
interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  category: string;
  duration?: number;
  timeFrame: TimeFrame;
  dueDate?: Date;
  createdAt: Date;
}

// Mock achievement data
interface Achievement {
  id: string;
  title: string;
  description: string;
  date: Date;
  icon: string;
}

const MonthlyStatsPage: React.FC = () => {
  const { tasks, loading } = useTasks();
  const [selectedView, setSelectedView] = useState<'overview' | 'categories' | 'trends'>('overview');
  
  // Filter tasks for monthly timeframe
  const monthlyTasks = tasks.filter(task => task.timeFrame === 'monthly');
  
  // Get current month name
  const getCurrentMonth = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[new Date().getMonth()];
  };
  
  // Get unique categories
  const categories = Array.from(
    new Set(monthlyTasks.map(task => task.category))
  );

  // Chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  // Generate weekly data for the current month
  const getWeeklyData = () => {
    // This is a simplified example - in a real app you'd calculate actual weeks
    return [
      { name: 'Week 1', completed: 8, pending: 2, duration: 480 },
      { name: 'Week 2', completed: 10, pending: 3, duration: 540 },
      { name: 'Week 3', completed: 7, pending: 5, duration: 420 },
      { name: 'Week 4', completed: 12, pending: 1, duration: 660 },
    ];
  };

  // Generate category distribution data
  const getCategoryData = () => {
    return categories.map(category => {
      const tasksInCategory = monthlyTasks.filter(task => task.category === category);
      return {
        name: category,
        value: tasksInCategory.length,
        completed: tasksInCategory.filter(task => task.status === 'completed').length,
        duration: tasksInCategory.reduce((total, task) => total + (task.duration || 0), 0)
      };
    });
  };

  // Generate productivity trend data
  const getProductivityTrendData = () => {
    // This is a simplified example - in a real app you'd calculate actual days
    const days = [];
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    
    for (let i = 1; i <= daysInMonth; i++) {
      // Generate some random data for this example
      const completionRate = Math.floor(Math.random() * 40) + 60; // 60-100%
      days.push({
        day: i,
        completionRate
      });
    }
    
    return days;
  };
  
  // Mock monthly achievements
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Productivity Master',
      description: 'Completed 50 tasks this month',
      date: new Date(),
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      id: '2',
      title: 'Category Champion',
      description: 'Completed all tasks in the Work category',
      date: new Date(),
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      id: '3',
      title: 'Consistent Performer',
      description: 'Maintained 80%+ completion rate for 3 weeks',
      date: new Date(),
      icon: 'M13 10V3L4 14h7v7l9-11h-7z'
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{getCurrentMonth()} Statistics</h1>
        
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              selectedView === 'overview' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedView('overview')}
          >
            Overview
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              selectedView === 'categories' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedView('categories')}
          >
            Categories
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              selectedView === 'trends' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedView('trends')}
          >
            Trends
          </button>
        </div>
      </div>
      
      {/* Overview component */}
      <MonthlyOverview timeFrame="monthly" />
      
      {/* Main content based on selected view */}
      {selectedView === 'overview' && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Performance</h2>
          
          {/* Weekly comparison chart */}
          <div className="bg-white rounded-lg shadow p-4 mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Weekly Progress</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getWeeklyData()}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="completed" name="Completed Tasks" fill="#8884d8" />
                  <Bar yAxisId="left" dataKey="pending" name="Pending Tasks" fill="#82ca9d" />
                  <Line yAxisId="right" type="monotone" dataKey="duration" name="Time Spent (min)" stroke="#ff7300" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Achievements section */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Monthly Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {achievements.map(achievement => (
                <div key={achievement.id} className="bg-indigo-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="bg-indigo-100 rounded-full p-2 mr-3">
                      <svg 
                        className="h-6 w-6 text-indigo-600" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={achievement.icon} />
                      </svg>
                    </div>
                    <h4 className="text-base font-medium text-indigo-800">{achievement.title}</h4>
                  </div>
                  <p className="text-sm text-indigo-600 ml-11">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Month highlights */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Month Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-base font-medium text-gray-700 mb-2">Most Productive Day</h4>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg 
                      className="h-8 w-8 text-green-600 mr-3" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="text-xl font-semibold text-green-800">April 12</div>
                      <div className="text-sm text-green-600">8 tasks completed in one day</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-base font-medium text-gray-700 mb-2">Most Efficient Category</h4>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg 
                      className="h-8 w-8 text-blue-600 mr-3" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                    <div>
                      <div className="text-xl font-semibold text-blue-800">Work</div>
                      <div className="text-sm text-blue-600">95% completion rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {selectedView === 'categories' && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Category Analysis</h2>
          
          {/* Category distribution pie chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Task Distribution by Category</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getCategoryData()}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {getCategoryData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} tasks`, 'Count']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Time Spent by Category</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getCategoryData()}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="duration"
                    >
                      {getCategoryData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${Math.floor(Number(value) / 60)}h ${Number(value) % 60}m`, 'Duration']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Category detailed table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Tasks</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Spent</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getCategoryData().map((category, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.completed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full max-w-48 bg-gray-200 rounded-full h-2.5 mr-2">
                          <div 
                            className="h-2.5 rounded-full" 
                            style={{ 
                              width: `${category.value > 0 ? Math.round((category.completed / category.value) * 100) : 0}%`,
                              backgroundColor: COLORS[index % COLORS.length]
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {category.value > 0 ? Math.round((category.completed / category.value) * 100) : 0}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {Math.floor(category.duration / 60)}h {category.duration % 60}m
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {selectedView === 'trends' && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Trends</h2>
          
          {/* Daily productivity trend */}
          <div className="bg-white rounded-lg shadow p-4 mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Daily Completion Rate</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={getProductivityTrendData()}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 100]} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip formatter={(value) => [`${value}%`, 'Completion Rate']} />
                  <Area 
                    type="monotone" 
                    dataKey="completionRate" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#colorCompletion)" 
                    name="Completion Rate"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Month-to-month comparison */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Month-to-Month Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-purple-800 mb-2">Tasks Completed</h4>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-purple-900">42</span>
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    +12% from March
                  </span>
                </div>
              </div>
              
              <div className="bg-pink-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-pink-800 mb-2">Average Completion Rate</h4>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-pink-900">78%</span>
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    +5% from March
                  </span>
                </div>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-amber-800 mb-2">Total Time Spent</h4>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-amber-900">38h 25m</span>
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">
                    -3% from March
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recommendations based on trends */}
          <div className="bg-indigo-50 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-indigo-900 mb-4">Insights & Recommendations</h3>
            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-base font-medium text-indigo-800">Productivity Trend</h4>
                  <p className="mt-1 text-sm text-indigo-700">
                    Your productivity has steadily increased throughout the month, with the highest rates in the final week.
                    Consider maintaining your current workflow structure.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-base font-medium text-indigo-800">Time Efficiency</h4>
                  <p className="mt-1 text-sm text-indigo-700">
                    You're completing more tasks while spending less time - a sign of increased efficiency.
                    Your most efficient category is "Work" - consider applying similar techniques to other categories.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-base font-medium text-indigo-800">Category Balance</h4>
                  <p className="mt-1 text-sm text-indigo-700">
                    The "Personal" category shows lower completion rates. Consider allocating more time to personal tasks
                    next month or breaking them down into smaller, more manageable subtasks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyStatsPage;