import React, { useState } from 'react';
import { ShieldCheck, UserPlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CreateNewRoleProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (roleData: RoleFormData) => void;
}

interface RoleFormData {
  roleName: string;
  roleDescription: string;
  inheritFrom: string;
  defaultAccessScope: string;
  assignedUsers: string[];
  permissions: Record<string, PermissionSet>;
}

interface PermissionSet {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

interface PermissionCategory {
  id: string;
  name: string;
  permissions: PermissionSet;
}

const CreateNewRole: React.FC<CreateNewRoleProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<RoleFormData>({
    roleName: '',
    roleDescription: '',
    inheritFrom: '',
    defaultAccessScope: '',
    assignedUsers: [],
    permissions: {}
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RoleFormData, string>>>({});

  // Mock users data
  const availableUsers = [
    { id: '1', email: 'example@gmail.com', name: 'John Doe', avatar: '/src/assets/icons/0b27a87a0c0e1b7084e0ba7d7ddb5036f96f3853.png' },
    { id: '2', email: 'jane@example.com', name: 'Jane Smith', avatar: '/src/assets/icons/93b944d3ca02967067616476681ede013184432a.png' },
    { id: '3', email: 'bob@example.com', name: 'Bob Wilson', avatar: '/src/assets/icons/83b47bff1213d888c75e6013ef23c6956943fff7.png' },
  ];

  // Permission categories
  const permissionCategories: PermissionCategory[] = [
    {
      id: 'core',
      name: 'Core Permissions',
      permissions: { view: true, create: true, edit: true, delete: true }
    },
    {
      id: 'projects',
      name: 'Projects',
      permissions: { view: true, create: true, edit: true, delete: true }
    },
    {
      id: 'tasks',
      name: 'Tasks',
      permissions: { view: true, create: true, edit: true, delete: true }
    },
    {
      id: 'sprints',
      name: 'Sprints/ Boards',
      permissions: { view: true, create: true, edit: true, delete: true }
    },
    {
      id: 'team',
      name: 'Team',
      permissions: { view: true, create: true, edit: true, delete: true }
    },
    {
      id: 'files',
      name: 'Files & Documents',
      permissions: { view: true, create: true, edit: true, delete: true }
    },
    {
      id: 'reports',
      name: 'Reports',
      permissions: { view: true, create: true, edit: true, delete: true }
    },
    {
      id: 'workspace',
      name: 'Workspace',
      permissions: { view: true, create: true, edit: true, delete: true }
    },
    {
      id: 'members',
      name: 'Members',
      permissions: { view: true, create: true, edit: true, delete: true }
    },
    {
      id: 'roles',
      name: 'Roles & Permissions',
      permissions: { view: true, create: true, edit: true, delete: true }
    },
    {
      id: 'comments',
      name: 'Comments',
      permissions: { view: true, create: true, edit: true, delete: true }
    },
    {
      id: 'notifications',
      name: 'Notifications',
      permissions: { view: true, create: true, edit: true, delete: true }
    },
    {
      id: 'chat',
      name: 'Community Chat',
      permissions: { view: true, create: true, edit: true, delete: true }
    },
    {
      id: 'messages',
      name: 'Direct Messages',
      permissions: { view: true, create: true, edit: true, delete: true }
    },
    {
      id: 'billing',
      name: 'Billing & Subscription',
      permissions: { view: true, create: true, edit: true, delete: true }
    },
    {
      id: 'integrations',
      name: 'Integrations',
      permissions: { view: true, create: true, edit: true, delete: true }
    },
    {
      id: 'settings',
      name: 'System Settings',
      permissions: { view: true, create: true, edit: true, delete: true }
    }
  ];

  const [permissions, setPermissions] = useState<Record<string, PermissionSet>>(
    permissionCategories.reduce((acc, category) => {
      acc[category.id] = { ...category.permissions };
      return acc;
    }, {} as Record<string, PermissionSet>)
  );

  const handleInputChange = (field: keyof RoleFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Auto-populate permissions when inherit from role is selected
    if (field === 'inheritFrom') {
      setDefaultPermissionsForRole(value);
    }
  };

  const setDefaultPermissionsForRole = (role: string) => {
    const defaultPermissions: Record<string, Record<string, PermissionSet>> = {
      admin: {
        // Admin gets all permissions
        projects: { view: true, create: true, edit: true, delete: true },
        tasks: { view: true, create: true, edit: true, delete: true },
        sprints: { view: true, create: true, edit: true, delete: true },
        team: { view: true, create: true, edit: true, delete: true },
        files: { view: true, create: true, edit: true, delete: true },
        reports: { view: true, create: true, edit: true, delete: true },
        workspace: { view: true, create: true, edit: true, delete: true },
        members: { view: true, create: true, edit: true, delete: true },
        roles: { view: true, create: true, edit: true, delete: true },
        comments: { view: true, create: true, edit: true, delete: true },
        notifications: { view: true, create: true, edit: true, delete: true },
        chat: { view: true, create: true, edit: true, delete: true },
        messages: { view: true, create: true, edit: true, delete: true },
        billing: { view: true, create: true, edit: true, delete: true },
        integrations: { view: true, create: true, edit: true, delete: true },
        settings: { view: true, create: true, edit: true, delete: true }
      },
      manager: {
        // Manager gets most permissions except billing and settings
        projects: { view: true, create: true, edit: true, delete: true },
        tasks: { view: true, create: true, edit: true, delete: true },
        sprints: { view: true, create: true, edit: true, delete: true },
        team: { view: true, create: true, edit: true, delete: false },
        files: { view: true, create: true, edit: true, delete: true },
        reports: { view: true, create: true, edit: true, delete: false },
        workspace: { view: true, create: true, edit: true, delete: false },
        members: { view: true, create: true, edit: false, delete: false },
        roles: { view: true, create: false, edit: false, delete: false },
        comments: { view: true, create: true, edit: true, delete: true },
        notifications: { view: true, create: true, edit: true, delete: false },
        chat: { view: true, create: true, edit: true, delete: false },
        messages: { view: true, create: true, edit: true, delete: false },
        billing: { view: false, create: false, edit: false, delete: false },
        integrations: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false }
      },
      member: {
        // Member gets basic permissions
        projects: { view: true, create: true, edit: true, delete: false },
        tasks: { view: true, create: true, edit: true, delete: true },
        sprints: { view: true, create: true, edit: true, delete: false },
        team: { view: true, create: false, edit: false, delete: false },
        files: { view: true, create: true, edit: true, delete: false },
        reports: { view: true, create: false, edit: false, delete: false },
        workspace: { view: true, create: false, edit: false, delete: false },
        members: { view: true, create: false, edit: false, delete: false },
        roles: { view: false, create: false, edit: false, delete: false },
        comments: { view: true, create: true, edit: true, delete: false },
        notifications: { view: true, create: false, edit: false, delete: false },
        chat: { view: true, create: true, edit: true, delete: false },
        messages: { view: true, create: true, edit: true, delete: false },
        billing: { view: false, create: false, edit: false, delete: false },
        integrations: { view: false, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false }
      },
      guest: {
        // Guest gets minimal permissions
        projects: { view: true, create: false, edit: false, delete: false },
        tasks: { view: true, create: false, edit: false, delete: false },
        sprints: { view: true, create: false, edit: false, delete: false },
        team: { view: true, create: false, edit: false, delete: false },
        files: { view: true, create: false, edit: false, delete: false },
        reports: { view: false, create: false, edit: false, delete: false },
        workspace: { view: true, create: false, edit: false, delete: false },
        members: { view: true, create: false, edit: false, delete: false },
        roles: { view: false, create: false, edit: false, delete: false },
        comments: { view: true, create: false, edit: false, delete: false },
        notifications: { view: true, create: false, edit: false, delete: false },
        chat: { view: true, create: false, edit: false, delete: false },
        messages: { view: false, create: false, edit: false, delete: false },
        billing: { view: false, create: false, edit: false, delete: false },
        integrations: { view: false, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false }
      }
    };

    if (defaultPermissions[role]) {
      setPermissions(defaultPermissions[role]);
    }
  };

  const handlePermissionChange = (categoryId: string, permissionType: keyof PermissionSet, checked: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [permissionType]: checked
      }
    }));
  };

  const toggleUserAssignment = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      assignedUsers: prev.assignedUsers.includes(userId)
        ? prev.assignedUsers.filter(id => id !== userId)
        : [...prev.assignedUsers, userId]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RoleFormData, string>> = {};

    if (!formData.roleName.trim()) {
      newErrors.roleName = 'Role name is required';
    }

    if (!formData.defaultAccessScope) {
      newErrors.defaultAccessScope = 'Default access scope is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Group permissions by main categories as expected by the API
      // Core permissions: projects, tasks, sprints, team, files, reports, workspace
      const corePermissions = {
        view: permissions.projects?.view || permissions.tasks?.view || permissions.sprints?.view || 
              permissions.team?.view || permissions.files?.view || permissions.reports?.view || 
              permissions.workspace?.view || false,
        create: permissions.projects?.create || permissions.tasks?.create || permissions.sprints?.create || 
                permissions.team?.create || permissions.files?.create || permissions.reports?.create || 
                permissions.workspace?.create || false,
        edit: permissions.projects?.edit || permissions.tasks?.edit || permissions.sprints?.edit || 
              permissions.team?.edit || permissions.files?.edit || permissions.reports?.edit || 
              permissions.workspace?.edit || false,
        delete: permissions.projects?.delete || permissions.tasks?.delete || permissions.sprints?.delete || 
                permissions.team?.delete || permissions.files?.delete || permissions.reports?.delete || 
                permissions.workspace?.delete || false
      };

      // Team management: members, roles
      const teamManagementPermissions = {
        view: permissions.members?.view || permissions.roles?.view || false,
        create: permissions.members?.create || permissions.roles?.create || false,
        edit: permissions.members?.edit || permissions.roles?.edit || false,
        delete: permissions.members?.delete || permissions.roles?.delete || false
      };

      // Communication: comments, notifications, chat, messages
      const communicationPermissions = {
        view: permissions.comments?.view || permissions.notifications?.view || 
              permissions.chat?.view || permissions.messages?.view || false,
        create: permissions.comments?.create || permissions.notifications?.create || 
                permissions.chat?.create || permissions.messages?.create || false,
        edit: permissions.comments?.edit || permissions.notifications?.edit || 
              permissions.chat?.edit || permissions.messages?.edit || false,
        delete: permissions.comments?.delete || permissions.notifications?.delete || 
                permissions.chat?.delete || permissions.messages?.delete || false
      };

      // Administration: billing, integrations, settings
      const administrationPermissions = {
        view: permissions.billing?.view || permissions.integrations?.view || permissions.settings?.view || false,
        create: permissions.billing?.create || permissions.integrations?.create || permissions.settings?.create || false,
        edit: permissions.billing?.edit || permissions.integrations?.edit || permissions.settings?.edit || false,
        delete: permissions.billing?.delete || permissions.integrations?.delete || permissions.settings?.delete || false
      };

      const groupedPermissions = {
        core: corePermissions,
        team_management: teamManagementPermissions,
        communication: communicationPermissions,
        administration: administrationPermissions
      };

      // Map frontend access scope values to backend values
      const accessScopeMapping: Record<string, string> = {
        'entire-organization': 'workspace',
        'specific-projects': 'team',
        'team-only': 'own'
      };

      const roleData = {
        roleName: formData.roleName,
        roleDescription: formData.roleDescription,
        inheritFrom: formData.inheritFrom,
        defaultAccessScope: accessScopeMapping[formData.defaultAccessScope] || 'workspace',
        assignedUsers: formData.assignedUsers,
        permissions: groupedPermissions
      };
      
      console.log('Submitting role data:', roleData); // Debug log
      console.log('Original permissions:', permissions); // Debug log
      console.log('Grouped permissions:', groupedPermissions); // Debug log
      onSubmit?.(roleData);
      handleCancel();
    }
  };

  const handleCancel = () => {
    setFormData({
      roleName: '',
      roleDescription: '',
      inheritFrom: '',
      defaultAccessScope: '',
      assignedUsers: [],
      permissions: {}
    });
    setPermissions(permissionCategories.reduce((acc, category) => {
      acc[category.id] = { view: false, create: false, edit: false, delete: false };
      return acc;
    }, {} as Record<string, PermissionSet>));
    setErrors({});
    onClose();
  };

  const getAssignedUsers = () => {
    return availableUsers.filter(user => formData.assignedUsers.includes(user.id));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[96vw] sm:max-w-[1000px] lg:max-w-[1200px] max-h-[95vh] h-[95vh] p-0 bg-white rounded-[24px] border-0 overflow-hidden [&>button]:hidden">
        <DialogTitle className="sr-only">Create New Role</DialogTitle>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-white h-[60px] border-b border-gray-200 px-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#67909b] rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-[#252525]">Create New Role</h2>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex min-h-0 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 p-4 sm:p-6 w-full h-full">
              {/* Left Column - Form Fields */}
              <div className="space-y-6 overflow-y-auto pr-2" style={{ maxHeight: 'calc(95vh - 120px)' }}>
                {/* Role Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#252525]">Role name</label>
                  <Input
                    placeholder="Enter role name"
                    value={formData.roleName}
                    onChange={(e) => handleInputChange('roleName', e.target.value)}
                    className={`h-12 ${errors.roleName ? 'border-red-500' : ''}`}
                  />
                  {errors.roleName && (
                    <p className="text-red-500 text-sm">{errors.roleName}</p>
                  )}
                </div>

                {/* Role Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#252525]">Role Description (optional)</label>
                  <Textarea
                    placeholder="Description"
                    value={formData.roleDescription}
                    onChange={(e) => handleInputChange('roleDescription', e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                </div>

                {/* Inherit From */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#252525]">Inherit from</label>
                  <Select
                    value={formData.inheritFrom}
                    onValueChange={(value) => handleInputChange('inheritFrom', value)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select Permission level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="guest">Guest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Default Access Scope */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#252525]">Default Access Scope</label>
                  <Select
                    value={formData.defaultAccessScope}
                    onValueChange={(value) => handleInputChange('defaultAccessScope', value)}
                  >
                    <SelectTrigger className={`h-12 ${errors.defaultAccessScope ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Entire Organization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entire-organization">Entire Organization</SelectItem>
                      <SelectItem value="specific-projects">Specific Projects</SelectItem>
                      <SelectItem value="team-only">Team Only</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.defaultAccessScope && (
                    <p className="text-red-500 text-sm">{errors.defaultAccessScope}</p>
                  )}
                </div>

                {/* Assign to Users */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#252525]">Assign to users</label>
                  <Select>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Entire member E-mail ID to add" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableUsers.map((user) => (
                        <SelectItem 
                          key={user.id} 
                          value={user.id}
                          onClick={() => toggleUserAssignment(user.id)}
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            {user.email}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Assigned Users Display */}
                  {getAssignedUsers().length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      {getAssignedUsers().map((user) => (
                        <div key={user.id} className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1 max-w-full">
                          <Avatar className="w-5 h-5 sm:w-6 sm:h-6">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="text-xs">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">{user.email}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleUserAssignment(user.id)}
                            className="h-4 w-4 p-0 hover:bg-gray-200 rounded-full flex-shrink-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="px-6 py-2 border-[#67909b] text-[#67909b] hover:bg-[#67909b] hover:text-white w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-[#67909b] hover:bg-[#5a7a85] text-white w-full sm:w-auto"
                  >
                    Create new role
                  </Button>
                </div>
              </div>

              {/* Right Column - Permissions Matrix */}
              <div className="space-y-3 overflow-y-auto" style={{ maxHeight: 'calc(95vh - 120px)' }}>
                <div className="space-y-3">
                  {/* Permissions Header */}
                  <div className="grid grid-cols-7 text-xs sm:text-sm font-medium text-[#666666] border-b pb-2">
                    <div className="col-span-2 pr-4"></div>
                    <div></div>
                    <div className="text-center px-1">View</div>
                    <div className="text-center px-1">Create</div>
                    <div className="text-center px-1">Edit</div>
                    <div className="text-center px-1">Delete</div>
                  </div>

                  {/* Core Permissions */}
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium text-[#666666] mb-1">Core Permissions</h3>
                    {permissionCategories.slice(1, 8).map((category) => (
                      <div key={category.id} className="grid grid-cols-7 items-center py-1">
                        <div className="col-span-2 text-xs sm:text-sm text-[#252525] pr-4">{category.name}</div>
                        <div></div>
                        {(['view', 'create', 'edit', 'delete'] as const).map((permType) => (
                          <div key={permType} className="flex justify-center px-1">
                            <Checkbox
                              checked={permissions[category.id]?.[permType] || false}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(category.id, permType, checked as boolean)
                              }
                              className="data-[state=checked]:bg-[#67909b] data-[state=checked]:border-[#67909b] w-4 h-4"
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Team & User Management */}
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium text-[#666666] mb-1">Team & User management</h3>
                    {permissionCategories.slice(8, 10).map((category) => (
                      <div key={category.id} className="grid grid-cols-7 items-center py-1">
                        <div className="col-span-2 text-xs sm:text-sm text-[#252525] pr-4">{category.name}</div>
                        <div></div>
                        {(['view', 'create', 'edit', 'delete'] as const).map((permType) => (
                          <div key={permType} className="flex justify-center px-1">
                            <Checkbox
                              checked={permissions[category.id]?.[permType] || false}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(category.id, permType, checked as boolean)
                              }
                              className="data-[state=checked]:bg-[#67909b] data-[state=checked]:border-[#67909b] w-4 h-4"
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Communication & Collaboration */}
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium text-[#666666] mb-1">Communication & Collaboration</h3>
                    {permissionCategories.slice(10, 14).map((category) => (
                      <div key={category.id} className="grid grid-cols-7 items-center py-1">
                        <div className="col-span-2 text-xs sm:text-sm text-[#252525] pr-4">{category.name}</div>
                        <div></div>
                        {(['view', 'create', 'edit', 'delete'] as const).map((permType) => (
                          <div key={permType} className="flex justify-center px-1">
                            <Checkbox
                              checked={permissions[category.id]?.[permType] || false}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(category.id, permType, checked as boolean)
                              }
                              className="data-[state=checked]:bg-[#67909b] data-[state=checked]:border-[#67909b] w-4 h-4"
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Administration / Advanced */}
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium text-[#666666] mb-1">Administration / Advanced</h3>
                    {permissionCategories.slice(14).map((category) => (
                      <div key={category.id} className="grid grid-cols-7 items-center py-1">
                        <div className="col-span-2 text-xs sm:text-sm text-[#252525] pr-4">{category.name}</div>
                        <div></div>
                        {(['view', 'create', 'edit', 'delete'] as const).map((permType) => (
                          <div key={permType} className="flex justify-center px-1">
                            <Checkbox
                              checked={permissions[category.id]?.[permType] || false}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(category.id, permType, checked as boolean)
                              }
                              className="data-[state=checked]:bg-[#67909b] data-[state=checked]:border-[#67909b] w-4 h-4"
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewRole;
