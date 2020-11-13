var User = require('../db/models/user');
const isLogin = require('../auth/middleware')

function initUser (app) {
    app.get('/user/:id', isLogin(), function (req, res) {

    })
}

module.exports = initUser
