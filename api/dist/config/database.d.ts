declare class Database {
    private static instance;
    private isConnected;
    private constructor();
    static getInstance(): Database;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getConnectionStatus(): boolean;
    dropDatabase(): Promise<void>;
    clearCollections(): Promise<void>;
    healthCheck(): Promise<{
        status: string;
        message: string;
    }>;
}
export declare const database: Database;
export default database;
//# sourceMappingURL=database.d.ts.map