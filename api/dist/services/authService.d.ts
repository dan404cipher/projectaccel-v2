import { Types } from 'mongoose';
import { IUserDocument } from '@/types/models';
export interface SignupData {
    name: string;
    email: string;
    password: string;
    workspaceName: string;
    designation?: string;
    yearsOfExperience?: string;
}
export interface LoginData {
    email: string;
    password: string;
    workspaceId?: string;
}
export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}
export interface AuthResult {
    user: IUserDocument;
    workspace?: any;
    tokens: TokenPair;
}
export declare class AuthService {
    static signup(signupData: SignupData): Promise<AuthResult>;
    static login(loginData: LoginData, ipAddress?: string, userAgent?: string): Promise<AuthResult>;
    static refreshToken(refreshToken: string): Promise<TokenPair>;
    static logout(userId: Types.ObjectId, refreshToken: string): Promise<void>;
    static logoutAll(userId: Types.ObjectId): Promise<void>;
    static switchWorkspace(userId: Types.ObjectId, workspaceId: string): Promise<AuthResult>;
    static getUserWorkspaces(userId: Types.ObjectId): Promise<any[]>;
    static verifyEmail(userId: Types.ObjectId): Promise<void>;
}
export default AuthService;
//# sourceMappingURL=authService.d.ts.map