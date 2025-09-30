import { Types } from 'mongoose';
import { Role, Workspace, User, AuditLog } from '@/models';
import { ApiError } from '@/utils/apiError';
import { IPermissionSet, PERMISSION_MODULES, IQueryParams, PERMISSION_CATEGORY_MAPPING } from '@/types';

export interface CreateRoleData {
  name: string;
  description?: string;
  permissions: IPermissionSet[];
  inheritFrom?: Types.ObjectId;
  defaultAccessScope?: 'workspace' | 'team' | 'own';
}

export interface UpdateRoleData {
  name?: string;
  description?: string;
  permissions?: IPermissionSet[];
  defaultAccessScope?: 'workspace' | 'team' | 'own';
  isActive?: boolean;
}

/**
 * Role management service for creating and managing workspace roles and permissions
 */
export class RoleService {
  /**
   * Create a new role in workspace
   */
  static async create(
    workspaceId: Types.ObjectId,
    roleData: CreateRoleData,
    createdBy: Types.ObjectId
  ): Promise<any> {
    const { name, description, permissions, inheritFrom, defaultAccessScope } =
      roleData;

    // Verify workspace exists
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace || !workspace.isActive) {
      throw ApiError.notFound('Workspace not found or inactive');
    }

    // Check if role name already exists in workspace
    const existingRole = await Role.findOne({
      workspaceId,
      name: name.trim(),
      isActive: true,
    });

    if (existingRole) {
      throw ApiError.conflict(
        'Role with this name already exists in workspace'
      );
    }

    // Validate inherit from role if provided
    let parentRole = null;
    if (inheritFrom) {
      parentRole = await Role.findById(inheritFrom);
      if (
        !parentRole ||
        parentRole.workspaceId.toString() !== workspaceId.toString()
      ) {
        throw ApiError.badRequest('Invalid parent role for this workspace');
      }
    }

    // Validate permissions
    const validatedPermissions = RoleService.validatePermissions(permissions);

    // Create role
    const role = new Role({
      name: name.trim(),
      description: description?.trim(),
      workspaceId,
      isSystemRole: false,
      inheritFrom,
      permissions: validatedPermissions,
      defaultAccessScope: defaultAccessScope || 'workspace',
      isActive: true,
      createdBy,
    });

    await role.save();

    // Log creation
    await AuditLog.logAction(createdBy, 'create', 'role', role._id, {
      workspaceId,
      details: {
        roleName: role.name,
        permissionCount: role.permissions.length,
        inheritFrom: parentRole?.name,
      },
    });

