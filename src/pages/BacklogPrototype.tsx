import { CustomTable } from '@/components/dashboard/CustomTable';
import ProjectHeader from '@/components/ProjectHeader';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {AddTask} from '../components/model/addTask';


const img2 = "/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
const img3 = "/icons/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png";
const img4 = "/icons/27329e3b78d83b20619fddee55560c05c2cd1469.png";
const img5 = "/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";
const img6 = "/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";


export default function BacklogPrototype() {
  const navigate = useNavigate();
  const [isSprintCollapsed, setIsSprintCollapsed] = useState(false);
  const [addTaskOpen,setAddTaskOpen]=useState(false);

  const toggleSprintCollapse = () => {
    setIsSprintCollapsed(!isSprintCollapsed);
  };

  

  const columns = [
    {
        header: "Type",
        accessor: "type",
        sortable: true,
        render: (value) => (
            <div className="flex items-center gap-2">
                <span className="bg-[#263238] w-6 h-6 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13.3346 5.33529H11.4613C11.1613 4.80195 10.748 4.33529 10.248 4.00195L11.3346 2.94195L10.3946 2.00195L8.94797 3.44862C8.32808 3.29819 7.68119 3.29819 7.0613 3.44862L5.60797 2.00195L4.66797 2.94195L5.74797 4.00195C5.24797 4.33529 4.8413 4.80862 4.5413 5.33529H2.66797V6.66862H4.0613C4.0213 6.88862 4.0013 7.10862 4.0013 7.33529V8.00195H2.66797V9.33529H4.0013V10.002C4.0013 10.2286 4.0213 10.4486 4.0613 10.6686H2.66797V12.002H4.5413C4.8042 12.4561 5.15403 12.8539 5.57078 13.1728C5.98753 13.4916 6.46303 13.7252 6.9701 13.8602C7.47718 13.9952 8.00589 14.0289 8.526 13.9594C9.04611 13.8899 9.54743 13.7186 10.0013 13.4553C10.608 13.1086 11.1146 12.602 11.4613 12.002H13.3346V10.6686H11.9413C11.9813 10.4486 12.0013 10.2286 12.0013 10.002V9.33529H13.3346V8.00195H12.0013V7.33529C12.0013 7.10862 11.9813 6.88862 11.9413 6.66862H13.3346V5.33529ZM10.668 10.002C10.668 10.7092 10.387 11.3875 9.88692 11.8876C9.38682 12.3877 8.70855 12.6686 8.0013 12.6686C7.29406 12.6686 6.61578 12.3877 6.11568 11.8876C5.61559 11.3875 5.33464 10.7092 5.33464 10.002V7.33529C5.33464 6.62804 5.61559 5.94977 6.11568 5.44967C6.61578 4.94957 7.29406 4.66862 8.0013 4.66862C8.70855 4.66862 9.38682 4.94957 9.88692 5.44967C10.387 5.94977 10.668 6.62804 10.668 7.33529V10.002ZM9.33464 6.66862V8.00195H6.66797V6.66862H9.33464ZM6.66797 9.33529H9.33464V10.6686H6.66797V9.33529Z" fill="white" />
                    </svg>
                </span>
                <span>{value}</span>
            </div>
        ),
    },
    {
        header: "Issue Title", accessor: "title", render: (value) => (
            <div className="w-[200px]">
                {value}
            </div>
        )
    },
    {
        header: "Assign to",
        accessor: "assignees",
        sortable: true,
        render: (value, row) => (
            <div className="flex items-center ">
                {value.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt="avatar"
                        className="w-6 h-6 rounded-full border-2 border-white -ml-2 first:ml-0"
                    />
                ))}
                <span className="ml-2 text-gray-500">{row.moreCount}+</span>
            </div>
        ),
    },
    {
        header: "Status",
        accessor: "status",
        sortable: true,
        render: (value) => (
            <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-sm">
                {value}
            </span>
        ),
    },
    {
        header: "Priority",
        accessor: "priority",
        sortable: true,
        render: (value) => (
            <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-sm">
                {value}
            </span>
        ),
    },
    {
        header: "Due date",
        sortable: true,
        accessor: "dueDate",
        render: (value) => <span className="text-red-500">{value}</span>,
    },
];

