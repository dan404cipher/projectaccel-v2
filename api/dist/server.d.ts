import { Application } from 'express';
declare class Server {
    app: Application;
    private port;
    constructor();
    private initializeMiddlewares;
    private initializeRoutes;
    private initializeErrorHandling;
    start(): Promise<void>;
    shutdown(): Promise<void>;
}
declare const server: Server;
export default server;
//# sourceMappingURL=server.d.ts.map