    return RoleService.formatRole(role);
  }

  /**
   * Get role by ID
   */
  static async getById(roleId: Types.ObjectId): Promise<any> {
    const role = await Role.findById(roleId)
      .populate('workspaceId', 'name workspaceId')
      .populate('inheritFrom', 'name description')
      .populate('createdBy', 'name email');

    if (!role) {
      throw ApiError.notFound('Role not found');
    }

    return RoleService.formatRole(role);
  }

  /**
   * Update role
   */
  static async update(
    roleId: Types.ObjectId,
    updateData: UpdateRoleData,
    updatedBy: Types.ObjectId
  ): Promise<any> {
    const role = await Role.findById(roleId);
    if (!role) {
      throw ApiError.notFound('Role not found');
    }

    // System roles cannot be updated
    if (role.isSystemRole) {
      throw ApiError.forbidden('System roles cannot be modified');
    }

    // Update fields
    if (updateData.name) {
      // Check for name conflicts
      const existingRole = await Role.findOne({
        workspaceId: role.workspaceId,
        name: updateData.name.trim(),
        _id: { $ne: roleId },
        isActive: true,
      });

      if (existingRole) {
        throw ApiError.conflict(
          'Role with this name already exists in workspace'
        );
      }

      role.name = updateData.name.trim();
    }

    if (updateData.description !== undefined) {
      role.description = updateData.description?.trim();
    }

    if (updateData.permissions) {
      role.permissions = RoleService.validatePermissions(
        updateData.permissions
      );
    }

    if (updateData.defaultAccessScope) {
      role.defaultAccessScope = updateData.defaultAccessScope;
    }

    if (updateData.isActive !== undefined) {
      role.isActive = updateData.isActive;
    }

    await role.save();

    // Log update
    await AuditLog.logAction(updatedBy, 'update', 'role', role._id, {
      workspaceId: role.workspaceId,
      details: {
        roleName: role.name,
        updated_fields: Object.keys(updateData),
      },
    });

    return RoleService.formatRole(role);
  }

  /**
   * Delete role (soft delete)
   */
  static async delete(
    roleId: Types.ObjectId,
    deletedBy: Types.ObjectId
  ): Promise<void> {
    const role = await Role.findById(roleId);
    if (!role) {
      throw ApiError.notFound('Role not found');
    }

    // System roles cannot be deleted
    if (role.isSystemRole) {
      throw ApiError.forbidden('System roles cannot be deleted');
    }

    // Check if role is in use
    const usersWithRole = await User.countDocuments({
      'workspaces.roleId': roleId,
    });

    if (usersWithRole > 0) {
      throw ApiError.conflict(
        `Role is assigned to ${usersWithRole} user(s) and cannot be deleted`
      );
    }

    role.isActive = false;
    await role.save();

    // Log deletion
    await AuditLog.logAction(deletedBy, 'delete', 'role', role._id, {
      workspaceId: role.workspaceId,
      details: { roleName: role.name },
    });
  }

  /**
   * Get all roles for workspace
   */
  static async getWorkspaceRoles(
    workspaceId: Types.ObjectId,
    queryParams: IQueryParams & {
      includeInactive?: boolean;
      isSystemRole?: boolean;
    } = {}
  ): Promise<{ roles: any[]; total: number; pagination: any }> {
    const {
      page = 1,
      limit = 50,
      search = '',
      sortBy = 'name',
      sortOrder = 'asc',
      includeInactive = false,
      isSystemRole,
    } = queryParams;

    // Build search query
    const searchQuery: any = { workspaceId };

    if (!includeInactive) {
      searchQuery.isActive = true;
    }

    if (isSystemRole !== undefined) {
      searchQuery.isSystemRole = isSystemRole;
    }

    if (search) {
      searchQuery.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sortDirection = sortOrder === 'desc' ? -1 : 1;

    // Get total count
    const total = await Role.countDocuments(searchQuery);

    // Get roles
    const roles = await Role.find(searchQuery)
      .populate('inheritFrom', 'name description')
      .populate('createdBy', 'name email')
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(limit);

    // Get user counts for each role
    const rolesWithUserCounts = await Promise.all(
      roles.map(async (role) => {
        const userCount = await User.countDocuments({
          'workspaces.roleId': role._id,
          'workspaces.status': 'active',
        });
        
        const formattedRole = RoleService.formatRole(role);
        formattedRole.userCount = userCount;
        return formattedRole;
      })
    );

    const totalPages = Math.ceil(total / limit);

    return {
      roles: rolesWithUserCounts,
      total,
      pagination: {
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Get role with user count
   */
  static async getRoleWithUserCount(roleId: Types.ObjectId): Promise<any> {
    const role = await Role.findById(roleId)
      .populate('workspaceId', 'name workspaceId')
      .populate('inheritFrom', 'name description')
      .populate('createdBy', 'name email');

    if (!role) {
      throw ApiError.notFound('Role not found');
    }

    // Count users with this role
    const userCount = await User.countDocuments({
      'workspaces.roleId': roleId,
      'workspaces.status': 'active',
    });

    const formattedRole = RoleService.formatRole(role);
    formattedRole.userCount = userCount;

    return formattedRole;
  }

  /**
   * Duplicate role with new name
   */
  static async duplicate(
    roleId: Types.ObjectId,
    newName: string,
    createdBy: Types.ObjectId
  ): Promise<any> {
    const originalRole = await Role.findById(roleId);
    if (!originalRole) {
      throw ApiError.notFound('Role not found');
    }

    // Check if new name already exists
    const existingRole = await Role.findOne({
      workspaceId: originalRole.workspaceId,
      name: newName.trim(),
      isActive: true,
    });

    if (existingRole) {
      throw ApiError.conflict(
        'Role with this name already exists in workspace'
      );
    }

    // Create duplicate
    const duplicatedRole = new Role({
      name: newName.trim(),
      description: originalRole.description
        ? `Copy of ${originalRole.description}`
        : undefined,
      workspaceId: originalRole.workspaceId,
      isSystemRole: false,
      permissions: [...originalRole.permissions],
      defaultAccessScope: originalRole.defaultAccessScope,
      isActive: true,
      createdBy,
    });

    await duplicatedRole.save();

    // Log duplication
    await AuditLog.logAction(createdBy, 'create', 'role', duplicatedRole._id, {
      workspaceId: originalRole.workspaceId,
      details: {
        action: 'duplicate',
        originalRole: originalRole.name,
        newRole: duplicatedRole.name,
      },
    });

    return RoleService.formatRole(duplicatedRole);
  }

  /**
   * Get permission template for role creation
   */
  static getPermissionTemplate(): any {
    const categories = {
      'Core Permissions': [
        PERMISSION_MODULES.PROJECTS,
        PERMISSION_MODULES.TASKS,
        PERMISSION_MODULES.SPRINTS,
        PERMISSION_MODULES.TEAM,
        PERMISSION_MODULES.FILES,
        PERMISSION_MODULES.REPORTS,
        PERMISSION_MODULES.WORKSPACE,
      ],
      'Team & User Management': [
        PERMISSION_MODULES.MEMBERS,
        PERMISSION_MODULES.ROLES,
      ],
      'Communication & Collaboration': [
        PERMISSION_MODULES.COMMENTS,
        PERMISSION_MODULES.NOTIFICATIONS,
        PERMISSION_MODULES.CHAT,
        PERMISSION_MODULES.MESSAGES,
      ],
      'Administration / Advanced': [
        PERMISSION_MODULES.BILLING,
        PERMISSION_MODULES.INTEGRATIONS,
        PERMISSION_MODULES.SETTINGS,
      ],
    };

    const template: Record<string, any> = {};

    Object.entries(categories).forEach(([categoryName, modules]) => {
      template[categoryName] = modules.map(module => ({
        module,
        permissions: {
          view: false,
          create: false,
          edit: false,
          delete: false,
        },
        scope: 'all',
      }));
    });

    return template;
  }

  /**
   * Get default role permissions for common roles
   */
  static getDefaultRolePermissions(roleName: string): IPermissionSet[] {
    const defaults: Record<string, IPermissionSet[]> = {
      Admin: Object.values(PERMISSION_MODULES).map(module => ({
        module,
        permissions: { view: true, create: true, edit: true, delete: true },
        scope: 'all',
      })),

      Manager: [
        {
          module: PERMISSION_MODULES.PROJECTS,
          permissions: { view: true, create: true, edit: true, delete: true },
          scope: 'all',
        },
        {
          module: PERMISSION_MODULES.TASKS,
          permissions: { view: true, create: true, edit: true, delete: true },
          scope: 'all',
        },
        {
          module: PERMISSION_MODULES.SPRINTS,
          permissions: { view: true, create: true, edit: true, delete: true },
          scope: 'all',
        },
        {
          module: PERMISSION_MODULES.TEAM,
          permissions: { view: true, create: false, edit: true, delete: false },
          scope: 'all',
        },
        {
          module: PERMISSION_MODULES.FILES,
          permissions: { view: true, create: true, edit: true, delete: true },
          scope: 'all',
        },
        {
          module: PERMISSION_MODULES.REPORTS,
          permissions: { view: true, create: true, edit: true, delete: false },
          scope: 'all',
        },
        {
          module: PERMISSION_MODULES.MEMBERS,
          permissions: { view: true, create: true, edit: true, delete: false },
          scope: 'all',
        },
        {
          module: PERMISSION_MODULES.COMMENTS,
          permissions: { view: true, create: true, edit: true, delete: true },
          scope: 'all',
        },
        {
          module: PERMISSION_MODULES.NOTIFICATIONS,
          permissions: { view: true, create: true, edit: true, delete: true },
          scope: 'all',
        },
      ],

      Member: [
        {
          module: PERMISSION_MODULES.PROJECTS,
          permissions: {
            view: true,
            create: false,
            edit: false,
            delete: false,
          },
          scope: 'assigned',
        },
        {
          module: PERMISSION_MODULES.TASKS,
          permissions: { view: true, create: true, edit: true, delete: false },
          scope: 'assigned',
        },
        {
          module: PERMISSION_MODULES.SPRINTS,
          permissions: {
            view: true,
            create: false,
            edit: false,
            delete: false,
          },
          scope: 'assigned',
        },
        {
          module: PERMISSION_MODULES.TEAM,
          permissions: {
            view: true,
            create: false,
            edit: false,
            delete: false,
          },
          scope: 'all',
        },
        {
          module: PERMISSION_MODULES.FILES,
          permissions: { view: true, create: true, edit: true, delete: false },
          scope: 'assigned',
        },
        {
          module: PERMISSION_MODULES.REPORTS,
          permissions: {
            view: true,
            create: false,
            edit: false,
            delete: false,
          },
          scope: 'assigned',
        },
        {
          module: PERMISSION_MODULES.COMMENTS,
          permissions: { view: true, create: true, edit: true, delete: false },
          scope: 'own',
        },
        {
          module: PERMISSION_MODULES.NOTIFICATIONS,
          permissions: { view: true, create: false, edit: true, delete: false },
          scope: 'own',
        },
      ],

      Guest: [
        {
          module: PERMISSION_MODULES.PROJECTS,
          permissions: {
            view: true,
            create: false,
            edit: false,
            delete: false,
          },
          scope: 'assigned',
        },
        {
          module: PERMISSION_MODULES.TASKS,
          permissions: {
            view: true,
            create: false,
            edit: false,
            delete: false,
          },
          scope: 'assigned',
        },
        {
          module: PERMISSION_MODULES.TEAM,
          permissions: {
            view: true,
            create: false,
            edit: false,
            delete: false,
          },
          scope: 'all',
        },
        {
          module: PERMISSION_MODULES.FILES,
          permissions: {
            view: true,
            create: false,
            edit: false,
            delete: false,
          },
          scope: 'assigned',
        },
        {
          module: PERMISSION_MODULES.COMMENTS,
          permissions: { view: true, create: true, edit: false, delete: false },
          scope: 'own',
        },
      ],
    };

    return defaults[roleName] || [];
  }

  /**
   * Validate permissions array
   */
  private static validatePermissions(
    permissions: IPermissionSet[]
  ): IPermissionSet[] {
    const validModules = Object.values(PERMISSION_MODULES);
    const validatedPermissions: IPermissionSet[] = [];

    for (const permission of permissions) {
      // Validate module
      if (!validModules.includes(permission.module as any)) {
        throw ApiError.badRequest(
          `Invalid permission module: ${permission.module}`
        );
      }

      // Validate permissions object
      const perms = permission.permissions;
      if (typeof perms !== 'object' || perms === null) {
        throw ApiError.badRequest('Invalid permissions object');
      }

      // Ensure all permission types are boolean
      const validatedPerms = {
        view: Boolean(perms.view),
        create: Boolean(perms.create),
        edit: Boolean(perms.edit),
        delete: Boolean(perms.delete),
      };

      // Validate scope
      const validScopes = ['all', 'assigned', 'own'];
      const scope = permission.scope || 'all';
      if (!validScopes.includes(scope)) {
        throw ApiError.badRequest(`Invalid permission scope: ${scope}`);
      }

      validatedPermissions.push({
        module: permission.module,
        permissions: validatedPerms,
        scope,
      });
    }

    return validatedPermissions;
  }

  /**
   * Format role for API response
   */
  private static formatRole(role: any): any {
    return {
      id: role._id,
      name: role.name,
      description: role.description,
      isSystemRole: role.isSystemRole,
      isActive: role.isActive,
      defaultAccessScope: role.defaultAccessScope,
      permissions: role.permissions,
      permissionMatrix: role.getPermissionMatrix(),
      workspace: role.workspaceId
        ? {
            id: role.workspaceId._id || role.workspaceId,
            name: (role.workspaceId as any).name,
            workspaceId: (role.workspaceId as any).workspaceId,
          }
        : undefined,
      inheritFrom: role.inheritFrom
        ? {
            id: role.inheritFrom._id || role.inheritFrom,
            name: (role.inheritFrom as any).name,
            description: (role.inheritFrom as any).description,
          }
        : undefined,
      createdBy: role.createdBy
        ? {
            id: role.createdBy._id || role.createdBy,
            name: (role.createdBy as any).name,
            email: (role.createdBy as any).email,
          }
        : undefined,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    };
  }

  /**
   * Get role statistics for workspace
   */
  static async getWorkspaceRoleStats(
    workspaceId: Types.ObjectId
  ): Promise<any> {
    const roles = await Role.find({ workspaceId, isActive: true });

    const stats = {
      totalRoles: roles.length,
      systemRoles: roles.filter(r => r.isSystemRole).length,
      customRoles: roles.filter(r => !r.isSystemRole).length,
      roleDistribution: [] as any[],
    };

    // Get user count for each role
    for (const role of roles) {
      const userCount = await User.countDocuments({
        'workspaces.roleId': role._id,
        'workspaces.status': 'active',
      });

      stats.roleDistribution.push({
        id: role._id,
        name: role.name,
        isSystemRole: role.isSystemRole,
        userCount,
      });
    }

    return stats;
  }

  /**
   * Convert frontend permission format to backend format
   * Frontend format: { [categoryId]: { view: boolean, create: boolean, edit: boolean, delete: boolean } }
   * Backend format: [{ module: string, permissions: { view: boolean, create: boolean, edit: boolean, delete: boolean } }]
   */
  static convertFrontendPermissionsToBackend(frontendPermissions: Record<string, any>): IPermissionSet[] {
    const backendPermissions: IPermissionSet[] = [];

    // Iterate through each category in frontend permissions
    Object.entries(frontendPermissions).forEach(([categoryId, permissionSet]) => {
      // Get modules for this category
      const modules = PERMISSION_CATEGORY_MAPPING[categoryId as keyof typeof PERMISSION_CATEGORY_MAPPING];
      
      if (modules && permissionSet) {
        // Create permission set for each module in this category
        modules.forEach(module => {
          backendPermissions.push({
            module,
            permissions: {
              view: permissionSet.view || false,
              create: permissionSet.create || false,
              edit: permissionSet.edit || false,
              delete: permissionSet.delete || false,
            },
          });
        });
      }
    });

    return backendPermissions;
  }

  /**
   * Convert backend permission format to frontend format
   * Backend format: [{ module: string, permissions: { view: boolean, create: boolean, edit: boolean, delete: boolean } }]
   * Frontend format: { [categoryId]: { view: boolean, create: boolean, edit: boolean, delete: boolean } }
   */
  static convertBackendPermissionsToFrontend(backendPermissions: IPermissionSet[]): Record<string, any> {
    const frontendPermissions: Record<string, any> = {};

    // Initialize all categories with default permissions
    Object.keys(PERMISSION_CATEGORY_MAPPING).forEach(categoryId => {
      frontendPermissions[categoryId] = {
        view: false,
        create: false,
        edit: false,
        delete: false,
      };
    });

    // Process backend permissions
    backendPermissions.forEach(permission => {
      // Find which category this module belongs to
      Object.entries(PERMISSION_CATEGORY_MAPPING).forEach(([categoryId, modules]) => {
        if (Array.from(modules).includes(permission.module as any)) {
          // Update the category permissions (use OR logic for multiple modules in same category)
          frontendPermissions[categoryId] = {
            view: frontendPermissions[categoryId].view || permission.permissions.view,
            create: frontendPermissions[categoryId].create || permission.permissions.create,
            edit: frontendPermissions[categoryId].edit || permission.permissions.edit,
            delete: frontendPermissions[categoryId].delete || permission.permissions.delete,
          };
        }
      });
    });

    return frontendPermissions;
  }
}

export default RoleService;
