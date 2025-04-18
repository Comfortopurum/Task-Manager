import React, { useState } from 'react';
import { useTasks} from '../hooks/useTasks';
import { WeeklyOverview } from '../components/dashboard/WeeklyOverview';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
   PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';



const WeeklyReviewPage: React.FC = () => {
  const { tasks, loading } = useTasks();
  const [] = useState<string | null>(null);
  
  
  const weeklyTasks = tasks.filter(task => task.timeFrame === 'weekly');
  
  

  
  const categories = Array.from(
    new Set(weeklyTasks.map(task => task.category))
  );

  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  
  const getDaysOfWeek = (): string[] => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const dayOfWeek = today.getDay();
    
    
    return days.map((_, index) => {
      const day = new Date(today);
      day.setDate(today.getDate() - dayOfWeek + index);
      return `${days[index]} ${day.getDate()}`;
    });
  };

  
  const getDailyCompletionData = () => {
    const daysOfWeek = getDaysOfWeek();
    const dailyData = daysOfWeek.map(day => ({
      name: day,
      completed: 0,
      pending: 0
    }));

    
    weeklyTasks.forEach(task => {
      if (task.createdAt) {
        const taskDate = new Date(task.createdAt);
        const dayIndex = taskDate.getDay(); 
        
        if (task.status === 'completed') {
          dailyData[dayIndex].completed += 1;
        } else {
          dailyData[dayIndex].pending += 1;
        }
      }
    });

    return dailyData;
  };

  
  const getCategoryDistributionData = () => {
    const categoryData = categories.map(category => {
      const tasksInCategory = weeklyTasks.filter(task => task.category === category);
      return {
        name: category,
        value: tasksInCategory.length,
        completed: tasksInCategory.filter(task => task.status === 'completed').length
      };
    });

    return categoryData;
  };

  
  const calculateProductivityScore = () => {
    if (weeklyTasks.length === 0) return 0;
    
    const priorityWeights = {
      high: 3,
      medium: 2,
      low: 1
    };
    
    let totalPoints = 0;
    let earnedPoints = 0;
    
    weeklyTasks.forEach(task => {
      const weight = priorityWeights[task.priority as keyof typeof priorityWeights];
      totalPoints += weight;
      
      if (task.status === 'completed') {
        earnedPoints += weight;
      }
    });
    
    return Math.round((earnedPoints / totalPoints) * 100);
  };

  
  const weeklyPerformanceData = [
    { name: 'Completion Rate', value: Math.round((weeklyTasks.filter(t => t.status === 'completed').length / weeklyTasks.length) * 100) || 0 },
    { name: 'High Priority Completion', value: Math.round((weeklyTasks.filter(t => t.status === 'completed' && t.priority === 'high').length / weeklyTasks.filter(t => t.priority === 'high').length) * 100) || 0 },
    { name: 'Time Efficiency', value: 80 }, 
    { name: 'Task Distribution', value: 70 }, 
    { name: 'Consistency', value: 65 }
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Weekly Review</h1>
      
      
      <WeeklyOverview timeFrame="weekly" />
      
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Weekly Insights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Daily Task Completion</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getDailyCompletionData()}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" name="Completed" fill="#4CAF50" />
                  <Bar dataKey="pending" name="Pending" fill="#FF9800" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Category distribution */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Category Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getCategoryDistributionData()}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {getCategoryDistributionData().map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Performance Metrics</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={weeklyPerformanceData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Performance"
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
         
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Weekly Productivity Score</h3>
            <div className="flex flex-col items-center justify-center h-64">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="8"
                  />
                  
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={`${calculateProductivityScore() >= 70 ? '#4CAF50' : calculateProductivityScore() >= 40 ? '#FF9800' : '#F44336'}`}
                    strokeWidth="8"
                    strokeDasharray={`${calculateProductivityScore() * 2.83} 283`}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-4xl font-bold text-gray-700">{calculateProductivityScore()}</div>
                  <div className="text-sm text-gray-500">out of 100</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  {calculateProductivityScore() >= 80
                    ? "Excellent productivity this week!"
                    : calculateProductivityScore() >= 60
                    ? "Good progress this week!"
                    : calculateProductivityScore() >= 40
                    ? "Moderate productivity this week."
                    : "Needs improvement this week."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Weekly Goals Progress</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getCategoryDistributionData().map((category, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {category.value} tasks
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {category.completed} tasks
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full" 
                        style={{ 
                          width: `${category.value > 0 ? Math.round((category.completed / category.value) * 100) : 0}%`,
                          backgroundColor: COLORS[index % COLORS.length]
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {category.value > 0 ? Math.round((category.completed / category.value) * 100) : 0}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Previous Week Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-800">Task Completion</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-green-600">+12%</p>
              <p className="ml-2 text-sm text-green-600">from last week</p>
              </div>
            <p className="mt-2 text-sm text-green-600">
              Improved task completion rate compared to previous week
            </p>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-yellow-800">Time Spent</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-yellow-600">-5%</p>
              <p className="ml-2 text-sm text-yellow-600">from last week</p>
            </div>
            <p className="mt-2 text-sm text-yellow-600">
              Slightly less time spent with better results
            </p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800">Productivity Score</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-blue-600">+8%</p>
              <p className="ml-2 text-sm text-blue-600">from last week</p>
            </div>
            <p className="mt-2 text-sm text-blue-600">
              Overall productivity has improved
            </p>
          </div>
        </div>
      </div>
      
      
      <div className="mt-8 bg-indigo-50 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-indigo-900 mb-2">Weekly Recommendations</h2>
        <ul className="space-y-2 text-indigo-700">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Consider scheduling more high-priority tasks earlier in the week
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Your productivity drops on Wednesdays - consider adjusting your workload or adding a midweek review
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Focus on balancing tasks across categories for better overall progress
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WeeklyReviewPage;