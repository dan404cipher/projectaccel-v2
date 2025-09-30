import mongoose, { Schema } from 'mongoose';
import { IInvite } from '@/types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Invite schema for workspace invitations
 */
const inviteSchema = new Schema<IInvite>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
      required: true,
      index: true,
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    invitedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'expired', 'revoked'],
      default: 'pending',
      index: true,
    },
    acceptedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: 'invites',
  }
);

// Compound indexes for efficient querying
inviteSchema.index({ email: 1, workspaceId: 1 });
inviteSchema.index({ token: 1, status: 1 });
inviteSchema.index({ workspaceId: 1, status: 1 });
inviteSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

// Pre-save middleware to generate token and expiry
inviteSchema.pre('save', function (next) {
  if (this.isNew) {
    this.token = uuidv4();
    // Set expiry to 7 days from now
    this.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  }
  next();
});

// Static method to find valid invite by token
inviteSchema.statics.findByToken = function (token: string) {
  return this.findOne({
    token,
    status: 'pending',
    expiresAt: { $gt: new Date() },
  });
};

// Static method to find pending invites for an email
inviteSchema.statics.findPendingInvites = function (email: string) {
  return this.find({
    email: email.toLowerCase(),
    status: 'pending',
    expiresAt: { $gt: new Date() },
  }).populate('workspaceId roleId invitedBy');
};

// Static method to revoke all pending invites for a workspace and email
inviteSchema.statics.revokePendingInvites = async function (
  email: string,
  workspaceId: mongoose.Types.ObjectId
) {
  return this.updateMany(
    {
      email: email.toLowerCase(),
      workspaceId,
      status: 'pending',
    },
    {
      status: 'revoked',
    }
  );
};

// Instance method to accept invite
inviteSchema.methods.accept = async function () {
  if (this.status !== 'pending') {
    throw new Error('Invite is not pending');
  }

  if (this.expiresAt < new Date()) {
    this.status = 'expired';
    await this.save();
    throw new Error('Invite has expired');
  }

  this.status = 'accepted';
  this.acceptedAt = new Date();
  return this.save();
};

// Instance method to revoke invite
inviteSchema.methods.revoke = async function () {
  if (this.status !== 'pending') {
    throw new Error('Only pending invites can be revoked');
  }

  this.status = 'revoked';
  return this.save();
};

// Instance method to check if invite is valid
inviteSchema.methods.isValid = function (): boolean {
  return this.status === 'pending' && this.expiresAt > new Date();
};

// Instance method to get invite URL
inviteSchema.methods.getInviteUrl = function (frontendUrl: string): string {
  return `${frontendUrl}/invite/${this.token}`;
};

// Static method to cleanup expired invites
inviteSchema.statics.cleanupExpired = async function () {
  const result = await this.updateMany(
    {
      status: 'pending',
      expiresAt: { $lt: new Date() },
    },
    {
      status: 'expired',
    }
  );

  console.log(`Marked ${result.modifiedCount} invites as expired`);
  return result;
};

// Static method to get invite statistics for workspace
inviteSchema.statics.getWorkspaceStats = async function (
  workspaceId: mongoose.Types.ObjectId
) {
  const stats = await this.aggregate([
    { $match: { workspaceId } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  return stats.reduce(
    (acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    },
    {
      pending: 0,
      accepted: 0,
      expired: 0,
      revoked: 0,
    }
  );
};

const Invite = mongoose.model<IInvite>('Invite', inviteSchema);

export default Invite;
