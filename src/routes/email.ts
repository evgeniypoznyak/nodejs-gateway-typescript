import express, {Request, Response} from 'express';
import nodemailer from 'nodemailer';
// @ts-ignore
import config from 'config';
import logger from '../middleware/logging';
import {validateEmail} from '../models/ValidateEmail';
import {EmailResult} from '../interfaces/EmailResult';

const gmailUser: string = process.env.GMAIL_USERNAME || config.get('GMAIL_USERNAME');
const gmailPassword: string = process.env.GMAIL_PASSWORD || config.get('GMAIL_PASSWORD');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: gmailUser,
        pass: gmailPassword,
    }});

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
        let company = '';
        if (req.body.company && req.body.company.length > 1) {
            company = `<p>Company: ${req.body.company}</p>`;
        }
        result = await transporter.sendMail({
            to: 'evgeniy.poznyak@gmail.com',
            from: req.body.email,
            subject: 'Email from evgeniy.poznyaks.com',
            html: `
                    <p>${req.body.message}</p>
                    <p>${req.body.name}</p>
                    ${company}
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
