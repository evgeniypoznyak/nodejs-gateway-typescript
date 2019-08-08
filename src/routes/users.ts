import _ from 'lodash';
import {User, validate, hash} from '../models/user';
import express, {Request, Response, Router} from 'express';
// eslint-disable-next-line new-cap
const router: Router = express.Router();
import auth from '../middleware/auth';

router.get('/me', auth, async (req: Request, res: Response): Promise<any> => {
    // @ts-ignore
    const user = await User.findById(req.user.id)
        .select({password: false})
        // .select('-password')
    ;
    res.send(user);
});

router.post('/', async (req, res): Promise<any> => {
    // @ts-ignore
    const {error} = validate(req.body);
    // @ts-ignore
    if (error) return res.status(400).send(error.details.slice().shift().message);
    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already registered');
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    // @ts-ignore
    user.password = await hash(req.body.password);
    await user.save();
    // @ts-ignore
    const token = user.generateAuthToken();
    return res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

export default router;
