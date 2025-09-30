"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitUserCreation = exports.rateLimitInvites = exports.rateLimitPasswordReset = exports.rateLimitAuth = exports.rateLimitGeneral = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_1 = require("@/config/env");
exports.rateLimitGeneral = (0, express_rate_limit_1.default)({
    windowMs: env_1.config.RATE_LIMIT_WINDOW_MS,
    max: env_1.config.RATE_LIMIT_MAX_REQUESTS,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: req => {
        return req.path === '/health' || req.path === '/api/health';
    },
});
exports.rateLimitAuth = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        message: 'Too many authentication attempts, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
});
exports.rateLimitPasswordReset = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: {
        success: false,
        message: 'Too many password reset attempts, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
exports.rateLimitInvites = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: {
        success: false,
        message: 'Too many invite requests, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
exports.rateLimitUserCreation = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        message: 'Too many user creation requests, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
exports.default = {
    rateLimitGeneral: exports.rateLimitGeneral,
    rateLimitAuth: exports.rateLimitAuth,
    rateLimitPasswordReset: exports.rateLimitPasswordReset,
    rateLimitInvites: exports.rateLimitInvites,
    rateLimitUserCreation: exports.rateLimitUserCreation,
};
//# sourceMappingURL=rateLimiting.js.map