const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');

function makeApp({ rootRouter }) {
    const app = express();

    app.use(bodyParser.urlencoded({extended: false}));
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept, Authorization');
        next();
    });

    const url = 'mongodb://localhost/blogDb'; //todo: move to config

    app.get('/api/user/login', (req, res) => {
        res.send('Hello World!')
    })

    app.post('/api/user/login', (req, res) => {
        mongoose.connect(url, function(err){
            if(err) throw err;
            console.log('connected successfully, username is ',req.body.username,' password is ',req.body.password);
        });
    })

    // Catch 404 and forward to error handler
    app.use((req, res) => {
        res.sendStatus(HttpStatus.NOT_FOUND);
    });

    // Error handler
    // eslint-disable-next-line no-unused-vars
    app.use((error, req, res, next) => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: 'Unexpected structure error', debug: error.message });
    });

    app.listen(env.process.PORT, () => console.log('blog server running on port 3000!'))

}

module.exports = makeApp;

