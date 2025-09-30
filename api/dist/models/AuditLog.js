"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const auditLogSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    workspaceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Workspace',
        index: true,
    },
    action: {
        type: String,
        required: true,
        enum: [
            'create',
            'update',
            'delete',
            'login',
            'logout',
            'invite',
            'accept_invite',
        ],
        index: true,
    },
    resource: {
        type: String,
        required: true,
        enum: ['user', 'workspace', 'role', 'invite', 'auth'],
        index: true,
    },
    resourceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    details: {
        type: mongoose_1.Schema.Types.Mixed,
        default: {},
    },
    ipAddress: {
        type: String,
    },
    userAgent: {
        type: String,
    },
}, {
    timestamps: true,
    collection: 'audit_logs',
});
auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ workspaceId: 1, createdAt: -1 });
auditLogSchema.index({ resource: 1, resourceId: 1 });
auditLogSchema.statics.logAction = async function (userId, action, resource, resourceId, options = {}) {
    try {
        const log = new this({
            userId,
            action,
            resource,
            resourceId,
            ...options,
        });
        await log.save();
        return log;
    }
    catch (error) {
        console.error('Failed to create audit log:', error);
        return null;
    }
};
auditLogSchema.methods.format = function () {
    return {
        id: this._id,
        action: this.action,
        resource: this.resource,
        resourceId: this.resourceId,
        details: this.details,
        timestamp: this.createdAt,
        user: this.userId,
        workspace: this.workspaceId,
    };
};
const AuditLog = mongoose_1.default.model('AuditLog', auditLogSchema);
exports.default = AuditLog;
//# sourceMappingURL=AuditLog.js.map