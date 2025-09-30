import { Response, NextFunction } from 'express';
import { IAuthRequest, IPermissionSet } from '@/types';
import { User, Role } from '@/models';
import { JWTUtil } from '@/utils/jwt';
import { ApiError } from '@/utils/apiError';

/**
 * Authentication middleware to verify JWT tokens and attach user to request
 */
export const authenticate = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Extract token from Authorization header
    const authHeader = req.header('Authorization');
    const token = JWTUtil.extractTokenFromHeader(authHeader);

    if (!token) {
      throw new ApiError(401, 'Access token required');
    }

    // Verify token
    const decoded = JWTUtil.verifyAccessToken(token);

    // Find user and ensure they're active
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      throw new ApiError(401, 'User not found or inactive');
    }

    // Attach user info to request
    req.user = {
      id: user._id,
      email: user.email,
      ...(decoded.workspaceId && { workspaceId: decoded.workspaceId }),
      ...(decoded.roleId && { roleId: decoded.roleId }),
      isSuperAdmin: decoded.isSuperAdmin || false,
    };

    // If token includes workspace info, get user's permissions
    if (decoded.workspaceId && decoded.roleId) {
      const role = await Role.findById(decoded.roleId);
      if (role && req.user) {
        req.user.permissions = role.permissions;
      }
    }

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

/**
 * Optional authentication middleware - doesn't fail if no token provided
 */
export const optionalAuth = async (
  req: IAuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.header('Authorization');
    const token = JWTUtil.extractTokenFromHeader(authHeader);

    if (token) {
      // If token is provided, verify it
      const decoded = JWTUtil.verifyAccessToken(token);
      const user = await User.findById(decoded.userId);

      if (user && user.isActive) {
        req.user = {
          id: user._id,
          email: user.email,
          ...(decoded.workspaceId && { workspaceId: decoded.workspaceId }),
          ...(decoded.roleId && { roleId: decoded.roleId }),
          isSuperAdmin: decoded.isSuperAdmin || false,
        };

        if (decoded.workspaceId && decoded.roleId) {
          const role = await Role.findById(decoded.roleId);
          if (role && req.user) {
            req.user.permissions = role.permissions;
          }
        }
      }
    }

    next();
  } catch (error) {
    // For optional auth, continue even if token is invalid
    next();
  }
};

/**
 * Middleware to require super admin privileges
 */
export const requireSuperAdmin = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
    return;
  }

  if (!req.user.isSuperAdmin) {
    res.status(403).json({
      success: false,
      message: 'Super admin privileges required',
    });
    return;
  }

  next();
};

/**
 * Middleware to require workspace membership
 */
export const requireWorkspace = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
    return;
  }

  if (!req.user.workspaceId) {
    res.status(403).json({
      success: false,
      message: 'Workspace access required',
    });
    return;
  }

  next();
};

/**
 * Middleware to require specific workspace (from params or body)
 */
export const requireSpecificWorkspace = (
  workspaceParam: string = 'workspaceId'
) => {
  return (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
      return;
    }

    const requestedWorkspaceId =
      req.params[workspaceParam] || req.body[workspaceParam];

    if (!requestedWorkspaceId) {
      res.status(400).json({
        success: false,
        message: 'Workspace ID required',
      });
      return;
    }

    // Super admins can access any workspace
    if (req.user.isSuperAdmin) {
      return next();
    }

    // Check if user has access to the requested workspace
    if (
      !req.user.workspaceId ||
      req.user.workspaceId.toString() !== requestedWorkspaceId
    ) {
      res.status(403).json({
        success: false,
        message: 'Access denied to this workspace',
      });
      return;
    }

    next();
  };
};

/**
 * Create middleware to check specific permission
 */
export const requirePermission = (
  module: string,
  action: 'view' | 'create' | 'edit' | 'delete'
) => {
  return (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
      return;
    }

    // Super admins have all permissions
    if (req.user.isSuperAdmin) {
      return next();
    }

    // Check if user has the required permission
    if (!req.user.permissions) {
      res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
      });
      return;
    }

    const permission = req.user.permissions.find(
      (p: IPermissionSet) => p.module === module
    );
    if (!permission || !permission.permissions[action]) {
      res.status(403).json({
        success: false,
        message: `Permission denied: ${action} access to ${module} required`,
      });
      return;
    }

    next();
  };
};

/**
 * Create middleware to check multiple permissions (any one required)
 */
export const requireAnyPermission = (
  permissions: Array<{
    module: string;
    action: 'view' | 'create' | 'edit' | 'delete';
  }>
) => {
  return (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
      return;
    }

    // Super admins have all permissions
    if (req.user.isSuperAdmin) {
      return next();
    }

    if (!req.user.permissions) {
      res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
      });
      return;
    }

    // Check if user has any of the required permissions
    const hasPermission = permissions.some(({ module, action }) => {
      const permission = req.user!.permissions!.find(
        (p: IPermissionSet) => p.module === module
      );
      return permission && permission.permissions[action];
    });

    if (!hasPermission) {
      res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
      });
      return;
    }

    next();
  };
};

/**
 * Refresh token middleware for token refresh endpoints
 */
export const authenticateRefreshToken = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const refreshToken = req.body.refreshToken || req.cookies.refreshToken;

    if (!refreshToken) {
      throw new ApiError(401, 'Refresh token required');
    }

    // Verify refresh token
    const decoded = JWTUtil.verifyRefreshToken(refreshToken);

    // Find user and verify refresh token exists
    const user = await User.findById(decoded.userId).select('+refreshTokens');
    if (!user || !user.isActive) {
      throw new ApiError(401, 'User not found or inactive');
    }

    if (!user.refreshTokens.includes(refreshToken)) {
      throw new ApiError(401, 'Invalid refresh token');
    }

    req.user = {
      id: user._id,
      email: user.email,
      ...(decoded.workspaceId && { workspaceId: decoded.workspaceId }),
      ...(decoded.roleId && { roleId: decoded.roleId }),
      isSuperAdmin: decoded.isSuperAdmin || false,
    };

    // Store the refresh token for removal/rotation
    req.body.currentRefreshToken = refreshToken;

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(401).json({
      success: false,
      message: 'Invalid or expired refresh token',
    });
  }
};

export default {
  authenticate,
  optionalAuth,
  requireSuperAdmin,
  requireWorkspace,
  requireSpecificWorkspace,
  requirePermission,
  requireAnyPermission,
  authenticateRefreshToken,
};
