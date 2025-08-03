import React from 'react';

// Icon assets from public/icons directory
const bugIcon = "/icons/mdi_bug-outline.png";
const teamIcon = "/icons/fluent_people-team-16-regular.png";
const calendarIcon = "/icons/lsicon_calendar-outline.png";
const chartIcon = "/icons/mynaui_chart-gantt.png";
const taskIcon = "/icons/proicons_task-list.png";
const filterIcon = "/icons/mage_filter.png";
const searchIcon = "/icons/icon-park-outline_search.png";
const editIcon = "/icons/iconamoon_edit-fill.png";
const profileIcon = "/icons/iconamoon_profile-fill.png";
const notificationIcon = "/icons/ic_baseline-notifications.png";
const messageIcon = "/icons/tabler_message-filled.png";
const dashboardIcon = "/icons/streamline-flex_dashboard-3.png";
const projectIcon = "/icons/fluent_stack-48-regular.png";
const groupIcon = "/icons/fluent_group-24-regular.png";
const attachmentIcon = "/icons/fluent_attach-16-regular.png";
const sendIcon = "/icons/mynaui_send.png";
const supportIcon = "/icons/material-symbols_support.png";
const themeIcon = "/icons/proicons_dark-theme.png";
const eyeOffIcon = "/icons/mdi_eye-off.png";
const reportIcon = "/icons/mdi_report-box-multiple-outline.png";
const aiIcon = "/icons/mingcute_ai-fill.png";
const arrowUpIcon = "/icons/iconamoon_arrow-up-2.png";
const arrowUpFillIcon = "/icons/iconamoon_arrow-up-2-fill.png";
const dragIcon = "/icons/qlementine-icons_drag-16.png";
const sortIcon = "/icons/lucide_sort-desc.png";
const collapseIcon = "/icons/pajamas_collapse-left.png";
const arrowSprintIcon = "/icons/fluent_arrow-sprint-20-filled.png";
const plusIcon = "/icons/stash_plus-solid.png";
const smileIcon = "/icons/fa_smile-o.png";
const debugIcon = "/icons/codicon_debug-step-back.png";
const kanbanIcon = "/icons/ph_kanban-fill.png";
const dateIcon = "/icons/fontisto_date.png";
const chartGanttIcon = "/icons/mynaui_chart-gantt.png";
const groupIcon2 = "/icons/Group 627.png";
const groupIcon3 = "/icons/Group 2087324147.png";
const frameIcon = "/icons/Frame 1984078164.png";
const groupIcon4 = "/icons/Group.png";
const pepiconsIcon = "/icons/pepicons-pop_arrow-up.png";

// Team member avatars from Figma design
const teamMember1 = "http://localhost:3845/assets/2c9169f96717641f0bb06a7a6be7046836bd4ada.png";
const teamMember2 = "http://localhost:3845/assets/b1766b7062b0c67d9be111f724f646b15b02bf09.png";
const teamMember3 = "http://localhost:3845/assets/5375465d21d8f708db62b44f13c796c91c2a4e5f.png";
const teamMember4 = "http://localhost:3845/assets/d3d4f37717609e977f5fe8d69a995ab2ca7dff62.png";
const teamMember5 = "http://localhost:3845/assets/be8f7c59d45aca4f6175e23713a9d21d9742abc7.png";
const teamMember6 = "http://localhost:3845/assets/b38481751890bb742ffc613e1fe570486af1f031.png";

