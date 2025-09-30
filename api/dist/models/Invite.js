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
const uuid_1 = require("uuid");
const inviteSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true,
        index: true,
    },
    roleId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    },
    invitedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
    collection: 'invites',
});
inviteSchema.index({ email: 1, workspaceId: 1 });
inviteSchema.index({ token: 1, status: 1 });
inviteSchema.index({ workspaceId: 1, status: 1 });
inviteSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
inviteSchema.pre('save', function (next) {
    if (this.isNew) {
        this.token = (0, uuid_1.v4)();
        this.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    }
    next();
});
inviteSchema.statics.findByToken = function (token) {
    return this.findOne({
        token,
        status: 'pending',
        expiresAt: { $gt: new Date() },
    });
};
inviteSchema.statics.findPendingInvites = function (email) {
    return this.find({
        email: email.toLowerCase(),
        status: 'pending',
        expiresAt: { $gt: new Date() },
    }).populate('workspaceId roleId invitedBy');
};
inviteSchema.statics.revokePendingInvites = async function (email, workspaceId) {
    return this.updateMany({
        email: email.toLowerCase(),
        workspaceId,
        status: 'pending',
    }, {
        status: 'revoked',
    });
};
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
inviteSchema.methods.revoke = async function () {
    if (this.status !== 'pending') {
        throw new Error('Only pending invites can be revoked');
    }
    this.status = 'revoked';
    return this.save();
};
inviteSchema.methods.isValid = function () {
    return this.status === 'pending' && this.expiresAt > new Date();
};
inviteSchema.methods.getInviteUrl = function (frontendUrl) {
    return `${frontendUrl}/invite/${this.token}`;
};
inviteSchema.statics.cleanupExpired = async function () {
    const result = await this.updateMany({
        status: 'pending',
        expiresAt: { $lt: new Date() },
    }, {
        status: 'expired',
    });
    console.log(`Marked ${result.modifiedCount} invites as expired`);
    return result;
};
inviteSchema.statics.getWorkspaceStats = async function (workspaceId) {
    const stats = await this.aggregate([
        { $match: { workspaceId } },
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 },
            },
        },
    ]);
    return stats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
    }, {
        pending: 0,
        accepted: 0,
        expired: 0,
        revoked: 0,
    });
};
const Invite = mongoose_1.default.model('Invite', inviteSchema);
exports.default = Invite;
//# sourceMappingURL=Invite.js.map