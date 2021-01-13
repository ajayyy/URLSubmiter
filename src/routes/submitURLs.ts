import {db} from '../databases/databases';
import {config} from '../config';
import {Request, Response} from 'express';
import { Logger } from '../utils/logger';

export async function submitURLs(req: Request, res: Response) {
    let urls = req.body?.urls as string[];

    if (urls == undefined || urls?.length <= 0) {
        // Invalid request
        res.sendStatus(400);
        return;
    }

    urls = urls.filter((url) => 
            (typeof url === "string") && 
            url?.match(/^(https?:\/\/)?(([a-z0-9]{2,4}\.)?(mediafire\.com|mfi\.re)\/(\?|view\/|download\/|listen\/|file\/|watch\/|download\.php\?|imageview\.php\?quickkey=)|download\d+\.mediafire\.com\/[^\/]+\/|upload\.mediafire\.com\/|cdn\.mediafire\.com\/\?)[a-z0-9]+/));

    if (urls.length <= 0) {
        // All invalid URLs
        res.sendStatus(400);
        return;
    }

    const now = Date.now();

    urls.forEach((url) => {
        if (url) {
            db.prepare('run', "INSERT OR IGNORE INTO urls VALUES(?, ?)", [url, now]);
        }
    });

    res.sendStatus(200);
}
