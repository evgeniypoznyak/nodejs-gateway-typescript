import {AdapterInterface} from './AdapterInterface';
import config from 'config';
import mongoose from 'mongoose';
import logger from '../../middleware/logging';

export class MongoDbAdapter implements AdapterInterface {
    public url: string = process.env.MONGO_USERS || config.get('MONGO_USERS');

    connect() {
        mongoose.connect(this.url, {useNewUrlParser: true})
            .then((): void => {
                logger.log({level: 'info', message: 'Mongo db Connected'});
            });
        mongoose.set('debug', true);
        mongoose.set('useCreateIndex', true);
    }
}
