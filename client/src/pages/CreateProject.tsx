import { Input } from "@/components/ui/input";
import { ArrowDownNarrowWide, ArrowLeft, Check, Earth, EarthLock, Minus, Plus, Search, TrendingUp } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../store/project/projectSlice";
import { RootState } from "../store/store.ts";
import gridIcon from '../assets/icons/gridexpend.svg';
import { TeamMember } from "../store/team/teamSlice";
import { TeamMemberCard } from "./ProjectTeam";
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
    const dispatch = useDispatch();
    const { projects } = useSelector((state: RootState) => state.project);
    
    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        projectUrl: '',
        priority: '',
        currency: 'USD',
        budget: '',
        visibility: 'public' as 'public' | 'private',
        startDate: '',
        endDate: '',
    });

    // Team member state
    const [selectedTeamMembers, setSelectedTeamMembers] = useState<Array<{
        id: string;
        name: string;
        role: string;
        avatar: string;
        hours: number;
        cost: number;
        timeUnit: 'hours' | 'days';
    }>>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleVisibilityChange = (visibility: 'public' | 'private') => {
        setFormData(prev => ({
            ...prev,
            visibility
        }));
    };

    const handleAddTeamMember = (member: TeamMember) => {
        const newMember = {
            id: member.id,
            name: member.name,
            role: member.role,
            avatar: member.avatar,
            hours: 8, // Default 8 hours
            cost: 100, // Default $100
            timeUnit: 'hours' as 'hours' | 'days'
        };
        
        setSelectedTeamMembers(prev => [...prev, newMember]);
    };

    const handleUpdateTeamMember = (id: string, field: 'hours' | 'cost' | 'timeUnit', value: number | string) => {
        setSelectedTeamMembers(prev => 
            prev.map(member => 
                member.id === id 
                    ? { ...member, [field]: value }
                    : member
            )
        );
    };

    const handleRemoveTeamMember = (id: string) => {
        setSelectedTeamMembers(prev => prev.filter(member => member.id !== id));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Generate project ID
        const projectId = `PJ-${String(projects.length + 1).padStart(3, '0')}`;
        
        // Create new project object
        const newProject = {
            title: formData.title,
            description: formData.description,
            ProjectId: projectId,
            startDate: formData.startDate,
            endDate: formData.endDate,
            process: 0,
            category: formData.category,
            projectUrl: formData.projectUrl,
            priority: formData.priority,
            currency: formData.currency,
            budget: formData.budget,
            visibility: formData.visibility,
            client: {
                name: 'New Client',
            },
            projectManager: {
                name: 'Current User',
                profile: imgEllipse7,
            },
            assignee: selectedTeamMembers.map(member => ({
                name: member.name,
                profile: member.avatar
            })),
            teamMembers: selectedTeamMembers.map(member => ({
                ...member,
                dateRange: '2025-01-01 to 2025-12-31',
                tasks: 0,
                timeSpent: `${member.hours}h`,
                progress: Math.min(100, (member.hours / 40) * 100),
                skills: ['Project Management', 'Development']
            })),
        };

        // Dispatch action to add project
        dispatch(addProject(newProject));
        
        // Navigate back to project list
        navigate('/project-list');
    };

    const teamMembers: TeamMember[] = [
        {
            id: '1',
            name: 'Alex Johnson',
            role: 'Senior Developer',
            avatar: '/src/assets/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png',
            dateRange: '2025-01-15 to 2025-12-31',
            tasks: 8,
            timeSpent: '32h/40h',
            progress: 80,
            skills: ['React', 'TypeScript', 'Node.js', 'AWS']
        },
        {
            id: '2',
            name: 'Sarah Chen',
            role: 'UI/UX Designer',
            avatar: '/src/assets/icons/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png',
            dateRange: '2025-01-15 to 2025-12-31',
            tasks: 5,
            timeSpent: '25h/35h',
            progress: 71,
            skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping']
        },
        {
            id: '3',
            name: 'Michael Rodriguez',
            role: 'DevOps Engineer',
            avatar: '/src/assets/icons/27329e3b78d83b20619fddee55560c05c2cd1469.png',
            dateRange: '2025-01-15 to 2025-12-31',
            tasks: 6,
            timeSpent: '28h/40h',
            progress: 70,
            skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS']
        },
        {
            id: '4',
            name: 'Emily Watson',
            role: 'Product Manager',
            avatar: '/src/assets/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png',
            dateRange: '2025-01-15 to 2025-12-31',
            tasks: 4,
            timeSpent: '20h/30h',
            progress: 67,
            skills: ['Product Strategy', 'Agile', 'Analytics', 'Leadership']
        },
        {
            id: '5',
            name: 'David Kim',
            role: 'Backend Developer',
            avatar: '/src/assets/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png',
            dateRange: '2025-01-15 to 2025-12-31',
            tasks: 7,
            timeSpent: '35h/40h',
            progress: 88,
            skills: ['Python', 'Django', 'PostgreSQL', 'Redis']
        },
        {
            id: '6',
            name: 'Lisa Thompson',
            role: 'QA Engineer',
            avatar: '/src/assets/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png',
            dateRange: '2025-01-15 to 2025-12-31',
            tasks: 9,
            timeSpent: '36h/40h',
            progress: 90,
            skills: ['Testing', 'Automation', 'Selenium', 'Jest']
        },
        {
            id: '7',
            name: 'James Wilson',
            role: 'Frontend Developer',
            avatar: '/src/assets/icons/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png',
            dateRange: '2025-01-15 to 2025-12-31',
            tasks: 6,
            timeSpent: '24h/35h',
            progress: 69,
            skills: ['Vue.js', 'JavaScript', 'CSS', 'Webpack']
        },
        {
            id: '8',
            name: 'Maria Garcia',
            role: 'Data Analyst',
            avatar: '/src/assets/icons/27329e3b78d83b20619fddee55560c05c2cd1469.png',
            dateRange: '2025-01-15 to 2025-12-31',
            tasks: 5,
            timeSpent: '22h/30h',
            progress: 73,
            skills: ['Python', 'SQL', 'Tableau', 'Statistics']
        }
    ];

    return (
        <form onSubmit={handleSubmit} className="bg-[#f6f6f6] h-full w-full flex flex-col gap-5">
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
                <button type="submit" className="bg-[#438197] text-white px-3 py-1 rounded-lg cursor-pointer">
                    Create Project
                </button>
            </div> 
            {/* project Content  */}
            <div className="flex flex-col gap-5 w-full h-full overflow-y-scroll">
                <div className="flex flex-col bg-[#F2F2F2] p-10 rounded-2xl gap-5">
                    <div className="text-[#252525] font-medium text-xl">Project Details</div>
                    <div className=" grid grid-cols-2  gap-x-10 gap-y-5">
                        <div className="flex flex-1 flex-col gap-3">
                            <label className="font-medium text-base text-[#666666]">Project Name</label>
                            <input 
                                type="text" 
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter project name" 
                                className="px-10 py-5 rounded-lg" 
                                required
                            />
                        </div>
                        <div className="flex flex-1 flex-col gap-3">
                            <label className="font-medium text-base text-[#666666]">Category</label>
                            <select 
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="px-10 py-5 rounded-lg mt-1"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Mobile Development">Mobile Development</option>
                                <option value="AI/ML">AI/ML</option>
                                <option value="IoT Development">IoT Development</option>
                                <option value="Healthcare">Healthcare</option>
                            </select>
                        </div>

                        <div className="flex flex-1 flex-col gap-3">
                            <label className="font-medium text-base text-[#666666]">Project URL</label>
                            <input 
                                type="url" 
                                name="projectUrl"
                                value={formData.projectUrl}
                                onChange={handleInputChange}
                                placeholder="Enter Project URL" 
                                className="px-10 py-5 rounded-lg" 
                            />
                        </div>
                        <div className="flex flex-1 flex-col gap-3">
                            <label className="font-medium text-base text-[#666666]">Priority</label>
                            <select 
                                name="priority"
                                value={formData.priority}
                                onChange={handleInputChange}
                                className="px-10 py-5 rounded-lg mt-1"
                                required
                            >
                                <option value="">Select Priority</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>
                        <div className="flex flex-1 flex-col gap-3">
                            <label className="font-medium text-base text-[#666666]">Currency</label>
                            <select 
                                name="currency"
                                value={formData.currency}
                                onChange={handleInputChange}
                                className="px-10 py-5 rounded-lg mt-1"
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                <option value="INR">INR</option>
                            </select>
                        </div>
                        <div className="flex flex-1 flex-col gap-3">
                            <label className="font-medium text-base text-[#666666]">Project Budget</label>
                            <input 
                                type="number" 
                                name="budget"
                                value={formData.budget}
                                onChange={handleInputChange}
                                placeholder="Enter Project Budget" 
                                className="px-10 py-5 rounded-lg" 
                            />
                        </div>
                        <div className="col-span-2 flex flex-col gap-3">
                            <label className="font-medium text-base text-[#666666]">Description</label>
                            <textarea 
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter project description" 
                                className="py-10 px-5 rounded-lg" 
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-[#F2F2F2] p-10 rounded-2xl gap-5">
                    <div className="text-[#252525] font-medium text-xl">Visibility</div>
                    <div className="grid grid-cols-2  gap-x-10 gap-y-5">
                        <div className="flex flex-1 flex-col gap-3 cursor-pointer" onClick={() => handleVisibilityChange('public')}>
                            <label className="font-medium text-base text-[#666666]">Public</label>
                            <div className="flex items-center justify-between bg-white p-5 rounded-lg text-sm">
                                <div className="flex items-center gap-3">
                                    <Earth />
                                    <span className="text-[#999999]">visible for all user</span>
                                </div>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="visibility"
                                        value="public"
                                        checked={formData.visibility === 'public'}
                                        onChange={() => handleVisibilityChange('public')}
                                        className="hidden peer" 
                                    />
                                    <span className={`w-6 h-6 rounded-full border-2 border-[#678D95] flex items-center justify-center ${formData.visibility === 'public' ? 'after:content-[\'\'] after:block after:w-3 after:h-3 after:rounded-full after:bg-[#678D95]' : ''}`}>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-3 cursor-pointer" onClick={() => handleVisibilityChange('private')}>
                            <label className="font-medium text-base text-[#666666]">Private</label>
                            <div className="flex items-center justify-between bg-white p-5 rounded-lg text-sm">
                                <div className="flex items-center gap-3">
                                    <EarthLock />
                                    <span className="text-[#999999]">only selected member</span>
                                </div>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="visibility"
                                        value="private"
                                        checked={formData.visibility === 'private'}
                                        onChange={() => handleVisibilityChange('private')}
                                        className="hidden peer" 
                                    />
                                    <span className={`w-6 h-6 rounded-full border-2 border-[#678D95] flex items-center justify-center ${formData.visibility === 'private' ? 'after:content-[\'\'] after:block after:w-3 after:h-3 after:rounded-full after:bg-[#678D95]' : ''}`}>
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
                            <label className="font-medium text-base text-[#666666]">Start Date</label>
                            <input 
                                type="date" 
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                className="px-10 py-5 rounded-lg" 
                                required
                            />
                        </div>
                        <div className="flex flex-1 flex-col gap-3 cursor-pointer">
                            <label className="font-medium text-base text-[#666666]">End Date</label>
                            <input 
                                type="date" 
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                className="px-10 py-5 rounded-lg" 
                                required
                            />
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
                                    <AddTeamMemberCard 
                                        key={team.id}
                                        member={team} 
                                        onAddMember={handleAddTeamMember}
                                        isSelected={selectedTeamMembers.some(selected => selected.id === team.id)}
                                    />
                                ))
                            }
                        </div>
                        <div className=" bg-white  p-5 flex flex-col gap-5 rounded-lg">
                            <div className="flex flex-col gap-5">
                                <div className="text-[#06263D] font-medium text-xl">Total Impact Analysis</div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="flex flex-col items-center justify-center bg-[#F9F9F9] rounded-lg p-5 py-10">
                                        <span className="text-base font-medium text-[#333333]">Total Duration</span>
                                        <span className="text-base font-bold text-[#020817]">
                                            {selectedTeamMembers.reduce((total, member) => total + member.hours, 0)} hrs
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center bg-[#F9F9F9] rounded-lg p-5 py-10">
                                        <span className="text-base font-medium text-[#333333]">Total Cost</span>
                                        <span className="text-base font-bold text-[#020817]">
                                            $ {selectedTeamMembers.reduce((total, member) => total + (member.cost * member.hours), 0)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <div className="text-[#06263D] font-medium text-xl">Draft Team Members</div>
                                    <div className="bg-[#455A64] p-2 overflow-hidden w-7 h-7 text-base font-medium flex items-center justify-center text-white rounded-full">
                                        {selectedTeamMembers.length}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 py-5">
                                    {selectedTeamMembers.length === 0 ? (
                                        <div className="text-center text-gray-500 py-8">
                                            No team members selected. Click the + button on active members to add them.
                                        </div>
                                    ) : (
                                        selectedTeamMembers.map((member) => (
                                            <div key={member.id} className="bg-[#F9F9F9] p-5 rounded-xl flex flex-col gap-2 shadow-lg">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-5">
                                                        <img src={member.avatar} className="w-10 h-10 rounded-full" />
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">{member.name}</span>
                                                            <span className="text-sm text-gray-600">{member.role}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-5">
                                                        <div className="flex gap-2">
                                                            <select 
                                                                value={member.timeUnit}
                                                                onChange={(e) => handleUpdateTeamMember(member.id, 'timeUnit', e.target.value)}
                                                                className="py-1 rounded-lg px-2"
                                                            >
                                                                <option value="hours">hours</option>
                                                                <option value="days">days</option>
                                                            </select>
                                                            <div className="bg-[#EEF4F2] flex items-center gap-1 rounded-lg">
                                                                <div 
                                                                    className="flex items-center justify-center text-[#06263D] px-2 cursor-pointer"
                                                                    onClick={() => handleUpdateTeamMember(member.id, 'hours', Math.max(0, member.hours - 1))}
                                                                >
                                                                    <Minus />
                                                                </div>
                                                                <div className="text-[#252525] text-xs font-medium px-2">
                                                                    {member.hours}
                                                                </div>
                                                                <div 
                                                                    className="flex items-center justify-center text-[#06263D] px-2 cursor-pointer"
                                                                    onClick={() => handleUpdateTeamMember(member.id, 'hours', member.hours + 1)}
                                                                >
                                                                    <Plus />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <div>Cost</div>
                                                            <div className="bg-[#EEF4F2] flex items-center gap-1 rounded-lg">
                                                                <div 
                                                                    className="flex items-center justify-center text-[#06263D] px-2 cursor-pointer"
                                                                    onClick={() => handleUpdateTeamMember(member.id, 'cost', Math.max(0, member.cost - 10))}
                                                                >
                                                                    <Minus />
                                                                </div>
                                                                <div className="text-[#252525] text-xs font-medium px-2">
                                                                    ${member.cost}
                                                                </div>
                                                                <div 
                                                                    className="flex items-center justify-center text-[#06263D] px-2 cursor-pointer"
                                                                    onClick={() => handleUpdateTeamMember(member.id, 'cost', member.cost + 10)}
                                                                >
                                                                    <Plus />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => handleRemoveTeamMember(member.id)}
                                                            className="text-red-500 hover:text-red-700 px-2"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex items-center gap-2">
                                                            <img src={WarningIcon} />
                                                            <div className="text-[#252525] font-medium text-sm flex items-center justify-center">
                                                                {member.hours > 40 ? 'High Load' : 'Normal Load'}
                                                            </div>
                                                        </div>
                                                        <div className="text-[#666666] text-xs">
                                                            Total cost: ${member.cost * member.hours}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 flex flex-col h-full">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="w-full bg-gray-200 rounded-full h-3 mr-4">
                                                                <div 
                                                                    className="bg-[#438197] h-3 rounded-full" 
                                                                    style={{ width: `${Math.min(100, (member.hours / 40) * 100)}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="text-gray-700 font-medium text-lg">
                                                                {Math.min(100, Math.round((member.hours / 40) * 100))}%
                                                            </span>
                                                        </div>
                                                        <div className="w-full text-center text-sm text-[#999999]">Project Allocation</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export const AddTeamMemberCard = ({ member, onAddMember, isSelected }) => {
    return (
        <div className={`w-full rounded-2xl h-fit flex gap-3 px-5 py-4 ${isSelected ? 'bg-green-50 border-2 border-green-200' : 'bg-white'}`}>
            <div className='flex items-start justify-center  w-fit '>
                <img alt="member" className="w-10 h-10 rounded-full transition-transform duration-200 " src={member.avatar} />
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
                            <span className='text-sm text-[#22C55D] font-medium'>High Performance</span>
                        </div>
                        <div 
                            className={`flex items-center justify-center rounded-md text-white cursor-pointer ${
                                isSelected 
                                    ? 'bg-green-500 hover:bg-green-600' 
                                    : 'bg-[#438197] hover:bg-[#3a7080]'
                            }`}
                            onClick={() => onAddMember(member)}
                        >
                            {isSelected ? <Check size={16} /> : <Plus size={16} />}
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
                        member.skills.map((skill, index) => (
                            <div key={index} className='bg-[#F0F5F8] rounded-3xl px-2 py-1 flex items-center justify-center'>
                                <span className='text-[#666666] text-sm font-medium'>{skill}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}