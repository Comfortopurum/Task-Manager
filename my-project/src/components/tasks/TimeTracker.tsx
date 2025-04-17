import React, { useState, useEffect } from 'react';
import { useTasks, Task } from '../../hooks/useTasks';

interface TimeTrackerProps {
  task: Task;
}

export const TimeTracker: React.FC<TimeTrackerProps> = ({ task }) => {
  const { updateTask } = useTasks();
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isTracking && startTime) {
      interval = setInterval(() => {
        const seconds = Math.floor((Date.now() - startTime) / 1000);
        setElapsedSeconds(seconds);
      }, 1000);
    } else {
      setElapsedSeconds(0);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTracking, startTime]);
  
  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  };
  
  const handleStartTracking = () => {
    setIsTracking(true);
    setStartTime(Date.now());
  };
  
  const handleStopTracking = () => {
    if (startTime) {
      const elapsedMinutes = Math.round((Date.now() - startTime) / 60000);
      updateTask(task.id!, {
        duration: task.duration + elapsedMinutes
      });
      setIsTracking(false);
      setStartTime(null);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {isTracking && (
        <div className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
          {formatTime(elapsedSeconds)}
        </div>
      )}
      
      {!isTracking ? (
        <button
          onClick={handleStartTracking}
          className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          disabled={task.status === 'completed'}
        >
          <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      ) : (
        <button
          onClick={handleStopTracking}
          className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h12v12H6z" />
          </svg>
        </button>
      )}
    </div>
  );
};