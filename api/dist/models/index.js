"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = exports.AuditLog = exports.Counter = exports.Invite = exports.Role = exports.Workspace = exports.User = void 0;
var User_1 = require("./User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return __importDefault(User_1).default; } });
var Workspace_1 = require("./Workspace");
Object.defineProperty(exports, "Workspace", { enumerable: true, get: function () { return __importDefault(Workspace_1).default; } });
var Role_1 = require("./Role");
Object.defineProperty(exports, "Role", { enumerable: true, get: function () { return __importDefault(Role_1).default; } });
var Invite_1 = require("./Invite");
Object.defineProperty(exports, "Invite", { enumerable: true, get: function () { return __importDefault(Invite_1).default; } });
var Counter_1 = require("./Counter");
Object.defineProperty(exports, "Counter", { enumerable: true, get: function () { return __importDefault(Counter_1).default; } });
var AuditLog_1 = require("./AuditLog");
Object.defineProperty(exports, "AuditLog", { enumerable: true, get: function () { return __importDefault(AuditLog_1).default; } });
const User_2 = __importDefault(require("./User"));
const Workspace_2 = __importDefault(require("./Workspace"));
const Role_2 = __importDefault(require("./Role"));
const Invite_2 = __importDefault(require("./Invite"));
const Counter_2 = __importDefault(require("./Counter"));
const AuditLog_2 = __importDefault(require("./AuditLog"));
exports.models = {
    User: User_2.default,
    Workspace: Workspace_2.default,
    Role: Role_2.default,
    Invite: Invite_2.default,
    Counter: Counter_2.default,
    AuditLog: AuditLog_2.default,
};
exports.default = exports.models;
//# sourceMappingURL=index.js.map