const data = [
    {
        id: 1,
        type: "TA-117",
        title: "Publish blog page",
        assignees: [img2, img3, img4, img5, img6],
        moreCount: 24,
        status: "To-do",
        priority: "Low",
        dueDate: "Dec 5",
    },
    {
        id: 2,
        type: "TA-118",
        title: "Fix homepage bug",
        assignees: [img2, img3, img4],
        moreCount: 3,
        status: "In Progress",
        priority: "High",
        dueDate: "Dec 10",
    },
    {
        id: 2,
        type: "TA-118",
        title: "Fix homepage bug",
        assignees: [img2, img3, img4],
        moreCount: 3,
        status: "In Progress",
        priority: "High",
        dueDate: "Dec 10",
    },
    {
        id: 2,
        type: "TA-118",
        title: "Fix homepage bug",
        assignees: [img2, img3, img4],
        moreCount: 3,
        status: "In Progress",
        priority: "High",
        dueDate: "Dec 10",
    },
    {
        id: 2,
        type: "TA-118",
        title: "Fix homepage bug",
        assignees: [img2, img3, img4],
        moreCount: 3,
        status: "In Progress",
        priority: "High",
        dueDate: "Dec 10",
    },
    {
        id: 2,
        type: "TA-118",
        title: "Fix homepage bug",
        assignees: [img2, img3, img4],
        moreCount: 3,
        status: "In Progress",
        priority: "High",
        dueDate: "Dec 10",
    },

];

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
    <div className="bg-[#f6f6f6] h-full w-full flex flex-col">
      {/* Project Header - Fixed */}
      <ProjectHeader projectName="Example project name" activeTab="backlog" onTabChange={handleTabClick} />
      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Main Content Area */}
        <div className="bg-[#f2f2f2] rounded-2xl p-4">
          {/* List View Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-medium text-[#06263d]">
                List View / Sort by status
              </h2>
              <div className="flex items-center gap-1">
                <div className="bg-[#438197] rounded-full w-6 h-6 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">22</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <div className="bg-[#67909B] rounded-lg w-7 h-7 flex items-center justify-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <g clip-path="url(#clip0_5_25187)">
                    <path d="M6.16363 10.8888C8.77168 10.8888 10.8859 8.77461 10.8859 6.16656C10.8859 3.5585 8.77168 1.44434 6.16363 1.44434C3.55557 1.44434 1.44141 3.5585 1.44141 6.16656C1.44141 8.77461 3.55557 10.8888 6.16363 10.8888Z" stroke="white" stroke-linejoin="round" />
                    <path d="M7.73653 4.31734C7.5304 4.11068 7.28546 3.9468 7.01578 3.83511C6.74611 3.72341 6.45703 3.66612 6.16514 3.66651C5.87325 3.66612 5.58417 3.72341 5.31449 3.83511C5.04482 3.9468 4.79988 4.11068 4.59375 4.31734M9.56014 9.56151L11.9171 11.9185" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_5_25187">
                      <rect width="13.3333" height="13.3333" fill="white" transform="translate(0.332031 0.333252)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="bg-[#67909B] rounded-lg w-7 h-7 flex items-center justify-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 10.6667L4.66667 13.3334M4.66667 13.3334L7.33333 10.6667M4.66667 13.3334V2.66675M7.33333 2.66675H14M7.33333 5.33342H12M7.33333 8.00008H10" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className="bg-[#67909B] rounded-lg w-7 h-7 flex items-center justify-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2.55556 4.11111C2.96811 4.11111 3.36378 3.94722 3.6555 3.6555C3.94722 3.36378 4.11111 2.96811 4.11111 2.55556C4.11111 2.143 3.94722 1.74733 3.6555 1.45561C3.36378 1.16389 2.96811 1 2.55556 1C2.143 1 1.74733 1.16389 1.45561 1.45561C1.16389 1.74733 1 2.143 1 2.55556C1 2.96811 1.16389 3.36378 1.45561 3.6555C1.74733 3.94722 2.143 4.11111 2.55556 4.11111ZM13.4444 4.11111C13.857 4.11111 14.2527 3.94722 14.5444 3.6555C14.8361 3.36378 15 2.96811 15 2.55556C15 2.143 14.8361 1.74733 14.5444 1.45561C14.2527 1.16389 13.857 1 13.4444 1C13.0319 1 12.6362 1.16389 12.3445 1.45561C12.0528 1.74733 11.8889 2.143 11.8889 2.55556C11.8889 2.96811 12.0528 3.36378 12.3445 3.6555C12.6362 3.94722 13.0319 4.11111 13.4444 4.11111ZM15 13.4444C15 13.857 14.8361 14.2527 14.5444 14.5444C14.2527 14.8361 13.857 15 13.4444 15C13.0319 15 12.6362 14.8361 12.3445 14.5444C12.0528 14.2527 11.8889 13.857 11.8889 13.4444C11.8889 13.0319 12.0528 12.6362 12.3445 12.3445C12.6362 12.0528 13.0319 11.8889 13.4444 11.8889C13.857 11.8889 14.2527 12.0528 14.5444 12.3445C14.8361 12.6362 15 13.0319 15 13.4444ZM2.55556 15C2.96811 15 3.36378 14.8361 3.6555 14.5444C3.94722 14.2527 4.11111 13.857 4.11111 13.4444C4.11111 13.0319 3.94722 12.6362 3.6555 12.3445C3.36378 12.0528 2.96811 11.8889 2.55556 11.8889C2.143 11.8889 1.74733 12.0528 1.45561 12.3445C1.16389 12.6362 1 13.0319 1 13.4444C1 13.857 1.16389 14.2527 1.45561 14.5444C1.74733 14.8361 2.143 15 2.55556 15ZM4.857 2.94444C4.92302 2.55328 4.88822 2.15175 4.75589 1.77778H8.38889C8.90459 1.77778 9.39917 1.98264 9.76382 2.34729C10.1285 2.71195 10.3333 3.20652 10.3333 3.72222V5.66667H12.2778C12.7935 5.66667 13.2881 5.87153 13.6527 6.23618C14.0174 6.60084 14.2222 7.09541 14.2222 7.61111V11.2433C13.8482 11.1113 13.4467 11.0767 13.0556 11.143V7.61111C13.0556 7.40483 12.9736 7.207 12.8278 7.06114C12.6819 6.91528 12.4841 6.83333 12.2778 6.83333H10.3333V8.38889C10.3333 8.90459 10.1285 9.39917 9.76382 9.76382C9.39917 10.1285 8.90459 10.3333 8.38889 10.3333H6.83333V12.2778C6.83333 12.4841 6.91528 12.6819 7.06114 12.8278C7.207 12.9736 7.40483 13.0556 7.61111 13.0556H11.143C11.077 13.4467 11.1118 13.8483 11.2441 14.2222H7.61111C7.09541 14.2222 6.60084 14.0174 6.23618 13.6527C5.87153 13.2881 5.66667 12.7935 5.66667 12.2778V10.3333H3.72222C3.20652 10.3333 2.71195 10.1285 2.34729 9.76382C1.98264 9.39917 1.77778 8.90459 1.77778 8.38889V4.75667C2.15182 4.88873 2.55335 4.92327 2.94444 4.857V8.38889C2.94444 8.59517 3.02639 8.793 3.17225 8.93886C3.31811 9.08472 3.51594 9.16667 3.72222 9.16667H5.66667V7.61111C5.66667 7.09541 5.87153 6.60084 6.23618 6.23618C6.60084 5.87153 7.09541 5.66667 7.61111 5.66667H9.16667V3.72222C9.16667 3.51594 9.08472 3.31811 8.93886 3.17225C8.793 3.02639 8.59517 2.94444 8.38889 2.94444H4.857ZM8.38889 9.16667C8.59517 9.16667 8.793 9.08472 8.93886 8.93886C9.08472 8.793 9.16667 8.59517 9.16667 8.38889V6.83333H7.61111C7.40483 6.83333 7.207 6.91528 7.06114 7.06114C6.91528 7.207 6.83333 7.40483 6.83333 7.61111V9.16667H8.38889Z" fill="white" />
                </svg>
              </div>
              <div className="bg-[#67909B] rounded-lg w-7 h-7 flex items-center justify-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M7.50147 4.40653C7.13205 4.40653 6.76625 4.47929 6.42496 4.62066C6.08366 4.76203 5.77356 4.96924 5.51234 5.23045C5.25112 5.49167 5.04392 5.80178 4.90255 6.14307C4.76118 6.48437 4.68842 6.85017 4.68842 7.21958C4.68842 7.589 4.76118 7.95479 4.90255 8.29609C5.04392 8.63738 5.25112 8.94749 5.51234 9.20871C5.77356 9.46992 6.08366 9.67713 6.42496 9.8185C6.76625 9.95987 7.13205 10.0326 7.50147 10.0326H13.5401L12.865 9.3575C12.7959 9.29312 12.7405 9.21548 12.7021 9.12921C12.6636 9.04294 12.643 8.94982 12.6413 8.85539C12.6396 8.76096 12.657 8.66717 12.6924 8.5796C12.7277 8.49203 12.7804 8.41248 12.8472 8.3457C12.9139 8.27892 12.9935 8.22628 13.0811 8.19091C13.1686 8.15553 13.2624 8.13816 13.3569 8.13983C13.4513 8.1415 13.5444 8.16217 13.6307 8.2006C13.7169 8.23904 13.7946 8.29446 13.859 8.36355L15.7343 10.2389C15.866 10.3708 15.94 10.5495 15.94 10.7359C15.94 10.9223 15.866 11.101 15.7343 11.2329L13.859 13.1082C13.7946 13.1773 13.7169 13.2327 13.6307 13.2712C13.5444 13.3096 13.4513 13.3303 13.3569 13.332C13.2624 13.3336 13.1686 13.3163 13.0811 13.2809C12.9935 13.2455 12.9139 13.1929 12.8472 13.1261C12.7804 13.0593 12.7277 12.9798 12.6924 12.8922C12.657 12.8046 12.6396 12.7108 12.6413 12.6164C12.643 12.522 12.6636 12.4288 12.7021 12.3426C12.7405 12.2563 12.7959 12.1787 12.865 12.1143L13.5401 11.4392H7.50147C6.58401 11.439 5.69161 11.1398 4.95946 10.5869C4.22731 10.034 3.6953 9.25758 3.44404 8.3752C3.19277 7.49282 3.23594 6.55259 3.56701 5.69695C3.89807 4.84131 4.49899 4.11688 5.27872 3.63342C6.05845 3.14995 6.97452 2.93379 7.88813 3.01768C8.80174 3.10158 9.66312 3.48095 10.3418 4.09833C11.0204 4.71572 11.4793 5.53747 11.649 6.43909C11.8187 7.34072 11.69 8.27309 11.2822 9.09495H9.59813C9.96015 8.69019 10.1973 8.18931 10.2809 7.65275C10.3645 7.1162 10.2911 6.56691 10.0694 6.07119C9.84768 5.57546 9.48725 5.1545 9.03159 4.85912C8.57592 4.56373 8.0445 4.40654 7.50147 4.40653ZM0.703263 10.0326H3.17875C3.53697 10.5836 3.99719 11.061 4.53464 11.4392H0.703263C0.516746 11.4392 0.337868 11.3651 0.205981 11.2332C0.0740934 11.1013 0 10.9224 0 10.7359C0 10.5494 0.0740934 10.3705 0.205981 10.2386C0.337868 10.1067 0.516746 10.0326 0.703263 10.0326Z" fill="white" />
                </svg>
              </div>
              <div className="bg-[#67909B] rounded-lg px-4 py-1  flex items-center  cursor-pointer" onClick={()=>setAddTaskOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                  <rect width="16" height="16" transform="translate(0.5)" fill="#67909B" />
                  <path d="M12.4987 8.66536H9.16536V11.9987C9.16536 12.1755 9.09513 12.3451 8.9701 12.4701C8.84508 12.5951 8.67551 12.6654 8.4987 12.6654C8.32189 12.6654 8.15232 12.5951 8.02729 12.4701C7.90227 12.3451 7.83203 12.1755 7.83203 11.9987V8.66536H4.4987C4.32189 8.66536 4.15232 8.59513 4.02729 8.4701C3.90227 8.34508 3.83203 8.17551 3.83203 7.9987C3.83203 7.82189 3.90227 7.65232 4.02729 7.52729C4.15232 7.40227 4.32189 7.33203 4.4987 7.33203H7.83203V3.9987C7.83203 3.82189 7.90227 3.65232 8.02729 3.52729C8.15232 3.40227 8.32189 3.33203 8.4987 3.33203C8.67551 3.33203 8.84508 3.40227 8.9701 3.52729C9.09513 3.65232 9.16536 3.82189 9.16536 3.9987V7.33203H12.4987C12.6755 7.33203 12.8451 7.40227 12.9701 7.52729C13.0951 7.65232 13.1654 7.82189 13.1654 7.9987C13.1654 8.17551 13.0951 8.34508 12.9701 8.4701C12.8451 8.59513 12.6755 8.66536 12.4987 8.66536Z" fill="white" />
                </svg> <span className="text-sm text-white" >Create</span>
              </div>
            </div>
          </div>

          {/* Sprint Cards */}
          <div className="space-y-4">
            {/* Sprint 1 - Active */}
            <div className="bg-white rounded-2xl ">
              <div className="flex items-center justify-between p-4">
                <div className='flex items-center gap-5'>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      <button
                        className="w-[40px] transition-transform duration-200"
                        onClick={toggleSprintCollapse}
                      >
                        {!isSprintCollapsed ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.00021 8.99997C6.80246 9.00001 6.60916 9.05868 6.44475 9.16857C6.28034 9.27845 6.15221 9.43462 6.07654 9.61732C6.00086 9.80001 5.98106 10.001 6.01963 10.195C6.0582 10.389 6.1534 10.5671 6.29321 10.707L11.2932 15.707C11.4807 15.8944 11.735 15.9998 12.0002 15.9998C12.2654 15.9998 12.5197 15.8944 12.7072 15.707L17.7072 10.707C17.847 10.5671 17.9422 10.389 17.9808 10.195C18.0194 10.001 17.9996 9.80001 17.9239 9.61732C17.8482 9.43462 17.7201 9.27845 17.5557 9.16857C17.3913 9.05868 17.198 9.00001 17.0002 8.99997L7.00021 8.99997Z" fill="#06263D" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9998 15.9998C17.1975 15.9997 17.3908 15.9411 17.5552 15.8312C17.7197 15.7213 17.8478 15.5651 17.9235 15.3824C17.9991 15.1997 18.0189 14.9987 17.9804 14.8048C17.9418 14.6108 17.8466 14.4326 17.7068 14.2928L12.7068 9.29279C12.5193 9.10532 12.265 9 11.9998 9C11.7346 9 11.4803 9.10532 11.2928 9.29279L6.29279 14.2928C6.15298 14.4326 6.05777 14.6108 6.0192 14.8048C5.98064 14.9987 6.00044 15.1997 6.07611 15.3824C6.15178 15.5651 6.27992 15.7213 6.44433 15.8312C6.60874 15.9411 6.80204 15.9997 6.99979 15.9998H16.9998Z" fill="#06263D" />
                        </svg>}
                      </button>
                      <div className="w-[40px]" >
                        <Checkbox
                        />
                      </div>
                      <h3 className="text-lg font-medium text-[#06263d]">SCRUM Sprint 1</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="bg-[#438197] rounded-full w-6 h-6 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">4</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-[#838488]">01 Dec-07 Dec (3 issue items)</span>
                </div>
                {/* Complete Sprint Button */}
                <div className="flex items-center justify-end gap-2">
                  <button className="bg-[#67909B] text-white px-2 py-2 rounded-lg text-xs font-medium">
                    Complete Sprint
                  </button>
                  <button className="bg-[#67909B] text-white px-2 py-2 rounded-lg text-xs font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4.66667 8.00008C4.66667 8.3537 4.52619 8.69284 4.27614 8.94289C4.02609 9.19294 3.68696 9.33341 3.33333 9.33341C2.97971 9.33341 2.64057 9.19294 2.39052 8.94289C2.14048 8.69284 2 8.3537 2 8.00008C2 7.64646 2.14048 7.30732 2.39052 7.05727C2.64057 6.80722 2.97971 6.66675 3.33333 6.66675C3.68696 6.66675 4.02609 6.80722 4.27614 7.05727C4.52619 7.30732 4.66667 7.64646 4.66667 8.00008ZM9.33333 8.00008C9.33333 8.3537 9.19286 8.69284 8.94281 8.94289C8.69276 9.19294 8.35362 9.33341 8 9.33341C7.64638 9.33341 7.30724 9.19294 7.05719 8.94289C6.80714 8.69284 6.66667 8.3537 6.66667 8.00008C6.66667 7.64646 6.80714 7.30732 7.05719 7.05727C7.30724 6.80722 7.64638 6.66675 8 6.66675C8.35362 6.66675 8.69276 6.80722 8.94281 7.05727C9.19286 7.30732 9.33333 7.64646 9.33333 8.00008ZM14 8.00008C14 8.3537 13.8595 8.69284 13.6095 8.94289C13.3594 9.19294 13.0203 9.33341 12.6667 9.33341C12.313 9.33341 11.9739 9.19294 11.7239 8.94289C11.4738 8.69284 11.3333 8.3537 11.3333 8.00008C11.3333 7.64646 11.4738 7.30732 11.7239 7.05727C11.9739 6.80722 12.313 6.66675 12.6667 6.66675C13.0203 6.66675 13.3594 6.80722 13.6095 7.05727C13.8595 7.30732 14 7.64646 14 8.00008Z" fill="white" />
                    </svg>
                  </button>
                </div>
              </div>
              {!isSprintCollapsed && (
                <CustomTable selectable={true} draggable={true} data={data} columns={columns} />
              )}
            </div>

            {/* Backlog Card */}
            <div className="bg-white rounded-2xl ">
              <div className="flex items-center justify-between p-4">
                <div className='flex items-center gap-5'>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      <button
                        className="w-[40px] transition-transform duration-200"
                        onClick={toggleSprintCollapse}
                      >
                        {!isSprintCollapsed ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.00021 8.99997C6.80246 9.00001 6.60916 9.05868 6.44475 9.16857C6.28034 9.27845 6.15221 9.43462 6.07654 9.61732C6.00086 9.80001 5.98106 10.001 6.01963 10.195C6.0582 10.389 6.1534 10.5671 6.29321 10.707L11.2932 15.707C11.4807 15.8944 11.735 15.9998 12.0002 15.9998C12.2654 15.9998 12.5197 15.8944 12.7072 15.707L17.7072 10.707C17.847 10.5671 17.9422 10.389 17.9808 10.195C18.0194 10.001 17.9996 9.80001 17.9239 9.61732C17.8482 9.43462 17.7201 9.27845 17.5557 9.16857C17.3913 9.05868 17.198 9.00001 17.0002 8.99997L7.00021 8.99997Z" fill="#06263D" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9998 15.9998C17.1975 15.9997 17.3908 15.9411 17.5552 15.8312C17.7197 15.7213 17.8478 15.5651 17.9235 15.3824C17.9991 15.1997 18.0189 14.9987 17.9804 14.8048C17.9418 14.6108 17.8466 14.4326 17.7068 14.2928L12.7068 9.29279C12.5193 9.10532 12.265 9 11.9998 9C11.7346 9 11.4803 9.10532 11.2928 9.29279L6.29279 14.2928C6.15298 14.4326 6.05777 14.6108 6.0192 14.8048C5.98064 14.9987 6.00044 15.1997 6.07611 15.3824C6.15178 15.5651 6.27992 15.7213 6.44433 15.8312C6.60874 15.9411 6.80204 15.9997 6.99979 15.9998H16.9998Z" fill="#06263D" />
                        </svg>}
                      </button>
                      <div className="w-[40px]" >
                        <Checkbox
                        />
                      </div>
                      <h3 className="text-lg font-medium text-[#06263d]">Backlog</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="bg-[#438197] rounded-full w-6 h-6 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">4</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-[#838488]">(3 issue items)</span>
                </div>
                {/* Complete Sprint Button */}
                <div className="flex items-center justify-end gap-2">
                  <button className="bg-[#67909B] text-white px-2 py-2 rounded-lg text-xs font-medium">
                    Create Sprint
                  </button>
                  <button className="bg-[#67909B] text-white px-2 py-2 rounded-lg text-xs font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4.66667 8.00008C4.66667 8.3537 4.52619 8.69284 4.27614 8.94289C4.02609 9.19294 3.68696 9.33341 3.33333 9.33341C2.97971 9.33341 2.64057 9.19294 2.39052 8.94289C2.14048 8.69284 2 8.3537 2 8.00008C2 7.64646 2.14048 7.30732 2.39052 7.05727C2.64057 6.80722 2.97971 6.66675 3.33333 6.66675C3.68696 6.66675 4.02609 6.80722 4.27614 7.05727C4.52619 7.30732 4.66667 7.64646 4.66667 8.00008ZM9.33333 8.00008C9.33333 8.3537 9.19286 8.69284 8.94281 8.94289C8.69276 9.19294 8.35362 9.33341 8 9.33341C7.64638 9.33341 7.30724 9.19294 7.05719 8.94289C6.80714 8.69284 6.66667 8.3537 6.66667 8.00008C6.66667 7.64646 6.80714 7.30732 7.05719 7.05727C7.30724 6.80722 7.64638 6.66675 8 6.66675C8.35362 6.66675 8.69276 6.80722 8.94281 7.05727C9.19286 7.30732 9.33333 7.64646 9.33333 8.00008ZM14 8.00008C14 8.3537 13.8595 8.69284 13.6095 8.94289C13.3594 9.19294 13.0203 9.33341 12.6667 9.33341C12.313 9.33341 11.9739 9.19294 11.7239 8.94289C11.4738 8.69284 11.3333 8.3537 11.3333 8.00008C11.3333 7.64646 11.4738 7.30732 11.7239 7.05727C11.9739 6.80722 12.313 6.66675 12.6667 6.66675C13.0203 6.66675 13.3594 6.80722 13.6095 7.05727C13.8595 7.30732 14 7.64646 14 8.00008Z" fill="white" />
                    </svg>
                  </button>
                </div>
              </div>
              {!isSprintCollapsed && (
                <CustomTable selectable={true} draggable={true} data={data} columns={columns} />
              )}
            </div> 
          </div>
        </div>
      </div>
      {
        addTaskOpen && <AddTask isOpen={addTaskOpen} onClose={()=>setAddTaskOpen(false)}/>
      }
    </div>
  );
} 