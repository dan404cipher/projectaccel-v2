import { Response } from 'express';
import { UserService } from '@/services';
import { IAuthRequest, IApiResponse } from '@/types';
import { ApiError } from '@/utils/apiError';
import { Types } from 'mongoose';

/**
 * User management controller for handling user-related HTTP requests
 */
export class UserController {
  /**
   * Create a new user
   * POST /api/v1/users
   */
  static async create(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const {
        name,
        email,
        password,
        designation,
        yearsOfExperience,
        roleId,
        sendInvite = false,
      } = req.body;

      // Validate required fields
      if (!name || !email || !password || !roleId) {
        throw ApiError.badRequest(
          'Name, email, password, and role are required'
        );
      }

      if (!req.user.workspaceId) {
        throw ApiError.badRequest('Workspace context required');
      }

      const user = await UserService.create(
        {
          name,
          email,
          password,
          designation,
          yearsOfExperience,
          roleId: new Types.ObjectId(roleId),
          workspaceId: req.user.workspaceId,
          sendInvite,
        },
        req.user.id
      );

      const response: IApiResponse = {
        success: true,
        message: 'User created successfully',
        data: { user },
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('User creation error:', error);
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
   * Get user by ID
   * GET /api/v1/users/:id
   */
  static async getById(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id } = req.params;

      if (!Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest('Invalid user ID');
      }

      const user = await UserService.getById(
        new Types.ObjectId(id),
        req.user.workspaceId
      );

      const response: IApiResponse = {
        success: true,
        message: 'User retrieved successfully',
        data: { user },
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
   * Update user information
   * PUT /api/v1/users/:id
   */
  static async update(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id } = req.params;
      const { name, designation, yearsOfExperience, isActive, profilePicture, empId } =
        req.body;

      if (!Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest('Invalid user ID');
      }

      const user = await UserService.update(
        new Types.ObjectId(id),
        { name, designation, yearsOfExperience, isActive, profilePicture, empId },
        req.user.id,
        req.user.workspaceId
      );

      const response: IApiResponse = {
        success: true,
        message: 'User updated successfully',
        data: { user },
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
   * Update user role in workspace
   * PUT /api/v1/users/:id/role
   */
  static async updateRole(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id } = req.params;
      const { roleId } = req.body;

      if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(roleId)) {
        throw ApiError.badRequest('Invalid user ID or role ID');
      }

      if (!req.user.workspaceId) {
        throw ApiError.badRequest('Workspace context required');
      }

      const user = await UserService.updateRole(
        new Types.ObjectId(id),
        req.user.workspaceId,
        { roleId: new Types.ObjectId(roleId) },
        req.user.id
      );

      const response: IApiResponse = {
        success: true,
        message: 'User role updated successfully',
        data: { user },
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
   * Deactivate user
   * DELETE /api/v1/users/:id
   */
  static async deactivate(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id } = req.params;

      if (!Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest('Invalid user ID');
      }

      await UserService.deactivate(
        new Types.ObjectId(id),
        req.user.id,
        req.user.workspaceId
      );

      const response: IApiResponse = {
        success: true,
        message: 'User deactivated successfully',
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
   * Reactivate user
   * POST /api/v1/users/:id/reactivate
   */
  static async reactivate(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id } = req.params;

      if (!Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest('Invalid user ID');
      }

      await UserService.reactivate(
        new Types.ObjectId(id),
        req.user.id,
        req.user.workspaceId
      );

      const response: IApiResponse = {
        success: true,
        message: 'User reactivated successfully',
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
   * Remove user from workspace
   * DELETE /api/v1/users/:id/workspace
   */
  static async removeFromWorkspace(
    req: IAuthRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id } = req.params;

      if (!Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest('Invalid user ID');
      }

      if (!req.user.workspaceId) {
        throw ApiError.badRequest('Workspace context required');
      }

      await UserService.removeFromWorkspace(
        new Types.ObjectId(id),
        req.user.workspaceId,
        req.user.id
      );

      const response: IApiResponse = {
        success: true,
        message: 'User removed from workspace successfully',
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
   * Get workspace users with pagination
   * GET /api/v1/users
   */
  static async getWorkspaceUsers(
    req: IAuthRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      if (!req.user.workspaceId) {
        throw ApiError.badRequest('Workspace context required');
      }

      const {
        page = 1,
        limit = 20,
        search = '',
        sortBy = 'createdAt',
        sortOrder = 'desc',
        status,
        roleId,
      } = req.query;

      const result = await UserService.getWorkspaceUsers(req.user.workspaceId, {
        page: Number(page),
        limit: Number(limit),
        search: String(search),
        sortBy: String(sortBy),
        sortOrder: sortOrder as 'asc' | 'desc',
        status: status as any,
        roleId: roleId as string,
      });

      const response: IApiResponse = {
        success: true,
        message: 'Users retrieved successfully',
        data: result.users,
        meta: {
          pagination: result.pagination,
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
   * Search all users (Super Admin only)
   * GET /api/v1/users/search
   */
  static async searchAll(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      if (!req.user.isSuperAdmin) {
        throw ApiError.forbidden('Super admin access required');
      }

      const {
        page = 1,
        limit = 20,
        search = '',
        sortBy = 'createdAt',
        sortOrder = 'desc',
        workspaceId,
        isSuperAdmin,
        isActive,
      } = req.query;

      const result = await UserService.searchAll({
        page: Number(page),
        limit: Number(limit),
        search: String(search),
        sortBy: String(sortBy),
        sortOrder: sortOrder as 'asc' | 'desc',
        workspaceId: workspaceId as string,
        isSuperAdmin: isSuperAdmin === 'true',
        isActive: isActive === 'true',
      });

      const response: IApiResponse = {
        success: true,
        message: 'Users retrieved successfully',
        data: result.users,
        meta: {
          pagination: result.pagination,
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
   * Get user statistics for workspace
   * GET /api/v1/users/stats
   */
  static async getStats(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      if (!req.user.workspaceId) {
        throw ApiError.badRequest('Workspace context required');
      }

      const stats = await UserService.getWorkspaceStats(req.user.workspaceId);

      const response: IApiResponse = {
        success: true,
        message: 'User statistics retrieved successfully',
        data: { stats },
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
   * Test endpoint to manually assign employee ID
   */
  static async testAssignEmpId(req: IAuthRequest, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { workspaceId } = req.body;

      console.log('Debug - userId:', userId);
      console.log('Debug - workspaceId:', workspaceId);
      console.log('Debug - req.body:', req.body);

      if (!userId || !workspaceId) {
        throw ApiError.badRequest('User ID and Workspace ID are required');
      }

      const empId = await UserService.assignEmployeeId(
        new Types.ObjectId(userId),
        new Types.ObjectId(workspaceId)
      );

      const response: IApiResponse = {
        success: true,
        message: 'Employee ID assigned successfully',
        data: { empId },
      };

      res.json(response);
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

export default UserController;
