import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from '@/config/env';
import { database } from '@/config/database';
import routes from '@/routes';
import { errorHandler, notFoundHandler } from '@/middleware/errorHandler';
import { rateLimitGeneral } from '@/middleware/rateLimiting';

/**
 * Express server setup and configuration
 */
class Server {
  public app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = config.PORT;

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  /**
   * Initialize middleware
   */
  private initializeMiddlewares(): void {
    // Security middleware
    this.app.use(
      helmet({
        crossOriginResourcePolicy: { policy: 'cross-origin' },
      })
    );

    // CORS configuration
    this.app.use(
      cors({
        origin: config.NODE_ENV === 'development' ? true : [
          config.CORS_ORIGIN,
          'http://localhost:8080', // Frontend development server
          'http://localhost:8081', // Frontend development server (Vite default)
          'http://localhost:3000', // Alternative frontend port
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Workspace-ID'],
      })
    );

    // Rate limiting (skip in development)
    if (config.NODE_ENV !== 'development') {
      this.app.use(rateLimitGeneral);
    }

    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Cookie parsing
    this.app.use(cookieParser());

    // Compression
    this.app.use(compression());

    // Request logging
    if (config.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    } else {
      this.app.use(morgan('combined'));
    }

    // Trust proxy (for deployment behind reverse proxy)
    this.app.set('trust proxy', 1);
  }

  /**
   * Initialize routes
   */
  private initializeRoutes(): void {
    // Root endpoint
    this.app.get('/', (_req, res) => {
      res.status(200).json({
        success: true,
        message: 'Project Accel API',
        version: '1.0.0',
        environment: config.NODE_ENV,
        timestamp: new Date().toISOString(),
      });
    });

    // API routes
    this.app.use(`/api/${config.API_VERSION}`, routes);
  }

  /**
   * Initialize error handling
   */
  private initializeErrorHandling(): void {
    // 404 handler for unmatched routes
    this.app.use(notFoundHandler);

    // Global error handler
    this.app.use(errorHandler);
  }

  /**
   * Start the server
   */
  public async start(): Promise<void> {
    try {
      // Connect to database
      await database.connect();

      // Start HTTP server
      this.app.listen(this.port, () => {
        console.log(`🚀 Server running on port ${this.port}`);
        console.log(`📍 Environment: ${config.NODE_ENV}`);
        console.log(
          `🌐 API Endpoint: http://localhost:${this.port}/api/${config.API_VERSION}`
        );
        console.log(
          `🏥 Health Check: http://localhost:${this.port}/api/${config.API_VERSION}/health`
        );

        if (config.isDevelopment()) {
          console.log('\n📋 Available Endpoints:');
          console.log(
            `   • Auth: http://localhost:${this.port}/api/${config.API_VERSION}/auth`
          );
          console.log(
            `   • Users: http://localhost:${this.port}/api/${config.API_VERSION}/users`
          );
          console.log(
            `   • Workspaces: http://localhost:${this.port}/api/${config.API_VERSION}/workspaces`
          );
          console.log(
            `   • Roles: http://localhost:${this.port}/api/${config.API_VERSION}/roles`
          );
          console.log(
            `   • Invites: http://localhost:${this.port}/api/${config.API_VERSION}/invites`
          );
        }
      });
    } catch (error) {
      console.error('❌ Failed to start server:', error);
      process.exit(1);
    }
  }

  /**
   * Graceful shutdown
   */
  public async shutdown(): Promise<void> {
    console.log('\n🛑 Shutting down server...');

    try {
      await database.disconnect();
      console.log('✅ Database disconnected');

      process.exit(0);
    } catch (error) {
      console.error('❌ Error during shutdown:', error);
      process.exit(1);
    }
  }
}

// Create and start server
const server = new Server();

// Handle process signals for graceful shutdown
process.on('SIGTERM', () => server.shutdown());
process.on('SIGINT', () => server.shutdown());

// Handle uncaught exceptions
process.on('uncaughtException', error => {
  console.error('💥 Uncaught Exception:', error);
  server.shutdown();
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  server.shutdown();
});

// Start the server
server.start();

export default server;
