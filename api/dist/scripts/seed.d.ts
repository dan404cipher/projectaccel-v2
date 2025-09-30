declare class DatabaseSeeder {
    private static isSeeded;
    static run(): Promise<void>;
    private static clearDatabase;
    private static createSuperAdmin;
    private static createSampleWorkspace1;
    private static createSampleWorkspace2;
    static getStatus(): {
        isSeeded: boolean;
        message: string;
    };
}
export default DatabaseSeeder;
//# sourceMappingURL=seed.d.ts.map