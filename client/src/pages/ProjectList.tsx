import { Select, SelectItem, SelectValue, SelectContent, SelectTrigger } from '@/components/ui/select';
import { Projects } from '@/lib/MockData';
import { getRemainingLabel } from '@/lib/utils';
import { Plus } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProjects } from '../store/project/projectSlice';
import { initialProjects } from '../lib/initialProjects';
import { RootState } from '../store/store.ts';

// Icon assets from public/icons directory
const bugIcon = "/src/assets/icons/mdi_bug-outline.png";
const teamIcon = "/src/assets/icons/fluent_people-team-16-regular.png";
const calendarIcon = "/src/assets/icons/lsicon_calendar-outline.png";
const chartIcon = "/src/assets/icons/mynaui_chart-gantt.png";
const taskIcon = "/src/assets/icons/proicons_task-list.png";
const filterIcon = "/src/assets/icons/mage_filter.png";
const searchIcon = "/src/assets/icons/icon-park-outline_search.png";
const editIcon = "/src/assets/icons/iconamoon_edit-fill.png";
const profileIcon = "/src/assets/icons/iconamoon_profile-fill.png";
const notificationIcon = "/src/assets/icons/ic_baseline-notifications.png";
const messageIcon = "/src/assets/icons/tabler_message-filled.png";
const dashboardIcon = "/src/assets/icons/streamline-flex_dashboard-3.png";
const projectIcon = "/src/assets/icons/fluent_stack-48-regular.png";
const groupIcon = "/src/assets/icons/fluent_group-24-regular.png";
const attachmentIcon = "/src/assets/icons/fluent_attach-16-regular.png";
const sendIcon = "/src/assets/icons/mynaui_send.png";
const supportIcon = "/src/assets/icons/material-symbols_support.png";
const themeIcon = "/src/assets/icons/proicons_dark-theme.png";
const eyeOffIcon = "/src/assets/icons/mdi_eye-off.png";
const reportIcon = "/src/assets/icons/mdi_report-box-multiple-outline.png";
const aiIcon = "/src/assets/icons/mingcute_ai-fill.png";
const arrowUpIcon = "/src/assets/icons/iconamoon_arrow-up-2.png";
const arrowUpFillIcon = "/src/assets/icons/iconamoon_arrow-up-2-fill.png";
const dragIcon = "/src/assets/icons/qlementine-icons_drag-16.png";
const sortIcon = "/src/assets/icons/lucide_sort-desc.png";
const collapseIcon = "/src/assets/icons/pajamas_collapse-left.png";
const arrowSprintIcon = "/src/assets/icons/fluent_arrow-sprint-20-filled.png";
const plusIcon = "/src/assets/icons/stash_plus-solid.png";
const smileIcon = "/src/assets/icons/fa_smile-o.png";
const debugIcon = "/src/assets/icons/codicon_debug-step-back.png";
const kanbanIcon = "/src/assets/icons/ph_kanban-fill.png";
const dateIcon = "/src/assets/icons/fontisto_date.png";
const chartGanttIcon = "/src/assets/icons/mynaui_chart-gantt.png";
const groupIcon2 = "/src/assets/icons/Group 627.png";
const groupIcon3 = "/src/assets/icons/Group 2087324147.png";
const frameIcon = "/src/assets/icons/Frame 1984078164.png";
const groupIcon4 = "/src/assets/icons/Group.png";
const pepiconsIcon = "/src/assets/icons/pepicons-pop_arrow-up.png";

// Team member avatars from Figma design
const img2 = "/src/assets/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
const img3 = "/src/assets/icons/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png";
const img4 = "/src/assets/icons/27329e3b78d83b20619fddee55560c05c2cd1469.png";
const img5 = "/src/assets/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";
const img6 = "/src/assets/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";

