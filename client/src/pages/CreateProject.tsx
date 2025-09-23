import { Input } from "@/components/ui/input";
import { ArrowDownNarrowWide, ArrowLeft, Check, Earth, EarthLock, Minus, Plus, Search, TrendingUp } from "lucide-react"
import { useNavigate } from "react-router-dom";
import gridIcon from '../../public/icons/gridexpend.svg';
import { TeamMember, TeamMemberCard } from "./ProjectTeam";
const imgPhKanbanFill = "http://localhost:3845/assets/fdfd6519ff8dc5acdbb6048589d6921fea71cbe8.svg";
const imgProiconsTaskList = "http://localhost:3845/assets/935666228f191e7eff80fb57543eff5c627baebf.svg";
const imgFontistoDate = "http://localhost:3845/assets/bce17fdf9a51ff413188a2e607f8b8803f6fae97.svg";
const imgMynauiChartGantt = "http://localhost:3845/assets/e178fe15f264f6b933e72ff0d92acfdb728a5346.svg";
const imgEllipse7 = "http://localhost:3845/assets/4415cf6b90ae6200aee0458930211f231742cfb8.png";
const imgEllipse248 = "/icons/b1766b7062b0c67d9be111f724f646b15b02bf09.png";
const img2 = "/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
import CalentIcon from '/icons/Vector.svg';
import ClockIcon from '/icons/Timer.svg';
import TaskIcon from '/icons/Task.svg';
import WarningIcon from '/icons/warning.svg'

