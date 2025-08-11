import ProjectHeader from '@/components/ProjectHeader';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Image assets from Figma design
const imgGroup = "/icons/e42dd001ef5e496375d00f9bd9f064301a8b9ab3.svg";
const imgEllipse3246 = "http://localhost:3845/assets/e85eabedbb63d4230d4ab41a8bd410860763bcb0.svg";
const img1 = "http://localhost:3845/assets/709e3d642f94395997d33c1d1b41452781858dc7.svg";
const imgFrame = "http://localhost:3845/assets/fd4081f2e32f7cb9874727acba000ef067d3e88d.svg";
const img2 = "http://localhost:3845/assets/a0b0e1944dbb1f6fb87aef81965787dbfa578b0d.svg";
const imgGroup4 = "http://localhost:3845/assets/35c5b2d24ff24f1d3138f02467137d71a2b9ae93.svg";
const imgLucideSortDesc = "http://localhost:3845/assets/9d83a8d7e9a88e769a7429c861aa53a5c092b1c5.svg";
const imgFluentGroup24Regular = "http://localhost:3845/assets/c66d9c4f0de85cf008c34c3ad437fa008be564db.svg";
const imgIcRoundPlus = "http://localhost:3845/assets/a7c0c75d0ec0a1982d46bc19093df55b021a401c.svg";
const imgPhKanbanFill = "http://localhost:3845/assets/fdfd6519ff8dc5acdbb6048589d6921fea71cbe8.svg";
const imgProiconsTaskList = "http://localhost:3845/assets/935666228f191e7eff80fb57543eff5c627baebf.svg";
const imgFontistoDate = "http://localhost:3845/assets/bce17fdf9a51ff413188a2e607f8b8803f6fae97.svg";
const imgMynauiChartGantt = "http://localhost:3845/assets/e178fe15f264f6b933e72ff0d92acfdb728a5346.svg";
const imgGroup3 = "http://localhost:3845/assets/e42dd001ef5e496375d00f9bd9f064301a8b9ab3.svg";
const imgStreamlineFlexDashboard3 = "http://localhost:3845/assets/19558319ea945b979494611aee69f1a69fdd5ed5.svg";
const imgCodiconDebugStepBack = "http://localhost:3845/assets/25d9978e6ee520adcae953bb81971ba680eb074e.svg";
const imgFluentArrowSprint20Filled = "http://localhost:3845/assets/2ec924c70b4581fb8ce85d780f89be6ca89bd48f.svg";
const imgFluentPeopleTeam16Regular = "http://localhost:3845/assets/f626b26b7a59007334b99699a973c47adb5c30df.svg";
const imgMdiReportBoxMultipleOutline = "http://localhost:3845/assets/70cdbc2f90478290385b72c771b5e2f1049efd9d.svg";
const imgLine35 = "http://localhost:3845/assets/92fff29c924299dc8c9a9eda99b2d94374d9b879.svg";
const imgEllipse7 = "http://localhost:3845/assets/4415cf6b90ae6200aee0458930211f231742cfb8.png";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  dateRange: string;
  tasks: number;
  timeSpent: string;
  progress: number;
  skills: string[];
}

interface ViewMode {
  id: string;
  icon: string;
  isActive: boolean;
}

