"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const services_1 = require("@/services");
const apiError_1 = require("@/utils/apiError");
const mongoose_1 = require("mongoose");
class UserController {
    static async create(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const { name, email, password, designation, yearsOfExperience, roleId, sendInvite = false, } = req.body;
            if (!name || !email || !password || !roleId) {
                throw apiError_1.ApiError.badRequest('Name, email, password, and role are required');
            }
            if (!req.user.workspaceId) {
                throw apiError_1.ApiError.badRequest('Workspace context required');
            }
            const user = await services_1.UserService.create({
                name,
                email,
                password,
                designation,
                yearsOfExperience,
                roleId: new mongoose_1.Types.ObjectId(roleId),
                workspaceId: req.user.workspaceId,
                sendInvite,
            }, req.user.id);
            const response = {
                success: true,
                message: 'User created successfully',
                data: { user },
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
                throw apiError_1.ApiError.badRequest('Invalid user ID');
            }
            const user = await services_1.UserService.getById(new mongoose_1.Types.ObjectId(id), req.user.workspaceId);
            const response = {
                success: true,
                message: 'User retrieved successfully',
                data: { user },
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
            const { name, designation, yearsOfExperience, isActive, profilePicture, empId } = req.body;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw apiError_1.ApiError.badRequest('Invalid user ID');
            }
            const user = await services_1.UserService.update(new mongoose_1.Types.ObjectId(id), { name, designation, yearsOfExperience, isActive, profilePicture, empId }, req.user.id, req.user.workspaceId);
            const response = {
                success: true,
                message: 'User updated successfully',
                data: { user },
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
    static async updateRole(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const { id } = req.params;
            const { roleId } = req.body;
            if (!mongoose_1.Types.ObjectId.isValid(id) || !mongoose_1.Types.ObjectId.isValid(roleId)) {
                throw apiError_1.ApiError.badRequest('Invalid user ID or role ID');
            }
            if (!req.user.workspaceId) {
                throw apiError_1.ApiError.badRequest('Workspace context required');
            }
            const user = await services_1.UserService.updateRole(new mongoose_1.Types.ObjectId(id), req.user.workspaceId, { roleId: new mongoose_1.Types.ObjectId(roleId) }, req.user.id);
            const response = {
                success: true,
                message: 'User role updated successfully',
                data: { user },
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
    static async deactivate(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const { id } = req.params;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw apiError_1.ApiError.badRequest('Invalid user ID');
            }
            await services_1.UserService.deactivate(new mongoose_1.Types.ObjectId(id), req.user.id, req.user.workspaceId);
            const response = {
                success: true,
                message: 'User deactivated successfully',
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
    static async reactivate(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const { id } = req.params;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw apiError_1.ApiError.badRequest('Invalid user ID');
            }
            await services_1.UserService.reactivate(new mongoose_1.Types.ObjectId(id), req.user.id, req.user.workspaceId);
            const response = {
                success: true,
                message: 'User reactivated successfully',
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
    static async removeFromWorkspace(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const { id } = req.params;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw apiError_1.ApiError.badRequest('Invalid user ID');
            }
            if (!req.user.workspaceId) {
                throw apiError_1.ApiError.badRequest('Workspace context required');
            }
            await services_1.UserService.removeFromWorkspace(new mongoose_1.Types.ObjectId(id), req.user.workspaceId, req.user.id);
            const response = {
                success: true,
                message: 'User removed from workspace successfully',
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
    static async getWorkspaceUsers(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            if (!req.user.workspaceId) {
                throw apiError_1.ApiError.badRequest('Workspace context required');
            }
            const { page = 1, limit = 20, search = '', sortBy = 'createdAt', sortOrder = 'desc', status, roleId, } = req.query;
            const result = await services_1.UserService.getWorkspaceUsers(req.user.workspaceId, {
                page: Number(page),
                limit: Number(limit),
                search: String(search),
                sortBy: String(sortBy),
                sortOrder: sortOrder,
                status: status,
                roleId: roleId,
            });
            const response = {
                success: true,
                message: 'Users retrieved successfully',
                data: result.users,
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
    static async searchAll(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            if (!req.user.isSuperAdmin) {
                throw apiError_1.ApiError.forbidden('Super admin access required');
            }
            const { page = 1, limit = 20, search = '', sortBy = 'createdAt', sortOrder = 'desc', workspaceId, isSuperAdmin, isActive, } = req.query;
            const result = await services_1.UserService.searchAll({
                page: Number(page),
                limit: Number(limit),
                search: String(search),
                sortBy: String(sortBy),
                sortOrder: sortOrder,
                workspaceId: workspaceId,
                isSuperAdmin: isSuperAdmin === 'true',
                isActive: isActive === 'true',
            });
            const response = {
                success: true,
                message: 'Users retrieved successfully',
                data: result.users,
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
            if (!req.user.workspaceId) {
                throw apiError_1.ApiError.badRequest('Workspace context required');
            }
            const stats = await services_1.UserService.getWorkspaceStats(req.user.workspaceId);
            const response = {
                success: true,
                message: 'User statistics retrieved successfully',
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
    static async testAssignEmpId(req, res) {
        try {
            const { userId } = req.params;
            const { workspaceId } = req.body;
            console.log('Debug - userId:', userId);
            console.log('Debug - workspaceId:', workspaceId);
            console.log('Debug - req.body:', req.body);
            if (!userId || !workspaceId) {
                throw apiError_1.ApiError.badRequest('User ID and Workspace ID are required');
            }
            const empId = await services_1.UserService.assignEmployeeId(new mongoose_1.Types.ObjectId(userId), new mongoose_1.Types.ObjectId(workspaceId));
            const response = {
                success: true,
                message: 'Employee ID assigned successfully',
                data: { empId },
            };
            res.json(response);
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
exports.UserController = UserController;
exports.default = UserController;
//# sourceMappingURL=userController.js.map