import { Types } from 'mongoose';
import { Workspace, User, Role, AuditLog } from '@/models';
import { ApiError } from '@/utils/apiError';
import { IQueryParams } from '@/types';

export interface CreateWorkspaceData {
  name: string;
  description?: string;
  ownerId: Types.ObjectId;
  settings?: {
    allowPublicInvites?: boolean;
    requireAdminApproval?: boolean;
    timezone?: string;
    language?: string;
  };
}

export interface UpdateWorkspaceData {
  name?: string;
  description?: string;
  settings?: {
    allowPublicInvites?: boolean;
    requireAdminApproval?: boolean;
    defaultRole?: Types.ObjectId;
    timezone?: string;
    language?: string;
  };
}

/**
 * Workspace service for managing workspaces and memberships
 */
export class WorkspaceService {
  /**
   * Create a new workspace
   */
  static async create(data: CreateWorkspaceData): Promise<any> {
    const { name, description, ownerId, settings } = data;

    // Verify owner exists
    const owner = await User.findById(ownerId);
    if (!owner || !owner.isActive) {
      throw ApiError.notFound('Owner not found or inactive');
    }

    // Create workspace
    const workspace = new Workspace({
      name: name.trim(),
      description: description?.trim(),
      ownerId,
      settings: {
        allowPublicInvites: settings?.allowPublicInvites || false,
        requireAdminApproval: settings?.requireAdminApproval || true,
        timezone: settings?.timezone || 'UTC',
        language: settings?.language || 'en'
      }
    });

    await workspace.save();

    // Log creation
    await AuditLog.logAction(
      ownerId,
      'create',
      'workspace',
      workspace._id,
      { details: { name, workspaceId: workspace.workspaceId } }
    );

    return workspace;
  }

  /**
   * Get workspace by ID or workspaceId
   */
  static async getById(id: string): Promise<any> {
    let workspace;

    // Try to find by MongoDB ObjectId first, then by workspaceId
    if (Types.ObjectId.isValid(id)) {
      workspace = await Workspace.findById(id)
        .populate('ownerId', 'name email')
        .populate('members.userId', 'name email designation')
        .populate('members.roleId', 'name description')
        .populate('settings.defaultRole', 'name description');
    } else {
      workspace = await Workspace.findByWorkspaceId(id)
        .populate('ownerId', 'name email')
        .populate('members.userId', 'name email designation')
        .populate('members.roleId', 'name description')
        .populate('settings.defaultRole', 'name description');
    }

    if (!workspace) {
      throw ApiError.notFound('Workspace not found');
    }

    return workspace;
  }

  /**
   * Update workspace
   */
  static async update(
    workspaceId: Types.ObjectId,
    data: UpdateWorkspaceData,
    updatedBy: Types.ObjectId
  ): Promise<any> {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      throw ApiError.notFound('Workspace not found');
    }

    // Update basic fields
    if (data.name) workspace.name = data.name.trim();
    if (data.description !== undefined) workspace.description = data.description?.trim();

    // Update settings
    if (data.settings) {
      if (data.settings.allowPublicInvites !== undefined) {
        workspace.settings.allowPublicInvites = data.settings.allowPublicInvites;
      }
      if (data.settings.requireAdminApproval !== undefined) {
        workspace.settings.requireAdminApproval = data.settings.requireAdminApproval;
      }
      if (data.settings.defaultRole) {
        workspace.settings.defaultRole = data.settings.defaultRole;
      }
      if (data.settings.timezone) {
        workspace.settings.timezone = data.settings.timezone;
      }
      if (data.settings.language) {
        workspace.settings.language = data.settings.language;
      }
    }

    await workspace.save();

    // Log update
    await AuditLog.logAction(
      updatedBy,
      'update',
      'workspace',
      workspace._id,
      {
        workspaceId: workspace._id,
        details: { updated_fields: Object.keys(data) }
      }
    );

