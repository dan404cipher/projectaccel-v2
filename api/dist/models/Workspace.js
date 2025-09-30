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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const Counter_1 = __importDefault(require("./Counter"));
const workspaceMemberSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    roleId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    },
    joinedAt: {
        type: Date,
        default: Date.now,
    },
    invitedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['active', 'invited', 'suspended'],
        default: 'active',
    },
}, { _id: false });
const workspaceSettingsSchema = new mongoose_1.Schema({
    allowPublicInvites: {
        type: Boolean,
        default: false,
    },
    requireAdminApproval: {
        type: Boolean,
        default: true,
    },
    defaultRole: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Role',
    },
    timezone: {
        type: String,
        default: 'UTC',
    },
    language: {
        type: String,
        default: 'en',
    },
    empIdPrefix: {
        type: String,
        default: null,
        match: /^[A-Z]{2}$/,
    },
    empIdCounter: {
        type: Number,
        default: 1000,
        min: 1000,
    },
}, { _id: false });
const workspaceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    workspaceId: {
        type: String,
        unique: true,
        required: false,
        match: /^WS\d{4}$/,
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    ownerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true,
    },
    subscriptionPlan: {
        type: String,
        enum: ['free', 'pro', 'enterprise'],
        default: 'free',
        index: true,
    },
    settings: {
        type: workspaceSettingsSchema,
        default: () => ({}),
    },
    members: [workspaceMemberSchema],
}, {
    timestamps: true,
    collection: 'workspaces',
});
workspaceSchema.index({ ownerId: 1 });
workspaceSchema.index({ 'members.userId': 1 });
workspaceSchema.index({ isActive: 1, subscriptionPlan: 1 });
workspaceSchema.pre('save', async function (next) {
    if (this.isNew && !this.workspaceId) {
        try {
            this.workspaceId = await Counter_1.default.generateWorkspaceId();
        }
        catch (error) {
            return next(error);
        }
    }
    if (!this.settings.empIdPrefix) {
        const prefix = this.name
            .replace(/[^a-zA-Z]/g, '')
            .substring(0, 2)
            .toUpperCase();
        if (prefix.length === 2) {
            this.settings.empIdPrefix = prefix;
        }
        else {
            this.settings.empIdPrefix = 'WS';
        }
    }
    next();
});
workspaceSchema.statics.findByWorkspaceId = function (workspaceId) {
    return this.findOne({ workspaceId, isActive: true });
};
workspaceSchema.methods.addMember = function (userId, roleId, invitedBy) {
    const existingMember = this.members.find((member) => member.userId.toString() === userId.toString());
    if (existingMember) {
        throw new Error('User is already a member of this workspace');
    }
    this.members.push({
        userId,
        roleId,
        joinedAt: new Date(),
        invitedBy,
        status: 'active',
    });
    return this.save();
};
workspaceSchema.methods.removeMember = function (userId) {
    this.members = this.members.filter((member) => member.userId.toString() !== userId.toString());
    return this.save();
};
workspaceSchema.methods.updateMemberRole = function (userId, newRoleId) {
    const member = this.members.find((member) => member.userId.toString() === userId.toString());
    if (!member) {
        throw new Error('User is not a member of this workspace');
    }
    member.roleId = newRoleId;
    return this.save();
};
workspaceSchema.methods.getMember = function (userId) {
    return this.members.find((member) => member.userId.toString() === userId.toString());
};
workspaceSchema.methods.isMember = function (userId) {
    return this.members.some((member) => member.userId.toString() === userId.toString() &&
        member.status === 'active');
};
workspaceSchema.methods.isOwner = function (userId) {
    return this.ownerId.toString() === userId.toString();
};
workspaceSchema.methods.transferOwnership = function (newOwnerId) {
    if (!this.isMember(newOwnerId)) {
        throw new Error('New owner must be a member of the workspace');
    }
    this.ownerId = newOwnerId;
    return this.save();
};
workspaceSchema.methods.getActiveMembersCount = function () {
    return this.members.filter((member) => member.status === 'active').length;
};
workspaceSchema.methods.getMembersByStatus = function (status) {
    return this.members.filter((member) => member.status === status);
};
const Workspace = mongoose_1.default.model('Workspace', workspaceSchema);
exports.default = Workspace;
//# sourceMappingURL=Workspace.js.map