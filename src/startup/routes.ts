import express, {Request, Response, NextFunction} from 'express';
import home from '../routes/home';
import auth from '../routes/auth';
import users from '../routes/users';
import skills from '../routes/skills';
import error from '../middleware/error';

export default (app: any): void => {
    app.use(express.json());
    app.use((req: Request, res: Response, next: NextFunction): void => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.use('/', home);
    app.use('/api/auth', auth);
    app.use('/api/users', users);
    app.use('/api/skills', skills);
    app.use(error); // must be after all routes and middleware(s)
};