    return workspace;
  }

  /**
   * Delete workspace (soft delete)
   */
  static async delete(workspaceId: Types.ObjectId, deletedBy: Types.ObjectId): Promise<void> {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      throw ApiError.notFound('Workspace not found');
    }

    // Check if user is the owner
    if (workspace.ownerId.toString() !== deletedBy.toString()) {
      throw ApiError.forbidden('Only workspace owner can delete the workspace');
    }

    workspace.isActive = false;
    await workspace.save();

    // Deactivate all workspace members
    const memberIds = workspace.members.map(member => member.userId);
    await User.updateMany(
      { _id: { $in: memberIds } },
      { $set: { 'workspaces.$[elem].status': 'suspended' } },
      { arrayFilters: [{ 'elem.workspaceId': workspaceId }] }
    );

    // Log deletion
    await AuditLog.logAction(
      deletedBy,
      'delete',
      'workspace',
      workspace._id,
      {
        workspaceId: workspace._id,
        details: { workspaceId: workspace.workspaceId, name: workspace.name }
      }
    );
  }

  /**
   * Add member to workspace
   */
  static async addMember(
    workspaceId: Types.ObjectId,
    userId: Types.ObjectId,
    roleId: Types.ObjectId,
    addedBy: Types.ObjectId
  ): Promise<void> {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      throw ApiError.notFound('Workspace not found');
    }

    const user = await User.findById(userId);
    if (!user || !user.isActive) {
      throw ApiError.notFound('User not found or inactive');
    }

    const role = await Role.findById(roleId);
    if (!role || role.workspaceId.toString() !== workspaceId.toString()) {
      throw ApiError.badRequest('Invalid role for this workspace');
    }

    // Add to workspace
    await workspace.addMember(userId, roleId, addedBy);
    
    // Add to user's workspaces
    await user.addWorkspace(workspaceId, roleId, addedBy);

    // Log action
    await AuditLog.logAction(
      addedBy,
      'create',
      'user',
      userId,
      {
        workspaceId,
        details: { action: 'add_member', role: role.name }
      }
    );
  }

  /**
   * Remove member from workspace
   */
  static async removeMember(
    workspaceId: Types.ObjectId,
    userId: Types.ObjectId,
    removedBy: Types.ObjectId
  ): Promise<void> {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      throw ApiError.notFound('Workspace not found');
    }

    // Check if trying to remove the owner
    if (workspace.ownerId.toString() === userId.toString()) {
      throw ApiError.badRequest('Cannot remove workspace owner');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.notFound('User not found');
    }

    // Remove from workspace
    await workspace.removeMember(userId);
    
    // Remove from user's workspaces
    await user.removeWorkspace(workspaceId);

    // Log action
    await AuditLog.logAction(
      removedBy,
      'delete',
      'user',
      userId,
      {
        workspaceId,
        details: { action: 'remove_member' }
      }
    );
  }

  /**
   * Update member role
   */
  static async updateMemberRole(
    workspaceId: Types.ObjectId,
    userId: Types.ObjectId,
    newRoleId: Types.ObjectId,
    updatedBy: Types.ObjectId
  ): Promise<void> {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      throw ApiError.notFound('Workspace not found');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.notFound('User not found');
    }

    const role = await Role.findById(newRoleId);
    if (!role || role.workspaceId.toString() !== workspaceId.toString()) {
      throw ApiError.badRequest('Invalid role for this workspace');
    }

    // Update in workspace
    await workspace.updateMemberRole(userId, newRoleId);
    
    // Update in user's workspaces
    await user.updateWorkspaceRole(workspaceId, newRoleId);

    // Log action
    await AuditLog.logAction(
      updatedBy,
      'update',
      'user',
      userId,
      {
        workspaceId,
        details: { action: 'update_role', newRole: role.name }
      }
    );
  }

  /**
   * Transfer workspace ownership
   */
  static async transferOwnership(
    workspaceId: Types.ObjectId,
    newOwnerId: Types.ObjectId,
    currentOwnerId: Types.ObjectId
  ): Promise<void> {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      throw ApiError.notFound('Workspace not found');
    }

    // Verify current owner
    if (workspace.ownerId.toString() !== currentOwnerId.toString()) {
      throw ApiError.forbidden('Only current owner can transfer ownership');
    }

    const newOwner = await User.findById(newOwnerId);
    if (!newOwner || !newOwner.isActive) {
      throw ApiError.notFound('New owner not found or inactive');
    }

    // Transfer ownership
    await workspace.transferOwnership(newOwnerId);

    // Ensure new owner has admin role
    const adminRole = await Role.findOne({ 
      workspaceId, 
      name: 'Admin', 
      isSystemRole: true 
    });

    if (adminRole) {
      await workspace.updateMemberRole(newOwnerId, adminRole._id);
      await newOwner.updateWorkspaceRole(workspaceId, adminRole._id);
    }

    // Log action
    await AuditLog.logAction(
      currentOwnerId,
      'update',
      'workspace',
      workspace._id,
      {
        workspaceId,
        details: { 
          action: 'transfer_ownership', 
          newOwner: newOwner.email 
        }
      }
    );
  }

  /**
   * Get workspace members with pagination
   */
  static async getMembers(
    workspaceId: Types.ObjectId,
    queryParams: IQueryParams = {}
  ): Promise<{ members: any[]; total: number; pagination: any }> {
    const {
      page = 1,
      limit = 20,
      search = '',
      sortBy = 'joinedAt',
      sortOrder = 'desc'
    } = queryParams;

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      throw ApiError.notFound('Workspace not found');
    }

    const memberIds = workspace.members
      .filter(member => member.status === 'active')
      .map(member => member.userId);

    // Build search query
    const searchQuery: any = {
      _id: { $in: memberIds },
      isActive: true
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

    // Get members
    const users = await User.find(searchQuery)
      .select('name email designation profilePicture lastLogin createdAt')
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(limit);

    // Enrich with workspace-specific data
    const members = users.map(user => {
      const memberData = workspace.members.find(
        member => member.userId.toString() === user._id.toString()
      );

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        designation: user.designation,
        profilePicture: user.profilePicture,
        lastLogin: user.lastLogin,
        joinedAt: memberData?.joinedAt,
        roleId: memberData?.roleId,
        status: memberData?.status,
        invitedBy: memberData?.invitedBy
      };
    });

    const totalPages = Math.ceil(total / limit);

    return {
      members,
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
   * Get workspace statistics
   */
  static async getStats(workspaceId: Types.ObjectId): Promise<any> {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      throw ApiError.notFound('Workspace not found');
    }

    const totalMembers = workspace.getActiveMembersCount();
    const membersByStatus = {
      active: workspace.getMembersByStatus('active').length,
      invited: workspace.getMembersByStatus('invited').length,
      suspended: workspace.getMembersByStatus('suspended').length
    };

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

    return {
      totalMembers,
      membersByStatus,
      roleDistribution: roleStats,
      workspaceInfo: {
        id: workspace._id,
        workspaceId: workspace.workspaceId,
        name: workspace.name,
        createdAt: workspace.createdAt,
        subscriptionPlan: workspace.subscriptionPlan
      }
    };
  }

  /**
   * Search workspaces (for super admin)
   */
  static async search(
    queryParams: IQueryParams & { ownerId?: string }
  ): Promise<{ workspaces: any[]; total: number; pagination: any }> {
    const {
      page = 1,
      limit = 20,
      search = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      ownerId
    } = queryParams;

    // Build search query
    const searchQuery: any = { isActive: true };

    if (search) {
      searchQuery.$or = [
        { name: { $regex: search, $options: 'i' } },
        { workspaceId: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (ownerId) {
      searchQuery.ownerId = ownerId;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sortDirection = sortOrder === 'desc' ? -1 : 1;

    // Get total count
    const total = await Workspace.countDocuments(searchQuery);

    // Get workspaces
    const workspaces = await Workspace.find(searchQuery)
      .populate('ownerId', 'name email')
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(limit);

    const enrichedWorkspaces = workspaces.map(workspace => ({
      id: workspace._id,
      workspaceId: workspace.workspaceId,
      name: workspace.name,
      description: workspace.description,
      owner: workspace.ownerId,
      memberCount: workspace.getActiveMembersCount(),
      subscriptionPlan: workspace.subscriptionPlan,
      createdAt: workspace.createdAt,
      updatedAt: workspace.updatedAt
    }));

    const totalPages = Math.ceil(total / limit);

    return {
      workspaces: enrichedWorkspaces,
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
}

export default WorkspaceService;
