import { Document, Types } from 'mongoose';
import { Request } from 'express';
export interface ITimestamps {
    createdAt: Date;
    updatedAt: Date;
}
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
    empId?: string;
}
export interface IUserWorkspace {
    workspaceId: Types.ObjectId;
    roleId: Types.ObjectId;
    joinedAt: Date;
    invitedBy?: Types.ObjectId;
    status: 'active' | 'invited' | 'suspended';
}
export interface IWorkspace extends Document, ITimestamps {
    _id: Types.ObjectId;
    name: string;
    workspaceId: string;
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
    empIdPrefix?: string;
    empIdCounter?: number;
}
export interface IWorkspaceMember {
    userId: Types.ObjectId;
    roleId: Types.ObjectId;
    joinedAt: Date;
    invitedBy?: Types.ObjectId;
    status: 'active' | 'invited' | 'suspended';
}
export interface IRole extends Document, ITimestamps {
    _id: Types.ObjectId;
    name: string;
    description?: string;
    workspaceId: Types.ObjectId;
    isSystemRole: boolean;
    inheritFrom?: Types.ObjectId;
    permissions: IPermissionSet[];
    defaultAccessScope: 'workspace' | 'team' | 'own';
    isActive: boolean;
    createdBy: Types.ObjectId;
}
export interface IPermissionSet {
    module: string;
    permissions: {
        view: boolean;
        create: boolean;
        edit: boolean;
        delete: boolean;
    };
    scope?: 'all' | 'assigned' | 'own';
}
export declare const PERMISSION_MODULES: {
    readonly PROJECTS: "projects";
    readonly TASKS: "tasks";
    readonly SPRINTS: "sprints";
    readonly TEAM: "team";
    readonly FILES: "files";
    readonly REPORTS: "reports";
    readonly WORKSPACE: "workspace";
    readonly MEMBERS: "members";
    readonly ROLES: "roles";
    readonly COMMENTS: "comments";
    readonly NOTIFICATIONS: "notifications";
    readonly CHAT: "chat";
    readonly MESSAGES: "messages";
    readonly BILLING: "billing";
    readonly INTEGRATIONS: "integrations";
    readonly SETTINGS: "settings";
};
export declare const PERMISSION_CATEGORIES: {
    readonly CORE: "core";
    readonly TEAM_MANAGEMENT: "team_management";
    readonly COMMUNICATION: "communication";
    readonly ADMINISTRATION: "administration";
};
export declare const PERMISSION_CATEGORY_MAPPING: {
    readonly core: readonly ["projects", "tasks", "sprints", "team", "files", "reports", "workspace"];
    readonly team_management: readonly ["members", "roles"];
    readonly communication: readonly ["comments", "notifications", "chat", "messages"];
    readonly administration: readonly ["billing", "integrations", "settings"];
};
export type PermissionModule = (typeof PERMISSION_MODULES)[keyof typeof PERMISSION_MODULES];
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
export interface ICounter extends Document {
    _id: string;
    sequence: number;
}
export interface IAuditLog extends Document, ITimestamps {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    workspaceId?: Types.ObjectId;
    action: string;
    resource: string;
    resourceId: Types.ObjectId;
    details?: Record<string, any>;
    ipAddress?: string;
    userAgent?: string;
}
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
export interface IJWTPayload {
    userId: Types.ObjectId;
    email: string;
    workspaceId?: Types.ObjectId;
    roleId?: Types.ObjectId;
    isSuperAdmin?: boolean;
    type: 'access' | 'refresh';
}
export interface IQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    filters?: Record<string, any>;
}
export declare enum SystemRoles {
    SUPER_ADMIN = "super_admin",
    ADMIN = "admin",
    MANAGER = "manager",
    MEMBER = "member",
    GUEST = "guest"
}
export declare enum PermissionActions {
    VIEW = "view",
    CREATE = "create",
    EDIT = "edit",
    DELETE = "delete"
}
export declare enum WorkspaceStatus {
    ACTIVE = "active",
    SUSPENDED = "suspended",
    DELETED = "deleted"
}
export declare enum UserWorkspaceStatus {
    ACTIVE = "active",
    INVITED = "invited",
    SUSPENDED = "suspended"
}
export declare enum InviteStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    EXPIRED = "expired",
    REVOKED = "revoked"
}
declare const _default: {
    PERMISSION_MODULES: {
        readonly PROJECTS: "projects";
        readonly TASKS: "tasks";
        readonly SPRINTS: "sprints";
        readonly TEAM: "team";
        readonly FILES: "files";
        readonly REPORTS: "reports";
        readonly WORKSPACE: "workspace";
        readonly MEMBERS: "members";
        readonly ROLES: "roles";
        readonly COMMENTS: "comments";
        readonly NOTIFICATIONS: "notifications";
        readonly CHAT: "chat";
        readonly MESSAGES: "messages";
        readonly BILLING: "billing";
        readonly INTEGRATIONS: "integrations";
        readonly SETTINGS: "settings";
    };
    SystemRoles: typeof SystemRoles;
    PermissionActions: typeof PermissionActions;
    WorkspaceStatus: typeof WorkspaceStatus;
    UserWorkspaceStatus: typeof UserWorkspaceStatus;
    InviteStatus: typeof InviteStatus;
};
export default _default;
//# sourceMappingURL=index.d.ts.map