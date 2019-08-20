import express, {Request, Response, NextFunction} from 'express';
import home from '../routes/home';
import auth from '../routes/auth';
import users from '../routes/users';
import skills from '../routes/skills';
import error from '../middleware/error';
import cors from 'cors';

export default (app: any): void => {
    app.use(cors());
    // app.use(express.json());
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb'}));
    app.use((req: Request, res: Response, next: NextFunction): void => {
        next();
    });
    app.use('/', home);
    app.use('/api/auth', auth);
    app.use('/api/users', users);
    app.use('/api/skills', skills);
    app.use(error); // must be after all routes and middleware(s)
};
