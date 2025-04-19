import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { Dashboard } from './pages/Dashboard';
import { DailyOverview } from './components/dashboard/DailyOverview';
import { WeeklyOverview } from './components/dashboard/WeeklyOverview';
import { MonthlyOverview } from './components/dashboard/MonthlyOverview';
import { AuthWrapper } from './components/auth/AuthWrapper';
import { DashboardLayout } from './components/layout/DashboardLayout';
import DailyTasksPage from './pages/DailyTasksPage';
import WeeklyReviewPage from './pages/WeeklyReviewPage';
import MonthlyStatsPage from './pages/MonthlyStatsPage';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      
      
      <Route 
        path="/dashboard" 
        element={
          <AuthWrapper>
            <ProtectedRoute requireVerification={true}>
            <DashboardLayout/>
            </ProtectedRoute>
          </AuthWrapper>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="daily" element={<DailyOverview timeFrame={'daily'} />} />
        <Route path="dailyPage" element={<DailyTasksPage  />} />
        <Route path="weekly" element={<WeeklyOverview timeFrame={'weekly'} />} />
        <Route path="weeklyPage" element={<WeeklyReviewPage  />} />
        <Route path="monthly" element={<MonthlyOverview timeFrame={'monthly'} />} />
        <Route path="monthlyPage" element={<MonthlyStatsPage />} />
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};
