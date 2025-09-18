import { AddTeamMemberCard } from "@/pages/CreateProject";
import { TeamMember } from "@/pages/ProjectTeam";
import { ArrowDownNarrowWide, Minus, Plus, Search, X } from "lucide-react";
const imgEllipse7 = "http://localhost:3845/assets/4415cf6b90ae6200aee0458930211f231742cfb8.png";
const imgEllipse248 = "/icons/b1766b7062b0c67d9be111f724f646b15b02bf09.png";
const img2 = "/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
import WarningIcon from '/icons/warning.svg'
const AddMemember = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
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
        <div className={`${isOpen ? "flex" : "hidden"} fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  z-50`}>
            <div className=" bg-white flex flex-col rounded-lg w-[80%]">
                {/* header */}
                <div className="flex items-center justify-between p-5 border-b ">
                    <div className="flex items-center gap-5">
                        <div>Available members</div>
                        <div className="w-6 h-6 overflow-hidden p-2 rounded-full bg-[#67909B] flex items-center justify-center text-white text-sm">22</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-[#67909B] text-white flex items-center justify-center p-2 rounded-lg cursor-pointer">
                            <Search size={17} />
                        </div>
                        <div className="bg-[#67909B] text-white flex items-center justify-center p-2 rounded-lg cursor-pointer">
                            <ArrowDownNarrowWide size={17} />
                        </div>
                        <div className=" flex items-center justify-center p-2 rounded-lg cursor-pointer" onClick={onClose}>
                            <X size={18} />
                        </div>
                    </div>
                </div>
                {/* content */}
                <div className="flex flex-col bg-[#F2F2F2] rounded-lg">
                    <div className="grid grid-cols-2 p-5 gap-5">
                        <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-scroll">
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

export default AddMemember;