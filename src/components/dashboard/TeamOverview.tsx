export const TeamOverView = () => {
    return (
        <div className="bg-white flex flex-col rounded-2xl p-4 shadow-sm w-full h-full">
            <h3 className="text-lg font-medium text-[#242424] mb-4">Team Overview</h3>
            <div className="flex flex-col flex-1 justify-between">
                <div className="space-y-3 flex flex-col gap-4">
                    {[
                        { name: 'Alex Chen', role: 'Frontend Developer', color: '#67909b', initials: 'AC', status: 'online' },
                        { name: 'Maria', role: 'Backend Developer', color: '#679b7c', initials: 'MR', status: 'online' },
                        { name: 'David', role: 'UX Designer', color: '#7b679b', initials: 'DK', status: 'busy' },
                        { name: 'Emily', role: 'QA Engineer', color: '#bdaa6f', initials: 'EM', status: 'busy' }
                    ].map((member, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium"
                                        style={{ backgroundColor: member.color }}
                                    >
                                        {member.initials}
                                    </div>
                                    <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${member.status === 'online' ? 'bg-green-500' : 'bg-orange-500'
                                        }`}></div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#252525]">{member.name}</p>
                                    <p className="text-xs text-[#666666]">{member.role}</p>
                                </div>
                            </div>
                            <div className="text-right flex items-center justify-end flex-1 gap-5">
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center gap-1">
                                        <p className="text-xs text-[#252525]">12/15</p>
                                        <p className="text-xs text-[#666666]">Tasks</p>
                                    </div>
                                    <div className="w-20 bg-[#beced2] h-2 rounded-full mt-1">
                                        <div className="bg-[#67909b] h-2 rounded-full" style={{ width: '80%' }}></div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-xs text-[#f59f0a] mt-1">85%</p>
                                    <p className="text-xs text-[#666666]">workload</p>
                                </div>
                                <div className="flex items-center justify-center font-semibold cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                        <path d="M14.6406 10C14.6406 10.3536 14.5001 10.6928 14.2501 10.9428C14.0001 11.1929 13.6609 11.3333 13.3073 11.3333H5.30729L2.64062 14V3.33333C2.64062 2.97971 2.7811 2.64057 3.03115 2.39052C3.2812 2.14048 3.62034 2 3.97396 2H13.3073C13.6609 2 14.0001 2.14048 14.2501 2.39052C14.5001 2.64057 14.6406 2.97971 14.6406 3.33333V10Z" stroke="#06263D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="border-t border-[#E4E4E780] pt-5 flex items-center justify-evenly">
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-[#16A249] text-lg font-semibold">3</span>
                        <span className="font-normal text-xs">
                            Online
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-[#F59F0A] text-lg font-semibold">3</span>
                        <span className="font-normal text-xs">
                            Busy
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-[#9090B] text-lg font-semibold">77 %</span>
                        <span className="font-normal text-xs">
                            Avg Load
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}