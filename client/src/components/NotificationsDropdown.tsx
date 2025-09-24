import React, { useEffect, useRef } from 'react';
import notificationIcon from '../assets/icons/bell.svg';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationItem {
  id: number;
  userName: string;
  avatar: string;
  message: string;
  subMessage?: string;
  timeAgo: string;
}

export default function NotificationsDropdown({ isOpen, onClose }: NotificationsDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const notifications: NotificationItem[] = [
    {
      id: 1,
      userName: 'Sara arjun',
      avatar: 'v',
      message: 'Assigned new task (ID- T1573)',
      subMessage: 'Project example title name',
      timeAgo: '6 mins ago'
    },
    {
      id: 2,
      userName: 'Krishna kumar',
      avatar: 'v',
      message: 'Commented on (T2439)',
      subMessage: 'lorem ipsum hgujlokwwedfere',
      timeAgo: '10 mins ago'
    },
    {
      id: 3,
      userName: 'Dhana',
      avatar: 'v',
      message: 'send message',
      subMessage: 'hi shall we connect for a quick call',
      timeAgo: '20 mins ago'
    },
    {
      id: 4,
      userName: 'Saranya',
      avatar: 'v',
      message: 'Assigned new task (ID- T1573)',
      subMessage: 'Project example title name',
      timeAgo: '30 mins ago'
    },
    {
      id: 5,
      userName: 'arjun',
      avatar: 'v',
      message: 'Commented on (T2439)',
      subMessage: 'lorem ipsum hgujlokwwedfere',
      timeAgo: '43 mins ago'
    }
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full right-0 mt-2 z-50" 
      ref={dropdownRef}
    >
      <div className="bg-[#ffffff] overflow-clip relative rounded-3xl size-full shadow-lg w-[632px] h-[523px]">
        <div className='flex flex-col gap-4 overflow-hidden'>
          {/* notification Header */}
          <div className='flex items-center justify-between border-b border-[#E0E0E0]  py-5 px-5'>
            <div className='flex items-center gap-4'>
              <img src={notificationIcon} alt='notification' className='w-6 h-6' />
              <span className='text-xl text-[#252525] font-medium'>Notifications</span>
            </div>
            <button className='text-sm text-white font-medium bg-[#67909B] rounded-xl px-4 py-2'>
              Clear all
            </button>
          </div>
          {/* notification list */}
          <div className='flex flex-col gap-4 px-5 overflow-hidden'>
            {notifications.map((notification) => (
              <div key={notification.id} className='flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors'>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={notification.avatar} alt={notification.userName} />
                  <AvatarFallback className="bg-[#67909B] text-white text-sm font-medium">
                    {notification.userName.split(' ').map(name => name[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium text-[#252525]'>{notification.userName}</span>
                  
                  </div>
                  <p className='text-sm text-[#252525] mt-1'>{notification.message}</p>
                  {notification.subMessage && (
                    <p className='text-xs text-gray-500 mt-1'>{notification.subMessage}</p>
                  )}
                </div>
                <div>
                <span className='text-xs text-gray-500'>{notification.timeAgo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 