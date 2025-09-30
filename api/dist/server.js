"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_1 = require("@/config/env");
const database_1 = require("@/config/database");
const routes_1 = __importDefault(require("@/routes"));
const errorHandler_1 = require("@/middleware/errorHandler");
const rateLimiting_1 = require("@/middleware/rateLimiting");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = env_1.config.PORT;
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }
    initializeMiddlewares() {
        this.app.use((0, helmet_1.default)({
            crossOriginResourcePolicy: { policy: 'cross-origin' },
        }));
        this.app.use((0, cors_1.default)({
            origin: [
                env_1.config.CORS_ORIGIN,
                'http://localhost:8080',
                'http://localhost:3000',
            ],
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Workspace-ID'],
        }));
        this.app.use(rateLimiting_1.rateLimitGeneral);
        this.app.use(express_1.default.json({ limit: '10mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, compression_1.default)());
        if (env_1.config.NODE_ENV === 'development') {
            this.app.use((0, morgan_1.default)('dev'));
        }
        else {
            this.app.use((0, morgan_1.default)('combined'));
        }
        this.app.set('trust proxy', 1);
    }
    initializeRoutes() {
        this.app.get('/', (_req, res) => {
            res.status(200).json({
                success: true,
                message: 'Project Accel API',
                version: '1.0.0',
                environment: env_1.config.NODE_ENV,
                timestamp: new Date().toISOString(),
            });
        });
        this.app.use(`/api/${env_1.config.API_VERSION}`, routes_1.default);
    }
    initializeErrorHandling() {
        this.app.use(errorHandler_1.notFoundHandler);
        this.app.use(errorHandler_1.errorHandler);
    }
    async start() {
        try {
            await database_1.database.connect();
            this.app.listen(this.port, () => {
                console.log(`🚀 Server running on port ${this.port}`);
                console.log(`📍 Environment: ${env_1.config.NODE_ENV}`);
                console.log(`🌐 API Endpoint: http://localhost:${this.port}/api/${env_1.config.API_VERSION}`);
                console.log(`🏥 Health Check: http://localhost:${this.port}/api/${env_1.config.API_VERSION}/health`);
                if (env_1.config.isDevelopment()) {
                    console.log('\n📋 Available Endpoints:');
                    console.log(`   • Auth: http://localhost:${this.port}/api/${env_1.config.API_VERSION}/auth`);
                    console.log(`   • Users: http://localhost:${this.port}/api/${env_1.config.API_VERSION}/users`);
                    console.log(`   • Workspaces: http://localhost:${this.port}/api/${env_1.config.API_VERSION}/workspaces`);
                    console.log(`   • Roles: http://localhost:${this.port}/api/${env_1.config.API_VERSION}/roles`);
                    console.log(`   • Invites: http://localhost:${this.port}/api/${env_1.config.API_VERSION}/invites`);
                }
            });
        }
        catch (error) {
            console.error('❌ Failed to start server:', error);
            process.exit(1);
        }
    }
    async shutdown() {
        console.log('\n🛑 Shutting down server...');
        try {
            await database_1.database.disconnect();
            console.log('✅ Database disconnected');
            process.exit(0);
        }
        catch (error) {
            console.error('❌ Error during shutdown:', error);
            process.exit(1);
        }
    }
}
const server = new Server();
process.on('SIGTERM', () => server.shutdown());
process.on('SIGINT', () => server.shutdown());
process.on('uncaughtException', error => {
    console.error('💥 Uncaught Exception:', error);
    server.shutdown();
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
    server.shutdown();
});
server.start();
exports.default = server;
//# sourceMappingURL=server.js.map