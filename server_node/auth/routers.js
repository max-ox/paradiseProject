var express = require('express');
var router = express.Router();
const passport = require('passport')
/* GET users listing. */

router.get('/vkontakte', passport.authenticate('vkontakte'));

router.get('/vkontakte/callback',
    passport.authenticate('vkontakte', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
        responseHTML = responseHTML.replace('%value%', JSON.stringify({
            user: req.user
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
    req.logout();
    res.status(200).send({data:'success'})
});

module.exports = router;
