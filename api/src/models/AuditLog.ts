import mongoose, { Schema } from 'mongoose';
import { IAuditLog } from '@/types';

/**
 * Audit Log schema for tracking all system changes
 */
const auditLogSchema = new Schema<IAuditLog>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  workspaceId: {
    type: Schema.Types.ObjectId,
    ref: 'Workspace',
    index: true
  },
  action: {
    type: String,
    required: true,
    enum: ['create', 'update', 'delete', 'login', 'logout', 'invite', 'accept_invite'],
    index: true
  },
  resource: {
    type: String,
    required: true,
    enum: ['user', 'workspace', 'role', 'invite', 'auth'],
    index: true
  },
  resourceId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true
  },
  details: {
    type: Schema.Types.Mixed,
    default: {}
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  }
}, {
  timestamps: true,
  collection: 'audit_logs'
});

// Indexes for efficient querying
auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ workspaceId: 1, createdAt: -1 });
auditLogSchema.index({ resource: 1, resourceId: 1 });

// Static method to log an action
auditLogSchema.statics.logAction = async function(
  userId: mongoose.Types.ObjectId,
  action: string,
  resource: string,
  resourceId: mongoose.Types.ObjectId,
  options: {
    workspaceId?: mongoose.Types.ObjectId;
    details?: Record<string, any>;
    ipAddress?: string;
    userAgent?: string;
  } = {}
) {
  try {
    const log = new this({
      userId,
      action,
      resource,
      resourceId,
      ...options
    });
    await log.save();
    return log;
  } catch (error) {
    console.error('Failed to create audit log:', error);
    // Don't throw error to avoid breaking the main operation
  }
};

// Instance method to format log for display
auditLogSchema.methods.format = function() {
  return {
    id: this._id,
    action: this.action,
    resource: this.resource,
    resourceId: this.resourceId,
    details: this.details,
    timestamp: this.createdAt,
    user: this.userId,
    workspace: this.workspaceId
  };
};

const AuditLog = mongoose.model<IAuditLog>('AuditLog', auditLogSchema);

export default AuditLog;
