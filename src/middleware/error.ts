import {Request, Response} from 'express';
import logger from './logging';
export default (req: Request, res: Response): any => {
    logger.warn({
        level: 'warn',
        message: 'Error middleware: Something failed',
        meta: {
            url: req.url,
            headers: JSON.stringify(req.headers),
            // body: JSON.stringify(req.body),
            params: JSON.stringify(req.params),
            cookies: JSON.stringify(req.cookies),
        },
    });
    return res.status(500).send('Error middleware: Something failed');
};
