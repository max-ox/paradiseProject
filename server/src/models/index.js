const { database } = require('../config');
const db = {};
var MongoClient = require('mongodb').MongoClient;

var state = {
    db: null
};

exports.connect = function (url, done) {
    if (state.db) {
        return done();
    }

    MongoClient.connect(url, function (err, db) {
        if (err) {
            return done(err);
        }
        state.db = db;
        done();
    })
}

db.connect('mongodb://localhost:27017/api')

exports.get = function () {
    return state.db;
}
