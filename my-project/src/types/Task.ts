import { Timestamp } from "firebase/firestore";
import { TaskCategory, TaskPriority, TaskStatus, TimeFrame } from "../hooks/useTasks";

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    category: TaskCategory;
    date: Timestamp;
    duration: number; // duration in minutes
    userId: string;
    timeFrame: TimeFrame;
    createdAt: Date;
    dueDate?: Date;
    completedAt?: Date; // Added for tracking when tasks were completed
    timeSpent?: number; // Added for tracking actual time spent on tasks
    
    // Daily timeframe properties
    startTime?: string;
    endTime?: string;
    
    // Weekly timeframe properties
    startDay?: string;
    endDay?: string;
    
    // Monthly timeframe properties
    startWeek?: string;
    endWeek?: string;
  }