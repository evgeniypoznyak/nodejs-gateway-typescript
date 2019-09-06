import express, {Request, Response} from 'express';
import nodemailer from 'nodemailer';
// @ts-ignore
import sendGridTransport from 'nodemailer-sendgrid-transport';
import config from 'config';
import logger from '../middleware/logging';
import {validateEmail} from '../models/ValidateEmail';
import {EmailResult} from '../interfaces/EmailResult';

const apiKey: string = process.env.API_KEY_EMAIL || config.get('API_KEY_EMAIL');

const transporter = nodemailer.createTransport(sendGridTransport(
    {
        auth: {
            'api_key': apiKey,
        },
    }
));

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', async (req: Request, res: Response): Promise<any> => {
    let result: EmailResult = {
        status: 'FAILURE',
        message: '',
    };
    const {error} = validateEmail(req.body);
    if (error) {
        // @ts-ignore
        const errorMessage = error.details.slice().shift().message;
        logger.warn({requestBody: req.body, requestHeaders: req.headers, errorMessage});
        result.message = errorMessage;
        return res.status(400).send(result);
    }

    try {
        result = await transporter.sendMail({
            to: 'evgeniy.poznyak@gmail.com',
            from: req.body.email,
            subject: 'Email from evgeniy.poznyaks.com',
            html: `

<p>${req.body.message},</p>
<p>${req.body.name}</p>
<p>${req.body.company}</p>
<p>${req.body.email}</p>
`,
        });
        result.status = 'OK';
    } catch (e) {
        result.message = e.message;
    }
    return res.send(result);
});

export default router;
