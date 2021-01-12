import express from 'express';
import {config} from '../src/config';

const app = express();

export function createMockServer(callback: () => void) {
    return app.listen(config.mockPort, callback);
}
