import mongoose, { Schema } from 'mongoose';
import { IRole, IPermissionSet, PERMISSION_MODULES } from '@/types';

/**
 * Permission Set schema for granular permissions
 */
const permissionSetSchema = new Schema<IPermissionSet>({
  module: {
    type: String,
    required: true,
    enum: Object.values(PERMISSION_MODULES)
  },
  permissions: {
    view: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  },
  scope: {
    type: String,
    enum: ['all', 'assigned', 'own'],
    default: 'all'
  }
}, { _id: false });

/**
 * Role schema for workspace-specific roles and permissions
 */
const roleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  workspaceId: {
    type: Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true,
    index: true
  },
  isSystemRole: {
    type: Boolean,
    default: false,
    index: true
  },
  inheritFrom: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  },
  permissions: [permissionSetSchema],
  defaultAccessScope: {
    type: String,
    enum: ['workspace', 'team', 'own'],
    default: 'workspace'
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  collection: 'roles'
});

// Compound indexes for efficient querying
roleSchema.index({ workspaceId: 1, name: 1 }, { unique: true });
roleSchema.index({ workspaceId: 1, isSystemRole: 1 });
roleSchema.index({ workspaceId: 1, isActive: 1 });

// Pre-save middleware to inherit permissions
roleSchema.pre('save', async function(next) {
  if (this.inheritFrom && this.isNew) {
    try {
      const parentRole = await this.constructor.findById(this.inheritFrom);
      if (parentRole) {
        // Inherit permissions from parent role
        this.permissions = [...parentRole.permissions];
      }
    } catch (error) {
      console.error('Error inheriting permissions:', error);
    }
  }
  next();
});

// Static method to create default system roles for a workspace
roleSchema.statics.createDefaultRoles = async function(workspaceId: mongoose.Types.ObjectId, createdBy: mongoose.Types.ObjectId) {
  const defaultRoles = [
    {
      name: 'Admin',
      description: 'Full system access with all permissions',
      isSystemRole: true,
      permissions: Object.values(PERMISSION_MODULES).map(module => ({
        module,
        permissions: { view: true, create: true, edit: true, delete: true },
        scope: 'all'
      }))
    },
    {
      name: 'Manager',
      description: 'Manage projects and team members',
      isSystemRole: true,
      permissions: [
        { module: PERMISSION_MODULES.PROJECTS, permissions: { view: true, create: true, edit: true, delete: true }, scope: 'all' },
        { module: PERMISSION_MODULES.TASKS, permissions: { view: true, create: true, edit: true, delete: true }, scope: 'all' },
        { module: PERMISSION_MODULES.SPRINTS, permissions: { view: true, create: true, edit: true, delete: true }, scope: 'all' },
        { module: PERMISSION_MODULES.TEAM, permissions: { view: true, create: false, edit: true, delete: false }, scope: 'all' },
        { module: PERMISSION_MODULES.FILES, permissions: { view: true, create: true, edit: true, delete: true }, scope: 'all' },
        { module: PERMISSION_MODULES.REPORTS, permissions: { view: true, create: true, edit: true, delete: false }, scope: 'all' },
        { module: PERMISSION_MODULES.MEMBERS, permissions: { view: true, create: true, edit: true, delete: false }, scope: 'all' },
        { module: PERMISSION_MODULES.COMMENTS, permissions: { view: true, create: true, edit: true, delete: true }, scope: 'all' },
        { module: PERMISSION_MODULES.NOTIFICATIONS, permissions: { view: true, create: true, edit: true, delete: true }, scope: 'all' }
      ]
    },
    {
      name: 'Member',
      description: 'Standard user with project access',
      isSystemRole: true,
      permissions: [
        { module: PERMISSION_MODULES.PROJECTS, permissions: { view: true, create: false, edit: false, delete: false }, scope: 'assigned' },
        { module: PERMISSION_MODULES.TASKS, permissions: { view: true, create: true, edit: true, delete: false }, scope: 'assigned' },
        { module: PERMISSION_MODULES.SPRINTS, permissions: { view: true, create: false, edit: false, delete: false }, scope: 'assigned' },
        { module: PERMISSION_MODULES.TEAM, permissions: { view: true, create: false, edit: false, delete: false }, scope: 'all' },
        { module: PERMISSION_MODULES.FILES, permissions: { view: true, create: true, edit: true, delete: false }, scope: 'assigned' },
        { module: PERMISSION_MODULES.REPORTS, permissions: { view: true, create: false, edit: false, delete: false }, scope: 'assigned' },
        { module: PERMISSION_MODULES.COMMENTS, permissions: { view: true, create: true, edit: true, delete: false }, scope: 'own' },
        { module: PERMISSION_MODULES.NOTIFICATIONS, permissions: { view: true, create: false, edit: true, delete: false }, scope: 'own' }
      ]
    },
    {
      name: 'Guest',
      description: 'Limited access to assigned projects',
      isSystemRole: true,
      permissions: [
        { module: PERMISSION_MODULES.PROJECTS, permissions: { view: true, create: false, edit: false, delete: false }, scope: 'assigned' },
        { module: PERMISSION_MODULES.TASKS, permissions: { view: true, create: false, edit: false, delete: false }, scope: 'assigned' },
        { module: PERMISSION_MODULES.TEAM, permissions: { view: true, create: false, edit: false, delete: false }, scope: 'all' },
        { module: PERMISSION_MODULES.FILES, permissions: { view: true, create: false, edit: false, delete: false }, scope: 'assigned' },
        { module: PERMISSION_MODULES.COMMENTS, permissions: { view: true, create: true, edit: false, delete: false }, scope: 'own' }
      ]
    }
  ];

  const createdRoles = [];
  for (const roleData of defaultRoles) {
    const role = new this({
      ...roleData,
      workspaceId,
      createdBy
    });
    await role.save();
    createdRoles.push(role);
  }

  return createdRoles;
};

// Instance method to check if role has specific permission
roleSchema.methods.hasPermission = function(module: string, action: 'view' | 'create' | 'edit' | 'delete'): boolean {
  const permission = this.permissions.find((p: IPermissionSet) => p.module === module);
  return permission ? permission.permissions[action] : false;
};

// Instance method to get all modules with permissions
roleSchema.methods.getPermissionMatrix = function(): Record<string, any> {
  const matrix: Record<string, any> = {};
  
  Object.values(PERMISSION_MODULES).forEach(module => {
    const permission = this.permissions.find((p: IPermissionSet) => p.module === module);
    matrix[module] = permission ? permission.permissions : { view: false, create: false, edit: false, delete: false };
  });
  
  return matrix;
};

const Role = mongoose.model<IRole>('Role', roleSchema);

export default Role;
