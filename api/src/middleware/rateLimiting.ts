import rateLimit from 'express-rate-limit';
import { config } from '@/config/env';

/**
 * Rate limiting middleware configurations
 */

// General API rate limiting
export const rateLimitGeneral = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS, // 15 minutes
  max: config.RATE_LIMIT_MAX_REQUESTS, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: (req) => {
    // Skip rate limiting for health checks
    return req.path === '/health' || req.path === '/api/health';
  }
});

// Stricter rate limiting for authentication endpoints
export const rateLimitAuth = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 auth requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true // Don't count successful requests
});

// Rate limiting for password reset endpoints
export const rateLimitPasswordReset = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 password reset requests per hour
  message: {
    success: false,
    message: 'Too many password reset attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiting for invite creation
export const rateLimitInvites = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 invite requests per windowMs
  message: {
    success: false,
    message: 'Too many invite requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiting for user creation
export const rateLimitUserCreation = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 user creation requests per windowMs
  message: {
    success: false,
    message: 'Too many user creation requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

export default {
  rateLimitGeneral,
  rateLimitAuth,
  rateLimitPasswordReset,
  rateLimitInvites,
  rateLimitUserCreation
};
