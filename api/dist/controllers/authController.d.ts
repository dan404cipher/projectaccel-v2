import { Request, Response } from 'express';
import { IAuthRequest } from '@/types';
export declare class AuthController {
    static signup(req: Request, res: Response): Promise<void>;
    static login(req: Request, res: Response): Promise<void>;
    static refreshToken(req: IAuthRequest, res: Response): Promise<void>;
    static logout(req: IAuthRequest, res: Response): Promise<void>;
    static logoutAll(req: IAuthRequest, res: Response): Promise<void>;
    static switchWorkspace(req: IAuthRequest, res: Response): Promise<void>;
    static getUserWorkspaces(req: IAuthRequest, res: Response): Promise<void>;
    static getProfile(req: IAuthRequest, res: Response): Promise<void>;
    static verifyEmail(req: IAuthRequest, res: Response): Promise<void>;
}
export default AuthController;
//# sourceMappingURL=authController.d.ts.map