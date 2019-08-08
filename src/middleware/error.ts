import {Request, Response} from 'express';

// must be after all routes and middleware(s)
export default function (err: Error, req: Request, res: Response) {
    console.log({
        level: 'error',
        message: err.message,
        meta: err,
    });
    return res.status(500).send('Something failed');
}
