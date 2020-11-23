var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FactionSchema = new Schema(
    {
        name: {type: String, required: true, max: 100}
    }
);

//Export model
module.exports = mongoose.model('Faction', FactionSchema);
