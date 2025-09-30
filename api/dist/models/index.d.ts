export { default as User } from './User';
export { default as Workspace } from './Workspace';
export { default as Role } from './Role';
export { default as Invite } from './Invite';
export { default as Counter } from './Counter';
export { default as AuditLog } from './AuditLog';
export declare const models: {
    User: import("../types/models").IUserModel;
    Workspace: import("../types/models").IWorkspaceModel;
    Role: import("../types/models").IRoleModel;
    Invite: import("mongoose").Model<import("../types").IInvite, {}, {}, {}, import("mongoose").Document<unknown, {}, import("../types").IInvite, {}, {}> & import("../types").IInvite & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, any>;
    Counter: import("../types/models").ICounterModel;
    AuditLog: import("../types/models").IAuditLogModel;
};
export default models;
//# sourceMappingURL=index.d.ts.map