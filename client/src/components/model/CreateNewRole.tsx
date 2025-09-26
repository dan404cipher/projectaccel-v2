import React, { useState } from 'react';
import { X, ShieldCheck, UserPlus } from 'lucide-react';
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
      const roleData = {
        ...formData,
        permissions
      };
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
      <DialogContent className="max-w-[900px] max-h-[90vh] p-0 bg-white rounded-[24px] border-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-white h-[80px] border-b border-gray-200 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#67909b] rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-[#252525]">Create New Role</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-[#252525]" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 gap-8 p-6">
              {/* Left Column - Form Fields */}
              <div className="space-y-6">
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
                    <div className="flex items-center gap-2 mt-2">
                      {getAssignedUsers().map((user) => (
                        <div key={user.id} className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="text-xs">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{user.email}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleUserAssignment(user.id)}
                            className="h-4 w-4 p-0 hover:bg-gray-200 rounded-full"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Permissions Matrix */}
              <div className="space-y-4">
                <div className="space-y-4">
                  {/* Permissions Header */}
                  <div className="grid grid-cols-5 gap-2 text-sm font-medium text-[#666666] border-b pb-2">
                    <div></div>
                    <div className="text-center">View</div>
                    <div className="text-center">Create</div>
                    <div className="text-center">Edit</div>
                    <div className="text-center">Delete</div>
                  </div>

                  {/* Core Permissions */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-[#666666] mb-2">Core Permissions</h3>
                    {permissionCategories.slice(1, 8).map((category) => (
                      <div key={category.id} className="grid grid-cols-5 gap-2 items-center py-1">
                        <div className="text-sm text-[#252525]">{category.name}</div>
                        {(['view', 'create', 'edit', 'delete'] as const).map((permType) => (
                          <div key={permType} className="flex justify-center">
                            <Checkbox
                              checked={permissions[category.id]?.[permType] || false}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(category.id, permType, checked as boolean)
                              }
                              className="data-[state=checked]:bg-[#67909b] data-[state=checked]:border-[#67909b]"
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Team & User Management */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-[#666666] mb-2">Team & User management</h3>
                    {permissionCategories.slice(8, 10).map((category) => (
                      <div key={category.id} className="grid grid-cols-5 gap-2 items-center py-1">
                        <div className="text-sm text-[#252525]">{category.name}</div>
                        {(['view', 'create', 'edit', 'delete'] as const).map((permType) => (
                          <div key={permType} className="flex justify-center">
                            <Checkbox
                              checked={permissions[category.id]?.[permType] || false}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(category.id, permType, checked as boolean)
                              }
                              className="data-[state=checked]:bg-[#67909b] data-[state=checked]:border-[#67909b]"
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Communication & Collaboration */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-[#666666] mb-2">Communication & Collaboration</h3>
                    {permissionCategories.slice(10, 14).map((category) => (
                      <div key={category.id} className="grid grid-cols-5 gap-2 items-center py-1">
                        <div className="text-sm text-[#252525]">{category.name}</div>
                        {(['view', 'create', 'edit', 'delete'] as const).map((permType) => (
                          <div key={permType} className="flex justify-center">
                            <Checkbox
                              checked={permissions[category.id]?.[permType] || false}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(category.id, permType, checked as boolean)
                              }
                              className="data-[state=checked]:bg-[#67909b] data-[state=checked]:border-[#67909b]"
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Administration / Advanced */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-[#666666] mb-2">Administration / Advanced</h3>
                    {permissionCategories.slice(14).map((category) => (
                      <div key={category.id} className="grid grid-cols-5 gap-2 items-center py-1">
                        <div className="text-sm text-[#252525]">{category.name}</div>
                        {(['view', 'create', 'edit', 'delete'] as const).map((permType) => (
                          <div key={permType} className="flex justify-center">
                            <Checkbox
                              checked={permissions[category.id]?.[permType] || false}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(category.id, permType, checked as boolean)
                              }
                              className="data-[state=checked]:bg-[#67909b] data-[state=checked]:border-[#67909b]"
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

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 flex justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="px-8 py-2 border-[#67909b] text-[#67909b] hover:bg-[#67909b] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-2 bg-[#67909b] hover:bg-[#5a7a85] text-white"
            >
              Create new role
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewRole;
