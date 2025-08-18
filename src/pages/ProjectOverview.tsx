import BugOverview from '@/components/dashboard/BugOverview';
import EmergenceIssue from '@/components/dashboard/EmergenceIssue';
import IssuesAnalysis from '@/components/dashboard/IssuesAnalysis';
import { PriorityBreakdown } from '@/components/dashboard/PriorityBreakdown';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import RecentCommand from '@/components/dashboard/RecentCommand';
import { SprintOverview } from '@/components/dashboard/SprintOverview';
import { StatusOverview } from '@/components/dashboard/StatusOverview';
import { TeamOverView } from '@/components/dashboard/TeamOverview';
import TypeOfWork from '@/components/dashboard/TypeOfWork';
import ProjectHeader from '@/components/ProjectHeader';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Image assets from Figma design
const imgSvg = "/icons/c2a1e586581c82bed930644fd4eaca8c9130d64e.svg";
const imgSvg1 = "/icons/5ba67feb4e6393f83f45a6c3927d037c8ff64d47.svg";
const imgSvg2 = "/icons/c7ac791e9ae2e4e80e98ae2787bc34c7734cc7c3.svg";
const imgSvg3 = "/icons/bbb66184b2a69291b2550dcfdc611cf2bfde48c1.svg";
export default function ProjectOverview() {
  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
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
        navigate('/project-team');
        break;
      case 'report':
        navigate('/report');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-[#f6f6f6] h-screen w-full flex flex-col overflow-hidden">
      {/* Project Header - Fixed */}
      <ProjectHeader projectName='Example project name' activeTab='overview' onTabChange={handleTabClick} />

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 pt-2 pb-20">
        {/* Project Info Card */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-2xl font-bold text-[#438197]">
                  E-commerce Platform Redesign
                </h2>
                <div className="bg-[rgba(223,168,116,0.2)] px-2 py-0.5 rounded">
                  <span className="text-xs font-medium text-[#d58d49]">In progress</span>
                </div>
              </div>
              <p className="text-base text-zinc-500 mb-3">
                Client: <span className="text-[#333333]">TechCorp Industries</span>
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center gap-2">
                  <img alt="calendar" className="w-4 h-4" src={imgSvg} />
                  <span className="text-sm text-zinc-500">Start: Jan 15, 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <img alt="calendar" className="w-4 h-4" src={imgSvg1} />
                  <span className="text-sm text-zinc-500">Due: Apr 30, 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <img alt="users" className="w-4 h-4" src={imgSvg2} />
                  <span className="text-sm text-zinc-500">8 members</span>
                </div>
                <div className="flex items-center gap-2">
                  <img alt="progress" className="w-4 h-4" src={imgSvg3} />
                  <span className="text-sm text-zinc-500">68% complete</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="mb-3">
                <div className="flex items-start justify-end gap-2">
                  <div className="text-right pb-4">
                    <p className="text-xs text-zinc-500">Project Manager</p>
                    <p className="text-sm font-medium text-zinc-950">Sarah Johnson</p>
                  </div>
                  <div className="bg-[#34559d] w-8 h-8 rounded-full flex items-center justify-center text-white font-medium">
                    SJ
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 ">
                  <span className="text-xs text-zinc-950">Overall Progress</span>
                  <span className="text-xs text-zinc-500">68%</span>
                </div>
                <div className="w-48 bg-[#ecf2f2] h-2 rounded-full">
                  <div className="bg-[#67909b] h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-[#333333] text-center mb-3">
              Unassigned Issues
            </h3>
            <div className="text-center">
              <div className="text-xl font-bold text-[#06263d] mb-1">4</div>
              <p className="text-xs text-[#999999]">Issues across projects</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-[#333333] text-center mb-3">
              Assigned Issues
            </h3>
            <div className="text-center">
              <div className="text-xl font-bold text-[#06263d] mb-1">44</div>
              <p className="text-xs text-[#999999]">Issues across projects</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-[#333333] text-center mb-3">
              In progress
            </h3>
            <div className="text-center">
              <div className="text-xl font-bold text-[#06263d] mb-1">32</div>
              <p className="text-xs text-[#999999]">Currently being worked on</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-[#333333] text-center mb-3">
              Over Due Issues
            </h3>
            <div className="text-center">
              <div className="text-xl font-bold text-[#06263d] mb-1">5</div>
              <p className="text-xs text-[#999999]">Pending Beyond Deadline</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-[#333333] text-center mb-3">
              Completion Rate
            </h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#2a9d90] mb-1">32%</div>
              <p className="text-xs text-[#999999]">61 of 131 Issues completed</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-6">
          {/* Types of Work Chart */}
          <div className="lg:col-span-2">
            <TypeOfWork />
          </div>

          {/* Priority Breakdown */}
          <div className="lg:col-span-2">
            <PriorityBreakdown />
          </div>

          {/* Emergency Issues */}
          <div className=" lg:col-span-2">
            <EmergenceIssue />
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Status Overview */}
          <StatusOverview />

          {/* Team Overview */}
          <TeamOverView />
          {/* Sprint Overview */}
          <SprintOverview />
        </div>




        {/* Issues Analysis and Recent Comments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Issues Analysis */}
          <IssuesAnalysis className="lg:col-span-2"/>

          {/* Recent Comments */}
          <RecentCommand className="lg:col-span-1"/>
        </div>

        {/* Bug Overview and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Bug Overview */}
          <BugOverview className="lg:col-span-2"/>

          {/* Recent Activity */}
         <RecentActivity className="lg:col-span-1"/>
        </div>
      </div>
    </div>
  );
} 