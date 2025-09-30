import { Types } from 'mongoose';
import { IPermissionSet, IQueryParams } from '@/types';
export interface CreateRoleData {
    name: string;
    description?: string;
    permissions: IPermissionSet[];
    inheritFrom?: Types.ObjectId;
    defaultAccessScope?: 'workspace' | 'team' | 'own';
}
export interface UpdateRoleData {
    name?: string;
    description?: string;
    permissions?: IPermissionSet[];
    defaultAccessScope?: 'workspace' | 'team' | 'own';
    isActive?: boolean;
}
export declare class RoleService {
    static create(workspaceId: Types.ObjectId, roleData: CreateRoleData, createdBy: Types.ObjectId): Promise<any>;
    static getById(roleId: Types.ObjectId): Promise<any>;
    static update(roleId: Types.ObjectId, updateData: UpdateRoleData, updatedBy: Types.ObjectId): Promise<any>;
    static delete(roleId: Types.ObjectId, deletedBy: Types.ObjectId): Promise<void>;
    static getWorkspaceRoles(workspaceId: Types.ObjectId, queryParams?: IQueryParams & {
        includeInactive?: boolean;
        isSystemRole?: boolean;
    }): Promise<{
        roles: any[];
        total: number;
        pagination: any;
    }>;
    static getRoleWithUserCount(roleId: Types.ObjectId): Promise<any>;
    static duplicate(roleId: Types.ObjectId, newName: string, createdBy: Types.ObjectId): Promise<any>;
    static getPermissionTemplate(): any;
    static getDefaultRolePermissions(roleName: string): IPermissionSet[];
    private static validatePermissions;
    private static formatRole;
    static getWorkspaceRoleStats(workspaceId: Types.ObjectId): Promise<any>;
    static convertFrontendPermissionsToBackend(frontendPermissions: Record<string, any>): IPermissionSet[];
    static convertBackendPermissionsToFrontend(backendPermissions: IPermissionSet[]): Record<string, any>;
}
export default RoleService;
//# sourceMappingURL=roleService.d.ts.map