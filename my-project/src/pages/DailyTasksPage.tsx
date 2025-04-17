import React, { useState} from 'react';
import { useTasks, TimeFrame } from '../hooks/useTasks';
import { DailyOverview } from '../components/dashboard/DailyOverview';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
  category: string;
  duration?: number;
  timeFrame: TimeFrame;
  dueDate?: Date;
  createdAt: Date;
}

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm, taskTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete "<span className="font-medium">{taskTitle}</span>"? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};




const DailyTasksPage: React.FC = () => {
  const { tasks, loading, updateTask, deleteTask } = useTasks();
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'pending'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  
  
  const dailyTasks = tasks.filter(task => task.timeFrame === 'daily');
  
  
  const filteredTasks = dailyTasks.filter(task => {
    const categoryMatch = selectedCategory ? task.category === selectedCategory : true;
    if (activeTab === 'all') return categoryMatch;
    if (activeTab === 'completed') return task.status === 'completed' && categoryMatch;
    if (activeTab === 'pending') return task.status !== 'completed' && categoryMatch;
    return true;
  });

  
  const categories = Array.from(
    new Set(dailyTasks.map(task => task.category))
  );

 
  const categoryTimeData = categories.map(category => {
    const tasksInCategory = dailyTasks.filter(task => task.category === category);
    const totalMinutes = tasksInCategory.reduce((total, task) => total + (task.duration || 0), 0);
    return {
      name: category,
      minutes: totalMinutes
    };
  }).filter(item => item.minutes > 0);

 
  const priorityData = [
    { name: 'Low', value: dailyTasks.filter(task => task.priority === 'low').length },
    { name: 'Medium', value: dailyTasks.filter(task => task.priority === 'medium').length },
    { name: 'High', value: dailyTasks.filter(task => task.priority === 'high').length }
  ].filter(item => item.value > 0);

 
  const getHourlyDistribution = () => {
    const hourlyData = Array(24).fill(0).map((_, index) => ({
      hour: index,
      tasks: 0
    }));

    dailyTasks.forEach(task => {
      if (task.createdAt) {
        const hour = new Date(task.createdAt).getHours();
        hourlyData[hour].tasks += 1;
      }
    });

    return hourlyData;
  };

  const hourlyData = getHourlyDistribution();

  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  const PRIORITY_COLORS = {
    low: '#00C49F',
    medium: '#FFBB28',
    high: '#FF8042'
  };

  
  const handleStatusChange = (taskId: string, newStatus: 'pending' | 'completed') => {
    updateTask(taskId, { status: newStatus });
  };

  
  const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  
  const confirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  };

  
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Daily Tasks Dashboard</h1>
      
      
      <DailyOverview timeFrame="daily" />
      
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Daily Task Insights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Time Distribution by Category</h3>
            {categoryTimeData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryTimeData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="minutes"
                    >
                      {categoryTimeData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${Math.floor(Number(value) / 60)}h ${Number(value) % 60}m`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex justify-center items-center h-64 text-gray-500">
                No time data available
              </div>
            )}
          </div>
          
          
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Task Priority Distribution</h3>
            {priorityData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={priorityData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {priorityData.map((entry, index) => {
                        const priorityKey = entry.name.toLowerCase() as keyof typeof PRIORITY_COLORS;
                        return <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[priorityKey]} />;
                      })}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex justify-center items-center h-64 text-gray-500">
                No priority data available
              </div>
            )}
          </div>
        </div>
        
       
        <div className="bg-white rounded-lg shadow p-4 mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Task Activity by Hour</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={hourlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="hour" 
                  tickFormatter={(hour) => `${hour}:00`}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(label) => `Time: ${label}:00`}
                  formatter={(value) => [`${value} tasks`, 'Count']}
                />
                <Legend />
                <Bar dataKey="tasks" name="Tasks" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      
      <div className="mt-8 ">
        <div className=" mb-4  grid  grid-rows-2 md:grid-cols-1  gap-6 ">
          <h2 className="text-xl font-semibold text-gray-700">Detailed Task List</h2>
          
          <div className="md:flex md:justify-between md:space-x-2">
            
            <select 
              className="px-3 py-2 border hidden md:block border-gray-300 rounded-md text-sm"
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  activeTab === 'all' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'pending' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('pending')}
              >
                Pending
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  activeTab === 'completed' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('completed')}
              >
                Completed
              </button>
            </div>
          </div>
        </div>
        
       
        {filteredTasks.length > 0 ? (
          <div className="bg-white shadow overflow-hidden rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <li key={task.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        checked={task.status === 'completed'}
                        onChange={(e) => handleStatusChange(
                          task.id !, 
                          e.target.checked ? 'completed' : 'pending' 
                        )}
                      />
                      <div className="ml-3">
                        <p className={`text-sm font-medium ${
                          task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'
                        }`}>
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                        )}
                        <div className="flex items-center mt-1 space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            task.priority === 'high' 
                              ? 'bg-red-100 text-red-800' 
                              : task.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-gray-500">
                            {task.category}
                          </span>
                          {task.duration && (
                            <span className="text-xs text-gray-500">
                              {Math.floor(task.duration / 60)}h {task.duration % 60}m
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      
                      <button
                        className="p-1 rounded-full text-red-600 hover:bg-red-100"
                        title="Delete task"
                        onClick={() => handleDeleteClick(task)}
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
            No tasks found for the selected filters.
          </div>
        )}
      </div>
      
      
      <div className="mt-8 bg-indigo-50 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-indigo-900 mb-2">Daily Productivity Tips</h2>
        <p className="text-indigo-700">Complete your most challenging task first thing in the morning when your energy and focus are at their peak.</p>
      </div>

      
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        taskTitle={taskToDelete?.title || ""}
      />

      
    </div>
  );
};

export default DailyTasksPage;