import fs from 'fs';
import {SBSConfig} from "./types/config.model";

const isTestMode = process.env.npm_lifecycle_script === 'ts-node test/test.ts';
const configFile = isTestMode ? 'test.json' : 'config.json';
export const config: SBSConfig = JSON.parse(fs.readFileSync(configFile).toString('utf8'));

addDefaults(config, {
    port: 80,
    behindProxy: "X-Forwarded-For",
    mode: "development",
    db: "./databases/list.db",
    createDatabaseIfNotExist: true,
    schemaFolder: "./databases",
    dbSchema: "./databases/_list.db.sql",
    readOnly: false
});

// Add defaults
function addDefaults(config: SBSConfig, defaults: SBSConfig) {
    for (const key in defaults) {
        if (!config.hasOwnProperty(key)) {
            // @ts-ignore
            config[key] = defaults[key];
        }
    }
}
