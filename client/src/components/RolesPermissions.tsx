import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Plus, Users, ShieldCheck, User, Eye, Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import CreateNewRole from '@/components/model/CreateNewRole';
import api from '@/api/axios';

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
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch roles and permissions from API
  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/roles');
      
      if (response.data.success) {
        // Handle both array and object with roles property
        const rolesArray = Array.isArray(response.data.data) 
          ? response.data.data 
          : response.data.data?.roles || [];
        
        const rolesData = rolesArray.map((role: any) => ({
          id: role._id || role.id,
          name: role.name,
          description: role.description,
          userCount: role.userCount || 0,
          icon: getRoleIcon(role.name),
          color: getRoleColor(role.name, role.isSystemRole),
          permissions: role.permissions || [],
          isSystemRole: role.isSystemRole,
          isActive: role.isActive,
        }));
        setRoles(rolesData);
      } else {
        setError('Failed to fetch roles');
      }
    } catch (err: any) {
      console.error('Error fetching roles:', err);
      if (err.response?.status === 400 && err.response?.data?.message === 'Workspace context required') {
        setError('You need to be logged in with a workspace to view roles. Please log out and log back in.');
      } else {
        setError(err.response?.data?.message || 'Failed to fetch roles');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchPermissions = async () => {
    try {
      setPermissionsLoading(true);
      
      // Map roles to their default access scope
      const roleScopeMap: Record<string, string> = {
        'Admin': 'Entire Workspace',
        'Manager': 'Specific Projects', 
        'Member': 'Team Only',
        'Guest': 'Team Only'
      };
      
      const roles = ['Admin', 'Manager', 'Member', 'Guest'];
      const permissionsData: Permission[] = [];
      
      for (const roleName of roles) {
        try {
          const response = await api.get(`/roles/default-permissions/${roleName}`);
          
          if (response.data.success && response.data.data.permissions) {
            // Map role to its default access scope
            const scope = roleScopeMap[roleName] || 'Team Only';
            const scopeDescription = {
              'Entire Workspace': 'Full access to all workspace features and administration across the entire workspace',
              'Specific Projects': 'Management access to assigned projects and team members',
              'Team Only': roleName === 'Guest' ? 'Limited read-only access to team content' : 'Access limited to team-specific projects and tasks'
            };
            
            permissionsData.push({
              id: roleName,
              role: roleName,
              permission: scope,
              description: scopeDescription[scope as keyof typeof scopeDescription],
              type: 'System Role',
              enabled: true
            });
          }
        } catch (err) {
          console.warn(`Failed to fetch permissions for ${roleName}:`, err);
        }
      }
      
      // If no permissions found, show fallback
      if (permissionsData.length === 0) {
        setPermissions(getFallbackPermissions());
      } else {
        setPermissions(permissionsData);
      }
    } catch (err: any) {
      console.error('Error fetching permissions:', err);
      setPermissions(getFallbackPermissions());
    } finally {
      setPermissionsLoading(false);
    }
  };

  // Fallback permissions if API fails - showing scope-based permissions
  const getFallbackPermissions = (): Permission[] => {
    return [
      {
        id: 'admin',
        role: 'Admin',
        permission: 'Entire Workspace',
        description: 'Full access to all workspace features and administration across the entire workspace',
        type: 'System Role',
        enabled: true
      },
      {
        id: 'manager',
        role: 'Manager',
        permission: 'Specific Projects',
        description: 'Management access to assigned projects and team members',
        type: 'System Role',
        enabled: true
      },
      {
        id: 'member',
        role: 'Member',
        permission: 'Team Only',
        description: 'Access limited to team-specific projects and tasks',
        type: 'System Role',
        enabled: true
      },
      {
        id: 'guest',
        role: 'Guest',
        permission: 'Team Only',
        description: 'Limited read-only access to team content',
        type: 'System Role',
        enabled: true
      }
    ];
  };

  const getRoleIcon = (roleName: string) => {
    switch (roleName.toLowerCase()) {
      case 'admin':
        return <ShieldCheck className="w-6 h-6" />;
      case 'manager':
        return <Users className="w-6 h-6" />;
      case 'member':
        return <User className="w-6 h-6" />;
      case 'guest':
        return <Eye className="w-6 h-6" />;
      default:
        return <User className="w-6 h-6" />;
    }
  };

  const getRoleColor = (roleName: string, isSystemRole: boolean) => {
    if (isSystemRole) {
      switch (roleName.toLowerCase()) {
        case 'admin':
          return 'bg-blue-500';
        case 'manager':
          return 'bg-green-500';
        case 'member':
          return 'bg-purple-500';
        case 'guest':
          return 'bg-gray-500';
        default:
          return 'bg-blue-500';
      }
    }
    return 'bg-gray-500';
  };

  // Helper function to format permission for display
  const formatPermission = (permission: any): string => {
    if (typeof permission === 'string') {
      return permission;
    }
    
    if (permission && typeof permission === 'object') {
      // If it's a permission object with module, return the module name
      if (permission.module) {
        return permission.module;
      }
      // If it has a name property, return that
      if (permission.name) {
        return permission.name;
      }
      // If it has a permission property, return that
      if (permission.permission) {
        return permission.permission;
      }
    }
    
    return 'Permission';
  };

  // Real permission data from API
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [permissionsLoading, setPermissionsLoading] = useState(true);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const togglePermission = (id: string) => {
    setPermissions(prev => 
      prev.map(permission => 
        permission.id === id 
          ? { ...permission, enabled: !permission.enabled }
          : permission
      )
    );
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleEditPermission = (permission: Permission) => {
    console.log('Edit permission:', permission);
    setOpenDropdownId(null);
  };

  const handleDeletePermission = (permission: Permission) => {
    console.log('Delete permission:', permission);
    setOpenDropdownId(null);
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

  return (
    <div className="space-y-6">
      {/* Roles Section */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[#252525]">Roles</h2>
            <p className="text-sm text-[#666666]">System roles and custom roles for this workspace</p>
          </div>
          <Button 
            className="bg-[#67909b] hover:bg-[#5a7a85] text-white flex-shrink-0"
            onClick={() => setIsCreateRoleModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create role
          </Button>
        </div>

        {/* Role Cards Grid */}
        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-500">Loading roles...</div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="text-red-500 mb-4">Error: {error}</div>
            <Button onClick={fetchRoles} variant="outline">
              Retry
            </Button>
          </div>
        ) : roles.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-4">No roles found</div>
            <p className="text-sm text-gray-400 mb-4">
              Roles are automatically created when a workspace is set up. 
              If you don't see any roles, make sure you're logged in and have access to a workspace.
            </p>
            <Button onClick={fetchRoles} variant="outline">
              Refresh
            </Button>
          </div>
        ) : (
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
                  <p className="text-sm text-[#666666]">{role.userCount} user{role.userCount !== 1 ? 's' : ''}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[#666666] mb-4">{role.description}</p>

              {/* Permissions Tags */}
              <div>
                <p className="text-sm font-medium text-[#666666] mb-2">Permissions</p>
                <div className="flex flex-wrap gap-2">
                  {role.permissions && role.permissions.length > 0 ? (
                    <>
                      {role.permissions.slice(0, 3).map((permission, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-[#f0f4f5] text-[#67909b] text-xs rounded-md"
                        >
                          {formatPermission(permission)}
                        </span>
                      ))}
                      {role.permissions.length > 3 && (
                        <span className="px-2 py-1 bg-[#f0f4f5] text-[#67909b] text-xs rounded-md">
                          +{role.permissions.length - 3} more
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-xs text-gray-400">No permissions defined</span>
                  )}
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
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
            {permissionsLoading ? (
              <div className="p-8 text-center">
                <div className="text-gray-500">Loading permissions...</div>
              </div>
            ) : permissions.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-gray-500">No permissions available</div>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[#666666] w-32">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[#666666] w-48">
                      <div className="flex items-center gap-2">
                        Access Scope
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[#666666]">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[#666666] w-20">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {permissions.map((permission) => (
                    <tr key={permission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-[#252525] font-medium">{permission.role}</td>
                      <td className="px-6 py-4 text-sm text-[#252525] font-medium">{permission.permission}</td>
                      <td className="px-6 py-4 text-sm text-[#666666] max-w-md">
                        {permission.description}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end relative" ref={dropdownRef}>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => toggleDropdown(permission.id)}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                          {openDropdownId === permission.id && (
                            <div className="absolute top-8 right-0 z-50">
                              <div className="bg-white h-[80px] rounded-[8px] w-[120px] shadow-lg border border-gray-200 p-0">
                                {/* Edit Option */}
                                <div 
                                  className="flex items-center h-8 px-4 cursor-pointer hover:bg-gray-50 rounded-t-[8px]" 
                                  onClick={() => handleEditPermission(permission)}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  <span className="text-[#4a4a4a] text-[14px] font-normal">Edit</span>
                                </div>
                                
                                {/* Separator Line */}
                                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-4 my-1"></div>
                                
                                {/* Delete Option */}
                                <div 
                                  className="flex items-center h-8 px-4 cursor-pointer hover:bg-gray-50 rounded-b-[8px]" 
                                  onClick={() => handleDeletePermission(permission)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  <span className="text-[#4a4a4a] text-[14px] font-normal">Delete</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Create New Role Modal */}
      <CreateNewRole
        isOpen={isCreateRoleModalOpen}
        onClose={() => setIsCreateRoleModalOpen(false)}
        onSubmit={async (roleData) => {
          try {
            const response = await api.post('/roles', roleData);
            if (response.data.success) {
              // Refresh roles list
              await fetchRoles();
              setIsCreateRoleModalOpen(false);
            } else {
              setError('Failed to create role');
            }
          } catch (err: any) {
            console.error('Error creating role:', err);
            setError(err.response?.data?.message || 'Failed to create role');
          }
        }}
      />
    </div>
  );
};

export default RolesPermissions;
