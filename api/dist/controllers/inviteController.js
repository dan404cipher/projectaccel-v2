"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteController = void 0;
const services_1 = require("@/services");
const apiError_1 = require("@/utils/apiError");
const mongoose_1 = require("mongoose");
class InviteController {
    static async create(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            if (!req.user.workspaceId) {
                throw apiError_1.ApiError.badRequest('Workspace context required');
            }
            const { email, roleId } = req.body;
            if (!email || !roleId) {
                throw apiError_1.ApiError.badRequest('Email and role are required');
            }
            const invite = await services_1.InviteService.create({
                email,
                workspaceId: req.user.workspaceId,
                roleId: new mongoose_1.Types.ObjectId(roleId),
                invitedBy: req.user.id,
            });
            const response = {
                success: true,
                message: 'Invitation sent successfully',
                data: { invite },
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
    static async accept(req, res) {
        try {
            const { token, password, name } = req.body;
            if (!token) {
                throw apiError_1.ApiError.badRequest('Invitation token is required');
            }
            const result = await services_1.InviteService.accept({
                token,
                password,
                name,
            });
            const response = {
                success: true,
                message: 'Invitation accepted successfully',
                data: result,
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
    static async revoke(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const { id } = req.params;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw apiError_1.ApiError.badRequest('Invalid invite ID');
            }
            await services_1.InviteService.revoke(new mongoose_1.Types.ObjectId(id), req.user.id);
            const response = {
                success: true,
                message: 'Invitation revoked successfully',
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
    static async resend(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const { id } = req.params;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw apiError_1.ApiError.badRequest('Invalid invite ID');
            }
            const result = await services_1.InviteService.resend(new mongoose_1.Types.ObjectId(id), req.user.id);
            const response = {
                success: true,
                message: 'Invitation resent successfully',
                data: result,
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
    static async getByToken(req, res) {
        try {
            const { token } = req.params;
            if (!token) {
                throw apiError_1.ApiError.badRequest('Invitation token is required');
            }
            const invite = await services_1.InviteService.getByToken(token);
            const response = {
                success: true,
                message: 'Invitation details retrieved successfully',
                data: { invite },
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
    static async getWorkspaceInvites(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            if (!req.user.workspaceId) {
                throw apiError_1.ApiError.badRequest('Workspace context required');
            }
            const { page = 1, limit = 20, search = '', sortBy = 'createdAt', sortOrder = 'desc', status, } = req.query;
            const result = await services_1.InviteService.getWorkspaceInvites(req.user.workspaceId, {
                page: Number(page),
                limit: Number(limit),
                search: String(search),
                sortBy: String(sortBy),
                sortOrder: sortOrder,
                status: status,
            });
            const response = {
                success: true,
                message: 'Invitations retrieved successfully',
                data: result.invites,
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
    static async getUserInvites(req, res) {
        try {
            const { email } = req.params;
            if (!email) {
                throw apiError_1.ApiError.badRequest('Email is required');
            }
            const invites = await services_1.InviteService.getUserInvites(email);
            const response = {
                success: true,
                message: 'User invitations retrieved successfully',
                data: { invites },
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
            const stats = await services_1.InviteService.getWorkspaceStats(req.user.workspaceId);
            const response = {
                success: true,
                message: 'Invite statistics retrieved successfully',
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
}
exports.InviteController = InviteController;
exports.default = InviteController;
//# sourceMappingURL=inviteController.js.map