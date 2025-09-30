"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("@/config/database");
const models_1 = require("@/models");
const services_1 = require("@/services");
class DatabaseSeeder {
    static async run() {
        if (DatabaseSeeder.isSeeded) {
            console.log('⚠️ Database already seeded');
            return;
        }
        try {
            console.log('🌱 Starting database seeding...');
            if (!database_1.database.getConnectionStatus()) {
                await database_1.database.connect();
            }
            if (process.env.NODE_ENV === 'development') {
                await DatabaseSeeder.clearDatabase();
            }
            const superAdmin = await DatabaseSeeder.createSuperAdmin();
            console.log('👤 Super admin created:', superAdmin.email);
            const workspace1 = await DatabaseSeeder.createSampleWorkspace1();
            const workspace2 = await DatabaseSeeder.createSampleWorkspace2();
            console.log('🏢 Sample workspaces created:');
            console.log(`   • ${workspace1.name} (${workspace1.workspaceId})`);
            console.log(`   • ${workspace2.name} (${workspace2.workspaceId})`);
            DatabaseSeeder.isSeeded = true;
            console.log('✅ Database seeding completed successfully');
        }
        catch (error) {
            console.error('❌ Database seeding failed:', error);
            throw error;
        }
    }
    static async clearDatabase() {
        if (process.env.NODE_ENV !== 'development') {
            throw new Error('Database clearing is only allowed in development environment');
        }
        console.log('🧹 Clearing existing data...');
        await models_1.User.deleteMany({});
        await models_1.Workspace.deleteMany({});
        await models_1.Role.deleteMany({});
        await models_1.Counter.deleteMany({});
        console.log('✅ Database cleared');
    }
    static async createSuperAdmin() {
        const superAdminData = {
            name: 'Super Admin',
            email: 'superadmin@projectaccel.com',
            password: 'SuperAdmin123!',
            isEmailVerified: true,
            isActive: true,
            isSuperAdmin: true,
        };
        const superAdmin = new models_1.User(superAdminData);
        await superAdmin.save();
        return {
            id: superAdmin._id,
            name: superAdmin.name,
            email: superAdmin.email,
            isSuperAdmin: superAdmin.isSuperAdmin,
        };
    }
    static async createSampleWorkspace1() {
        const ownerData = {
            name: 'Acme Corp',
            workspaceName: 'Acme Corporation',
            email: 'admin@acme.com',
            password: 'Admin123!',
            designation: 'CEO',
            yearsOfExperience: '10+',
        };
        const result = await services_1.AuthService.signup(ownerData);
        const workspace = result.workspace;
        const sampleUsers = [
            {
                name: 'Sarah Chen',
                email: 'sarah.chen@acme.com',
                password: 'User123!',
                designation: 'UX Designer',
                yearsOfExperience: '3-5',
                roleName: 'Manager',
            },
            {
                name: 'Mike Johnson',
                email: 'mike.johnson@acme.com',
                password: 'User123!',
                designation: 'Frontend Developer',
                yearsOfExperience: '1-3',
                roleName: 'Member',
            },
            {
                name: 'Emily Davis',
                email: 'emily.davis@acme.com',
                password: 'User123!',
                designation: 'Product Manager',
                yearsOfExperience: '5-10',
                roleName: 'Manager',
            },
            {
                name: 'John Guest',
                email: 'john.guest@acme.com',
                password: 'User123!',
                designation: 'Consultant',
                yearsOfExperience: '10+',
                roleName: 'Guest',
            },
        ];
        const workspaceObj = await models_1.Workspace.findById(result.workspace.id);
        if (!workspaceObj)
            throw new Error('Workspace not found');
        for (const userData of sampleUsers) {
            const user = new models_1.User({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                designation: userData.designation,
                yearsOfExperience: userData.yearsOfExperience,
                isEmailVerified: true,
                isActive: true,
                createdBy: result.user.id,
            });
            await user.save();
            const role = await models_1.Role.findOne({
                workspaceId: workspaceObj._id,
                name: userData.roleName,
                isSystemRole: true,
            });
            if (role) {
                user.workspaces.push({
                    workspaceId: workspaceObj._id,
                    roleId: role._id,
                    status: 'active',
                    joinedAt: new Date(),
                });
                await user.save();
                workspaceObj.members.push({
                    userId: user._id,
                    roleId: role._id,
                    status: 'active',
                    joinedAt: new Date(),
                });
                await workspaceObj.save();
            }
        }
        return {
            id: workspace.id,
            workspaceId: workspace.workspaceId,
            name: workspace.name,
            memberCount: sampleUsers.length + 1,
        };
    }
    static async createSampleWorkspace2() {
        const ownerData = {
            name: 'Digital Agency Pro',
            workspaceName: 'Digital Agency Pro',
            email: 'owner@agency.com',
            password: 'Owner123!',
            designation: 'Agency Owner',
            yearsOfExperience: '10+',
        };
        const result = await services_1.AuthService.signup(ownerData);
        const workspace = result.workspace;
        const sampleUsers = [
            {
                name: 'Alex Rodriguez',
                email: 'alex@agency.com',
                password: 'User123!',
                designation: 'Creative Director',
                yearsOfExperience: '5-10',
                roleName: 'Manager',
            },
            {
                name: 'Lisa Wong',
                email: 'lisa@agency.com',
                password: 'User123!',
                designation: 'Graphic Designer',
                yearsOfExperience: '1-3',
                roleName: 'Member',
            },
        ];
        const workspaceObj = await models_1.Workspace.findById(result.workspace.id);
        if (!workspaceObj)
            throw new Error('Workspace not found');
        for (const userData of sampleUsers) {
            const user = new models_1.User({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                designation: userData.designation,
                yearsOfExperience: userData.yearsOfExperience,
                isEmailVerified: true,
                isActive: true,
                createdBy: result.user.id,
            });
            await user.save();
            const role = await models_1.Role.findOne({
                workspaceId: workspaceObj._id,
                name: userData.roleName,
                isSystemRole: true,
            });
            if (role) {
                user.workspaces.push({
                    workspaceId: workspaceObj._id,
                    roleId: role._id,
                    status: 'active',
                    joinedAt: new Date(),
                });
                await user.save();
                workspaceObj.members.push({
                    userId: user._id,
                    roleId: role._id,
                    status: 'active',
                    joinedAt: new Date(),
                });
                await workspaceObj.save();
            }
        }
        return {
            id: workspace.id,
            workspaceId: workspace.workspaceId,
            name: workspace.name,
            memberCount: sampleUsers.length + 1,
        };
    }
    static getStatus() {
        return {
            isSeeded: DatabaseSeeder.isSeeded,
            message: DatabaseSeeder.isSeeded
                ? 'Database has been seeded'
                : 'Database not seeded',
        };
    }
}
DatabaseSeeder.isSeeded = false;
if (require.main === module) {
    DatabaseSeeder.run()
        .then(() => {
        console.log('🎉 Seeding completed successfully');
        process.exit(0);
    })
        .catch(error => {
        console.error('💥 Seeding failed:', error);
        process.exit(1);
    });
}
exports.default = DatabaseSeeder;
//# sourceMappingURL=seed.js.map