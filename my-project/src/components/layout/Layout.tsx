import React, { ReactNode, useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-2 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};