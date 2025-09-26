import { database } from '@/config/database';
import { User, Workspace, Role, Counter } from '@/models';
import { AuthService, WorkspaceService } from '@/services';
import { PERMISSION_MODULES } from '@/types';

/**
 * Database seeding script for development and testing
 */
class DatabaseSeeder {
  private static isSeeded = false;

  /**
   * Run all seeds
   */
  static async run(): Promise<void> {
    if (DatabaseSeeder.isSeeded) {
      console.log('⚠️ Database already seeded');
      return;
    }

    try {
      console.log('🌱 Starting database seeding...');

      // Connect to database if not connected
      if (!database.getConnectionStatus()) {
        await database.connect();
      }

      // Clear existing data (only in development)
      if (process.env.NODE_ENV === 'development') {
        await DatabaseSeeder.clearDatabase();
      }

      // Create super admin
      const superAdmin = await DatabaseSeeder.createSuperAdmin();
      console.log('👤 Super admin created:', superAdmin.email);

      // Create sample workspaces and users
      const workspace1 = await DatabaseSeeder.createSampleWorkspace1();
      const workspace2 = await DatabaseSeeder.createSampleWorkspace2();

      console.log('🏢 Sample workspaces created:');
      console.log(`   • ${workspace1.name} (${workspace1.workspaceId})`);
      console.log(`   • ${workspace2.name} (${workspace2.workspaceId})`);

      DatabaseSeeder.isSeeded = true;
      console.log('✅ Database seeding completed successfully');

    } catch (error) {
      console.error('❌ Database seeding failed:', error);
      throw error;
    }
  }

  /**
   * Clear database (development only)
   */
  private static async clearDatabase(): Promise<void> {
    if (process.env.NODE_ENV !== 'development') {
      throw new Error('Database clearing is only allowed in development environment');
    }

    console.log('🧹 Clearing existing data...');
    
    await User.deleteMany({});
    await Workspace.deleteMany({});
    await Role.deleteMany({});
    await Counter.deleteMany({});
    
    console.log('✅ Database cleared');
  }

  /**
   * Create super admin user
   */
  private static async createSuperAdmin(): Promise<any> {
    const superAdminData = {
      name: 'Super Admin',
      email: 'superadmin@projectaccel.com',
      password: 'SuperAdmin123!',
      isEmailVerified: true,
      isActive: true,
      isSuperAdmin: true
    };

    const superAdmin = new User(superAdminData);
    await superAdmin.save();

    return {
      id: superAdmin._id,
      name: superAdmin.name,
      email: superAdmin.email,
      isSuperAdmin: superAdmin.isSuperAdmin
    };
  }

  /**
   * Create sample workspace 1 - Tech Startup
   */
  private static async createSampleWorkspace1(): Promise<any> {
    // Create workspace owner
    const ownerData = {
      name: 'Acme Corp',
      workspaceName: 'Acme Corporation',
      email: 'admin@acme.com',
      password: 'Admin123!',
      designation: 'CEO',
      yearsOfExperience: '10+'
    };

    const result = await AuthService.signup(ownerData);
    const workspace = result.workspace;

    // Add sample users to workspace
    const sampleUsers = [
      {
        name: 'Sarah Chen',
        email: 'sarah.chen@acme.com',
        password: 'User123!',
        designation: 'UX Designer',
        yearsOfExperience: '3-5',
        roleName: 'Manager'
      },
      {
        name: 'Mike Johnson',
        email: 'mike.johnson@acme.com',
        password: 'User123!',
        designation: 'Frontend Developer',
        yearsOfExperience: '1-3',
        roleName: 'Member'
      },
      {
        name: 'Emily Davis',
        email: 'emily.davis@acme.com',
        password: 'User123!',
        designation: 'Product Manager',
        yearsOfExperience: '5-10',
        roleName: 'Manager'
      },
      {
        name: 'John Guest',
        email: 'john.guest@acme.com',
        password: 'User123!',
        designation: 'Consultant',
        yearsOfExperience: '10+',
        roleName: 'Guest'
      }
    ];

    // Get workspace object
    const workspaceObj = await Workspace.findById(result.workspace.id);
    if (!workspaceObj) throw new Error('Workspace not found');

    // Create users and add to workspace
    for (const userData of sampleUsers) {
      const user = new User({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        designation: userData.designation,
        yearsOfExperience: userData.yearsOfExperience,
        isEmailVerified: true,
        isActive: true,
        createdBy: result.user.id
      });

      await user.save();

      // Find role by name
      const role = await Role.findOne({
        workspaceId: workspaceObj._id,
        name: userData.roleName,
        isSystemRole: true
      });

      if (role) {
        // Add to workspace
        await user.addWorkspace(workspaceObj._id, role._id);
        await workspaceObj.addMember(user._id, role._id, result.user.id);
      }
    }

    return {
      id: workspace.id,
      workspaceId: workspace.workspaceId,
      name: workspace.name,
      memberCount: sampleUsers.length + 1 // +1 for owner
    };
  }

  /**
   * Create sample workspace 2 - Agency
   */
  private static async createSampleWorkspace2(): Promise<any> {
    const ownerData = {
      name: 'Digital Agency Pro',
      workspaceName: 'Digital Agency Pro',
      email: 'owner@agency.com',
      password: 'Owner123!',
      designation: 'Agency Owner',
      yearsOfExperience: '10+'
    };

    const result = await AuthService.signup(ownerData);
    const workspace = result.workspace;

    // Add sample users
    const sampleUsers = [
      {
        name: 'Alex Rodriguez',
        email: 'alex@agency.com',
        password: 'User123!',
        designation: 'Creative Director',
        yearsOfExperience: '5-10',
        roleName: 'Manager'
      },
      {
        name: 'Lisa Wong',
        email: 'lisa@agency.com',
        password: 'User123!',
        designation: 'Graphic Designer',
        yearsOfExperience: '1-3',
        roleName: 'Member'
      }
    ];

    const workspaceObj = await Workspace.findById(result.workspace.id);
    if (!workspaceObj) throw new Error('Workspace not found');

    for (const userData of sampleUsers) {
      const user = new User({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        designation: userData.designation,
        yearsOfExperience: userData.yearsOfExperience,
        isEmailVerified: true,
        isActive: true,
        createdBy: result.user.id
      });

      await user.save();

      const role = await Role.findOne({
        workspaceId: workspaceObj._id,
        name: userData.roleName,
        isSystemRole: true
      });

      if (role) {
        await user.addWorkspace(workspaceObj._id, role._id);
        await workspaceObj.addMember(user._id, role._id, result.user.id);
      }
    }

    return {
      id: workspace.id,
      workspaceId: workspace.workspaceId,
      name: workspace.name,
      memberCount: sampleUsers.length + 1
    };
  }

  /**
   * Get seeding status
   */
  static getStatus(): { isSeeded: boolean; message: string } {
    return {
      isSeeded: DatabaseSeeder.isSeeded,
      message: DatabaseSeeder.isSeeded ? 'Database has been seeded' : 'Database not seeded'
    };
  }
}

/**
 * Run seeding if called directly
 */
if (require.main === module) {
  DatabaseSeeder.run()
    .then(() => {
      console.log('🎉 Seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding failed:', error);
      process.exit(1);
    });
}

export default DatabaseSeeder;
