"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const services_1 = require("@/services");
const apiError_1 = require("@/utils/apiError");
class AuthController {
    static async signup(req, res) {
        try {
            const { name, email, password, workspaceName, designation, yearsOfExperience, } = req.body;
            if (!name || !email || !password || !workspaceName) {
                throw apiError_1.ApiError.badRequest('Name, email, password, and workspace name are required');
            }
            let experienceLevel = '0-1';
            if (yearsOfExperience >= 1 && yearsOfExperience < 3) {
                experienceLevel = '1-3';
            }
            else if (yearsOfExperience >= 3 && yearsOfExperience < 5) {
                experienceLevel = '3-5';
            }
            else if (yearsOfExperience >= 5 && yearsOfExperience < 10) {
                experienceLevel = '5-10';
            }
            else if (yearsOfExperience >= 10) {
                experienceLevel = '10+';
            }
            const result = await services_1.AuthService.signup({
                name: name.trim(),
                email: email.toLowerCase().trim(),
                password,
                workspaceName: workspaceName.trim(),
                designation: designation?.trim(),
                yearsOfExperience: experienceLevel,
            });
            const response = {
                success: true,
                message: 'User registered successfully',
                data: {
                    user: result.user,
                    workspace: result.workspace,
                    tokens: result.tokens,
                },
            };
            res.status(201).json(response);
        }
        catch (error) {
            console.error('Signup error:', error);
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
                    error: process.env.NODE_ENV === 'development'
                        ? error.message
                        : undefined,
                });
            }
        }
    }
    static async login(req, res) {
        try {
            const { email, password, workspaceId } = req.body;
            if (!email || !password) {
                throw apiError_1.ApiError.badRequest('Email and password are required');
            }
            const ipAddress = req.ip || req.connection.remoteAddress;
            const userAgent = req.get('User-Agent');
            const result = await services_1.AuthService.login({ email, password, workspaceId }, ipAddress, userAgent);
            res.cookie('refreshToken', result.tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            const response = {
                success: true,
                message: 'Login successful',
                data: {
                    user: result.user,
                    workspace: result.workspace,
                    accessToken: result.tokens.accessToken,
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
    static async refreshToken(req, res) {
        try {
            const refreshToken = req.body.refreshToken || req.cookies.refreshToken;
            if (!refreshToken) {
                throw apiError_1.ApiError.unauthorized('Refresh token required');
            }
            const tokens = await services_1.AuthService.refreshToken(refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            const response = {
                success: true,
                message: 'Token refreshed successfully',
                data: {
                    accessToken: tokens.accessToken,
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
    static async logout(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const refreshToken = req.body.refreshToken || req.cookies.refreshToken;
            if (refreshToken) {
                await services_1.AuthService.logout(req.user.id, refreshToken);
            }
            res.clearCookie('refreshToken');
            const response = {
                success: true,
                message: 'Logout successful',
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
    static async logoutAll(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            await services_1.AuthService.logoutAll(req.user.id);
            res.clearCookie('refreshToken');
            const response = {
                success: true,
                message: 'Logged out from all devices successfully',
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
    static async switchWorkspace(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const { workspaceId } = req.body;
            if (!workspaceId) {
                throw apiError_1.ApiError.badRequest('Workspace ID is required');
            }
            const result = await services_1.AuthService.switchWorkspace(req.user.id, workspaceId);
            res.cookie('refreshToken', result.tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            const response = {
                success: true,
                message: 'Workspace switched successfully',
                data: {
                    user: result.user,
                    workspace: result.workspace,
                    accessToken: result.tokens.accessToken,
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
    static async getUserWorkspaces(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const workspaces = await services_1.AuthService.getUserWorkspaces(req.user.id);
            const response = {
                success: true,
                message: 'Workspaces retrieved successfully',
                data: { workspaces },
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
    static async getProfile(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            const workspaces = await services_1.AuthService.getUserWorkspaces(req.user.id);
            const response = {
                success: true,
                message: 'Profile retrieved successfully',
                data: {
                    user: {
                        id: req.user.id,
                        email: req.user.email,
                        currentWorkspace: req.user.workspaceId,
                        currentRole: req.user.roleId,
                        isSuperAdmin: req.user.isSuperAdmin,
                        permissions: req.user.permissions,
                    },
                    workspaces,
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
    static async verifyEmail(req, res) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized('Authentication required');
            }
            await services_1.AuthService.verifyEmail(req.user.id);
            const response = {
                success: true,
                message: 'Email verified successfully',
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
exports.AuthController = AuthController;
exports.default = AuthController;
//# sourceMappingURL=authController.js.map