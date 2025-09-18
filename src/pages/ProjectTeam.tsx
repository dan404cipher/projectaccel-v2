import ProjectHeader from '@/components/ProjectHeader';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CalentIcon from '/icons/Vector.svg';
import ClockIcon from '/icons/Timer.svg';
import TaskIcon from '/icons/Task.svg';
import AddMemember from '@/components/model/AddMemember';


// Image assets from Figma design
const imgIcRoundPlus = "http://localhost:3845/assets/a7c0c75d0ec0a1982d46bc19093df55b021a401c.svg";
const imgPhKanbanFill = "http://localhost:3845/assets/fdfd6519ff8dc5acdbb6048589d6921fea71cbe8.svg";
const imgProiconsTaskList = "http://localhost:3845/assets/935666228f191e7eff80fb57543eff5c627baebf.svg";
const imgFontistoDate = "http://localhost:3845/assets/bce17fdf9a51ff413188a2e607f8b8803f6fae97.svg";
const imgMynauiChartGantt = "http://localhost:3845/assets/e178fe15f264f6b933e72ff0d92acfdb728a5346.svg";
const imgEllipse7 = "http://localhost:3845/assets/4415cf6b90ae6200aee0458930211f231742cfb8.png";
const imgEllipse248 = "/icons/b1766b7062b0c67d9be111f724f646b15b02bf09.png";


