var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FractionSchema = new Schema(
    {
        name: {type: String, required: true, max: 100}
    }
);

//Export model
module.exports = mongoose.model('Fraction', FractionSchema);
