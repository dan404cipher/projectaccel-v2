import { Router } from 'express';
import { WorkspaceController } from '@/controllers/workspaceController';
import { authenticate, requirePermission, requireSuperAdmin, requireSpecificWorkspace } from '@/middleware/auth';
import { RBACMiddleware } from '@/middleware/rbac';
import { PERMISSION_MODULES } from '@/types';

const router = Router();

/**
 * Workspace management routes
 * Base path: /api/v1/workspaces
 */

// All routes require authentication
router.use(authenticate);

// Search workspaces (Super Admin only)
router.get('/search', requireSuperAdmin, WorkspaceController.search);

// Create new workspace
router.post('/', WorkspaceController.create);

// Get workspace by ID
router.get('/:id', 
  requireSpecificWorkspace('id'),
  requirePermission(PERMISSION_MODULES.WORKSPACE, 'view'),
  WorkspaceController.getById
);

// Update workspace
router.put('/:id', 
  requireSpecificWorkspace('id'),
  requirePermission(PERMISSION_MODULES.WORKSPACE, 'edit'),
  WorkspaceController.update
);

// Delete workspace
router.delete('/:id', 
  requireSpecificWorkspace('id'),
  requirePermission(PERMISSION_MODULES.WORKSPACE, 'delete'),
  WorkspaceController.delete
);

// Get workspace statistics
router.get('/:id/stats', 
  requireSpecificWorkspace('id'),
  requirePermission(PERMISSION_MODULES.WORKSPACE, 'view'),
  WorkspaceController.getStats
);

// Get workspace members
router.get('/:id/members', 
  requireSpecificWorkspace('id'),
  requirePermission(PERMISSION_MODULES.MEMBERS, 'view'),
  WorkspaceController.getMembers
);

// Add member to workspace
router.post('/:id/members', 
  requireSpecificWorkspace('id'),
  requirePermission(PERMISSION_MODULES.MEMBERS, 'create'),
  WorkspaceController.addMember
);

// Remove member from workspace
router.delete('/:id/members/:userId', 
  requireSpecificWorkspace('id'),
  requirePermission(PERMISSION_MODULES.MEMBERS, 'delete'),
  WorkspaceController.removeMember
);

// Update member role
router.put('/:id/members/:userId/role', 
  requireSpecificWorkspace('id'),
  requirePermission(PERMISSION_MODULES.MEMBERS, 'edit'),
  WorkspaceController.updateMemberRole
);

// Transfer workspace ownership
router.post('/:id/transfer-ownership', 
  requireSpecificWorkspace('id'),
  requirePermission(PERMISSION_MODULES.WORKSPACE, 'delete'), // Only workspace admins
  WorkspaceController.transferOwnership
);

export default router;