export interface TeamMember {
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

export interface ViewMode {
  id: string;
  icon: string;
  isActive: boolean;
}

export default function ProjectTeam() {
  const [activeTab, setActiveTab] = useState('team');
  const [searchTerm, setSearchTerm] = useState('');
  const [openAddMemberModal, setOpenAddMemberModal] = useState(false);
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
      progress: 70,
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
    <div className="w-full h-full">
      {/* Breadcrumb */}
      <ProjectHeader projectName="Example project name" activeTab="team" onTabChange={handleTabClick} />

      {/* Content area */}
      <div className="bg-[#f2f2f2] rounded-tl-[40px] rounded-tr-[40px] h-[802px] w-full relative">
        {/* Team header */}
        <div className='flex items-center justify-between px-8 py-5'>
          <div className="flex items-center gap-4  ">
            <h2 className="font-medium text-[#06263d] text-2xl">Current team members</h2>
            <div className="flex items-center gap-1">
              <div className="bg-[#438197] rounded-full w-6 h-6 flex items-center justify-center">
                <span className="text-white text-sm font-medium">{teamMembers.length ||0}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 bg-[#67909b] rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-[#5a7d87] hover:scale-105 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <g clipPath="url(#clip0_5_28200)">
                    <path d="M6.16363 10.8888C8.77168 10.8888 10.8859 8.77461 10.8859 6.16656C10.8859 3.5585 8.77168 1.44434 6.16363 1.44434C3.55557 1.44434 1.44141 3.5585 1.44141 6.16656C1.44141 8.77461 3.55557 10.8888 6.16363 10.8888Z" stroke="white" stroke-linejoin="round" />
                    <path d="M7.73653 4.31734C7.5304 4.11068 7.28546 3.9468 7.01578 3.83511C6.74611 3.72341 6.45703 3.66612 6.16514 3.66651C5.87325 3.66612 5.58417 3.72341 5.31449 3.83511C5.04482 3.9468 4.79988 4.11068 4.59375 4.31734M9.56014 9.56151L11.9171 11.9185" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_5_28200">
                      <rect width="13.3333" height="13.3333" fill="white" transform="translate(0.332031 0.333252)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="w-9 h-9 bg-[#67909b] rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-[#5a7d87] hover:scale-105 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 10.6667L4.66667 13.3334M4.66667 13.3334L7.33333 10.6667M4.66667 13.3334V2.66675M7.33333 2.66675H14M7.33333 5.33342H12M7.33333 8.00008H10" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="w-9 h-9 bg-[#67909b] rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-[#5a7d87] hover:scale-105 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2.55556 4.11111C2.96811 4.11111 3.36378 3.94722 3.6555 3.6555C3.94722 3.36378 4.11111 2.96811 4.11111 2.55556C4.11111 2.143 3.94722 1.74733 3.6555 1.45561C3.36378 1.16389 2.96811 1 2.55556 1C2.143 1 1.74733 1.16389 1.45561 1.45561C1.16389 1.74733 1 2.143 1 2.55556C1 2.96811 1.16389 3.36378 1.45561 3.6555C1.74733 3.94722 2.143 4.11111 2.55556 4.11111ZM13.4444 4.11111C13.857 4.11111 14.2527 3.94722 14.5444 3.6555C14.8361 3.36378 15 2.96811 15 2.55556C15 2.143 14.8361 1.74733 14.5444 1.45561C14.2527 1.16389 13.857 1 13.4444 1C13.0319 1 12.6362 1.16389 12.3445 1.45561C12.0528 1.74733 11.8889 2.143 11.8889 2.55556C11.8889 2.96811 12.0528 3.36378 12.3445 3.6555C12.6362 3.94722 13.0319 4.11111 13.4444 4.11111ZM15 13.4444C15 13.857 14.8361 14.2527 14.5444 14.5444C14.2527 14.8361 13.857 15 13.4444 15C13.0319 15 12.6362 14.8361 12.3445 14.5444C12.0528 14.2527 11.8889 13.857 11.8889 13.4444C11.8889 13.0319 12.0528 12.6362 12.3445 12.3445C12.6362 12.0528 13.0319 11.8889 13.4444 11.8889C13.857 11.8889 14.2527 12.0528 14.5444 12.3445C14.8361 12.6362 15 13.0319 15 13.4444ZM2.55556 15C2.96811 15 3.36378 14.8361 3.6555 14.5444C3.94722 14.2527 4.11111 13.857 4.11111 13.4444C4.11111 13.0319 3.94722 12.6362 3.6555 12.3445C3.36378 12.0528 2.96811 11.8889 2.55556 11.8889C2.143 11.8889 1.74733 12.0528 1.45561 12.3445C1.16389 12.6362 1 13.0319 1 13.4444C1 13.857 1.16389 14.2527 1.45561 14.5444C1.74733 14.8361 2.143 15 2.55556 15ZM4.857 2.94444C4.92302 2.55328 4.88822 2.15175 4.75589 1.77778H8.38889C8.90459 1.77778 9.39917 1.98264 9.76382 2.34729C10.1285 2.71195 10.3333 3.20652 10.3333 3.72222V5.66667H12.2778C12.7935 5.66667 13.2881 5.87153 13.6527 6.23618C14.0174 6.60084 14.2222 7.09541 14.2222 7.61111V11.2433C13.8482 11.1113 13.4467 11.0767 13.0556 11.143V7.61111C13.0556 7.40483 12.9736 7.207 12.8278 7.06114C12.6819 6.91528 12.4841 6.83333 12.2778 6.83333H10.3333V8.38889C10.3333 8.90459 10.1285 9.39917 9.76382 9.76382C9.39917 10.1285 8.90459 10.3333 8.38889 10.3333H6.83333V12.2778C6.83333 12.4841 6.91528 12.6819 7.06114 12.8278C7.207 12.9736 7.40483 13.0556 7.61111 13.0556H11.143C11.077 13.4467 11.1118 13.8483 11.2441 14.2222H7.61111C7.09541 14.2222 6.60084 14.0174 6.23618 13.6527C5.87153 13.2881 5.66667 12.7935 5.66667 12.2778V10.3333H3.72222C3.20652 10.3333 2.71195 10.1285 2.34729 9.76382C1.98264 9.39917 1.77778 8.90459 1.77778 8.38889V4.75667C2.15182 4.88873 2.55335 4.92327 2.94444 4.857V8.38889C2.94444 8.59517 3.02639 8.793 3.17225 8.93886C3.31811 9.08472 3.51594 9.16667 3.72222 9.16667H5.66667V7.61111C5.66667 7.09541 5.87153 6.60084 6.23618 6.23618C6.60084 5.87153 7.09541 5.66667 7.61111 5.66667H9.16667V3.72222C9.16667 3.51594 9.08472 3.31811 8.93886 3.17225C8.793 3.02639 8.59517 2.94444 8.38889 2.94444H4.857ZM8.38889 9.16667C8.59517 9.16667 8.793 9.08472 8.93886 8.93886C9.08472 8.793 9.16667 8.59517 9.16667 8.38889V6.83333H7.61111C7.40483 6.83333 7.207 6.91528 7.06114 7.06114C6.91528 7.207 6.83333 7.40483 6.83333 7.61111V9.16667H8.38889Z" fill="white" />
                </svg>
              </div>
            </div>
            <button className="bg-[#67909b] text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-[#5a7d87] hover:scale-105 hover:shadow-lg flex items-center" onClick={()=>setOpenAddMemberModal(true)}>
              <span className='flex items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12.9961 6V11H17.9961C18.2613 11 18.5157 11.1054 18.7032 11.2929C18.8907 11.4804 18.9961 11.7348 18.9961 12C18.9961 12.2652 18.8907 12.5196 18.7032 12.7071C18.5157 12.8946 18.2613 13 17.9961 13H12.9961V18C12.9961 18.2652 12.8907 18.5196 12.7032 18.7071C12.5157 18.8946 12.2613 19 11.9961 19C11.7309 19 11.4765 18.8946 11.289 18.7071C11.1015 18.5196 10.9961 18.2652 10.9961 18V13H5.99609C5.73088 13 5.47652 12.8946 5.28899 12.7071C5.10145 12.5196 4.99609 12.2652 4.99609 12C4.99609 11.7348 5.10145 11.4804 5.28899 11.2929C5.47652 11.1054 5.73088 11 5.99609 11H10.9961V6C10.9961 5.73478 11.1015 5.48043 11.289 5.29289C11.4765 5.10536 11.7309 5 11.9961 5C12.2613 5 12.5157 5.10536 12.7032 5.29289C12.8907 5.48043 12.9961 5.73478 12.9961 6Z" fill="white" />
                </svg>
              </span>
              <span>
                Add Member
              </span>
            </button>
          </div>
        </div>

        {/* Team members grid */}
        <div className='grid grid-cols-2  gap-4 px-8'>
          {
            teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))
          }
        </div>
        {
          <AddMemember isOpen={openAddMemberModal} onClose={()=>setOpenAddMemberModal(false)}/>
        }
      </div>
    </div>
  );
}

