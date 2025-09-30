import { Types } from 'mongoose';
import { IQueryParams } from '@/types';
export interface CreateWorkspaceData {
    name: string;
    description?: string;
    ownerId: Types.ObjectId;
    settings?: {
        allowPublicInvites?: boolean;
        requireAdminApproval?: boolean;
        timezone?: string;
        language?: string;
    };
}
export interface UpdateWorkspaceData {
    name?: string;
    description?: string;
    settings?: {
        allowPublicInvites?: boolean;
        requireAdminApproval?: boolean;
        defaultRole?: Types.ObjectId;
        timezone?: string;
        language?: string;
    };
}
export declare class WorkspaceService {
    static create(data: CreateWorkspaceData): Promise<any>;
    static getById(id: string): Promise<any>;
    static update(workspaceId: Types.ObjectId, data: UpdateWorkspaceData, updatedBy: Types.ObjectId): Promise<any>;
    static delete(workspaceId: Types.ObjectId, deletedBy: Types.ObjectId): Promise<void>;
    static addMember(workspaceId: Types.ObjectId, userId: Types.ObjectId, roleId: Types.ObjectId, addedBy: Types.ObjectId): Promise<void>;
    static removeMember(workspaceId: Types.ObjectId, userId: Types.ObjectId, removedBy: Types.ObjectId): Promise<void>;
    static updateMemberRole(workspaceId: Types.ObjectId, userId: Types.ObjectId, newRoleId: Types.ObjectId, updatedBy: Types.ObjectId): Promise<void>;
    static transferOwnership(workspaceId: Types.ObjectId, newOwnerId: Types.ObjectId, currentOwnerId: Types.ObjectId): Promise<void>;
    static getMembers(workspaceId: Types.ObjectId, queryParams?: IQueryParams): Promise<{
        members: any[];
        total: number;
        pagination: any;
    }>;
    static getStats(workspaceId: Types.ObjectId): Promise<any>;
    static search(queryParams: IQueryParams & {
        ownerId?: string;
    }): Promise<{
        workspaces: any[];
        total: number;
        pagination: any;
    }>;
}
export default WorkspaceService;
//# sourceMappingURL=workspaceService.d.ts.map