import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/utils/apiError';
import { config } from '@/config/env';

/**
 * Global error handling middleware
 */
export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  // If response was already sent, pass to default Express error handler
  if (res.headersSent) {
    return next(error);
  }

  let statusCode = 500;
  let message = 'Internal server error';
  let details: any = undefined;

  // Handle known API errors
  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;

    // Include stack trace in development
    if (config.isDevelopment()) {
      details = { stack: error.stack };
    }
  }
  // Handle MongoDB/Mongoose errors
  else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation error';
    details = error.message;
  } else if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  } else if (error.name === 'MongoError' || error.name === 'MongoServerError') {
    const mongoError = error as any;
    if (mongoError.code === 11000) {
      statusCode = 409;
      message = 'Duplicate entry found';
      // Extract field name from duplicate key error
      const field = Object.keys(mongoError.keyPattern || {})[0];
      if (field) {
        message = `${field} already exists`;
      }
    }
  }
  // Handle JWT errors
  else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }
  // Handle other common errors
  else if (error.name === 'SyntaxError' && 'body' in error) {
    statusCode = 400;
    message = 'Invalid JSON format';
  } else {
    // Log unexpected errors
    console.error('Unexpected error:', error);

    // Include error details in development
    if (config.isDevelopment()) {
      message = error.message;
      details = { stack: error.stack };
    }
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    error: config.isDevelopment() ? error.name : undefined,
    details,
  });
};

/**
 * 404 handler for unmatched routes
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
};

/**
 * Async error handler wrapper
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default {
  errorHandler,
  notFoundHandler,
  asyncHandler,
};
