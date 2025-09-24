import { History } from "lucide-react";
import { useState } from "react";

const profile1 = "/src/assets/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
const profile2 = "/src/assets/icons/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png";
const profile3 = "/src/assets/icons/27329e3b78d83b20619fddee55560c05c2cd1469.png";
const profile4 = "/src/assets/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";
const profile5 = "/src/assets/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";

const ActiveProject = () => {

    const initialProjects = [
        {
            name: 'Hire Accel',
            status: 'In progress',
            priority: 'High',
            progress: 50,
            daysLeft: '07 days left',
            startDate: '01 Sep 2025',
            assignee: [
                { name: 'Kamalesh', profile: profile1 },
                { name: 'Suresh', profile: profile3 },
                { name: 'Kamalesh', profile: profile1 },
                { name: 'Suresh', profile: profile3 },
                { name: 'Kamalesh', profile: profile1 },
                { name: 'Suresh', profile: profile3 },
                { name: 'Kamalesh', profile: profile1 },
                { name: 'Suresh', profile: profile3 },
                { name: 'Kamalesh', profile: profile1 },
                { name: 'Suresh', profile: profile3 },
                { name: 'Kamalesh', profile: profile1 },
                { name: 'Suresh', profile: profile3 },
            ]
        },
        {
            name: 'Hire Accel',
            status: 'In progress',
            priority: 'High',
            progress: 70,
            daysLeft: '07 days left',
            startDate: '01 Sep 2025',
            assignee: [
                { name: 'Kamalesh', profile: profile1 },
                { name: 'Suresh', profile: profile3 },
                { name: 'Kamalesh', profile: profile1 },
                { name: 'Suresh', profile: profile3 },
                { name: 'Kamalesh', profile: profile1 },
                { name: 'Suresh', profile: profile3 },
                { name: 'Kamalesh', profile: profile1 },
                { name: 'Suresh', profile: profile3 },
                { name: 'Kamalesh', profile: profile1 },
                { name: 'Suresh', profile: profile3 },
                { name: 'Kamalesh', profile: profile1 },
                { name: 'Suresh', profile: profile3 },
            ]
        }
    ]

    const [activeProjects, setActiveProject] = useState(initialProjects || []);
    return (
        <div className="w-full h-full bg-[#FFFFFF] p-5 rounded-2xl flex flex-col  gap-5 font-roboto font-medium">
            <div className="text-[#242424] text-xl">Active Projects <span>(03)</span></div>
            <div className="flex flex-col gap-2">
                {
                    activeProjects.length > 0 ? (
                        activeProjects?.map((project) => (
                            <div className="bg-[#F9F9F9] rounded-2xl flex flex-col p-5 gap-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <History size={18} className="text-[#4E84B4]" />
                                        <div className="text-base text-[#333333]">{project.name}</div>
                                        <div className="bg-[#D58D491A] text-[#D58D49] py-1 px-2 rounded-full text-[12px]">{project.status}</div>
                                    </div>
                                    <div className="text-[#D58D49] text-sm">{project.priority}</div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between text-[#71717A] text-sm">
                                        <span className="font-normal">{project.progress || 0} % Completed</span>
                                        <span className="font-normal">{project.daysLeft || '0 days left'}</span>
                                    </div>
                                    <div className="w-full h-2 bg-[#DDDDDD] rounded-full">
                                        <div className="w-1/2 h-full bg-[#67909B] rounded-full" style={{ width: `${project.progress || 0}%` }}></div>
                                    </div>
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
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No active project founded</div>
                    )
                }

            </div>
        </div>
    )
}

export default ActiveProject;