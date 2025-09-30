import { Types } from 'mongoose';
import { IQueryParams } from '@/types';
export interface CreateUserData {
    name: string;
    email: string;
    password: string;
    designation?: string;
    yearsOfExperience?: string;
    roleId: Types.ObjectId;
    workspaceId: Types.ObjectId;
    sendInvite?: boolean;
}
export interface UpdateUserData {
    name?: string;
    designation?: string;
    yearsOfExperience?: string;
    isActive?: boolean;
    profilePicture?: string;
    empId?: string;
}
export interface UpdateUserRoleData {
    roleId: Types.ObjectId;
}
export declare class UserService {
    static create(userData: CreateUserData, createdBy: Types.ObjectId): Promise<any>;
    static getById(userId: Types.ObjectId, workspaceId?: Types.ObjectId): Promise<any>;
    static update(userId: Types.ObjectId, updateData: UpdateUserData, updatedBy: Types.ObjectId, workspaceId?: Types.ObjectId): Promise<any>;
    static updateRole(userId: Types.ObjectId, workspaceId: Types.ObjectId, roleData: UpdateUserRoleData, updatedBy: Types.ObjectId): Promise<any>;
    static deactivate(userId: Types.ObjectId, deactivatedBy: Types.ObjectId, workspaceId?: Types.ObjectId): Promise<void>;
    static reactivate(userId: Types.ObjectId, reactivatedBy: Types.ObjectId, workspaceId?: Types.ObjectId): Promise<void>;
    static removeFromWorkspace(userId: Types.ObjectId, workspaceId: Types.ObjectId, removedBy: Types.ObjectId): Promise<void>;
    static getWorkspaceUsers(workspaceId: Types.ObjectId, queryParams?: IQueryParams & {
        status?: 'active' | 'invited' | 'suspended';
        roleId?: string;
    }): Promise<{
        users: any[];
        total: number;
        pagination: any;
    }>;
    static searchAll(queryParams?: IQueryParams & {
        workspaceId?: string;
        isSuperAdmin?: boolean;
        isActive?: boolean;
    }): Promise<{
        users: any[];
        total: number;
        pagination: any;
    }>;
    static getWorkspaceStats(workspaceId: Types.ObjectId): Promise<any>;
    static generateEmployeeId(workspaceId: Types.ObjectId): Promise<string>;
    static assignEmployeeId(userId: Types.ObjectId, workspaceId: Types.ObjectId): Promise<string>;
}
export default UserService;
//# sourceMappingURL=userService.d.ts.map