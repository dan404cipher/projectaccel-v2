import React, { useState } from 'react';
import { Avatar } from './ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import rightArrow from '../assets/icons/rightarrow.svg';

// Image assets from Figma design
const img = "http://localhost:3845/assets/5e6faf15b21556bf868441bffff13dcbbc899a58.svg";
const img1 = "http://localhost:3845/assets/1fd7df02040a68d286de7dce8e8e2dbf7843506e.svg";
const img2 = "/src/assets/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
const img3 = "/src/assets/icons/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png";
const img4 = "/src/assets/icons/27329e3b78d83b20619fddee55560c05c2cd1469.png";
const img5 = "/src/assets/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";
const img6 = "/src/assets/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";

interface WorkspaceSwitchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkspaceSwitchDropdown({ isOpen, onClose }: WorkspaceSwitchDropdownProps) {
  const [selectedWorkspace, setSelectedWorkspace] = useState('Workspace name 1');

  const workspaces = [
    { id: 1, name: 'Workspace name 1', avatar: 'v', color: img, isActive: true },
    { id: 2, name: 'Workspace name 2', avatar: 'D', color: img1 },
    { id: 3, name: 'Workspace name 3', avatar: 'VA', color: img2 },
    { id: 4, name: 'Workspace name 4', avatar: 'M', color: img3 },
    { id: 5, name: 'Workspace name 5', avatar: 'R', color: img4 },
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-2 z-50">
      <div className="relative size-full">
        <div className="absolute bg-[#ffffff] h-[423px] left-0 rounded-3xl top-0 w-[343px] shadow-lg">
          <div className="flex flex-col px-5 py-6">
            {/* Workspace details */}
            <div className="flex flex-col gap-2 items-center w-full ">
              <div className='flex items-center w-full gap-5'>
                <Avatar className="h-10 w-10 sm:h-10 sm:w-10 lg:h-10 lg:w-10">
                  <AvatarImage src={img2} />
                  <AvatarFallback className="text-xs sm:text-sm lg:text-base">W</AvatarFallback>
                </Avatar>
                <span className="text-[#252525] text-xl font-medium">Workspace 1</span>
              </div>
            </div>
            {/* workspace Memeber list */}
            <div className="flex items-center justify-between  border-b border-gray-200 py-4">
              <span className="text-[#252525] text-base font-medium">Members</span>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={img2} />
                  <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={img3} />
                  <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={img4} />
                  <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={img5} />
                  <img alt="member" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white" src={img2} />
                </div>
                <span className="text-sm text-[#333333] font-medium">24+</span>
              </div>
            </div>
            {/* workspace project list */}
            <div className='flex flex-col gap-4 py-5'>
              <div className='font-medium text-base text-[#252525]'>
                Swtich WorkSpaces
              </div>
              <div className='flex flex-col gap-4 overflow-y-scroll h-[300px]'>
                {/* workspace item */}
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-5'>
                    <img src={img2} alt="workspace" className='w-10 h-10' />
                    <span className='text-base text-[#252525] font-medium'>Workspace 1</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <img src={rightArrow} alt="workspace" className='w-4 h-4' />
                  </div>
                </div>
                {/* workspace item */}
                <div className='flex items-center justify-between cursor-pointer'>
                  <div className='flex items-center gap-5'>
                    <img src={img2} alt="workspace" className='w-10 h-10' />
                    <span className='text-base text-[#252525] font-medium'>Workspace 1</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <img src={rightArrow} alt="workspace" className='w-4 h-4' />
                  </div>
                </div>
                {/* workspace item */}
                <div className='flex items-center justify-between cursor-pointer'>
                  <div className='flex items-center gap-5'>
                    <img src={img2} alt="workspace" className='w-10 h-10' />
                    <span className='text-base text-[#252525] font-medium'>Workspace 1</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <img src={rightArrow} alt="workspace" className='w-4 h-4' />
                  </div>
                </div>
                {/* workspace item */}
                <div className='flex items-center justify-between cursor-pointer'>
                  <div className='flex items-center gap-5'>
                    <img src={img2} alt="workspace" className='w-10 h-10' />
                    <span className='text-base text-[#252525] font-medium'>Workspace 1</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <img src={rightArrow} alt="workspace" className='w-4 h-4' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}