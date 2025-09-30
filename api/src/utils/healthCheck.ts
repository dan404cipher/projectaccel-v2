import { database } from '@/config/database';
import { User, Workspace, Role } from '@/models';

/**
 * Comprehensive health check utility
 */
export class HealthCheck {
  /**
   * Run all health checks
   */
  static async runAll(): Promise<{
    status: 'healthy' | 'unhealthy';
    checks: Record<string, any>;
    timestamp: string;
  }> {
    const checks: Record<string, any> = {};
    let overallStatus: 'healthy' | 'unhealthy' = 'healthy';

    try {
      // Database connection check
      checks.database = await HealthCheck.checkDatabase();
      if (checks.database.status !== 'healthy') overallStatus = 'unhealthy';

      // Models check
      checks.models = await HealthCheck.checkModels();
      if (checks.models.status !== 'healthy') overallStatus = 'unhealthy';

      // Environment check
      checks.environment = HealthCheck.checkEnvironment();
      if (checks.environment.status !== 'healthy') overallStatus = 'unhealthy';

      // Memory check
      checks.memory = HealthCheck.checkMemory();

      return {
        status: overallStatus,
        checks,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        checks: {
          error: {
            status: 'unhealthy',
            message: 'Health check failed',
            error: error instanceof Error ? error.message : 'Unknown error',
          },
        },
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Check database connection and basic operations
   */
  static async checkDatabase(): Promise<{
    status: 'healthy' | 'unhealthy';
    message: string;
    details?: any;
  }> {
    try {
      // Check connection status
      const connectionStatus = database.getConnectionStatus();
      if (!connectionStatus) {
        return {
          status: 'unhealthy',
          message: 'Database not connected',
        };
      }

      // Test basic database operations
      const dbHealth = await database.healthCheck();
      if (dbHealth.status !== 'healthy') {
        return {
          status: 'unhealthy',
          message: dbHealth.message,
        };
      }

      // Test collection access
      const userCount = await User.countDocuments({});
      const workspaceCount = await Workspace.countDocuments({});
      const roleCount = await Role.countDocuments({});

      return {
        status: 'healthy',
        message: 'Database is healthy',
        details: {
          users: userCount,
          workspaces: workspaceCount,
          roles: roleCount,
        },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: 'Database health check failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Check model schemas and indexes
   */
  static async checkModels(): Promise<{
    status: 'healthy' | 'unhealthy';
    message: string;
    details?: any;
  }> {
    try {
      const models = [
        'User',
        'Workspace',
        'Role',
        'Invite',
        'Counter',
        'AuditLog',
      ];
      const modelStatus: Record<string, boolean> = {};

      for (const modelName of models) {
        try {
          // Check if model is accessible
          const Model = require(`@/models/${modelName}`).default;
          await Model.findOne({}).limit(1);
          modelStatus[modelName] = true;
        } catch (error) {
          modelStatus[modelName] = false;
        }
      }

      const allHealthy = Object.values(modelStatus).every(status => status);

      return {
        status: allHealthy ? 'healthy' : 'unhealthy',
        message: allHealthy
          ? 'All models are accessible'
          : 'Some models have issues',
        details: modelStatus,
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: 'Model health check failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Check environment configuration
   */
  static checkEnvironment(): {
    status: 'healthy' | 'unhealthy';
    message: string;
    details?: any;
  } {
    const requiredVars = [
      'NODE_ENV',
      'PORT',
      'MONGODB_URI',
      'JWT_ACCESS_SECRET',
      'JWT_REFRESH_SECRET',
    ];

    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    const issues: string[] = [];

    // Check for missing variables
    if (missingVars.length > 0) {
      issues.push(
        `Missing required environment variables: ${missingVars.join(', ')}`
      );
    }

    // Check for default/insecure values in production
    if (process.env.NODE_ENV === 'production') {
      const defaultSecrets = [
        'your-super-secret-jwt-access-key',
        'your-super-secret-jwt-refresh-key',
      ];

      if (defaultSecrets.includes(process.env.JWT_ACCESS_SECRET || '')) {
        issues.push('Using default JWT access secret in production');
      }

      if (defaultSecrets.includes(process.env.JWT_REFRESH_SECRET || '')) {
        issues.push('Using default JWT refresh secret in production');
      }
    }

    return {
      status: issues.length === 0 ? 'healthy' : 'unhealthy',
      message:
        issues.length === 0
          ? 'Environment configuration is valid'
          : 'Environment issues detected',
      details: issues.length > 0 ? { issues } : undefined,
    };
  }

  /**
   * Check memory usage
   */
  static checkMemory(): {
    status: 'healthy' | 'warning';
    message: string;
    details: any;
  } {
    const memoryUsage = process.memoryUsage();
    const memoryInMB = {
      rss: Math.round(memoryUsage.rss / 1024 / 1024),
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      external: Math.round(memoryUsage.external / 1024 / 1024),
    };

    // Warning if heap usage is above 80% of total
    const heapUsagePercent = (memoryInMB.heapUsed / memoryInMB.heapTotal) * 100;
    const status = heapUsagePercent > 80 ? 'warning' : 'healthy';

    return {
      status,
      message:
        status === 'healthy'
          ? 'Memory usage is normal'
          : 'High memory usage detected',
      details: {
        ...memoryInMB,
        heapUsagePercent: Math.round(heapUsagePercent),
      },
    };
  }

  /**
   * Quick health check for load balancer
   */
  static async quickCheck(): Promise<{
    status: 'ok' | 'error';
    timestamp: string;
  }> {
    try {
      const isConnected = database.getConnectionStatus();
      return {
        status: isConnected ? 'ok' : 'error',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
      };
    }
  }
}

export default HealthCheck;
