import { Document } from 'mongoose';

export interface User extends Document {
    readonly _id: string;
    readonly login: string;
    readonly nickname: string;
    readonly email: string;
    readonly password: string;
    readonly link_for_connect: string
    readonly its_pin: string
}
