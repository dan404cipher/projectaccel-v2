import jwt from 'jsonwebtoken';
import { config } from '@/config/env';
import { IJWTPayload } from '@/types';
import { Types } from 'mongoose';

/**
 * JWT utility functions for token generation and verification
 */
export class JWTUtil {
  /**
   * Generate access token
   */
  static generateAccessToken(payload: Omit<IJWTPayload, 'type'>): string {
    return jwt.sign({ ...payload, type: 'access' }, config.JWT_ACCESS_SECRET, {
      expiresIn: config.JWT_ACCESS_EXPIRES_IN,
      issuer: 'projectaccel-api',
      audience: 'projectaccel-app',
    } as any);
  }

  /**
   * Generate refresh token
   */
  static generateRefreshToken(payload: Omit<IJWTPayload, 'type'>): string {
    return jwt.sign(
      { ...payload, type: 'refresh' },
      config.JWT_REFRESH_SECRET,
      {
        expiresIn: config.JWT_REFRESH_EXPIRES_IN,
        issuer: 'projectaccel-api',
        audience: 'projectaccel-app',
      } as any
    );
  }

  /**
   * Generate both access and refresh tokens
   */
  static generateTokenPair(
    userId: Types.ObjectId,
    email: string,
    options: {
      workspaceId?: Types.ObjectId;
      roleId?: Types.ObjectId;
      isSuperAdmin?: boolean;
    } = {}
  ): { accessToken: string; refreshToken: string } {
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

  /**
   * Verify access token
   */
  static verifyAccessToken(token: string): IJWTPayload {
    try {
      const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET, {
        issuer: 'projectaccel-api',
        audience: 'projectaccel-app',
      }) as IJWTPayload;

      if (decoded.type !== 'access') {
        throw new Error('Invalid token type');
      }

      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Access token expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid access token');
      }
      throw error;
    }
  }

  /**
   * Verify refresh token
   */
  static verifyRefreshToken(token: string): IJWTPayload {
    try {
      const decoded = jwt.verify(token, config.JWT_REFRESH_SECRET, {
        issuer: 'projectaccel-api',
        audience: 'projectaccel-app',
      }) as IJWTPayload;

      if (decoded.type !== 'refresh') {
        throw new Error('Invalid token type');
      }

      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Refresh token expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid refresh token');
      }
      throw error;
    }
  }

  /**
   * Decode token without verification (for inspection)
   */
  static decodeToken(token: string): IJWTPayload | null {
    try {
      return jwt.decode(token) as IJWTPayload;
    } catch (error) {
      return null;
    }
  }

  /**
   * Check if token is expired without throwing
   */
  static isTokenExpired(token: string): boolean {
    try {
      const decoded = this.decodeToken(token) as any;
      if (!decoded || !decoded.exp) return true;

      return Date.now() >= decoded.exp * 1000;
    } catch (error) {
      return true;
    }
  }

  /**
   * Get token expiry date
   */
  static getTokenExpiry(token: string): Date | null {
    try {
      const decoded = this.decodeToken(token) as any;
      if (!decoded || !decoded.exp) return null;

      return new Date(decoded.exp * 1000);
    } catch (error) {
      return null;
    }
  }

  /**
   * Extract token from Authorization header
   */
  static extractTokenFromHeader(authHeader?: string): string | null {
    if (!authHeader) return null;

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return null;

    return parts[1];
  }

  /**
   * Generate a workspace-specific token
   */
  static generateWorkspaceToken(
    userId: Types.ObjectId,
    email: string,
    workspaceId: Types.ObjectId,
    roleId: Types.ObjectId,
    isSuperAdmin: boolean = false
  ): { accessToken: string; refreshToken: string } {
    return this.generateTokenPair(userId, email, {
      workspaceId,
      roleId,
      isSuperAdmin,
    });
  }

  /**
   * Generate a super admin token
   */
  static generateSuperAdminToken(
    userId: Types.ObjectId,
    email: string
  ): { accessToken: string; refreshToken: string } {
    return this.generateTokenPair(userId, email, {
      isSuperAdmin: true,
    });
  }
}

export default JWTUtil;
