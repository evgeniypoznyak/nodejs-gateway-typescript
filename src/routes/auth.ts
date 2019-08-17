import _ from 'lodash';
import express, {Request, Response, Router} from 'express';
// eslint-disable-next-line new-cap
const router: Router = express.Router();
import {User} from '../models/user';
import * as Joi from 'joi';
import bcrypt from 'bcrypt';
import logger from '../middleware/logging';
import auth from '../middleware/auth';

const validate = (body: object): Joi.ValidationResult<object> => {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(), // joi-password-complexity
    };
    return Joi.validate(body, schema);
};
router.post('/', async (req: Request, res: Response): Promise<any> => {
    const {error} = validate(req.body);
    if (error) {
        // @ts-ignore
        const errorMessage = error.details.slice().shift().message;
        logger.warn({requestBody: req.body, requestHeaders: req.headers, errorMessage});
        return res.status(400).send(errorMessage);
    }

    const user = await User.findOne({email: req.body.email});
    if (!user) {
        const errorMessage = 'Invalid email or password!';
        logger.warn({requestBody: req.body, requestHeaders: req.headers, errorMessage});
        return res.status(400).send(errorMessage);
    }

    // @ts-ignore
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        const errorMessage = 'Invalid email or password!';
        logger.warn({requestBody: req.body, requestHeaders: req.headers, errorMessage});
        return res.status(400).send(errorMessage);
    }

    // @ts-ignore
    const token = user.generateAuthToken();
    const payload = {
        user: _.pick(user, ['_id', 'name', 'email']),
        token,
    };
    return res.header('x-auth-token', token).send(payload);
});

router.post('/verify', auth, async (req, res): Promise<any> => {
    res.send('OK');
});

export default router;
