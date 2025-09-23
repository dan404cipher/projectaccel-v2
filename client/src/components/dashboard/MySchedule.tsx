import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock } from 'lucide-react';
const img2 = "/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
const img3 = "/icons/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png";
const img4 = "/icons/27329e3b78d83b20619fddee55560c05c2cd1469.png";
const img5 = "/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";
const img6 = "/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";
const MySchedule = ({className}: {className: string}) => {
  const [selectedDate, setSelectedDate] = useState(1);
  const [currentMonth, setCurrentMonth] = useState('November');
  const [currentYear, setCurrentYear] = useState('2025');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = ['2023', '2024', '2025', '2026', '2027', '2028'];

  // Calculate calendar data based on selected month and year
  const getCalendarData = () => {
    const monthIndex = months.indexOf(currentMonth);
    const year = parseInt(currentYear);

    // Get the first day of the month (0=Sunday, 1=Monday, etc.)
    const firstDay = new Date(year, monthIndex, 1).getDay();
    // Convert to Monday-based week (0=Monday, 1=Tuesday, etc.)
    const firstDayOfMonth = firstDay === 0 ? 6 : firstDay - 1;

    // Get number of days in the month
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    return { firstDayOfMonth, daysInMonth };
  };

  const { firstDayOfMonth, daysInMonth } = getCalendarData();

  const events = [
    {
      id: 1,
      title: "Developer Meeting",
      time: "01:00 PM - 02:30 PM (UTC)",
      participants: 7,
      platform: "Google Meet",
      duration: "1 Hour 45 Mins",
      avatars: [
        "/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png",
        "/icons/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png",
        "/icons/27329e3b78d83b20619fddee55560c05c2cd1469.png",
        "/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png"
      ]
    },
    {
      id: 2,
      title: "Developer Meeting",
      time: "01:00 PM - 02:30 PM (UTC)",
      participants: 7,
      platform: "Google Meet",
      duration: "1 Hour 45 Mins",
      avatars: [
        "/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png",
        "/icons/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png",
        "/icons/27329e3b78d83b20619fddee55560c05c2cd1469.png",
        "/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png"
      ]
    }
  ];

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDate;
      const isToday = () => {
        const today = new Date();
        return today.getDate() === day &&
          today.getMonth() === months.indexOf(currentMonth) &&
          today.getFullYear() === parseInt(currentYear);
      };

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(day)}
          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${isSelected
            ? 'bg-[#2A9D90] text-white'
            : isToday()
              ? 'bg-[#67909B] text-white'
              : 'hover:bg-gray-100 text-[#333333] cursor-pointer'
            }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className={`bg-white h-full  w-full rounded-2xl sm:rounded-3xl shadow-[0px_9px_20px_0px_rgba(46,35,94,0.07)] flex flex-col p-4 sm:p-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col gap-1 sm:gap-2 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#06263D] rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 2H4C3.44772 2 3 2.44772 3 3V13C3 13.5523 3.44772 14 4 14H12C12.5523 14 13 13.5523 13 13V3C13 2.44772 12.5523 2 12 2Z" stroke="white" strokeWidth="1.5" />
              <path d="M3 6H13" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
          <h2 className="text-base sm:text-lg lg:text-[20px] font-medium text-[#252525]">My Schedule</h2>
        </div>
        <p className="text-sm sm:text-base lg:text-[16px] font-normal text-[#999999]">Track the courses time schedule</p>
      </div>

      {/* Calendar */}
      <div className="bg-[#f9f9f9] rounded-xl sm:rounded-2xl p-4 mb-4 sm:mb-6 shadow-[0px_2px_4px_0px_rgba(6,38,61,0.10)]">
        {/* Month and Year Selection */}
        <div className="flex items-center justify-end gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Select value={currentMonth} onValueChange={setCurrentMonth}>
              <SelectTrigger className="w-[100px] h-8 bg-transparent border-none text-sm sm:text-base lg:text-[16px] font-medium p-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month} className="text-[#67909B] hover:text-[#2A9D90]">
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

          </div>
          <div className="flex items-center gap-2">
            <Select value={currentYear} onValueChange={setCurrentYear}>
              <SelectTrigger className="w-[80px] h-8 bg-transparent border-none text-sm sm:text-base lg:text-[16px] font-medium text-[#67909B] p-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year} className="text-[#67909B] hover:text-[#2A9D90]">
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
            <div key={index} className="h-8 w-8 flex items-center justify-center">
              <span className="text-xs sm:text-sm font-bold text-[#333333]">{day}</span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {generateCalendarDays()}
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:gap-4 flex-1 overflow-y-auto">
        {events.map((event) => (
          <div key={event.id} className="max-w-md rounded-xl shadow-md p-4 bg-gray-100 flex items-center justify-between gap-3 border-l-4 border-teal-500">
            {/* Title & Time */}
            <div className='flex flex-col'>
              <div>
                <h2 className="text-[#252525] font-normal text-lg">{event.title}</h2>
                <p className="text-[#999999] text-[11px]">{event.time}</p>
              </div>

              {/* Avatars */}
              <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={img2} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={img3} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={img4} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={img5} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={img2} />
              </div>
              <span className="text-xs text-[#999999] font-medium">24+</span>
            </div>
            </div>

            {/* Footer - Platform & Duration */}
            <div className="flex flex-col justify-end items-end pt-3 h-full w-fit">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="flex items-center gap-1 text-[#333]">
                  On Google Meet <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
                    <path d="M7.91992 5.90028L9.28476 7.46035L11.1202 8.63312L11.4394 5.91012L11.1202 3.24854L9.24959 4.27879L7.91992 5.90028Z" fill="#00832D" />
                    <path d="M0 8.3799V10.7003C0 11.2301 0.430063 11.6603 0.959984 11.6603H3.28038L3.76086 9.90705L3.28038 8.3799L1.68842 7.89941L0 8.3799Z" fill="#0066DA" />
                    <path d="M3.28038 0.140625L0 3.421L1.68853 3.90034L3.28038 3.421L3.75211 1.91463L3.28038 0.140625Z" fill="#E94235" />
                    <path d="M0 8.38084H3.28032V3.4209H0V8.38084Z" fill="#2684FC" />
                    <path d="M13.2147 1.52952L11.1191 3.24867V8.6332L13.2234 10.359C13.5384 10.6058 13.9991 10.3809 13.9991 9.98048V1.90041C13.9991 1.49556 13.5274 1.27177 13.2147 1.52957" fill="#00AC47" />
                    <path d="M7.91888 5.90039V8.37981H3.2793V11.6602H10.1592C10.6891 11.6602 11.1191 11.23 11.1191 10.7002V8.63323L7.91888 5.90039Z" fill="#00AC47" />
                    <path d="M10.1592 0.140625H3.2793V3.421H7.91888V5.90042L11.1192 3.24863V1.10066C11.1192 0.570742 10.6891 0.14068 10.1592 0.14068" fill="#FFBA00" />
                  </svg>
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" /> {event.duration}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySchedule;