import {config} from '../config';
import {Request} from 'express';

export function getIP(req: Request) {
    if (config.behindProxy === true || config.behindProxy === "true") {
        config.behindProxy = "X-Forwarded-For";
    }

    switch (config.behindProxy as string) {
        case "X-Forwarded-For":
            return req.headers['x-forwarded-for'];
        case "Cloudflare":
            return req.headers['cf-connecting-ip'];
        case "X-Real-IP":
            return req.headers['x-real-ip'];
        default:
            return req.connection.remoteAddress;
    }
    
}