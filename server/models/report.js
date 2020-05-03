var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        name: {type: String, required: true, max: 200},
        scoreOP: {type: Number, required: true, min: 0, max: 10},
        scoreVP: {type: Number, required: true, min: 0, max: 500},
        doc: {type: String, required: true, min: 1500},
        is_spec_survive: {type: Boolean, required: true},
    }
);


// Виртуальное свойство - URL автора
// UserSchema
//     .virtual('url')
//     .get(function () {
//         return '/catalog/author/' + this._id;
//     });

//Export model
module.exports = mongoose.model('User', UserSchema);
