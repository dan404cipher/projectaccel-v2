import { useState } from "react";
import { X, Eye, Share2, MoreHorizontal, ChevronDown, Calendar, Plus, CheckCircle, Bug, Link, Smile, Paperclip, Send, Download, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

// Mock data
const issueData = {
    id: "T-112",
    title: "V-Accel Website Design",
    type: "Task",
    priority: "Low",
    status: "To-do",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    assignedTo: [
        { id: "1", name: "John Doe", avatar: "/src/assets/icons/0b27a87a0c0e1b7084e0ba7d7ddb5036f96f3853.png" },
        { id: "2", name: "Jane Smith", avatar: "/src/assets/icons/93b944d3ca02967067616476681ede013184432a.png" },
        { id: "3", name: "Mike Johnson", avatar: "/src/assets/icons/83b47bff1213d888c75e6013ef23c6956943fff7.png" },
        { id: "4", name: "Sarah Wilson", avatar: "/src/assets/icons/83dd456a91015765eea885f7a86972e654aead0d.png" }
    ],
    startDate: "Sep 24 2025",
    dueDate: "Sep 24 2025",
    estimateTime: "08:30h",
    timeSpent: "00:00 hr",
    createdBy: {
        name: "Krishna Kumar",
        avatar: "/src/assets/icons/2993e5ee38ebc944946e4b1ff106d9515024fa96.png",
        date: "Sep 24 2025 at 10:30 AM"
    },
    views: 6,
    subtasks: [
        { id: "BG-117", title: "Publish blog page", status: "To-do", priority: "Low", assignees: 4, dueDate: "Oct 1" },
        { id: "BG-118", title: "Update navigation", status: "To-do", priority: "Low", assignees: 4, dueDate: "Oct 1" },
        { id: "BG-119", title: "Fix responsive layout", status: "To-do", priority: "Low", assignees: 4, dueDate: "Oct 1" }
    ]
};

const activities = [
    {
        id: "1",
        user: { name: "Kate", avatar: "/src/assets/icons/0d32b7915459a314fe4f2a3fc3bccdffd08cd851.png" },
        action: "Moved task card Login Auth Todo > In progress",
        timestamp: "Sep 24 2025 at 10:30 AM"
    },
    {
        id: "2",
        user: { name: "Kate", avatar: "/src/assets/icons/0d32b7915459a314fe4f2a3fc3bccdffd08cd851.png" },
        action: "Moved task card Login Auth Todo > In progress",
        timestamp: "Sep 24 2025 at 10:30 AM"
    },
    {
        id: "3",
        user: { name: "Kate", avatar: "/src/assets/icons/0d32b7915459a314fe4f2a3fc3bccdffd08cd851.png" },
        action: "Moved task card Login Auth Todo > In progress",
        timestamp: "Sep 24 2025 at 10:30 AM"
    },
    {
        id: "4",
        user: { name: "Kate", avatar: "/src/assets/icons/0d32b7915459a314fe4f2a3fc3bccdffd08cd851.png" },
        action: "Moved task card Login Auth Todo > In progress",
        timestamp: "Sep 24 2025 at 10:30 AM"
    }
];

const comments = [
    {
        id: "1",
        user: { name: "Kate", avatar: "/src/assets/icons/0d32b7915459a314fe4f2a3fc3bccdffd08cd851.png" },
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit...",
        timestamp: "6 mins ago",
        attachments: [
            { id: "1", name: "image1.jpg", url: "/src/assets/icons/7630444af2c4dc476f1a7002b98ab14086708cb7.png" },
            { id: "2", name: "image2.jpg", url: "/src/assets/icons/5bb8cf0e61d82104623806f714f2680f4e74b302.png" },
            { id: "3", name: "image3.jpg", url: "/src/assets/icons/dad598b3fa4191fe2806d34d30a3b7526a1bf59f.png" },
            { id: "4", name: "+3 more", url: "/src/assets/icons/05094f616ad998e420cdd27011bd380d4b4e313a.png" }
        ]
    },
    {
        id: "2",
        user: { name: "Kate", avatar: "/src/assets/icons/223e4dab81ad1eaa51f5bef48a6c40402dde2364.png" },
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit..Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit....",
        timestamp: "6 mins ago"
    },
    {
        id: "3",
        user: { name: "Kate", avatar: "/src/assets/icons/631707b29978069f46d6f3ed1dbc83b3f656ff1f.png" },
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit...",
        timestamp: "6 mins ago"
    }
];

const attachments = [
    { 
        id: "1", 
        name: "Wireframe UI Kit.zip", 
        size: "5.8 MB", 
        type: "Archive", 
        date: "Uploaded on 15.09.2025 at 11:45",
        preview: "/src/assets/icons/7630444af2c4dc476f1a7002b98ab14086708cb7.png"
    },
    { 
        id: "2", 
        name: "Picture 01.png", 
        size: "1.2MB", 
        type: "Image", 
        date: "Uploaded on 15.09.2025 at 11:45",
        preview: "/src/assets/icons/5bb8cf0e61d82104623806f714f2680f4e74b302.png"
    },
    { 
        id: "3", 
        name: "Picture 01.png", 
        size: "1.2MB", 
        type: "Image", 
        date: "Uploaded on 15.09.2025 at 11:45",
        preview: "/src/assets/icons/dad598b3fa4191fe2806d34d30a3b7526a1bf59f.png"
    }
];

interface ViewIssueProps {
    isOpen: boolean;
    onClose: () => void;
}

const ViewIssue: React.FC<ViewIssueProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState("comments");
    const [newComment, setNewComment] = useState("");

    if (!isOpen) return null;

    const handleSubmitComment = () => {
        if (newComment.trim()) {
            console.log("New comment:", newComment);
            setNewComment("");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-[90%] max-w-[1385px] h-[90%] max-h-[984px] rounded-[24px] font-roboto flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5e7eb]">
                    <div className="flex items-center gap-10">
                        <h1 className="text-[#438197] text-xl font-semibold">Issue detail</h1>
                        <span className="text-[#666666] text-base">Project / PJ-2 / EP-1 / T-112</span>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="text-right">
                                <div className="text-[#252525] text-sm font-medium">Krishna Kumar</div>
                                <div className="text-[#999999] text-xs">Issue Created on Sep 24 2025 at 10:30 AM</div>
                            </div>
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={issueData.createdBy.avatar} alt={issueData.createdBy.name} />
                                <AvatarFallback>KK</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Eye className="w-6 h-6 text-[#333333]" />
                                <span className="text-[#333333] text-xl font-semibold">6</span>
                            </div>
                            <Share2 className="w-6 h-6 text-[#333333]" />
                            <MoreHorizontal className="w-6 h-6 text-[#333333]" />
                            <Button variant="ghost" size="sm" onClick={onClose} className="p-0">
                                <X className="w-6 h-6 text-[#333333]" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Left Content */}
                    <div className="flex-1 p-8 overflow-y-auto">
                        {/* Issue Type */}
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-[#252525] text-xl font-medium">Issue type</span>
                            <div className="flex items-center gap-1">
                                <div className="bg-[rgba(138,150,247,0.2)] px-4 py-2 rounded text-[#8a96f7] text-sm font-medium">
                                    {issueData.type}
                                </div>
                                <ChevronDown className="w-6 h-6 text-[#666666]" />
                            </div>
                        </div>

                        {/* Issue Title */}
                        <h2 className="text-[#438197] text-2xl font-medium mb-8">{issueData.title}</h2>

                        {/* Issue Details */}
                        <div className="space-y-6 mb-8">
                            {/* Assigned To */}
                            <div className="flex items-center gap-4">
                                <span className="text-[#252525] text-xl font-medium w-40">Assigned to</span>
                                <div className="flex items-center gap-2">
                                    {issueData.assignedTo.map((member) => (
                                        <Avatar key={member.id} className="w-8 h-8 -mr-4 border-2 border-white">
                                            <AvatarImage src={member.avatar} alt={member.name} />
                                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                    ))}
                                    <Button size="sm" className="w-8 h-8 p-0 bg-[#67909b] hover:bg-[#5a7a85]">
                                        <Plus className="w-4 h-4 text-white" />
                                    </Button>
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="flex items-center gap-4">
                                <span className="text-[#252525] text-xl font-medium w-40">Dates</span>
                                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                                    <Calendar className="w-6 h-6 text-[#252525]" />
                                    <span className="text-[#252525] text-base font-medium">{issueData.startDate}</span>
                                    <ChevronDown className="w-6 h-6 text-[#252525] rotate-[-90deg]" />
                                    <span className="text-[#252525] text-base font-medium">{issueData.dueDate}</span>
                                </div>
                            </div>

                            {/* Estimate Time */}
                            <div className="flex items-center gap-4">
                                <span className="text-[#252525] text-xl font-medium w-40">Estimate Time</span>
                                <div className="bg-gray-50 px-4 py-2 rounded-full">
                                    <span className="text-[#252525] text-base font-medium">{issueData.estimateTime}</span>
                                </div>
                            </div>

                            {/* Time Spent */}
                            <div className="flex items-center gap-4">
                                <span className="text-[#252525] text-xl font-medium w-40">Time spend</span>
                                <div className="bg-gray-50 px-4 py-2 rounded-full">
                                    <span className="text-[#252525] text-base font-medium">{issueData.timeSpent}</span>
                                </div>
                            </div>

                            {/* Priority and Status */}
                            <div className="flex items-center gap-16">
                                <div className="flex items-center gap-4">
                                    <span className="text-[#252525] text-xl font-medium w-40">Issue Priority</span>
                                    <div className="flex items-center gap-1">
                                        <div className="bg-[rgba(223,168,116,0.2)] px-4 py-2 rounded text-[#d58d49] text-sm font-medium">
                                            {issueData.priority}
                                        </div>
                                        <ChevronDown className="w-6 h-6 text-[#666666]" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[#252525] text-xl font-medium w-20">Status</span>
                                    <div className="flex items-center gap-1">
                                        <div className="bg-[rgba(138,150,247,0.2)] px-4 py-2 rounded text-[#8a96f7] text-sm font-medium">
                                            {issueData.status}
                                        </div>
                                        <ChevronDown className="w-6 h-6 text-[#666666]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="text-[#252525] text-xl font-medium mb-4">Description</h3>
                            <p className="text-[#666666] text-base leading-6">{issueData.description}</p>
                        </div>

                        {/* Subtasks */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <Plus className="w-6 h-6 text-[#666666]" />
                                <span className="text-[#666666] text-sm font-medium">Add Subtask</span>
                            </div>
                            <div className="space-y-4">
                                {issueData.subtasks.map((subtask) => (
                                    <div key={subtask.id} className="flex items-center gap-3 p-4 border border-[#e5e7eb] rounded-lg">
                                        <CheckCircle className="w-6 h-6 text-[#666666]" />
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-[#263238] rounded-full flex items-center justify-center">
                                                <Bug className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-[#666666] text-xs">{subtask.id}</span>
                                        </div>
                                        <span className="text-[#252525] text-base font-medium flex-1">{subtask.title}</span>
                                        <div className="flex items-center gap-8">
                                            <div className="flex items-center gap-2">
                                                <Link className="w-4 h-4 text-[#06263d]" />
                                                <span className="text-[#06263d] text-sm font-medium">2</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {Array.from({ length: subtask.assignees }).map((_, i) => (
                                                    <Avatar key={i} className="w-6 h-6 -mr-2 border-2 border-white">
                                                        <AvatarFallback className="text-xs">U{i + 1}</AvatarFallback>
                                                    </Avatar>
                                                ))}
                                            </div>
                                            <div className="bg-[rgba(138,150,247,0.2)] px-3 py-1 rounded text-[#8a96f7] text-sm font-medium">
                                                {subtask.status}
                                            </div>
                                            <div className="bg-[rgba(223,168,116,0.2)] px-3 py-1 rounded text-[#d58d49] text-sm font-medium">
                                                {subtask.priority}
                                            </div>
                                            <span className="text-[#e52828] text-base font-medium">{subtask.dueDate}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Tabs */}
                    <div className="w-[652px] border-l border-[#e5e7eb] flex flex-col">
                        {/* Tab Headers */}
                        <div className="flex items-center border-b border-[#e5e7eb]">
                            <button
                                onClick={() => setActiveTab("comments")}
                                className={`px-6 py-4 text-xl font-medium transition-colors ${
                                    activeTab === "comments" 
                                        ? "text-[#333333] border-b-2 border-[#EB7500]" 
                                        : "text-[#999999] hover:text-[#333333]"
                                }`}
                            >
                                Comment
                            </button>
                            <button
                                onClick={() => setActiveTab("attachments")}
                                className={`px-6 py-4 text-xl font-medium transition-colors ${
                                    activeTab === "attachments" 
                                        ? "text-[#333333] border-b-2 border-[#EB7500]" 
                                        : "text-[#999999] hover:text-[#333333]"
                                }`}
                            >
                                Attachment
                            </button>
                        </div>

                        {/* Tab Content Container */}
                        <div className="flex-1 flex flex-col min-h-0">
                            {/* Comments Tab Content */}
                            {activeTab === "comments" && (
                                <div className="flex-1 flex flex-col h-full">
                                    {/* Comment Input at Top */}
                                    <div className="p-6 flex-shrink-0">
                                        <div className="flex items-center gap-4 px-4 py-1 border border-[#999999] rounded-full">
                                            <div className="flex items-center gap-2">
                                                <Button size="sm" variant="ghost" className="w-8 h-8 p-0 bg-[#67909B] rounded-full text-white">
                                                    <Paperclip className="w-4 h-4 text-white" />
                                                </Button>
                                                <Button size="sm" variant="ghost" className="w-8 h-8 p-0 bg-[#67909B] text-white rounded-full">
                                                    <Smile className="w-4 h-4 text-white" />
                                                </Button>
                                            </div>
                                            <Input
                                                placeholder="Add your comment..."
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                                className="border-0 focus-visible:ring-0 text-[#999999] bg-white focus:outline-none focus:shadow-none"
                                            />
                                            <Button size="sm" variant="ghost" className="w-12 h-8 p-0  bg-[#67909B] rounded-full cursor-pointer" onClick={handleSubmitComment}>
                                                <Send className="w-4 h-4 text-white" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Comments Section - 40% height */}
                                    <div className="flex-[0.4] overflow-y-auto p-6 border-b border-[#e5e7eb] min-h-0">
                                        <div className="space-y-6">
                                            {comments.map((comment) => (
                                                <div key={comment.id} className="flex items-start gap-4">
                                                    <Avatar className="w-10 h-10">
                                                        <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                                                        <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-[#252525] text-base font-medium">{comment.user.name}</span>
                                                            <span className="text-[#999999] text-xs">{comment.timestamp}</span>
                                                        </div>
                                                        <p className="text-[#666666] text-sm leading-5 mb-3">{comment.content}</p>
                                                        {comment.attachments && (
                                                            <div className="flex items-center gap-2">
                                                                {comment.attachments.map((attachment) => (
                                                                    <div key={attachment.id} className="relative">
                                                                        <img 
                                                                            src={attachment.url} 
                                                                            alt={attachment.name}
                                                                            className="w-16 h-16 rounded-lg object-cover"
                                                                        />
                                                                        {attachment.name.startsWith('+') && (
                                                                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                                                                                <span className="text-white text-sm font-medium">{attachment.name}</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Activity Section - 60% height */}
                                    <div className="flex-[0.6] overflow-y-auto p-6 min-h-0">
                                        <h3 className="text-[#333333] text-xl font-medium mb-6">Activity</h3>
                                        <div className="space-y-6">
                                            {activities.map((activity) => (
                                                <div key={activity.id} className="flex items-start gap-4">
                                                    <Avatar className="w-10 h-10">
                                                        <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                                                        <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-4 mb-1">
                                                            <span className="text-[#252525] text-base font-medium">{activity.user.name}</span>
                                                            <span className="text-[#999999] text-xs">{activity.timestamp}</span>
                                                        </div>
                                                        <p className="text-[#666666] text-base leading-5">{activity.action}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Attachments Tab Content */}
                            {activeTab === "attachments" && (
                                <div className="flex-1 flex flex-col h-full">
                                    {/* Attachments Section - 40% height */}
                                    <div className="flex-[0.4] overflow-y-auto p-6 border-b border-[#e5e7eb] min-h-0">
                                        <div className="space-y-4">
                                            {attachments.map((attachment) => (
                                                <div key={attachment.id} className="flex items-center gap-4 p-4 border border-[#e5e7eb] rounded-lg">
                                                    {/* File Preview */}
                                                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                                        <img 
                                                            src={attachment.preview} 
                                                            alt={attachment.name}
                                                            className="w-full h-full object-cover rounded-lg"
                                                        />
                                                    </div>
                                                    
                                                    {/* File Info */}
                                                    <div className="flex-1">
                                                        <div className="text-[#252525] text-base font-medium mb-1">{attachment.name}</div>
                                                        <div className="text-[#666666] text-sm mb-1">{attachment.date}</div>
                                                        <div className="text-[#666666] text-sm">{attachment.size}</div>
                                                    </div>
                                                    
                                                    {/* Action Buttons */}
                                                    <div className="flex items-center gap-2">
                                                        <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                                                            <Download className="w-4 h-4 text-[#666666]" />
                                                        </Button>
                                                        <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                                                            <Trash2 className="w-4 h-4 text-[#666666]" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Activity Section - 60% height */}
                                    <div className="flex-[0.6] overflow-y-auto p-6 min-h-0">
                                        <h3 className="text-[#333333] text-xl font-medium mb-6">Activity</h3>
                                        <div className="space-y-6">
                                            {activities.map((activity) => (
                                                <div key={activity.id} className="flex items-start gap-4">
                                                    <Avatar className="w-10 h-10">
                                                        <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                                                        <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-4 mb-1">
                                                            <span className="text-[#252525] text-base font-medium">{activity.user.name}</span>
                                                            <span className="text-[#999999] text-xs">{activity.timestamp}</span>
                                                        </div>
                                                        <p className="text-[#666666] text-base leading-5">{activity.action}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Work Log - Always visible at bottom */}
                        <div className="p-6 border-t border-[#e5e7eb] bg-white flex-shrink-0">
                            <h3 className="text-[#333333] text-xl font-medium mb-2">Work log</h3>
                            <p className="text-[#252525] text-sm leading-5">
                                <span className="text-[#438197] font-semibold">Not yet started</span> - Move to In Progress to begin tracking
                            </p>
                            <p className="text-[#252525] text-sm">Working hours (10 AM - 7 PM) weekdays only</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewIssue;