// Team Member Card Component
export const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  return (
    <div className='w-full rounded-2xl h-fit flex gap-3 px-5 py-4 bg-white'>
      <div className='flex items-start justify-center  w-fit '>
        <img alt="member" className="w-10 h-10 rounded-full transition-transform duration-200 " src={imgEllipse248} />
      </div>
      <div className=' flex flex-col w-full'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <span className='text-base font-medium text-[#000000]'>{member.name}</span>
            <span className='text-sm text-[#888888] font-medium'>{member.role}</span>
          </div>
          <div className='flex items-start gap-5'>
            <div className='flex items-center gap-2'>
              <img src={CalentIcon} alt="calendar" className='w-4 h-4' />
              <span className='text-sm text-[#888888] font-medium'>{member.dateRange || 'no'}</span>
            </div>
            <div className='flex items-center gap-2'>
              <img src={TaskIcon} alt="calendar" className='w-4 h-4' />
              <span className='text-sm text-[#888888] font-medium'>{member.tasks || 'no'} Tasks</span>
            </div>
            <div className='flex items-center gap-2'>
              <img src={ClockIcon} alt="calendar" className='w-4 h-4' />
              <span className='text-sm text-[#888888] font-medium'>{member.timeSpent}</span>
            </div>
          </div>
        </div>
        <div className="py-2">
          <div className="flex items-center justify-between mb-2">
            <div className="w-full bg-gray-200 rounded-full h-3 mr-4">
              <div className="bg-teal-600 h-3 rounded-full" style={{ width: `${member.progress}%` }}></div>
            </div>
            <span className="text-gray-700 font-medium text-lg">{member.progress}%</span>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          {
            member.skills.map((skill) => (
              <div className='bg-[#F0F5F8] rounded-3xl px-2 py-1 flex items-center justify-center'>
                <span className='text-[#666666] text-sm font-medium'>{skill}</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}