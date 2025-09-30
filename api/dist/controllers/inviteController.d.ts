import { Request, Response } from 'express';
import { IAuthRequest } from '@/types';
export declare class InviteController {
    static create(req: IAuthRequest, res: Response): Promise<void>;
    static accept(req: Request, res: Response): Promise<void>;
    static revoke(req: IAuthRequest, res: Response): Promise<void>;
    static resend(req: IAuthRequest, res: Response): Promise<void>;
    static getByToken(req: Request, res: Response): Promise<void>;
    static getWorkspaceInvites(req: IAuthRequest, res: Response): Promise<void>;
    static getUserInvites(req: Request, res: Response): Promise<void>;
    static getStats(req: IAuthRequest, res: Response): Promise<void>;
}
export default InviteController;
//# sourceMappingURL=inviteController.d.ts.map