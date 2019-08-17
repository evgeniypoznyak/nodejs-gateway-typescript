import express, {Request, Response} from 'express';
import https from 'https';
import axios from 'axios';
import config from 'config';
import auth from '../middleware/auth';
import logger from '../middleware/logging';
// eslint-disable-next-line new-cap
const router = express.Router();
const api: string = process.env.API_SKILLS || config.get('API_SKILLS');

router.get('/', async (req: Request, res: Response): Promise<any> => {
    const headers = req.headers;
    logger.log({level: 'info', message: 'Processing request: ', meta: headers});
    const agent = new https.Agent({rejectUnauthorized: false});
    const result = await axios.get(api, {httpsAgent: agent});
    if (result && result.data && result.data.skills) {
        logger.log({
            level: 'info',
            message: 'Getting results from microservice: ',
            meta: JSON.stringify(result.data),
        });
        return res.send(result.data);
    }
    logger.error({
        level: 'error',
        message: 'something went wrong...',
    });
    res.statusMessage = 'Else: Content not found';
    res.status(401);
    res.send('Else: Content not found');
});

router.post('/', auth, async (req, res): Promise<any> => {
    logger.log({
        level: 'info',
        message: 'Processing post request...',
    });
    const agent = new https.Agent({rejectUnauthorized: false});
    const result = await axios.post(api, req.body, {httpsAgent: agent});
    logger.log({
        level: 'info',
        message: 'Data for post request was successfully saved: ',
        meta: JSON.stringify(result.data),
    });
    return res.send(result.data);
});

router.patch('/', auth, async (req, res): Promise<any> => {
    logger.log({level: 'info', message: 'testing', meta: JSON.stringify(req.headers)});
    // return res.send(req.body);
    const agent = new https.Agent({rejectUnauthorized: false});
    logger.log({
        level: 'info',
        message: 'Processing patch request...',
        meta: {
            requestHeaders: req.headers,
            requestBody: req.body,
        },
    });
    const result = await axios.patch(api, req.body.skill, {httpsAgent: agent});
    logger.log({
        level: 'info',
        message: 'Data for patch request was successfully updated: ',
        meta: JSON.stringify(result.data),
    });
    return res.send(result.data);
});

router.delete('/:id', auth, async (req, res): Promise<any> => {
    const agent = new https.Agent({rejectUnauthorized: false});
    logger.log({
        level: 'info',
        message: 'Processing delete request...',
    });
    try {
        const result = await axios.delete(api + req.params.id, {httpsAgent: agent});
        logger.log({
            level: 'info',
            message: 'Data for delete request was successfully processed: ',
            meta: JSON.stringify(result.data),
        });
        return res.sendStatus(result.data);
    } catch (e) {
        logger.warn({
            level: 'warn',
            message: `Bad Request for skill id: ${req.params.id}`,
            meta: JSON.stringify(e.message),
        });
    }
    return res.sendStatus(400);
});

export default router;
