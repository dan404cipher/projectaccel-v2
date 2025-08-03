import React, { useState } from 'react';

// Image assets from Figma design
const imgEllipse3226 = "http://localhost:3845/assets/afcdad76e6a54041bae78e7f511725140b74e504.png";
const imgLogo = "http://localhost:3845/assets/b84b5d40d2b309aeb74557c18f9c8aee107bb331.svg";
const imgIconamoonArrowUp2Light = "http://localhost:3845/assets/6da921a9801912b57d27cdefe8385059e7ddd31a.svg";
const imgEllipse10 = "http://localhost:3845/assets/88364341615089b24b27f35494b0b95acb2276c1.svg";
const imgGroup = "http://localhost:3845/assets/93765e3060a5e02b5efd9ef1791db8c21fc953ef.svg";
const imgGroup1 = "http://localhost:3845/assets/6cc6be37ebeba6b60c040f7ae12b8c7cc6c03eb3.svg";
const imgGroup1984077193 = "http://localhost:3845/assets/c1b6d222986627b36f13ba42ac2e73da7b39c04a.svg";
const imgGroup2 = "http://localhost:3845/assets/e56e056d80f3538d5ece29278399adf7a83f00f8.svg";
const imgMageFilter = "http://localhost:3845/assets/eb541e44da29796a676123f07dd6a6b02f8f359b.svg";
const imgSubtract = "http://localhost:3845/assets/1dbd1f8e058554c0de78294c5b16c7d70ee9bbd8.svg";
const imgPajamasCollapseLeft = "http://localhost:3845/assets/28a69ae95d5ba66094af1375314dbb52a710a84e.svg";
const img = "http://localhost:3845/assets/ebf941e488128d66d349845b389b3ee78ee00cf9.svg";

