import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeSwitch = () => {
  const [isDayMode, setIsDayMode] = useState(true);

  const toggleMode = () => {
    setIsDayMode(!isDayMode);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 w-16 h-8">
      <div className="relative">
        {/* Switch Container */}
        <div 
          className={`relative w-16 h-8 rounded-full cursor-pointer transition-all duration-500 shadow-lg ${
            isDayMode ? 'bg-slate-300' : 'bg-slate-600'
          }`}
          onClick={toggleMode}
        >
          {/* Switch Track Background */}
          <div className="absolute inset-1 rounded-full bg-white bg-opacity-20"></div>
          
          {/* Switch Handle */}
          <div 
            className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-500 transform ${
              isDayMode 
                ? 'left-1 bg-teal-500 shadow-md' 
                : 'left-9 bg-slate-400 shadow-md'
            }`}
          >
            {/* Day Mode - Sun Icon */}
            <div 
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                isDayMode ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
            >
              <Sun className="w-4 h-4 text-white" />
            </div>
            
            {/* Night Mode - Moon Icon */}
            <div 
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                !isDayMode ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
            >
              <Moon className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
