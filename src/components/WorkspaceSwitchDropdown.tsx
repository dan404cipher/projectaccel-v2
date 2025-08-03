import React, { useState } from 'react';

// Image assets from Figma design
const imgEllipse242 = "http://localhost:3845/assets/5af926273c9ffbf23e40c05e69d6e90ad16fff56.png";
const imgEllipse243 = "http://localhost:3845/assets/c7374a205af6c39cb14588865e1611624cac1281.png";
const imgEllipse244 = "http://localhost:3845/assets/932056fe0cc72a47b303bd6b183bcc20755f5c8e.png";
const imgEllipse245 = "http://localhost:3845/assets/1efce360d87b30ec2db1ba5e95388c3502cc66c6.png";
const imgEllipse246 = "http://localhost:3845/assets/b94cbf9ca3ce5a6d134ced526a2197b6b290c90c.png";
const imgEllipse247 = "http://localhost:3845/assets/5e8ebfd479625e19c8c0d4ccd07ec2ee8f85c2b1.png";
const img = "http://localhost:3845/assets/5e6faf15b21556bf868441bffff13dcbbc899a58.svg";
const img1 = "http://localhost:3845/assets/1fd7df02040a68d286de7dce8e8e2dbf7843506e.svg";
const imgIconamoonArrowUp2 = "http://localhost:3845/assets/4415bab17aed0da490b9a2f1409f1adb3b3b9fb4.svg";
const img2 = "http://localhost:3845/assets/4690eec7948e80345b11a008b059e711571a0752.svg";
const img3 = "http://localhost:3845/assets/249caeadd1d855eb3857e521e12570f56cdc3f6d.svg";
const img4 = "http://localhost:3845/assets/7ad63f9d91e4545ae3a9d45ef8d04ead675a6098.svg";
const imgLine43 = "http://localhost:3845/assets/a525da146341f21b89a94d74a479fa74563111ec.svg";

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
          {/* Current Workspace */}
          <div className="flex flex-row gap-8 items-center justify-start left-4 p-0 top-6 absolute">
            <div className="flex flex-row gap-4 items-center justify-start p-0 relative shrink-0">
              <div className="relative rounded-[90px] shrink-0 size-14">
                <div className="absolute inset-0">
                  <img alt="workspace-avatar" className="block max-w-none size-full" src={img} />
                </div>
                <div className="absolute bottom-[22.5%] flex flex-col font-normal justify-center leading-[0] left-[17.5%] right-[17.5%] text-[#ffffff] text-[24px] text-center top-[22.5%]">
                  <p className="block leading-[1.4]">v</p>
                </div>
              </div>
              <div className="capitalize font-medium leading-[0] relative shrink-0 text-[#252525] text-[20px] text-left text-nowrap">
                <p className="block leading-[normal] whitespace-pre">Workspace name 1</p>
              </div>
            </div>
          </div>

          {/* Members Section */}
          <div className="absolute flex flex-row gap-6 items-center justify-start left-8 p-0 top-[94px]">
            <div className="capitalize font-medium leading-[0] relative shrink-0 text-[#252525] text-[16px] text-left text-nowrap">
              <p className="block leading-[normal] whitespace-pre">Members</p>
            </div>
            <div className="flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
              <div className="flex flex-row items-center justify-start pl-0 pr-7 py-0 relative shrink-0">
                <div className="mr-[-28px] relative shrink-0 size-[50px]">
                  <img alt="member-1" className="block max-w-none size-full" height="50" src={imgEllipse242} width="50" />
                </div>
                <div className="mr-[-28px] relative shrink-0 size-[50px]">
                  <img alt="member-2" className="block max-w-none size-full" height="50" src={imgEllipse243} width="50" />
                </div>
                <div className="mr-[-28px] relative shrink-0 size-[50px]">
                  <img alt="member-3" className="block max-w-none size-full" height="50" src={imgEllipse244} width="50" />
                </div>
                <div className="mr-[-28px] relative shrink-0 size-[50px]">
                  <img alt="member-4" className="block max-w-none size-full" height="50" src={imgEllipse245} width="50" />
                </div>
                <div className="mr-[-28px] relative shrink-0 size-[50px]">
                  <img alt="member-5" className="block max-w-none size-full" height="50" src={imgEllipse246} width="50" />
                </div>
                <div className="mr-[-28px] relative shrink-0 size-[50px]">
                  <img alt="member-6" className="block max-w-none size-full" height="50" src={imgEllipse247} width="50" />
                </div>
              </div>
              <div className="capitalize font-medium leading-[0] relative shrink-0 text-[#333333] text-[14px] text-left text-nowrap">
                <p className="block leading-[normal] whitespace-pre">24+</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="absolute h-0 translate-x-[-50%] translate-y-[-50%] w-[343.013px]" style={{ top: "calc(50% - 43.5px)", left: "calc(50% + 0.007px)" }}>
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <img alt="divider" className="block max-w-none size-full" src={imgLine43} />
            </div>
          </div>

          {/* Switch Workspaces Title */}
          <div className="absolute font-medium leading-[0] left-8 text-[#252525] text-[16px] text-left text-nowrap top-48">
            <p className="block leading-[normal] whitespace-pre">Switch Workspaces</p>
          </div>

          {/* Workspace List */}
          <div className="absolute flex flex-col gap-5 items-start justify-start left-8 p-0 top-[235px] w-[287px]">
            {workspaces.slice(1).map((workspace) => (
              <div key={workspace.id} className="flex flex-row gap-[75px] items-center justify-start p-0 relative shrink-0 w-full hover:bg-gray-50 rounded-lg p-2 cursor-pointer">
                <div className="flex flex-row gap-6 items-center justify-start p-0 relative shrink-0 w-[188px]">
                  <div className="relative rounded-[90px] shrink-0 size-6">
                    <div className="absolute inset-0">
                      <img alt={`workspace-${workspace.id}`} className="block max-w-none size-full" src={workspace.color} />
                    </div>
                    <div className="absolute flex flex-col font-normal justify-center leading-[0] left-1/2 text-[#ffffff] text-[12px] text-center translate-x-[-50%] translate-y-[-50%] w-5" style={{ top: "calc(50% - 0.5px)" }}>
                      <p className="block leading-[1.4]">{workspace.avatar}</p>
                    </div>
                  </div>
                  <div className="capitalize font-medium leading-[0] relative shrink-0 text-[#666666] text-[14px] text-left text-nowrap">
                    <p className="block leading-[normal] whitespace-pre">{workspace.name}</p>
                  </div>
                </div>
                <div className="flex h-[0px] items-center justify-center relative shrink-0 w-[0px]">
                  <div className="flex-none rotate-[90deg]">
                    <div className="relative size-6">
                      <img alt="arrow" className="block max-w-none size-full" src={imgIconamoonArrowUp2} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 