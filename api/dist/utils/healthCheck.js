"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheck = void 0;
const database_1 = require("@/config/database");
const models_1 = require("@/models");
class HealthCheck {
    static async runAll() {
        const checks = {};
        let overallStatus = 'healthy';
        try {
            checks.database = await HealthCheck.checkDatabase();
            if (checks.database.status !== 'healthy')
                overallStatus = 'unhealthy';
            checks.models = await HealthCheck.checkModels();
            if (checks.models.status !== 'healthy')
                overallStatus = 'unhealthy';
            checks.environment = HealthCheck.checkEnvironment();
            if (checks.environment.status !== 'healthy')
                overallStatus = 'unhealthy';
            checks.memory = HealthCheck.checkMemory();
            return {
                status: overallStatus,
                checks,
                timestamp: new Date().toISOString(),
            };
        }
        catch (error) {
            return {
                status: 'unhealthy',
                checks: {
                    error: {
                        status: 'unhealthy',
                        message: 'Health check failed',
                        error: error instanceof Error ? error.message : 'Unknown error',
                    },
                },
                timestamp: new Date().toISOString(),
            };
        }
    }
    static async checkDatabase() {
        try {
            const connectionStatus = database_1.database.getConnectionStatus();
            if (!connectionStatus) {
                return {
                    status: 'unhealthy',
                    message: 'Database not connected',
                };
            }
            const dbHealth = await database_1.database.healthCheck();
            if (dbHealth.status !== 'healthy') {
                return {
                    status: 'unhealthy',
                    message: dbHealth.message,
                };
            }
            const userCount = await models_1.User.countDocuments({});
            const workspaceCount = await models_1.Workspace.countDocuments({});
            const roleCount = await models_1.Role.countDocuments({});
            return {
                status: 'healthy',
                message: 'Database is healthy',
                details: {
                    users: userCount,
                    workspaces: workspaceCount,
                    roles: roleCount,
                },
            };
        }
        catch (error) {
            return {
                status: 'unhealthy',
                message: 'Database health check failed',
                details: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
    static async checkModels() {
        try {
            const models = [
                'User',
                'Workspace',
                'Role',
                'Invite',
                'Counter',
                'AuditLog',
            ];
            const modelStatus = {};
            for (const modelName of models) {
                try {
                    const Model = require(`@/models/${modelName}`).default;
                    await Model.findOne({}).limit(1);
                    modelStatus[modelName] = true;
                }
                catch (error) {
                    modelStatus[modelName] = false;
                }
            }
            const allHealthy = Object.values(modelStatus).every(status => status);
            return {
                status: allHealthy ? 'healthy' : 'unhealthy',
                message: allHealthy
                    ? 'All models are accessible'
                    : 'Some models have issues',
                details: modelStatus,
            };
        }
        catch (error) {
            return {
                status: 'unhealthy',
                message: 'Model health check failed',
                details: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
    static checkEnvironment() {
        const requiredVars = [
            'NODE_ENV',
            'PORT',
            'MONGODB_URI',
            'JWT_ACCESS_SECRET',
            'JWT_REFRESH_SECRET',
        ];
        const missingVars = requiredVars.filter(varName => !process.env[varName]);
        const issues = [];
        if (missingVars.length > 0) {
            issues.push(`Missing required environment variables: ${missingVars.join(', ')}`);
        }
        if (process.env.NODE_ENV === 'production') {
            const defaultSecrets = [
                'your-super-secret-jwt-access-key',
                'your-super-secret-jwt-refresh-key',
            ];
            if (defaultSecrets.includes(process.env.JWT_ACCESS_SECRET || '')) {
                issues.push('Using default JWT access secret in production');
            }
            if (defaultSecrets.includes(process.env.JWT_REFRESH_SECRET || '')) {
                issues.push('Using default JWT refresh secret in production');
            }
        }
        return {
            status: issues.length === 0 ? 'healthy' : 'unhealthy',
            message: issues.length === 0
                ? 'Environment configuration is valid'
                : 'Environment issues detected',
            details: issues.length > 0 ? { issues } : undefined,
        };
    }
    static checkMemory() {
        const memoryUsage = process.memoryUsage();
        const memoryInMB = {
            rss: Math.round(memoryUsage.rss / 1024 / 1024),
            heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
            heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
            external: Math.round(memoryUsage.external / 1024 / 1024),
        };
        const heapUsagePercent = (memoryInMB.heapUsed / memoryInMB.heapTotal) * 100;
        const status = heapUsagePercent > 80 ? 'warning' : 'healthy';
        return {
            status,
            message: status === 'healthy'
                ? 'Memory usage is normal'
                : 'High memory usage detected',
            details: {
                ...memoryInMB,
                heapUsagePercent: Math.round(heapUsagePercent),
            },
        };
    }
    static async quickCheck() {
        try {
            const isConnected = database_1.database.getConnectionStatus();
            return {
                status: isConnected ? 'ok' : 'error',
                timestamp: new Date().toISOString(),
            };
        }
        catch (error) {
            return {
                status: 'error',
                timestamp: new Date().toISOString(),
            };
        }
    }
}
exports.HealthCheck = HealthCheck;
exports.default = HealthCheck;
//# sourceMappingURL=healthCheck.js.map