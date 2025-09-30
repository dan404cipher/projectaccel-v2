"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceController = void 0;
const services_1 = require("@/services");
const apiError_1 = require("@/utils/apiError");
const mongoose_1 = require("mongoose");
class WorkspaceController {
    static async create(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const { name, description, settings } = req.body;
            if (!name) {
                throw apiError_1.ApiError.badRequest('Workspace name is required');
            }
            const workspace = await services_1.WorkspaceService.create({
                name,
                description,
                ownerId: req.user.id,
                settings,
            });
            const response = {
                success: true,
                message: 'Workspace created successfully',
                data: { workspace },
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
            const workspace = await services_1.WorkspaceService.getById(id);
            const response = {
                success: true,
                message: 'Workspace retrieved successfully',
                data: { workspace },
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
            const { name, description, settings } = req.body;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw apiError_1.ApiError.badRequest('Invalid workspace ID');
            }
            const workspace = await services_1.WorkspaceService.update(new mongoose_1.Types.ObjectId(id), { name, description, settings }, req.user.id);
            const response = {
                success: true,
                message: 'Workspace updated successfully',
                data: { workspace },
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
                throw apiError_1.ApiError.badRequest('Invalid workspace ID');
            }
            await services_1.WorkspaceService.delete(new mongoose_1.Types.ObjectId(id), req.user.id);
            const response = {
                success: true,
                message: 'Workspace deleted successfully',
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
    static async addMember(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const { id } = req.params;
            const { userId, roleId } = req.body;
            if (!mongoose_1.Types.ObjectId.isValid(id) ||
                !mongoose_1.Types.ObjectId.isValid(userId) ||
                !mongoose_1.Types.ObjectId.isValid(roleId)) {
                throw apiError_1.ApiError.badRequest('Invalid workspace ID, user ID, or role ID');
            }
            await services_1.WorkspaceService.addMember(new mongoose_1.Types.ObjectId(id), new mongoose_1.Types.ObjectId(userId), new mongoose_1.Types.ObjectId(roleId), req.user.id);
            const response = {
                success: true,
                message: 'Member added to workspace successfully',
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
    static async removeMember(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const { id, userId } = req.params;
            if (!mongoose_1.Types.ObjectId.isValid(id) || !mongoose_1.Types.ObjectId.isValid(userId)) {
                throw apiError_1.ApiError.badRequest('Invalid workspace ID or user ID');
            }
            await services_1.WorkspaceService.removeMember(new mongoose_1.Types.ObjectId(id), new mongoose_1.Types.ObjectId(userId), req.user.id);
            const response = {
                success: true,
                message: 'Member removed from workspace successfully',
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
    static async updateMemberRole(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const { id, userId } = req.params;
            const { roleId } = req.body;
            if (!mongoose_1.Types.ObjectId.isValid(id) ||
                !mongoose_1.Types.ObjectId.isValid(userId) ||
                !mongoose_1.Types.ObjectId.isValid(roleId)) {
                throw apiError_1.ApiError.badRequest('Invalid workspace ID, user ID, or role ID');
            }
            await services_1.WorkspaceService.updateMemberRole(new mongoose_1.Types.ObjectId(id), new mongoose_1.Types.ObjectId(userId), new mongoose_1.Types.ObjectId(roleId), req.user.id);
            const response = {
                success: true,
                message: 'Member role updated successfully',
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
    static async transferOwnership(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const { id } = req.params;
            const { newOwnerId } = req.body;
            if (!mongoose_1.Types.ObjectId.isValid(id) || !mongoose_1.Types.ObjectId.isValid(newOwnerId)) {
                throw apiError_1.ApiError.badRequest('Invalid workspace ID or user ID');
            }
            await services_1.WorkspaceService.transferOwnership(new mongoose_1.Types.ObjectId(id), new mongoose_1.Types.ObjectId(newOwnerId), req.user.id);
            const response = {
                success: true,
                message: 'Workspace ownership transferred successfully',
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
    static async getMembers(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const { id } = req.params;
            const { page = 1, limit = 20, search = '', sortBy = 'joinedAt', sortOrder = 'desc', } = req.query;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw apiError_1.ApiError.badRequest('Invalid workspace ID');
            }
            const result = await services_1.WorkspaceService.getMembers(new mongoose_1.Types.ObjectId(id), {
                page: Number(page),
                limit: Number(limit),
                search: String(search),
                sortBy: String(sortBy),
                sortOrder: sortOrder,
            });
            const response = {
                success: true,
                message: 'Workspace members retrieved successfully',
                data: result.members,
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
    static async getStats(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const { id } = req.params;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw apiError_1.ApiError.badRequest('Invalid workspace ID');
            }
            const stats = await services_1.WorkspaceService.getStats(new mongoose_1.Types.ObjectId(id));
            const response = {
                success: true,
                message: 'Workspace statistics retrieved successfully',
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
    static async search(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            if (!req.user.isSuperAdmin) {
                throw apiError_1.ApiError.forbidden('Super admin access required');
            }
            const { page = 1, limit = 20, search = '', sortBy = 'createdAt', sortOrder = 'desc', ownerId, } = req.query;
            const result = await services_1.WorkspaceService.search({
                page: Number(page),
                limit: Number(limit),
                search: String(search),
                sortBy: String(sortBy),
                sortOrder: sortOrder,
                ownerId: ownerId,
            });
            const response = {
                success: true,
                message: 'Workspaces retrieved successfully',
                data: result.workspaces,
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
}
exports.WorkspaceController = WorkspaceController;
exports.default = WorkspaceController;
//# sourceMappingURL=workspaceController.js.map