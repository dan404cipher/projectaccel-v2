/**
 * Service exports for centralized imports
 */
export { AuthService } from './authService';
export { WorkspaceService } from './workspaceService';
export { UserService } from './userService';
export { InviteService } from './inviteService';
export { RoleService } from './roleService';

// Export all services for easier testing and dependency injection
import { AuthService } from './authService';
import { WorkspaceService } from './workspaceService';
import { UserService } from './userService';
import { InviteService } from './inviteService';
import { RoleService } from './roleService';

export const services = {
  AuthService,
  WorkspaceService,
  UserService,
  InviteService,
  RoleService
};

export default services;
