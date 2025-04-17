import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './useAuth';

export type TimeFrame = 'daily' | 'weekly' | 'monthly';
export type TaskStatus = 'pending' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskCategory = 'work' | 'school' | 'domestic' | 'personal' | 'other';

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

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.date ? data.date.toDate() : new Date(),
          dueDate: data.dueDate ? data.dueDate.toDate() : undefined
        } as Task;
      });

      setTasks(tasksData);
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup listener
  }, [user]);

  const addTask = async (newTask: Omit<Task, 'userId' | 'id'>) => {
    if (!user) return;

    const taskWithUser = {
      ...newTask,
      userId: user.uid,
      createdAt: new Date()
    };

    const docRef = await addDoc(collection(db, 'tasks'), taskWithUser);
    setTasks([...tasks, { ...taskWithUser, id: docRef.id }]);

    return docRef.id;
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    if (!user) return;

    await updateDoc(doc(db, 'tasks', taskId), updates);

    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = async (taskId: string) => {
    if (!user) return;

    await deleteDoc(doc(db, 'tasks', taskId));
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Helper function to filter tasks by timeframe
  const getTasksByTimeFrame = (timeFrame: TimeFrame) => {
    return tasks.filter(task => task.timeFrame === timeFrame);
  };

  return { 
    tasks, 
    loading, 
    addTask, 
    updateTask, 
    deleteTask,
    getTasksByTimeFrame
  };
};