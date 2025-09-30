import { Types } from 'mongoose';
import { Invite, User, Workspace, Role, AuditLog } from '@/models';
import { ApiError } from '@/utils/apiError';
import { config } from '@/config/env';
import { IQueryParams } from '@/types';
import nodemailer from 'nodemailer';

export interface CreateInviteData {
  email: string;
  workspaceId: Types.ObjectId;
  roleId: Types.ObjectId;
  invitedBy: Types.ObjectId;
}

export interface AcceptInviteData {
  token: string;
  password?: string; // If user doesn't exist
  name?: string; // If user doesn't exist
}

/**
 * Invite service for managing workspace invitations
 */
export class InviteService {
  /**
   * Create and send workspace invitation
   */
  static async create(inviteData: CreateInviteData): Promise<any> {
    const { email, workspaceId, roleId, invitedBy } = inviteData;

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

    // Check if user already exists in workspace
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      const isInWorkspace = existingUser.workspaces.some(
        ws => ws.workspaceId.toString() === workspaceId.toString()
      );
      if (isInWorkspace) {
        throw ApiError.conflict('User is already a member of this workspace');
      }
    }

    // Check for existing pending invites
    const existingInvite = await Invite.findOne({
      email: email.toLowerCase(),
      workspaceId,
      status: 'pending',
      expiresAt: { $gt: new Date() },
    });

    if (existingInvite) {
      throw ApiError.conflict('A pending invite already exists for this email');
    }

    // Create invite
    const invite = new Invite({
      email: email.toLowerCase().trim(),
      workspaceId,
      roleId,
      invitedBy,
    });

    await invite.save();

    // Send email invitation
    if (config.SMTP_HOST && config.SMTP_USER) {
      try {
        await InviteService.sendInviteEmail(invite, workspace, role);
      } catch (error) {
        console.error('Failed to send invite email:', error);
        // Don't fail the invite creation if email fails
      }
    }

    // Log invite creation
    await AuditLog.logAction(invitedBy, 'invite', 'user', invite._id, {
      workspaceId,
      details: {
        email,
        role: role.name,
        workspace: workspace.name,
      },
    });

