var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RankSchema = new Schema(
    {
        name: {type: String, required: true, max: 100}
    }
);

//Export model
module.exports = mongoose.model('Rank', RankSchema);
