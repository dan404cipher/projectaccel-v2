export declare class HealthCheck {
    static runAll(): Promise<{
        status: 'healthy' | 'unhealthy';
        checks: Record<string, any>;
        timestamp: string;
    }>;
    static checkDatabase(): Promise<{
        status: 'healthy' | 'unhealthy';
        message: string;
        details?: any;
    }>;
    static checkModels(): Promise<{
        status: 'healthy' | 'unhealthy';
        message: string;
        details?: any;
    }>;
    static checkEnvironment(): {
        status: 'healthy' | 'unhealthy';
        message: string;
        details?: any;
    };
    static checkMemory(): {
        status: 'healthy' | 'warning';
        message: string;
        details: any;
    };
    static quickCheck(): Promise<{
        status: 'ok' | 'error';
        timestamp: string;
    }>;
}
export default HealthCheck;
//# sourceMappingURL=healthCheck.d.ts.map