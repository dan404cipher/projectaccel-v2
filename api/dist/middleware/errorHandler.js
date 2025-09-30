"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.notFoundHandler = exports.errorHandler = void 0;
const apiError_1 = require("@/utils/apiError");
const env_1 = require("@/config/env");
const errorHandler = (error, _req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    let statusCode = 500;
    let message = 'Internal server error';
    let details = undefined;
    if (error instanceof apiError_1.ApiError) {
        statusCode = error.statusCode;
        message = error.message;
        if (env_1.config.isDevelopment()) {
            details = { stack: error.stack };
        }
    }
    else if (error.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation error';
        details = error.message;
    }
    else if (error.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
    }
    else if (error.name === 'MongoError' || error.name === 'MongoServerError') {
        const mongoError = error;
        if (mongoError.code === 11000) {
            statusCode = 409;
            message = 'Duplicate entry found';
            const field = Object.keys(mongoError.keyPattern || {})[0];
            if (field) {
                message = `${field} already exists`;
            }
        }
    }
    else if (error.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }
    else if (error.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }
    else if (error.name === 'SyntaxError' && 'body' in error) {
        statusCode = 400;
        message = 'Invalid JSON format';
    }
    else {
        console.error('Unexpected error:', error);
        if (env_1.config.isDevelopment()) {
            message = error.message;
            details = { stack: error.stack };
        }
    }
    res.status(statusCode).json({
        success: false,
        message,
        error: env_1.config.isDevelopment() ? error.name : undefined,
        details,
    });
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found`,
    });
};
exports.notFoundHandler = notFoundHandler;
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
exports.default = {
    errorHandler: exports.errorHandler,
    notFoundHandler: exports.notFoundHandler,
    asyncHandler: exports.asyncHandler,
};
//# sourceMappingURL=errorHandler.js.map