import React, { useState } from 'react';
import { useTasks, TimeFrame, TaskPriority, TaskCategory } from '../../hooks/useTasks';
import { Timestamp } from 'firebase/firestore';

interface TaskFormProps {
  timeFrame: TimeFrame;
}

export const TaskForm: React.FC<TaskFormProps> = ({ timeFrame }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [category, setCategory] = useState<TaskCategory>('personal');
  const [duration, setDuration] = useState<number>(0); // Duration in minutes
  
  // Time-based fields
  const [startTime, setStartTime] = useState('');
  const [startAmPm, setStartAmPm] = useState('AM');
  const [endTime, setEndTime] = useState('');
  const [endAmPm, setEndAmPm] = useState('AM');
  
  // Week-based fields (for weekly timeframe)
  const [startDay, setStartDay] = useState('Monday');
  const [endDay, setEndDay] = useState('Friday');
  
  // Month-based fields (for monthly timeframe)
  const [startWeek, setStartWeek] = useState('First');
  const [endWeek, setEndWeek] = useState('Second');
  
  const { addTask } = useTasks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    let timeInfo = {};
    
    if (timeFrame === 'daily') {
      timeInfo = {
        startTime: `${startTime} ${startAmPm}`,
        endTime: `${endTime} ${endAmPm}`,
      };
    } else if (timeFrame === 'weekly') {
      timeInfo = {
        startDay,
        endDay,
      };
    } else if (timeFrame === 'monthly') {
      timeInfo = {
        startWeek,
        endWeek,
      };
    }
    
    await addTask({
      title,
      description,
      status: 'pending',
      priority,
      category,
      date: Timestamp.now(),
      duration, // Use the user-input duration
      timeFrame,
      ...timeInfo,
      createdAt: new Date(),
      
    });
    
    // Reset form fields
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('personal');
    setDuration(0);
    
    if (timeFrame === 'daily') {
      setStartTime('');
      setStartAmPm('AM');
      setEndTime('');
      setEndAmPm('AM');
    }
  };

  const formTitle = `Add New ${timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Task`;

  // Render priority and category fields for both mobile and desktop
  const renderPriorityCategory = (isMobile: boolean) => {
    const baseInputClass = isMobile 
      ? "block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      : "block w-full p-2 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";
    
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";
    
    return (
      <>
        <div>
          <label htmlFor={isMobile ? "mobile-priority" : "priority"} className={labelClass}>
            Priority
          </label>
          <select
            id={isMobile ? "mobile-priority" : "priority"}
            className={baseInputClass}
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div>
          <label htmlFor={isMobile ? "mobile-category" : "category"} className={labelClass}>
            Category
          </label>
          <select
            id={isMobile ? "mobile-category" : "category"}
            className={baseInputClass}
            value={category}
            onChange={(e) => setCategory(e.target.value as TaskCategory)}
            required
          >
            <option value="work">Work</option>
            <option value="school">School</option>
            <option value="domestic">Domestic</option>
            <option value="personal">Personal</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label htmlFor={isMobile ? "mobile-duration" : "duration"} className={labelClass}>
            Duration (minutes)
          </label>
          <input
            type="number"
            id={isMobile ? "mobile-duration" : "duration"}
            className={baseInputClass}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            min="0"
            step="5"
            placeholder="Task duration in minutes"
          />
        </div>
      </>
    );
  };

  // Render time input fields based on timeFrame
  const renderTimeInputs = () => {
    if (timeFrame === 'daily') {
      return (
        <>
          <div>
            <label htmlFor="mobile-start-time" className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <div className="flex items-center">
              <input
                type="time"
                id="mobile-start-time"
                className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
              <select
                value={startAmPm}
                onChange={(e) => setStartAmPm(e.target.value)}
                className="ml-2 p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="mobile-end-time" className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <div className="flex items-center">
              <input
                type="time"
                id="mobile-end-time"
                className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
              <select
                value={endAmPm}
                onChange={(e) => setEndAmPm(e.target.value)}
                className="ml-2 p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </>
      );
    } else if (timeFrame === 'weekly') {
      return (
        <>
          <div>
            <label htmlFor="mobile-start-day" className="block text-sm font-medium text-gray-700 mb-1">
              Start Day
            </label>
            <select
              id="mobile-start-day"
              className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={startDay}
              onChange={(e) => setStartDay(e.target.value)}
              required
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="mobile-end-day" className="block text-sm font-medium text-gray-700 mb-1">
              End Day
            </label>
            <select
              id="mobile-end-day"
              className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={endDay}
              onChange={(e) => setEndDay(e.target.value)}
              required
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
        </>
      );
    } else if (timeFrame === 'monthly') {
      return (
        <>
          <div>
            <label htmlFor="mobile-start-week" className="block text-sm font-medium text-gray-700 mb-1">
              Start Week
            </label>
            <select
              id="mobile-start-week"
              className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={startWeek}
              onChange={(e) => setStartWeek(e.target.value)}
              required
            >
              <option value="First">First Week</option>
              <option value="Second">Second Week</option>
              <option value="Third">Third Week</option>
              <option value="Fourth">Fourth Week</option>
              <option value="Last">Last Week</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="mobile-end-week" className="block text-sm font-medium text-gray-700 mb-1">
              End Week
            </label>
            <select
              id="mobile-end-week"
              className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={endWeek}
              onChange={(e) => setEndWeek(e.target.value)}
              required
            >
              <option value="First">First Week</option>
              <option value="Second">Second Week</option>
              <option value="Third">Third Week</option>
              <option value="Fourth">Fourth Week</option>
              <option value="Last">Last Week</option>
            </select>
          </div>
        </>
      );
    }
    return null;
  };

  // Render desktop time inputs based on timeFrame
  const renderDesktopTimeHeaders = () => {
    if (timeFrame === 'daily') {
      return (
        <>
          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b">Start Time</th>
          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b">End Time</th>
        </>
      );
    } else if (timeFrame === 'weekly') {
      return (
        <>
          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b">Start Day</th>
          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b">End Day</th>
        </>
      );
    } else if (timeFrame === 'monthly') {
      return (
        <>
          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b">Start Week</th>
          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b">End Week</th>
        </>
      );
    }
    return null;
  };

  // Render desktop time input fields
  const renderDesktopTimeInputs = () => {
    if (timeFrame === 'daily') {
      return (
        <>
          <td className="py-3 px-4 border-b">
            <div className="flex items-center">
              <input
                type="time"
                id="startTime"
                className="block w-full p-2 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
              <select
                value={startAmPm}
                onChange={(e) => setStartAmPm(e.target.value)}
                className="ml-2 p-2 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </td>
          <td className="py-3 px-4 border-b">
            <div className="flex items-center">
              <input
                type="time"
                id="endTime"
                className="block w-full p-2 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
              <select
                value={endAmPm}
                onChange={(e) => setEndAmPm(e.target.value)}
                className="ml-2 p-2 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </td>
        </>
      );
    } else if (timeFrame === 'weekly') {
      return (
        <>
          <td className="py-3 px-4 border-b">
            <select
              id="startDay"
              className="block w-full p-2 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={startDay}
              onChange={(e) => setStartDay(e.target.value)}
              required
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </td>
          <td className="py-3 px-4 border-b">
            <select
              id="endDay"
              className="block w-full p-2 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={endDay}
              onChange={(e) => setEndDay(e.target.value)}
              required
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </td>
        </>
      );
    } else if (timeFrame === 'monthly') {
      return (
        <>
          <td className="py-3 px-4 border-b">
            <select
              id="startWeek"
              className="block w-full p-2 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={startWeek}
              onChange={(e) => setStartWeek(e.target.value)}
              required
            >
              <option value="First">First Week</option>
              <option value="Second">Second Week</option>
              <option value="Third">Third Week</option>
              <option value="Fourth">Fourth Week</option>
              <option value="Last">Last Week</option>
            </select>
          </td>
          <td className="py-3 px-4 border-b">
            <select
              id="endWeek"
              className="block w-full p-2 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={endWeek}
              onChange={(e) => setEndWeek(e.target.value)}
              required
            >
              <option value="First">First Week</option>
              <option value="Second">Second Week</option>
              <option value="Third">Third Week</option>
              <option value="Fourth">Fourth Week</option>
              <option value="Last">Last Week</option>
            </select>
          </td>
        </>
      );
    }
    return null;
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">{formTitle}</h2>
      
      {/* Mobile view */}
      <div className="md:hidden">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="mobile-title" className="block text-sm font-medium text-gray-700 mb-1">
              Task Title
            </label>
            <input
              type="text"
              id="mobile-title"
              className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="mobile-description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="mobile-description"
              rows={3}
              className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          {/* Priority and Category fields for mobile */}
          {renderPriorityCategory(true)}
          
          {/* Time-specific fields */}
          {renderTimeInputs()}
          
          <button
            type="submit"
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Task
          </button>
        </form>
      </div>
      
      {/* Desktop view - table layout */}
      <div className="hidden md:block">
        <form onSubmit={handleSubmit}>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b">Task Title</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b">Description</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b">Priority</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b">Category</th>
                
                {renderDesktopTimeHeaders()}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b">
                  <input
                    type="text"
                    id="title"
                    className="block w-full p-2 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </td>
                <td className="py-3 px-4 border-b">
                  <textarea
                    id="description"
                    rows={3}
                    className="block w-full p-2 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </td>
                <td className="py-3 px-4 border-b">
                  <select
                    id="priority"
                    className="block w-full p-2 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TaskPriority)}
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </td>
                <td className="py-3 px-4 border-b">
                  <select
                    id="category"
                    className="block w-full p-2 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as TaskCategory)}
                    required
                  >
                    <option value="work">Work</option>
                    <option value="school">School</option>
                    <option value="domestic">Domestic</option>
                    <option value="personal">Personal</option>
                    <option value="other">Other</option>
                  </select>
                </td>
                <td className=" hidden py-3 px-4 border-b">
                  <input
                    type="number"
                    id="duration"
                    className="block w-full p-2 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    min="0"
                    step="5"
                    placeholder="Minutes"
                  />
                </td>
                {renderDesktopTimeInputs()}
              </tr>
              <tr>
                <td colSpan={7} className="py-4">
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add Task
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};