import _ from 'lodash';
import express, {Request, Response, Router} from 'express';
// eslint-disable-next-line new-cap
const router: Router = express.Router();
import {User} from '../models/user';
import Joi, {} from 'joi';
import bcrypt from 'bcrypt';

const validate = async (req: Request): Promise<any> => {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(), // joi-password-complexity
    };
    return Joi.validate(req, schema);
};

router.post('/', async (req: Request, res: Response): Promise<any> => {
    // @ts-ignore
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details.slice().shift().message);

    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid email or password!');

    // @ts-ignore
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    // @ts-ignore
    const token = user.generateAuthToken();
    return res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

export default router;
