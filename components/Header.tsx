import React from 'react';
import { Icon } from './Icon';
import { Theme } from '../App';

interface HeaderProps {
    theme: Theme;
    toggleTheme: () => void;
    credits: number;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, credits }) => {

  const handleUpgradeClick = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
             <div className="text-brand-purple-500">
                <Icon name="sparkles" className="w-8 h-8"/>
             </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Samir Hossain's AI Studio
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                aria-label="Toggle theme"
            >
                {theme === 'light' ? <Icon name="moon" className="w-5 h-5"/> : <Icon name="sun" className="w-5 h-5"/>}
            </button>
            <div className="hidden sm:flex items-center space-x-2 bg-gray-200 dark:bg-gray-800 px-3 py-1.5 rounded-full text-sm font-medium">
                <Icon name="credit-card" className="w-5 h-5 text-brand-purple-500"/>
                <span className="text-gray-800 dark:text-gray-200">Credits: {credits}</span>
            </div>
             <div className="hidden md:flex items-center space-x-2">
                <a href="#login" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-purple-600 dark:hover:text-brand-purple-400 transition-colors">Login</a>
                <button onClick={handleUpgradeClick} className="px-4 py-2 text-sm font-medium text-white bg-brand-purple-600 hover:bg-brand-purple-700 rounded-md transition-colors">Upgrade Plan</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};