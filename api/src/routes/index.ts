import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import workspaceRoutes from './workspaceRoutes';
import roleRoutes from './roleRoutes';
import inviteRoutes from './inviteRoutes';
import { HealthCheck } from '@/utils/healthCheck';

const router = Router();

/**
 * API Routes configuration
 * Base path: /api/v1
 */

// Health check endpoints
router.get('/health', async (req, res) => {
  try {
    const healthStatus = await HealthCheck.runAll();
    const statusCode = healthStatus.status === 'healthy' ? 200 : 503;
    
    res.status(statusCode).json({
      success: healthStatus.status === 'healthy',
      message: `API is ${healthStatus.status}`,
      ...healthStatus,
      version: process.env.npm_package_version || '1.0.0'
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: 'Health check failed',
      status: 'unhealthy',
      timestamp: new Date().toISOString()
    });
  }
});

// Quick health check for load balancer
router.get('/health/quick', async (req, res) => {
  const quickStatus = await HealthCheck.quickCheck();
  const statusCode = quickStatus.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(quickStatus);
});

// Mount route modules
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/workspaces', workspaceRoutes);
router.use('/roles', roleRoutes);
router.use('/invites', inviteRoutes);

export default router;
