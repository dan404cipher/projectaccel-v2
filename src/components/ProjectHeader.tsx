import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbLayoutKanban } from "react-icons/tb";
import { LuChartGantt } from "react-icons/lu";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { BsListCheck } from "react-icons/bs";



// Import icons (you'll need to add these to your public/icons folder)
const imgGroup = '/icons/e42dd001ef5e496375d00f9bd9f064301a8b9ab3.svg';
const imgStreamlineFlexDashboard3 = '/icons/19558319ea945b979494611aee69f1a69fdd5ed5.svg';
const imgCodiconDebugStepBack = '/icons/25d9978e6ee520adcae953bb81971ba680eb074e.svg';
const imgFluentPeopleTeam16Regular = '/icons/f626b26b7a59007334b99699a973c47adb5c30df.svg';
const imgMdiReportBoxMultipleOutline = '/icons/70cdbc2f90478290385b72c771b5e2f1049efd9d.svg';
const imgFluentArrowSprint20Filled = "/icons/2ec924c70b4581fb8ce85d780f89be6ca89bd48f.svg";

interface ProjectHeaderProps {
  projectName?: string;
  activeTab?: 'overview' | 'backlog' | 'sprint' | 'team' | 'report';
  activeSprintTab?: 'kanbanView' | 'listView' | 'sortByStatus';
  onTabChange?: (tab: string) => void;
  onActiveSprintTabChange?: (tab: string) => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  projectName = "Example project name",
  activeTab = 'overview',
  onTabChange,
  activeSprintTab = 'listView',
  onActiveSprintTabChange
}) => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [currentSprintTab, setCurrentSprintTab] = useState(activeSprintTab);

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab as any);
    onTabChange?.(tab);

    // Navigate to appropriate route based on tab
    switch (tab) {
      case 'overview':
        navigate('/project-overview');
        break;
      case 'backlog':
        navigate('/backlog');
        break;
      case 'sprint':
        navigate('/active-sprint');
        break;
      case 'team':
        navigate('/team');
        break;
      case 'report':
        navigate('/help-support'); // You might want to create a dedicated report route
        break;
      default:
        break;
    }
  };

  const isActiveTab = (tab: string) => currentTab === tab;

  const handleActiveSprintTabClick = (tabId: number) => {
    let tabName: string;
    switch (tabId) {
      case 1:
        tabName = 'kanbanView';
        break;
      case 2:
        tabName = 'listView';
        break;
      case 3:
        tabName = 'sortByStatus';
        break;
      case 4:
        tabName = 'sortByStatus';
        break;
      default:
        tabName = 'listView';
    }
    
    setCurrentSprintTab(tabName as any);
    onActiveSprintTabChange?.(tabName);
  };


 const  activeSprintTabs=[
    {
      id:1,
      name: 'kanbanView',
      icon:TbLayoutKanban
    },
    {
      id:2,
      name: 'listView', 
      icon:BsListCheck
    },
    {
      id:3,
      name: 'sortByStatus',
     icon:MdOutlineCalendarMonth
    },
  {
    id:4,
    name: 'Chart',
    icon:LuChartGantt
  }
  ]

  return (
    <div className="bg-[#f6f6f6] p-4 pb-2 flex-shrink-0">
      <div className="mb-3">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8" onClick={() => navigate('/project-list')}>
            <img alt="arrow" className="w-5 h-5 rotate-[-90deg]" src={imgGroup} />
          </div>
          <h1 className="text-2xl font-medium text-[#438197]">
            {projectName}
          </h1>
        </div>

        {/* Navigation Tabs */}
        <div className=' flex items-center justify-between'>
          <div className="flex gap-6 mb-3 relative">
            <div
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity relative"
              onClick={() => handleTabClick('overview')}
            >
              <img alt="dashboard" className="w-5 h-5" src={imgStreamlineFlexDashboard3} />
              <span className="text-lg font-medium text-[#06263d]">Overview</span>
              {isActiveTab('overview') && (
                <div className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#EB7500] rounded-full"></div>
              )}
            </div>

            <div
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity relative"
              onClick={() => handleTabClick('backlog')}
            >
              <img alt="backlog" className="w-5 h-5" src={imgCodiconDebugStepBack} />
              <span className="text-lg font-medium text-[#06263d]">Backlog</span>
              {isActiveTab('backlog') && (
                <div className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#EB7500] rounded-full"></div>
              )}
            </div>

            <div
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity relative"
              onClick={() => handleTabClick('sprint')}
            >
              <img alt="dashboard" className="w-5 h-5" src={imgFluentArrowSprint20Filled} />
              <span className="text-lg font-medium text-[#06263d]">Active Sprint</span>
              {isActiveTab('sprint') && (
                <div className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#EB7500] rounded-full"></div>
              )}
            </div>

            <div
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity relative"
              onClick={() => handleTabClick('team')}
            >
              <img alt="team" className="w-5 h-5" src={imgFluentPeopleTeam16Regular} />
              <span className="text-lg font-medium text-[#06263d]">Team</span>
              {isActiveTab('team') && (
                <div className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#EB7500] rounded-full"></div>
              )}
            </div>

            <div
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity relative"
              onClick={() => handleTabClick('report')}
            >
              <img alt="report" className="w-5 h-5" src={imgMdiReportBoxMultipleOutline} />
              <span className="text-lg font-medium text-[#06263d]">Report</span>
              {isActiveTab('report') && (
                <div className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#EB7500] rounded-full"></div>
              )}
            </div>
          </div>
         { currentTab ==='sprint'&&<div className='bg-white rounded-full flex items-center gap-4 px-4 py-2'>
            {activeSprintTabs?.map(data => (
              <div 
                key={data.id}
                className={`p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  currentSprintTab === data.name 
                    ? 'bg-[#06263D] text-[#ffffff] shadow-[0_2px_8px_0_rgba(6,38,61,0.06)_inset]' 
                    : 'bg-gray-100 text-[#000000] hover:bg-gray-200'
                }`}
                onClick={() => handleActiveSprintTabClick(data.id)}
              >
                <data.icon className='w-5 h-5' />
              </div>
            ))}
          </div>}
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;