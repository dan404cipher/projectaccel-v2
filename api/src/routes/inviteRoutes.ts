import { Router } from 'express';
import { InviteController } from '@/controllers/inviteController';
import { authenticate, requirePermission } from '@/middleware/auth';
import { rateLimitInvites } from '@/middleware/rateLimiting';
import { PERMISSION_MODULES } from '@/types';

const router = Router();

/**
 * Invite management routes
 * Base path: /api/v1/invites
 */

// Public routes
router.get('/validate/:token', InviteController.getByToken);
router.post('/accept', InviteController.accept);
router.get('/user/:email', InviteController.getUserInvites);

// All routes below require authentication
router.use(authenticate);

// Get invite statistics for workspace
router.get('/stats', 
  requirePermission(PERMISSION_MODULES.MEMBERS, 'view'),
  InviteController.getStats
);

// Get workspace invites
router.get('/', 
  requirePermission(PERMISSION_MODULES.MEMBERS, 'view'),
  InviteController.getWorkspaceInvites
);

// Create and send invitation
router.post('/', 
  rateLimitInvites,
  requirePermission(PERMISSION_MODULES.MEMBERS, 'create'),
  InviteController.create
);

// Revoke invitation
router.delete('/:id', 
  requirePermission(PERMISSION_MODULES.MEMBERS, 'delete'),
  InviteController.revoke
);

// Resend invitation
router.post('/:id/resend', 
  rateLimitInvites,
  requirePermission(PERMISSION_MODULES.MEMBERS, 'create'),
  InviteController.resend
);

export default router;
