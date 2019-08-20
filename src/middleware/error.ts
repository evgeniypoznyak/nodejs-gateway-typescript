import {Request, Response} from 'express';
import logger from './logging';
// must be after all routes and middleware(s)
export default (req: Request, res: Response): any => {
    logger.warn({
        level: 'warn',
        message: 'Error middleware: Something failed',
        meta: {
            headers: JSON.stringify(req.headers),
            body: JSON.stringify(req.body),
            params: JSON.stringify(req.params),
            cookies: JSON.stringify(req.cookies),
        },
    });
    return res.status(500).send('Error middleware: Something failed');
};
