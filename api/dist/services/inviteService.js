"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteService = void 0;
const models_1 = require("@/models");
const apiError_1 = require("@/utils/apiError");
const env_1 = require("@/config/env");
const nodemailer_1 = __importDefault(require("nodemailer"));
class InviteService {
    static async create(inviteData) {
        const { email, workspaceId, roleId, invitedBy } = inviteData;
        const workspace = await models_1.Workspace.findById(workspaceId);
        if (!workspace || !workspace.isActive) {
            throw apiError_1.ApiError.notFound('Workspace not found or inactive');
        }
        const role = await models_1.Role.findById(roleId);
        if (!role || role.workspaceId.toString() !== workspaceId.toString()) {
            throw apiError_1.ApiError.badRequest('Invalid role for this workspace');
        }
        const existingUser = await models_1.User.findByEmail(email);
        if (existingUser) {
            const isInWorkspace = existingUser.workspaces.some(ws => ws.workspaceId.toString() === workspaceId.toString());
            if (isInWorkspace) {
                throw apiError_1.ApiError.conflict('User is already a member of this workspace');
            }
        }
        const existingInvite = await models_1.Invite.findOne({
            email: email.toLowerCase(),
            workspaceId,
            status: 'pending',
            expiresAt: { $gt: new Date() },
        });
        if (existingInvite) {
            throw apiError_1.ApiError.conflict('A pending invite already exists for this email');
        }
        const invite = new models_1.Invite({
            email: email.toLowerCase().trim(),
            workspaceId,
            roleId,
            invitedBy,
        });
        await invite.save();
        if (env_1.config.SMTP_HOST && env_1.config.SMTP_USER) {
            try {
                await InviteService.sendInviteEmail(invite, workspace, role);
            }
            catch (error) {
                console.error('Failed to send invite email:', error);
            }
        }
        await models_1.AuditLog.logAction(invitedBy, 'invite', 'user', invite._id, {
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
            inviteUrl: invite.getInviteUrl(env_1.config.FRONTEND_URL),
            status: invite.status,
            createdAt: invite.createdAt,
        };
    }
    static async accept(acceptData) {
        const { token, password, name } = acceptData;
        const invite = await models_1.Invite
            .findByToken(token)
            .populate('workspaceId', 'name workspaceId isActive')
            .populate('roleId', 'name description')
            .populate('invitedBy', 'name email');
        if (!invite) {
            throw apiError_1.ApiError.badRequest('Invalid or expired invite token');
        }
        if (!invite.isValid()) {
            throw apiError_1.ApiError.badRequest('Invite has expired');
        }
        const workspace = invite.workspaceId;
        const role = invite.roleId;
        if (!workspace.isActive) {
            throw apiError_1.ApiError.badRequest('Workspace is no longer active');
        }
        let user = await models_1.User.findByEmail(invite.email);
        if (!user) {
            if (!password || !name) {
                throw apiError_1.ApiError.badRequest('Name and password are required for new users');
            }
            user = new models_1.User({
                name: name.trim(),
                email: invite.email,
                password,
                isEmailVerified: true,
                isActive: true,
            });
            await user.save();
        }
        else {
            const isInWorkspace = user.workspaces.some(ws => ws.workspaceId.toString() === workspace._id.toString());
            if (isInWorkspace) {
                throw apiError_1.ApiError.conflict('User is already a member of this workspace');
            }
        }
        await user.addWorkspace(workspace._id, role._id, invite.invitedBy);
        await workspace.addMember(user._id, role._id, invite.invitedBy);
        await invite.accept();
        await models_1.AuditLog.logAction(user._id, 'accept_invite', 'user', user._id, {
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
    static async revoke(inviteId, revokedBy) {
        const invite = await models_1.Invite.findById(inviteId);
        if (!invite) {
            throw apiError_1.ApiError.notFound('Invite not found');
        }
        await invite.revoke();
        await models_1.AuditLog.logAction(revokedBy, 'update', 'invite', invite._id, {
            workspaceId: invite.workspaceId,
            details: {
                action: 'revoke',
                email: invite.email,
            },
        });
    }
    static async resend(inviteId, resentBy) {
        const invite = await models_1.Invite.findById(inviteId)
            .populate('workspaceId', 'name workspaceId')
            .populate('roleId', 'name description');
        if (!invite) {
            throw apiError_1.ApiError.notFound('Invite not found');
        }
        if (invite.status !== 'pending') {
            throw apiError_1.ApiError.badRequest('Can only resend pending invites');
        }
        if (!invite.isValid()) {
            throw apiError_1.ApiError.badRequest('Invite has expired');
        }
        if (env_1.config.SMTP_HOST && env_1.config.SMTP_USER) {
            try {
                await InviteService.sendInviteEmail(invite, invite.workspaceId, invite.roleId);
            }
            catch (error) {
                console.error('Failed to resend invite email:', error);
                throw apiError_1.ApiError.internal('Failed to send invitation email');
            }
        }
        await models_1.AuditLog.logAction(resentBy, 'update', 'invite', invite._id, {
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
    static async getByToken(token) {
        const invite = await models_1.Invite
            .findByToken(token)
            .populate('workspaceId', 'name workspaceId description')
            .populate('roleId', 'name description')
            .populate('invitedBy', 'name email');
        if (!invite) {
            throw apiError_1.ApiError.notFound('Invite not found or expired');
        }
        return {
            id: invite._id,
            email: invite.email,
            workspace: {
                id: invite.workspaceId._id,
                workspaceId: invite.workspaceId.workspaceId,
                name: invite.workspaceId.name,
                description: invite.workspaceId.description,
            },
            role: {
                id: invite.roleId._id,
                name: invite.roleId.name,
                description: invite.roleId.description,
            },
            invitedBy: {
                name: invite.invitedBy.name,
                email: invite.invitedBy.email,
            },
            expiresAt: invite.expiresAt,
            createdAt: invite.createdAt,
            isValid: invite.isValid(),
        };
    }
    static async getWorkspaceInvites(workspaceId, queryParams = {}) {
        const { page = 1, limit = 20, search = '', sortBy = 'createdAt', sortOrder = 'desc', status, } = queryParams;
        const searchQuery = { workspaceId };
        if (search) {
            searchQuery.email = { $regex: search, $options: 'i' };
        }
        if (status) {
            searchQuery.status = status;
        }
        const skip = (page - 1) * limit;
        const sortDirection = sortOrder === 'desc' ? -1 : 1;
        const total = await models_1.Invite.countDocuments(searchQuery);
        const invites = await models_1.Invite.find(searchQuery)
            .populate('roleId', 'name description')
            .populate('invitedBy', 'name email')
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(limit);
        const enrichedInvites = invites.map(invite => ({
            id: invite._id,
            email: invite.email,
            role: {
                id: invite.roleId._id,
                name: invite.roleId.name,
                description: invite.roleId.description,
            },
            invitedBy: {
                id: invite.invitedBy._id,
                name: invite.invitedBy.name,
                email: invite.invitedBy.email,
            },
            status: invite.status,
            expiresAt: invite.expiresAt,
            acceptedAt: invite.acceptedAt,
            createdAt: invite.createdAt,
            isValid: invite.isValid(),
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
    static async getUserInvites(email) {
        const invites = await models_1.Invite.findPendingInvites(email);
        return invites.map((invite) => ({
            id: invite._id,
            workspace: {
                id: invite.workspaceId._id,
                workspaceId: invite.workspaceId.workspaceId,
                name: invite.workspaceId.name,
                description: invite.workspaceId.description,
            },
            role: {
                id: invite.roleId._id,
                name: invite.roleId.name,
                description: invite.roleId.description,
            },
            invitedBy: {
                name: invite.invitedBy.name,
                email: invite.invitedBy.email,
            },
            token: invite.token,
            expiresAt: invite.expiresAt,
            createdAt: invite.createdAt,
            inviteUrl: invite.getInviteUrl(env_1.config.FRONTEND_URL),
        }));
    }
    static async getWorkspaceStats(workspaceId) {
        const stats = await models_1.Invite.getWorkspaceStats(workspaceId);
        return {
            total: Object.values(stats).reduce((sum, count) => sum + count, 0),
            byStatus: stats,
            pending: stats.pending || 0,
            accepted: stats.accepted || 0,
            expired: stats.expired || 0,
            revoked: stats.revoked || 0,
        };
    }
    static async cleanupExpired() {
        await models_1.Invite.cleanupExpired();
    }
    static async sendInviteEmail(invite, workspace, role) {
        if (!env_1.config.SMTP_HOST || !env_1.config.SMTP_USER) {
            throw new Error('Email configuration not found');
        }
        const transporter = nodemailer_1.default.createTransport({
            host: env_1.config.SMTP_HOST,
            port: env_1.config.SMTP_PORT,
            secure: env_1.config.SMTP_PORT === 465,
            auth: {
                user: env_1.config.SMTP_USER,
                pass: env_1.config.SMTP_PASS,
            },
        });
        const inviteUrl = invite.getInviteUrl(env_1.config.FRONTEND_URL);
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
        await transporter.sendMail({
            from: `"${env_1.config.FROM_NAME}" <${env_1.config.FROM_EMAIL}>`,
            to: invite.email,
            subject: `Invitation to join ${workspace.name} workspace`,
            text: textContent,
            html: htmlContent,
        });
    }
}
exports.InviteService = InviteService;
exports.default = InviteService;
//# sourceMappingURL=inviteService.js.map