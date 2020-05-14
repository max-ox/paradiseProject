import { Document } from 'mongoose';

export interface Faction extends Document {
    readonly _id: string;
    readonly name: string;
}
