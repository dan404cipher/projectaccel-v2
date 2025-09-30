import { Model, Types } from 'mongoose';
import { IUser, IWorkspace, IRole, IInvite, IAuditLog, IUserWorkspace, IWorkspaceMember, ICounter } from './index';
export interface IUserModel extends Model<IUser> {
    findByEmail(email: string): Promise<IUser | null>;
    findByEmailWithPassword(email: string): Promise<IUser | null>;
}
export interface IUserDocument extends IUser {
    comparePassword(candidatePassword: string): Promise<boolean>;
    addWorkspace(workspaceId: Types.ObjectId, roleId: Types.ObjectId, invitedBy?: Types.ObjectId): Promise<IUserDocument>;
    removeWorkspace(workspaceId: Types.ObjectId): Promise<IUserDocument>;
    updateWorkspaceRole(workspaceId: Types.ObjectId, newRoleId: Types.ObjectId): Promise<IUserDocument>;
    getWorkspace(workspaceId: Types.ObjectId): IUserWorkspace | undefined;
    isInWorkspace(workspaceId: Types.ObjectId): boolean;
    addRefreshToken(token: string): Promise<IUserDocument>;
    removeRefreshToken(token: string): Promise<IUserDocument>;
    clearRefreshTokens(): Promise<IUserDocument>;
    updateLastLogin(): Promise<IUserDocument>;
    getPublicProfile(): any;
    getWorkspaceProfile(workspaceId: Types.ObjectId): any;
}
export interface IRoleModel extends Model<IRole> {
    createDefaultRoles(workspaceId: Types.ObjectId, createdBy: Types.ObjectId): Promise<IRole[]>;
}
export interface IRoleDocument extends IRole {
}
export interface IAuditLogModel extends Model<IAuditLog> {
    logAction(userId: Types.ObjectId, action: string, resource: string, resourceId: Types.ObjectId, details?: any, workspaceId?: Types.ObjectId): Promise<IAuditLog>;
}
export interface IAuditLogDocument extends IAuditLog {
}
export interface IWorkspaceModel extends Model<IWorkspace> {
    findByWorkspaceId(workspaceId: string): Promise<IWorkspace | null>;
}
export interface IWorkspaceDocument extends IWorkspace {
    addMember(userId: Types.ObjectId, roleId: Types.ObjectId, invitedBy?: Types.ObjectId): Promise<IWorkspaceDocument>;
    removeMember(userId: Types.ObjectId): Promise<IWorkspaceDocument>;
    updateMemberRole(userId: Types.ObjectId, newRoleId: Types.ObjectId): Promise<IWorkspaceDocument>;
    transferOwnership(newOwnerId: Types.ObjectId): Promise<IWorkspaceDocument>;
    getActiveMembersCount(): number;
    getMembersByStatus(status: string): IWorkspaceMember[];
}
export interface IInviteModel extends Model<IInvite> {
}
export interface IInviteDocument extends IInvite {
}
export interface ICounterModel extends Model<ICounter> {
    getNextSequence(name: string): Promise<number>;
    generateWorkspaceId(): Promise<string>;
}
export interface ICounterDocument extends ICounter {
}
//# sourceMappingURL=models.d.ts.map