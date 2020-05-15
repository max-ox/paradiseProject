import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const  UserSchema = new Schema(
    {
        login: {type: String, max: 30},
        nickname: {type: String, max: 30},
        email: {type: String, max: 100, unique : true, required : true},
        password: {type: String, max: 100},
        link_for_connect: {type: String},
        its_pin: {type: String, max: 5},
        achievements: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Achievement"
            }
        ],
        faction: {type: mongoose.Schema.Types.ObjectId, ref: "Faction"},
        rank: {type: mongoose.Schema.Types.ObjectId, ref: "Rank"}
    }
);
