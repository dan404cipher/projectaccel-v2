import { Request, Response } from 'express';
import { InviteService } from '@/services';
import { IAuthRequest, IApiResponse } from '@/types';
import { ApiError } from '@/utils/apiError';
import { Types } from 'mongoose';

/**
 * Invite management controller for handling invitation-related HTTP requests
 */
export class InviteController {
  /**
   * Create and send workspace invitation
   * POST /api/v1/invites
   */
  static async create(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      if (!req.user.workspaceId) {
        throw ApiError.badRequest('Workspace context required');
      }

      const { email, roleId } = req.body;

      // Validate required fields
      if (!email || !roleId) {
        throw ApiError.badRequest('Email and role are required');
      }

      const invite = await InviteService.create({
        email,
        workspaceId: req.user.workspaceId,
        roleId: new Types.ObjectId(roleId),
        invitedBy: req.user.id,
      });

      const response: IApiResponse = {
        success: true,
        message: 'Invitation sent successfully',
        data: { invite },
      };

      res.status(201).json(response);
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
   * Accept workspace invitation
   * POST /api/v1/invites/accept
   */
  static async accept(req: Request, res: Response): Promise<void> {
    try {
      const { token, password, name } = req.body;

      // Validate required fields
      if (!token) {
        throw ApiError.badRequest('Invitation token is required');
      }

      const result = await InviteService.accept({
        token,
        password,
        name,
      });

      const response: IApiResponse = {
        success: true,
        message: 'Invitation accepted successfully',
        data: result,
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
   * Revoke invitation
   * DELETE /api/v1/invites/:id
   */
  static async revoke(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id } = req.params;

      if (!Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest('Invalid invite ID');
      }

      await InviteService.revoke(new Types.ObjectId(id), req.user.id);

      const response: IApiResponse = {
        success: true,
        message: 'Invitation revoked successfully',
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
   * Resend invitation
   * POST /api/v1/invites/:id/resend
   */
  static async resend(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id } = req.params;

      if (!Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest('Invalid invite ID');
      }

      const result = await InviteService.resend(
        new Types.ObjectId(id),
        req.user.id
      );

      const response: IApiResponse = {
        success: true,
        message: 'Invitation resent successfully',
        data: result,
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
   * Get invite by token (for validation)
   * GET /api/v1/invites/validate/:token
   */
  static async getByToken(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.params;

      if (!token) {
        throw ApiError.badRequest('Invitation token is required');
      }

      const invite = await InviteService.getByToken(token);

      const response: IApiResponse = {
        success: true,
        message: 'Invitation details retrieved successfully',
        data: { invite },
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
   * Get workspace invites with pagination
   * GET /api/v1/invites
   */
  static async getWorkspaceInvites(
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
      } = req.query;

      const result = await InviteService.getWorkspaceInvites(
        req.user.workspaceId,
        {
          page: Number(page),
          limit: Number(limit),
          search: String(search),
          sortBy: String(sortBy),
          sortOrder: sortOrder as 'asc' | 'desc',
          status: status as string,
        }
      );

      const response: IApiResponse = {
        success: true,
        message: 'Invitations retrieved successfully',
        data: result.invites,
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
   * Get user's pending invites
   * GET /api/v1/invites/user/:email
   */
  static async getUserInvites(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;

      if (!email) {
        throw ApiError.badRequest('Email is required');
      }

      const invites = await InviteService.getUserInvites(email);

      const response: IApiResponse = {
        success: true,
        message: 'User invitations retrieved successfully',
        data: { invites },
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
   * Get invite statistics for workspace
   * GET /api/v1/invites/stats
   */
  static async getStats(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      if (!req.user.workspaceId) {
        throw ApiError.badRequest('Workspace context required');
      }

      const stats = await InviteService.getWorkspaceStats(req.user.workspaceId);

      const response: IApiResponse = {
        success: true,
        message: 'Invite statistics retrieved successfully',
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
}

export default InviteController;
