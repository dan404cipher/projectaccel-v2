import { useState, useEffect, useRef } from "react";
import { Search, Plus, MoreHorizontal, ArrowUpDown, Edit, Trash2, UserX, UserCheck, Eye, Copy, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import StatsCard from "@/components/dashboard/StatsCard";
import { CustomTable } from "@/components/dashboard/CustomTable";
import AddNewUser from "@/components/model/AddNewUser";
import RolesPermissions from "@/components/RolesPermissions";
import ActionOptions from "@/components/ActionOptions";
import api from "@/api/axios";
import toast from "react-hot-toast";

// User management component

const UserManagement: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
    const [users, setUsers] = useState<any[]>([]);
    const [userStats, setUserStats] = useState({
        totalUsers: 0,
        invited: 0,
        deactivated: 0,
        active: 0,
        inactive: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fetch users and stats on component mount
    useEffect(() => {
        fetchUsers();
        fetchUserStats();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Use the workspace users endpoint
            const response = await api.get('/users', {
                params: {
                    limit: 100
                }
            });

            if (response.data.success) {
                const userData = response.data.data.users || response.data.data;
                setUsers(userData);
            } else {
                setError('Failed to fetch users');
            }
        } catch (err: any) {
            console.error('Error fetching users:', err);
            setError(err.response?.data?.message || 'Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserStats = async () => {
        try {
            const response = await api.get('/users/stats');
            console.log('User stats API response:', response.data);
            
            if (response.data.success) {
                const stats = response.data.data.stats;
                console.log('Stats data:', stats);
                setUserStats({
                    totalUsers: stats.totalUsers || 0,
                    active: stats.usersByStatus?.active || 0,
                    inactive: 0, // Not provided by API, will be calculated
                    invited: stats.usersByStatus?.invited || 0,
                    deactivated: stats.usersByStatus?.suspended || 0
                });
            }
        } catch (err: any) {
            console.error('Error fetching user stats:', err);
            // Fallback to calculating from user data if stats endpoint fails
            const stats = {
                totalUsers: users.length,
                active: users.filter((user: any) => user.isActive).length,
                inactive: users.filter((user: any) => !user.isActive).length,
                invited: users.filter((user: any) => user.workspaces?.some((ws: any) => ws.status === 'invited')).length,
                deactivated: 0
            };
            setUserStats(stats);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
                return "bg-green-100 text-green-800 border-green-200";
            case "Invited":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Deactivated":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    // Handler functions for dropdown actions
    const handleViewUser = (user: any) => {
        toast.success(`Viewing details for ${user.name}`);
        // TODO: Implement view user modal or navigation
    };

    const handleEditUser = (user: any) => {
        toast.success(`Editing user ${user.name}`);
        // TODO: Implement edit user modal
    };

    const handleToggleUserStatus = async (user: any) => {
        try {
            const newStatus = !user.isActive;
            await api.put(`/users/${user.id}`, {
                isActive: newStatus
            });
            
            // Update local state
            setUsers(prevUsers => 
                prevUsers.map(u => 
                    u.id === user.id ? { ...u, isActive: newStatus } : u
                )
            );
            
            toast.success(`User ${newStatus ? 'activated' : 'deactivated'} successfully`);
        } catch (error) {
            console.error('Error toggling user status:', error);
            toast.error('Failed to update user status');
        }
    };

    const handleDeleteUser = async (user: any) => {
        if (window.confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
            try {
                await api.delete(`/users/${user.id}`);
                
                // Update local state
                setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
                
                toast.success('User deleted successfully');
            } catch (error) {
                console.error('Error deleting user:', error);
                toast.error('Failed to delete user');
            }
        }
    };

    // New handler functions for ActionOptions dropdown
    const handleCopyEmail = async (user: any) => {
        try {
            await navigator.clipboard.writeText(user.email);
            toast.success('Email copied to clipboard');
        } catch (error) {
            console.error('Error copying email:', error);
            toast.error('Failed to copy email');
        }
    };

    const handleMessage = (user: any) => {
        // For now, just show a toast - you can implement actual messaging later
        toast.success(`Opening message to ${user.name}`);
    };

    const toggleDropdown = (userId: string) => {
        setOpenDropdownId(openDropdownId === userId ? null : userId);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdownId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Define columns for CustomTable
    const columns = [
        {
            accessor: "empId",
            header: "EMP-ID",
            render: (value: string, row: any) => (
                <div className="flex items-center gap-3">
                    <Avatar className="w-6 h-6">
                        <AvatarImage src={row.profilePicture} alt={row.name} />
                        <AvatarFallback className="text-xs">{row.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-[#252525]">{row.empId || 'N/A'}</span>
                </div>
            )
        },
        {
            accessor: "name",
            header: "Emp name",
            render: (value: string, row: any) => (
                <div>
                    <div className="text-sm font-medium text-[#252525]">{row.name}</div>
                    <div className="text-xs text-[#666666]">{row.email}</div>
                </div>
            )
        },
        {
            accessor: "designation",
            header: "Designation",
            render: (value: string, row: any) => (
                <span className="text-sm text-[#252525]">{row.designation || 'N/A'}</span>
            )
        },
        {
            accessor: "status",
            header: "Status",
            render: (value: string, row: any) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(row.isActive ? 'Active' : 'Inactive')}`}>
                    {row.isActive ? 'Active' : 'Inactive'}
                </span>
            )
        },
        {
            accessor: "permissionLevel",
            header: "Permission Level",
            render: (value: string, row: any) => (
                <span className="text-sm text-[#252525]">
                    {row.role ? row.role.name : 'N/A'}
                </span>
            )
        },
        {
            accessor: "lastActive",
            header: "Last Active",
            render: (value: string, row: any) => (
                <span className="text-sm text-[#666666]">
                    {row.lastLogin ? new Date(row.lastLogin).toLocaleDateString() : 'Never'}
                </span>
            )
        },
        {
            accessor: "actions",
            header: "Actions",
            render: (value: string, row: any) => (
                <div className="flex items-center justify-end relative" ref={dropdownRef}>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => toggleDropdown(row.id)}
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    {openDropdownId === row.id && (
                        <div className="absolute top-8 right-0 z-50">
                            <ActionOptions
                                onEdit={() => {
                                    handleEditUser(row);
                                    setOpenDropdownId(null);
                                }}
                                onCopyEmail={() => {
                                    handleCopyEmail(row);
                                    setOpenDropdownId(null);
                                }}
                                onMessage={() => {
                                    handleMessage(row);
                                    setOpenDropdownId(null);
                                }}
                                onDelete={() => {
                                    handleDeleteUser(row);
                                    setOpenDropdownId(null);
                                }}
                            />
                        </div>
                    )}
                </div>
            )
        }
    ];

    return (
        <div className="p-6 bg-gray-50">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-2">
                    <Button 
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === 'users' 
                                ? 'bg-[#67909b] hover:bg-[#5a7a85] text-white' 
                                : 'bg-transparent text-[#666666] hover:bg-gray-200'
                        }`}
                        onClick={() => setActiveTab('users')}
                    >
                        User management
                    </Button>
                    <Button 
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === 'roles' 
                                ? 'bg-[#67909b] hover:bg-[#5a7a85] text-white' 
                                : 'bg-transparent text-[#666666] hover:bg-gray-200'
                        }`}
                        onClick={() => setActiveTab('roles')}
                    >
                        Roles & permissions
                    </Button>
                </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'users' && (
                <>
                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatsCard 
                            title="Total Users" 
                            value={userStats.totalUsers} 
                            subtitle="lorem ipsum" 
                        />
                        <StatsCard 
                            title="Invited" 
                            value={userStats.invited} 
                            subtitle="lorem ipsum" 
                        />
                        <StatsCard 
                            title="Deactivated" 
                            value={userStats.deactivated} 
                            subtitle="lorem ipsum" 
                        />
                        <StatsCard 
                            title="Active" 
                            value={userStats.active} 
                            subtitle="lorem ipsum" 
                        />
                    </div>

                    {/* User Table */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 ">
                        {/* Table Header */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-semibold text-[#252525]">User management</h2>
                                    <p className="text-[#666666] text-sm">Manage user accounts and permissions</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            placeholder="Search users..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10 w-64"
                                        />
                                    </div>
                                    <Button 
                                        className="bg-[#67909b] hover:bg-[#5a7a85] text-white"
                                        onClick={() => setIsAddUserModalOpen(true)}
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add user
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        {loading ? (
                            <div className="p-8 text-center">
                                <div className="text-gray-500">Loading users...</div>
                            </div>
                        ) : error ? (
                            <div className="p-8 text-center">
                                <div className="text-red-500 mb-4">Error: {error}</div>
                                <Button onClick={fetchUsers} variant="outline">
                                    Retry
                                </Button>
                            </div>
                        ) : users.length === 0 ? (
                            <div className="p-8 text-center">
                                <div className="text-gray-500 mb-4">No users found</div>
                                <Button onClick={() => setIsAddUserModalOpen(true)} className="bg-[#67909b] hover:bg-[#5a7a85] text-white">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add First User
                                </Button>
                            </div>
                        ) : (
                            <CustomTable 
                                data={users} 
                                columns={columns} 
                                selectable={true}
                                className="bg-white"
                            />
                        )}
                    </div>
                </>
            )}

            {/* Roles & Permissions Tab */}
            {activeTab === 'roles' && (
                <RolesPermissions />
            )}

            {/* Add New User Modal */}
            <AddNewUser
                isOpen={isAddUserModalOpen}
                onClose={() => setIsAddUserModalOpen(false)}
                onSubmit={async (userData) => {
                    try {
                        setLoading(true);
                        const response = await api.post('/users', {
                            name: userData.name,
                            email: userData.email,
                            password: userData.password,
                            designation: userData.designation,
                            yearsOfExperience: userData.yearsOfExperience,
                            roleId: userData.roleId,
                            sendInvite: false
                        });

                        if (response.data.success) {
                            // Refresh the user list
                            await fetchUsers();
                            setIsAddUserModalOpen(false);
                            toast.success('User created successfully!');
                        } else {
                            toast.error(response.data.message || 'Failed to create user');
                        }
                    } catch (error: any) {
                        console.error('Error creating user:', error);
                        const errorMessage = error.response?.data?.message || 'An error occurred while creating the user';
                        toast.error(errorMessage);
                    } finally {
                        setLoading(false);
                    }
                }}
            />
        </div>
    );
};

export default UserManagement;