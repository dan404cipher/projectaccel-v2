
import { useState } from "react";

// Image assets from Figma design
const imgEllipse248 = "/icons/b1766b7062b0c67d9be111f724f646b15b02bf09.png";
const imgEllipse242 = "/icons/2c9169f96717641f0bb06a7a6be7046836bd4ada.png";
const imgEllipse246 = "/icons/be8f7c59d45aca4f6175e23713a9d21d9742abc7.png";
const img2 = "/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
const img3 = "/icons/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png";
const img4 = "/icons/27329e3b78d83b20619fddee55560c05c2cd1469.png";
const img5 = "/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";
const img6 = "/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";

export default function ProjectKanbanBoard() {

  const [data, setData] = useState([
    {
      title: 'Todo',
      data: [
        {
          bugId: 'Bug-1',
          title: 'Setup Project Repo',
          description: 'Initialize git repo and basic folder structure',
          priority: 'low',
          assginee: [img2, img3],
          message: [
            { title: 'Need to confirm repo name' },
            { title: 'Check with DevOps' },
          ],
          attachment: [{ title: 'requirements.txt' }],
          date: 'Sep 12',
        },
        {
          bugId: 'Bug-2',
          title: 'Login Page UI',
          description: 'Create initial login page design with form validation',
          priority: 'medium',
          assginee: [img3, img4],
          message: [
            { title: 'Use Tailwind for UI' },
            { title: 'Need input validation' },
            { title: 'Dark theme support' },
          ],
          attachment: [{ title: 'ui-mock.png' }, { title: 'validation.docx' }],
          date: 'Sep 14',
        },
      ],
    },
    {
      title: 'In Process',
      data: [
        {
          bugId: 'Bug-3',
          title: 'User Authentication API',
          description: 'Implement JWT-based login and register API',
          priority: 'high',
          assginee: [img2, img4],
          message: [
            { title: 'Password encryption pending' },
            { title: 'Add refresh token' },
            { title: 'Unit tests required' },
          ],
          attachment: [{ title: 'auth-flow.png' }],
          date: 'Sep 15',
        },
        {
          bugId: 'Bug-4',
          title: 'Dashboard Widgets',
          description: 'Build analytics widgets (chart, stats)',
          priority: 'medium',
          assginee: [img3],
          message: [
            { title: 'Check chart.js or ApexCharts' },
            { title: 'Need mobile responsive' },
          ],
          attachment: [
            { title: 'chart-design.png' },
            { title: 'mobile-view.sketch' },
          ],
          date: 'Sep 16',
        },
      ],
    },
    {
      title: 'In Review',
      data: [
        {
          bugId: 'Bug-5',
          title: 'Notification System',
          description: 'Real-time notification with socket.io',
          priority: 'high',
          assginee: [img2, img3, img4],
          message: [
            { title: 'Test with multiple users' },
            { title: 'Check performance' },
            { title: 'Need approval from QA' },
          ],
          attachment: [{ title: 'notification-schema.pdf' }],
          date: 'Sep 18',
        },
        {
          bugId: 'Bug-6',
          title: 'Profile Page',
          description: 'Add user profile update + avatar upload',
          priority: 'low',
          assginee: [img4],
          message: [
            { title: 'File upload works fine' },
            { title: 'UI review pending' },
          ],
          attachment: [{ title: 'profile-wireframe.png' }],
          date: 'Sep 19',
        },
      ],
    },
    {
      title: 'Completed',
      data: [
        {
          bugId: 'Bug-7',
          title: 'Landing Page',
          description: 'Public landing page with hero + CTA',
          priority: 'low',
          assginee: [img2],
          message: [{ title: 'SEO check done' }],
          attachment: [{ title: 'landing-final.png' }],
          date: 'Sep 10',
        },
        {
          bugId: 'Bug-8',
          title: 'Email Service',
          description: 'Sendgrid integration for transactional emails',
          priority: 'medium',
          assginee: [img3, img4],
          message: [
            { title: 'Tested with staging account' },
            { title: 'DKIM/SPF setup done' },
          ],
          attachment: [{ title: 'email-template.html' }],
          date: 'Sep 11',
        },
      ],
    },
  ]);

  const [draggedData, setDraggedData] = useState(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const handleDragStart = (taskData:any, columnIndex:any, e:any) => {
    setDraggedData(taskData);
    setDraggedFromColumn(columnIndex);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setDragImage(e.target, e.target.offsetWidth / 2, e.target.offsetHeight / 2);
  };

  const handleDragOver = (e:any) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (columnIndex:any, e:any) => {
    e.preventDefault();
    setDragOverColumn(columnIndex);
  };

  const handleDragLeave = (e:any) => {
    // Only reset if we're leaving the column area completely
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (targetColumnIndex:any, e:any) => {
    e.preventDefault();
    
    if (draggedData && draggedFromColumn !== null && draggedFromColumn !== targetColumnIndex) {
      // Create a new data array
      const newData = [...data];
      
      // Remove the task from the source column
      const sourceColumn = newData[draggedFromColumn];
      sourceColumn.data = sourceColumn.data.filter(task => task.bugId !== draggedData.bugId);
      
      // Add the task to the target column
      const targetColumn = newData[targetColumnIndex];
      targetColumn.data = [...targetColumn.data, draggedData];
      
      // Update the state
      setData(newData);
    }
    
    // Reset drag state
    setDraggedData(null);
    setDraggedFromColumn(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = (e:any) => {
    e.preventDefault();
    setDraggedData(null);
    setDraggedFromColumn(null);
    setDragOverColumn(null);
  };

  return (
    <div className="bg-[#ffffff] h-full rounded-2xl w-full flex flex-col ">

      <div className="flex items-center justify-between px-5 py-6">
        {/* View Controls */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-medium text-[#06263d]">Kanban Board View</h2>
            <div className="flex items-center gap-1">
              <div className="w-7 h-7 bg-[#67909b] rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#5a7d87] hover:scale-105">
                <span className="text-white text-base font-medium">
                  {data.reduce((total, column) => total + column.data.length, 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-[#999999] rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 hover:z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2.66797 12.0002C2.66797 11.2929 2.94892 10.6146 3.44902 10.1145C3.94911 9.61445 4.62739 9.3335 5.33464 9.3335H10.668C11.3752 9.3335 12.0535 9.61445 12.5536 10.1145C13.0537 10.6146 13.3346 11.2929 13.3346 12.0002C13.3346 12.3538 13.1942 12.6929 12.9441 12.943C12.6941 13.193 12.3549 13.3335 12.0013 13.3335H4.0013C3.64768 13.3335 3.30854 13.193 3.05849 12.943C2.80844 12.6929 2.66797 12.3538 2.66797 12.0002Z" stroke="white" stroke-linejoin="round" />
                  <path d="M8 6.66675C9.10457 6.66675 10 5.77132 10 4.66675C10 3.56218 9.10457 2.66675 8 2.66675C6.89543 2.66675 6 3.56218 6 4.66675C6 5.77132 6.89543 6.66675 8 6.66675Z" stroke="white" />
                </svg>
              </div>
              <div className="w-8 h-8 bg-[#416880] rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 hover:z-10">
                <span className="text-white text-sm">K</span>
              </div>
              <img alt="member" className="w-8 h-8 rounded-full transition-transform duration-200 hover:scale-110 hover:z-10" src={imgEllipse248} />
              <img alt="member" className="w-8 h-8 rounded-full transition-transform duration-200 hover:scale-110 hover:z-10" src={imgEllipse242} />
              <img alt="member" className="w-8 h-8 rounded-full transition-transform duration-200 hover:scale-110 hover:z-10" src={imgEllipse246} />
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
            <div className="w-9 h-9 bg-[#67909b] rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-[#5a7d87] hover:scale-105 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7.50147 4.40653C7.13205 4.40653 6.76625 4.47929 6.42496 4.62066C6.08366 4.76203 5.77356 4.96924 5.51234 5.23045C5.25112 5.49167 5.04392 5.80178 4.90255 6.14307C4.76118 6.48437 4.68842 6.85017 4.68842 7.21958C4.68842 7.589 4.76118 7.95479 4.90255 8.29609C5.04392 8.63738 5.25112 8.94749 5.51234 9.20871C5.77356 9.46992 6.08366 9.67713 6.42496 9.8185C6.76625 9.95987 7.13205 10.0326 7.50147 10.0326H13.5401L12.865 9.3575C12.7959 9.29312 12.7405 9.21548 12.7021 9.12921C12.6636 9.04294 12.643 8.94982 12.6413 8.85539C12.6396 8.76096 12.657 8.66717 12.6924 8.5796C12.7277 8.49203 12.7804 8.41248 12.8472 8.3457C12.9139 8.27892 12.9935 8.22628 13.0811 8.19091C13.1686 8.15553 13.2624 8.13816 13.3569 8.13983C13.4513 8.1415 13.5444 8.16217 13.6307 8.2006C13.7169 8.23904 13.7946 8.29446 13.859 8.36355L15.7343 10.2389C15.866 10.3708 15.94 10.5495 15.94 10.7359C15.94 10.9223 15.866 11.101 15.7343 11.2329L13.859 13.1082C13.7946 13.1773 13.7169 13.2327 13.6307 13.2712C13.5444 13.3096 13.4513 13.3303 13.3569 13.332C13.2624 13.3336 13.1686 13.3163 13.0811 13.2809C12.9935 13.2455 12.9139 13.1929 12.8472 13.1261C12.7804 13.0593 12.7277 12.9798 12.6924 12.8922C12.657 12.8046 12.6396 12.7108 12.6413 12.6164C12.643 12.522 12.6636 12.4288 12.7021 12.3426C12.7405 12.2563 12.7959 12.1787 12.865 12.1143L13.5401 11.4392H7.50147C6.58401 11.439 5.69161 11.1398 4.95946 10.5869C4.22731 10.034 3.6953 9.25758 3.44404 8.3752C3.19277 7.49282 3.23594 6.55259 3.56701 5.69695C3.89807 4.84131 4.49899 4.11688 5.27872 3.63342C6.05845 3.14995 6.97452 2.93379 7.88813 3.01768C8.80174 3.10158 9.66312 3.48095 10.3418 4.09833C11.0204 4.71572 11.4793 5.53747 11.649 6.43909C11.8187 7.34072 11.69 8.27309 11.2822 9.09495H9.59813C9.96015 8.69019 10.1973 8.18931 10.2809 7.65275C10.3645 7.1162 10.2911 6.56691 10.0694 6.07119C9.84768 5.57546 9.48725 5.1545 9.03159 4.85912C8.57592 4.56373 8.0445 4.40654 7.50147 4.40653ZM0.703263 10.0326H3.17875C3.53697 10.5836 3.99719 11.061 4.53464 11.4392H0.703263C0.516746 11.4392 0.337868 11.3651 0.205981 11.2332C0.0740934 11.1013 0 10.9224 0 10.7359C0 10.5494 0.0740934 10.3705 0.205981 10.2386C0.337868 10.1067 0.516746 10.0326 0.703263 10.0326Z" fill="white" />
              </svg>
            </div>
          </div>
          <button className="bg-[#67909b] text-white px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-[#5a7d87] hover:scale-105 hover:shadow-lg">
            Complete Sprint
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-8 overflow-x-auto h-full mb-2 relative  px-5">
        {
          data.map((task, columnIndex) => (
            <div key={columnIndex} className="flex-shrink-0 w-72 rounded-2xl" onDragOver={handleDragOver}>
              <div 
                className={`rounded-t-2xl p-4 rounded-2xl min-h-[420px]  max-h-full transition-all duration-300 ${
                  dragOverColumn === columnIndex && draggedFromColumn !== columnIndex
                    ? 'bg-[rgba(103,144,155,0.15)] ring-2 ring-[#67909b] ring-opacity-50 scale-[1.02]' 
                    : 'bg-[rgba(103,144,155,0.06)]'
                }`}
                onDragOver={handleDragOver}
                onDragEnter={(e:any) => handleDragEnter(columnIndex, e)}
                onDragLeave={(e:any) => handleDragLeave(e)}
                onDrop={(e:any) => handleDrop(columnIndex, e)}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-medium text-[#06263d]">{task?.title || 'unknown'}</h3>
                    <div className="w-6 h-6 bg-[#67909b] rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#5a7d87] hover:scale-105">
                      <span className="text-white text-base font-medium">{task?.data?.length || 0}</span>
                    </div>
                  </div>
                  <div className="transition-transform duration-200 hover:scale-110 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12.9961 6V11H17.9961C18.2613 11 18.5157 11.1054 18.7032 11.2929C18.8907 11.4804 18.9961 11.7348 18.9961 12C18.9961 12.2652 18.8907 12.5196 18.7032 12.7071C18.5157 12.8946 18.2613 13 17.9961 13H12.9961V18C12.9961 18.2652 12.8907 18.5196 12.7032 18.7071C12.5157 18.8946 12.2613 19 11.9961 19C11.7309 19 11.4765 18.8946 11.289 18.7071C11.1015 18.5196 10.9961 18.2652 10.9961 18V13H5.99609C5.73088 13 5.47652 12.8946 5.28899 12.7071C5.10145 12.5196 4.99609 12.2652 4.99609 12C4.99609 11.7348 5.10145 11.4804 5.28899 11.2929C5.47652 11.1054 5.73088 11 5.99609 11H10.9961V6C10.9961 5.73478 11.1015 5.48043 11.289 5.29289C11.4765 5.10536 11.7309 5 11.9961 5C12.2613 5 12.5157 5.10536 12.7032 5.29289C12.8907 5.48043 12.9961 5.73478 12.9961 6Z" fill="#06263D" />
                    </svg>
                  </div>
                </div>

                {/* Task Cards */}
                <div className="space-y-4">
                  {
                    task?.data.map((taskData, taskIndex) => (
                      <div 
                        key={taskData.bugId || taskIndex} 
                        className={`bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-1 cursor-move transition-all duration-300 ${
                          draggedData?.bugId === taskData.bugId 
                            ? 'opacity-60 scale-95 rotate-3 shadow-2xl ring-2 ring-[#67909b] ring-opacity-30' 
                            : 'hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1'
                        }`}
                        style={{
                          transform: draggedData?.bugId === taskData.bugId ? 'rotate(3deg) scale(0.95)' : undefined,
                          zIndex: draggedData?.bugId === taskData.bugId ? 50 : 'auto'
                        }}
                        draggable 
                        onDragStart={(e) => handleDragStart(taskData, columnIndex, e)}
                        onDragEnd={(e:any) => handleDragEnd(e)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="bg-[#263238] rounded-full w-5 h-5 flex items-center justify-center transition-transform duration-200 hover:scale-110">
                              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                                <path d="M10.8654 4.46745H9.3667C9.1267 4.04078 8.79603 3.66745 8.39603 3.40078L9.26537 2.55278L8.51336 1.80078L7.35603 2.95811C6.86012 2.83777 6.34261 2.83777 5.8467 2.95811L4.68403 1.80078L3.93203 2.55278L4.79603 3.40078C4.39603 3.66745 4.0707 4.04611 3.8307 4.46745H2.33203V5.53411H3.4467C3.4147 5.71011 3.3987 5.88611 3.3987 6.06745V6.60078H2.33203V7.66745H3.3987V8.20078C3.3987 8.38211 3.4147 8.55812 3.4467 8.73412H2.33203V9.80078H3.8307C4.04102 10.1641 4.32088 10.4824 4.65428 10.7374C4.98768 10.9925 5.36808 11.1794 5.77374 11.2874C6.1794 11.3953 6.60237 11.4223 7.01845 11.3667C7.43454 11.3112 7.8356 11.1741 8.1987 10.9634C8.68403 10.6861 9.08937 10.2808 9.3667 9.80078H10.8654V8.73412H9.7507C9.7827 8.55812 9.7987 8.38211 9.7987 8.20078V7.66745H10.8654V6.60078H9.7987V6.06745C9.7987 5.88611 9.7827 5.71011 9.7507 5.53411H10.8654V4.46745ZM8.73203 8.20078C8.73203 8.76658 8.50727 9.3092 8.10719 9.70928C7.70712 10.1094 7.16449 10.3341 6.5987 10.3341C6.0329 10.3341 5.49028 10.1094 5.0902 9.70928C4.69013 9.3092 4.46536 8.76658 4.46536 8.20078V6.06745C4.46536 5.50165 4.69013 4.95903 5.0902 4.55895C5.49028 4.15888 6.0329 3.93411 6.5987 3.93411C7.16449 3.93411 7.70712 4.15888 8.10719 4.55895C8.50727 4.95903 8.73203 5.50165 8.73203 6.06745V8.20078ZM7.66536 5.53411V6.60078H5.53203V5.53411H7.66536ZM5.53203 7.66745H7.66536V8.73412H5.53203V7.66745Z" fill="white" />
                              </svg>
                            </div>
                            <span className="text-xs text-[#666666] capitalize">{taskData?.bugId || 'Bug-00'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`rounded px-2 flex items-center py-1 transition-all duration-200 hover:scale-105 ${
                              taskData?.priority === 'high' ? 'bg-[rgba(255,99,99,0.2)]' :
                              taskData?.priority === 'medium' ? 'bg-[rgba(223,168,116,0.2)]' :
                              'bg-[rgba(103,144,155,0.2)]'
                            }`}>
                              <span className={`text-xs font-medium capitalize ${
                                taskData?.priority === 'high' ? 'text-[#ff6363]' :
                                taskData?.priority === 'medium' ? 'text-[#d58d49]' :
                                'text-[#67909b]'
                              }`}>
                                {taskData?.priority || "Low"}
                              </span>
                            </div>
                            <div className="transition-transform duration-200 hover:scale-110 cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M5.83333 10.0004C5.83333 10.4424 5.65774 10.8664 5.34518 11.1789C5.03262 11.4915 4.60869 11.6671 4.16667 11.6671C3.72464 11.6671 3.30072 11.4915 2.98816 11.1789C2.67559 10.8664 2.5 10.4424 2.5 10.0004C2.5 9.55838 2.67559 9.13446 2.98816 8.8219C3.30072 8.50934 3.72464 8.33374 4.16667 8.33374C4.60869 8.33374 5.03262 8.50934 5.34518 8.8219C5.65774 9.13446 5.83333 9.55838 5.83333 10.0004ZM11.6667 10.0004C11.6667 10.4424 11.4911 10.8664 11.1785 11.1789C10.8659 11.4915 10.442 11.6671 10 11.6671C9.55797 11.6671 9.13405 11.4915 8.82149 11.1789C8.50893 10.8664 8.33333 10.4424 8.33333 10.0004C8.33333 9.55838 8.50893 9.13446 8.82149 8.8219C9.13405 8.50934 9.55797 8.33374 10 8.33374C10.442 8.33374 10.8659 8.50934 11.1785 8.8219C11.4911 9.13446 11.6667 9.55838 11.6667 10.0004ZM17.5 10.0004C17.5 10.4424 17.3244 10.8664 17.0118 11.1789C16.6993 11.4915 16.2754 11.6671 15.8333 11.6671C15.3913 11.6671 14.9674 11.4915 14.6548 11.1789C14.3423 10.8664 14.1667 10.4424 14.1667 10.0004C14.1667 9.55838 14.3423 9.13446 14.6548 8.8219C14.9674 8.50934 15.3913 8.33374 15.8333 8.33374C16.2754 8.33374 16.6993 8.50934 17.0118 8.8219C17.3244 9.13446 17.5 9.55838 17.5 10.0004Z" fill="#06263D" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <h4 className="font-semibold text-[#0d062d] text-base">{taskData?.title || 'unknown'}</h4>
                        <p className="text-[#787486] text-xs mb-3 leading-4">
                          {taskData?.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {
                                taskData?.assginee?.map((asg, index) => (
                                  <img key={index} alt="member" className="w-5 h-5 rounded-full border border-white transition-transform duration-200 hover:scale-110 hover:z-10" src={asg} />
                                ))
                              }
                            </div>
                            <div className="flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                                <g clipPath="url(#clip0_5_27629)">
                                  <path d="M12.5413 2.89062H11.2774V3.6684H12.4441V12.224H1.55522V3.6684H2.72189V2.89062H1.458C1.36709 2.89214 1.27737 2.91156 1.19397 2.94776C1.11057 2.98395 1.03511 3.03623 0.971912 3.10159C0.908714 3.16696 0.859012 3.24413 0.825645 3.32871C0.792278 3.41329 0.775899 3.50361 0.777444 3.59451V12.2978C0.775899 12.3888 0.792278 12.4791 0.825645 12.5637C0.859012 12.6482 0.908714 12.7254 0.971912 12.7908C1.03511 12.8561 1.11057 12.9084 1.19397 12.9446C1.27737 12.9808 1.36709 13.0002 1.458 13.0017H12.5413C12.6322 13.0002 12.722 12.9808 12.8054 12.9446C12.8888 12.9084 12.9642 12.8561 13.0274 12.7908C13.0906 12.7254 13.1403 12.6482 13.1737 12.5637C13.2071 12.4791 13.2234 12.3888 13.2219 12.2978V3.59451C13.2234 3.50361 13.2071 3.41329 13.1737 3.32871C13.1403 3.24413 13.0906 3.16696 13.0274 3.10159C12.9642 3.03623 12.8888 2.98395 12.8054 2.94776C12.722 2.91156 12.6322 2.89214 12.5413 2.89062Z" fill="#787486" />
                                  <path d="M3.10938 6.00244H3.88715V6.78022H3.10938V6.00244Z" fill="#787486" />
                                  <path d="M5.44531 6.00244H6.22309V6.78022H5.44531V6.00244Z" fill="#787486" />
                                  <path d="M7.77734 6.00244H8.55512V6.78022H7.77734V6.00244Z" fill="#787486" />
                                  <path d="M10.1094 6.00244H10.8872V6.78022H10.1094V6.00244Z" fill="#787486" />
                                  <path d="M3.10938 7.94727H3.88715V8.72504H3.10938V7.94727Z" fill="#787486" />
                                  <path d="M5.44531 7.94727H6.22309V8.72504H5.44531V7.94727Z" fill="#787486" />
                                  <path d="M7.77734 7.94727H8.55512V8.72504H7.77734V7.94727Z" fill="#787486" />
                                  <path d="M10.1094 7.94727H10.8872V8.72504H10.1094V7.94727Z" fill="#787486" />
                                  <path d="M3.10938 9.89062H3.88715V10.6684H3.10938V9.89062Z" fill="#787486" />
                                  <path d="M5.44531 9.89062H6.22309V10.6684H5.44531V9.89062Z" fill="#787486" />
                                  <path d="M7.77734 9.89062H8.55512V10.6684H7.77734V9.89062Z" fill="#787486" />
                                  <path d="M10.1094 9.89062H10.8872V10.6684H10.1094V9.89062Z" fill="#787486" />
                                  <path d="M3.88889 4.44656C3.99203 4.44656 4.09094 4.40559 4.16387 4.33266C4.23681 4.25973 4.27778 4.16081 4.27778 4.05767V1.72434C4.27778 1.6212 4.23681 1.52228 4.16387 1.44935C4.09094 1.37642 3.99203 1.33545 3.88889 1.33545C3.78575 1.33545 3.68683 1.37642 3.6139 1.44935C3.54097 1.52228 3.5 1.6212 3.5 1.72434V4.05767C3.5 4.16081 3.54097 4.25973 3.6139 4.33266C3.68683 4.40559 3.78575 4.44656 3.88889 4.44656Z" fill="#787486" />
                                  <path d="M10.1115 4.44656C10.2147 4.44656 10.3136 4.40559 10.3865 4.33266C10.4595 4.25973 10.5004 4.16081 10.5004 4.05767V1.72434C10.5004 1.6212 10.4595 1.52228 10.3865 1.44935C10.3136 1.37642 10.2147 1.33545 10.1115 1.33545C10.0084 1.33545 9.90949 1.37642 9.83656 1.44935C9.76363 1.52228 9.72266 1.6212 9.72266 1.72434V4.05767C9.72266 4.16081 9.76363 4.25973 9.83656 4.33266C9.90949 4.40559 10.0084 4.44656 10.1115 4.44656Z" fill="#787486" />
                                  <path d="M5.05469 2.89062H8.94358V3.6684H5.05469V2.89062Z" fill="#787486" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_5_27629">
                                    <rect width="14" height="14" fill="white" transform="translate(0 0.558594)" />
                                  </clipPath>
                                </defs>
                              </svg>
                              <span className="text-xs text-[#e52828] font-medium">{taskData.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15" fill="none">
                                <path d="M6.59661 14.208C6.22861 14.208 5.88195 14.0038 5.63661 13.648L4.83661 12.4813C4.82061 12.458 4.75661 12.4288 4.72995 12.423H4.46328C2.23928 12.423 0.863281 11.7638 0.863281 8.48551V5.56885C0.863281 2.99051 2.10595 1.63135 4.46328 1.63135H8.72995C11.0873 1.63135 12.3299 2.99051 12.3299 5.56885V8.48551C12.3299 11.0638 11.0873 12.423 8.72995 12.423H8.46328C8.42061 12.423 8.38328 12.4463 8.35662 12.4813L7.55662 13.648C7.31128 14.0038 6.96461 14.208 6.59661 14.208ZM4.46328 2.50635C2.55395 2.50635 1.66328 3.48051 1.66328 5.56885V8.48551C1.66328 11.1222 2.48995 11.548 4.46328 11.548H4.72995C5.00195 11.548 5.31128 11.7172 5.47661 11.9563L6.27661 13.123C6.46328 13.3913 6.72995 13.3913 6.91662 13.123L7.71662 11.9563C7.89262 11.6997 8.16995 11.548 8.46328 11.548H8.72995C10.6393 11.548 11.5299 10.5738 11.5299 8.48551V5.56885C11.5299 3.48051 10.6393 2.50635 8.72995 2.50635H4.46328Z" fill="#787486" />
                                <path d="M6.59974 7.90251C6.30107 7.90251 6.06641 7.64001 6.06641 7.31917C6.06641 6.99834 6.30641 6.73584 6.59974 6.73584C6.89307 6.73584 7.13307 6.99834 7.13307 7.31917C7.13307 7.64001 6.89841 7.90251 6.59974 7.90251Z" fill="#787486" />
                                <path d="M8.73255 7.90251C8.43389 7.90251 8.19922 7.64001 8.19922 7.31917C8.19922 6.99834 8.43922 6.73584 8.73255 6.73584C9.02589 6.73584 9.26589 6.99834 9.26589 7.31917C9.26589 7.64001 9.03122 7.90251 8.73255 7.90251Z" fill="#787486" />
                                <path d="M4.46693 7.90251C4.16826 7.90251 3.93359 7.64001 3.93359 7.31917C3.93359 6.99834 4.17359 6.73584 4.46693 6.73584C4.76026 6.73584 5.00026 6.99834 5.00026 7.31917C5.00026 7.64001 4.76559 7.90251 4.46693 7.90251Z" fill="#787486" />
                              </svg>
                              <span className="text-xs text-[#787486] font-medium">{taskData?.message?.length || 0}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <path d="M11.4277 3.42176C10.9345 2.92881 10.2657 2.6519 9.56843 2.6519C8.87112 2.6519 8.20236 2.92881 7.70918 3.42176L1.83768 9.29076C1.76659 9.357 1.67257 9.39307 1.57542 9.39135C1.47827 9.38964 1.38557 9.35028 1.31687 9.28158C1.24816 9.21287 1.2088 9.12018 1.20709 9.02303C1.20538 8.92588 1.24144 8.83185 1.30768 8.76076L7.17768 2.89076C7.81174 2.25703 8.67159 1.90113 9.56806 1.90137C10.4645 1.9016 11.3242 2.25795 11.9579 2.89201C12.5917 3.52608 12.9476 4.38593 12.9473 5.2824C12.9471 6.17887 12.5907 7.03853 11.9567 7.67226L6.29668 13.3273C5.92787 13.6935 5.42893 13.8986 4.90918 13.8976C4.38943 13.8967 3.89125 13.6897 3.52379 13.3221C3.15634 12.9546 2.94958 12.4563 2.9488 11.9366C2.94803 11.4168 3.15332 10.9179 3.51968 10.5493L9.05818 5.01076C9.09251 4.97392 9.13391 4.94437 9.17991 4.92387C9.22591 4.90338 9.27557 4.89236 9.32592 4.89147C9.37627 4.89058 9.42628 4.89984 9.47298 4.9187C9.51967 4.93756 9.56209 4.96564 9.5977 5.00125C9.63331 5.03685 9.66138 5.07927 9.68024 5.12597C9.6991 5.17266 9.70836 5.22267 9.70747 5.27303C9.70659 5.32338 9.69557 5.37303 9.67507 5.41903C9.65457 5.46503 9.62502 5.50643 9.58818 5.54076L4.05118 11.0798C3.82764 11.3082 3.70323 11.6157 3.70495 11.9353C3.70667 12.2549 3.83439 12.561 4.06038 12.7871C4.28637 13.0131 4.5924 13.1409 4.91204 13.1427C5.23168 13.1446 5.53913 13.0202 5.76768 12.7968L11.4277 7.14176C11.672 6.89757 11.8659 6.60763 11.9981 6.2885C12.1304 5.96937 12.1985 5.62732 12.1985 5.28187C12.1986 4.93642 12.1306 4.59434 11.9984 4.27518C11.8662 3.95602 11.6725 3.66603 11.4282 3.42176" fill="#787486" />
                              </svg>
                              <span className="text-xs text-[#787486] font-medium">{taskData?.attachment?.length || 0}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          ))
        }
        {/* Add Task Button */}
        <div className="absolute right-5 cursor-pointer">
          <div className="w-8 h-8 bg-[#67909b] rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" fill="#67909B" />
              <path d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}