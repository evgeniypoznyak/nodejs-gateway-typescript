import Joi from 'joi';

export default (): any => {
    // @ts-ignore
    Joi.objectId = require('joi-objectid')(Joi);
};
