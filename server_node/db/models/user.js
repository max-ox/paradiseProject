var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        login: {type: String, required: true, max: 30},
        nickname: {type: String, max: 30, unique : true, required : true},
        email: {type: String, max: 100, unique : true, required : true},
        password: {type: String, max: 100},
        contactLink: {type: String, required: true},
        itsPIN: {type: String, required: true, max: 5},
        vkontakteId: {type: String, required: true, max:10},
        achievements: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Achievement"
            }
        ],
        fraction: {type: mongoose.Schema.Types.ObjectId, ref: "Fraction"},
        rank: {type: mongoose.Schema.Types.ObjectId, ref: "Rank"},
        isActive: {type: Boolean},
        isDeleted: {type: Boolean}
    }
);
//Export model
module.exports = mongoose.model('User', UserSchema);
//
// id: 13187042,
//     username: 'o.korost',
//     displayName: 'Oksana Korost',
//     name: { familyName: 'Korost', givenName: 'Oksana' },
// gender: 'female',
//     profileUrl: 'http://vk.com/o.korost',
//     photos: [
//     {
//         value: 'https://sun2-3.userapi.com/impf/c622420/v622420042/400cf/9sqSDrharMs.jpg?size=200x0&quality=88&crop=257,453,1108,1108&sign=0ca110605c3fdcdff88b339bd96e2c22&c_uniq_tag=x-0fTYtCcYui6tu3S6k8HwshwwKaa2-NvZcRVpZRH6k&ava=1',
//         type: 'photo_200'
//     }
// ],
//     provider: 'vkontakte',
