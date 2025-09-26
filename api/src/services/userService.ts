import { Types } from 'mongoose';
import { User, Workspace, Role, Invite, AuditLog } from '@/models';
import { ApiError } from '@/utils/apiError';
import { IQueryParams } from '@/types';
import { InviteService } from './inviteService';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  designation?: string;
  yearsOfExperience?: string;
  roleId: Types.ObjectId;
  workspaceId: Types.ObjectId;
  sendInvite?: boolean;
}

export interface UpdateUserData {
  name?: string;
  designation?: string;
  yearsOfExperience?: string;
  isActive?: boolean;
  profilePicture?: string;
}

export interface UpdateUserRoleData {
  roleId: Types.ObjectId;
}

/**
 * User management service for CRUD operations and user administration
 */
export class UserService {
  /**
   * Create a new user (Admin only)
   */
  static async create(
    userData: CreateUserData,
    createdBy: Types.ObjectId
  ): Promise<any> {
    const {
      name,
      email,
      password,
      designation,
      yearsOfExperience,
      roleId,
      workspaceId,
      sendInvite = false
    } = userData;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw ApiError.conflict('User with this email already exists');
    }

    // Verify workspace exists
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace || !workspace.isActive) {
      throw ApiError.notFound('Workspace not found or inactive');
    }

    // Verify role exists and belongs to workspace
    const role = await Role.findById(roleId);
    if (!role || role.workspaceId.toString() !== workspaceId.toString()) {
      throw ApiError.badRequest('Invalid role for this workspace');
    }

    // Create user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      designation: designation?.trim(),
      yearsOfExperience,
      isEmailVerified: false,
      isActive: true,
      createdBy
    });

    await user.save();

    try {
      if (sendInvite) {
        // Send invite instead of directly adding to workspace
        await InviteService.create({
          email: user.email,
          workspaceId,
          roleId,
          invitedBy: createdBy
        });

        // Add user to workspace with invited status
        user.workspaces.push({
          workspaceId,
          roleId,
          joinedAt: new Date(),
          invitedBy: createdBy,
          status: 'invited'
        });

        workspace.members.push({
          userId: user._id,
          roleId,
          joinedAt: new Date(),
          invitedBy: createdBy,
          status: 'invited'
        });
      } else {
        // Add user directly to workspace
        await user.addWorkspace(workspaceId, roleId, createdBy);
        await workspace.addMember(user._id, roleId, createdBy);
      }

      await user.save();
      await workspace.save();

      // Log creation
      await AuditLog.logAction(
        createdBy,
        'create',
        'user',
        user._id,
        {
          workspaceId,
          details: {
            action: sendInvite ? 'create_user_with_invite' : 'create_user_direct',
            role: role.name,
            email: user.email
          }
        }
      );

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        designation: user.designation,
        yearsOfExperience: user.yearsOfExperience,
        isActive: user.isActive,
        isEmailVerified: user.isEmailVerified,
        role: {
          id: role._id,
          name: role.name
        },
        status: sendInvite ? 'invited' : 'active',
        createdAt: user.createdAt
      };

    } catch (error) {
      // Cleanup user if workspace operations fail
      await User.findByIdAndDelete(user._id);
      throw error;
    }
  }

  /**
   * Get user by ID with workspace context
   */
  static async getById(
    userId: Types.ObjectId,
    workspaceId?: Types.ObjectId
  ): Promise<any> {
    const user = await User.findById(userId)
      .populate('workspaces.workspaceId', 'name workspaceId')
      .populate('workspaces.roleId', 'name description')
      .populate('createdBy', 'name email');

    if (!user || !user.isActive) {
      throw ApiError.notFound('User not found or inactive');
    }

    if (workspaceId) {
      // Return workspace-specific profile
      const workspaceMembership = user.workspaces.find(
        ws => ws.workspaceId._id.toString() === workspaceId.toString()
      );

      if (!workspaceMembership) {
        throw ApiError.forbidden('User is not a member of this workspace');
      }

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        designation: user.designation,
        yearsOfExperience: user.yearsOfExperience,
        profilePicture: user.profilePicture,
        isEmailVerified: user.isEmailVerified,
        lastLogin: user.lastLogin,
        workspace: {
          id: workspaceMembership.workspaceId._id,
          name: (workspaceMembership.workspaceId as any).name,
          workspaceId: (workspaceMembership.workspaceId as any).workspaceId,
          role: {
            id: workspaceMembership.roleId._id,
            name: (workspaceMembership.roleId as any).name,
            description: (workspaceMembership.roleId as any).description
          },
          joinedAt: workspaceMembership.joinedAt,
          status: workspaceMembership.status
        },
        createdAt: user.createdAt,
        createdBy: user.createdBy
      };
    }

    // Return full profile with all workspaces
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      designation: user.designation,
      yearsOfExperience: user.yearsOfExperience,
      profilePicture: user.profilePicture,
      isEmailVerified: user.isEmailVerified,
      isSuperAdmin: user.isSuperAdmin,
      lastLogin: user.lastLogin,
      workspaces: user.workspaces.map(ws => ({
        id: (ws.workspaceId as any)._id,
        name: (ws.workspaceId as any).name,
        workspaceId: (ws.workspaceId as any).workspaceId,
        role: {
          id: (ws.roleId as any)._id,
          name: (ws.roleId as any).name,
          description: (ws.roleId as any).description
        },
        joinedAt: ws.joinedAt,
        status: ws.status
      })),
      createdAt: user.createdAt,
      createdBy: user.createdBy
    };
  }

  /**
   * Update user information
   */
  static async update(
    userId: Types.ObjectId,
    updateData: UpdateUserData,
    updatedBy: Types.ObjectId,
    workspaceId?: Types.ObjectId
  ): Promise<any> {
    const user = await User.findById(userId);
    if (!user || !user.isActive) {
      throw ApiError.notFound('User not found or inactive');
    }

    // Update allowed fields
    if (updateData.name) user.name = updateData.name.trim();
    if (updateData.designation !== undefined) user.designation = updateData.designation?.trim();
    if (updateData.yearsOfExperience) user.yearsOfExperience = updateData.yearsOfExperience;
    if (updateData.profilePicture !== undefined) user.profilePicture = updateData.profilePicture;
    if (updateData.isActive !== undefined) user.isActive = updateData.isActive;

    await user.save();

    // Log update
    await AuditLog.logAction(
      updatedBy,
      'update',
      'user',
      user._id,
      {
        workspaceId,
        details: { updated_fields: Object.keys(updateData) }
      }
    );

    return UserService.getById(userId, workspaceId);
  }

  /**
   * Update user role in workspace
   */
  static async updateRole(
    userId: Types.ObjectId,
    workspaceId: Types.ObjectId,
    roleData: UpdateUserRoleData,
    updatedBy: Types.ObjectId
  ): Promise<any> {
    const user = await User.findById(userId);
    if (!user || !user.isActive) {
      throw ApiError.notFound('User not found or inactive');
    }

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace || !workspace.isActive) {
      throw ApiError.notFound('Workspace not found or inactive');
    }

    const role = await Role.findById(roleData.roleId);
    if (!role || role.workspaceId.toString() !== workspaceId.toString()) {
      throw ApiError.badRequest('Invalid role for this workspace');
    }

    // Update role in both user and workspace
    await user.updateWorkspaceRole(workspaceId, roleData.roleId);
    await workspace.updateMemberRole(userId, roleData.roleId);

    // Log update
    await AuditLog.logAction(
      updatedBy,
      'update',
      'user',
      user._id,
      {
        workspaceId,
        details: { action: 'update_role', newRole: role.name }
      }
    );

    return UserService.getById(userId, workspaceId);
  }

  /**
   * Deactivate user (soft delete)
   */
  static async deactivate(
    userId: Types.ObjectId,
    deactivatedBy: Types.ObjectId,
    workspaceId?: Types.ObjectId
  ): Promise<void> {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.notFound('User not found');
    }

    // Check if trying to deactivate super admin
    if (user.isSuperAdmin) {
      throw ApiError.forbidden('Cannot deactivate super admin');
    }

    user.isActive = false;
    await user.save();

    // Clear all refresh tokens to force logout
    await user.clearRefreshTokens();

    // Log deactivation
    await AuditLog.logAction(
      deactivatedBy,
      'update',
      'user',
      user._id,
      {
        workspaceId,
        details: { action: 'deactivate' }
      }
    );
  }

  /**
   * Reactivate user
   */
  static async reactivate(
    userId: Types.ObjectId,
    reactivatedBy: Types.ObjectId,
    workspaceId?: Types.ObjectId
  ): Promise<void> {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.notFound('User not found');
    }

    user.isActive = true;
    await user.save();

    // Log reactivation
    await AuditLog.logAction(
      reactivatedBy,
      'update',
      'user',
      user._id,
      {
        workspaceId,
        details: { action: 'reactivate' }
      }
    );
  }

  /**
   * Remove user from workspace
   */
  static async removeFromWorkspace(
    userId: Types.ObjectId,
    workspaceId: Types.ObjectId,
    removedBy: Types.ObjectId
  ): Promise<void> {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.notFound('User not found');
    }

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace || !workspace.isActive) {
      throw ApiError.notFound('Workspace not found or inactive');
    }

    // Check if trying to remove workspace owner
    if (workspace.ownerId.toString() === userId.toString()) {
      throw ApiError.badRequest('Cannot remove workspace owner');
    }

    // Remove from workspace and user
    await workspace.removeMember(userId);
    await user.removeWorkspace(workspaceId);

    // Log removal
    await AuditLog.logAction(
      removedBy,
      'delete',
      'user',
      user._id,
      {
        workspaceId,
        details: { action: 'remove_from_workspace' }
      }
    );
  }

  /**
   * Get users in workspace with pagination and filtering
   */
  static async getWorkspaceUsers(
    workspaceId: Types.ObjectId,
    queryParams: IQueryParams & { 
      status?: 'active' | 'invited' | 'suspended';
      roleId?: string;
    } = {}
  ): Promise<{ users: any[]; total: number; pagination: any }> {
    const {
      page = 1,
      limit = 20,
      search = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      status,
      roleId
    } = queryParams;

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace || !workspace.isActive) {
      throw ApiError.notFound('Workspace not found or inactive');
    }

    // Filter members by status and role
    let filteredMembers = workspace.members;

    if (status) {
      filteredMembers = filteredMembers.filter(member => member.status === status);
    }

    if (roleId) {
      filteredMembers = filteredMembers.filter(
        member => member.roleId.toString() === roleId
      );
    }

    const memberIds = filteredMembers.map(member => member.userId);

    // Build search query
    const searchQuery: any = {
      _id: { $in: memberIds }
    };

    if (search) {
      searchQuery.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { designation: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sortDirection = sortOrder === 'desc' ? -1 : 1;

    // Get total count
    const total = await User.countDocuments(searchQuery);

    // Get users
    const users = await User.find(searchQuery)
      .select('name email designation profilePicture isActive isEmailVerified lastLogin createdAt')
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'name email');

    // Enrich with workspace-specific data
    const enrichedUsers = await Promise.all(
      users.map(async (user) => {
        const memberData = workspace.members.find(
          member => member.userId.toString() === user._id.toString()
        );

        const role = await Role.findById(memberData?.roleId);

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          designation: user.designation,
          profilePicture: user.profilePicture,
          isActive: user.isActive,
          isEmailVerified: user.isEmailVerified,
          lastLogin: user.lastLogin,
          role: role ? {
            id: role._id,
            name: role.name,
            description: role.description
          } : null,
          workspaceStatus: memberData?.status,
          joinedAt: memberData?.joinedAt,
          invitedBy: memberData?.invitedBy,
          createdAt: user.createdAt,
          createdBy: user.createdBy
        };
      })
    );

    const totalPages = Math.ceil(total / limit);

    return {
      users: enrichedUsers,
      total,
      pagination: {
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  }

  /**
   * Search all users (Super Admin only)
   */
  static async searchAll(
    queryParams: IQueryParams & { 
      workspaceId?: string;
      isSuperAdmin?: boolean;
      isActive?: boolean;
    } = {}
  ): Promise<{ users: any[]; total: number; pagination: any }> {
    const {
      page = 1,
      limit = 20,
      search = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      workspaceId,
      isSuperAdmin,
      isActive
    } = queryParams;

    // Build search query
    const searchQuery: any = {};

    if (search) {
      searchQuery.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { designation: { $regex: search, $options: 'i' } }
      ];
    }

    if (workspaceId) {
      searchQuery['workspaces.workspaceId'] = workspaceId;
    }

    if (isSuperAdmin !== undefined) {
      searchQuery.isSuperAdmin = isSuperAdmin;
    }

    if (isActive !== undefined) {
      searchQuery.isActive = isActive;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sortDirection = sortOrder === 'desc' ? -1 : 1;

    // Get total count
    const total = await User.countDocuments(searchQuery);

    // Get users
    const users = await User.find(searchQuery)
      .select('name email designation profilePicture isActive isSuperAdmin isEmailVerified lastLogin workspaces createdAt')
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(limit)
      .populate('workspaces.workspaceId', 'name workspaceId')
      .populate('workspaces.roleId', 'name')
      .populate('createdBy', 'name email');

    const enrichedUsers = users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      designation: user.designation,
      profilePicture: user.profilePicture,
      isActive: user.isActive,
      isSuperAdmin: user.isSuperAdmin,
      isEmailVerified: user.isEmailVerified,
      lastLogin: user.lastLogin,
      workspaceCount: user.workspaces.length,
      workspaces: user.workspaces.map(ws => ({
        id: (ws.workspaceId as any)._id,
        name: (ws.workspaceId as any).name,
        workspaceId: (ws.workspaceId as any).workspaceId,
        role: (ws.roleId as any).name,
        status: ws.status
      })),
      createdAt: user.createdAt,
      createdBy: user.createdBy
    }));

    const totalPages = Math.ceil(total / limit);

    return {
      users: enrichedUsers,
      total,
      pagination: {
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  }

  /**
   * Get user statistics for workspace
   */
  static async getWorkspaceStats(workspaceId: Types.ObjectId): Promise<any> {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace || !workspace.isActive) {
      throw ApiError.notFound('Workspace not found or inactive');
    }

    const totalUsers = workspace.members.length;
    const activeUsers = workspace.getMembersByStatus('active').length;
    const invitedUsers = workspace.getMembersByStatus('invited').length;
    const suspendedUsers = workspace.getMembersByStatus('suspended').length;

    // Get role distribution
    const roleStats = await Role.aggregate([
      { $match: { workspaceId, isActive: true } },
      {
        $lookup: {
          from: 'workspaces',
          let: { roleId: '$_id' },
          pipeline: [
            { $match: { _id: workspaceId } },
            { $unwind: '$members' },
            { $match: { $expr: { $eq: ['$members.roleId', '$$roleId'] } } },
            { $group: { _id: null, count: { $sum: 1 } } }
          ],
          as: 'memberCount'
        }
      },
      {
        $project: {
          name: 1,
          memberCount: { $ifNull: [{ $arrayElemAt: ['$memberCount.count', 0] }, 0] }
        }
      }
    ]);

    // Get recent activity
    const recentUsers = await User.find({
      _id: { $in: workspace.members.map(m => m.userId) }
    })
    .sort({ lastLogin: -1 })
    .limit(5)
    .select('name email lastLogin');

    return {
      totalUsers,
      usersByStatus: {
        active: activeUsers,
        invited: invitedUsers,
        suspended: suspendedUsers
      },
      roleDistribution: roleStats,
      recentActivity: recentUsers.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email,
        lastLogin: user.lastLogin
      }))
    };
  }
}

export default UserService;
