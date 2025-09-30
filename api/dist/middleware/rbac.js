"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RBACMiddleware = void 0;
const types_1 = require("@/types");
const models_1 = require("@/models");
const apiError_1 = require("@/utils/apiError");
class RBACMiddleware {
    static hasPermission(module, action, options = {}) {
        return async (req, res, next) => {
            try {
                if (!req.user) {
                    throw apiError_1.ApiError.unauthorized('Authentication required');
                }
                if (req.user.isSuperAdmin) {
                    return next();
                }
                if (!req.user.permissions) {
                    throw apiError_1.ApiError.forbidden('No permissions assigned');
                }
                const permission = req.user.permissions.find((p) => p.module === module);
                if (!permission || !permission.permissions[action]) {
                    throw apiError_1.ApiError.forbidden(`Permission denied: ${action} access to ${module} required`);
                }
                if (options.scope && permission.scope) {
                    const isAuthorized = await RBACMiddleware.checkScopePermission(req.user.id, permission.scope, options);
                    if (!isAuthorized) {
                        throw apiError_1.ApiError.forbidden('Insufficient scope permissions');
                    }
                }
                next();
            }
            catch (error) {
                if (error instanceof apiError_1.ApiError) {
                    return res.status(error.statusCode).json({
                        success: false,
                        message: error.message,
                    });
                }
                return res.status(500).json({
                    success: false,
                    message: 'Permission check failed',
                });
            }
        };
    }
    static requireWorkspacePermission(module, action) {
        return async (req, res, next) => {
            try {
                if (!req.user) {
                    throw apiError_1.ApiError.unauthorized('Authentication required');
                }
                if (req.user.isSuperAdmin) {
                    return next();
                }
                if (!req.user.workspaceId) {
                    throw apiError_1.ApiError.forbidden('Workspace access required');
                }
                const user = await models_1.User.findById(req.user.id).populate({
                    path: 'workspaces.roleId',
                    match: { workspaceId: req.user.workspaceId },
                });
                if (!user) {
                    throw apiError_1.ApiError.notFound('User not found');
                }
                const workspaceMembership = user.workspaces.find(ws => ws.workspaceId.toString() === req.user.workspaceId.toString());
                if (!workspaceMembership || workspaceMembership.status !== 'active') {
                    throw apiError_1.ApiError.forbidden('Not an active member of this workspace');
                }
                const role = await models_1.Role.findById(workspaceMembership.roleId);
                if (!role || !role.isActive) {
                    throw apiError_1.ApiError.forbidden('Invalid or inactive role');
                }
                const permission = role.permissions.find((p) => p.module === module);
                if (!permission || !permission.permissions[action]) {
                    throw apiError_1.ApiError.forbidden(`Permission denied: ${action} access to ${module} required`);
                }
                req.user.permissions = role.permissions;
                next();
            }
            catch (error) {
                if (error instanceof apiError_1.ApiError) {
                    return res.status(error.statusCode).json({
                        success: false,
                        message: error.message,
                    });
                }
                return res.status(500).json({
                    success: false,
                    message: 'Workspace permission check failed',
                });
            }
        };
    }
    static canAccessWorkspace(workspaceParam = 'workspaceId') {
        return async (req, res, next) => {
            try {
                if (!req.user) {
                    throw apiError_1.ApiError.unauthorized('Authentication required');
                }
                const workspaceId = req.params[workspaceParam] || req.body[workspaceParam];
                if (!workspaceId) {
                    throw apiError_1.ApiError.badRequest('Workspace ID required');
                }
                if (req.user.isSuperAdmin) {
                    return next();
                }
                const workspace = await models_1.Workspace.findById(workspaceId);
                if (!workspace || !workspace.isActive) {
                    throw apiError_1.ApiError.notFound('Workspace not found or inactive');
                }
                const user = await models_1.User.findById(req.user.id);
                if (!user) {
                    throw apiError_1.ApiError.notFound('User not found');
                }
                const workspaceMembership = user.workspaces.find(ws => ws.workspaceId.toString() === workspaceId);
                if (!workspaceMembership || workspaceMembership.status !== 'active') {
                    throw apiError_1.ApiError.forbidden('Access denied to this workspace');
                }
                next();
            }
            catch (error) {
                if (error instanceof apiError_1.ApiError) {
                    return res.status(error.statusCode).json({
                        success: false,
                        message: error.message,
                    });
                }
                return res.status(500).json({
                    success: false,
                    message: 'Workspace access check failed',
                });
            }
        };
    }
    static requireOwnership(resourceIdParam = 'id') {
        return async (req, res, next) => {
            try {
                if (!req.user) {
                    throw apiError_1.ApiError.unauthorized('Authentication required');
                }
                if (req.user.isSuperAdmin) {
                    return next();
                }
                const resourceId = req.params[resourceIdParam];
                if (!resourceId) {
                    throw apiError_1.ApiError.badRequest('Resource ID required');
                }
                next();
            }
            catch (error) {
                if (error instanceof apiError_1.ApiError) {
                    return res.status(error.statusCode).json({
                        success: false,
                        message: error.message,
                    });
                }
                return res.status(500).json({
                    success: false,
                    message: 'Ownership check failed',
                });
            }
        };
    }
    static requireAdmin() {
        return RBACMiddleware.hasPermission(types_1.PERMISSION_MODULES.MEMBERS, 'create');
    }
    static requireManager() {
        return async (req, res, next) => {
            try {
                if (!req.user) {
                    throw apiError_1.ApiError.unauthorized('Authentication required');
                }
                if (req.user.isSuperAdmin) {
                    return next();
                }
                if (!req.user.permissions) {
                    throw apiError_1.ApiError.forbidden('No permissions assigned');
                }
                const hasManagerPermissions = req.user.permissions.some((p) => (p.module === types_1.PERMISSION_MODULES.PROJECTS &&
                    p.permissions.create) ||
                    (p.module === types_1.PERMISSION_MODULES.MEMBERS && p.permissions.edit));
                if (!hasManagerPermissions) {
                    throw apiError_1.ApiError.forbidden('Manager-level permissions required');
                }
                next();
            }
            catch (error) {
                if (error instanceof apiError_1.ApiError) {
                    return res.status(error.statusCode).json({
                        success: false,
                        message: error.message,
                    });
                }
                return res.status(500).json({
                    success: false,
                    message: 'Manager permission check failed',
                });
            }
        };
    }
    static async checkScopePermission(userId, scope, options) {
        switch (scope) {
            case 'all':
                return true;
            case 'own':
                return options.resourceOwnerId
                    ? options.resourceOwnerId.toString() === userId.toString()
                    : true;
            case 'assigned':
                return options.userProjects
                    ? options.userProjects.some(projectId => projectId.toString() === userId.toString())
                    : true;
            default:
                return false;
        }
    }
    static async getUserPermissions(userId, workspaceId) {
        const user = await models_1.User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        if (user.isSuperAdmin) {
            return Object.values(types_1.PERMISSION_MODULES).map(module => ({
                module,
                permissions: { view: true, create: true, edit: true, delete: true },
                scope: 'all',
            }));
        }
        const workspaceMembership = user.workspaces.find(ws => ws.workspaceId.toString() === workspaceId.toString());
        if (!workspaceMembership || workspaceMembership.status !== 'active') {
            return [];
        }
        const role = await models_1.Role.findById(workspaceMembership.roleId);
        return role ? role.permissions : [];
    }
    static async hasUserPermission(userId, workspaceId, module, action) {
        const permissions = await RBACMiddleware.getUserPermissions(userId, workspaceId);
        const permission = permissions.find(p => p.module === module);
        return permission ? permission.permissions[action] : false;
    }
}
exports.RBACMiddleware = RBACMiddleware;
exports.default = RBACMiddleware;
//# sourceMappingURL=rbac.js.map