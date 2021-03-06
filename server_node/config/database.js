const assert = require('assert');

assert(process.env.MONGO_USER, 'user');
assert(process.env.MONGO_PASSWORD, 'pass');
assert(process.env.MONGO_DB, 'paradiseDB');
assert(process.env.DB_HOST, 'localhost:27017');

module.exports = {
    username: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    db_name: process.env.MONGO_DB,
    host: process.env.DB_HOST,
    dialect: 'mongodb'
};
