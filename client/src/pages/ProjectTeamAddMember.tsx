import React, { useState } from 'react';

// Image assets from Figma design
const imgEllipse3246 = "http://localhost:3845/assets/e85eabedbb63d4230d4ab41a8bd410860763bcb0.svg";
const imgCarbonGrowth = "http://localhost:3845/assets/51f3842a38688aa57cb68a261db605beac6c705e.svg";
const imgMaterialSymbolsAddRounded = "http://localhost:3845/assets/6d0338bcf23c3980d0a3ece3032f8790cd78d44b.svg";
const imgCarbonGrowth1 = "http://localhost:3845/assets/e0c378a863f7e8355ef7ba5ca0499d4ed37dca11.svg";
const imgGroup4 = "http://localhost:3845/assets/35c5b2d24ff24f1d3138f02467137d71a2b9ae93.svg";
const imgLucideSortDesc = "http://localhost:3845/assets/9d83a8d7e9a88e769a7429c861aa53a5c092b1c5.svg";
const imgFluentGroup24Regular = "http://localhost:3845/assets/c66d9c4f0de85cf008c34c3ad437fa008be564db.svg";
const imgIcRoundPlus = "http://localhost:3845/assets/a7c0c75d0ec0a1982d46bc19093df55b021a401c.svg";
const imgPhKanbanFill = "http://localhost:3845/assets/fdfd6519ff8dc5acdbb6048589d6921fea71cbe8.svg";
const imgProiconsTaskList = "http://localhost:3845/assets/935666228f191e7eff80fb57543eff5c627baebf.svg";
const imgFontistoDate = "http://localhost:3845/assets/bce17fdf9a51ff413188a2e607f8b8803f6fae97.svg";
const imgMynauiChartGantt = "http://localhost:3845/assets/e178fe15f264f6b933e72ff0d92acfdb728a5346.svg";
const imgSolarDangerTriangleBold = "http://localhost:3845/assets/4fb6b66a49201e46253f2b0b6f5cf87c71bb4671.svg";
const imgIconamoonArrowUp2Light1 = "http://localhost:3845/assets/57e534e88abf78036ff93b889862f8bcae4e9f25.svg";
const imgIcRoundMinus = "http://localhost:3845/assets/ca6ee4baf519baef9b73a213557b2d629e45f427.svg";
const imgIcRoundPlus1 = "http://localhost:3845/assets/2b70cd570662b0da9cbdcdd7947667ba64b31634.svg";
const imgSolarMenuDotsBold = "http://localhost:3845/assets/44141ab637b3e9ba1dd2fc2500d04cbfb069b1bb.svg";
const imgGroup3 = "http://localhost:3845/assets/e42dd001ef5e496375d00f9bd9f064301a8b9ab3.svg";
const imgStreamlineFlexDashboard3 = "http://localhost:3845/assets/19558319ea945b979494611aee69f1a69fdd5ed5.svg";
const imgCodiconDebugStepBack = "http://localhost:3845/assets/25d9978e6ee520adcae953bb81971ba680eb074e.svg";
const imgFluentArrowSprint20Filled = "http://localhost:3845/assets/2ec924c70b4581fb8ce85d780f89be6ca89bd48f.svg";
const imgFluentPeopleTeam16Regular = "http://localhost:3845/assets/f626b26b7a59007334b99699a973c47adb5c30df.svg";
const imgMdiReportBoxMultipleOutline = "http://localhost:3845/assets/70cdbc2f90478290385b72c771b5e2f1049efd9d.svg";
const imgLine35 = "http://localhost:3845/assets/92fff29c924299dc8c9a9eda99b2d94374d9b879.svg";
const imgEllipse7 = "http://localhost:3845/assets/4415cf6b90ae6200aee0458930211f231742cfb8.png";

interface ActiveMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  availability: 'high' | 'low';
  progress: number;
  skills: string[];
}

interface DraftMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  hours: string;
  cost: string;
  projectAllocation: number;
  loadStatus: 'high' | 'normal';
}

interface ViewMode {
  id: string;
  icon: string;
  isActive: boolean;
}

