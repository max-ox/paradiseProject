var express = require('express');
var router = express.Router();
const passport = require('passport')
/* GET users listing. */

router.get('/vkontakte', passport.authenticate('vkontakte'));

router.get('/vkontakte/callback',
    passport.authenticate('vkontakte', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

module.exports = router;
