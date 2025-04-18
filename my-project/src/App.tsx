// src/App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import { SpeedInsights } from "@vercel/speed-insights/react"


const App: React.FC = () => {
  return (
    <Router>
      <AppRouter/>
      <SpeedInsights />
    </Router>
  );
};

export default App;
