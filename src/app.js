process.env.NODE_CONFIG_DIR = '../config';
import 'express-async-errors';
import express from 'express';
const app = express();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

process.on('unhandledRejection', (ex) => {
    throw ex;
});

const port = process.env.PORT || 2222;
const host = process.env.HOST || 'http://localhost';
app.listen(port, () => console.log(`Listening: ${host}:${port}`));
