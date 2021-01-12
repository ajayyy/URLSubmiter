import * as redis from 'redis';

export interface SBSConfig {
    port: number;
    mode: string;
    mockPort?: number;
    behindProxy: string | boolean;
    db: string;
    createDatabaseIfNotExist: boolean;
    schemaFolder: string;
    dbSchema: string;
    readOnly: boolean;
    mysql?: any;
    privateMysql?: any;
    minimumPrefix?: string;
    maximumPrefix?: string;
    redis?: redis.ClientOpts;
}