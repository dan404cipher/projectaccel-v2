"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const models_1 = require("@/models");
const apiError_1 = require("@/utils/apiError");
const types_1 = require("@/types");
class RoleService {
    static async create(workspaceId, roleData, createdBy) {
        const { name, description, permissions, inheritFrom, defaultAccessScope } = roleData;
        const workspace = await models_1.Workspace.findById(workspaceId);
        if (!workspace || !workspace.isActive) {
            throw apiError_1.ApiError.notFound('Workspace not found or inactive');
        }
        const existingRole = await models_1.Role.findOne({
            workspaceId,
            name: name.trim(),
            isActive: true,
        });
        if (existingRole) {
            throw apiError_1.ApiError.conflict('Role with this name already exists in workspace');
        }
        let parentRole = null;
        if (inheritFrom) {
            parentRole = await models_1.Role.findById(inheritFrom);
            if (!parentRole ||
                parentRole.workspaceId.toString() !== workspaceId.toString()) {
                throw apiError_1.ApiError.badRequest('Invalid parent role for this workspace');
            }
        }
        const validatedPermissions = RoleService.validatePermissions(permissions);
        const role = new models_1.Role({
            name: name.trim(),
            description: description?.trim(),
            workspaceId,
            isSystemRole: false,
            inheritFrom,
            permissions: validatedPermissions,
            defaultAccessScope: defaultAccessScope || 'workspace',
            isActive: true,
            createdBy,
        });
        await role.save();
        await models_1.AuditLog.logAction(createdBy, 'create', 'role', role._id, {
            workspaceId,
            details: {
                roleName: role.name,
                permissionCount: role.permissions.length,
                inheritFrom: parentRole?.name,
            },
        });
        return RoleService.formatRole(role);
    }
    static async getById(roleId) {
        const role = await models_1.Role.findById(roleId)
            .populate('workspaceId', 'name workspaceId')
            .populate('inheritFrom', 'name description')
            .populate('createdBy', 'name email');
        if (!role) {
            throw apiError_1.ApiError.notFound('Role not found');
        }
        return RoleService.formatRole(role);
    }
    static async update(roleId, updateData, updatedBy) {
        const role = await models_1.Role.findById(roleId);
        if (!role) {
            throw apiError_1.ApiError.notFound('Role not found');
        }
        if (role.isSystemRole) {
            throw apiError_1.ApiError.forbidden('System roles cannot be modified');
        }
        if (updateData.name) {
            const existingRole = await models_1.Role.findOne({
                workspaceId: role.workspaceId,
                name: updateData.name.trim(),
                _id: { $ne: roleId },
                isActive: true,
            });
            if (existingRole) {
                throw apiError_1.ApiError.conflict('Role with this name already exists in workspace');
            }
            role.name = updateData.name.trim();
        }
        if (updateData.description !== undefined) {
            role.description = updateData.description?.trim();
        }
        if (updateData.permissions) {
            role.permissions = RoleService.validatePermissions(updateData.permissions);
        }
        if (updateData.defaultAccessScope) {
            role.defaultAccessScope = updateData.defaultAccessScope;
        }
        if (updateData.isActive !== undefined) {
            role.isActive = updateData.isActive;
        }
        await role.save();
        await models_1.AuditLog.logAction(updatedBy, 'update', 'role', role._id, {
            workspaceId: role.workspaceId,
            details: {
                roleName: role.name,
                updated_fields: Object.keys(updateData),
            },
        });
        return RoleService.formatRole(role);
    }
    static async delete(roleId, deletedBy) {
        const role = await models_1.Role.findById(roleId);
        if (!role) {
            throw apiError_1.ApiError.notFound('Role not found');
        }
        if (role.isSystemRole) {
            throw apiError_1.ApiError.forbidden('System roles cannot be deleted');
        }
        const usersWithRole = await models_1.User.countDocuments({
            'workspaces.roleId': roleId,
        });
        if (usersWithRole > 0) {
            throw apiError_1.ApiError.conflict(`Role is assigned to ${usersWithRole} user(s) and cannot be deleted`);
        }
        role.isActive = false;
        await role.save();
        await models_1.AuditLog.logAction(deletedBy, 'delete', 'role', role._id, {
            workspaceId: role.workspaceId,
            details: { roleName: role.name },
        });
    }
    static async getWorkspaceRoles(workspaceId, queryParams = {}) {
        const { page = 1, limit = 50, search = '', sortBy = 'name', sortOrder = 'asc', includeInactive = false, isSystemRole, } = queryParams;
        const searchQuery = { workspaceId };
        if (!includeInactive) {
            searchQuery.isActive = true;
        }
        if (isSystemRole !== undefined) {
            searchQuery.isSystemRole = isSystemRole;
        }
        if (search) {
            searchQuery.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }
        const skip = (page - 1) * limit;
        const sortDirection = sortOrder === 'desc' ? -1 : 1;
        const total = await models_1.Role.countDocuments(searchQuery);
        const roles = await models_1.Role.find(searchQuery)
            .populate('inheritFrom', 'name description')
            .populate('createdBy', 'name email')
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(limit);
        const formattedRoles = roles.map(role => RoleService.formatRole(role));
        const totalPages = Math.ceil(total / limit);
        return {
            roles: formattedRoles,
            total,
            pagination: {
                page,
                limit,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            },
        };
    }
    static async getRoleWithUserCount(roleId) {
        const role = await models_1.Role.findById(roleId)
            .populate('workspaceId', 'name workspaceId')
            .populate('inheritFrom', 'name description')
            .populate('createdBy', 'name email');
        if (!role) {
            throw apiError_1.ApiError.notFound('Role not found');
        }
        const userCount = await models_1.User.countDocuments({
            'workspaces.roleId': roleId,
            'workspaces.status': 'active',
        });
        const formattedRole = RoleService.formatRole(role);
        formattedRole.userCount = userCount;
        return formattedRole;
    }
    static async duplicate(roleId, newName, createdBy) {
        const originalRole = await models_1.Role.findById(roleId);
        if (!originalRole) {
            throw apiError_1.ApiError.notFound('Role not found');
        }
        const existingRole = await models_1.Role.findOne({
            workspaceId: originalRole.workspaceId,
            name: newName.trim(),
            isActive: true,
        });
        if (existingRole) {
            throw apiError_1.ApiError.conflict('Role with this name already exists in workspace');
        }
        const duplicatedRole = new models_1.Role({
            name: newName.trim(),
            description: originalRole.description
                ? `Copy of ${originalRole.description}`
                : undefined,
            workspaceId: originalRole.workspaceId,
            isSystemRole: false,
            permissions: [...originalRole.permissions],
            defaultAccessScope: originalRole.defaultAccessScope,
            isActive: true,
            createdBy,
        });
        await duplicatedRole.save();
        await models_1.AuditLog.logAction(createdBy, 'create', 'role', duplicatedRole._id, {
            workspaceId: originalRole.workspaceId,
            details: {
                action: 'duplicate',
                originalRole: originalRole.name,
                newRole: duplicatedRole.name,
            },
        });
        return RoleService.formatRole(duplicatedRole);
    }
    static getPermissionTemplate() {
        const categories = {
            'Core Permissions': [
                types_1.PERMISSION_MODULES.PROJECTS,
                types_1.PERMISSION_MODULES.TASKS,
                types_1.PERMISSION_MODULES.SPRINTS,
                types_1.PERMISSION_MODULES.TEAM,
                types_1.PERMISSION_MODULES.FILES,
                types_1.PERMISSION_MODULES.REPORTS,
                types_1.PERMISSION_MODULES.WORKSPACE,
            ],
            'Team & User Management': [
                types_1.PERMISSION_MODULES.MEMBERS,
                types_1.PERMISSION_MODULES.ROLES,
            ],
            'Communication & Collaboration': [
                types_1.PERMISSION_MODULES.COMMENTS,
                types_1.PERMISSION_MODULES.NOTIFICATIONS,
                types_1.PERMISSION_MODULES.CHAT,
                types_1.PERMISSION_MODULES.MESSAGES,
            ],
            'Administration / Advanced': [
                types_1.PERMISSION_MODULES.BILLING,
                types_1.PERMISSION_MODULES.INTEGRATIONS,
                types_1.PERMISSION_MODULES.SETTINGS,
            ],
        };
        const template = {};
        Object.entries(categories).forEach(([categoryName, modules]) => {
            template[categoryName] = modules.map(module => ({
                module,
                permissions: {
                    view: false,
                    create: false,
                    edit: false,
                    delete: false,
                },
                scope: 'all',
            }));
        });
        return template;
    }
    static getDefaultRolePermissions(roleName) {
        const defaults = {
            Admin: Object.values(types_1.PERMISSION_MODULES).map(module => ({
                module,
                permissions: { view: true, create: true, edit: true, delete: true },
                scope: 'all',
            })),
            Manager: [
                {
                    module: types_1.PERMISSION_MODULES.PROJECTS,
                    permissions: { view: true, create: true, edit: true, delete: true },
                    scope: 'all',
                },
                {
                    module: types_1.PERMISSION_MODULES.TASKS,
                    permissions: { view: true, create: true, edit: true, delete: true },
                    scope: 'all',
                },
                {
                    module: types_1.PERMISSION_MODULES.SPRINTS,
                    permissions: { view: true, create: true, edit: true, delete: true },
                    scope: 'all',
                },
                {
                    module: types_1.PERMISSION_MODULES.TEAM,
                    permissions: { view: true, create: false, edit: true, delete: false },
                    scope: 'all',
                },
                {
                    module: types_1.PERMISSION_MODULES.FILES,
                    permissions: { view: true, create: true, edit: true, delete: true },
                    scope: 'all',
                },
                {
                    module: types_1.PERMISSION_MODULES.REPORTS,
                    permissions: { view: true, create: true, edit: true, delete: false },
                    scope: 'all',
                },
                {
                    module: types_1.PERMISSION_MODULES.MEMBERS,
                    permissions: { view: true, create: true, edit: true, delete: false },
                    scope: 'all',
                },
                {
                    module: types_1.PERMISSION_MODULES.COMMENTS,
                    permissions: { view: true, create: true, edit: true, delete: true },
                    scope: 'all',
                },
                {
                    module: types_1.PERMISSION_MODULES.NOTIFICATIONS,
                    permissions: { view: true, create: true, edit: true, delete: true },
                    scope: 'all',
                },
            ],
            Member: [
                {
                    module: types_1.PERMISSION_MODULES.PROJECTS,
                    permissions: {
                        view: true,
                        create: false,
                        edit: false,
                        delete: false,
                    },
                    scope: 'assigned',
                },
                {
                    module: types_1.PERMISSION_MODULES.TASKS,
                    permissions: { view: true, create: true, edit: true, delete: false },
                    scope: 'assigned',
                },
                {
                    module: types_1.PERMISSION_MODULES.SPRINTS,
                    permissions: {
                        view: true,
                        create: false,
                        edit: false,
                        delete: false,
                    },
                    scope: 'assigned',
                },
                {
                    module: types_1.PERMISSION_MODULES.TEAM,
                    permissions: {
                        view: true,
                        create: false,
                        edit: false,
                        delete: false,
                    },
                    scope: 'all',
                },
                {
                    module: types_1.PERMISSION_MODULES.FILES,
                    permissions: { view: true, create: true, edit: true, delete: false },
                    scope: 'assigned',
                },
                {
                    module: types_1.PERMISSION_MODULES.REPORTS,
                    permissions: {
                        view: true,
                        create: false,
                        edit: false,
                        delete: false,
                    },
                    scope: 'assigned',
                },
                {
                    module: types_1.PERMISSION_MODULES.COMMENTS,
                    permissions: { view: true, create: true, edit: true, delete: false },
                    scope: 'own',
                },
                {
                    module: types_1.PERMISSION_MODULES.NOTIFICATIONS,
                    permissions: { view: true, create: false, edit: true, delete: false },
                    scope: 'own',
                },
            ],
            Guest: [
                {
                    module: types_1.PERMISSION_MODULES.PROJECTS,
                    permissions: {
                        view: true,
                        create: false,
                        edit: false,
                        delete: false,
                    },
                    scope: 'assigned',
                },
                {
                    module: types_1.PERMISSION_MODULES.TASKS,
                    permissions: {
                        view: true,
                        create: false,
                        edit: false,
                        delete: false,
                    },
                    scope: 'assigned',
                },
                {
                    module: types_1.PERMISSION_MODULES.TEAM,
                    permissions: {
                        view: true,
                        create: false,
                        edit: false,
                        delete: false,
                    },
                    scope: 'all',
                },
                {
                    module: types_1.PERMISSION_MODULES.FILES,
                    permissions: {
                        view: true,
                        create: false,
                        edit: false,
                        delete: false,
                    },
                    scope: 'assigned',
                },
                {
                    module: types_1.PERMISSION_MODULES.COMMENTS,
                    permissions: { view: true, create: true, edit: false, delete: false },
                    scope: 'own',
                },
            ],
        };
        return defaults[roleName] || [];
    }
    static validatePermissions(permissions) {
        const validModules = Object.values(types_1.PERMISSION_MODULES);
        const validatedPermissions = [];
        for (const permission of permissions) {
            if (!validModules.includes(permission.module)) {
                throw apiError_1.ApiError.badRequest(`Invalid permission module: ${permission.module}`);
            }
            const perms = permission.permissions;
            if (typeof perms !== 'object' || perms === null) {
                throw apiError_1.ApiError.badRequest('Invalid permissions object');
            }
            const validatedPerms = {
                view: Boolean(perms.view),
                create: Boolean(perms.create),
                edit: Boolean(perms.edit),
                delete: Boolean(perms.delete),
            };
            const validScopes = ['all', 'assigned', 'own'];
            const scope = permission.scope || 'all';
            if (!validScopes.includes(scope)) {
                throw apiError_1.ApiError.badRequest(`Invalid permission scope: ${scope}`);
            }
            validatedPermissions.push({
                module: permission.module,
                permissions: validatedPerms,
                scope,
            });
        }
        return validatedPermissions;
    }
    static formatRole(role) {
        return {
            id: role._id,
            name: role.name,
            description: role.description,
            isSystemRole: role.isSystemRole,
            isActive: role.isActive,
            defaultAccessScope: role.defaultAccessScope,
            permissions: role.permissions,
            permissionMatrix: role.getPermissionMatrix(),
            workspace: role.workspaceId
                ? {
                    id: role.workspaceId._id || role.workspaceId,
                    name: role.workspaceId.name,
                    workspaceId: role.workspaceId.workspaceId,
                }
                : undefined,
            inheritFrom: role.inheritFrom
                ? {
                    id: role.inheritFrom._id || role.inheritFrom,
                    name: role.inheritFrom.name,
                    description: role.inheritFrom.description,
                }
                : undefined,
            createdBy: role.createdBy
                ? {
                    id: role.createdBy._id || role.createdBy,
                    name: role.createdBy.name,
                    email: role.createdBy.email,
                }
                : undefined,
            createdAt: role.createdAt,
            updatedAt: role.updatedAt,
        };
    }
    static async getWorkspaceRoleStats(workspaceId) {
        const roles = await models_1.Role.find({ workspaceId, isActive: true });
        const stats = {
            totalRoles: roles.length,
            systemRoles: roles.filter(r => r.isSystemRole).length,
            customRoles: roles.filter(r => !r.isSystemRole).length,
            roleDistribution: [],
        };
        for (const role of roles) {
            const userCount = await models_1.User.countDocuments({
                'workspaces.roleId': role._id,
                'workspaces.status': 'active',
            });
            stats.roleDistribution.push({
                id: role._id,
                name: role.name,
                isSystemRole: role.isSystemRole,
                userCount,
            });
        }
        return stats;
    }
    static convertFrontendPermissionsToBackend(frontendPermissions) {
        const backendPermissions = [];
        Object.entries(frontendPermissions).forEach(([categoryId, permissionSet]) => {
            const modules = types_1.PERMISSION_CATEGORY_MAPPING[categoryId];
            if (modules && permissionSet) {
                modules.forEach(module => {
                    backendPermissions.push({
                        module,
                        permissions: {
                            view: permissionSet.view || false,
                            create: permissionSet.create || false,
                            edit: permissionSet.edit || false,
                            delete: permissionSet.delete || false,
                        },
                    });
                });
            }
        });
        return backendPermissions;
    }
    static convertBackendPermissionsToFrontend(backendPermissions) {
        const frontendPermissions = {};
        Object.keys(types_1.PERMISSION_CATEGORY_MAPPING).forEach(categoryId => {
            frontendPermissions[categoryId] = {
                view: false,
                create: false,
                edit: false,
                delete: false,
            };
        });
        backendPermissions.forEach(permission => {
            Object.entries(types_1.PERMISSION_CATEGORY_MAPPING).forEach(([categoryId, modules]) => {
                if (Array.from(modules).includes(permission.module)) {
                    frontendPermissions[categoryId] = {
                        view: frontendPermissions[categoryId].view || permission.permissions.view,
                        create: frontendPermissions[categoryId].create || permission.permissions.create,
                        edit: frontendPermissions[categoryId].edit || permission.permissions.edit,
                        delete: frontendPermissions[categoryId].delete || permission.permissions.delete,
                    };
                }
            });
        });
        return frontendPermissions;
    }
}
exports.RoleService = RoleService;
exports.default = RoleService;
//# sourceMappingURL=roleService.js.map