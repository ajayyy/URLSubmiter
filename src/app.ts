import express, {Express, Request, RequestHandler, Response} from 'express';
import {config} from './config';

import {submitURLs} from './routes/submitURLs';

import {loggerMiddleware} from './middleware/logger';
import {corsMiddleware} from './middleware/cors';
import path from 'path';


export function createServer(callback: () => void) {
    // Create a service (the app object is just a callback).
    const app = express();

    //setup CORS correctly
    app.use(corsMiddleware);
    app.use(loggerMiddleware);
    app.use(express.json());

    // Setup pretty JSON
    if (config.mode === "development") app.set('json spaces', 2);

    // Set production mode
    app.set('env', config.mode || 'production');

    setupRoutes(app);

    return app.listen(config.port, callback);
}

function setupRoutes(app: Express) {
    //add the get function
    app.post('/api/submitURLs', submitURLs);

    // app.get('/database.db', function (req: Request, res: Response) {
    //     res.sendFile("./databases/list.db", {root: "./"});
    // });

    app.use('/', express.static(path.join(__dirname, '../static')));
}
