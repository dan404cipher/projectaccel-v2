import { Response } from 'express';
import { IAuthRequest } from '@/types';
export declare class WorkspaceController {
    static create(req: IAuthRequest, res: Response): Promise<void>;
    static getById(req: IAuthRequest, res: Response): Promise<void>;
    static update(req: IAuthRequest, res: Response): Promise<void>;
    static delete(req: IAuthRequest, res: Response): Promise<void>;
    static addMember(req: IAuthRequest, res: Response): Promise<void>;
    static removeMember(req: IAuthRequest, res: Response): Promise<void>;
    static updateMemberRole(req: IAuthRequest, res: Response): Promise<void>;
    static transferOwnership(req: IAuthRequest, res: Response): Promise<void>;
    static getMembers(req: IAuthRequest, res: Response): Promise<void>;
    static getStats(req: IAuthRequest, res: Response): Promise<void>;
    static search(req: IAuthRequest, res: Response): Promise<void>;
}
export default WorkspaceController;
//# sourceMappingURL=workspaceController.d.ts.map