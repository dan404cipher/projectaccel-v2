"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.services = exports.RoleService = exports.InviteService = exports.UserService = exports.WorkspaceService = exports.AuthService = void 0;
var authService_1 = require("./authService");
Object.defineProperty(exports, "AuthService", { enumerable: true, get: function () { return authService_1.AuthService; } });
var workspaceService_1 = require("./workspaceService");
Object.defineProperty(exports, "WorkspaceService", { enumerable: true, get: function () { return workspaceService_1.WorkspaceService; } });
var userService_1 = require("./userService");
Object.defineProperty(exports, "UserService", { enumerable: true, get: function () { return userService_1.UserService; } });
var inviteService_1 = require("./inviteService");
Object.defineProperty(exports, "InviteService", { enumerable: true, get: function () { return inviteService_1.InviteService; } });
var roleService_1 = require("./roleService");
Object.defineProperty(exports, "RoleService", { enumerable: true, get: function () { return roleService_1.RoleService; } });
const authService_2 = require("./authService");
const workspaceService_2 = require("./workspaceService");
const userService_2 = require("./userService");
const inviteService_2 = require("./inviteService");
const roleService_2 = require("./roleService");
exports.services = {
    AuthService: authService_2.AuthService,
    WorkspaceService: workspaceService_2.WorkspaceService,
    UserService: userService_2.UserService,
    InviteService: inviteService_2.InviteService,
    RoleService: roleService_2.RoleService,
};
exports.default = exports.services;
//# sourceMappingURL=index.js.map