var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')
var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        login: {type: String, required: true, max: 30},
        username: {type: String, required: true, max: 30},
        email: {type: String, required: true, max: 100},
        password: {type: String, required: true, max: 100},
        link_for_connect: {type: String, required: true},
        its_pin: {type: String, required: true, max: 5},
        vkontakteId: {type: String, required: true, max:10},
        achievements: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Achievement"
            }
        ],
        fraction: {type: mongoose.Schema.Types.ObjectId, ref: "Fraction"},
        rank: {type: mongoose.Schema.Types.ObjectId, ref: "Rank"},
        is_active: {type: Boolean},
        is_deleted: {type: Boolean}
    }
);
UserSchema.plugin(findOrCreate);
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
