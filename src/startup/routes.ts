import express, {Request, Response, NextFunction} from 'express';
import home from '../routes/home';
import auth from '../routes/auth';
import users from '../routes/users';
import skills from '../routes/skills';
import email from '../routes/email';
import notFound from '../middleware/notFound';
import cors from 'cors';
import {ignoreFavicon} from '../routes/favicon';

export default (app: any): void => {
    app.use(cors());
    app.use(ignoreFavicon);
    // app.use(express.json());
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb'}));
    app.use((req: Request, res: Response, next: NextFunction): void => {
        next();
    });
    app.use('/', home);
    app.use('/api/auth', auth);
    app.use('/api/email', email);
    app.use('/api/users', users);
    app.use('/api/skills', skills);
    app.use(notFound); // must be after all routes and middleware(s)
};
