import { Router } from 'express';
import { AuthController } from '@/controllers/authController';
import { authenticate, authenticateRefreshToken } from '@/middleware/auth';
import { rateLimitAuth } from '@/middleware/rateLimiting';

const router = Router();

/**
 * Authentication routes
 * Base path: /api/v1/auth
 */

// Public routes
router.post('/signup', rateLimitAuth, AuthController.signup);
router.post('/login', rateLimitAuth, AuthController.login);
router.post('/refresh', authenticateRefreshToken, AuthController.refreshToken);
// Note: Invite validation will be handled by invite routes

// Protected routes
router.use(authenticate); // All routes below require authentication

router.post('/logout', AuthController.logout);
router.post('/logout-all', AuthController.logoutAll);
router.post('/switch-workspace', AuthController.switchWorkspace);
router.get('/workspaces', AuthController.getUserWorkspaces);
router.get('/me', AuthController.getProfile);
router.post('/verify-email', AuthController.verifyEmail);

export default router;
