import { Response, NextFunction } from 'express';
import { IAuthRequest, PERMISSION_MODULES, IPermissionSet } from '@/types';
import { User, Role, Workspace } from '@/models';
import { Types } from 'mongoose';
import { ApiError } from '@/utils/apiError';

/**
 * RBAC (Role-Based Access Control) middleware for dynamic permission checking
 */
export class RBACMiddleware {
  /**
   * Check if user has permission for a specific resource and action
   */
  static hasPermission(
    module: string,
    action: 'view' | 'create' | 'edit' | 'delete',
    options: {
      scope?: 'all' | 'assigned' | 'own';
      resourceOwnerId?: Types.ObjectId;
      userProjects?: Types.ObjectId[];
    } = {}
  ) {
    return async (req: IAuthRequest, res: Response, next: NextFunction) => {
      try {
        if (!req.user) {
          throw ApiError.unauthorized('Authentication required');
        }

        // Super admins have all permissions
        if (req.user.isSuperAdmin) {
          return next();
        }

        // Check if user has the basic permission
        if (!req.user.permissions) {
          throw ApiError.forbidden('No permissions assigned');
        }

        const permission = req.user.permissions.find(
          (p: IPermissionSet) => p.module === module
        );
        if (!permission || !permission.permissions[action]) {
          throw ApiError.forbidden(
            `Permission denied: ${action} access to ${module} required`
          );
        }

        // Check scope-based permissions
        if (options.scope && permission.scope) {
          const isAuthorized = await RBACMiddleware.checkScopePermission(
            req.user.id,
            permission.scope,
            options
          );

          if (!isAuthorized) {
            throw ApiError.forbidden('Insufficient scope permissions');
          }
        }

        next();
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.statusCode).json({
            success: false,
            message: error.message,
          });
        }

        return res.status(500).json({
          success: false,
          message: 'Permission check failed',
        });
      }
    };
  }

  /**
   * Check workspace-level permissions
   */
  static requireWorkspacePermission(
    module: string,
    action: 'view' | 'create' | 'edit' | 'delete'
  ) {
    return async (req: IAuthRequest, res: Response, next: NextFunction) => {
      try {
        if (!req.user) {
          throw ApiError.unauthorized('Authentication required');
        }

        // Super admins have all permissions
        if (req.user.isSuperAdmin) {
          return next();
        }

        if (!req.user.workspaceId) {
          throw ApiError.forbidden('Workspace access required');
        }

        // Get user's role in the workspace
        const user = await User.findById(req.user.id).populate({
          path: 'workspaces.roleId',
          match: { workspaceId: req.user.workspaceId },
        });

        if (!user) {
          throw ApiError.notFound('User not found');
        }

        const workspaceMembership = user.workspaces.find(
          ws => ws.workspaceId.toString() === req.user!.workspaceId!.toString()
        );

        if (!workspaceMembership || workspaceMembership.status !== 'active') {
          throw ApiError.forbidden('Not an active member of this workspace');
        }

        const role = await Role.findById(workspaceMembership.roleId);
        if (!role || !role.isActive) {
          throw ApiError.forbidden('Invalid or inactive role');
        }

        // Check permission
        const permission = role.permissions.find(
          (p: IPermissionSet) => p.module === module
        );
        if (!permission || !permission.permissions[action]) {
          throw ApiError.forbidden(
            `Permission denied: ${action} access to ${module} required`
          );
        }

        // Store role permissions in request for further use
        req.user.permissions = role.permissions;

        next();
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.statusCode).json({
            success: false,
            message: error.message,
          });
        }

        return res.status(500).json({
          success: false,
          message: 'Workspace permission check failed',
        });
      }
    };
  }

  /**
   * Check if user can access a specific workspace
   */
  static canAccessWorkspace(workspaceParam: string = 'workspaceId') {
    return async (req: IAuthRequest, res: Response, next: NextFunction) => {
      try {
        if (!req.user) {
          throw ApiError.unauthorized('Authentication required');
        }

        const workspaceId =
          req.params[workspaceParam] || req.body[workspaceParam];
        if (!workspaceId) {
          throw ApiError.badRequest('Workspace ID required');
        }

        // Super admins can access any workspace
        if (req.user.isSuperAdmin) {
          return next();
        }

        // Check if workspace exists and is active
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace || !workspace.isActive) {
          throw ApiError.notFound('Workspace not found or inactive');
        }

        // Check if user is a member of the workspace
        const user = await User.findById(req.user.id);
        if (!user) {
          throw ApiError.notFound('User not found');
        }

        const workspaceMembership = user.workspaces.find(
          ws => ws.workspaceId.toString() === workspaceId
        );

        if (!workspaceMembership || workspaceMembership.status !== 'active') {
          throw ApiError.forbidden('Access denied to this workspace');
        }

        next();
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.statusCode).json({
            success: false,
            message: error.message,
          });
        }

        return res.status(500).json({
          success: false,
          message: 'Workspace access check failed',
        });
      }
    };
  }

  /**
   * Check resource ownership
   */
  static requireOwnership(resourceIdParam: string = 'id') {
    return async (req: IAuthRequest, res: Response, next: NextFunction) => {
      try {
        if (!req.user) {
          throw ApiError.unauthorized('Authentication required');
        }

        // Super admins can access any resource
        if (req.user.isSuperAdmin) {
          return next();
        }

        const resourceId = req.params[resourceIdParam];
        if (!resourceId) {
          throw ApiError.badRequest('Resource ID required');
        }

        // This is a generic ownership check - specific implementations
        // should override this with their own resource-specific logic
        next();
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.statusCode).json({
            success: false,
            message: error.message,
          });
        }

        return res.status(500).json({
          success: false,
          message: 'Ownership check failed',
        });
      }
    };
  }

  /**
   * Create middleware for admin-only actions
   */
  static requireAdmin() {
    return RBACMiddleware.hasPermission(PERMISSION_MODULES.MEMBERS, 'create');
  }

  /**
   * Create middleware for manager-level permissions
   */
  static requireManager() {
    return async (req: IAuthRequest, res: Response, next: NextFunction) => {
      try {
        if (!req.user) {
          throw ApiError.unauthorized('Authentication required');
        }

        // Super admins have manager permissions
        if (req.user.isSuperAdmin) {
          return next();
        }

        if (!req.user.permissions) {
          throw ApiError.forbidden('No permissions assigned');
        }

        // Check if user has manager-level permissions (can manage projects or users)
        const hasManagerPermissions = req.user.permissions.some(
          (p: IPermissionSet) =>
            (p.module === PERMISSION_MODULES.PROJECTS &&
              p.permissions.create) ||
            (p.module === PERMISSION_MODULES.MEMBERS && p.permissions.edit)
        );

        if (!hasManagerPermissions) {
          throw ApiError.forbidden('Manager-level permissions required');
        }

        next();
      } catch (error) {
        if (error instanceof ApiError) {
          return res.status(error.statusCode).json({
            success: false,
            message: error.message,
          });
        }

        return res.status(500).json({
          success: false,
          message: 'Manager permission check failed',
        });
      }
    };
  }

  /**
   * Helper method to check scope-based permissions
   */
  private static async checkScopePermission(
    userId: Types.ObjectId,
    scope: string,
    options: {
      resourceOwnerId?: Types.ObjectId;
      userProjects?: Types.ObjectId[];
    }
  ): Promise<boolean> {
    switch (scope) {
      case 'all':
        return true;

      case 'own':
        return options.resourceOwnerId
          ? options.resourceOwnerId.toString() === userId.toString()
          : true;

      case 'assigned':
        // For assigned scope, check if user has access to the resource through project assignment
        // This would be implemented based on specific resource types
        return options.userProjects
          ? options.userProjects.some(
              projectId => projectId.toString() === userId.toString()
            )
          : true;

      default:
        return false;
    }
  }

  /**
   * Get user permissions for a specific workspace
   */
  static async getUserPermissions(
    userId: Types.ObjectId,
    workspaceId: Types.ObjectId
  ): Promise<IPermissionSet[]> {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Super admins have all permissions
    if (user.isSuperAdmin) {
      return Object.values(PERMISSION_MODULES).map(module => ({
        module,
        permissions: { view: true, create: true, edit: true, delete: true },
        scope: 'all',
      }));
    }

    const workspaceMembership = user.workspaces.find(
      ws => ws.workspaceId.toString() === workspaceId.toString()
    );

    if (!workspaceMembership || workspaceMembership.status !== 'active') {
      return [];
    }

    const role = await Role.findById(workspaceMembership.roleId);
    return role ? role.permissions : [];
  }

  /**
   * Check if user has specific permission in workspace
   */
  static async hasUserPermission(
    userId: Types.ObjectId,
    workspaceId: Types.ObjectId,
    module: string,
    action: 'view' | 'create' | 'edit' | 'delete'
  ): Promise<boolean> {
    const permissions = await RBACMiddleware.getUserPermissions(
      userId,
      workspaceId
    );
    const permission = permissions.find(p => p.module === module);
    return permission ? permission.permissions[action] : false;
  }
}

export default RBACMiddleware;
