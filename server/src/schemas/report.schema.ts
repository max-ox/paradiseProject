import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const  ReportSchema = new Schema(
    {
        name: {type: String, required: true, max: 200},
        scoreOP: {type: Number, required: true, min: 0, max: 10},
        scoreVP: {type: Number, required: true, min: 0, max: 500},
        doc: {type: String, required: true, min: 1500},
        is_spec_survive: {type: Boolean, required: true},
        number_of_survivors: {type: Number, required: true, min: 0, max: 50},
        varcor_level: {type: Number, required: true, min: 0, max: 50},
        armicode: {type: String, required: true, max: 100},
        status: {type: String, required: true, max: 100},
        is_problem: {type: Boolean, required: true},
        author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        opponent: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        mission: {type: mongoose.Schema.Types.ObjectId, ref: "Mission"}
    }
);
