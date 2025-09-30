"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteStatus = exports.UserWorkspaceStatus = exports.WorkspaceStatus = exports.PermissionActions = exports.SystemRoles = exports.PERMISSION_CATEGORY_MAPPING = exports.PERMISSION_CATEGORIES = exports.PERMISSION_MODULES = void 0;
exports.PERMISSION_MODULES = {
    PROJECTS: 'projects',
    TASKS: 'tasks',
    SPRINTS: 'sprints',
    TEAM: 'team',
    FILES: 'files',
    REPORTS: 'reports',
    WORKSPACE: 'workspace',
    MEMBERS: 'members',
    ROLES: 'roles',
    COMMENTS: 'comments',
    NOTIFICATIONS: 'notifications',
    CHAT: 'chat',
    MESSAGES: 'messages',
    BILLING: 'billing',
    INTEGRATIONS: 'integrations',
    SETTINGS: 'settings',
};
exports.PERMISSION_CATEGORIES = {
    CORE: 'core',
    TEAM_MANAGEMENT: 'team_management',
    COMMUNICATION: 'communication',
    ADMINISTRATION: 'administration',
};
exports.PERMISSION_CATEGORY_MAPPING = {
    [exports.PERMISSION_CATEGORIES.CORE]: [
        exports.PERMISSION_MODULES.PROJECTS,
        exports.PERMISSION_MODULES.TASKS,
        exports.PERMISSION_MODULES.SPRINTS,
        exports.PERMISSION_MODULES.TEAM,
        exports.PERMISSION_MODULES.FILES,
        exports.PERMISSION_MODULES.REPORTS,
        exports.PERMISSION_MODULES.WORKSPACE,
    ],
    [exports.PERMISSION_CATEGORIES.TEAM_MANAGEMENT]: [
        exports.PERMISSION_MODULES.MEMBERS,
        exports.PERMISSION_MODULES.ROLES,
    ],
    [exports.PERMISSION_CATEGORIES.COMMUNICATION]: [
        exports.PERMISSION_MODULES.COMMENTS,
        exports.PERMISSION_MODULES.NOTIFICATIONS,
        exports.PERMISSION_MODULES.CHAT,
        exports.PERMISSION_MODULES.MESSAGES,
    ],
    [exports.PERMISSION_CATEGORIES.ADMINISTRATION]: [
        exports.PERMISSION_MODULES.BILLING,
        exports.PERMISSION_MODULES.INTEGRATIONS,
        exports.PERMISSION_MODULES.SETTINGS,
    ],
};
var SystemRoles;
(function (SystemRoles) {
    SystemRoles["SUPER_ADMIN"] = "super_admin";
    SystemRoles["ADMIN"] = "admin";
    SystemRoles["MANAGER"] = "manager";
    SystemRoles["MEMBER"] = "member";
    SystemRoles["GUEST"] = "guest";
})(SystemRoles || (exports.SystemRoles = SystemRoles = {}));
var PermissionActions;
(function (PermissionActions) {
    PermissionActions["VIEW"] = "view";
    PermissionActions["CREATE"] = "create";
    PermissionActions["EDIT"] = "edit";
    PermissionActions["DELETE"] = "delete";
})(PermissionActions || (exports.PermissionActions = PermissionActions = {}));
var WorkspaceStatus;
(function (WorkspaceStatus) {
    WorkspaceStatus["ACTIVE"] = "active";
    WorkspaceStatus["SUSPENDED"] = "suspended";
    WorkspaceStatus["DELETED"] = "deleted";
})(WorkspaceStatus || (exports.WorkspaceStatus = WorkspaceStatus = {}));
var UserWorkspaceStatus;
(function (UserWorkspaceStatus) {
    UserWorkspaceStatus["ACTIVE"] = "active";
    UserWorkspaceStatus["INVITED"] = "invited";
    UserWorkspaceStatus["SUSPENDED"] = "suspended";
})(UserWorkspaceStatus || (exports.UserWorkspaceStatus = UserWorkspaceStatus = {}));
var InviteStatus;
(function (InviteStatus) {
    InviteStatus["PENDING"] = "pending";
    InviteStatus["ACCEPTED"] = "accepted";
    InviteStatus["EXPIRED"] = "expired";
    InviteStatus["REVOKED"] = "revoked";
})(InviteStatus || (exports.InviteStatus = InviteStatus = {}));
exports.default = {
    PERMISSION_MODULES: exports.PERMISSION_MODULES,
    SystemRoles,
    PermissionActions,
    WorkspaceStatus,
    UserWorkspaceStatus,
    InviteStatus,
};
//# sourceMappingURL=index.js.map