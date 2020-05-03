var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EpisodeSchema = new Schema(
    {
        name: {type: String, required: true, max: 100},
        start_date: {type: Date, required: true},
        end_date: {type: Date, required: true},
    }
);

//Export model
module.exports = mongoose.model('Episode', EpisodeSchema);
