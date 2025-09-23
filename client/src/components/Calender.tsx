import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 7, 1)); // August 2024

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    let startDay = firstDay.getDay();
    startDay = startDay === 0 ? 6 : startDay - 1;

    const days = [];

    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isNextMonth: false
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        isNextMonth: false
      });
    }

    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isNextMonth: true
      });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);

  const sprints = [
    {
      name: "Scrum Sprint 1",
      status: "Active",
      startDate: 1,
      endDate: 11,
      color: "bg-slate-600"
    },
    {
      name: "Scrum Sprint 2",
      status: "Upcoming",
      startDate: 13,
      endDate: 19,
      color: "bg-green-400"
    }
  ];

  const getSprintForDate = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return null;
    return sprints.find(sprint => day >= sprint.startDate && day <= sprint.endDate);
  };

  const renderSprintBar = (sprint, day, isStart, isEnd) => {
    const baseClasses = `absolute inset-x-0 top-8 h-10 ${sprint.color} flex items-center text-white text-xs font-medium px-2`;
    const roundedClasses = isStart && isEnd ? 'rounded-full' :
      isStart ? 'rounded-l-full ml-4' :
        isEnd ? 'rounded-r-full mr-4' : '';

    return (
      <div className={`${baseClasses} ${roundedClasses}`}>
        {isStart && (
          <>
            <Users className="w-3 h-3 mr-1" />
            {sprint.name} ({sprint.status})
          </>
        )}
      </div>
    );
  };

  return (
    <div className=" w-full bg-white rounded-3xl shadow-lg h-full">
      {/* Day Headers */}
      <div className="grid grid-cols-7 bg-gray-200 rounded-t-lg overflow-hidden">
        {dayNames.map(day => (
          <div key={day} className="bg-gray-50 p-4 text-center font-semibold text-gray-700">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 overflow-hidden">
        {days.map((dayObj, index) => {
          const sprint = getSprintForDate(dayObj.day, dayObj.isCurrentMonth);
          const isSprintStart = sprint && dayObj.day === sprint.startDate;
          const isSprintEnd = sprint && dayObj.day === sprint.endDate;

          return (
            <div
              key={index}
              className={`relative bg-white p-2 h-20 ${dayObj.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                } hover:bg-gray-50 transition-colors`}
            >
              <span className="text-sm font-medium">{dayObj.day}</span>
              {sprint && renderSprintBar(sprint, dayObj.day, isSprintStart, isSprintEnd)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;