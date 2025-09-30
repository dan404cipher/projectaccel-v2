"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
class Database {
    constructor() {
        this.isConnected = false;
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    async connect() {
        if (this.isConnected) {
            console.log('Already connected to database');
            return;
        }
        try {
            const mongoUri = env_1.config.NODE_ENV === 'test'
                ? env_1.config.MONGODB_TEST_URI
                : env_1.config.MONGODB_URI;
            await mongoose_1.default.connect(mongoUri, {
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                bufferCommands: false,
            });
            this.isConnected = true;
            console.log(`✅ Connected to MongoDB: ${mongoUri}`);
            mongoose_1.default.connection.on('error', error => {
                console.error('❌ MongoDB connection error:', error);
                this.isConnected = false;
            });
            mongoose_1.default.connection.on('disconnected', () => {
                console.warn('⚠️ MongoDB disconnected');
                this.isConnected = false;
            });
            mongoose_1.default.connection.on('reconnected', () => {
                console.log('✅ MongoDB reconnected');
                this.isConnected = true;
            });
            process.on('SIGINT', this.disconnect.bind(this));
            process.on('SIGTERM', this.disconnect.bind(this));
        }
        catch (error) {
            console.error('❌ Failed to connect to MongoDB:', error);
            process.exit(1);
        }
    }
    async disconnect() {
        if (!this.isConnected) {
            return;
        }
        try {
            await mongoose_1.default.connection.close();
            this.isConnected = false;
            console.log('✅ Disconnected from MongoDB');
        }
        catch (error) {
            console.error('❌ Error disconnecting from MongoDB:', error);
        }
    }
    getConnectionStatus() {
        return this.isConnected && mongoose_1.default.connection.readyState === 1;
    }
    async dropDatabase() {
        if (env_1.config.NODE_ENV !== 'test') {
            throw new Error('Database can only be dropped in test environment');
        }
        try {
            await mongoose_1.default.connection.dropDatabase();
            console.log('✅ Test database dropped');
        }
        catch (error) {
            console.error('❌ Error dropping test database:', error);
            throw error;
        }
    }
    async clearCollections() {
        if (env_1.config.NODE_ENV !== 'test') {
            throw new Error('Collections can only be cleared in test environment');
        }
        try {
            const collections = mongoose_1.default.connection.collections;
            const clearPromises = Object.values(collections).map(collection => collection.deleteMany({}));
            await Promise.all(clearPromises);
            console.log('✅ All collections cleared');
        }
        catch (error) {
            console.error('❌ Error clearing collections:', error);
            throw error;
        }
    }
    async healthCheck() {
        try {
            const state = mongoose_1.default.connection.readyState;
            const states = {
                0: 'disconnected',
                1: 'connected',
                2: 'connecting',
                3: 'disconnecting',
            };
            if (state === 1) {
                if (mongoose_1.default.connection.db) {
                    await mongoose_1.default.connection.db.admin().ping();
                }
                return {
                    status: 'healthy',
                    message: 'Database connection is healthy',
                };
            }
            else {
                return {
                    status: 'unhealthy',
                    message: `Database is ${states[state]}`,
                };
            }
        }
        catch (error) {
            return {
                status: 'unhealthy',
                message: `Database health check failed: ${error}`,
            };
        }
    }
}
exports.database = Database.getInstance();
exports.default = exports.database;
//# sourceMappingURL=database.js.map