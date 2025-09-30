"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const services_1 = require("@/services");
const types_1 = require("@/types");
const apiError_1 = require("@/utils/apiError");
const mongoose_1 = require("mongoose");
class RoleController {
    static async create(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            if (!req.user.workspaceId) {
                throw apiError_1.ApiError.badRequest('Workspace context required');
            }
            const { roleName, roleDescription, permissions, inheritFrom, defaultAccessScope, assignedUsers, } = req.body;
            if (!roleName || !permissions) {
                throw apiError_1.ApiError.badRequest('Role name and permissions are required');
            }
            const backendPermissions = services_1.RoleService.convertFrontendPermissionsToBackend(permissions);
            const role = await services_1.RoleService.create(req.user.workspaceId, {
                name: roleName,
                description: roleDescription,
                permissions: backendPermissions,
                ...(inheritFrom && { inheritFrom: new mongoose_1.Types.ObjectId(inheritFrom) }),
                defaultAccessScope: defaultAccessScope || 'workspace',
            }, req.user.id);
            if (assignedUsers && assignedUsers.length > 0) {
            }
            const response = {
                success: true,
                message: 'Role created successfully',
                data: { role },
            };
            res.status(201).json(response);
        }
        catch (error) {
            if (error instanceof apiError_1.ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        }
    }
    static async getById(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const { id } = req.params;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw apiError_1.ApiError.badRequest('Invalid role ID');
            }
            const role = await services_1.RoleService.getById(new mongoose_1.Types.ObjectId(id));
            const response = {
                success: true,
                message: 'Role retrieved successfully',
                data: { role },
            };
            res.status(200).json(response);
        }
        catch (error) {
            if (error instanceof apiError_1.ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        }
    }
    static async update(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const { id } = req.params;
            const { name, description, permissions, defaultAccessScope, isActive } = req.body;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw apiError_1.ApiError.badRequest('Invalid role ID');
            }
            const role = await services_1.RoleService.update(new mongoose_1.Types.ObjectId(id), { name, description, permissions, defaultAccessScope, isActive }, req.user.id);
            const response = {
                success: true,
                message: 'Role updated successfully',
                data: { role },
            };
            res.status(200).json(response);
        }
        catch (error) {
            if (error instanceof apiError_1.ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        }
    }
    static async delete(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const { id } = req.params;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw apiError_1.ApiError.badRequest('Invalid role ID');
            }
            await services_1.RoleService.delete(new mongoose_1.Types.ObjectId(id), req.user.id);
            const response = {
                success: true,
                message: 'Role deleted successfully',
            };
            res.status(200).json(response);
        }
        catch (error) {
            if (error instanceof apiError_1.ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        }
    }
    static async getWorkspaceRoles(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            if (!req.user.workspaceId) {
                throw apiError_1.ApiError.badRequest('Workspace context required');
            }
            const { page = 1, limit = 50, search = '', sortBy = 'name', sortOrder = 'asc', includeInactive = false, isSystemRole, } = req.query;
            const result = await services_1.RoleService.getWorkspaceRoles(req.user.workspaceId, {
                page: Number(page),
                limit: Number(limit),
                search: String(search),
                sortBy: String(sortBy),
                sortOrder: sortOrder,
                includeInactive: includeInactive === 'true',
                ...(isSystemRole !== undefined && {
                    isSystemRole: isSystemRole === 'true',
                }),
            });
            const response = {
                success: true,
                message: 'Roles retrieved successfully',
                data: result.roles,
                meta: {
                    pagination: result.pagination,
                },
            };
            res.status(200).json(response);
        }
        catch (error) {
            if (error instanceof apiError_1.ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        }
    }
    static async getRoleWithUserCount(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const { id } = req.params;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw apiError_1.ApiError.badRequest('Invalid role ID');
            }
            const role = await services_1.RoleService.getRoleWithUserCount(new mongoose_1.Types.ObjectId(id));
            const response = {
                success: true,
                message: 'Role details retrieved successfully',
                data: { role },
            };
            res.status(200).json(response);
        }
        catch (error) {
            if (error instanceof apiError_1.ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        }
    }
    static async duplicate(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const { id } = req.params;
            const { newName } = req.body;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw apiError_1.ApiError.badRequest('Invalid role ID');
            }
            if (!newName) {
                throw apiError_1.ApiError.badRequest('New role name is required');
            }
            const role = await services_1.RoleService.duplicate(new mongoose_1.Types.ObjectId(id), newName, req.user.id);
            const response = {
                success: true,
                message: 'Role duplicated successfully',
                data: { role },
            };
            res.status(201).json(response);
        }
        catch (error) {
            if (error instanceof apiError_1.ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        }
    }
    static getPermissionTemplate(_req, res) {
        try {
            const template = services_1.RoleService.getPermissionTemplate();
            const response = {
                success: true,
                message: 'Permission template retrieved successfully',
                data: { template },
            };
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static getDefaultPermissions(req, res) {
        try {
            const { roleName } = req.params;
            if (!roleName) {
                throw apiError_1.ApiError.badRequest('Role name is required');
            }
            const permissions = services_1.RoleService.getDefaultRolePermissions(roleName);
            const response = {
                success: true,
                message: 'Default permissions retrieved successfully',
                data: { permissions },
            };
            res.status(200).json(response);
        }
        catch (error) {
            if (error instanceof apiError_1.ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        }
    }
    static async getStats(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            if (!req.user.workspaceId) {
                throw apiError_1.ApiError.badRequest('Workspace context required');
            }
            const stats = await services_1.RoleService.getWorkspaceRoleStats(req.user.workspaceId);
            const response = {
                success: true,
                message: 'Role statistics retrieved successfully',
                data: { stats },
            };
            res.status(200).json(response);
        }
        catch (error) {
            if (error instanceof apiError_1.ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        }
    }
    static getPermissionModules(_req, res) {
        try {
            const modules = Object.entries(types_1.PERMISSION_MODULES).map(([key, value]) => ({
                key,
                value,
                displayName: key.toLowerCase().replace(/_/g, ' '),
            }));
            const categorizedModules = {
                'Core Permissions': [
                    { key: 'PROJECTS', value: 'projects', displayName: 'Projects' },
                    { key: 'TASKS', value: 'tasks', displayName: 'Tasks' },
                    { key: 'SPRINTS', value: 'sprints', displayName: 'Sprints' },
                    { key: 'TEAM', value: 'team', displayName: 'Team' },
                    { key: 'FILES', value: 'files', displayName: 'Files & Documents' },
                    { key: 'REPORTS', value: 'reports', displayName: 'Reports' },
                    { key: 'WORKSPACE', value: 'workspace', displayName: 'Workspace' },
                ],
                'Team & User Management': [
                    { key: 'MEMBERS', value: 'members', displayName: 'Members' },
                    { key: 'ROLES', value: 'roles', displayName: 'Roles & Permissions' },
                ],
                'Communication & Collaboration': [
                    { key: 'COMMENTS', value: 'comments', displayName: 'Comments' },
                    {
                        key: 'NOTIFICATIONS',
                        value: 'notifications',
                        displayName: 'Notifications',
                    },
                    { key: 'CHAT', value: 'chat', displayName: 'Community Chat' },
                    {
                        key: 'MESSAGES',
                        value: 'messages',
                        displayName: 'Direct Messages',
                    },
                ],
                'Administration / Advanced': [
                    {
                        key: 'BILLING',
                        value: 'billing',
                        displayName: 'Billing & Subscription',
                    },
                    {
                        key: 'INTEGRATIONS',
                        value: 'integrations',
                        displayName: 'Integrations',
                    },
                    {
                        key: 'SETTINGS',
                        value: 'settings',
                        displayName: 'System Settings',
                    },
                ],
            };
            const response = {
                success: true,
                message: 'Permission modules retrieved successfully',
                data: {
                    modules,
                    categorized: categorizedModules,
                },
            };
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async getRolesFrontendFormat(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const response = {
                success: true,
                message: 'Roles retrieved successfully',
                data: { roles: [] },
            };
            res.status(200).json(response);
        }
        catch (error) {
            if (error instanceof apiError_1.ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        }
    }
}
exports.RoleController = RoleController;
exports.default = RoleController;
//# sourceMappingURL=roleController.js.map