import { Request, Response } from 'express';
import { RoleService } from '@/services';
import { IAuthRequest, IApiResponse, PERMISSION_MODULES } from '@/types';
import { ApiError } from '@/utils/apiError';
import { Types } from 'mongoose';

/**
 * Role management controller for handling role-related HTTP requests
 */
export class RoleController {
  /**
   * Create a new role
   * POST /api/v1/roles
   */
  static async create(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      if (!req.user.workspaceId) {
        throw ApiError.badRequest('Workspace context required');
      }

      const {
        roleName,
        roleDescription,
        permissions,
        inheritFrom,
        defaultAccessScope,
        assignedUsers,
      } = req.body;

      // Validate required fields
      if (!roleName || !permissions) {
        throw ApiError.badRequest('Role name and permissions are required');
      }

      // Convert frontend permission format to backend format
      const backendPermissions = RoleService.convertFrontendPermissionsToBackend(permissions);

      const role = await RoleService.create(
        req.user.workspaceId,
        {
          name: roleName,
          description: roleDescription,
          permissions: backendPermissions,
          ...(inheritFrom && { inheritFrom: new Types.ObjectId(inheritFrom) }),
          defaultAccessScope: defaultAccessScope || 'workspace',
        },
        req.user.id
      );

      // If assignedUsers is provided, assign users to the role
      if (assignedUsers && assignedUsers.length > 0) {
        // This would need to be implemented in the service
        // await RoleService.assignUsersToRole(role._id, assignedUsers, req.user.id);
      }

      const response: IApiResponse = {
        success: true,
        message: 'Role created successfully',
        data: { role },
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
   * Get role by ID
   * GET /api/v1/roles/:id
   */
  static async getById(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id } = req.params;

      if (!Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest('Invalid role ID');
      }

      const role = await RoleService.getById(new Types.ObjectId(id));

      const response: IApiResponse = {
        success: true,
        message: 'Role retrieved successfully',
        data: { role },
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
   * Update role
   * PUT /api/v1/roles/:id
   */
  static async update(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id } = req.params;
      const { name, description, permissions, defaultAccessScope, isActive } =
        req.body;

      if (!Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest('Invalid role ID');
      }

      const role = await RoleService.update(
        new Types.ObjectId(id),
        { name, description, permissions, defaultAccessScope, isActive },
        req.user.id
      );

      const response: IApiResponse = {
        success: true,
        message: 'Role updated successfully',
        data: { role },
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
   * Delete role
   * DELETE /api/v1/roles/:id
   */
  static async delete(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id } = req.params;

      if (!Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest('Invalid role ID');
      }

      await RoleService.delete(new Types.ObjectId(id), req.user.id);

      const response: IApiResponse = {
        success: true,
        message: 'Role deleted successfully',
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
   * Get workspace roles
   * GET /api/v1/roles
   */
  static async getWorkspaceRoles(
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
        limit = 50,
        search = '',
        sortBy = 'name',
        sortOrder = 'asc',
        includeInactive = false,
        isSystemRole,
      } = req.query;

      const result = await RoleService.getWorkspaceRoles(req.user.workspaceId, {
        page: Number(page),
        limit: Number(limit),
        search: String(search),
        sortBy: String(sortBy),
        sortOrder: sortOrder as 'asc' | 'desc',
        includeInactive: includeInactive === 'true',
        ...(isSystemRole !== undefined && {
          isSystemRole: isSystemRole === 'true',
        }),
      });

      const response: IApiResponse = {
        success: true,
        message: 'Roles retrieved successfully',
        data: result.roles,
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
   * Get role with user count
   * GET /api/v1/roles/:id/details
   */
  static async getRoleWithUserCount(
    req: IAuthRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id } = req.params;

      if (!Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest('Invalid role ID');
      }

      const role = await RoleService.getRoleWithUserCount(
        new Types.ObjectId(id)
      );

      const response: IApiResponse = {
        success: true,
        message: 'Role details retrieved successfully',
        data: { role },
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
   * Duplicate role
   * POST /api/v1/roles/:id/duplicate
   */
  static async duplicate(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      const { id } = req.params;
      const { newName } = req.body;

      if (!Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest('Invalid role ID');
      }

      if (!newName) {
        throw ApiError.badRequest('New role name is required');
      }

      const role = await RoleService.duplicate(
        new Types.ObjectId(id),
        newName,
        req.user.id
      );

      const response: IApiResponse = {
        success: true,
        message: 'Role duplicated successfully',
        data: { role },
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
   * Get permission template
   * GET /api/v1/roles/permission-template
   */
  static getPermissionTemplate(_req: Request, res: Response): void {
    try {
      const template = RoleService.getPermissionTemplate();

      const response: IApiResponse = {
        success: true,
        message: 'Permission template retrieved successfully',
        data: { template },
      };

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Get default role permissions
   * GET /api/v1/roles/default-permissions/:roleName
   */
  static getDefaultPermissions(req: Request, res: Response): void {
    try {
      const { roleName } = req.params;

      if (!roleName) {
        throw ApiError.badRequest('Role name is required');
      }

      const permissions = RoleService.getDefaultRolePermissions(roleName);

      const response: IApiResponse = {
        success: true,
        message: 'Default permissions retrieved successfully',
        data: { permissions },
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
   * Get role statistics for workspace
   * GET /api/v1/roles/stats
   */
  static async getStats(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      if (!req.user.workspaceId) {
        throw ApiError.badRequest('Workspace context required');
      }

      const stats = await RoleService.getWorkspaceRoleStats(
        req.user.workspaceId
      );

      const response: IApiResponse = {
        success: true,
        message: 'Role statistics retrieved successfully',
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
   * Get all available permission modules
   * GET /api/v1/roles/permission-modules
   */
  static getPermissionModules(_req: Request, res: Response): void {
    try {
      const modules = Object.entries(PERMISSION_MODULES).map(
        ([key, value]) => ({
          key,
          value,
          displayName: key.toLowerCase().replace(/_/g, ' '),
        })
      );

      const categorizedModules = {
        'Core Permissions': [
          { key: 'PROJECTS', value: 'projects', displayName: 'Projects' },
          { key: 'TASKS', value: 'tasks', displayName: 'Tasks' },
          { key: 'SPRINTS', value: 'sprints', displayName: 'Sprints' },
          { key: 'TEAM', value: 'team', displayName: 'Team' },
          { key: 'FILES', value: 'files', displayName: 'Files & Documents' },
          { key: 'REPORTS', value: 'reports', displayName: 'Reports' },
          { key: 'WORKSPACE', value: 'workspace', displayName: 'Workspace' },
        ],
        'Team & User Management': [
          { key: 'MEMBERS', value: 'members', displayName: 'Members' },
          { key: 'ROLES', value: 'roles', displayName: 'Roles & Permissions' },
        ],
        'Communication & Collaboration': [
          { key: 'COMMENTS', value: 'comments', displayName: 'Comments' },
          {
            key: 'NOTIFICATIONS',
            value: 'notifications',
            displayName: 'Notifications',
          },
          { key: 'CHAT', value: 'chat', displayName: 'Community Chat' },
          {
            key: 'MESSAGES',
            value: 'messages',
            displayName: 'Direct Messages',
          },
        ],
        'Administration / Advanced': [
          {
            key: 'BILLING',
            value: 'billing',
            displayName: 'Billing & Subscription',
          },
          {
            key: 'INTEGRATIONS',
            value: 'integrations',
            displayName: 'Integrations',
          },
          {
            key: 'SETTINGS',
            value: 'settings',
            displayName: 'System Settings',
          },
        ],
      };

      const response: IApiResponse = {
        success: true,
        message: 'Permission modules retrieved successfully',
        data: {
          modules,
          categorized: categorizedModules,
        },
      };

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Get roles in frontend format for roles and permissions page
   * GET /api/v1/roles/frontend-format
   */
  static async getRolesFrontendFormat(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
      }

      // For now, return empty roles array to avoid workspace complexity
      // TODO: Implement proper workspace selection logic
      const response: IApiResponse = {
        success: true,
        message: 'Roles retrieved successfully',
        data: { roles: [] },
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

export default RoleController;
