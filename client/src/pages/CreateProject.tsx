import { Input } from "@/components/ui/input";
import { ArrowDownNarrowWide, ArrowLeft, Check, Earth, EarthLock, Minus, Plus, Search, TrendingUp } from "lucide-react"
import { useNavigate } from "react-router-dom";
import gridIcon from '../assets/icons/gridexpend.svg';
import { TeamMember, TeamMemberCard } from "./ProjectTeam";
const imgPhKanbanFill = "http://localhost:3845/assets/fdfd6519ff8dc5acdbb6048589d6921fea71cbe8.svg";
const imgProiconsTaskList = "http://localhost:3845/assets/935666228f191e7eff80fb57543eff5c627baebf.svg";
const imgFontistoDate = "http://localhost:3845/assets/bce17fdf9a51ff413188a2e607f8b8803f6fae97.svg";
const imgMynauiChartGantt = "http://localhost:3845/assets/e178fe15f264f6b933e72ff0d92acfdb728a5346.svg";
const imgEllipse7 = "http://localhost:3845/assets/4415cf6b90ae6200aee0458930211f231742cfb8.png";
const imgEllipse248 = "/src/assets/icons/b1766b7062b0c67d9be111f724f646b15b02bf09.png";
const img2 = "/src/assets/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
import CalentIcon from '/src/assets/icons/Vector.svg';
import ClockIcon from '/src/assets/icons/Timer.svg';
import TaskIcon from '/src/assets/icons/Task.svg';
import WarningIcon from '/src/assets/icons/warning.svg'

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
                                <div className="flex flex-col gap-3 py-5">
                                    <div className="bg-[#F9F9F9] p-5 rounded-xl flex flex-col gap-2 shadow-lg">
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
                                                <div className="w-full text-center text-sm text-[#999999]">Project Allowcation</div>
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