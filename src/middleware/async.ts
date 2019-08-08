import {Express, NextFunction, Request, Response} from 'express';
import {ServerResponse} from 'http';

export default (handler: Express): any => {
    return async (req: Request, res: ServerResponse | Response, next: NextFunction): Promise<any> => {
        try {
            await handler(req, res);
        } catch (e) {
            next(e);
        }
    };
};
