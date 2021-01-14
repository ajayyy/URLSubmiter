import {db} from '../databases/databases';
import {config} from '../config';
import {Request, Response} from 'express';
import { Logger } from '../utils/logger';

export async function submitURLs(req: Request, res: Response) {
    let urls = req.body?.urls as string[];
    let description = req.body?.description as string;
    let submitter = req.body?.submitter as string;

    if (urls == undefined || urls?.length <= 0) {
        // Invalid request
        res.sendStatus(400);
        return;
    }

    urls = urls.filter((url) => 
            (typeof url === "string") && url?.match(/^(http|https):\/\/((www|[.*]{3}).|)mediafire.com/));

    if (urls.length <= 0) {
        // All invalid URLs
        res.sendStatus(400);
        return;
    }

    if (typeof description !== "string") description = "";
    if (typeof submitter !== "string") submitter = "";

    const now = Date.now();

    urls.forEach((url) => {
        if (url) {
            db.prepare('run', "INSERT OR IGNORE INTO urls VALUES(?, ?, ?, ?)", [url, now, submitter, description]);
        }
    });

    res.sendStatus(200);
}