export const CreateProject = () => {
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

    return (
        <div className="bg-[#f6f6f6] h-full w-full flex flex-col gap-5">
            {/* header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className=" h-full items-start pt-2 cursor-pointer" onClick={() => navigate('/project-list')}>
                        <ArrowLeft />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#438197] font-medium text-2xl">Create Project</span>
                        <span className="text=[#666666] text-base font-medium">Start your workflow — create a project</span>
                    </div>
                </div>
                <div className="bg-[#438197] text-white px-3 py-1 rounded-lg cursor-pointer">
                    Create Project
                </div>
            </div> 
            {/* project Content  */}
            <div className="flex flex-col gap-5 w-full h-full overflow-y-scroll">
                <div className="flex flex-col bg-[#F2F2F2] p-10 rounded-2xl gap-5">
                    <div className="text-[#252525] font-medium text-xl">Project Details</div>
                    <div className=" grid grid-cols-2  gap-x-10 gap-y-5">
                        <div className="flex flex-1 flex-col gap-3">
                            <label className="font-medium text-base text-[#666666]">Project Name</label>
                            <input type="text" placeholder="Enter project name" className="px-10 py-5 rounded-lg" />
                        </div>
                        <div className="flex flex-1 flex-col gap-3">
                            <label className="font-medium text-base text-[#666666]">Category</label>
                            <select value={'sdlkfj'} className="px-10 py-5 rounded-lg mt-1">
                                <option>lsdjfks</option>
                            </select>
                        </div>

                        <div className="flex flex-1 flex-col gap-3">
                            <label className="font-medium text-base text-[#666666]">Project URL</label>
                            <input type="text" placeholder="Enter Enter Project URL" className="px-10 py-5 rounded-lg" />
                        </div>
                        <div className="flex flex-1 flex-col gap-3">
                            <label className="font-medium text-base text-[#666666]">Priority</label>
                            <select value={'sdlkfj'} className="px-10 py-5 rounded-lg mt-1">
                                <option>lsdjfks</option>
                            </select>
                        </div>
                        <div className="flex flex-1 flex-col gap-3">
                            <label className="font-medium text-base text-[#666666]">Currency</label>
                            <select value={'sdlkfj'} className="px-10 py-5 rounded-lg mt-1">
                                <option>lsdjfks</option>
                            </select>
                        </div>
                        <div className="flex flex-1 flex-col gap-3">
                            <label className="font-medium text-base text-[#666666]">Project Budget</label>
                            <input type="text" placeholder="Enter Enter Project URL" className="px-10 py-5 rounded-lg" />
                        </div>
                        <div className="col-span-2 flex flex-col gap-3">
                            <label className="font-medium text-base text-[#666666]">Description</label>
                            <textarea placeholder="Enter project description " className="py-10 px-5 rounded-lg" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-[#F2F2F2] p-10 rounded-2xl gap-5">
                    <div className="text-[#252525] font-medium text-xl">Visibility</div>
                    <div className="grid grid-cols-2  gap-x-10 gap-y-5">
                        <div className="flex flex-1 flex-col gap-3 cursor-pointer">
                            <label className="font-medium text-base text-[#666666]">Public</label>
                            <div className="flex items-center justify-between bg-white p-5 rounded-lg text-sm">
                                <div className="flex items-center gap-3">
                                    <Earth />
                                    <span className="text-[#999999]">visible for all user</span>
                                </div>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="hidden peer" />
                                    <span className="w-6 h-6 rounded-full border-2 border-[#678D95] flex items-center justify-center peer-checked:after:content-[''] peer-checked:after:block peer-checked:after:w-3 peer-checked:after:h-3 peer-checked:after:rounded-full peer-checked:after:bg-[#678D95]">
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-3 cursor-pointer">
                            <label className="font-medium text-base text-[#666666]">Private</label>
                            <div className="flex items-center justify-between bg-white p-5 rounded-lg text-sm">
                                <div className="flex items-center gap-3">
                                    <EarthLock />
                                    <span className="text-[#999999]">only selected memeber</span>
                                </div>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="hidden peer" />
                                    <span className="w-6 h-6 rounded-full border-2 border-[#678D95] flex items-center justify-center peer-checked:after:content-[''] peer-checked:after:block peer-checked:after:w-3 peer-checked:after:h-3 peer-checked:after:rounded-full peer-checked:after:bg-[#678D95]">
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-[#F2F2F2] p-10 rounded-2xl gap-5">
                    <div className="text-[#252525] font-medium text-xl">Timeline</div>
                    <div className="grid grid-cols-2  gap-x-10 gap-y-5">
                        <div className="flex flex-1 flex-col gap-3 cursor-pointer">
                            <label className="font-medium text-base text-[#666666]">Start Time</label>
                            <input type="date" placeholder="Enter Enter Project URL" className="px-10 py-5 rounded-lg" />
                        </div>
                        <div className="flex flex-1 flex-col gap-3 cursor-pointer">
                            <label className="font-medium text-base text-[#666666]">Private</label>
                            <input type="date" placeholder="Enter Enter Project URL" className="px-10 py-5 rounded-lg" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-[#F2F2F2] p-5 rounded-2xl gap-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="text-[#06263D] font-medium text-xl">Active members</div>
                            <div className="bg-[#455A64] p-2 overflow-hidden w-7 h-7 text-base font-medium flex items-center justify-center text-white rounded-full">22</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-[#67909B] text-white rounded-md p-2 cursor-pointer">
                                <Search size={18} />
                            </div>
                            <div className="bg-[#67909B] text-white rounded-md p-2 cursor-pointer">
                                <ArrowDownNarrowWide size={18} />
                            </div>
                            <div className="bg-[#67909B] text-white rounded-md p-2 cursor-pointer">
                                <img src={gridIcon} />
                            </div>
                            <div className="bg-[#67909B] text-white rounded-md p-2 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M7.50147 4.40653C7.13205 4.40653 6.76625 4.47929 6.42496 4.62066C6.08366 4.76203 5.77356 4.96924 5.51234 5.23045C5.25112 5.49167 5.04392 5.80178 4.90255 6.14307C4.76118 6.48437 4.68842 6.85017 4.68842 7.21958C4.68842 7.589 4.76118 7.95479 4.90255 8.29609C5.04392 8.63738 5.25112 8.94749 5.51234 9.20871C5.77356 9.46992 6.08366 9.67713 6.42496 9.8185C6.76625 9.95987 7.13205 10.0326 7.50147 10.0326H13.5401L12.865 9.3575C12.7959 9.29312 12.7405 9.21548 12.7021 9.12921C12.6636 9.04294 12.643 8.94982 12.6413 8.85539C12.6396 8.76096 12.657 8.66717 12.6924 8.5796C12.7277 8.49203 12.7804 8.41248 12.8472 8.3457C12.9139 8.27892 12.9935 8.22628 13.0811 8.19091C13.1686 8.15553 13.2624 8.13816 13.3569 8.13983C13.4513 8.1415 13.5444 8.16217 13.6307 8.2006C13.7169 8.23904 13.7946 8.29446 13.859 8.36355L15.7343 10.2389C15.866 10.3708 15.94 10.5495 15.94 10.7359C15.94 10.9223 15.866 11.101 15.7343 11.2329L13.859 13.1082C13.7946 13.1773 13.7169 13.2327 13.6307 13.2712C13.5444 13.3096 13.4513 13.3303 13.3569 13.332C13.2624 13.3336 13.1686 13.3163 13.0811 13.2809C12.9935 13.2455 12.9139 13.1929 12.8472 13.1261C12.7804 13.0593 12.7277 12.9798 12.6924 12.8922C12.657 12.8046 12.6396 12.7108 12.6413 12.6164C12.643 12.522 12.6636 12.4288 12.7021 12.3426C12.7405 12.2563 12.7959 12.1787 12.865 12.1143L13.5401 11.4392H7.50147C6.58401 11.439 5.69161 11.1398 4.95946 10.5869C4.22731 10.034 3.6953 9.25758 3.44404 8.3752C3.19277 7.49282 3.23594 6.55259 3.56701 5.69695C3.89807 4.84131 4.49899 4.11688 5.27872 3.63342C6.05845 3.14995 6.97452 2.93379 7.88813 3.01768C8.80174 3.10158 9.66312 3.48095 10.3418 4.09833C11.0204 4.71572 11.4793 5.53747 11.649 6.43909C11.8187 7.34072 11.69 8.27309 11.2822 9.09495H9.59813C9.96015 8.69019 10.1973 8.18931 10.2809 7.65275C10.3645 7.1162 10.2911 6.56691 10.0694 6.07119C9.84768 5.57546 9.48725 5.1545 9.03159 4.85912C8.57592 4.56373 8.0445 4.40654 7.50147 4.40653ZM0.703263 10.0326H3.17875C3.53697 10.5836 3.99719 11.061 4.53464 11.4392H0.703263C0.516746 11.4392 0.337868 11.3651 0.205981 11.2332C0.0740934 11.1013 0 10.9224 0 10.7359C0 10.5494 0.0740934 10.3705 0.205981 10.2386C0.337868 10.1067 0.516746 10.0326 0.703263 10.0326Z" fill="white" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="flex flex-col gap-5 max-h-[500px] overflow-y-scroll">
                            {
                                teamMembers.map((team) => (
                                    <AddTeamMemberCard member={team} />
                                ))
                            }
                        </div>
                        <div className=" bg-white  p-5 flex flex-col gap-5 rounded-lg">
                            <div className="flex flex-col gap-5">
                                <div className="text-[#06263D] font-medium text-xl">Total Impact Analysis</div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="flex flex-col items-center justify-center bg-[#F9F9F9] rounded-lg p-5 py-10">
                                        <span className="text-base font-medium text-[#333333]">Total Duration</span>
                                        <span className="text-base font-bold text-[#020817]">48 hrs</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center bg-[#F9F9F9] rounded-lg p-5 py-10">
                                        <span className="text-base font-medium text-[#333333]">Total Cost</span>
                                        <span className="text-base font-bold text-[#020817]">$ 6000</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <div className="text-[#06263D] font-medium text-xl">Draft Team Members</div>
                                    <div className="bg-[#455A64] p-2 overflow-hidden w-7 h-7 text-base font-medium flex items-center justify-center text-white rounded-full">22</div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="bg-[#F9F9F9] p-5 rounded-lg flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-5">
                                                <img src={img2} className="w-10 h-10" />
                                                <div className="flex flex-col">
                                                    <span>
                                                        Saranya
                                                    </span>
                                                    <span>Devloper</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-5 ">
                                                <div className="flex gap-2">
                                                    <select value={'sldkjf'} className="py-1 rounded-lg px-2">
                                                        <option>hours</option>
                                                        <option>day</option>
                                                    </select>
                                                    <div className="bg-[#EEF4F2] flex items-center gap-1 rounded-lg">
                                                        <div className="flex items-center justify-center text-[#06263D] px-2 cursor-pointer">
                                                            <Minus />
                                                        </div>
                                                        <div className="text-[#252525] text-xs font-medium">12.00</div>
                                                        <div className="flex items-center justify-center text-[#06263D] px-2 cursor-pointer">
                                                            <Plus />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <div>Cost</div>
                                                    <div className="bg-[#EEF4F2] flex items-center gap-1 rounded-lg">
                                                        <div className="flex items-center justify-center text-[#06263D] px-2 cursor-pointer">
                                                            <Minus />
                                                        </div>
                                                        <div className="text-[#252525] text-xs font-medium">$120000</div>
                                                        <div className="flex items-center justify-center text-[#06263D] px-2 cursor-pointer">
                                                            <Plus />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 ">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    <img src={WarningIcon} />
                                                    <div className="text-[#252525] font-medium text-sm flex items-center justify-center">High Load</div>
                                                </div>
                                                <div className="text-[#666666] text-xs">
                                                    Total cost ₹ 6000
                                                </div>
                                            </div>
                                            <div className="flex-1 flex flex-col h-full">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="w-full bg-gray-200 rounded-full h-3 mr-4">
                                                        <div className="bg-[#438197] h-3 rounded-full" style={{ width: `80%` }}></div>
                                                    </div>
                                                    <span className="text-gray-700 font-medium text-lg">80%</span>
                                                </div>
                                                <div className="w-full text-center">Project Allowcation</div>
                                            </div>
                                            {/* <div className="flex items-center justify-between gap-3">
                                                <div className="flex items-center gap-2">
                                                    <img src={WarningIcon} />
                                                    <div className="text-[#252525] font-medium text-sm flex items-center justify-center">High Load</div>
                                                </div>
                                                <div className="flex-1 items-center">
                                                   
                                                </div>
                                            </div>
                                            <div>
                                                s
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const AddTeamMemberCard = ({ member }) => {
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
                        <div className='flex items-center gap-2 text-[#22C55D]'>
                            <TrendingUp />
                            <span className='text-sm text-[#22C55D] font-medium'>Hign Performance</span>
                        </div>
                        <div className='flex items-center justify-center bg-[#438197] rounded-md text-white cursor-pointer'>
                            <Plus />
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