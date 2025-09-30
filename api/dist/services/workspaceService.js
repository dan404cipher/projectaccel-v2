"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceService = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("@/models");
const apiError_1 = require("@/utils/apiError");
class WorkspaceService {
    static async create(data) {
        const { name, description, ownerId, settings } = data;
        const owner = await models_1.User.findById(ownerId);
        if (!owner || !owner.isActive) {
            throw apiError_1.ApiError.notFound('Owner not found or inactive');
        }
        const workspace = new models_1.Workspace({
            name: name.trim(),
            description: description?.trim(),
            ownerId,
            settings: {
                allowPublicInvites: settings?.allowPublicInvites || false,
                requireAdminApproval: settings?.requireAdminApproval || true,
                timezone: settings?.timezone || 'UTC',
                language: settings?.language || 'en',
                empIdPrefix: null,
                empIdCounter: 1000,
            },
        });
        await workspace.save();
        await models_1.AuditLog.logAction(ownerId, 'create', 'workspace', workspace._id, {
            details: { name, workspaceId: workspace.workspaceId },
        });
        return workspace;
    }
    static async getById(id) {
        let workspace;
        if (mongoose_1.Types.ObjectId.isValid(id)) {
            workspace = await models_1.Workspace.findById(id)
                .populate('ownerId', 'name email')
                .populate('members.userId', 'name email designation')
                .populate('members.roleId', 'name description')
                .populate('settings.defaultRole', 'name description');
        }
        else {
            workspace = await models_1.Workspace
                .findByWorkspaceId(id)
                .populate('ownerId', 'name email')
                .populate('members.userId', 'name email designation')
                .populate('members.roleId', 'name description')
                .populate('settings.defaultRole', 'name description');
        }
        if (!workspace) {
            throw apiError_1.ApiError.notFound('Workspace not found');
        }
        return workspace;
    }
    static async update(workspaceId, data, updatedBy) {
        const workspace = await models_1.Workspace.findById(workspaceId);
        if (!workspace) {
            throw apiError_1.ApiError.notFound('Workspace not found');
        }
        if (data.name)
            workspace.name = data.name.trim();
        if (data.description !== undefined)
            workspace.description = data.description?.trim();
        if (data.settings) {
            if (data.settings.allowPublicInvites !== undefined) {
                workspace.settings.allowPublicInvites =
                    data.settings.allowPublicInvites;
            }
            if (data.settings.requireAdminApproval !== undefined) {
                workspace.settings.requireAdminApproval =
                    data.settings.requireAdminApproval;
            }
            if (data.settings.defaultRole) {
                workspace.settings.defaultRole = data.settings.defaultRole;
            }
            if (data.settings.timezone) {
                workspace.settings.timezone = data.settings.timezone;
            }
            if (data.settings.language) {
                workspace.settings.language = data.settings.language;
            }
        }
        await workspace.save();
        await models_1.AuditLog.logAction(updatedBy, 'update', 'workspace', workspace._id, {
            workspaceId: workspace._id,
            details: { updated_fields: Object.keys(data) },
        });
        return workspace;
    }
    static async delete(workspaceId, deletedBy) {
        const workspace = await models_1.Workspace.findById(workspaceId);
        if (!workspace) {
            throw apiError_1.ApiError.notFound('Workspace not found');
        }
        if (workspace.ownerId.toString() !== deletedBy.toString()) {
            throw apiError_1.ApiError.forbidden('Only workspace owner can delete the workspace');
        }
        workspace.isActive = false;
        await workspace.save();
        const memberIds = workspace.members.map(member => member.userId);
        await models_1.User.updateMany({ _id: { $in: memberIds } }, { $set: { 'workspaces.$[elem].status': 'suspended' } }, { arrayFilters: [{ 'elem.workspaceId': workspaceId }] });
        await models_1.AuditLog.logAction(deletedBy, 'delete', 'workspace', workspace._id, {
            workspaceId: workspace._id,
            details: { workspaceId: workspace.workspaceId, name: workspace.name },
        });
    }
    static async addMember(workspaceId, userId, roleId, addedBy) {
        const workspace = await models_1.Workspace.findById(workspaceId);
        if (!workspace) {
            throw apiError_1.ApiError.notFound('Workspace not found');
        }
        const user = await models_1.User.findById(userId);
        if (!user || !user.isActive) {
            throw apiError_1.ApiError.notFound('User not found or inactive');
        }
        const role = await models_1.Role.findById(roleId);
        if (!role || role.workspaceId.toString() !== workspaceId.toString()) {
            throw apiError_1.ApiError.badRequest('Invalid role for this workspace');
        }
        await workspace.addMember(userId, roleId, addedBy);
        await user.addWorkspace(workspaceId, roleId, addedBy);
        await models_1.AuditLog.logAction(addedBy, 'create', 'user', userId, {
            workspaceId,
            details: { action: 'add_member', role: role.name },
        });
    }
    static async removeMember(workspaceId, userId, removedBy) {
        const workspace = await models_1.Workspace.findById(workspaceId);
        if (!workspace) {
            throw apiError_1.ApiError.notFound('Workspace not found');
        }
        if (workspace.ownerId.toString() === userId.toString()) {
            throw apiError_1.ApiError.badRequest('Cannot remove workspace owner');
        }
        const user = await models_1.User.findById(userId);
        if (!user) {
            throw apiError_1.ApiError.notFound('User not found');
        }
        await workspace.removeMember(userId);
        await user.removeWorkspace(workspaceId);
        await models_1.AuditLog.logAction(removedBy, 'delete', 'user', userId, {
            workspaceId,
            details: { action: 'remove_member' },
        });
    }
    static async updateMemberRole(workspaceId, userId, newRoleId, updatedBy) {
        const workspace = await models_1.Workspace.findById(workspaceId);
        if (!workspace) {
            throw apiError_1.ApiError.notFound('Workspace not found');
        }
        const user = await models_1.User.findById(userId);
        if (!user) {
            throw apiError_1.ApiError.notFound('User not found');
        }
        const role = await models_1.Role.findById(newRoleId);
        if (!role || role.workspaceId.toString() !== workspaceId.toString()) {
            throw apiError_1.ApiError.badRequest('Invalid role for this workspace');
        }
        await workspace.updateMemberRole(userId, newRoleId);
        await user.updateWorkspaceRole(workspaceId, newRoleId);
        await models_1.AuditLog.logAction(updatedBy, 'update', 'user', userId, {
            workspaceId,
            details: { action: 'update_role', newRole: role.name },
        });
    }
    static async transferOwnership(workspaceId, newOwnerId, currentOwnerId) {
        const workspace = await models_1.Workspace.findById(workspaceId);
        if (!workspace) {
            throw apiError_1.ApiError.notFound('Workspace not found');
        }
        if (workspace.ownerId.toString() !== currentOwnerId.toString()) {
            throw apiError_1.ApiError.forbidden('Only current owner can transfer ownership');
        }
        const newOwner = await models_1.User.findById(newOwnerId);
        if (!newOwner || !newOwner.isActive) {
            throw apiError_1.ApiError.notFound('New owner not found or inactive');
        }
        await workspace.transferOwnership(newOwnerId);
        const adminRole = await models_1.Role.findOne({
            workspaceId,
            name: 'Admin',
            isSystemRole: true,
        });
        if (adminRole) {
            await workspace.updateMemberRole(newOwnerId, adminRole._id);
            await newOwner.updateWorkspaceRole(workspaceId, adminRole._id);
        }
        await models_1.AuditLog.logAction(currentOwnerId, 'update', 'workspace', workspace._id, {
            workspaceId,
            details: {
                action: 'transfer_ownership',
                newOwner: newOwner.email,
            },
        });
    }
    static async getMembers(workspaceId, queryParams = {}) {
        const { page = 1, limit = 20, search = '', sortBy = 'joinedAt', sortOrder = 'desc', } = queryParams;
        const workspace = await models_1.Workspace.findById(workspaceId);
        if (!workspace) {
            throw apiError_1.ApiError.notFound('Workspace not found');
        }
        const memberIds = workspace.members
            .filter(member => member.status === 'active')
            .map(member => member.userId);
        const searchQuery = {
            _id: { $in: memberIds },
            isActive: true,
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
            .select('name email designation profilePicture lastLogin createdAt')
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(limit);
        const members = users.map(user => {
            const memberData = workspace.members.find(member => member.userId.toString() === user._id.toString());
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                designation: user.designation,
                profilePicture: user.profilePicture,
                lastLogin: user.lastLogin,
                joinedAt: memberData?.joinedAt,
                roleId: memberData?.roleId,
                status: memberData?.status,
                invitedBy: memberData?.invitedBy,
            };
        });
        const totalPages = Math.ceil(total / limit);
        return {
            members,
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
    static async getStats(workspaceId) {
        const workspace = await models_1.Workspace.findById(workspaceId);
        if (!workspace) {
            throw apiError_1.ApiError.notFound('Workspace not found');
        }
        const totalMembers = workspace.getActiveMembersCount();
        const membersByStatus = {
            active: workspace.getMembersByStatus('active').length,
            invited: workspace.getMembersByStatus('invited').length,
            suspended: workspace.getMembersByStatus('suspended').length,
        };
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
        return {
            totalMembers,
            membersByStatus,
            roleDistribution: roleStats,
            workspaceInfo: {
                id: workspace._id,
                workspaceId: workspace.workspaceId,
                name: workspace.name,
                createdAt: workspace.createdAt,
                subscriptionPlan: workspace.subscriptionPlan,
            },
        };
    }
    static async search(queryParams) {
        const { page = 1, limit = 20, search = '', sortBy = 'createdAt', sortOrder = 'desc', ownerId, } = queryParams;
        const searchQuery = { isActive: true };
        if (search) {
            searchQuery.$or = [
                { name: { $regex: search, $options: 'i' } },
                { workspaceId: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }
        if (ownerId) {
            searchQuery.ownerId = ownerId;
        }
        const skip = (page - 1) * limit;
        const sortDirection = sortOrder === 'desc' ? -1 : 1;
        const total = await models_1.Workspace.countDocuments(searchQuery);
        const workspaces = await models_1.Workspace.find(searchQuery)
            .populate('ownerId', 'name email')
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(limit);
        const enrichedWorkspaces = workspaces.map(workspace => ({
            id: workspace._id,
            workspaceId: workspace.workspaceId,
            name: workspace.name,
            description: workspace.description,
            owner: workspace.ownerId,
            memberCount: workspace.getActiveMembersCount(),
            subscriptionPlan: workspace.subscriptionPlan,
            createdAt: workspace.createdAt,
            updatedAt: workspace.updatedAt,
        }));
        const totalPages = Math.ceil(total / limit);
        return {
            workspaces: enrichedWorkspaces,
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
}
exports.WorkspaceService = WorkspaceService;
exports.default = WorkspaceService;
//# sourceMappingURL=workspaceService.js.map