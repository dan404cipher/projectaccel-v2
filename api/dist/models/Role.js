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
const types_1 = require("@/types");
const permissionSetSchema = new mongoose_1.Schema({
    module: {
        type: String,
        required: true,
        enum: Object.values(types_1.PERMISSION_MODULES),
    },
    permissions: {
        view: { type: Boolean, default: false },
        create: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
    },
    scope: {
        type: String,
        enum: ['all', 'assigned', 'own'],
        default: 'all',
    },
}, { _id: false });
const roleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    workspaceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true,
        index: true,
    },
    isSystemRole: {
        type: Boolean,
        default: false,
        index: true,
    },
    inheritFrom: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Role',
    },
    permissions: [permissionSetSchema],
    defaultAccessScope: {
        type: String,
        enum: ['workspace', 'team', 'own'],
        default: 'workspace',
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
    collection: 'roles',
});
roleSchema.index({ workspaceId: 1, name: 1 }, { unique: true });
roleSchema.index({ workspaceId: 1, isSystemRole: 1 });
roleSchema.index({ workspaceId: 1, isActive: 1 });
roleSchema.pre('save', async function (next) {
    if (this.inheritFrom && this.isNew) {
        try {
            const parentRole = await this.constructor.findById(this.inheritFrom);
            if (parentRole) {
                this.permissions = [...parentRole.permissions];
            }
        }
        catch (error) {
            console.error('Error inheriting permissions:', error);
        }
    }
    next();
});
roleSchema.statics.createDefaultRoles = async function (workspaceId, createdBy) {
    const defaultRoles = [
        {
            name: 'Admin',
            description: 'Full system access with all permissions',
            isSystemRole: true,
            permissions: Object.values(types_1.PERMISSION_MODULES).map(module => ({
                module,
                permissions: { view: true, create: true, edit: true, delete: true },
                scope: 'all',
            })),
        },
        {
            name: 'Manager',
            description: 'Manage projects and team members',
            isSystemRole: true,
            permissions: [
                {
                    module: types_1.PERMISSION_MODULES.PROJECTS,
                    permissions: { view: true, create: true, edit: true, delete: true },
                    scope: 'all',
                },
                {
                    module: types_1.PERMISSION_MODULES.TASKS,
                    permissions: { view: true, create: true, edit: true, delete: true },
                    scope: 'all',
                },
                {
                    module: types_1.PERMISSION_MODULES.SPRINTS,
                    permissions: { view: true, create: true, edit: true, delete: true },
                    scope: 'all',
                },
                {
                    module: types_1.PERMISSION_MODULES.TEAM,
                    permissions: { view: true, create: false, edit: true, delete: false },
                    scope: 'all',
                },
                {
                    module: types_1.PERMISSION_MODULES.FILES,
                    permissions: { view: true, create: true, edit: true, delete: true },
                    scope: 'all',
                },
                {
                    module: types_1.PERMISSION_MODULES.REPORTS,
                    permissions: { view: true, create: true, edit: true, delete: false },
                    scope: 'all',
                },
                {
                    module: types_1.PERMISSION_MODULES.MEMBERS,
                    permissions: { view: true, create: true, edit: true, delete: false },
                    scope: 'all',
                },
                {
                    module: types_1.PERMISSION_MODULES.COMMENTS,
                    permissions: { view: true, create: true, edit: true, delete: true },
                    scope: 'all',
                },
                {
                    module: types_1.PERMISSION_MODULES.NOTIFICATIONS,
                    permissions: { view: true, create: true, edit: true, delete: true },
                    scope: 'all',
                },
            ],
        },
        {
            name: 'Member',
            description: 'Standard user with project access',
            isSystemRole: true,
            permissions: [
                {
                    module: types_1.PERMISSION_MODULES.PROJECTS,
                    permissions: {
                        view: true,
                        create: false,
                        edit: false,
                        delete: false,
                    },
                    scope: 'assigned',
                },
                {
                    module: types_1.PERMISSION_MODULES.TASKS,
                    permissions: { view: true, create: true, edit: true, delete: false },
                    scope: 'assigned',
                },
                {
                    module: types_1.PERMISSION_MODULES.SPRINTS,
                    permissions: {
                        view: true,
                        create: false,
                        edit: false,
                        delete: false,
                    },
                    scope: 'assigned',
                },
                {
                    module: types_1.PERMISSION_MODULES.TEAM,
                    permissions: {
                        view: true,
                        create: false,
                        edit: false,
                        delete: false,
                    },
                    scope: 'all',
                },
                {
                    module: types_1.PERMISSION_MODULES.FILES,
                    permissions: { view: true, create: true, edit: true, delete: false },
                    scope: 'assigned',
                },
                {
                    module: types_1.PERMISSION_MODULES.REPORTS,
                    permissions: {
                        view: true,
                        create: false,
                        edit: false,
                        delete: false,
                    },
                    scope: 'assigned',
                },
                {
                    module: types_1.PERMISSION_MODULES.COMMENTS,
                    permissions: { view: true, create: true, edit: true, delete: false },
                    scope: 'own',
                },
                {
                    module: types_1.PERMISSION_MODULES.NOTIFICATIONS,
                    permissions: { view: true, create: false, edit: true, delete: false },
                    scope: 'own',
                },
            ],
        },
        {
            name: 'Guest',
            description: 'Limited access to assigned projects',
            isSystemRole: true,
            permissions: [
                {
                    module: types_1.PERMISSION_MODULES.PROJECTS,
                    permissions: {
                        view: true,
                        create: false,
                        edit: false,
                        delete: false,
                    },
                    scope: 'assigned',
                },
                {
                    module: types_1.PERMISSION_MODULES.TASKS,
                    permissions: {
                        view: true,
                        create: false,
                        edit: false,
                        delete: false,
                    },
                    scope: 'assigned',
                },
                {
                    module: types_1.PERMISSION_MODULES.TEAM,
                    permissions: {
                        view: true,
                        create: false,
                        edit: false,
                        delete: false,
                    },
                    scope: 'all',
                },
                {
                    module: types_1.PERMISSION_MODULES.FILES,
                    permissions: {
                        view: true,
                        create: false,
                        edit: false,
                        delete: false,
                    },
                    scope: 'assigned',
                },
                {
                    module: types_1.PERMISSION_MODULES.COMMENTS,
                    permissions: { view: true, create: true, edit: false, delete: false },
                    scope: 'own',
                },
            ],
        },
    ];
    const createdRoles = [];
    for (const roleData of defaultRoles) {
        const role = new this({
            ...roleData,
            workspaceId,
            createdBy,
        });
        await role.save();
        createdRoles.push(role);
    }
    return createdRoles;
};
roleSchema.methods.hasPermission = function (module, action) {
    const permission = this.permissions.find((p) => p.module === module);
    return permission ? permission.permissions[action] : false;
};
roleSchema.methods.getPermissionMatrix = function () {
    const matrix = {};
    Object.values(types_1.PERMISSION_MODULES).forEach(module => {
        const permission = this.permissions.find((p) => p.module === module);
        matrix[module] = permission
            ? permission.permissions
            : { view: false, create: false, edit: false, delete: false };
    });
    return matrix;
};
const Role = mongoose_1.default.model('Role', roleSchema);
exports.default = Role;
//# sourceMappingURL=Role.js.map