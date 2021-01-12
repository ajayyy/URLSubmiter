import {config} from '../config';
import {Sqlite} from './Sqlite';
import {Mysql} from './Mysql';
import {IDatabase} from './IDatabase';


let db: IDatabase;
if (config.mysql) {
    db = new Mysql(config.mysql);
}
else {
    db = new Sqlite({
        dbPath: config.db,
        dbSchemaFileName: config.dbSchema,
        dbSchemaFolder: config.schemaFolder,
        fileNamePrefix: 'list',
        readOnly: config.readOnly,
        createDbIfNotExists: config.createDatabaseIfNotExist,
        enableWalCheckpointNumber: !config.readOnly && config.mode === "production"
    });
}
function initDb() {
    db.init();
}

export {
    db,
    initDb,
}
