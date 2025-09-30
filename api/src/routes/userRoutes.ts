import { Router } from 'express';
import { UserController } from '@/controllers/userController';
import { authenticate, requirePermission } from '@/middleware/auth';
import { rateLimitUserCreation } from '@/middleware/rateLimiting';
import { PERMISSION_MODULES } from '@/types';
import { config } from '@/config/env';

const router = Router();

/**
 * User management routes
 * Base path: /api/v1/users
 */

// All routes require authentication
router.use(authenticate);

// Search all users (Super Admin only)
router.get('/search', UserController.searchAll);

// Get user statistics for workspace
router.get(
  '/stats',
  requirePermission(PERMISSION_MODULES.MEMBERS, 'view'),
  UserController.getStats
);

// Get workspace users with pagination
router.get(
  '/',
  requirePermission(PERMISSION_MODULES.MEMBERS, 'view'),
  UserController.getWorkspaceUsers
);

// Create new user
router.post(
  '/',
  config.NODE_ENV !== 'development' ? rateLimitUserCreation : [],
  requirePermission(PERMISSION_MODULES.MEMBERS, 'create'),
  UserController.create
);

// Get user by ID
router.get(
  '/:id',
  requirePermission(PERMISSION_MODULES.MEMBERS, 'view'),
  UserController.getById
);

// Update user information
router.put(
  '/:id',
  requirePermission(PERMISSION_MODULES.MEMBERS, 'edit'),
  UserController.update
);

// Update user role in workspace
router.put(
  '/:id/role',
  requirePermission(PERMISSION_MODULES.MEMBERS, 'edit'),
  UserController.updateRole
);

// Deactivate user
router.delete(
  '/:id',
  requirePermission(PERMISSION_MODULES.MEMBERS, 'delete'),
  UserController.deactivate
);

// Reactivate user
router.post(
  '/:id/reactivate',
  requirePermission(PERMISSION_MODULES.MEMBERS, 'edit'),
  UserController.reactivate
);

// Remove user from workspace
router.delete(
  '/:id/workspace',
  requirePermission(PERMISSION_MODULES.MEMBERS, 'delete'),
  UserController.removeFromWorkspace
);

// Test endpoint to assign employee ID
router.post(
  '/:id/test-assign-emp-id',
  (req, res) => UserController.testAssignEmpId(req, res)
);

export default router;
