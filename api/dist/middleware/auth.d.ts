import { Response, NextFunction } from 'express';
import { IAuthRequest } from '@/types';
export declare const authenticate: (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const optionalAuth: (req: IAuthRequest, _res: Response, next: NextFunction) => Promise<void>;
export declare const requireSuperAdmin: (req: IAuthRequest, res: Response, next: NextFunction) => void;
export declare const requireWorkspace: (req: IAuthRequest, res: Response, next: NextFunction) => void;
export declare const requireSpecificWorkspace: (workspaceParam?: string) => (req: IAuthRequest, res: Response, next: NextFunction) => void;
export declare const requirePermission: (module: string, action: "view" | "create" | "edit" | "delete") => (req: IAuthRequest, res: Response, next: NextFunction) => void;
export declare const requireAnyPermission: (permissions: Array<{
    module: string;
    action: "view" | "create" | "edit" | "delete";
}>) => (req: IAuthRequest, res: Response, next: NextFunction) => void;
export declare const authenticateRefreshToken: (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void>;
declare const _default: {
    authenticate: (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void>;
    optionalAuth: (req: IAuthRequest, _res: Response, next: NextFunction) => Promise<void>;
    requireSuperAdmin: (req: IAuthRequest, res: Response, next: NextFunction) => void;
    requireWorkspace: (req: IAuthRequest, res: Response, next: NextFunction) => void;
    requireSpecificWorkspace: (workspaceParam?: string) => (req: IAuthRequest, res: Response, next: NextFunction) => void;
    requirePermission: (module: string, action: "view" | "create" | "edit" | "delete") => (req: IAuthRequest, res: Response, next: NextFunction) => void;
    requireAnyPermission: (permissions: Array<{
        module: string;
        action: "view" | "create" | "edit" | "delete";
    }>) => (req: IAuthRequest, res: Response, next: NextFunction) => void;
    authenticateRefreshToken: (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default _default;
//# sourceMappingURL=auth.d.ts.map