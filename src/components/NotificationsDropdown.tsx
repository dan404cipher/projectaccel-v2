import React from 'react';

// Image assets from Figma design
const imgGroup = "http://localhost:3845/assets/56682bba0acea06bb98d87c84b29ede124f8b989.svg";
const imgLine43 = "http://localhost:3845/assets/93774a0717137a12463b0420429a3c2d62b5196c.svg";
const img = "http://localhost:3845/assets/df5563988952ff55eaade0a67c01c154b9ec1c5e.svg";

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
    <div className="absolute top-full right-0 mt-2 z-50">
      <div className="bg-[#ffffff] overflow-clip relative rounded-3xl size-full shadow-lg w-[632px] h-[523px]">
        {/* Header */}
        <div className="flex flex-row gap-8 items-center justify-start left-6 p-0 top-7 absolute">
          <div className="flex flex-row gap-4 items-center justify-start p-0 relative shrink-0">
            <div className="overflow-clip relative shrink-0 size-6">
              <div className="absolute bottom-[5.22%] left-[9.38%] right-[5.2%] top-[5.21%]">
                <img alt="notification-icon" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
            <div className="capitalize font-medium leading-[0] relative shrink-0 text-[#252525] text-[20px] text-left text-nowrap">
              <p className="block leading-[normal] whitespace-pre">Notification</p>
            </div>
          </div>
        </div>

        {/* Clear All Button */}
        <div className="absolute bg-[#06263d] flex flex-row gap-2.5 h-8 items-center justify-center left-[528px] px-0 py-4 rounded-lg top-6 w-20">
          <div className="font-medium leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-center text-nowrap">
            <p className="block leading-[normal] whitespace-pre">Clear all</p>
          </div>
        </div>

        {/* Divider */}
        <div className="absolute h-0 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[632.003px]" style={{ top: "calc(50% - 261.5px)" }}>
          <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
            <img alt="divider" className="block max-w-none size-full" src={imgLine43} />
          </div>
        </div>

        {/* Notification List */}
        <div className="absolute flex flex-col gap-10 items-start justify-start left-6 p-0 top-[116px] w-[584px]">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex flex-row items-start justify-between p-0 relative shrink-0 w-full hover:bg-gray-50 rounded-lg p-2 cursor-pointer">
              <div className="flex flex-row gap-2 items-start justify-start p-0 relative shrink-0">
                <div className="relative rounded-[90px] shrink-0 size-10">
                  <div className="absolute inset-0">
                    <img alt={`avatar-${notification.id}`} className="block max-w-none size-full" src={img} />
                  </div>
                  <div className="absolute bottom-[22.5%] flex flex-col font-normal justify-center leading-[0] left-[17.5%] right-[17.5%] text-[#ffffff] text-[24px] text-center top-[22.5%]">
                    <p className="block leading-[1.4]">{notification.avatar}</p>
                  </div>
                </div>
                <div className="capitalize flex flex-col font-medium gap-2 items-start justify-start leading-[0] p-0 relative shrink-0 text-left w-[226px]">
                  <div className="relative shrink-0 text-[#252525] text-[20px] w-full">
                    <p className="block leading-[normal]">{notification.userName}</p>
                  </div>
                  <div className="leading-[24px] relative shrink-0 text-[#666666] text-[0px] w-full">
                    <p className="block mb-0 text-[16px]">{notification.message}</p>
                    {notification.subMessage && (
                      <p className="block text-[#999999] text-[14px]">{notification.subMessage}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="font-medium leading-[0] relative shrink-0 text-[#999999] text-[14px] text-left text-nowrap">
                <p className="block leading-[normal] whitespace-pre">{notification.timeAgo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 