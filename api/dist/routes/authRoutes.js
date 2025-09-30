"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("@/controllers/authController");
const auth_1 = require("@/middleware/auth");
const rateLimiting_1 = require("@/middleware/rateLimiting");
const router = (0, express_1.Router)();
router.post('/signup', rateLimiting_1.rateLimitAuth, authController_1.AuthController.signup);
router.post('/login', rateLimiting_1.rateLimitAuth, authController_1.AuthController.login);
router.post('/refresh', auth_1.authenticateRefreshToken, authController_1.AuthController.refreshToken);
router.use(auth_1.authenticate);
router.post('/logout', authController_1.AuthController.logout);
router.post('/logout-all', authController_1.AuthController.logoutAll);
router.post('/switch-workspace', authController_1.AuthController.switchWorkspace);
router.get('/workspaces', authController_1.AuthController.getUserWorkspaces);
router.get('/me', authController_1.AuthController.getProfile);
router.post('/verify-email', authController_1.AuthController.verifyEmail);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map