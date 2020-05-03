#!/usr/bin/env node

/**
 * Module dependencies.
 */

const debug = require('debug')('paradiseProject:server');
const http = require('http');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID

const config = require('../src/config');
const makeApp = require('../src/app');
var db = require('../src/db');
var connection_str = config.database.dialect+'://' + config.database.host + '/' + config.database.db_name;

const app = makeApp();

app.set('port', config.port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof config.port === 'string'
        ? `Pipe ${config.port}`
        : `Port ${config.port}`;

    // Handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            throw new Error(`${bind} requires elevated privileges`);
        case 'EADDRINUSE':
            throw new Error(`${bind} is already in use`);
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();

    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;

    debug(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */
console.log(connection_str)
db.connect(connection_str, function (err) {
    if (err) {
        return console.log(err);
    }
    server.listen(config.port);
    server.on('error', onError);
    server.on('listening', onListening);
})

// server.listen(config.port);
// server.on('error', onError);
// server.on('listening', onListening);
