const express = require('express');
const router = express.Router();
const https = require('https');
const axios = require('axios');
const config = require('config');
const auth = require('../middleware/auth');
const logger = require('../middleware/logging');

const api = process.env.API_SKILLS || config.get('API_SKILLS');

router.get('/', async (req, res) => {
    const headers = req.headers;
    logger.log({level: 'info', message: "Processing request: ", meta: headers});
    const agent = new https.Agent({rejectUnauthorized: false});
    const result = await axios.get(api, {httpsAgent: agent});
    if (result && result.data && result.data.skills) {
        logger.log({
            level: 'info',
            message: `WOW: Getting results from microservice:`,
            meta: JSON.stringify(result.data)
        });
        return res.send(result.data);
    }
    logger.error({
        level: 'error',
        message: `something went wrong...`,
    });
    res.statusMessage = "Else: Content not found";
    res.status(401);
    res.send("Else: Content not found");
});

router.post('/', auth, async (req, res) => {
    const agent = new https.Agent({rejectUnauthorized: false});
    const result = await axios.get(api, {httpsAgent: agent});
    return res.send(result.data);
});

module.exports = router;
