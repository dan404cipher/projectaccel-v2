import { Request, Response } from 'express';
import { AuthService } from '@/services';
import { IAuthRequest, IApiResponse } from '@/types';
import { ApiError } from '@/utils/apiError';

/**
 * Authentication controller for handling auth-related HTTP requests
 */
export class AuthController {
  /**
   * User signup
   * POST /api/v1/auth/signup
   */
  static async signup(req: Request, res: Response): Promise<void> {
    try {
      const {
        name,
        email,
        password,
        workspaceName,
        designation,
        yearsOfExperience,
      } = req.body;

      // Validate required fields
      if (!name || !email || !password || !workspaceName) {
        throw ApiError.badRequest(
          'Name, email, password, and workspace name are required'
        );
      }

      // Convert yearsOfExperience number to enum string
      let experienceLevel = '0-1';
      if (yearsOfExperience >= 1 && yearsOfExperience < 3) {
        experienceLevel = '1-3';
      } else if (yearsOfExperience >= 3 && yearsOfExperience < 5) {
        experienceLevel = '3-5';
      } else if (yearsOfExperience >= 5 && yearsOfExperience < 10) {
        experienceLevel = '5-10';
      } else if (yearsOfExperience >= 10) {
        experienceLevel = '10+';
      }

      // Use the proper signup service
      const result = await AuthService.signup({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        workspaceName: workspaceName.trim(),
        designation: designation?.trim(),
        yearsOfExperience: experienceLevel,
      });

      const response: IApiResponse = {
        success: true,
        message: 'User registered successfully',
        data: {
          user: result.user,
          workspace: result.workspace,
          tokens: result.tokens,
        },
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Signup error:', error);
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error',
          error:
            process.env.NODE_ENV === 'development'
              ? (error as Error).message
              : undefined,
        });
      }
    }
  }

  /**
   * User login
   * POST /api/v1/auth/login
   */
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, workspaceId } = req.body;

      // Validate required fields
      if (!email || !password) {
        throw ApiError.badRequest('Email and password are required');
      }

      const ipAddress = req.ip || req.connection.remoteAddress;
      const userAgent = req.get('User-Agent');

      const result = await AuthService.login(
        { email, password, workspaceId },
        ipAddress,
        userAgent
      );

      // Set refresh token as httpOnly cookie
      res.cookie('refreshToken', result.tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const response: IApiResponse = {
        success: true,
        message: 'Login successful',
        data: {
          user: result.user,
          workspace: result.workspace,
          accessToken: result.tokens.accessToken,
        },
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error',
        });
      }
    }
  }

  /**
   * Refresh access token
   * POST /api/v1/auth/refresh
   */
  static async refreshToken(req: IAuthRequest, res: Response): Promise<void> {
    try {
      const refreshToken = req.body.refreshToken || req.cookies.refreshToken;

      if (!refreshToken) {
        throw ApiError.unauthorized('Refresh token required');
      }

      const tokens = await AuthService.refreshToken(refreshToken);

      // Set new refresh token as httpOnly cookie
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const response: IApiResponse = {
        success: true,
        message: 'Token refreshed successfully',
        data: {
          accessToken: tokens.accessToken,
        },
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error',
        });
      }
    }
  }

  /**
   * Logout from current device
   * POST /api/v1/auth/logout
   */
  static async logout(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const refreshToken = req.body.refreshToken || req.cookies.refreshToken;

      if (refreshToken) {
        await AuthService.logout(req.user.id, refreshToken);
      }

      // Clear refresh token cookie
      res.clearCookie('refreshToken');

      const response: IApiResponse = {
        success: true,
        message: 'Logout successful',
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error',
        });
      }
    }
  }

  /**
   * Logout from all devices
   * POST /api/v1/auth/logout-all
   */
  static async logoutAll(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      await AuthService.logoutAll(req.user.id);

      // Clear refresh token cookie
      res.clearCookie('refreshToken');

      const response: IApiResponse = {
        success: true,
        message: 'Logged out from all devices successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error',
        });
      }
    }
  }

  /**
   * Switch workspace
   * POST /api/v1/auth/switch-workspace
   */
  static async switchWorkspace(
    req: IAuthRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { workspaceId } = req.body;

      if (!workspaceId) {
        throw ApiError.badRequest('Workspace ID is required');
      }

      const result = await AuthService.switchWorkspace(
        req.user.id,
        workspaceId
      );

      // Set new refresh token as httpOnly cookie
      res.cookie('refreshToken', result.tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const response: IApiResponse = {
        success: true,
        message: 'Workspace switched successfully',
        data: {
          user: result.user,
          workspace: result.workspace,
          accessToken: result.tokens.accessToken,
        },
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error',
        });
      }
    }
  }

  /**
   * Get user's accessible workspaces
   * GET /api/v1/auth/workspaces
   */
  static async getUserWorkspaces(
    req: IAuthRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const workspaces = await AuthService.getUserWorkspaces(req.user.id);

      const response: IApiResponse = {
        success: true,
        message: 'Workspaces retrieved successfully',
        data: { workspaces },
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error',
        });
      }
    }
  }

  /**
   * Get current user profile
   * GET /api/v1/auth/me
   */
  static async getProfile(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const workspaces = await AuthService.getUserWorkspaces(req.user.id);

      const response: IApiResponse = {
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
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error',
        });
      }
    }
  }

  /**
   * Verify email
   * POST /api/v1/auth/verify-email
   */
  static async verifyEmail(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      await AuthService.verifyEmail(req.user.id);

      const response: IApiResponse = {
        success: true,
        message: 'Email verified successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error',
        });
      }
    }
  }
}

export default AuthController;
