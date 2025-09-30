"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const models_1 = require("@/models");
const apiError_1 = require("@/utils/apiError");
const inviteService_1 = require("./inviteService");
class UserService {
    static async create(userData, createdBy) {
        const { name, email, password, designation, yearsOfExperience, roleId, workspaceId, sendInvite = false, } = userData;
        const existingUser = await models_1.User.findByEmail(email);
        if (existingUser) {
            throw apiError_1.ApiError.conflict('User with this email already exists');
        }
        const workspace = await models_1.Workspace.findById(workspaceId);
        if (!workspace || !workspace.isActive) {
            throw apiError_1.ApiError.notFound('Workspace not found or inactive');
        }
        const role = await models_1.Role.findById(roleId);
        if (!role || role.workspaceId.toString() !== workspaceId.toString()) {
            throw apiError_1.ApiError.badRequest('Invalid role for this workspace');
        }
        const user = new models_1.User({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password,
            designation: designation?.trim(),
            yearsOfExperience,
            isEmailVerified: false,
            isActive: true,
            createdBy,
        });
        await user.save();
        try {
            if (sendInvite) {
                await inviteService_1.InviteService.create({
                    email: user.email,
                    workspaceId,
                    roleId,
                    invitedBy: createdBy,
                });
                user.workspaces.push({
                    workspaceId,
                    roleId,
                    joinedAt: new Date(),
                    invitedBy: createdBy,
                    status: 'invited',
                });
                workspace.members.push({
                    userId: user._id,
                    roleId,
                    joinedAt: new Date(),
                    invitedBy: createdBy,
                    status: 'invited',
                });
            }
            else {
                await user.addWorkspace(workspaceId, roleId, createdBy);
                await workspace.addMember(user._id, roleId, createdBy);
            }
            await user.save();
            await workspace.save();
            await models_1.AuditLog.logAction(createdBy, 'create', 'user', user._id, {
                workspaceId,
                details: {
                    action: sendInvite ? 'create_user_with_invite' : 'create_user_direct',
                    role: role.name,
                    email: user.email,
                },
            });
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                designation: user.designation,
                yearsOfExperience: user.yearsOfExperience,
                isActive: user.isActive,
                isEmailVerified: user.isEmailVerified,
                role: {
                    id: role._id,
                    name: role.name,
                },
                status: sendInvite ? 'invited' : 'active',
                createdAt: user.createdAt,
            };
        }
        catch (error) {
            await models_1.User.findByIdAndDelete(user._id);
            throw error;
        }
    }
    static async getById(userId, workspaceId) {
        const user = await models_1.User.findById(userId)
            .populate('workspaces.workspaceId', 'name workspaceId')
            .populate('workspaces.roleId', 'name description')
            .populate('createdBy', 'name email');
        if (!user || !user.isActive) {
            throw apiError_1.ApiError.notFound('User not found or inactive');
        }
        if (workspaceId) {
            const workspaceMembership = user.workspaces.find(ws => ws.workspaceId._id.toString() === workspaceId.toString());
            if (!workspaceMembership) {
                throw apiError_1.ApiError.forbidden('User is not a member of this workspace');
            }
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                designation: user.designation,
                yearsOfExperience: user.yearsOfExperience,
                profilePicture: user.profilePicture,
                isEmailVerified: user.isEmailVerified,
                lastLogin: user.lastLogin,
                workspace: {
                    id: workspaceMembership.workspaceId._id,
                    name: workspaceMembership.workspaceId.name,
                    workspaceId: workspaceMembership.workspaceId.workspaceId,
                    role: {
                        id: workspaceMembership.roleId._id,
                        name: workspaceMembership.roleId.name,
                        description: workspaceMembership.roleId.description,
                    },
                    joinedAt: workspaceMembership.joinedAt,
                    status: workspaceMembership.status,
                },
                createdAt: user.createdAt,
                createdBy: user.createdBy,
            };
        }
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            designation: user.designation,
            yearsOfExperience: user.yearsOfExperience,
            profilePicture: user.profilePicture,
            isEmailVerified: user.isEmailVerified,
            isSuperAdmin: user.isSuperAdmin,
            lastLogin: user.lastLogin,
            workspaces: user.workspaces.map(ws => ({
                id: ws.workspaceId._id,
                name: ws.workspaceId.name,
                workspaceId: ws.workspaceId.workspaceId,
                role: {
                    id: ws.roleId._id,
                    name: ws.roleId.name,
                    description: ws.roleId.description,
                },
                joinedAt: ws.joinedAt,
                status: ws.status,
            })),
            createdAt: user.createdAt,
            createdBy: user.createdBy,
        };
    }
    static async update(userId, updateData, updatedBy, workspaceId) {
        const user = await models_1.User.findById(userId);
        if (!user || !user.isActive) {
            throw apiError_1.ApiError.notFound('User not found or inactive');
        }
        if (updateData.name)
            user.name = updateData.name.trim();
        if (updateData.designation !== undefined)
            user.designation = updateData.designation?.trim();
        if (updateData.yearsOfExperience)
            user.yearsOfExperience = updateData.yearsOfExperience;
        if (updateData.profilePicture !== undefined)
            user.profilePicture = updateData.profilePicture;
        if (updateData.isActive !== undefined)
            user.isActive = updateData.isActive;
        if (updateData.empId !== undefined)
            user.empId = updateData.empId;
        await user.save();
        await models_1.AuditLog.logAction(updatedBy, 'update', 'user', user._id, {
            workspaceId,
            details: { updated_fields: Object.keys(updateData) },
        });
        return UserService.getById(userId, workspaceId);
    }
    static async updateRole(userId, workspaceId, roleData, updatedBy) {
        const user = await models_1.User.findById(userId);
        if (!user || !user.isActive) {
            throw apiError_1.ApiError.notFound('User not found or inactive');
        }
        const workspace = await models_1.Workspace.findById(workspaceId);
        if (!workspace || !workspace.isActive) {
            throw apiError_1.ApiError.notFound('Workspace not found or inactive');
        }
        const role = await models_1.Role.findById(roleData.roleId);
        if (!role || role.workspaceId.toString() !== workspaceId.toString()) {
            throw apiError_1.ApiError.badRequest('Invalid role for this workspace');
        }
        await user.updateWorkspaceRole(workspaceId, roleData.roleId);
        await workspace.updateMemberRole(userId, roleData.roleId);
        await models_1.AuditLog.logAction(updatedBy, 'update', 'user', user._id, {
            workspaceId,
            details: { action: 'update_role', newRole: role.name },
        });
        return UserService.getById(userId, workspaceId);
    }
    static async deactivate(userId, deactivatedBy, workspaceId) {
        const user = await models_1.User.findById(userId);
        if (!user) {
            throw apiError_1.ApiError.notFound('User not found');
        }
        if (user.isSuperAdmin) {
            throw apiError_1.ApiError.forbidden('Cannot deactivate super admin');
        }
        user.isActive = false;
        await user.save();
        await user.clearRefreshTokens();
        await models_1.AuditLog.logAction(deactivatedBy, 'update', 'user', user._id, {
            workspaceId,
            details: { action: 'deactivate' },
        });
    }
    static async reactivate(userId, reactivatedBy, workspaceId) {
        const user = await models_1.User.findById(userId);
        if (!user) {
            throw apiError_1.ApiError.notFound('User not found');
        }
        user.isActive = true;
        await user.save();
        await models_1.AuditLog.logAction(reactivatedBy, 'update', 'user', user._id, {
            workspaceId,
            details: { action: 'reactivate' },
        });
    }
    static async removeFromWorkspace(userId, workspaceId, removedBy) {
        const user = await models_1.User.findById(userId);
        if (!user) {
            throw apiError_1.ApiError.notFound('User not found');
        }
        const workspace = await models_1.Workspace.findById(workspaceId);
        if (!workspace || !workspace.isActive) {
            throw apiError_1.ApiError.notFound('Workspace not found or inactive');
        }
        if (workspace.ownerId.toString() === userId.toString()) {
            throw apiError_1.ApiError.badRequest('Cannot remove workspace owner');
        }
        await workspace.removeMember(userId);
        await user.removeWorkspace(workspaceId);
        await models_1.AuditLog.logAction(removedBy, 'delete', 'user', user._id, {
            workspaceId,
            details: { action: 'remove_from_workspace' },
        });
    }
    static async getWorkspaceUsers(workspaceId, queryParams = {}) {
        const { page = 1, limit = 20, search = '', sortBy = 'createdAt', sortOrder = 'desc', status, roleId, } = queryParams;
        const workspace = await models_1.Workspace.findById(workspaceId);
        if (!workspace || !workspace.isActive) {
            throw apiError_1.ApiError.notFound('Workspace not found or inactive');
        }
        let filteredMembers = workspace.members;
        if (status) {
            filteredMembers = filteredMembers.filter(member => member.status === status);
        }
        if (roleId) {
            filteredMembers = filteredMembers.filter(member => member.roleId.toString() === roleId);
        }
        const memberIds = filteredMembers.map(member => member.userId);
        const searchQuery = {
            _id: { $in: memberIds },
        };
        if (search) {
            searchQuery.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { designation: { $regex: search, $options: 'i' } },
            ];
        }
        const skip = (page - 1) * limit;
        const sortDirection = sortOrder === 'desc' ? -1 : 1;
        const total = await models_1.User.countDocuments(searchQuery);
        const users = await models_1.User.find(searchQuery)
            .select('name email designation profilePicture isActive isEmailVerified lastLogin createdAt')
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(limit)
            .populate('createdBy', 'name email');
        const enrichedUsers = await Promise.all(users.map(async (user) => {
            const memberData = workspace.members.find(member => member.userId.toString() === user._id.toString());
            const role = await models_1.Role.findById(memberData?.roleId);
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                designation: user.designation,
                profilePicture: user.profilePicture,
                isActive: user.isActive,
                isEmailVerified: user.isEmailVerified,
                lastLogin: user.lastLogin,
                empId: user.empId,
                role: role
                    ? {
                        id: role._id,
                        name: role.name,
                        description: role.description,
                    }
                    : null,
                workspaceStatus: memberData?.status,
                joinedAt: memberData?.joinedAt,
                invitedBy: memberData?.invitedBy,
                createdAt: user.createdAt,
                createdBy: user.createdBy,
            };
        }));
        const totalPages = Math.ceil(total / limit);
        return {
            users: enrichedUsers,
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
    static async searchAll(queryParams = {}) {
        const { page = 1, limit = 20, search = '', sortBy = 'createdAt', sortOrder = 'desc', workspaceId, isSuperAdmin, isActive, } = queryParams;
        const searchQuery = {};
        if (search) {
            searchQuery.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { designation: { $regex: search, $options: 'i' } },
            ];
        }
        if (workspaceId) {
            searchQuery['workspaces.workspaceId'] = workspaceId;
        }
        if (isSuperAdmin !== undefined) {
            searchQuery.isSuperAdmin = isSuperAdmin;
        }
        if (isActive !== undefined) {
            searchQuery.isActive = isActive;
        }
        const skip = (page - 1) * limit;
        const sortDirection = sortOrder === 'desc' ? -1 : 1;
        const total = await models_1.User.countDocuments(searchQuery);
        const users = await models_1.User.find(searchQuery)
            .select('name email designation profilePicture isActive isSuperAdmin isEmailVerified lastLogin workspaces createdAt')
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(limit)
            .populate('workspaces.workspaceId', 'name workspaceId')
            .populate('workspaces.roleId', 'name')
            .populate('createdBy', 'name email');
        const enrichedUsers = users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
            designation: user.designation,
            profilePicture: user.profilePicture,
            isActive: user.isActive,
            isSuperAdmin: user.isSuperAdmin,
            isEmailVerified: user.isEmailVerified,
            lastLogin: user.lastLogin,
            workspaceCount: user.workspaces.length,
            workspaces: user.workspaces.map(ws => ({
                id: ws.workspaceId._id,
                name: ws.workspaceId.name,
                workspaceId: ws.workspaceId.workspaceId,
                role: ws.roleId.name,
                status: ws.status,
            })),
            createdAt: user.createdAt,
            createdBy: user.createdBy,
        }));
        const totalPages = Math.ceil(total / limit);
        return {
            users: enrichedUsers,
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
    static async getWorkspaceStats(workspaceId) {
        const workspace = await models_1.Workspace.findById(workspaceId);
        if (!workspace || !workspace.isActive) {
            throw apiError_1.ApiError.notFound('Workspace not found or inactive');
        }
        const totalUsers = workspace.members.length;
        const activeUsers = workspace.getMembersByStatus('active').length;
        const invitedUsers = workspace.getMembersByStatus('invited').length;
        const suspendedUsers = workspace.getMembersByStatus('suspended').length;
        const roleStats = await models_1.Role.aggregate([
            { $match: { workspaceId, isActive: true } },
            {
                $lookup: {
                    from: 'workspaces',
                    let: { roleId: '$_id' },
                    pipeline: [
                        { $match: { _id: workspaceId } },
                        { $unwind: '$members' },
                        { $match: { $expr: { $eq: ['$members.roleId', '$$roleId'] } } },
                        { $group: { _id: null, count: { $sum: 1 } } },
                    ],
                    as: 'memberCount',
                },
            },
            {
                $project: {
                    name: 1,
                    memberCount: {
                        $ifNull: [{ $arrayElemAt: ['$memberCount.count', 0] }, 0],
                    },
                },
            },
        ]);
        const recentUsers = await models_1.User.find({
            _id: { $in: workspace.members.map(m => m.userId) },
        })
            .sort({ lastLogin: -1 })
            .limit(5)
            .select('name email lastLogin');
        return {
            totalUsers,
            usersByStatus: {
                active: activeUsers,
                invited: invitedUsers,
                suspended: suspendedUsers,
            },
            roleDistribution: roleStats,
            recentActivity: recentUsers.map(user => ({
                id: user._id,
                name: user.name,
                email: user.email,
                lastLogin: user.lastLogin,
            })),
        };
    }
    static async generateEmployeeId(workspaceId) {
        const workspace = await models_1.Workspace.findById(workspaceId);
        if (!workspace) {
            throw apiError_1.ApiError.notFound('Workspace not found');
        }
        const prefix = workspace.settings.empIdPrefix || 'WS';
        let counter = workspace.settings.empIdCounter || 1000;
        let empId;
        let isUnique = false;
        let attempts = 0;
        const maxAttempts = 100;
        while (!isUnique && attempts < maxAttempts) {
            empId = `${prefix}${counter}`;
            const existingUser = await models_1.User.findOne({ empId });
            if (!existingUser) {
                isUnique = true;
            }
            else {
                counter++;
                attempts++;
            }
        }
        if (!isUnique) {
            throw new apiError_1.ApiError(500, 'Unable to generate unique Employee ID');
        }
        workspace.settings.empIdCounter = counter + 1;
        await workspace.save();
        return empId;
    }
    static async assignEmployeeId(userId, workspaceId) {
        const user = await models_1.User.findById(userId);
        if (!user) {
            throw apiError_1.ApiError.notFound('User not found');
        }
        if (user.empId) {
            return user.empId;
        }
        const empId = await this.generateEmployeeId(workspaceId);
        user.empId = empId;
        await user.save();
        return empId;
    }
}
exports.UserService = UserService;
exports.default = UserService;
//# sourceMappingURL=userService.js.map