    return {
      id: invite._id,
      email: invite.email,
      workspace: {
        id: workspace._id,
        workspaceId: workspace.workspaceId,
        name: workspace.name,
      },
      role: {
        id: role._id,
        name: role.name,
        description: role.description,
      },
      token: invite.token,
      expiresAt: invite.expiresAt,
      inviteUrl: (invite as any).getInviteUrl(config.FRONTEND_URL),
      status: invite.status,
      createdAt: invite.createdAt,
    };
  }

  /**
   * Accept workspace invitation
   */
  static async accept(acceptData: AcceptInviteData): Promise<any> {
    const { token, password, name } = acceptData;

    // Find and validate invite
    const invite = await (Invite as any)
      .findByToken(token)
      .populate('workspaceId', 'name workspaceId isActive')
      .populate('roleId', 'name description')
      .populate('invitedBy', 'name email');

    if (!invite) {
      throw ApiError.badRequest('Invalid or expired invite token');
    }

    if (!(invite as any).isValid()) {
      throw ApiError.badRequest('Invite has expired');
    }

    const workspace = invite.workspaceId as any;
    const role = invite.roleId as any;

    if (!workspace.isActive) {
      throw ApiError.badRequest('Workspace is no longer active');
    }

    // Check if user exists
    let user = await User.findByEmail(invite.email);

    if (!user) {
      // Create new user
      if (!password || !name) {
        throw ApiError.badRequest(
          'Name and password are required for new users'
        );
      }

      user = new User({
        name: name.trim(),
        email: invite.email,
        password,
        isEmailVerified: true, // Auto-verify invited users
        isActive: true,
      });

      await user.save();
    } else {
      // Check if user is already in workspace
      const isInWorkspace = user.workspaces.some(
        ws => ws.workspaceId.toString() === workspace._id.toString()
      );

      if (isInWorkspace) {
        throw ApiError.conflict('User is already a member of this workspace');
      }
    }

    // Add user to workspace
    await (user as any).addWorkspace(workspace._id, role._id, invite.invitedBy);
    await (workspace as any).addMember(user._id, role._id, invite.invitedBy);

    // Accept the invite
    await invite.accept();

    // Log acceptance
    await AuditLog.logAction(user._id, 'accept_invite', 'user', user._id, {
      workspaceId: workspace._id,
      details: {
        inviteId: invite._id,
        role: role.name,
        workspace: workspace.name,
      },
    });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
      },
      workspace: {
        id: workspace._id,
        workspaceId: workspace.workspaceId,
        name: workspace.name,
      },
      role: {
        id: role._id,
        name: role.name,
        description: role.description,
      },
      message: 'Invite accepted successfully',
    };
  }

  /**
   * Revoke invitation
   */
  static async revoke(
    inviteId: Types.ObjectId,
    revokedBy: Types.ObjectId
  ): Promise<void> {
    const invite = await Invite.findById(inviteId);
    if (!invite) {
      throw ApiError.notFound('Invite not found');
    }

    await (invite as any).revoke();

    // Log revocation
    await AuditLog.logAction(revokedBy, 'update', 'invite', invite._id, {
      workspaceId: invite.workspaceId,
      details: {
        action: 'revoke',
        email: invite.email,
      },
    });
  }

  /**
   * Resend invitation
   */
  static async resend(
    inviteId: Types.ObjectId,
    resentBy: Types.ObjectId
  ): Promise<any> {
    const invite = await Invite.findById(inviteId)
      .populate('workspaceId', 'name workspaceId')
      .populate('roleId', 'name description');

    if (!invite) {
      throw ApiError.notFound('Invite not found');
    }

    if (invite.status !== 'pending') {
      throw ApiError.badRequest('Can only resend pending invites');
    }

    if (!(invite as any).isValid()) {
      throw ApiError.badRequest('Invite has expired');
    }

    // Send email invitation
    if (config.SMTP_HOST && config.SMTP_USER) {
      try {
        await InviteService.sendInviteEmail(
          invite,
          invite.workspaceId as any,
          invite.roleId as any
        );
      } catch (error) {
        console.error('Failed to resend invite email:', error);
        throw ApiError.internal('Failed to send invitation email');
      }
    }

    // Log resend
    await AuditLog.logAction(resentBy, 'update', 'invite', invite._id, {
      workspaceId: invite.workspaceId,
      details: {
        action: 'resend',
        email: invite.email,
      },
    });

    return {
      id: invite._id,
      email: invite.email,
      message: 'Invitation resent successfully',
    };
  }

  /**
   * Get invite by token (for validation)
   */
  static async getByToken(token: string): Promise<any> {
    const invite = await (Invite as any)
      .findByToken(token)
      .populate('workspaceId', 'name workspaceId description')
      .populate('roleId', 'name description')
      .populate('invitedBy', 'name email');

    if (!invite) {
      throw ApiError.notFound('Invite not found or expired');
    }

    return {
      id: invite._id,
      email: invite.email,
      workspace: {
        id: (invite.workspaceId as any)._id,
        workspaceId: (invite.workspaceId as any).workspaceId,
        name: (invite.workspaceId as any).name,
        description: (invite.workspaceId as any).description,
      },
      role: {
        id: (invite.roleId as any)._id,
        name: (invite.roleId as any).name,
        description: (invite.roleId as any).description,
      },
      invitedBy: {
        name: (invite.invitedBy as any).name,
        email: (invite.invitedBy as any).email,
      },
      expiresAt: invite.expiresAt,
      createdAt: invite.createdAt,
      isValid: (invite as any).isValid(),
    };
  }

  /**
   * Get workspace invites with pagination
   */
  static async getWorkspaceInvites(
    workspaceId: Types.ObjectId,
    queryParams: IQueryParams & { status?: string } = {}
  ): Promise<{ invites: any[]; total: number; pagination: any }> {
    const {
      page = 1,
      limit = 20,
      search = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      status,
    } = queryParams;

    // Build search query
    const searchQuery: any = { workspaceId };

    if (search) {
      searchQuery.email = { $regex: search, $options: 'i' };
    }

    if (status) {
      searchQuery.status = status;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sortDirection = sortOrder === 'desc' ? -1 : 1;

    // Get total count
    const total = await Invite.countDocuments(searchQuery);

    // Get invites
    const invites = await Invite.find(searchQuery)
      .populate('roleId', 'name description')
      .populate('invitedBy', 'name email')
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(limit);

    const enrichedInvites = invites.map(invite => ({
      id: invite._id,
      email: invite.email,
      role: {
        id: (invite.roleId as any)._id,
        name: (invite.roleId as any).name,
        description: (invite.roleId as any).description,
      },
      invitedBy: {
        id: (invite.invitedBy as any)._id,
        name: (invite.invitedBy as any).name,
        email: (invite.invitedBy as any).email,
      },
      status: invite.status,
      expiresAt: invite.expiresAt,
      acceptedAt: invite.acceptedAt,
      createdAt: invite.createdAt,
      isValid: (invite as any).isValid(),
    }));

    const totalPages = Math.ceil(total / limit);

    return {
      invites: enrichedInvites,
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
   * Get user's pending invites
   */
  static async getUserInvites(email: string): Promise<any[]> {
    const invites = await (Invite as any).findPendingInvites(email);

    return invites.map((invite: any) => ({
      id: invite._id,
      workspace: {
        id: (invite.workspaceId as any)._id,
        workspaceId: (invite.workspaceId as any).workspaceId,
        name: (invite.workspaceId as any).name,
        description: (invite.workspaceId as any).description,
      },
      role: {
        id: (invite.roleId as any)._id,
        name: (invite.roleId as any).name,
        description: (invite.roleId as any).description,
      },
      invitedBy: {
        name: (invite.invitedBy as any).name,
        email: (invite.invitedBy as any).email,
      },
      token: invite.token,
      expiresAt: invite.expiresAt,
      createdAt: invite.createdAt,
      inviteUrl: invite.getInviteUrl(config.FRONTEND_URL),
    }));
  }

  /**
   * Get invite statistics for workspace
   */
  static async getWorkspaceStats(workspaceId: Types.ObjectId): Promise<any> {
    const stats = await (Invite as any).getWorkspaceStats(workspaceId);

    return {
      total: Object.values(stats).reduce(
        (sum: any, count: any) => sum + count,
        0
      ),
      byStatus: stats,
      pending: stats.pending || 0,
      accepted: stats.accepted || 0,
      expired: stats.expired || 0,
      revoked: stats.revoked || 0,
    };
  }

  /**
   * Cleanup expired invites (scheduled job)
   */
  static async cleanupExpired(): Promise<void> {
    await (Invite as any).cleanupExpired();
  }

  /**
   * Send invite email
   */
  private static async sendInviteEmail(
    invite: any,
    workspace: any,
    role: any
  ): Promise<void> {
    if (!config.SMTP_HOST || !config.SMTP_USER) {
      throw new Error('Email configuration not found');
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: config.SMTP_PORT === 465,
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS,
      },
    });

    const inviteUrl = (invite as any).getInviteUrl(config.FRONTEND_URL);

    // Email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Workspace Invitation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #67909b; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .button { display: inline-block; padding: 12px 24px; background: #67909b; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
          .footer { padding: 20px; font-size: 12px; color: #666; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>You're Invited to Join ${workspace.name}</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>You've been invited to join the <strong>${workspace.name}</strong> workspace on Project Accel as a <strong>${role.name}</strong>.</p>
            <p>Click the button below to accept your invitation:</p>
            <a href="${inviteUrl}" class="button">Accept Invitation</a>
            <p>Or copy and paste this link in your browser:</p>
            <p><a href="${inviteUrl}">${inviteUrl}</a></p>
            <p>This invitation will expire on ${invite.expiresAt.toLocaleDateString()}.</p>
            <p>If you have any questions, please contact your workspace administrator.</p>
          </div>
          <div class="footer">
            <p>This email was sent by Project Accel. If you didn't expect this invitation, you can safely ignore this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
      You're Invited to Join ${workspace.name}
      
      Hello,
      
      You've been invited to join the ${workspace.name} workspace on Project Accel as a ${role.name}.
      
      Click this link to accept your invitation: ${inviteUrl}
      
      This invitation will expire on ${invite.expiresAt.toLocaleDateString()}.
      
      If you have any questions, please contact your workspace administrator.
    `;

    // Send email
    await transporter.sendMail({
      from: `"${config.FROM_NAME}" <${config.FROM_EMAIL}>`,
      to: invite.email,
      subject: `Invitation to join ${workspace.name} workspace`,
      text: textContent,
      html: htmlContent,
    });
  }
}

export default InviteService;
