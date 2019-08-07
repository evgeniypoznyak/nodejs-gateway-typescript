import Joi from 'joi';

export default (): void => {
    // @ts-ignore
    Joi.objectId = require('joi-objectid')(Joi);
};
