"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTUtil = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("@/config/env");
class JWTUtil {
    static generateAccessToken(payload) {
        return jsonwebtoken_1.default.sign({ ...payload, type: 'access' }, env_1.config.JWT_ACCESS_SECRET, {
            expiresIn: env_1.config.JWT_ACCESS_EXPIRES_IN,
            issuer: 'projectaccel-api',
            audience: 'projectaccel-app',
        });
    }
    static generateRefreshToken(payload) {
        return jsonwebtoken_1.default.sign({ ...payload, type: 'refresh' }, env_1.config.JWT_REFRESH_SECRET, {
            expiresIn: env_1.config.JWT_REFRESH_EXPIRES_IN,
            issuer: 'projectaccel-api',
            audience: 'projectaccel-app',
        });
    }
    static generateTokenPair(userId, email, options = {}) {
        const payload = {
            userId,
            email,
            ...options,
        };
        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload),
        };
    }
    static verifyAccessToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, env_1.config.JWT_ACCESS_SECRET, {
                issuer: 'projectaccel-api',
                audience: 'projectaccel-app',
            });
            if (decoded.type !== 'access') {
                throw new Error('Invalid token type');
            }
            return decoded;
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                throw new Error('Access token expired');
            }
            if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                throw new Error('Invalid access token');
            }
            throw error;
        }
    }
    static verifyRefreshToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, env_1.config.JWT_REFRESH_SECRET, {
                issuer: 'projectaccel-api',
                audience: 'projectaccel-app',
            });
            if (decoded.type !== 'refresh') {
                throw new Error('Invalid token type');
            }
            return decoded;
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                throw new Error('Refresh token expired');
            }
            if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                throw new Error('Invalid refresh token');
            }
            throw error;
        }
    }
    static decodeToken(token) {
        try {
            return jsonwebtoken_1.default.decode(token);
        }
        catch (error) {
            return null;
        }
    }
    static isTokenExpired(token) {
        try {
            const decoded = this.decodeToken(token);
            if (!decoded || !decoded.exp)
                return true;
            return Date.now() >= decoded.exp * 1000;
        }
        catch (error) {
            return true;
        }
    }
    static getTokenExpiry(token) {
        try {
            const decoded = this.decodeToken(token);
            if (!decoded || !decoded.exp)
                return null;
            return new Date(decoded.exp * 1000);
        }
        catch (error) {
            return null;
        }
    }
    static extractTokenFromHeader(authHeader) {
        if (!authHeader)
            return null;
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer')
            return null;
        return parts[1];
    }
    static generateWorkspaceToken(userId, email, workspaceId, roleId, isSuperAdmin = false) {
        return this.generateTokenPair(userId, email, {
            workspaceId,
            roleId,
            isSuperAdmin,
        });
    }
    static generateSuperAdminToken(userId, email) {
        return this.generateTokenPair(userId, email, {
            isSuperAdmin: true,
        });
    }
}
exports.JWTUtil = JWTUtil;
exports.default = JWTUtil;
//# sourceMappingURL=jwt.js.map