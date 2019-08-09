import mongoose from 'mongoose';
import logger from '../middleware/logging';
// import 'dotenv/config';
const url: string = process.env.MONGO_USERS || '';

export default (): void => {
    mongoose.connect(url, {useNewUrlParser: true})
        .then((): void => {
            logger.log({level: 'info', message: 'Mongo db Connected'});
        });
    mongoose.set('debug', true);
    mongoose.set('useCreateIndex', true);
};
