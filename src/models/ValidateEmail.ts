
// eslint-disable-next-line new-cap
import * as Joi from 'joi';

export const validateEmail = (body: object): Joi.ValidationResult<object> => {
    const schema = {
        name: Joi.string().min(2).max(255),
        company: Joi.string().min(1).max(255).allow(''),
        email: Joi.string().min(5).max(255).required().email(),
        message: Joi.string().min(5).max(255).required(),
    };
    return Joi.validate(body, schema);
};
