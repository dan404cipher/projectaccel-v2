import { Document, Types } from 'mongoose';
import { Request } from 'express';

// Base interfaces
export interface ITimestamps {
  createdAt: Date;
  updatedAt: Date;
}

// User related types
export interface IUser extends Document, ITimestamps {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  designation?: string;
  yearsOfExperience?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  lastLogin?: Date;
  refreshTokens: string[];
  profilePicture?: string;
  workspaces: IUserWorkspace[];
  isSuperAdmin: boolean;
  createdBy?: Types.ObjectId;
}

export interface IUserWorkspace {
  workspaceId: Types.ObjectId;
  roleId: Types.ObjectId;
  joinedAt: Date;
  invitedBy?: Types.ObjectId;
  status: 'active' | 'invited' | 'suspended';
}

// Workspace related types
export interface IWorkspace extends Document, ITimestamps {
  _id: Types.ObjectId;
  name: string;
  workspaceId: string; // WS0001, WS0002, etc.
  description?: string;
  ownerId: Types.ObjectId;
  isActive: boolean;
  subscriptionPlan: 'free' | 'pro' | 'enterprise';
  settings: IWorkspaceSettings;
  members: IWorkspaceMember[];
}

export interface IWorkspaceSettings {
  allowPublicInvites: boolean;
  requireAdminApproval: boolean;
  defaultRole: Types.ObjectId;
  timezone: string;
  language: string;
}

export interface IWorkspaceMember {
  userId: Types.ObjectId;
  roleId: Types.ObjectId;
  joinedAt: Date;
  invitedBy?: Types.ObjectId;
  status: 'active' | 'invited' | 'suspended';
}

// Role and Permission types
export interface IRole extends Document, ITimestamps {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  workspaceId: Types.ObjectId;
  isSystemRole: boolean; // For default roles like Admin, Manager, etc.
  inheritFrom?: Types.ObjectId;
  permissions: IPermissionSet[];
  defaultAccessScope: 'workspace' | 'team' | 'own';
  isActive: boolean;
  createdBy: Types.ObjectId;
}

export interface IPermissionSet {
  module: string; // 'projects', 'tasks', 'users', etc.
  permissions: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  scope?: 'all' | 'assigned' | 'own'; // Optional scope for granular control
}

// Predefined modules for permissions
export const PERMISSION_MODULES = {
  // Core modules
  PROJECTS: 'projects',
  TASKS: 'tasks',
  SPRINTS: 'sprints',
  TEAM: 'team',
  FILES: 'files',
  REPORTS: 'reports',
  WORKSPACE: 'workspace',
  
  // Team & User management
  MEMBERS: 'members',
  ROLES: 'roles',
  
  // Communication
  COMMENTS: 'comments',
  NOTIFICATIONS: 'notifications',
  CHAT: 'chat',
  MESSAGES: 'messages',
  
  // Administration
  BILLING: 'billing',
  INTEGRATIONS: 'integrations',
  SETTINGS: 'settings'
} as const;

export type PermissionModule = typeof PERMISSION_MODULES[keyof typeof PERMISSION_MODULES];

// Invite related types
export interface IInvite extends Document, ITimestamps {
  _id: Types.ObjectId;
  email: string;
  workspaceId: Types.ObjectId;
  roleId: Types.ObjectId;
  invitedBy: Types.ObjectId;
  token: string;
  expiresAt: Date;
  status: 'pending' | 'accepted' | 'expired' | 'revoked';
  acceptedAt?: Date;
}

// Counter for generating workspace IDs
export interface ICounter extends Document {
  _id: string;
  sequence: number;
}

// Audit log for tracking changes
export interface IAuditLog extends Document, ITimestamps {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  workspaceId?: Types.ObjectId;
  action: string; // 'create', 'update', 'delete'
  resource: string; // 'user', 'workspace', 'role', etc.
  resourceId: Types.ObjectId;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

// API Response types
export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface IApiError {
  success: false;
  message: string;
  error?: string;
  details?: any;
}

// Extended Request interface for authentication
export interface IAuthRequest extends Request {
  user?: {
    id: Types.ObjectId;
    email: string;
    workspaceId?: Types.ObjectId;
    roleId?: Types.ObjectId;
    permissions?: IPermissionSet[];
    isSuperAdmin?: boolean;
  };
}

// JWT Payload types
export interface IJWTPayload {
  userId: Types.ObjectId;
  email: string;
  workspaceId?: Types.ObjectId;
  roleId?: Types.ObjectId;
  isSuperAdmin?: boolean;
  type: 'access' | 'refresh';
}

// Query types for filtering and pagination
export interface IQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

// System roles enum
export enum SystemRoles {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MANAGER = 'manager',
  MEMBER = 'member',
  GUEST = 'guest'
}

// Permission action types
export enum PermissionActions {
  VIEW = 'view',
  CREATE = 'create',
  EDIT = 'edit',
  DELETE = 'delete'
}

// Workspace status
export enum WorkspaceStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DELETED = 'deleted'
}

// User status in workspace
export enum UserWorkspaceStatus {
  ACTIVE = 'active',
  INVITED = 'invited',
  SUSPENDED = 'suspended'
}

// Invite status
export enum InviteStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  EXPIRED = 'expired',
  REVOKED = 'revoked'
}

export default {
  IUser,
  IWorkspace,
  IRole,
  IInvite,
  ICounter,
  IAuditLog,
  IApiResponse,
  IApiError,
  IAuthRequest,
  IJWTPayload,
  IQueryParams,
  PERMISSION_MODULES,
  SystemRoles,
  PermissionActions,
  WorkspaceStatus,
  UserWorkspaceStatus,
  InviteStatus
};