export default function ProjectList() {
  return (
    <div className="bg-[#f6f6f6] min-h-screen w-full p-6">
      {/* Page Header */}
      <div className="mb-4 sm:mb-6 lg:mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#438197] mb-1">
            Active Projects
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#999999]">
            18 projects
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          {/* Search Button */}
          <div className="bg-[#67909b] rounded-lg p-1.5 w-8 h-8 flex items-center justify-center">
            <img alt="search" className="w-3 h-3" src={searchIcon} />
          </div>
          
          {/* Sort Button */}
          <div className="bg-[#67909b] rounded-lg p-1.5 w-8 h-8 flex items-center justify-center">
            <img alt="sort" className="w-3 h-3" src={sortIcon} />
          </div>
          
          {/* Group Button */}
          <div className="bg-[#67909b] rounded-lg p-1.5 w-8 h-8 flex items-center justify-center">
            <img alt="group" className="w-3 h-3" src={groupIcon} />
          </div>
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {/* Project Card 1 */}
        <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-base sm:text-lg font-medium text-[#252525] capitalize line-clamp-2">
              Example Project Title
            </h3>
            <div className="flex items-center gap-1">
              <div className="bg-[#263238] rounded-full p-0.5">
                <img alt="bug" className="w-2.5 h-2.5" src={bugIcon} />
              </div>
              <span className="text-xs text-[#666666] font-medium">PV – 117</span>
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-[#999999] mb-3 line-clamp-2">
            consectetur adipiscing elit, sed do consectetur
          </p>
          
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[#666666] font-medium">Progress</span>
              <span className="text-xs text-[#666666] font-medium">89%</span>
            </div>
            <div className="w-full bg-[rgba(67,129,151,0.16)] rounded-full h-1.5">
              <div className="bg-[#438197] h-1.5 rounded-full" style={{ width: '89%' }}></div>
            </div>
          </div>
          
          {/* Team Members and Deadline */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember1} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember2} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember3} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember4} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember5} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember6} />
              </div>
              <span className="text-xs text-[#999999] font-medium">24+</span>
            </div>
            <div className="bg-[rgba(203,102,102,0.16)] rounded-md px-2 py-1">
              <span className="text-xs text-[#cb6666] font-medium">1 Day left</span>
            </div>
          </div>
        </div>

        {/* Project Card 2 */}
        <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-base sm:text-lg font-medium text-[#252525] capitalize line-clamp-2">
              Example Project Title
            </h3>
            <div className="flex items-center gap-1">
              <div className="bg-[#263238] rounded-full p-0.5">
                <img alt="bug" className="w-2.5 h-2.5" src={bugIcon} />
              </div>
              <span className="text-xs text-[#666666] font-medium">PV – 117</span>
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-[#999999] mb-3 line-clamp-2">
            consectetur adipiscing elit, sed do consectetur
          </p>
          
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[#666666] font-medium">Progress</span>
              <span className="text-xs text-[#666666] font-medium">89%</span>
            </div>
            <div className="w-full bg-[rgba(67,129,151,0.16)] rounded-full h-1.5">
              <div className="bg-[#438197] h-1.5 rounded-full" style={{ width: '89%' }}></div>
            </div>
          </div>
          
          {/* Team Members and Deadline */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember1} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember2} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember3} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember4} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember5} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember6} />
              </div>
              <span className="text-xs text-[#999999] font-medium">24+</span>
            </div>
            <div className="bg-[rgba(203,102,102,0.16)] rounded-md px-2 py-1">
              <span className="text-xs text-[#cb6666] font-medium">1 Day left</span>
            </div>
          </div>
        </div>

        {/* Project Card 3 */}
        <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-base sm:text-lg font-medium text-[#252525] capitalize line-clamp-2">
              Example Project Title
            </h3>
            <div className="flex items-center gap-1">
              <div className="bg-[#263238] rounded-full p-0.5">
                <img alt="bug" className="w-2.5 h-2.5" src={bugIcon} />
              </div>
              <span className="text-xs text-[#666666] font-medium">PV – 117</span>
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-[#999999] mb-3 line-clamp-2">
            consectetur adipiscing elit, sed do consectetur
          </p>
          
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[#666666] font-medium">Progress</span>
              <span className="text-xs text-[#666666] font-medium">89%</span>
            </div>
            <div className="w-full bg-[rgba(67,129,151,0.16)] rounded-full h-1.5">
              <div className="bg-[#438197] h-1.5 rounded-full" style={{ width: '89%' }}></div>
            </div>
          </div>
          
          {/* Team Members and Deadline */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember1} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember2} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember3} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember4} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember5} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember6} />
              </div>
              <span className="text-xs text-[#999999] font-medium">24+</span>
            </div>
            <div className="bg-[rgba(203,102,102,0.16)] rounded-md px-2 py-1">
              <span className="text-xs text-[#cb6666] font-medium">1 Day left</span>
            </div>
          </div>
        </div>

        {/* Project Card 4 */}
        <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-base sm:text-lg font-medium text-[#252525] capitalize line-clamp-2">
              Example Project Title
            </h3>
            <div className="flex items-center gap-1">
              <div className="bg-[#263238] rounded-full p-0.5">
                <img alt="bug" className="w-2.5 h-2.5" src={bugIcon} />
              </div>
              <span className="text-xs text-[#666666] font-medium">PV – 117</span>
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-[#999999] mb-3 line-clamp-2">
            consectetur adipiscing elit, sed do consectetur
          </p>
          
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[#666666] font-medium">Progress</span>
              <span className="text-xs text-[#666666] font-medium">89%</span>
            </div>
            <div className="w-full bg-[rgba(67,129,151,0.16)] rounded-full h-1.5">
              <div className="bg-[#438197] h-1.5 rounded-full" style={{ width: '89%' }}></div>
            </div>
          </div>
          
          {/* Team Members and Deadline */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember1} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember2} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember3} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember4} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember5} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember6} />
              </div>
              <span className="text-xs text-[#999999] font-medium">24+</span>
            </div>
            <div className="bg-[rgba(203,102,102,0.16)] rounded-md px-2 py-1">
              <span className="text-xs text-[#cb6666] font-medium">1 Day left</span>
            </div>
          </div>
        </div>

        {/* Project Card 5 */}
        <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-base sm:text-lg font-medium text-[#252525] capitalize line-clamp-2">
              Example Project Title
            </h3>
            <div className="flex items-center gap-1">
              <div className="bg-[#263238] rounded-full p-0.5">
                <img alt="bug" className="w-2.5 h-2.5" src={bugIcon} />
              </div>
              <span className="text-xs text-[#666666] font-medium">PV – 117</span>
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-[#999999] mb-3 line-clamp-2">
            consectetur adipiscing elit, sed do consectetur
          </p>
          
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[#666666] font-medium">Progress</span>
              <span className="text-xs text-[#666666] font-medium">89%</span>
            </div>
            <div className="w-full bg-[rgba(67,129,151,0.16)] rounded-full h-1.5">
              <div className="bg-[#438197] h-1.5 rounded-full" style={{ width: '89%' }}></div>
            </div>
          </div>
          
          {/* Team Members and Deadline */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember1} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember2} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember3} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember4} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember5} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember6} />
              </div>
              <span className="text-xs text-[#999999] font-medium">24+</span>
            </div>
            <div className="bg-[rgba(203,102,102,0.16)] rounded-md px-2 py-1">
              <span className="text-xs text-[#cb6666] font-medium">1 Day left</span>
            </div>
          </div>
        </div>

        {/* Project Card 6 */}
        <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-base sm:text-lg font-medium text-[#252525] capitalize line-clamp-2">
              Example Project Title
            </h3>
            <div className="flex items-center gap-1">
              <div className="bg-[#263238] rounded-full p-0.5">
                <img alt="bug" className="w-2.5 h-2.5" src={bugIcon} />
              </div>
              <span className="text-xs text-[#666666] font-medium">PV – 117</span>
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-[#999999] mb-3 line-clamp-2">
            consectetur adipiscing elit, sed do consectetur
          </p>
          
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[#666666] font-medium">Progress</span>
              <span className="text-xs text-[#666666] font-medium">89%</span>
            </div>
            <div className="w-full bg-[rgba(67,129,151,0.16)] rounded-full h-1.5">
              <div className="bg-[#438197] h-1.5 rounded-full" style={{ width: '89%' }}></div>
            </div>
          </div>
          
          {/* Team Members and Deadline */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember1} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember2} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember3} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember4} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember5} />
                <img alt="member" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" src={teamMember6} />
              </div>
              <span className="text-xs text-[#999999] font-medium">24+</span>
            </div>
            <div className="bg-[rgba(203,102,102,0.16)] rounded-md px-2 py-1">
              <span className="text-xs text-[#cb6666] font-medium">1 Day left</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 