import { CalendarDays, Ellipsis, Eye, Maximize2, Paperclip, Plus, Send, Share2, Smile, X } from "lucide-react";
import { useState } from "react";
import { Select, SelectTrigger } from "../ui/select";
import { Textarea } from "../ui/textarea";

const img2 = "/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";

export const AddTask = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [activeTab, setActiveTab] = useState<'comments' | 'attachment'>('comments');

    const tabs: { label: string; value: 'comments' | 'attachment' }[] = [
        { label: 'Comments', value: 'comments' },
        { label: 'Attachment', value: 'attachment' },
    ]
    return (
        <div className={`${isOpen ? "flex" : "hidden"} fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  z-50`}>
            <div className="bg-white w-[80%] h-[90%] rounded-xl font-roboto flex flex-col">
                {/* add task header */}
                <div className="flex items-center justify-between border-b border-gray-300 p-3">
                    {/* left section  */}
                    <div className="flex items-center gap-10">
                        <div className="text-[#438197] text-xl font-semibold">Issue Details</div>
                        <span className="text-[#666666] text-base">Project / PJ -1 / EP-1</span>
                    </div>
                    {/* right section */}
                    <div className="flex items-center gap-5">
                        {/* project card */}
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col items-end">
                                <span className="text-[#252525] font-medium text-sm">Kamalesh</span>
                                <span className="text-[#999999] text-xs">Issue Created on Sep 24 2025 at 10:30 AM</span>
                            </div>
                            <img src={img2} className="w-10 h-10" />
                        </div>
                        {/* actions btn  */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center cursor-pointer text-[#333333]">
                                <Share2 />
                            </div>
                            <div className="flex items-center gap-2 text-[#333333] cursor-pointer">
                                <Eye />
                                <span>6</span>
                            </div>
                            <div className="flex items-center text-[#333333] cursor-pointer">
                                <Ellipsis />
                            </div>
                            <div className="flex items-center text-[#333333] cursor-pointer" onClick={onClose}>
                                <X />
                            </div>
                        </div>
                    </div>
                </div>
                {/* add task content */}
                <div className=" grid grid-cols-2 w-full h-full">
                    <div className="p-5 flex flex-col border-r border-gray-300 h-full">
                        {/* Tast content Header */}
                        <div className="flex items-center justify-between py-5">
                            <div className="flex items-center gap-10">
                                <div className="text-[#252525] font-medium text-xl">Issue Type</div>
                                <select>
                                    sl
                                </select>
                            </div>
                            <div className="bg-[#67909B] text-white rounded-md">
                                <Plus />
                            </div>
                        </div>
                        {/* task content  */}
                        <div className="flex flex-col gap-5 pb-10 border-b border-gray-200">
                            <div className="text-[#438197] font-medium text-2xl">
                                V-Accel Website Design
                            </div>
                            <div className="flex items-center">
                                <div className="text-[#252525] font-medium text-xl w-[40%]">Assigned to</div>
                                <div className="flex items-center justify-start flex-1">
                                    <div className="bg-[#67909B] text-white rounded-md ">
                                        <Plus />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-[#252525] font-medium text-xl w-[40%]">Dates</div>
                                <div className=" flex items-center justify-start gap-4">
                                    <CalendarDays className="text-base" size={16} />
                                    <div className="text-[#252525] text-base font-medium">
                                        Sep 24 2025 {">"} Sep 24 2025
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-[#252525] font-medium text-xl w-[40%]">Estimate Time</div>
                                <div className=" flex items-center justify-start font-medium text-[#252525] text-base ">
                                   Empty
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-[#252525] font-medium text-xl w-[40%]">Issue Priority </div>
                                <div className=" flex items-center justify-start gap-10">
                                   <Select>
                                    <SelectTrigger>slkfdjl</SelectTrigger>
                                   </Select>
                                   <div className="flex items-center gap-5">
                                    <span>Status</span>
                                    <Select>
                                        <SelectTrigger>lsdkjl</SelectTrigger>
                                    </Select>
                                   </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="text-[#252525] font-medium text-xl ">Description</div>
                                <Textarea className="border border-gray-400 rounded-lg" />
                            </div>
                        </div>
                        <div className="py-5">
                            <div className="flex items-center justify-between">
                                <span className=" font-medium text-xl">Subtask</span>
                                <div className="flex items-center justify-center">
                                <Plus />
                                    <span className="text-[#666666] text-sm font-medium">Add SubTask</span>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col p-5">
                        {/* right side content header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                {
                                    tabs.map((tab) => (
                                        <div className={`${activeTab === tab.value ? "border-b-2 border-[#EB7500]" : "border-b-2 border-transparent"} text-[#333333] font-medium text-xl cursor-pointer pb-1`} onClick={() => setActiveTab(tab.value)}>{tab?.label}</div>
                                    ))
                                }
                            </div>
                            <div className=" flex items-center cursor-pointer">
                                <Maximize2 />
                            </div>
                        </div>
                        {
                            activeTab==="comments" && (
                                <div className="p-5">
                                    <div className="w-full px-3 py-2 border border-gray-300 rounded-full flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className=" bg-[#67909B] flex items-center justify-center p-2 rounded-full text-white cursor-pointer">
                                            <Paperclip  className="w-3 h-3"/>
                                            </div>
                                            <div className=" bg-[#67909B] flex items-center justify-center p-2 rounded-full text-white cursor-pointer">
                                            <Smile  className="w-3 h-3"/>
                                            </div>
                                        </div>
                                        <div className=" bg-[#67909B] flex items-center justify-center p-2 rounded-full text-white cursor-pointer">
                                            <Send  className="w-3 h-3"/>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
