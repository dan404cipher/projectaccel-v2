import { IJWTPayload } from '@/types';
import { Types } from 'mongoose';
export declare class JWTUtil {
    static generateAccessToken(payload: Omit<IJWTPayload, 'type'>): string;
    static generateRefreshToken(payload: Omit<IJWTPayload, 'type'>): string;
    static generateTokenPair(userId: Types.ObjectId, email: string, options?: {
        workspaceId?: Types.ObjectId;
        roleId?: Types.ObjectId;
        isSuperAdmin?: boolean;
    }): {
        accessToken: string;
        refreshToken: string;
    };
    static verifyAccessToken(token: string): IJWTPayload;
    static verifyRefreshToken(token: string): IJWTPayload;
    static decodeToken(token: string): IJWTPayload | null;
    static isTokenExpired(token: string): boolean;
    static getTokenExpiry(token: string): Date | null;
    static extractTokenFromHeader(authHeader?: string): string | null;
    static generateWorkspaceToken(userId: Types.ObjectId, email: string, workspaceId: Types.ObjectId, roleId: Types.ObjectId, isSuperAdmin?: boolean): {
        accessToken: string;
        refreshToken: string;
    };
    static generateSuperAdminToken(userId: Types.ObjectId, email: string): {
        accessToken: string;
        refreshToken: string;
    };
}
export default JWTUtil;
//# sourceMappingURL=jwt.d.ts.map