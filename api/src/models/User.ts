import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser, IUserWorkspace } from '@/types';
import { config } from '@/config/env';

/**
 * User Workspace schema for tracking user's workspace memberships
 */
const userWorkspaceSchema = new Schema<IUserWorkspace>({
  workspaceId: {
    type: Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true
  },
  roleId: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  invitedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['active', 'invited', 'suspended'],
    default: 'active'
  }
}, { _id: false });

/**
 * User schema for authentication and user management
 */
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // Don't include password in query results by default
  },
  designation: {
    type: String,
    trim: true,
    maxlength: 100
  },
  yearsOfExperience: {
    type: String,
    enum: ['0-1', '1-3', '3-5', '5-10', '10+']
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
    index: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  lastLogin: {
    type: Date
  },
  refreshTokens: [{
    type: String,
    select: false // Don't include refresh tokens in query results
  }],
  profilePicture: {
    type: String
  },
  workspaces: [userWorkspaceSchema],
  isSuperAdmin: {
    type: Boolean,
    default: false,
    index: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  collection: 'users'
});

// Indexes for efficient querying
userSchema.index({ email: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ 'workspaces.workspaceId': 1 });
userSchema.index({ isSuperAdmin: 1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Hash password with configurable rounds
    const salt = await bcrypt.genSalt(config.BCRYPT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Instance method to add workspace membership
userSchema.methods.addWorkspace = function(workspaceId: mongoose.Types.ObjectId, roleId: mongoose.Types.ObjectId, invitedBy?: mongoose.Types.ObjectId) {
  // Check if user is already in this workspace
  const existingWorkspace = this.workspaces.find((ws: IUserWorkspace) => 
    ws.workspaceId.toString() === workspaceId.toString()
  );

  if (existingWorkspace) {
    throw new Error('User is already a member of this workspace');
  }

  this.workspaces.push({
    workspaceId,
    roleId,
    joinedAt: new Date(),
    invitedBy,
    status: 'active'
  });

  return this.save();
};

// Instance method to remove workspace membership
userSchema.methods.removeWorkspace = function(workspaceId: mongoose.Types.ObjectId) {
  this.workspaces = this.workspaces.filter((ws: IUserWorkspace) => 
    ws.workspaceId.toString() !== workspaceId.toString()
  );
  return this.save();
};

// Instance method to update workspace role
userSchema.methods.updateWorkspaceRole = function(workspaceId: mongoose.Types.ObjectId, newRoleId: mongoose.Types.ObjectId) {
  const workspace = this.workspaces.find((ws: IUserWorkspace) => 
    ws.workspaceId.toString() === workspaceId.toString()
  );

  if (!workspace) {
    throw new Error('User is not a member of this workspace');
  }

  workspace.roleId = newRoleId;
  return this.save();
};

// Instance method to get workspace membership
userSchema.methods.getWorkspace = function(workspaceId: mongoose.Types.ObjectId): IUserWorkspace | undefined {
  return this.workspaces.find((ws: IUserWorkspace) => 
    ws.workspaceId.toString() === workspaceId.toString()
  );
};

// Instance method to check if user is in workspace
userSchema.methods.isInWorkspace = function(workspaceId: mongoose.Types.ObjectId): boolean {
  return this.workspaces.some((ws: IUserWorkspace) => 
    ws.workspaceId.toString() === workspaceId.toString() && ws.status === 'active'
  );
};

// Instance method to add refresh token
userSchema.methods.addRefreshToken = async function(token: string) {
  this.refreshTokens.push(token);
  // Keep only last 5 refresh tokens
  if (this.refreshTokens.length > 5) {
    this.refreshTokens = this.refreshTokens.slice(-5);
  }
  return this.save();
};

// Instance method to remove refresh token
userSchema.methods.removeRefreshToken = async function(token: string) {
  this.refreshTokens = this.refreshTokens.filter(t => t !== token);
  return this.save();
};

// Instance method to clear all refresh tokens (logout from all devices)
userSchema.methods.clearRefreshTokens = async function() {
  this.refreshTokens = [];
  return this.save();
};

// Instance method to update last login
userSchema.methods.updateLastLogin = async function() {
  this.lastLogin = new Date();
  return this.save();
};

// Static method to find user by email
userSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email: email.toLowerCase(), isActive: true });
};

// Static method to find user with password (for authentication)
userSchema.statics.findByEmailWithPassword = function(email: string) {
  return this.findOne({ email: email.toLowerCase(), isActive: true }).select('+password +refreshTokens');
};

// Instance method to get public profile (without sensitive data)
userSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    designation: this.designation,
    yearsOfExperience: this.yearsOfExperience,
    profilePicture: this.profilePicture,
    isEmailVerified: this.isEmailVerified,
    lastLogin: this.lastLogin,
    createdAt: this.createdAt,
    workspaces: this.workspaces
  };
};

// Instance method to get workspace-specific profile
userSchema.methods.getWorkspaceProfile = function(workspaceId: mongoose.Types.ObjectId) {
  const workspace = this.getWorkspace(workspaceId);
  return {
    ...this.getPublicProfile(),
    workspaceRole: workspace?.roleId,
    workspaceStatus: workspace?.status,
    joinedAt: workspace?.joinedAt
  };
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
