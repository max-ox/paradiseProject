var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        login: {type: String, required: true, max: 30},
        nickname: {type: String, required: true, max: 30},
        email: {type: String, required: true, max: 100},
        password: {type: String, required: true, max: 100},
        link_for_connect: {type: String, required: true},
        its_pin: {type: String, required: true, max: 5},
        achievements: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Achievement"
            }
        ],
        fraction: {type: mongoose.Schema.Types.ObjectId, ref: "Fraction"},
        rank: {type: mongoose.Schema.Types.ObjectId, ref: "Rank"}
    }
);

//Export model
module.exports = mongoose.model('User', UserSchema);
