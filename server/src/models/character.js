var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CharacterSchema = new Schema(
    {
        name: {type: String, required: true, max: 30},
        params: {type: String, required: true, max: 30}
    }
);

//Export model
module.exports = mongoose.model('Character', CharacterSchema);
