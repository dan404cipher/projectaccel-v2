import mongoose from 'mongoose';
import { config } from './env';

/**
 * Database connection configuration and management
 */
class Database {
  private static instance: Database;
  private isConnected: boolean = false;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  /**
   * Connect to MongoDB database
   */
  public async connect(): Promise<void> {
    if (this.isConnected) {
      console.log('Already connected to database');
      return;
    }

    try {
      const mongoUri =
        config.NODE_ENV === 'test'
          ? config.MONGODB_TEST_URI
          : config.MONGODB_URI;

      await mongoose.connect(mongoUri, {
        // Remove deprecated options - mongoose 6+ handles these automatically
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        bufferCommands: false, // Disable mongoose buffering
      });

      this.isConnected = true;
      console.log(`✅ Connected to MongoDB: ${mongoUri}`);

      // Handle connection events
      mongoose.connection.on('error', error => {
        console.error('❌ MongoDB connection error:', error);
        this.isConnected = false;
      });

      mongoose.connection.on('disconnected', () => {
        console.warn('⚠️ MongoDB disconnected');
        this.isConnected = false;
      });

      mongoose.connection.on('reconnected', () => {
        console.log('✅ MongoDB reconnected');
        this.isConnected = true;
      });

      // Graceful shutdown
      process.on('SIGINT', this.disconnect.bind(this));
      process.on('SIGTERM', this.disconnect.bind(this));
    } catch (error) {
      console.error('❌ Failed to connect to MongoDB:', error);
      process.exit(1);
    }
  }

  /**
   * Disconnect from MongoDB
   */
  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    try {
      await mongoose.connection.close();
      this.isConnected = false;
      console.log('✅ Disconnected from MongoDB');
    } catch (error) {
      console.error('❌ Error disconnecting from MongoDB:', error);
    }
  }

  /**
   * Get connection status
   */
  public getConnectionStatus(): boolean {
    return this.isConnected && mongoose.connection.readyState === 1;
  }

  /**
   * Drop database (for testing purposes)
   */
  public async dropDatabase(): Promise<void> {
    if (config.NODE_ENV !== 'test') {
      throw new Error('Database can only be dropped in test environment');
    }

    try {
      await mongoose.connection.dropDatabase();
      console.log('✅ Test database dropped');
    } catch (error) {
      console.error('❌ Error dropping test database:', error);
      throw error;
    }
  }

  /**
   * Clear all collections (for testing purposes)
   */
  public async clearCollections(): Promise<void> {
    if (config.NODE_ENV !== 'test') {
      throw new Error('Collections can only be cleared in test environment');
    }

    try {
      const collections = mongoose.connection.collections;
      const clearPromises = Object.values(collections).map(collection =>
        collection.deleteMany({})
      );
      await Promise.all(clearPromises);
      console.log('✅ All collections cleared');
    } catch (error) {
      console.error('❌ Error clearing collections:', error);
      throw error;
    }
  }

  /**
   * Health check for database connection
   */
  public async healthCheck(): Promise<{ status: string; message: string }> {
    try {
      const state = mongoose.connection.readyState;
      const states = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
      };

      if (state === 1) {
        // Test the connection with a simple ping
        if (mongoose.connection.db) {
          await mongoose.connection.db.admin().ping();
        }
        return {
          status: 'healthy',
          message: 'Database connection is healthy',
        };
      } else {
        return {
          status: 'unhealthy',
          message: `Database is ${states[state as keyof typeof states]}`,
        };
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        message: `Database health check failed: ${error}`,
      };
    }
  }
}

// Export singleton instance
export const database = Database.getInstance();

// Default export for convenience
export default database;
