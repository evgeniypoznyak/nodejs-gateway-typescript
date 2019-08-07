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
            message: 'WOW: Getting results from microservice:',
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
    const agent = new https.Agent({rejectUnauthorized: false});
    const result = await axios.get(api, {httpsAgent: agent});
    return res.send(result.data);
});

export default router;
