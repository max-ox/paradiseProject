import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const  FactionSchema = new Schema(
    {
        name: {type: String, required: true, max: 100}
    }
);
