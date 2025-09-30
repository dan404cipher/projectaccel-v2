import { Response } from 'express';
import { IAuthRequest } from '@/types';
export declare class UserController {
    static create(req: IAuthRequest, res: Response): Promise<void>;
    static getById(req: IAuthRequest, res: Response): Promise<void>;
    static update(req: IAuthRequest, res: Response): Promise<void>;
    static updateRole(req: IAuthRequest, res: Response): Promise<void>;
    static deactivate(req: IAuthRequest, res: Response): Promise<void>;
    static reactivate(req: IAuthRequest, res: Response): Promise<void>;
    static removeFromWorkspace(req: IAuthRequest, res: Response): Promise<void>;
    static getWorkspaceUsers(req: IAuthRequest, res: Response): Promise<void>;
    static searchAll(req: IAuthRequest, res: Response): Promise<void>;
    static getStats(req: IAuthRequest, res: Response): Promise<void>;
    static testAssignEmpId(req: IAuthRequest, res: Response): Promise<void>;
}
export default UserController;
//# sourceMappingURL=userController.d.ts.map