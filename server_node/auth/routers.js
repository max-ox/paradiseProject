var express = require('express');
var router = express.Router();
const passport = require('passport')
var User = require('../db/models/user')
/* GET users listing. */

router.get('/vkontakte', passport.authenticate('vkontakte'));

router.get('/vkontakte/callback',
    passport.authenticate('vkontakte', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
        responseHTML = responseHTML.replace('%value%', JSON.stringify({
            nickname: req.user.user.nickname,
            role: req.user.user.role,
            sessionID: req.sessionID
        }));
        res.status(200).send(responseHTML);
    }
);

router.get('/login', function(req, res) {
    //Here you have an access to req.user
    res.send({data:'error'});
});

router.get('/logout', function (req, res) {
    console.log('logout')
    if (req.session.user) {
        delete req.session.user;
    }
    req.logout();
    res.status(200).send({data:'success'})
});

module.exports = router;
