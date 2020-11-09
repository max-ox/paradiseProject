
const mongoose = require('mongoose');
const _ = require('lodash');
const clients = {};
let connectionTimeout;

function throwTimeoutError() {
    connectionTimeout = setTimeout(() => {
        throw new Error(); //DatabaseError
    }, 16000); // (reconnectTries * reconnectInterval) + buffer
}
function instanceEventListeners({ conn }) {
    conn.on('connected', () => {
        console.log('Database - Connection status: connected');
        clearTimeout(connectionTimeout);
    });
    conn.on('disconnected', () => {
        console.log('Database - Connection status: disconnected');
        throwTimeoutError();
    });
    conn.on('reconnected', () => {
        console.log('Database - Connection status: reconnected');
        clearTimeout(connectionTimeout);
    });
    conn.on('close', () => {
        console.log('Database - Connection status: close ');
        clearTimeout(connectionTimeout);
    });
}
module.exports.init = (DATABASE_HOST) => {
    const mongoInstance = mongoose.createConnection(DATABASE_HOST, {
        useNewUrlParser: true,
        keepAlive: true,
        autoReconnect: true,
        reconnectTries: 3,
        reconnectInterval: 5000,
    });
    clients.mongoInstance = mongoInstance;
    instanceEventListeners({ conn: mongoInstance });
};

module.exports.closeConnections = () => _.forOwn(clients, (conn) => conn.close());
module.exports.getClients = () => clients;
