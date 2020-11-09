var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MissionSchema = new Schema(
    {
        name: {type: String, required: true, max: 100},
        link_on_doc: {type: String, required: true},
        episode_id: {type: Schema.ObjectId, ref: 'Episode', required: true},
    }
);

//Export model
module.exports = mongoose.model('Mission', MissionSchema);
