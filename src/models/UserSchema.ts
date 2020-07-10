import {Schema, SchemaDefinition, SchemaType, SchemaTypeOpts} from 'mongoose';

export interface Name {
    type: StringConstructor;
    minlength: number;
    maxlength: number;
    required: boolean;
}

export interface Email {
    type: StringConstructor;
    required: boolean;
    minlength: number;
    maxlength: number;
    unique: boolean;
}

export class UserSchema implements SchemaDefinition {
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
