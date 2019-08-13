import {Request, Response} from 'express';
import logger from './logging';
// must be after all routes and middleware(s)
export default (req: Request, res: Response): any => {
    logger.warn({
        level: 'warn',
        message: 'Something failed',
        meta: {
            headers: req.headers,
            body: req.body,
            params: req.params,
            cookies: req.cookies,
        },
    });
    return res.status(500).send('Something failed');
};
