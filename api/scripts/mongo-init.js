// MongoDB initialization script for Docker
// This script creates the application database and a user with appropriate permissions

db = db.getSiblingDB('projectaccel');

// Create application user
db.createUser({
  user: 'projectaccel',
  pwd: 'projectaccel123',
  roles: [
    {
      role: 'readWrite',
      db: 'projectaccel'
    }
  ]
});

// Create collections and indexes
db.createCollection('users');
db.createCollection('workspaces');
db.createCollection('roles');
db.createCollection('invites');
db.createCollection('counters');
db.createCollection('audit_logs');

// Create indexes for better performance
// User indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ isActive: 1 });
db.users.createIndex({ 'workspaces.workspaceId': 1 });
db.users.createIndex({ isSuperAdmin: 1 });

// Workspace indexes
db.workspaces.createIndex({ workspaceId: 1 }, { unique: true });
db.workspaces.createIndex({ ownerId: 1 });
db.workspaces.createIndex({ 'members.userId': 1 });
db.workspaces.createIndex({ isActive: 1, subscriptionPlan: 1 });

// Role indexes
db.roles.createIndex({ workspaceId: 1, name: 1 }, { unique: true });
db.roles.createIndex({ workspaceId: 1, isSystemRole: 1 });
db.roles.createIndex({ workspaceId: 1, isActive: 1 });

// Invite indexes
db.invites.createIndex({ email: 1, workspaceId: 1 });
db.invites.createIndex({ token: 1, status: 1 });
db.invites.createIndex({ workspaceId: 1, status: 1 });
db.invites.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Audit log indexes
db.audit_logs.createIndex({ createdAt: -1 });
db.audit_logs.createIndex({ userId: 1, createdAt: -1 });
db.audit_logs.createIndex({ workspaceId: 1, createdAt: -1 });
db.audit_logs.createIndex({ resource: 1, resourceId: 1 });

print('✅ Database initialization completed');
print('📊 Collections created with indexes');
print('👤 Application user created: projectaccel');
