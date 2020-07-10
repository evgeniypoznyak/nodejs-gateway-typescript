import {Request, Response} from 'express';
import logger from './logging';
// must be after all routes and middleware(s)
export default (req: Request, res: Response): any => {
    logger.warn({
        level: 'warn',
        message: 'API route not found',
        meta: {
            url: req.url,
            method: req.method,
            headers: req.headers,
            params: req.params,
            cookies: req.cookies,
            body: req.body,
        },
    });
    return res.status(404).send('API route not found');
};
