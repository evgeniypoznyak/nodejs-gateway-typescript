import 'express-async-errors';
import express, {Express} from 'express';
import routes from './startup/routes';
import db from './startup/db';
import config from './startup/config';

const app: Express = express();
routes(app);
db();
config();

process.on('unhandledRejection', (ex: any): any => {
    console.log('unhandledRejection: ');
    throw ex;
});
process.on('uncaughtException', (err: any): any => {
    console.log('Caught exception: ');
});

const port: number | string = process.env.PORT || 2222;
const host: string = process.env.HOST || 'http://localhost';
app.listen(port, (): void => console.log(`Listening: ${host}:${port}`));
