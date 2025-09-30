"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const workspaceRoutes_1 = __importDefault(require("./workspaceRoutes"));
const roleRoutes_1 = __importDefault(require("./roleRoutes"));
const inviteRoutes_1 = __importDefault(require("./inviteRoutes"));
const healthCheck_1 = require("@/utils/healthCheck");
const router = (0, express_1.Router)();
router.get('/health', async (_req, res) => {
    try {
        const healthStatus = await healthCheck_1.HealthCheck.runAll();
        const statusCode = healthStatus.status === 'healthy' ? 200 : 503;
        res.status(statusCode).json({
            success: healthStatus.status === 'healthy',
            message: `API is ${healthStatus.status}`,
            ...healthStatus,
            version: process.env['npm_package_version'] || '1.0.0',
        });
    }
    catch (error) {
        res.status(503).json({
            success: false,
            message: 'Health check failed',
            status: 'unhealthy',
            timestamp: new Date().toISOString(),
        });
    }
});
router.get('/health/quick', async (_req, res) => {
    const quickStatus = await healthCheck_1.HealthCheck.quickCheck();
    const statusCode = quickStatus.status === 'ok' ? 200 : 503;
    res.status(statusCode).json(quickStatus);
});
router.use('/auth', authRoutes_1.default);
router.use('/users', userRoutes_1.default);
router.use('/workspaces', workspaceRoutes_1.default);
router.use('/roles', roleRoutes_1.default);
router.use('/invites', inviteRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map