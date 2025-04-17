import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.includes(path);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  
  const sidebarContent = (
    <div className="flex flex-col flex-grow bg-gradient-to-b from-purple-600 to-indigo-800    pt-5 pb-4 overflow-y-auto h-full">
      <div className="flex items-center flex-shrink-0 px-4">
        <h1 className="text-white font-bold text-xl">TaskMaster</h1>
        <button 
          onClick={closeSidebar}
          className="ml-auto text-white lg:hidden"
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="mt-5 flex-1 px-2 space-y-1">
        <Link
          to="/dashboard"
          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md text-indigo-100 
            ${isActive('/dashboard') ? 'bg-indigo-900 bg-opacity-30 text-white' : 'hover:text-white hover:bg-indigo-900 hover:bg-opacity-30'}`}
          onClick={closeSidebar}
        >
          <svg
            className="mr-3 h-6 w-6 text-indigo-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Dashboard
        </Link>

        <Link
          to="dailyPage"
          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md text-indigo-100 
            ${isActive('daily') ? 'bg-indigo-900 bg-opacity-30 text-white' : 'hover:text-white hover:bg-indigo-900 hover:bg-opacity-30'}`}
          onClick={closeSidebar}
        >
          <svg
            className="mr-3 h-6 w-6 text-indigo-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          Daily Tasks
        </Link>

        <Link
          to="weeklyPage"
          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md text-indigo-100 
            ${isActive('weekly') ? 'bg-indigo-900 bg-opacity-30 text-white' : 'hover:text-white hover:bg-indigo-900 hover:bg-opacity-30'}`}
          onClick={closeSidebar}
        >
          <svg
            className="mr-3 h-6 w-6 text-indigo-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Weekly Review
        </Link>

        <Link
          to="monthlyPage"
          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md text-indigo-100 
            ${isActive('monthly') ? 'bg-indigo-900 bg-opacity-30 text-white' : 'hover:text-white hover:bg-indigo-900 hover:bg-opacity-30'}`}
          onClick={closeSidebar}
        >
          <svg
            className="mr-3 h-6 w-6 text-indigo-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Monthly Stats
        </Link>
      </nav>
    </div>
  );

  return (
    <>
      
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          {sidebarContent}
          <div className="flex-shrink-0 flex border-t rounded-br-4xl border-indigo-800 p-4 bg-indigo-800">
            <div className="flex items-center">
              <div>
                <button
                  onClick={handleLogout}
                  className="flex-shrink-0 group block text-indigo-100 hover:text-white"
                >
                  <div className="flex items-center">
                    <div>
                      <svg 
                        className="h-5 w-5 text-indigo-300" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">
                        Logout
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      {isOpen && (
        <div className="relative z-40 lg:hidden"  role="dialog" aria-modal="true">
          
          <div 
            className="fixed inset-0 bg-black/50 " 
            onClick={closeSidebar}
            aria-hidden="true"
          ></div>

          
          <div className="fixed inset-0 flex z-40">
            <div className="relative flex-1 flex flex-col   max-w-64 w-full ">
              {sidebarContent}
              <div className="flex-shrink-0 flex border-t rounded-br-4xl  border-indigo-800 p-4 bg-indigo-800">
                <div className="flex items-center">
                  <div>
                    <button
                      onClick={handleLogout}
                      className="flex-shrink-0 group block text-indigo-100 hover:text-white"
                    >
                      <div className="flex items-center">
                        <div>
                          <svg 
                            className="h-5 w-5 text-indigo-300" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-white">
                            Logout
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};