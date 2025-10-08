import { CalendarDays, Ellipsis, Eye, Maximize2, Paperclip, Plus, Send, Share2, Smile, X, ChevronDown, Search, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


// Mock team members data
const teamMembers = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@company.com',
        avatar: '/src/assets/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png',
        role: 'Frontend Developer'
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        avatar: '/src/assets/icons/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png',
        role: 'Backend Developer'
    },
    {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike.johnson@company.com',
        avatar: '/src/assets/icons/27329e3b78d83b20619fddee55560c05c2cd1469.png',
        role: 'UI/UX Designer'
    },
    {
        id: '4',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@company.com',
        avatar: '/src/assets/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png',
        role: 'Project Manager'
    },
    {
        id: '5',
        name: 'David Brown',
        email: 'david.brown@company.com',
        avatar: '/src/assets/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png',
        role: 'QA Engineer'
    }
];

interface AddTaskProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateIssue: (issueData: any) => void;
}

export const AddTask = ({ isOpen, onClose, onCreateIssue }: AddTaskProps) => {
    const [formData, setFormData] = useState({
        issueType: 'task',
        priority: 'medium',
        status: 'backlog', // Default to backlog for new issues
        title: '',
        startDate: '',
        dueDate: '',
        estimate: '',
        assignee: '',
        description: ''
    });

    const [isMemberDropdownOpen, setIsMemberDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMembers, setSelectedMembers] = useState<any[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        
        const issueData = {
            type: formData.issueType,
            title: formData.title,
            description: formData.description,
            assignees: selectedMembers.map(member => member.avatar),
            moreCount: selectedMembers.length,
            status: formData.status,
            priority: formData.priority,
            dueDate: formData.dueDate,
            storyPoints: parseInt(formData.estimate) || 1,
            labels: [],
        };
        console.log('Sending issue data to parent:', issueData);
        onCreateIssue(issueData);
        
        // Reset form
        setFormData({
            issueType: 'task',
            priority: 'medium',
            status: 'backlog',
            title: '',
            startDate: '',
            dueDate: '',
            estimate: '',
            assignee: '',
            description: ''
        });
        setSelectedMembers([]);
        
        onClose();
    };

    const filteredMembers = teamMembers.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleMemberSelect = (member: any) => {
        if (!selectedMembers.find(m => m.id === member.id)) {
            setSelectedMembers(prev => [...prev, member]);
        }
        setSearchQuery('');
        setIsMemberDropdownOpen(false);
    };

    const handleMemberRemove = (memberId: string) => {
        setSelectedMembers(prev => prev.filter(m => m.id !== memberId));
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsMemberDropdownOpen(false);
            }
        };

        if (isMemberDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMemberDropdownOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-[90%] max-w-[900px] h-[90%] max-h-[800px] rounded-[24px] font-roboto flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-[#E8E8E8]">
                    <h2 className="text-[#438197] text-xl font-semibold">Create Issue</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Information */}
                        <div className="space-y-6">
                            <h3 className="text-[#52555C] text-lg font-medium">Basic Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Issue Type */}
                                <div className="space-y-2">
                                    <label className="text-[#6C7380] text-base font-medium">Issue Type</label>
                                    <Select value={formData.issueType} onValueChange={(value) => handleInputChange('issueType', value)}>
                                        <SelectTrigger className="h-11 border-[#999999] rounded-lg">
                                            <SelectValue placeholder="Select Issue Type" />
                                        </SelectTrigger>
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

                                {/* Priority */}
                                <div className="space-y-2">
                                    <label className="text-[#6C7380] text-base font-medium">Priority</label>
                                    <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                                        <SelectTrigger className="h-11 border-[#999999] rounded-lg">
                                            <SelectValue placeholder="Select Priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">
                                                <div className="flex items-center gap-2">
                                                    Low
                            </div>
                                            </SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Status */}
                                <div className="space-y-2">
                                    <label className="text-[#6C7380] text-base font-medium">Status</label>
                                    <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                                        <SelectTrigger className="h-11 border-[#999999] rounded-lg">
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="backlog">Backlog</SelectItem>
                                            <SelectItem value="todo">Todo</SelectItem>
                                            <SelectItem value="in-progress">In Progress</SelectItem>
                                            <SelectItem value="done">Done</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Title */}
                            <div className="space-y-2">
                                <label className="text-[#656d7a] text-base font-medium">Title *</label>
                                <Input 
                                    type="text" 
                                    placeholder="Enter a clear, descriptive title for your task"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    className="h-11 border-[#777777] rounded-lg"
                                    required
                                />
                            </div>
                        </div>

                        {/* Timeline & Resources */}
                        <div className="space-y-6">
                            <h3 className="text-[#53555d] text-lg font-medium">Timeline & Resources</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Start Date */}
                                <div className="space-y-2">
                                    <label className="text-[#5f6775] text-base font-medium">Start Date</label>
                                    <div className="relative">
                                        <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#666666] z-10" />
                                        <Input 
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => handleInputChange('startDate', e.target.value)}
                                            className="h-11 border-[#777777] rounded-lg pl-12 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                        />
                                    </div>
                                </div>

                                {/* Due Date */}
                                <div className="space-y-2">
                                    <label className="text-[#5c6472] text-base font-medium">Due Date</label>
                                    <div className="relative">
                                        <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#666666] z-10" />
                                        <Input 
                                            type="date"
                                            value={formData.dueDate}
                                            onChange={(e) => handleInputChange('dueDate', e.target.value)}
                                            className="h-11 border-[#777777] rounded-lg pl-12 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                        />
                            </div>
                        </div>

                                {/* Estimate */}
                                <div className="space-y-2">
                                    <label className="text-[#646c79] text-base font-medium">Estimate (Hours) *</label>
                                    <Input 
                                        type="number"
                                        placeholder="e.g., 8"
                                        value={formData.estimate}
                                        onChange={(e) => handleInputChange('estimate', e.target.value)}
                                        className="h-11 border-[#777777] rounded-lg"
                                        required
                                    />
                            </div>
                            </div>
                        </div>

                        {/* Assignment */}
                        <div className="space-y-6">
                            <h3 className="text-[#565860] text-lg font-medium">Assignment *</h3>
                            
                            <div className="relative" ref={dropdownRef}>
                                {/* Selected Members Display */}
                                {selectedMembers.length > 0 && (
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        {selectedMembers.map((member) => (
                                            <div key={member.id} className="flex items-center gap-2 bg-[#f0f5f8] rounded-lg px-3 py-2">
                                                <Avatar className="w-6 h-6">
                                                    <AvatarImage src={member.avatar} alt={member.name} />
                                                    <AvatarFallback className="text-xs">
                                                        {member.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm text-[#666666]">{member.name}</span>
                                                <button
                                                    onClick={() => handleMemberRemove(member.id)}
                                                    className="text-[#999999] hover:text-[#666666]"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Add Member Button */}
                                <div 
                                    className="h-11 border-2 border-dashed border-[#7c9fa9] rounded-lg bg-[#fefefe] flex items-center px-3 cursor-pointer hover:bg-gray-50"
                                    onClick={() => setIsMemberDropdownOpen(!isMemberDropdownOpen)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-[#67909b] rounded-lg flex items-center justify-center">
                                            <Plus className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-[#82a4ad] text-sm font-medium">Add team member</span>
                                    </div>
                                </div>

                                {/* Dropdown */}
                                {isMemberDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e5e7eb] rounded-lg shadow-lg z-50 max-h-80 overflow-hidden">
                                        {/* Search Input */}
                                        <div className="p-3 border-b border-[#e5e7eb]">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#999999]" />
                                                <Input
                                                    type="text"
                                                    placeholder="Search team members..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="pl-10 h-9 border-[#e5e7eb] rounded-lg"
                                                />
                                            </div>
                                        </div>

                                        {/* Members List */}
                                        <div className="max-h-60 overflow-y-auto">
                                            {filteredMembers.length > 0 ? (
                                                filteredMembers.map((member) => (
                                                    <div
                                                        key={member.id}
                                                        className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-[#f5f5f5] last:border-b-0"
                                                        onClick={() => handleMemberSelect(member)}
                                                    >
                                                        <Avatar className="w-10 h-10">
                                                            <AvatarImage src={member.avatar} alt={member.name} />
                                                            <AvatarFallback>
                                                                {member.name.split(' ').map(n => n[0]).join('')}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-sm font-medium text-[#252525] truncate">
                                                                {member.name}
                                                            </div>
                                                            <div className="text-xs text-[#666666] truncate">
                                                                {member.email}
                                                            </div>
                                                            <div className="text-xs text-[#999999] truncate">
                                                                {member.role}
                                                            </div>
                                                        </div>
                                                        {selectedMembers.find(m => m.id === member.id) && (
                                                            <div className="w-5 h-5 bg-[#67909b] rounded-full flex items-center justify-center">
                                                                <X className="w-3 h-3 text-white" />
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-4 text-center text-[#999999] text-sm">
                                                    No team members found
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-6">
                            <h3 className="text-[#54575e] text-lg font-semibold">Description</h3>
                            
                            <Textarea 
                                placeholder="Provide a detailed description of the task, including requirements, acceptance criteria, and any relevant context..."
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className="min-h-[128px] border-[#7c9fa9] rounded-lg resize-none"
                            />
                                </div>
                    </form>
                    </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-4 p-8 border-t border-[#E8E8E8]">
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={onClose}
                        className="h-10 px-6 border-[#67909b] text-[#67909b] hover:bg-[#67909b] hover:text-white"
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        onClick={handleSubmit}
                        className="h-10 px-6 bg-[#67909b] hover:bg-[#5a7a85] text-white"
                    >
                        Create
                    </Button>
                </div>
            </div>
        </div>
    )
}
