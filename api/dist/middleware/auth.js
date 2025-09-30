"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateRefreshToken = exports.requireAnyPermission = exports.requirePermission = exports.requireSpecificWorkspace = exports.requireWorkspace = exports.requireSuperAdmin = exports.optionalAuth = exports.authenticate = void 0;
const models_1 = require("@/models");
const jwt_1 = require("@/utils/jwt");
const apiError_1 = require("@/utils/apiError");
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        const token = jwt_1.JWTUtil.extractTokenFromHeader(authHeader);
        if (!token) {
            throw new apiError_1.ApiError(401, 'Access token required');
        }
        const decoded = jwt_1.JWTUtil.verifyAccessToken(token);
        const user = await models_1.User.findById(decoded.userId);
        if (!user || !user.isActive) {
            throw new apiError_1.ApiError(401, 'User not found or inactive');
        }
        req.user = {
            id: user._id,
            email: user.email,
            ...(decoded.workspaceId && { workspaceId: decoded.workspaceId }),
            ...(decoded.roleId && { roleId: decoded.roleId }),
            isSuperAdmin: decoded.isSuperAdmin || false,
        };
        if (decoded.workspaceId && decoded.roleId) {
            const role = await models_1.Role.findById(decoded.roleId);
            if (role && req.user) {
                req.user.permissions = role.permissions;
            }
        }
        next();
    }
    catch (error) {
        if (error instanceof apiError_1.ApiError) {
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
exports.authenticate = authenticate;
const optionalAuth = async (req, _res, next) => {
    try {
        const authHeader = req.header('Authorization');
        const token = jwt_1.JWTUtil.extractTokenFromHeader(authHeader);
        if (token) {
            const decoded = jwt_1.JWTUtil.verifyAccessToken(token);
            const user = await models_1.User.findById(decoded.userId);
            if (user && user.isActive) {
                req.user = {
                    id: user._id,
                    email: user.email,
                    ...(decoded.workspaceId && { workspaceId: decoded.workspaceId }),
                    ...(decoded.roleId && { roleId: decoded.roleId }),
                    isSuperAdmin: decoded.isSuperAdmin || false,
                };
                if (decoded.workspaceId && decoded.roleId) {
                    const role = await models_1.Role.findById(decoded.roleId);
                    if (role && req.user) {
                        req.user.permissions = role.permissions;
                    }
                }
            }
        }
        next();
    }
    catch (error) {
        next();
    }
};
exports.optionalAuth = optionalAuth;
const requireSuperAdmin = (req, res, next) => {
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
exports.requireSuperAdmin = requireSuperAdmin;
const requireWorkspace = (req, res, next) => {
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
exports.requireWorkspace = requireWorkspace;
const requireSpecificWorkspace = (workspaceParam = 'workspaceId') => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Authentication required',
            });
            return;
        }
        const requestedWorkspaceId = req.params[workspaceParam] || req.body[workspaceParam];
        if (!requestedWorkspaceId) {
            res.status(400).json({
                success: false,
                message: 'Workspace ID required',
            });
            return;
        }
        if (req.user.isSuperAdmin) {
            return next();
        }
        if (!req.user.workspaceId ||
            req.user.workspaceId.toString() !== requestedWorkspaceId) {
            res.status(403).json({
                success: false,
                message: 'Access denied to this workspace',
            });
            return;
        }
        next();
    };
};
exports.requireSpecificWorkspace = requireSpecificWorkspace;
const requirePermission = (module, action) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Authentication required',
            });
            return;
        }
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
        const permission = req.user.permissions.find((p) => p.module === module);
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
exports.requirePermission = requirePermission;
const requireAnyPermission = (permissions) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Authentication required',
            });
            return;
        }
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
        const hasPermission = permissions.some(({ module, action }) => {
            const permission = req.user.permissions.find((p) => p.module === module);
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
exports.requireAnyPermission = requireAnyPermission;
const authenticateRefreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.body.refreshToken || req.cookies.refreshToken;
        if (!refreshToken) {
            throw new apiError_1.ApiError(401, 'Refresh token required');
        }
        const decoded = jwt_1.JWTUtil.verifyRefreshToken(refreshToken);
        const user = await models_1.User.findById(decoded.userId).select('+refreshTokens');
        if (!user || !user.isActive) {
            throw new apiError_1.ApiError(401, 'User not found or inactive');
        }
        if (!user.refreshTokens.includes(refreshToken)) {
            throw new apiError_1.ApiError(401, 'Invalid refresh token');
        }
        req.user = {
            id: user._id,
            email: user.email,
            ...(decoded.workspaceId && { workspaceId: decoded.workspaceId }),
            ...(decoded.roleId && { roleId: decoded.roleId }),
            isSuperAdmin: decoded.isSuperAdmin || false,
        };
        req.body.currentRefreshToken = refreshToken;
        next();
    }
    catch (error) {
        if (error instanceof apiError_1.ApiError) {
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
exports.authenticateRefreshToken = authenticateRefreshToken;
exports.default = {
    authenticate: exports.authenticate,
    optionalAuth: exports.optionalAuth,
    requireSuperAdmin: exports.requireSuperAdmin,
    requireWorkspace: exports.requireWorkspace,
    requireSpecificWorkspace: exports.requireSpecificWorkspace,
    requirePermission: exports.requirePermission,
    requireAnyPermission: exports.requireAnyPermission,
    authenticateRefreshToken: exports.authenticateRefreshToken,
};
//# sourceMappingURL=auth.js.map