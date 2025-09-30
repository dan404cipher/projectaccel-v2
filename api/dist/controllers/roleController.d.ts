import { Request, Response } from 'express';
import { IAuthRequest } from '@/types';
export declare class RoleController {
    static create(req: IAuthRequest, res: Response): Promise<void>;
    static getById(req: IAuthRequest, res: Response): Promise<void>;
    static update(req: IAuthRequest, res: Response): Promise<void>;
    static delete(req: IAuthRequest, res: Response): Promise<void>;
    static getWorkspaceRoles(req: IAuthRequest, res: Response): Promise<void>;
    static getRoleWithUserCount(req: IAuthRequest, res: Response): Promise<void>;
    static duplicate(req: IAuthRequest, res: Response): Promise<void>;
    static getPermissionTemplate(_req: Request, res: Response): void;
    static getDefaultPermissions(req: Request, res: Response): void;
    static getStats(req: IAuthRequest, res: Response): Promise<void>;
    static getPermissionModules(_req: Request, res: Response): void;
    static getRolesFrontendFormat(req: IAuthRequest, res: Response): Promise<void>;
}
export default RoleController;
//# sourceMappingURL=roleController.d.ts.map