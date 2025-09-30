import { Types } from 'mongoose';
import { User, Workspace, Role, AuditLog } from '@/models';
import { IUserDocument } from '@/types/models';
import { JWTUtil } from '@/utils/jwt';
import { ApiError } from '@/utils/apiError';
import { config } from '@/config/env';
import { WorkspaceService } from './workspaceService';
import { UserService } from './userService';

export interface SignupData {
  name: string;
  email: string;
  password: string;
  workspaceName: string;
  designation?: string;
  yearsOfExperience?: string;
}

export interface LoginData {
  email: string;
  password: string;
  workspaceId?: string; // Optional: specific workspace to login to
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResult {
  user: IUserDocument;
  workspace?: any;
  tokens: TokenPair;
}

/**
 * Authentication service for user signup, login, and token management
 */
export class AuthService {
  /**
   * User signup with automatic workspace creation
   */
  static async signup(signupData: SignupData): Promise<AuthResult> {
    const {
      name,
      email,
      password,
      workspaceName,
      designation,
      yearsOfExperience,
    } = signupData;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw ApiError.conflict('User with this email already exists');
    }

    // Create user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      designation: designation?.trim(),
      yearsOfExperience,
      isEmailVerified: config.isDevelopment(), // Auto-verify in development
      isActive: true,
    });

    await user.save();

    try {
      // Create workspace with the user as owner
      const workspace = await WorkspaceService.create({
        name: workspaceName.trim(),
        ownerId: user._id as Types.ObjectId,
        description: `${workspaceName} workspace`,
      });

      // Create default roles for the workspace
      const defaultRoles = await (Role as any).createDefaultRoles(
        workspace._id,
        user._id as Types.ObjectId
      );
      const adminRole = defaultRoles.find((role: any) => role.name === 'Admin');

      if (!adminRole) {
        throw new Error('Failed to create admin role');
      }

      // Add user to workspace with admin role
      await (user as any).addWorkspace(workspace._id, adminRole._id, user._id as Types.ObjectId);
      await (workspace as any).addMember(
        user._id as Types.ObjectId,
        adminRole._id,
        user._id as Types.ObjectId
      );

      // Set default role in workspace settings
      workspace.settings.defaultRole = defaultRoles.find(
        (role: any) => role.name === 'Member'
      )?._id;
      await workspace.save();

      // Assign Employee ID to the user
      try {
        await UserService.assignEmployeeId(user._id as Types.ObjectId, workspace._id);
      } catch (error) {
        console.warn('Failed to assign Employee ID:', error);
        // Don't fail signup if empId assignment fails
      }

      // Generate tokens
      const tokens = JWTUtil.generateWorkspaceToken(
        user._id as Types.ObjectId,
        user.email,
        workspace._id,
        adminRole._id,
        user.isSuperAdmin
      );

      // Store refresh token
      await (user as any).addRefreshToken(tokens.refreshToken);

      return {
        user: (user as any).getPublicProfile(),
        workspace: {
          id: workspace._id,
          workspaceId: workspace.workspaceId,
          name: workspace.name,
          role: adminRole.name,
        },
        tokens,
      };
    } catch (error) {
      // Cleanup user if workspace creation fails
      await User.findByIdAndDelete(user._id as Types.ObjectId);
      throw error;
    }
  }

  /**
   * User login with workspace selection
   */
  static async login(
    loginData: LoginData,
    ipAddress?: string,
    userAgent?: string
  ): Promise<AuthResult> {
    const { email, password, workspaceId } = loginData;

    // Find user with password
    const user = await User.findByEmailWithPassword(email);
    if (!user) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await (user as any).comparePassword(password);
    if (!isPasswordValid) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      throw ApiError.unauthorized('Account is deactivated');
    }

    // If super admin but has workspaces, use workspace context
    if (user.isSuperAdmin && user.workspaces.length > 0) {
      // Use the first active workspace for super admin
      const activeWorkspace = user.workspaces.find(
        ws => ws.status === 'active'
      );
      
      if (activeWorkspace) {
        const targetWorkspace = await Workspace.findById(activeWorkspace.workspaceId);
        const userRole = await Role.findById(activeWorkspace.roleId);
        
        if (targetWorkspace && userRole) {
          // Generate workspace-specific tokens for super admin
          const tokens = JWTUtil.generateWorkspaceToken(
            user._id as Types.ObjectId,
            user.email,
            targetWorkspace._id,
            userRole._id,
            user.isSuperAdmin
          );
          
          await (user as any).addRefreshToken(tokens.refreshToken);
          await (user as any).updateLastLogin();

          await AuditLog.logAction(
            user._id as Types.ObjectId,
            'login',
            'auth',
            user._id as Types.ObjectId,
            {
              workspaceId: targetWorkspace._id,
              details: { type: 'super_admin_with_workspace', workspaceId: targetWorkspace.workspaceId },
              ipAddress,
              userAgent,
            }
          );

          return {
            user: (user as any).getWorkspaceProfile(targetWorkspace._id),
            workspace: {
              id: targetWorkspace._id,
              workspaceId: targetWorkspace.workspaceId,
              name: targetWorkspace.name,
              role: userRole.name,
            },
            tokens,
          };
        }
      }
    }
    
    // If super admin without workspaces, allow login without workspace
    if (user.isSuperAdmin) {
      const tokens = JWTUtil.generateSuperAdminToken(
        user._id as Types.ObjectId,
        user.email
      );
      await (user as any).addRefreshToken(tokens.refreshToken);
      await (user as any).updateLastLogin();

      await AuditLog.logAction(
        user._id as Types.ObjectId,
        'login',
        'auth',
        user._id as Types.ObjectId,
        { details: { type: 'super_admin' }, ipAddress, userAgent }
      );

      return {
        user: (user as any).getPublicProfile(),
        tokens,
      };
    }

    // For regular users, workspace is required
    if (!workspaceId && user.workspaces.length === 0) {
      throw ApiError.forbidden('No workspace access found');
    }

    // If specific workspace requested, verify access
    let targetWorkspace;
    let userRole;

    if (workspaceId) {
      // Find workspace by ID or workspaceId
      const workspace = await Workspace.findOne({
        $or: [
          { _id: Types.ObjectId.isValid(workspaceId) ? workspaceId : null },
          { workspaceId: workspaceId },
        ],
        isActive: true,
      });

      if (!workspace) {
        throw ApiError.notFound('Workspace not found');
      }

      // Check if user has access to this workspace
      const workspaceMembership = user.workspaces.find(
        ws =>
          ws.workspaceId.toString() === workspace._id.toString() &&
          ws.status === 'active'
      );

      if (!workspaceMembership) {
        throw ApiError.forbidden('Access denied to this workspace');
      }

      targetWorkspace = workspace;
      userRole = await Role.findById(workspaceMembership.roleId);
    } else {
      // Use the first active workspace
      const activeWorkspace = user.workspaces.find(
        ws => ws.status === 'active'
      );
      if (!activeWorkspace) {
        throw ApiError.forbidden('No active workspace found');
      }

      targetWorkspace = await Workspace.findById(activeWorkspace.workspaceId);
      userRole = await Role.findById(activeWorkspace.roleId);
    }

    if (!targetWorkspace || !userRole) {
      throw ApiError.forbidden('Invalid workspace or role');
    }

    // Generate workspace-specific tokens
    const tokens = JWTUtil.generateWorkspaceToken(
      user._id as Types.ObjectId,
      user.email,
      targetWorkspace._id,
      userRole._id,
      user.isSuperAdmin
    );

    // Store refresh token and update last login
    await (user as any).addRefreshToken(tokens.refreshToken);
    await (user as any).updateLastLogin();

    // Log the login action
    await AuditLog.logAction(
      user._id as Types.ObjectId,
      'login',
      'auth',
      user._id as Types.ObjectId,
      {
        workspaceId: targetWorkspace._id,
        details: { workspaceId: targetWorkspace.workspaceId },
        ipAddress,
        userAgent,
      }
    );

    return {
      user: (user as any).getWorkspaceProfile(targetWorkspace._id),
      workspace: {
        id: targetWorkspace._id,
        workspaceId: targetWorkspace.workspaceId,
        name: targetWorkspace.name,
        role: userRole.name,
      },
      tokens,
    };
  }

  /**
   * Refresh access token
   */
  static async refreshToken(refreshToken: string): Promise<TokenPair> {
    // Verify refresh token
    const decoded = JWTUtil.verifyRefreshToken(refreshToken);

    // Find user and verify refresh token exists
    const user: IUserDocument = await User.findById(decoded.userId).select(
      '+refreshTokens'
    );
    if (!user || !user.isActive) {
      throw ApiError.unauthorized('User not found or inactive');
    }

    if (!user.refreshTokens.includes(refreshToken)) {
      throw ApiError.unauthorized('Invalid refresh token');
    }

    // Generate new token pair
    const tokens =
      decoded.workspaceId && decoded.roleId
        ? JWTUtil.generateWorkspaceToken(
            user._id as Types.ObjectId,
            user.email,
            decoded.workspaceId,
            decoded.roleId,
            decoded.isSuperAdmin
          )
        : JWTUtil.generateSuperAdminToken(
            user._id as Types.ObjectId,
            user.email
          );

    // Replace old refresh token with new one
    await (user as any).removeRefreshToken(refreshToken);
    await (user as any).addRefreshToken(tokens.refreshToken);

    return tokens;
  }

  /**
   * Logout from specific device (remove refresh token)
   */
  static async logout(
    userId: Types.ObjectId,
    refreshToken: string
  ): Promise<void> {
    const user: IUserDocument =
      await User.findById(userId).select('+refreshTokens');
    if (!user) {
      throw ApiError.notFound('User not found');
    }

    await (user as any).removeRefreshToken(refreshToken);

    // Log logout action
    await AuditLog.logAction(
      user._id as Types.ObjectId,
      'logout',
      'auth',
      user._id as Types.ObjectId,
      { details: { type: 'single_device' } }
    );
  }

  /**
   * Logout from all devices (clear all refresh tokens)
   */
  static async logoutAll(userId: Types.ObjectId): Promise<void> {
    const user: IUserDocument =
      await User.findById(userId).select('+refreshTokens');
    if (!user) {
      throw ApiError.notFound('User not found');
    }

    await (user as any).clearRefreshTokens();

    // Log logout action
    await AuditLog.logAction(
      user._id as Types.ObjectId,
      'logout',
      'auth',
      user._id as Types.ObjectId,
      { details: { type: 'all_devices' } }
    );
  }

  /**
   * Switch workspace (generate new tokens for different workspace)
   */
  static async switchWorkspace(
    userId: Types.ObjectId,
    workspaceId: string
  ): Promise<AuthResult> {
    const user = await User.findById(userId);
    if (!user || !user.isActive) {
      throw ApiError.notFound('User not found or inactive');
    }

    // Find workspace
    const workspace = await Workspace.findOne({
      $or: [
        { _id: Types.ObjectId.isValid(workspaceId) ? workspaceId : null },
        { workspaceId: workspaceId },
      ],
      isActive: true,
    });

    if (!workspace) {
      throw ApiError.notFound('Workspace not found');
    }

    // Check if user has access to this workspace
    const workspaceMembership = user.workspaces.find(
      ws =>
        ws.workspaceId.toString() === workspace._id.toString() &&
        ws.status === 'active'
    );

    if (!workspaceMembership) {
      throw ApiError.forbidden('Access denied to this workspace');
    }

    const userRole = await Role.findById(workspaceMembership.roleId);
    if (!userRole) {
      throw ApiError.forbidden('Invalid role in workspace');
    }

    // Generate new workspace-specific tokens
    const tokens = JWTUtil.generateWorkspaceToken(
      user._id as Types.ObjectId,
      user.email,
      workspace._id,
      userRole._id,
      user.isSuperAdmin
    );

    // Store new refresh token
    await (user as any).addRefreshToken(tokens.refreshToken);

    return {
      user: (user as any).getWorkspaceProfile(workspace._id),
      workspace: {
        id: workspace._id,
        workspaceId: workspace.workspaceId,
        name: workspace.name,
        role: userRole.name,
      },
      tokens,
    };
  }

  /**
   * Get user's accessible workspaces
   */
  static async getUserWorkspaces(userId: Types.ObjectId): Promise<any[]> {
    const user = await User.findById(userId).populate([
      {
        path: 'workspaces.workspaceId',
        select: 'name workspaceId description isActive',
      },
      {
        path: 'workspaces.roleId',
        select: 'name description',
      },
    ]);

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    return user.workspaces
      .filter(ws => ws.status === 'active')
      .map(ws => ({
        id: (ws.workspaceId as any)._id,
        workspaceId: (ws.workspaceId as any).workspaceId,
        name: (ws.workspaceId as any).name,
        description: (ws.workspaceId as any).description,
        role: {
          id: (ws.roleId as any)._id,
          name: (ws.roleId as any).name,
          description: (ws.roleId as any).description,
        },
        joinedAt: ws.joinedAt,
        status: ws.status,
      }));
  }

  /**
   * Verify email (for future email verification feature)
   */
  static async verifyEmail(userId: Types.ObjectId): Promise<void> {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.notFound('User not found');
    }

    user.isEmailVerified = true;
    await user.save();

    await AuditLog.logAction(
      user._id as Types.ObjectId,
      'update',
      'user',
      user._id as Types.ObjectId,
      { details: { action: 'email_verified' } }
    );
  }
}

export default AuthService;
