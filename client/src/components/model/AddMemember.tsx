import { AddTeamMemberCard } from "@/pages/CreateProject";
import { TeamMember } from "@/store/team/teamSlice";
import { ArrowDownNarrowWide, Minus, Plus, Search, X, Check } from "lucide-react";
import { availableMembers } from "@/lib/availableMembers";
import { useState, useEffect } from "react";
const imgEllipse7 = "http://localhost:3845/assets/4415cf6b90ae6200aee0458930211f231742cfb8.png";
const imgEllipse248 = "/src/assets/icons/b1766b7062b0c67d9be111f724f646b15b02bf09.png";
const img2 = "/src/assets/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
import WarningIcon from '/src/assets/icons/warning.svg'
interface AddMemberProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateMember: (memberData: any) => void;
}

const AddMemember = ({ isOpen, onClose, onCreateMember }: AddMemberProps) => {
    const [selectedMembers, setSelectedMembers] = useState<Omit<TeamMember, 'id'>[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');

    // Filter available members based on search and role
    const filteredMembers = availableMembers.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             member.department?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesRole = filterRole === 'all' || member.role.toLowerCase() === filterRole.toLowerCase();
        
        return matchesSearch && matchesRole;
    });

    // Get unique roles for filter dropdown
    const uniqueRoles = [...new Set(availableMembers.map(member => member.role))];

    const handleMemberSelect = (member: Omit<TeamMember, 'id'>) => {
        const isSelected = selectedMembers.some(selected => selected.name === member.name);
        if (isSelected) {
            setSelectedMembers(prev => prev.filter(selected => selected.name !== member.name));
        } else {
            setSelectedMembers(prev => [...prev, member]);
        }
    };

    const handleAddSelectedMembers = () => {
        selectedMembers.forEach(member => {
            onCreateMember(member);
        });
        setSelectedMembers([]);
        setSearchTerm('');
        setFilterRole('all');
        onClose();
    };

    const handleRemoveSelectedMember = (memberName: string) => {
        setSelectedMembers(prev => prev.filter(member => member.name !== memberName));
    };

    return (
        <div className={`${isOpen ? "flex" : "hidden"} fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  z-50`}>
            <div className=" bg-white flex flex-col rounded-lg w-[80%]">
                {/* header */}
                <div className="flex items-center justify-between p-5 border-b ">
                    <div className="flex items-center gap-5">
                        <div className="text-lg font-semibold text-[#06263D]">Available Members</div>
                        <div className="w-6 h-6 overflow-hidden p-2 rounded-full bg-[#67909B] flex items-center justify-center text-white text-sm">
                            {availableMembers.length}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className=" flex items-center justify-center p-2 rounded-lg cursor-pointer" onClick={onClose}>
                            <X size={18} />
                        </div>
                    </div>
                </div>
                {/* Search and Filter Controls */}
                <div className="p-5 border-b bg-gray-50">
                    <div className="flex items-center gap-4 mb-4">
                        {/* Search Input */}
                        <div className="relative flex-1 max-w-md">
                            <input
                                type="text"
                                placeholder="Search available members..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67909b] focus:border-transparent"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>

                        {/* Role Filter */}
                        <select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67909b] focus:border-transparent"
                        >
                            <option value="all">All Roles</option>
                            {uniqueRoles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* content */}
                <div className="flex flex-col bg-[#F2F2F2] rounded-lg">
                    <div className="grid grid-cols-2 p-5 gap-5">
                        {/* Available Members List */}
                        <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-scroll">
                            <h3 className="text-lg font-semibold text-[#06263D] mb-2">Available Members ({filteredMembers.length})</h3>
                            {filteredMembers.map((member, index) => {
                                const isSelected = selectedMembers.some(selected => selected.name === member.name);
                                return (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                            isSelected 
                                                ? 'border-[#67909b] bg-[#67909b] bg-opacity-10' 
                                                : 'border-gray-200 bg-white hover:border-[#67909b] hover:bg-gray-50'
                                        }`}
                                        onClick={() => handleMemberSelect(member)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <img 
                                                    src={member.avatar} 
                                                    alt={member.name}
                                                    className="w-12 h-12 rounded-full"
                                                />
                                                {isSelected && (
                                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#67909b] rounded-full flex items-center justify-center">
                                                        <Check className="w-3 h-3 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-semibold text-[#06263D]">{member.name}</div>
                                                <div className="text-sm text-gray-600">{member.role}</div>
                                                <div className="text-xs text-gray-500">{member.department}</div>
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {member.skills.slice(0, 2).map((skill, skillIndex) => (
                                                        <span key={skillIndex} className="text-xs bg-gray-200 px-2 py-1 rounded">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                    {member.skills.length > 2 && (
                                                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                                                            +{member.skills.length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Selected Members Preview */}
                        <div className="bg-white p-5 flex flex-col gap-5 rounded-lg">
                            <div className="flex items-center gap-2">
                                <div className="text-[#06263D] font-medium text-xl">Selected Members</div>
                                <div className="bg-[#455A64] p-2 overflow-hidden w-7 h-7 text-base font-medium flex items-center justify-center text-white rounded-full">
                                    {selectedMembers.length}
                                </div>
                            </div>
                            
                            {selectedMembers.length > 0 ? (
                                <div className="flex flex-col gap-3 max-h-[40vh] overflow-y-scroll">
                                    {selectedMembers.map((member, index) => (
                                        <div key={index} className="bg-[#F9F9F9] p-4 rounded-lg flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <img src={member.avatar} className="w-10 h-10 rounded-full" />
                                                <div>
                                                    <div className="font-medium text-[#06263D]">{member.name}</div>
                                                    <div className="text-sm text-gray-600">{member.role}</div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveSelectedMember(member.name)}
                                                className="text-red-500 hover:text-red-700 p-1"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <div className="text-lg mb-2">No members selected</div>
                                    <div className="text-sm">Click on members from the left to select them</div>
                                </div>
                            )}

                            {/* Add Members Button */}
                            <div className="mt-auto pt-4 border-t">
                                <button
                                    onClick={handleAddSelectedMembers}
                                    disabled={selectedMembers.length === 0}
                                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                                        selectedMembers.length > 0
                                            ? 'bg-[#67909b] text-white hover:bg-[#5a7d87] hover:scale-105'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    Add {selectedMembers.length} Member{selectedMembers.length !== 1 ? 's' : ''} to Team
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default AddMemember;