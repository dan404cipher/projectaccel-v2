import { useState } from "react";
import { Search, Plus, MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import StatsCard from "@/components/dashboard/StatsCard";
import { CustomTable } from "@/components/dashboard/CustomTable";
import AddNewUser from "@/components/model/AddNewUser";
import RolesPermissions from "@/components/RolesPermissions";

// Mock data
const userStats = {
    totalUsers: 4,
    invited: 32,
    deactivated: 5,
    active: 32,
    inactive: 10
};

const users = [
    {
        id: "VA1087",
        name: "Sarah Chen",
        email: "sarah.chen@accel.com",
        designation: "UX designer",
        status: "Active",
        permissionLevel: "Admin",
        lastActive: "2 hours ago",
        avatar: "/src/assets/icons/0b27a87a0c0e1b7084e0ba7d7ddb5036f96f3853.png"
    },
    {
        id: "VA1088",
        name: "Sarah Chen",
        email: "sarah.chen@accel.com",
        designation: "UX designer",
        status: "Invited",
        permissionLevel: "Manager",
        lastActive: "2 hours ago",
        avatar: "/src/assets/icons/93b944d3ca02967067616476681ede013184432a.png"
    },
    {
        id: "VA1089",
        name: "Sarah Chen",
        email: "sarah.chen@accel.com",
        designation: "UX designer",
        status: "Active",
        permissionLevel: "Manager",
        lastActive: "2 hours ago",
        avatar: "/src/assets/icons/83b47bff1213d888c75e6013ef23c6956943fff7.png"
    }
];

const UserManagement: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');

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

    // Define columns for CustomTable
    const columns = [
        {
            accessor: "id",
            header: "EMP-ID",
            render: (value: string, row: any) => (
                <div className="flex items-center gap-3">
                    <Avatar className="w-6 h-6">
                        <AvatarImage src={row.avatar} alt={row.name} />
                        <AvatarFallback className="text-xs">{row.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-[#252525]">{value}</span>
                </div>
            )
        },
        {
            accessor: "name",
            header: "Emp name",
            render: (value: string, row: any) => (
                <div>
                    <div className="text-sm font-medium text-[#252525]">{value}</div>
                    <div className="text-xs text-[#666666]">{row.email}</div>
                </div>
            )
        },
        {
            accessor: "designation",
            header: "Designation",
            render: (value: string) => (
                <span className="text-sm text-[#252525]">{value}</span>
            )
        },
        {
            accessor: "status",
            header: "Status",
            render: (value: string) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(value)}`}>
                    {value}
                </span>
            )
        },
        {
            accessor: "permissionLevel",
            header: "Permission level",
            render: (value: string) => (
                <span className="text-sm text-[#252525]">{value}</span>
            )
        },
        {
            accessor: "lastActive",
            header: "Last Active",
            render: (value: string) => (
                <span className="text-sm text-[#666666]">{value}</span>
            )
        },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
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
                        <CustomTable 
                            data={users} 
                            columns={columns} 
                            selectable={true}
                            className="bg-white"
                        />
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
                onSubmit={(userData) => {
                    console.log('New user data:', userData);
                    // Here you would typically make an API call to create the user
                    // For now, we'll just close the modal
                    setIsAddUserModalOpen(false);
                }}
            />
        </div>
    );
};

export default UserManagement;