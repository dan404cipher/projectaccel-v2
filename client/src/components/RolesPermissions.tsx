import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Plus, Users, ShieldCheck, User, Eye, Edit } from 'lucide-react';
import CreateNewRole from '@/components/model/CreateNewRole';

interface Permission {
  id: string;
  role: string;
  permission: string;
  description: string;
  type: string;
  enabled: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  icon: React.ReactNode;
  color: string;
  permissions: string[];
}

const RolesPermissions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('roles');
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);

  // Mock data for roles
  const roles: Role[] = [
    {
      id: 'admin',
      name: 'Admin',
      description: 'Full system access with all permissions',
      userCount: 1,
      icon: <ShieldCheck className="w-6 h-6" />,
      color: 'bg-blue-500',
      permissions: ['Site Management', 'User Management', 'Reports', 'Project Management', 'System Settings', 'Team Management']
    },
    {
      id: 'manager',
      name: 'Manager',
      description: 'Manage projects and team members',
      userCount: 1,
      icon: <Users className="w-6 h-6" />,
      color: 'bg-green-500',
      permissions: ['Project Management', 'System Settings', 'Team Management', 'Reports']
    },
    {
      id: 'member',
      name: 'Member',
      description: 'Standard user with project access',
      userCount: 1,
      icon: <User className="w-6 h-6" />,
      color: 'bg-purple-500',
      permissions: ['Project Access', 'System Settings', 'Task Management', 'Reports']
    },
    {
      id: 'guest',
      name: 'Guest',
      description: 'Limited access to assigned projects',
      userCount: 1,
      icon: <Eye className="w-6 h-6" />,
      color: 'bg-gray-500',
      permissions: ['Project View', 'System Settings']
    }
  ];

  // Mock data for permissions
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: '1',
      role: 'Admin',
      permission: 'Manage team',
      description: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      type: 'Manage user',
      enabled: true
    },
    {
      id: '2',
      role: 'Admin',
      permission: 'Manage team',
      description: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      type: 'Manage user',
      enabled: true
    },
    {
      id: '3',
      role: 'Admin',
      permission: 'Manage team',
      description: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      type: 'Customs fields',
      enabled: true
    },
    {
      id: '4',
      role: 'Admin',
      permission: 'Manage team',
      description: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      type: 'Create & delete',
      enabled: true
    }
  ]);

  const togglePermission = (id: string) => {
    setPermissions(prev => 
      prev.map(permission => 
        permission.id === id 
          ? { ...permission, enabled: !permission.enabled }
          : permission
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Roles Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[#252525]">Roles</h2>
            <p className="text-sm text-[#666666]">These are all the Roles</p>
          </div>
          <Button 
            className="bg-[#67909b] hover:bg-[#5a7a85] text-white"
            onClick={() => setIsCreateRoleModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create role
          </Button>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {roles.map((role) => (
            <div key={role.id} className="bg-white rounded-lg border border-gray-200 p-6 relative">
              {/* Edit Icon */}
              <div className="absolute top-4 right-4">
                <Edit className="w-4 h-4 text-[#67909b] cursor-pointer" />
              </div>

              {/* Role Icon and Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`${role.color} rounded-lg p-2 text-white`}>
                  {role.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-[#252525]">{role.name}</h3>
                  <p className="text-sm text-[#666666]">{role.userCount} user</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[#666666] mb-4">{role.description}</p>

              {/* Permissions Tags */}
              <div>
                <p className="text-sm font-medium text-[#666666] mb-2">Permissions</p>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.slice(0, 3).map((permission, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#f0f4f5] text-[#67909b] text-xs rounded-md"
                    >
                      {permission}
                    </span>
                  ))}
                  {role.permissions.length > 3 && (
                    <span className="px-2 py-1 bg-[#f0f4f5] text-[#67909b] text-xs rounded-md">
                      +{role.permissions.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Permissions Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[#252525]">Available Permissions</h2>
            <p className="text-sm text-[#666666]">These are all the permissions that can be assigned to roles</p>
          </div>
          <Button className="bg-[#67909b] hover:bg-[#5a7a85] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Edit permission
          </Button>
        </div>

        {/* Permissions Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#666666]">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#666666]">
                    <div className="flex items-center gap-2">
                      Permission
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#666666]">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#666666]">
                    <div className="flex items-center gap-2">
                      Type
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#666666]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {permissions.map((permission) => (
                  <tr key={permission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-[#252525]">{permission.role}</td>
                    <td className="px-6 py-4 text-sm text-[#252525]">{permission.permission}</td>
                    <td className="px-6 py-4 text-sm text-[#666666] max-w-md">
                      {permission.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#252525]">{permission.type}</td>
                    <td className="px-6 py-4">
                      <Switch
                        checked={permission.enabled}
                        onCheckedChange={() => togglePermission(permission.id)}
                        className="data-[state=checked]:bg-[#67909b]"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create New Role Modal */}
      <CreateNewRole
        isOpen={isCreateRoleModalOpen}
        onClose={() => setIsCreateRoleModalOpen(false)}
        onSubmit={(roleData) => {
          console.log('New role data:', roleData);
          // Here you would typically make an API call to create the role
          setIsCreateRoleModalOpen(false);
        }}
      />
    </div>
  );
};

export default RolesPermissions;
