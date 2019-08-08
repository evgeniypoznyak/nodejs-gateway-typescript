import mongoose, {Schema, SchemaDefinition, SchemaType, SchemaTypeOpts} from 'mongoose';
import Joi, {} from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

const secret: string = process.env.JWT_PRIVATE_KEY || config.get('JWT_PRIVATE_KEY');

interface Name {
    type: StringConstructor;
    minlength: number;
    maxlength: number;
    required: boolean;
}

interface Email {
    type: StringConstructor;
    required: boolean;
    minlength: number;
    maxlength: number;
    unique: boolean;
}

class UserSchema implements SchemaDefinition {
    public name: Name = {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
    };
    public email: Email = {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    };
    public password = {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
        unique: true,
    };
    public isAdmin: BooleanConstructor = Boolean;

    [path: string]: SchemaTypeOpts<any> | Schema | SchemaType;
}


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
