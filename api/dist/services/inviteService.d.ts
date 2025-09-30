import { Types } from 'mongoose';
import { IQueryParams } from '@/types';
export interface CreateInviteData {
    email: string;
    workspaceId: Types.ObjectId;
    roleId: Types.ObjectId;
    invitedBy: Types.ObjectId;
}
export interface AcceptInviteData {
    token: string;
    password?: string;
    name?: string;
}
export declare class InviteService {
    static create(inviteData: CreateInviteData): Promise<any>;
    static accept(acceptData: AcceptInviteData): Promise<any>;
    static revoke(inviteId: Types.ObjectId, revokedBy: Types.ObjectId): Promise<void>;
    static resend(inviteId: Types.ObjectId, resentBy: Types.ObjectId): Promise<any>;
    static getByToken(token: string): Promise<any>;
    static getWorkspaceInvites(workspaceId: Types.ObjectId, queryParams?: IQueryParams & {
        status?: string;
    }): Promise<{
        invites: any[];
        total: number;
        pagination: any;
    }>;
    static getUserInvites(email: string): Promise<any[]>;
    static getWorkspaceStats(workspaceId: Types.ObjectId): Promise<any>;
    static cleanupExpired(): Promise<void>;
    private static sendInviteEmail;
}
export default InviteService;
//# sourceMappingURL=inviteService.d.ts.map