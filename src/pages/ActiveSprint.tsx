import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectHeader from '@/components/ProjectHeader';
import ProjectKanbanBoard from './ProjectKanbanBoard';
import ActiveSprintListView from './ActiveSprintListView';

export default function ActiveSprint() {
  const navigate = useNavigate();
  const [activeSprintTab, setActiveSprintTab] = useState<'kanbanView' | 'listView' | 'sortByStatus'>('kanbanView');

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
        navigate('/team');
        break;
      case 'report':
        navigate('/report');
        break;
      default:
        break;
    }
  };

  const handleActiveSprintTabChange = (tab: string) => {
    setActiveSprintTab(tab as 'kanbanView' | 'listView' | 'sortByStatus');
  };
  return (
    <div className="h-full w-full flex flex-col overflow-hidden rounded-lg">
      {/* Project Header */}
      <ProjectHeader 
        projectName="Example project name"
        activeTab="sprint"
        activeSprintTab={activeSprintTab}
        onTabChange={handleTabClick}
                onActiveSprintTabChange={handleActiveSprintTabChange}
      />

      {/* Conditional Content Based on Active Sprint Tab */}
      {activeSprintTab === "kanbanView" && (
        <ProjectKanbanBoard />
      )}

      {activeSprintTab === "listView" && (
        <ActiveSprintListView/>
      )}

      {activeSprintTab === "sortByStatus" && (
        <div className="p-4">
          <h2 className="text-xl font-semibold text-[#06263d] mb-4">Sort by Status</h2>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-gray-600">Sort by status content will be displayed here.</p>
            {/* Add your sort by status component here */}
          </div>
        </div>
      )}
      
    </div>
  );
} 