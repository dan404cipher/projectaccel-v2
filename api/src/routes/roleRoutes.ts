import { Router } from 'express';
import { RoleController } from '@/controllers/roleController';
import { authenticate, requirePermission } from '@/middleware/auth';
import { PERMISSION_MODULES } from '@/types';

const router = Router();

/**
 * Role management routes
 * Base path: /api/v1/roles
 */

// Public routes for role templates
router.get('/permission-template', RoleController.getPermissionTemplate);
router.get('/permission-modules', RoleController.getPermissionModules);
router.get('/default-permissions/:roleName', RoleController.getDefaultPermissions);

// All routes below require authentication
router.use(authenticate);

// Get role statistics for workspace
router.get('/stats', 
  requirePermission(PERMISSION_MODULES.ROLES, 'view'),
  RoleController.getStats
);

// Get workspace roles
router.get('/', 
  requirePermission(PERMISSION_MODULES.ROLES, 'view'),
  RoleController.getWorkspaceRoles
);

// Create new role
router.post('/', 
  requirePermission(PERMISSION_MODULES.ROLES, 'create'),
  RoleController.create
);

// Get role by ID
router.get('/:id', 
  requirePermission(PERMISSION_MODULES.ROLES, 'view'),
  RoleController.getById
);

// Get role with user count
router.get('/:id/details', 
  requirePermission(PERMISSION_MODULES.ROLES, 'view'),
  RoleController.getRoleWithUserCount
);

// Update role
router.put('/:id', 
  requirePermission(PERMISSION_MODULES.ROLES, 'edit'),
  RoleController.update
);

// Delete role
router.delete('/:id', 
  requirePermission(PERMISSION_MODULES.ROLES, 'delete'),
  RoleController.delete
);

// Duplicate role
router.post('/:id/duplicate', 
  requirePermission(PERMISSION_MODULES.ROLES, 'create'),
  RoleController.duplicate
);

export default router;
