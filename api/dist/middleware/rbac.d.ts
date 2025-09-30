import { Response, NextFunction } from 'express';
import { IAuthRequest, IPermissionSet } from '@/types';
import { Types } from 'mongoose';
export declare class RBACMiddleware {
    static hasPermission(module: string, action: 'view' | 'create' | 'edit' | 'delete', options?: {
        scope?: 'all' | 'assigned' | 'own';
        resourceOwnerId?: Types.ObjectId;
        userProjects?: Types.ObjectId[];
    }): (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    static requireWorkspacePermission(module: string, action: 'view' | 'create' | 'edit' | 'delete'): (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    static canAccessWorkspace(workspaceParam?: string): (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    static requireOwnership(resourceIdParam?: string): (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    static requireAdmin(): (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    static requireManager(): (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    private static checkScopePermission;
    static getUserPermissions(userId: Types.ObjectId, workspaceId: Types.ObjectId): Promise<IPermissionSet[]>;
    static hasUserPermission(userId: Types.ObjectId, workspaceId: Types.ObjectId, module: string, action: 'view' | 'create' | 'edit' | 'delete'): Promise<boolean>;
}
export default RBACMiddleware;
//# sourceMappingURL=rbac.d.ts.map