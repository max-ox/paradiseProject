var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        login: {type: String, required: true, max: 30},
        nickname: {type: String, max: 30, unique : true, required : true},
        email: {type: String, max: 100, unique : true, required : true},
        password: {type: String, max: 100},
        contactLink: {type: String, required: true},
        itsPIN: {type: String, max: 5},
        vkontakteId: {type: String, required: true, max:10},
        achievements: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Achievement"
            }
        ],
        faction: {type: mongoose.Schema.Types.ObjectId, ref: "Faction"},
        rank: {type: mongoose.Schema.Types.ObjectId, ref: "Rank"},
        isActive: {type: Boolean},
        isDeleted: {type: Boolean},
        role: {type: String, required: true, default: 'user'}
    }
);

//Export model
module.exports = mongoose.model('User', UserSchema);
