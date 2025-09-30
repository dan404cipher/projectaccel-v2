"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inviteController_1 = require("@/controllers/inviteController");
const auth_1 = require("@/middleware/auth");
const rateLimiting_1 = require("@/middleware/rateLimiting");
const types_1 = require("@/types");
const router = (0, express_1.Router)();
router.get('/validate/:token', inviteController_1.InviteController.getByToken);
router.post('/accept', inviteController_1.InviteController.accept);
router.get('/user/:email', inviteController_1.InviteController.getUserInvites);
router.use(auth_1.authenticate);
router.get('/stats', (0, auth_1.requirePermission)(types_1.PERMISSION_MODULES.MEMBERS, 'view'), inviteController_1.InviteController.getStats);
router.get('/', (0, auth_1.requirePermission)(types_1.PERMISSION_MODULES.MEMBERS, 'view'), inviteController_1.InviteController.getWorkspaceInvites);
router.post('/', rateLimiting_1.rateLimitInvites, (0, auth_1.requirePermission)(types_1.PERMISSION_MODULES.MEMBERS, 'create'), inviteController_1.InviteController.create);
router.delete('/:id', (0, auth_1.requirePermission)(types_1.PERMISSION_MODULES.MEMBERS, 'delete'), inviteController_1.InviteController.revoke);
router.post('/:id/resend', rateLimiting_1.rateLimitInvites, (0, auth_1.requirePermission)(types_1.PERMISSION_MODULES.MEMBERS, 'create'), inviteController_1.InviteController.resend);
exports.default = router;
//# sourceMappingURL=inviteRoutes.js.map