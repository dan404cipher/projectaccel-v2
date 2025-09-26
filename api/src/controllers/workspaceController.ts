import { Request, Response } from 'express';
import { WorkspaceService } from '@/services';
import { IAuthRequest, IApiResponse } from '@/types';
import { ApiError } from '@/utils/apiError';
import { Types } from 'mongoose';

/**
 * Workspace management controller for handling workspace-related HTTP requests
 */
export class WorkspaceController {
  /**
   * Create a new workspace
   * POST /api/v1/workspaces
   */
  static async create(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { name, description, settings } = req.body;

      // Validate required fields
      if (!name) {
        throw ApiError.badRequest('Workspace name is required');
      }

      const workspace = await WorkspaceService.create({
        name,
        description,
        ownerId: req.user.id,
        settings
      });

      const response: IApiResponse = {
        success: true,
        message: 'Workspace created successfully',
        data: { workspace }
      };

      res.status(201).json(response);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  }

  /**
   * Get workspace by ID
   * GET /api/v1/workspaces/:id
   */
  static async getById(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id } = req.params;
      const workspace = await WorkspaceService.getById(id);

      const response: IApiResponse = {
        success: true,
        message: 'Workspace retrieved successfully',
        data: { workspace }
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  }

  /**
   * Update workspace
   * PUT /api/v1/workspaces/:id
   */
  static async update(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id } = req.params;
      const { name, description, settings } = req.body;

      if (!Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest('Invalid workspace ID');
      }

      const workspace = await WorkspaceService.update(
        new Types.ObjectId(id),
        { name, description, settings },
        req.user.id
      );

      const response: IApiResponse = {
        success: true,
        message: 'Workspace updated successfully',
        data: { workspace }
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  }

  /**
   * Delete workspace
   * DELETE /api/v1/workspaces/:id
   */
  static async delete(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id } = req.params;

      if (!Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest('Invalid workspace ID');
      }

      await WorkspaceService.delete(new Types.ObjectId(id), req.user.id);

      const response: IApiResponse = {
        success: true,
        message: 'Workspace deleted successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  }

  /**
   * Add member to workspace
   * POST /api/v1/workspaces/:id/members
   */
  static async addMember(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id } = req.params;
      const { userId, roleId } = req.body;

      if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(roleId)) {
        throw ApiError.badRequest('Invalid workspace ID, user ID, or role ID');
      }

      await WorkspaceService.addMember(
        new Types.ObjectId(id),
        new Types.ObjectId(userId),
        new Types.ObjectId(roleId),
        req.user.id
      );

      const response: IApiResponse = {
        success: true,
        message: 'Member added to workspace successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  }

  /**
   * Remove member from workspace
   * DELETE /api/v1/workspaces/:id/members/:userId
   */
  static async removeMember(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id, userId } = req.params;

      if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)) {
        throw ApiError.badRequest('Invalid workspace ID or user ID');
      }

      await WorkspaceService.removeMember(
        new Types.ObjectId(id),
        new Types.ObjectId(userId),
        req.user.id
      );

      const response: IApiResponse = {
        success: true,
        message: 'Member removed from workspace successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  }

  /**
   * Update member role
   * PUT /api/v1/workspaces/:id/members/:userId/role
   */
  static async updateMemberRole(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id, userId } = req.params;
      const { roleId } = req.body;

      if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(roleId)) {
        throw ApiError.badRequest('Invalid workspace ID, user ID, or role ID');
      }

      await WorkspaceService.updateMemberRole(
        new Types.ObjectId(id),
        new Types.ObjectId(userId),
        new Types.ObjectId(roleId),
        req.user.id
      );

      const response: IApiResponse = {
        success: true,
        message: 'Member role updated successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  }

  /**
   * Transfer workspace ownership
   * POST /api/v1/workspaces/:id/transfer-ownership
   */
  static async transferOwnership(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id } = req.params;
      const { newOwnerId } = req.body;

      if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(newOwnerId)) {
        throw ApiError.badRequest('Invalid workspace ID or user ID');
      }

      await WorkspaceService.transferOwnership(
        new Types.ObjectId(id),
        new Types.ObjectId(newOwnerId),
        req.user.id
      );

      const response: IApiResponse = {
        success: true,
        message: 'Workspace ownership transferred successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  }

  /**
   * Get workspace members
   * GET /api/v1/workspaces/:id/members
   */
  static async getMembers(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id } = req.params;
      const {
        page = 1,
        limit = 20,
        search = '',
        sortBy = 'joinedAt',
        sortOrder = 'desc'
      } = req.query;

      if (!Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest('Invalid workspace ID');
      }

      const result = await WorkspaceService.getMembers(
        new Types.ObjectId(id),
        {
          page: Number(page),
          limit: Number(limit),
          search: String(search),
          sortBy: String(sortBy),
          sortOrder: sortOrder as 'asc' | 'desc'
        }
      );

      const response: IApiResponse = {
        success: true,
        message: 'Workspace members retrieved successfully',
        data: result.members,
        meta: {
          pagination: result.pagination
        }
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  }

  /**
   * Get workspace statistics
   * GET /api/v1/workspaces/:id/stats
   */
  static async getStats(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id } = req.params;

      if (!Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest('Invalid workspace ID');
      }

      const stats = await WorkspaceService.getStats(new Types.ObjectId(id));

      const response: IApiResponse = {
        success: true,
        message: 'Workspace statistics retrieved successfully',
        data: { stats }
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  }

  /**
   * Search workspaces (Super Admin only)
   * GET /api/v1/workspaces/search
   */
  static async search(req: IAuthRequest, res: Response): Promise<void> {
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
        ownerId
      } = req.query;

      const result = await WorkspaceService.search({
        page: Number(page),
        limit: Number(limit),
        search: String(search),
        sortBy: String(sortBy),
        sortOrder: sortOrder as 'asc' | 'desc',
        ownerId: ownerId as string
      });

      const response: IApiResponse = {
        success: true,
        message: 'Workspaces retrieved successfully',
        data: result.workspaces,
        meta: {
          pagination: result.pagination
        }
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  }
}

export default WorkspaceController;
