"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("@/models");
const jwt_1 = require("@/utils/jwt");
const apiError_1 = require("@/utils/apiError");
const env_1 = require("@/config/env");
const workspaceService_1 = require("./workspaceService");
const userService_1 = require("./userService");
class AuthService {
    static async signup(signupData) {
        const { name, email, password, workspaceName, designation, yearsOfExperience, } = signupData;
        const existingUser = await models_1.User.findByEmail(email);
        if (existingUser) {
            throw apiError_1.ApiError.conflict('User with this email already exists');
        }
        const user = new models_1.User({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password,
            designation: designation?.trim(),
            yearsOfExperience,
            isEmailVerified: env_1.config.isDevelopment(),
            isActive: true,
        });
        await user.save();
        try {
            const workspace = await workspaceService_1.WorkspaceService.create({
                name: workspaceName.trim(),
                ownerId: user._id,
                description: `${workspaceName} workspace`,
            });
            const defaultRoles = await models_1.Role.createDefaultRoles(workspace._id, user._id);
            const adminRole = defaultRoles.find((role) => role.name === 'Admin');
            if (!adminRole) {
                throw new Error('Failed to create admin role');
            }
            await user.addWorkspace(workspace._id, adminRole._id, user._id);
            await workspace.addMember(user._id, adminRole._id, user._id);
            workspace.settings.defaultRole = defaultRoles.find((role) => role.name === 'Member')?._id;
            await workspace.save();
            try {
                await userService_1.UserService.assignEmployeeId(user._id, workspace._id);
            }
            catch (error) {
                console.warn('Failed to assign Employee ID:', error);
            }
            const tokens = jwt_1.JWTUtil.generateWorkspaceToken(user._id, user.email, workspace._id, adminRole._id, user.isSuperAdmin);
            await user.addRefreshToken(tokens.refreshToken);
            return {
                user: user.getPublicProfile(),
                workspace: {
                    id: workspace._id,
                    workspaceId: workspace.workspaceId,
                    name: workspace.name,
                    role: adminRole.name,
                },
                tokens,
            };
        }
        catch (error) {
            await models_1.User.findByIdAndDelete(user._id);
            throw error;
        }
    }
    static async login(loginData, ipAddress, userAgent) {
        const { email, password, workspaceId } = loginData;
        const user = await models_1.User.findByEmailWithPassword(email);
        if (!user) {
            throw apiError_1.ApiError.unauthorized('Invalid email or password');
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw apiError_1.ApiError.unauthorized('Invalid email or password');
        }
        if (!user.isActive) {
            throw apiError_1.ApiError.unauthorized('Account is deactivated');
        }
        if (user.isSuperAdmin && user.workspaces.length > 0) {
            const activeWorkspace = user.workspaces.find(ws => ws.status === 'active');
            if (activeWorkspace) {
                const targetWorkspace = await models_1.Workspace.findById(activeWorkspace.workspaceId);
                const userRole = await models_1.Role.findById(activeWorkspace.roleId);
                if (targetWorkspace && userRole) {
                    const tokens = jwt_1.JWTUtil.generateWorkspaceToken(user._id, user.email, targetWorkspace._id, userRole._id, user.isSuperAdmin);
                    await user.addRefreshToken(tokens.refreshToken);
                    await user.updateLastLogin();
                    await models_1.AuditLog.logAction(user._id, 'login', 'auth', user._id, {
                        workspaceId: targetWorkspace._id,
                        details: { type: 'super_admin_with_workspace', workspaceId: targetWorkspace.workspaceId },
                        ipAddress,
                        userAgent,
                    });
                    return {
                        user: user.getWorkspaceProfile(targetWorkspace._id),
                        workspace: {
                            id: targetWorkspace._id,
                            workspaceId: targetWorkspace.workspaceId,
                            name: targetWorkspace.name,
                            role: userRole.name,
                        },
                        tokens,
                    };
                }
            }
        }
        if (user.isSuperAdmin) {
            const tokens = jwt_1.JWTUtil.generateSuperAdminToken(user._id, user.email);
            await user.addRefreshToken(tokens.refreshToken);
            await user.updateLastLogin();
            await models_1.AuditLog.logAction(user._id, 'login', 'auth', user._id, { details: { type: 'super_admin' }, ipAddress, userAgent });
            return {
                user: user.getPublicProfile(),
                tokens,
            };
        }
        if (!workspaceId && user.workspaces.length === 0) {
            throw apiError_1.ApiError.forbidden('No workspace access found');
        }
        let targetWorkspace;
        let userRole;
        if (workspaceId) {
            const workspace = await models_1.Workspace.findOne({
                $or: [
                    { _id: mongoose_1.Types.ObjectId.isValid(workspaceId) ? workspaceId : null },
                    { workspaceId: workspaceId },
                ],
                isActive: true,
            });
            if (!workspace) {
                throw apiError_1.ApiError.notFound('Workspace not found');
            }
            const workspaceMembership = user.workspaces.find(ws => ws.workspaceId.toString() === workspace._id.toString() &&
                ws.status === 'active');
            if (!workspaceMembership) {
                throw apiError_1.ApiError.forbidden('Access denied to this workspace');
            }
            targetWorkspace = workspace;
            userRole = await models_1.Role.findById(workspaceMembership.roleId);
        }
        else {
            const activeWorkspace = user.workspaces.find(ws => ws.status === 'active');
            if (!activeWorkspace) {
                throw apiError_1.ApiError.forbidden('No active workspace found');
            }
            targetWorkspace = await models_1.Workspace.findById(activeWorkspace.workspaceId);
            userRole = await models_1.Role.findById(activeWorkspace.roleId);
        }
        if (!targetWorkspace || !userRole) {
            throw apiError_1.ApiError.forbidden('Invalid workspace or role');
        }
        const tokens = jwt_1.JWTUtil.generateWorkspaceToken(user._id, user.email, targetWorkspace._id, userRole._id, user.isSuperAdmin);
        await user.addRefreshToken(tokens.refreshToken);
        await user.updateLastLogin();
        await models_1.AuditLog.logAction(user._id, 'login', 'auth', user._id, {
            workspaceId: targetWorkspace._id,
            details: { workspaceId: targetWorkspace.workspaceId },
            ipAddress,
            userAgent,
        });
        return {
            user: user.getWorkspaceProfile(targetWorkspace._id),
            workspace: {
                id: targetWorkspace._id,
                workspaceId: targetWorkspace.workspaceId,
                name: targetWorkspace.name,
                role: userRole.name,
            },
            tokens,
        };
    }
    static async refreshToken(refreshToken) {
        const decoded = jwt_1.JWTUtil.verifyRefreshToken(refreshToken);
        const user = await models_1.User.findById(decoded.userId).select('+refreshTokens');
        if (!user || !user.isActive) {
            throw apiError_1.ApiError.unauthorized('User not found or inactive');
        }
        if (!user.refreshTokens.includes(refreshToken)) {
            throw apiError_1.ApiError.unauthorized('Invalid refresh token');
        }
        const tokens = decoded.workspaceId && decoded.roleId
            ? jwt_1.JWTUtil.generateWorkspaceToken(user._id, user.email, decoded.workspaceId, decoded.roleId, decoded.isSuperAdmin)
            : jwt_1.JWTUtil.generateSuperAdminToken(user._id, user.email);
        await user.removeRefreshToken(refreshToken);
        await user.addRefreshToken(tokens.refreshToken);
        return tokens;
    }
    static async logout(userId, refreshToken) {
        const user = await models_1.User.findById(userId).select('+refreshTokens');
        if (!user) {
            throw apiError_1.ApiError.notFound('User not found');
        }
        await user.removeRefreshToken(refreshToken);
        await models_1.AuditLog.logAction(user._id, 'logout', 'auth', user._id, { details: { type: 'single_device' } });
    }
    static async logoutAll(userId) {
        const user = await models_1.User.findById(userId).select('+refreshTokens');
        if (!user) {
            throw apiError_1.ApiError.notFound('User not found');
        }
        await user.clearRefreshTokens();
        await models_1.AuditLog.logAction(user._id, 'logout', 'auth', user._id, { details: { type: 'all_devices' } });
    }
    static async switchWorkspace(userId, workspaceId) {
        const user = await models_1.User.findById(userId);
        if (!user || !user.isActive) {
            throw apiError_1.ApiError.notFound('User not found or inactive');
        }
        const workspace = await models_1.Workspace.findOne({
            $or: [
                { _id: mongoose_1.Types.ObjectId.isValid(workspaceId) ? workspaceId : null },
                { workspaceId: workspaceId },
            ],
            isActive: true,
        });
        if (!workspace) {
            throw apiError_1.ApiError.notFound('Workspace not found');
        }
        const workspaceMembership = user.workspaces.find(ws => ws.workspaceId.toString() === workspace._id.toString() &&
            ws.status === 'active');
        if (!workspaceMembership) {
            throw apiError_1.ApiError.forbidden('Access denied to this workspace');
        }
        const userRole = await models_1.Role.findById(workspaceMembership.roleId);
        if (!userRole) {
            throw apiError_1.ApiError.forbidden('Invalid role in workspace');
        }
        const tokens = jwt_1.JWTUtil.generateWorkspaceToken(user._id, user.email, workspace._id, userRole._id, user.isSuperAdmin);
        await user.addRefreshToken(tokens.refreshToken);
        return {
            user: user.getWorkspaceProfile(workspace._id),
            workspace: {
                id: workspace._id,
                workspaceId: workspace.workspaceId,
                name: workspace.name,
                role: userRole.name,
            },
            tokens,
        };
    }
    static async getUserWorkspaces(userId) {
        const user = await models_1.User.findById(userId).populate([
            {
                path: 'workspaces.workspaceId',
                select: 'name workspaceId description isActive',
            },
            {
                path: 'workspaces.roleId',
                select: 'name description',
            },
        ]);
        if (!user) {
            throw apiError_1.ApiError.notFound('User not found');
        }
        return user.workspaces
            .filter(ws => ws.status === 'active')
            .map(ws => ({
            id: ws.workspaceId._id,
            workspaceId: ws.workspaceId.workspaceId,
            name: ws.workspaceId.name,
            description: ws.workspaceId.description,
            role: {
                id: ws.roleId._id,
                name: ws.roleId.name,
                description: ws.roleId.description,
            },
            joinedAt: ws.joinedAt,
            status: ws.status,
        }));
    }
    static async verifyEmail(userId) {
        const user = await models_1.User.findById(userId);
        if (!user) {
            throw apiError_1.ApiError.notFound('User not found');
        }
        user.isEmailVerified = true;
        await user.save();
        await models_1.AuditLog.logAction(user._id, 'update', 'user', user._id, { details: { action: 'email_verified' } });
    }
}
exports.AuthService = AuthService;
exports.default = AuthService;
//# sourceMappingURL=authService.js.map