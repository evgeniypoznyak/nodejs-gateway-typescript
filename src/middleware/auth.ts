import config from 'config';
import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
const secret: string = process.env.JWT_PRIVATE_KEY || config.get('JWT_PRIVATE_KEY');

export default (req: Request, res: Response, next: NextFunction): any => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided');
    try {
        // @ts-ignore
        req.user = jwt.verify(token, secret);
        next();
    } catch (e) {
        return res.status(400).send('Invalid token');
    }
};
