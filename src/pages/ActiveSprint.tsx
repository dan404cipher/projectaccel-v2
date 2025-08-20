import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectHeader from '@/components/ProjectHeader';
import ProjectKanbanBoard from './ProjectKanbanBoard';
import ActiveSprintListView from './ActiveSprintListView';
import ProjectCalendarView from './ProjectCalendarView';

export default function ActiveSprint() {
  const navigate = useNavigate();
  const [activeSprintTab, setActiveSprintTab] = useState<'kanbanView' | 'listView' | 'calenderView' | 'chartView'>('kanbanView');

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
    setActiveSprintTab(tab as 'kanbanView' | 'listView' | 'calenderView' | 'chartView');
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

      {activeSprintTab === "calenderView" && (
        <ProjectCalendarView/>
      )}
      
    </div>
  );
} 