export default function ProjectTeam() {
  const [activeTab, setActiveTab] = useState('team');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Saranya',
      role: 'Project Manager',
      avatar: imgEllipse7,
      dateRange: '2025-09-01 to 2025-09-24',
      tasks: 2,
      timeSpent: '14h/40h',
      progress: 20,
      skills: ['Product strategy', 'Roadmap', 'Analytic', '+2']
    },
    {
      id: '2',
      name: 'Saranya',
      role: 'Project Manager',
      avatar: imgEllipse7,
      dateRange: '2025-09-01 to 2025-09-24',
      tasks: 2,
      timeSpent: '14h/40h',
      progress: 20,
      skills: ['Product strategy', 'Roadmap', 'Analytic', '+2']
    },
    {
      id: '3',
      name: 'Saranya',
      role: 'Project Manager',
      avatar: imgEllipse7,
      dateRange: '2025-09-01 to 2025-09-24',
      tasks: 2,
      timeSpent: '14h/40h',
      progress: 20,
      skills: ['Product strategy', 'Roadmap', 'Analytic', '+2']
    },
    {
      id: '4',
      name: 'Saranya',
      role: 'Project Manager',
      avatar: imgEllipse7,
      dateRange: '2025-09-01 to 2025-09-24',
      tasks: 2,
      timeSpent: '14h/40h',
      progress: 20,
      skills: ['Product strategy', 'Roadmap', 'Analytic', '+2']
    },
    {
      id: '5',
      name: 'Saranya',
      role: 'Project Manager',
      avatar: imgEllipse7,
      dateRange: '2025-09-01 to 2025-09-24',
      tasks: 2,
      timeSpent: '14h/40h',
      progress: 20,
      skills: ['Product strategy', 'Roadmap', 'Analytic', '+2']
    },
    {
      id: '6',
      name: 'Saranya',
      role: 'Project Manager',
      avatar: imgEllipse7,
      dateRange: '2025-09-01 to 2025-09-24',
      tasks: 2,
      timeSpent: '14h/40h',
      progress: 20,
      skills: ['Product strategy', 'Roadmap', 'Analytic', '+2']
    }
  ];

  const viewModes: ViewMode[] = [
    { id: 'kanban', icon: imgPhKanbanFill, isActive: true },
    { id: 'list', icon: imgProiconsTaskList, isActive: false },
    { id: 'calendar', icon: imgFontistoDate, isActive: false },
    { id: 'gantt', icon: imgMynauiChartGantt, isActive: false }
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleViewModeClick = (viewId: string) => {
    console.log('View mode changed to:', viewId);
  };

  const handleAddMember = () => {
    navigate('/team/add-member');
  };

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <ProjectHeader projectName="Example project name" activeTab="team" onTabChange={handleTabClick} />

      {/* Content area */}
      <div className="bg-[#f2f2f2] rounded-tl-[40px] rounded-tr-[40px] h-[802px] w-full relative">
        {/* Team header */}
        <div className="flex items-center gap-4 pt-8 px-8">
          <h2 className="font-medium text-[#06263d] text-2xl">Current team members</h2>
          <div className="relative">
            <img alt="Team Count" className="w-7 h-7" src={imgEllipse3246} />
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-medium text-white text-base">
              7
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="absolute right-8 top-[26px] flex items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#67909b] rounded-lg w-10 h-10 flex items-center justify-center">
              <img alt="Search" className="w-[13.333px] h-[13.333px]" src={imgGroup4} />
            </div>
            <div className="bg-[#67909b] rounded-lg w-10 h-10 flex items-center justify-center">
              <img alt="Sort" className="w-4 h-4" src={imgLucideSortDesc} />
            </div>
            <div className="bg-[#67909b] rounded-lg w-10 h-10 flex items-center justify-center">
              <img alt="Group" className="w-4 h-4" src={imgFluentGroup24Regular} />
            </div>
          </div>

          <button
            className="bg-[#67909b] flex items-center gap-1 h-10 px-4 py-4 rounded-lg text-white"
            onClick={handleAddMember}
          >
            <div className="rotate-[270deg]">
              <img alt="Plus" className="w-4 h-4" src={imgIcRoundPlus} />
            </div>
            <span className="font-medium text-sm">Add Member</span>
          </button>
        </div>

        {/* View mode toggles */}
        <div className="absolute right-8 top-[75px] bg-white flex items-center gap-4 px-4 py-2 rounded-3xl shadow-[0px_2px_4px_0px_rgba(6,38,61,0.1)]">
          {viewModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleViewModeClick(mode.id)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${mode.isActive ? 'bg-[#06263d] shadow-[2px_2px_4px_0px_rgba(6,38,61,0.1)]' : ''
                }`}
            >
              <img alt={mode.id} className="w-4 h-4" src={mode.icon} />
            </button>
          ))}
        </div>

        {/* Team members grid */}
        <div className="flex flex-col gap-8 px-8 pt-[66px] w-full">
          {/* Row 1 */}
          <div className="flex gap-4 w-full">
            {teamMembers.slice(0, 2).map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex gap-4 w-full">
            {teamMembers.slice(2, 4).map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>

          {/* Row 3 */}
          <div className="flex gap-4 w-full">
            {teamMembers.slice(4, 6).map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Team Member Card Component
function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-white h-[146px] overflow-hidden rounded-3xl w-[656px] relative">
      {/* Header */}
      <div className="flex items-center gap-4 p-6">
        <div className="w-10 h-10">
          <img alt={member.name} className="w-full h-full rounded-full" src={member.avatar} />
        </div>
        <div className="flex flex-col gap-0.5 w-[117px]">
          <div className="font-medium text-black text-base leading-5">{member.name}</div>
          <div className="font-medium text-[#888888] text-sm leading-5">{member.role}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute flex items-center gap-4 left-[239px] top-4">
        <div className="flex items-center gap-2">
          <img alt="Calendar" className="w-6 h-6" src={img1} />
          <span className="font-medium text-[#666666] text-sm leading-5">{member.dateRange}</span>
        </div>

        <div className="flex items-center gap-2">
          <img alt="Tasks" className="w-6 h-6" src={imgFrame} />
          <span className="font-medium text-[#666666] text-sm leading-5">{member.tasks} Tasks</span>
        </div>

        <div className="flex items-center gap-2">
          <img alt="Time" className="w-6 h-6" src={img2} />
          <span className="font-medium text-[#666666] text-sm leading-5">{member.timeSpent}</span>
        </div>
      </div>

      {/* Progress section */}
      <div className="absolute flex flex-col gap-4 left-20 top-[74px] w-[552px]">
        {/* Progress bar */}
        <div className="flex items-center gap-4 w-full">
          <div className="bg-[#f0f2f4] h-4 overflow-hidden rounded-[9999px] w-[509px] relative">
            <div
              className="absolute bg-[#438197] bottom-0 left-0 top-0"
              style={{ right: `${509 - (509 * member.progress / 100)}px` }}
            />
          </div>
          <span className="font-normal text-[#666666] text-sm leading-5">{member.progress}%</span>
        </div>

        {/* Skills tags */}
        <div className="flex items-center gap-3">
          {member.skills.map((skill, index) => (
            <div
              key={index}
              className={`${skill.startsWith('+')
                  ? 'border border-[#666666] border-solid'
                  : 'bg-[#f0f5f8]'
                } flex items-center justify-center h-5 px-2 py-0 rounded-3xl`}
            >
              <span className="font-medium text-[#666666] text-xs leading-5">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}