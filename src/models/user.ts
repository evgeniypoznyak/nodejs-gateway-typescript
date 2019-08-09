import mongoose from 'mongoose';
import Joi, {} from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {UserSchema} from './UserSchema';
import 'dotenv/config';

const secret: string = process.env.JWT_SECRET || '';
const userSchema = new mongoose.Schema(new UserSchema());

userSchema.methods.generateAuthToken = function (): string {
    return jwt.sign(
        {
            id: this._id,
            isAdmin: this.isAdmin,
        },
        secret
    );
};

const User: any = mongoose.model('Users', userSchema);

const validateUser = (user: UserSchema): object => {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(), // joi-password-complexity
    };
    return Joi.validate(user, schema);
};

const hash = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export {hash};
export {User};
export {validateUser as validate};
