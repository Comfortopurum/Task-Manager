import React, { useState } from "react";
import { useTasks, Task } from "../../hooks/useTasks";

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateTask, deleteTask } = useTasks();
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleToggleComplete = () => {
    updateTask(task.id!, {
      status: task.status === "completed" ? "pending" : "completed",
    });
  };

  const handleConfirmDelete = () => {
    deleteTask(task.id!);
    setIsDeleteModalOpen(false);
  };

  const handleStartTracking = () => {
    setIsTracking(true);
    setStartTime(Date.now());
  };

  const handleStopTracking = () => {
    if (startTime) {
      const elapsedMinutes = Math.round((Date.now() - startTime) / 60000);
      updateTask(task.id!, {
        duration: task.duration + elapsedMinutes,
      });
      setIsTracking(false);
      setStartTime(null);
    }
  };

  // Helper function to render the appropriate time/day/week information
  const renderTimeInfo = () => {
    if (task.timeFrame === "daily" && task.startTime && task.endTime) {
      return (
        <>
          <span className="mr-4">
            Start: <strong>{task.startTime}</strong>
          </span>
          <span>
            End: <strong>{task.endTime}</strong>
          </span>
        </>
      );
    } else if (task.timeFrame === "weekly" && task.startDay && task.endDay) {
      return (
        <>
          <span className="mr-4">
            Start Day: <strong>{task.startDay}</strong>
          </span>
          <span>
            End Day: <strong>{task.endDay}</strong>
          </span>
        </>
      );
    } else if (task.timeFrame === "monthly" && task.startWeek && task.endWeek) {
      return (
        <>
          <span className="mr-4">
            Start Week: <strong>{task.startWeek}</strong>
          </span>
          <span>
            End Week: <strong>{task.endWeek}</strong>
          </span>
        </>
      );
    }
    return (
      <>
        <span className="mr-4">
          Start: <strong>N/A</strong>
        </span>
        <span>
          End: <strong>N/A</strong>
        </span>
      </>
    );
  };

  return (
    <div className="bg-white w-full overflow-hidden shadow-sm rounded-lg p-4 mb-4 border-l-4 border-indigo-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 w-full overflow-hidden">
          <input
            type="checkbox"
            checked={task.status === "completed"}
            onChange={handleToggleComplete}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <div className="">
            <div className="mt-1  text-xs text-gray-500 md:flex md:items-center md:gap-2 text-nowrap">
              <div className="flex  items-center gap-x-6">
                <h3
                  className={`text-sm font-medium ${
                    task.status === "completed"
                      ? "line-through text-gray-500"
                      : "text-gray-900"
                  }`}
                >
                  {task.title}
                </h3>
                <div className="sm:hidden space-x-1">
                  <span className="inline-flex items-center text-nowrap px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                    {formatDuration(task.duration)}
                  </span>

                  {!isTracking ? (
                    <button
                      onClick={handleStartTracking}
                      className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      disabled={task.status === "completed"}
                    >
                      <svg
                        className="h-3 w-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={handleStopTracking}
                      className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <svg
                        className="h-3 w-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 6h12v12H6z" />
                      </svg>
                    </button>
                  )}

                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg
                      className="h-3 w-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {renderTimeInfo()}
            </div>
            <div className="w-full max-w-full  overflow-hidden">
              {task.description && (
                <p className="mt-1 text-xs text-gray-500 break-words whitespace-normal w-full max-w-full">
                  {task.description}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="hidden sm:block ">
          <div className="flex items-center space-x-2 ">
            <span className="inline-flex items-center text-nowrap px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
              {formatDuration(task.duration)}
            </span>

            {!isTracking ? (
              <button
                onClick={handleStartTracking}
                className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                disabled={task.status === "completed"}
              >
                <svg
                  className="h-3 w-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleStopTracking}
                className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <svg
                  className="h-3 w-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 6h12v12H6z" />
                </svg>
              </button>
            )}

            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                className="h-3 w-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Delete Task</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
