import Mocha from 'mocha';
import fs from 'fs';
import path from 'path';
import {config} from '../src/config';
import {createServer} from '../src/app';
import {createMockServer} from './mocks';
import {Logger} from '../src/utils/logger';
import {initDb} from '../src/databases/databases';

// delete old test database
if (fs.existsSync(config.db)) fs.unlinkSync(config.db)

initDb();

// Instantiate a Mocha instance.
const mocha = new Mocha();

const testDir = './test/cases';

// Add each .ts file to the mocha instance
fs.readdirSync(testDir)
    .filter(function(file) {
        // Only keep the .ts files
        return file.substr(-3) === '.ts';
    })
    .forEach(function(file) {
        mocha.addFile(
            path.join(testDir, file)
        );
    });

const mockServer = createMockServer(() => {
    Logger.info("Started mock HTTP Server");
    const server = createServer(() => {
        Logger.info("Started main HTTP server");
        // Run the tests.
        mocha.run((failures) => {
            mockServer.close();
            server.close();
            process.exitCode = failures ? 1 : 0; // exit with non-zero status if there were failures
        });
    });
});
