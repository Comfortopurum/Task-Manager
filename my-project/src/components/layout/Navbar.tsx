import React from 'react';
import { useAuth } from '../../hooks/useAuth';

interface NavbarProps {
  toggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { user } = useAuth();
  
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {/* Hamburger menu button - only visible on mobile */}
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
                onClick={toggleSidebar}
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1 className="md:text-xl text-base font-bold text-indigo-600 ml-2 lg:hidden">TaskMaster</h1>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="relative inline-block">
                <img
                  className="md:h-8 h-6 md:w-8 w-6 rounded-full"
                  src={`https://ui-avatars.com/api/?name=${user?.email?.charAt(0) || 'U'}&background=6366F1&color=fff`}
                  alt=""
                />
                <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white"></span>
              </span>
            </div>
            <div className="ml-3">
              <p className="md:text-sm text-xs font-medium text-gray-700 hidden md:block">{user?.email || 'User'}</p>
              <p className="text-xs font-medium text-gray-500 hidden md:block">Active now</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};