export default function ProjectTeamAddMember() {
  const [activeTab, setActiveTab] = useState('team');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewModes, setViewModes] = useState<ViewMode[]>([
    {
      id: 'kanban',
      icon: imgPhKanbanFill,
      isActive: true
    },
    {
      id: 'list',
      icon: imgProiconsTaskList,
      isActive: false
    },
    {
      id: 'calendar',
      icon: imgFontistoDate,
      isActive: false
    },
    {
      id: 'gantt',
      icon: imgMynauiChartGantt,
      isActive: false
    }
  ]);

  const activeMembers: ActiveMember[] = [
    {
      id: '1',
      name: 'Saranya',
      role: 'Developer',
      avatar: imgEllipse7,
      availability: 'high',
      progress: 20,
      skills: ['Product strategy', 'Roadmap', 'Analytic', '+2']
    },
    {
      id: '2',
      name: 'Saranya',
      role: 'Developer',
      avatar: imgEllipse7,
      availability: 'low',
      progress: 80,
      skills: ['Product strategy', 'Roadmap', 'Analytic', '+2']
    },
    {
      id: '3',
      name: 'Saranya',
      role: 'Developer',
      avatar: imgEllipse7,
      availability: 'high',
      progress: 20,
      skills: ['Product strategy', 'Roadmap', 'Analytic', '+2']
    },
    {
      id: '4',
      name: 'Saranya',
      role: 'Developer',
      avatar: imgEllipse7,
      availability: 'high',
      progress: 20,
      skills: ['Product strategy', 'Roadmap', 'Analytic', '+2']
    }
  ];

  const draftMembers: DraftMember[] = [
    {
      id: '1',
      name: 'Saranya',
      role: 'Developer',
      avatar: imgEllipse7,
      hours: '40',
      cost: '$2,000',
      projectAllocation: 20,
      loadStatus: 'high'
    },
    {
      id: '2',
      name: 'Saranya',
      role: 'Developer',
      avatar: imgEllipse7,
      hours: '40',
      cost: '$2,000',
      projectAllocation: 80,
      loadStatus: 'normal'
    }
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleViewModeClick = (viewId: string) => {
    setViewModes(prev => prev.map(mode => ({
      ...mode,
      isActive: mode.id === viewId
    })));
  };

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-gray-500">Projects</span>
        <span className="text-sm text-gray-400">/</span>
        <span className="text-sm text-gray-500">Ricemill Portal</span>
        <span className="text-sm text-gray-400">/</span>
        <span className="text-sm font-medium text-black">Team</span>
      </div>

      {/* Project tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['overview', 'backlog', 'active', 'team'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-[#67909b] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Active Members Section - Left Column */}
        <div className="space-y-6">
          {/* Active Members Header */}
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-medium text-[#06263d]">Active members</h2>
            <div className="relative">
              <img alt="Member Count" className="w-7 h-7" src={imgEllipse3246} />
              <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-medium text-white text-base">
                24
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4">
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
            
            <button className="bg-[#67909b] flex items-center gap-1 h-10 px-4 py-2 rounded-lg text-white">
              <div className="rotate-[270deg]">
                <img alt="Plus" className="w-4 h-4" src={imgIcRoundPlus} />
              </div>
              <span className="font-medium text-sm">Add Member</span>
            </button>
          </div>

          {/* View mode toggles */}
          <div className="bg-white flex items-center gap-4 px-4 py-2 rounded-3xl shadow-sm w-fit">
            {viewModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => handleViewModeClick(mode.id)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  mode.isActive ? 'bg-[#06263d] shadow-sm' : 'hover:bg-gray-100'
                }`}
              >
                <img alt={mode.id} className="w-4 h-4" src={mode.icon} />
              </button>
            ))}
          </div>

          {/* Active members list */}
          <div className="space-y-[29px]">
            {activeMembers.map((member) => (
              <ActiveMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* Total Impact Analysis Section - Right Column */}
        <div className="bg-white rounded-3xl p-6 h-[672px]">
          <h3 className="text-xl font-medium text-[#06263d] mb-8">Total Impact Analysis</h3>
          
          {/* Metrics cards */}
          <div className="flex gap-4 mb-8">
            <div className="bg-[#f9f9f9] rounded-2xl p-4 flex-1 text-center">
              <div className="text-[#333333] text-base font-semibold mb-2">Total duration</div>
              <div className="text-[#020817] text-2xl font-bold tracking-[-0.6px]">48 hrs</div>
            </div>
            <div className="bg-[#f9f9f9] rounded-2xl p-4 flex-1 text-center">
              <div className="text-[#333333] text-base font-semibold mb-2">Total cost</div>
              <div className="text-[#020817] text-2xl font-bold tracking-[-0.6px]">₹ 6000</div>
            </div>
          </div>

          {/* Draft Team Members */}
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-xl font-medium text-[#06263d]">Draft Team Members</h3>
            <div className="relative">
              <img alt="Draft Count" className="w-7 h-7" src={imgEllipse3246} />
              <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-medium text-white text-base">
                2
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {draftMembers.map((member) => (
              <DraftMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Active Member Card Component
function ActiveMemberCard({ member }: { member: ActiveMember }) {
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

      {/* Availability and Add button */}
      <div className="absolute flex items-center gap-4 right-6 top-4">
        <div className="flex items-center gap-2">
          <img 
            alt="Availability" 
            className="w-6 h-6" 
            src={member.availability === 'high' ? imgCarbonGrowth : imgCarbonGrowth1} 
          />
          <span className={`font-medium text-sm ${
            member.availability === 'high' ? 'text-[#22c55d]' : 'text-[#ee4443]'
          }`}>
            {member.availability === 'high' ? 'High Availability' : 'Low Availability'}
          </span>
        </div>
        
        <div className="bg-[#67909b] rounded w-6 h-6 flex items-center justify-center">
          <img alt="Add" className="w-3.5 h-3.5" src={imgMaterialSymbolsAddRounded} />
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
              className={`${
                skill.startsWith('+') 
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

// Draft Member Card Component
function DraftMemberCard({ member }: { member: DraftMember }) {
  const [hours, setHours] = useState(member.hours);
  const [cost, setCost] = useState(member.cost);

  const handleHoursChange = (increment: boolean) => {
    const currentHours = parseInt(hours);
    const newHours = increment ? currentHours + 1 : Math.max(1, currentHours - 1);
    setHours(newHours.toString());
    setCost(`₹ ${(newHours * 50).toLocaleString()}`);
  };

  const handleCostChange = (increment: boolean) => {
    const currentCost = parseInt(cost.replace(/[₹,\s]/g, ''));
    const newCost = increment ? currentCost + 50 : Math.max(50, currentCost - 50);
    setCost(`₹ ${newCost.toLocaleString()}`);
    setHours(Math.ceil(newCost / 50).toString());
  };

  return (
    <div className="bg-white h-[146px] overflow-hidden rounded-3xl w-[592px] relative border-2 border-[#e4eae8]">
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

      {/* Menu dots */}
      <div className="absolute right-6 top-6">
        <img alt="Menu" className="w-6 h-6" src={imgSolarMenuDotsBold} />
      </div>

      {/* Hour and Cost inputs */}
      <div className="absolute left-[249px] top-[25px] flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            <span className="font-medium text-[#333333] text-xs">Hour</span>
            <div className="rotate-[180deg]">
              <img alt="Arrow" className="w-4 h-4" src={imgIconamoonArrowUp2Light1} />
            </div>
          </div>
          <div className="bg-[#f1f7f9] flex items-center gap-2 px-1 py-0.5 rounded-lg">
            <img alt="Minus" className="w-4 h-4" src={imgIcRoundMinus} />
            <span className="font-normal text-[#252525] text-xs tracking-[-0.6px]">{hours}</span>
            <div className="rotate-[270deg]">
              <img alt="Plus" className="w-4 h-4" src={imgIcRoundPlus1} />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="font-medium text-[#333333] text-xs">Cost</span>
          <div className="bg-[#f1f7f9] flex items-center gap-2 px-1 py-0.5 rounded-lg">
            <img alt="Minus" className="w-4 h-4" src={imgIcRoundMinus} />
            <span className="font-normal text-[#252525] text-xs tracking-[-0.6px]">{cost}</span>
            <div className="rotate-[270deg]">
              <img alt="Plus" className="w-4 h-4" src={imgIcRoundPlus1} />
            </div>
          </div>
        </div>
      </div>

      {/* Load status and project allocation */}
      <div className="absolute left-6 top-[74px] w-[544px] flex items-end justify-between">
        <div className="flex flex-col gap-2 w-[93px]">
          <div className="flex items-center gap-1">
            <img alt="Warning" className="w-6 h-6" src={imgSolarDangerTriangleBold} />
            <span className="font-medium text-[#252525] text-sm">High load</span>
          </div>
          <div className="font-medium text-[#666666] text-xs">Total cost {cost}</div>
        </div>
        
        <div className="relative">
          <div className="bg-[#f0f2f4] h-4 overflow-hidden rounded-[9999px] w-[397px] relative">
            <div 
              className="absolute bg-[#438197] bottom-0 left-0 top-0"
              style={{ right: `${397 - (397 * member.projectAllocation / 100)}px` }}
            />
          </div>
          <div className="absolute right-0 top-2.5 font-normal text-[#666666] text-sm">
            {member.projectAllocation}%
          </div>
          <div className="absolute left-[159px] top-[38px] font-medium text-[#999999] text-xs tracking-[-0.24px]">
            Project Allocation
          </div>
        </div>
      </div>
    </div>
  );
} 