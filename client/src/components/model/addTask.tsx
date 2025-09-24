import { CalendarDays, Ellipsis, Eye, Maximize2, Paperclip, Plus, Send, Share2, Smile, X } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

const img2 = "/src/assets/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";

export const AddTask = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [activeTab, setActiveTab] = useState<'comments' | 'attachment'>('comments');

    const tabs: { label: string; value: 'comments' | 'attachment' }[] = [
        { label: 'Comments', value: 'comments' },
        { label: 'Attachment', value: 'attachment' },
    ]
    return (
        <div className={`${isOpen ? "flex" : "hidden"} fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  z-50`}>
            <div className="bg-white w-[80%] lg:w-[50%] h-[90%] rounded-xl font-roboto flex flex-col p-5">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#E8E8E8] pb-3">
                    <div className="text-[#438197] text-xl font-semibold">Create Issue</div>
                    <div>
                        <X/>
                    </div>
                </div>
                {/* content */}
                <div className="flex flex-col gap-5 py-3 overflow-y-scroll">
                    <div className="text-[#52555C] text-lg font-medium">
                        Basic Information
                    </div>
                    <form className="flex flex-col gap-2">
                        <div className="grid grid-cols-8 gap-5">
                            <div className="flex flex-col gap-1 col-span-4">
                                <label className="text-base text-[#6C7380] font-normal">Issue Type</label>
                                <Select>
                                    <SelectTrigger>Select Issue Type</SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="epic">Epic</SelectItem>
                                        <SelectItem value="story">Story</SelectItem>
                                        <SelectItem value="task">Task</SelectItem>
                                        <SelectItem value="bug">Bug</SelectItem>
                                        <SelectItem value="feature">Feature</SelectItem>
                                        <SelectItem value="enhancement">Enhancement</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-1 col-span-2">
                                <label className="text-base text-[#6C7380] font-normal">Priority</label>
                                <Select>
                                    <SelectTrigger>Select Priority Type</SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-1 col-span-2">
                                <label className="text-base text-[#6C7380] font-normal">Status</label>
                                <Select>
                                    <SelectTrigger>Select Status Type</SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="todo">Todo</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <span>Title *</span>
                            <Input type="text" placeholder="Enter a clear, descriptive title for your task"/>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}
