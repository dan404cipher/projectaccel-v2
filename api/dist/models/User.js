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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("@/config/env");
const userWorkspaceSchema = new mongoose_1.Schema({
    workspaceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Workspace',
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
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email',
        ],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false,
    },
    designation: {
        type: String,
        trim: true,
        maxlength: 100,
    },
    yearsOfExperience: {
        type: String,
        enum: ['0-1', '1-3', '3-5', '5-10', '10+'],
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
        index: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true,
    },
    lastLogin: {
        type: Date,
    },
    refreshTokens: [
        {
            type: String,
            select: false,
        },
    ],
    profilePicture: {
        type: String,
    },
    workspaces: [userWorkspaceSchema],
    isSuperAdmin: {
        type: Boolean,
        default: false,
        index: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    empId: {
        type: String,
        unique: true,
        sparse: true,
        match: /^[A-Z]{2}\d{4}$/,
    },
}, {
    timestamps: true,
    collection: 'users',
});
userSchema.index({ email: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ 'workspaces.workspaceId': 1 });
userSchema.index({ isSuperAdmin: 1 });
userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    try {
        const salt = await bcryptjs_1.default.genSalt(env_1.config.BCRYPT_ROUNDS);
        this.password = await bcryptjs_1.default.hash(this.password, salt);
        next();
    }
    catch (error) {
        next(error);
    }
});
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcryptjs_1.default.compare(candidatePassword, this.password);
};
userSchema.methods.addWorkspace = function (workspaceId, roleId, invitedBy) {
    const existingWorkspace = this.workspaces.find((ws) => ws.workspaceId.toString() === workspaceId.toString());
    if (existingWorkspace) {
        throw new Error('User is already a member of this workspace');
    }
    this.workspaces.push({
        workspaceId,
        roleId,
        joinedAt: new Date(),
        invitedBy,
        status: 'active',
    });
    return this.save();
};
userSchema.methods.removeWorkspace = function (workspaceId) {
    this.workspaces = this.workspaces.filter((ws) => ws.workspaceId.toString() !== workspaceId.toString());
    return this.save();
};
userSchema.methods.updateWorkspaceRole = function (workspaceId, newRoleId) {
    const workspace = this.workspaces.find((ws) => ws.workspaceId.toString() === workspaceId.toString());
    if (!workspace) {
        throw new Error('User is not a member of this workspace');
    }
    workspace.roleId = newRoleId;
    return this.save();
};
userSchema.methods.getWorkspace = function (workspaceId) {
    return this.workspaces.find((ws) => ws.workspaceId.toString() === workspaceId.toString());
};
userSchema.methods.isInWorkspace = function (workspaceId) {
    return this.workspaces.some((ws) => ws.workspaceId.toString() === workspaceId.toString() &&
        ws.status === 'active');
};
userSchema.methods.addRefreshToken = async function (token) {
    this.refreshTokens.push(token);
    if (this.refreshTokens.length > 5) {
        this.refreshTokens = this.refreshTokens.slice(-5);
    }
    return this.save();
};
userSchema.methods.removeRefreshToken = async function (token) {
    this.refreshTokens = this.refreshTokens.filter((t) => t !== token);
    return this.save();
};
userSchema.methods.clearRefreshTokens = async function () {
    this.refreshTokens = [];
    return this.save();
};
userSchema.methods.updateLastLogin = async function () {
    this.lastLogin = new Date();
    return this.save();
};
userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email: email.toLowerCase(), isActive: true });
};
userSchema.statics.findByEmailWithPassword = function (email) {
    return this.findOne({ email: email.toLowerCase(), isActive: true }).select('+password +refreshTokens');
};
userSchema.methods.getPublicProfile = function () {
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
        workspaces: this.workspaces,
    };
};
userSchema.methods.getWorkspaceProfile = function (workspaceId) {
    const workspace = this.getWorkspace(workspaceId);
    return {
        ...this.getPublicProfile(),
        workspaceRole: workspace?.roleId,
        workspaceStatus: workspace?.status,
        joinedAt: workspace?.joinedAt,
    };
};
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map