interface ProjectLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function ProjectLayout({ children, className = "" }: ProjectLayoutProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="bg-[#f6f6f6] relative w-full min-h-screen">
      {/* Header */}
      <div className="backdrop-blur-[50px] bg-[#c0ced2] flex items-center justify-between h-[88px] mx-6 mt-6 px-10 py-4 rounded-[100px] w-[calc(100%-48px)]">
        {/* Left section */}
        <div className="flex items-center gap-10 w-[414px]">
          <div className="h-5 w-[110px]">
            <img alt="Logo" className="block max-w-none size-full" src={imgLogo} />
          </div>
          
          <div className="bg-[rgba(255,255,255,0.07)] h-12 rounded-[100px] w-[264px] relative">
            <div className="absolute flex items-center gap-[42px] left-6 top-3">
              <span className="font-medium text-[#06263d] text-xl">Workspace name</span>
              <div className="rotate-180">
                <img alt="Arrow" className="w-6 h-6" src={imgIconamoonArrowUp2Light} />
              </div>
            </div>
          </div>
        </div>

        {/* Center - Search bar */}
        <div className="bg-white h-12 rounded-[100px] w-[356px] relative">
          <div className="absolute flex items-center gap-4 left-6 top-3">
            <img alt="Search" className="w-6 h-6" src={imgGroup2} />
            <input
              type="text"
              placeholder="search for anything..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="font-normal text-[#999999] text-base bg-transparent outline-none flex-1"
            />
          </div>
          <img alt="Filter" className="absolute right-3 top-3 w-6 h-6" src={imgMageFilter} />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            {/* Notification icons */}
            <div className="relative w-12 h-12">
              <img alt="AI" className="absolute inset-0" src={imgEllipse10} />
              <img alt="AI Icon" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6" src={imgGroup} />
            </div>
            <div className="relative w-12 h-12">
              <img alt="Bell" className="absolute inset-0" src={imgEllipse10} />
              <img alt="Bell Icon" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6" src={imgGroup1} />
            </div>
            <div className="w-12 h-12">
              <img alt="Settings" className="w-full h-full" src={imgGroup1984077193} />
            </div>
          </div>

          {/* User profile */}
          <div className="bg-white flex items-center gap-2.5 pl-2 pr-4 py-[5px] rounded-3xl">
            <div className="relative w-[38px] h-[38px]">
              <img alt="User Avatar" className="w-full h-full rounded-full" src={imgEllipse3226} />
            </div>
            <div>
              <div className="text-[#292d32] text-sm font-normal">Lisa</div>
              <div className="text-[rgba(41,45,50,0.44)] text-xs font-normal">Product manager</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex mt-[52px]">
        {/* Sidebar */}
        <div className={`h-[957px] ml-6 relative transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-60'}`}>
          <img alt="Sidebar Background" className="absolute inset-0" src={imgSubtract} />
          
          {/* Collapse button */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute bg-[#c0ced2] p-2 rounded-[20px] w-10 h-10 top-[477px] right-0 transform translate-x-1/2 hover:bg-[#b0c0c4] transition-colors z-10"
          >
            <img 
              alt="Collapse" 
              className={`w-4 h-4 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} 
              src={imgPajamasCollapseLeft} 
            />
          </button>

          {/* Sidebar content */}
          <div className={`absolute inset-0 p-7 transition-opacity duration-300 ${sidebarCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {/* MANAGE section */}
            <div className="text-[#5a5a5a] text-sm font-medium mb-4 mt-10">MANAGE</div>
            
            <div className="flex items-center gap-4 px-2 py-0.5 rounded-lg mb-6 hover:bg-[rgba(6,38,61,0.1)] transition-colors cursor-pointer">
              <div className="w-6 h-6">
                <img alt="Dashboard" className="w-full h-full" src={img} />
              </div>
              <span className="font-semibold text-[#06263d] text-lg">Dash Board</span>
            </div>

            <div className="flex items-center gap-4 px-2 py-0.5 rounded-lg mb-10 hover:bg-[rgba(6,38,61,0.1)] transition-colors cursor-pointer">
              <div className="w-6 h-6">
                <img alt="Projects" className="w-full h-full" src={img} />
              </div>
              <span className="font-semibold text-[#06263d] text-lg">Projects</span>
            </div>

            {/* RECENT section */}
            <div className="text-[#5a5a5a] text-sm font-medium mb-4">RECENT</div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 px-2 py-0.5 rounded-lg hover:bg-[rgba(6,38,61,0.1)] transition-colors cursor-pointer">
                <div className="w-6 h-6">
                  <img alt="Project" className="w-full h-full" src={img} />
                </div>
                <span className="font-medium text-[#06263d] text-base">Ricemill Portal</span>
              </div>
              
              <div className="flex items-center gap-4 px-2 py-0.5 rounded-lg hover:bg-[rgba(6,38,61,0.1)] transition-colors cursor-pointer">
                <div className="w-6 h-6">
                  <img alt="Project" className="w-full h-full" src={img} />
                </div>
                <span className="font-medium text-[#06263d] text-base">V-accel Website</span>
              </div>
              
              <div className="flex items-center gap-4 px-2 py-0.5 rounded-lg hover:bg-[rgba(6,38,61,0.1)] transition-colors cursor-pointer">
                <div className="w-6 h-6">
                  <img alt="Project" className="w-full h-full" src={img} />
                </div>
                <span className="font-medium text-[#06263d] text-base">Hire-accel</span>
              </div>
            </div>
          </div>

          {/* Collapsed sidebar content */}
          {sidebarCollapsed && (
            <div className="absolute inset-0 p-2 pt-20">
              <div className="space-y-4">
                <div className="w-12 h-12 flex items-center justify-center hover:bg-[rgba(6,38,61,0.1)] rounded-lg transition-colors cursor-pointer">
                  <img alt="Dashboard" className="w-6 h-6" src={img} />
                </div>
                <div className="w-12 h-12 flex items-center justify-center hover:bg-[rgba(6,38,61,0.1)] rounded-lg transition-colors cursor-pointer">
                  <img alt="Projects" className="w-6 h-6" src={img} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-8' : 'ml-[40px]'}`}>
          <div className={className}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}