export default function ProjectList() {
  const dispatch = useDispatch();
  const { projects } = useSelector((state: RootState) => state.project);
  const navigate = useNavigate();

  // Initialize with 5 initial projects if no projects exist
  useEffect(() => {
    if (projects.length === 0) {
      // Convert initial projects to full Project objects with IDs and timestamps
      const projectsWithIds = initialProjects.map((project, index) => ({
        ...project,
        id: `project-${index + 1}`,
        createdAt: new Date().toISOString(),
      }));
      dispatch(setProjects(projectsWithIds));
    }
  }, [dispatch, projects.length]);

  const handleCardClick = (projectId: string) => {
    navigate(`/project-overview`);
  };

  return (
    <div className="bg-[#f6f6f6] h-screen w-full p-6 flex flex-col">
      {/* Page Header */}
      <div className="mb-4 sm:mb-6 lg:mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#438197] mb-1">
            Active Projects
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#999999]">
            {projects.length || 0} {projects.length > 1 ? "Projects" : "Project"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {/* Search Button */}
          <div className="bg-[#67909b] rounded-lg p-1.5 w-8 h-8 flex items-center justify-center cursor-pointer">
            <img alt="search" className="w-3 h-3" src={searchIcon} />
          </div>

          {/* Sort Button */}
          <div className="bg-[#67909b] rounded-lg p-1.5 w-8 h-8 flex items-center justify-center cursor-pointer">
            <img alt="sort" className="w-3 h-3" src={sortIcon} />
          </div>

          {/* Group Button */}
          <div className="bg-[#67909b] rounded-lg p-1.5 w-8 h-8 flex items-center justify-center cursor-pointer">
            <img alt="group" className="w-3 h-3" src={groupIcon} />
          </div>
          <Select>
            <SelectTrigger className='bg-[#67909b] rounded-lg p-1.5 w-35 px-2 text-white h-8 flex items-center justify-center border-none'>
              <SelectValue placeholder="View Type" className='text-white' />
            </SelectTrigger>
            <SelectContent className='bg-white border border-gray-200 rounded-lg shadow-lg'>
              <SelectItem value="project-1">Project 1</SelectItem>
              <SelectItem value="project-2">Project 2</SelectItem>
              <SelectItem value="project-3">Project 3</SelectItem>
            </SelectContent>
          </Select>
          <div className='flex items-center gap-2 bg-[#67909b] text-white px-3 rounded-lg cursor-pointer text-sm font-medium' onClick={()=>navigate('/create-project')}>
            Create Project
          </div>
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 overflow-y-auto">
        {
          projects.length > 0 ? (
            projects?.map((project) => (
              <div
                className="bg-white h-fit rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                onClick={() => handleCardClick('project-1')}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base sm:text-lg font-medium text-[#252525] capitalize line-clamp-2">
                    {project?.title || "Untitle"}
                  </h3>
                  <div className="flex items-center gap-1">
                    <div className="bg-[#263238] rounded-full p-0.5">
                      <img alt="bug" className="w-2.5 h-2.5" src={bugIcon} />
                    </div>
                    <span className="text-xs text-[#666666] font-medium">{project?.ProjectId || "PJ-01"}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#999999] mb-3 line-clamp-2">
                  {project?.description || "untitle"}
                </p>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-[#666666] font-medium">Progress</span>
                    <span className="text-xs text-[#666666] font-medium">{project?.process || 0} %</span>
                  </div>
                  <div className="w-full bg-[rgba(67,129,151,0.16)] rounded-full h-1.5">
                    <div className="bg-[#438197] h-1.5 rounded-full" style={{ width: `${project?.process || 0}%` }}></div>
                  </div>
                </div>

                {/* Team Members and Deadline */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                      {
                        project?.assignee && project.assignee.length > 0 ? (
                          project.assignee.slice(0, 5).map((assign, idx) => (
                            <img
                              key={`${assign.name}-${idx}`}
                              alt={assign.name}
                              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white"
                              src={assign.profile}
                            />
                          ))
                        ) : (
                          <span className="text-xs text-[#999999]">No assignees</span>
                        )
                      }
                    </div>
                    <span className="text-xs text-[#999999] font-medium">
                      {project?.assignee && project.assignee.length > 5 ? `+${project.assignee.length - 5}` : ""}
                    </span>
                    {/* Show team member count and total hours if available */}
                    {project?.teamMembers && project.teamMembers.length > 0 && (
                      <div className="text-xs text-[#438197] font-medium ml-2">
                        {project.teamMembers.length} members • {project.teamMembers.reduce((total, member) => total + member.hours, 0)}h
                      </div>
                    )}
                  </div>
                  <div className="bg-[rgba(203,102,102,0.16)] rounded-md px-2 py-1">
                    <span className="text-xs text-[#cb6666] font-medium">{getRemainingLabel(project.endDate)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='flex items-center justify-center w-full h-full'>
              No project
            </div>
          )
        }
      </div>
    </div>
  );
} 