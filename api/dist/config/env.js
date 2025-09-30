"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.validateConfig = validateConfig;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
exports.config = {
    NODE_ENV: process.env['NODE_ENV'] || 'development',
    PORT: parseInt(process.env['PORT'] || '5000', 10),
    API_VERSION: process.env['API_VERSION'] || 'v1',
    MONGODB_URI: process.env['MONGODB_URI'] || 'mongodb://localhost:27017/projectaccel',
    MONGODB_TEST_URI: process.env['MONGODB_TEST_URI'] ||
        'mongodb://localhost:27017/projectaccel_test',
    JWT_ACCESS_SECRET: process.env['JWT_ACCESS_SECRET'] || 'your-super-secret-jwt-access-key',
    JWT_REFRESH_SECRET: process.env['JWT_REFRESH_SECRET'] || 'your-super-secret-jwt-refresh-key',
    JWT_ACCESS_EXPIRES_IN: process.env['JWT_ACCESS_EXPIRES_IN'] || '15m',
    JWT_REFRESH_EXPIRES_IN: process.env['JWT_REFRESH_EXPIRES_IN'] || '7d',
    BCRYPT_ROUNDS: parseInt(process.env['BCRYPT_ROUNDS'] || '12', 10),
    SESSION_SECRET: process.env['SESSION_SECRET'] || 'your-super-secret-session-key',
    SMTP_HOST: process.env['SMTP_HOST'] || 'smtp.gmail.com',
    SMTP_PORT: parseInt(process.env['SMTP_PORT'] || '587', 10),
    SMTP_USER: process.env['SMTP_USER'] || '',
    SMTP_PASS: process.env['SMTP_PASS'] || '',
    FROM_EMAIL: process.env['FROM_EMAIL'] || 'noreply@projectaccel.com',
    FROM_NAME: process.env['FROM_NAME'] || 'Project Accel',
    FRONTEND_URL: process.env['FRONTEND_URL'] || 'http://localhost:3000',
    RATE_LIMIT_WINDOW_MS: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '900000', 10),
    RATE_LIMIT_MAX_REQUESTS: parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'] || '100', 10),
    LOG_LEVEL: process.env['LOG_LEVEL'] || 'info',
    CORS_ORIGIN: process.env['CORS_ORIGIN'] || 'http://localhost:3000',
    MAX_FILE_SIZE: parseInt(process.env['MAX_FILE_SIZE'] || '10485760', 10),
    UPLOAD_PATH: process.env['UPLOAD_PATH'] || './uploads',
    REDIS_URL: process.env['REDIS_URL'] || 'redis://localhost:6379',
    isProduction: () => process.env['NODE_ENV'] === 'production',
    isDevelopment: () => process.env['NODE_ENV'] === 'development',
    isTest: () => process.env['NODE_ENV'] === 'test',
};
function validateConfig() {
    const requiredVars = [
        'JWT_ACCESS_SECRET',
        'JWT_REFRESH_SECRET',
        'MONGODB_URI',
    ];
    const missingVars = requiredVars.filter(varName => {
        const value = process.env[varName];
        return !value || value.trim() === '';
    });
    if (missingVars.length > 0) {
        console.error('❌ Missing required environment variables:', missingVars);
        console.error('Please check your .env file and ensure all required variables are set.');
        process.exit(1);
    }
    if (exports.config.isProduction()) {
        const defaultSecrets = [
            'your-super-secret-jwt-access-key',
            'your-super-secret-jwt-refresh-key',
            'your-super-secret-session-key',
        ];
        const usingDefaultSecrets = [
            exports.config.JWT_ACCESS_SECRET,
            exports.config.JWT_REFRESH_SECRET,
            exports.config.SESSION_SECRET,
        ].some(secret => defaultSecrets.includes(secret));
        if (usingDefaultSecrets) {
            console.error('❌ Using default secrets in production is not secure!');
            console.error('Please set strong, unique secrets for JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, and SESSION_SECRET');
            process.exit(1);
        }
    }
    console.log('✅ Environment configuration validated');
}
validateConfig();
//# sourceMappingURL=env.js.map