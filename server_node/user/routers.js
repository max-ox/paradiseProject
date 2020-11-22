var express = require('express');
var router = express.Router();
var User = require('../db/models/user');
const isLogin = require('../auth/middleware')

router.get('/:nickname', isLogin(),
    function(req, res) {
        if(req.params && req.params.nickname) {
            User.findOne({ nickname: req.params.nickname}).
                populate('faction').
                exec(function (err, user) {
                    console.log('user', user);
                    if(err) {
                        res.status(500).send({data:err});
                    } else {
                        res.status(200).send({user});
                    }
                })
        } else {
            res.status(500).send({data:'some server error'});
        }
});

router.put('/', isLogin(),
    function (req, res) {
    if(req.body && req.body.user) {
        console.log('req.body.user', req.body.user);
        const faction_id = req.body.user.faction ? req.body.user.faction._id : '';
        req.body.user.faction = faction_id;
        User.findOneAndUpdate({_id: req.body.user._id}, req.body.user, {upsert: true}, function(err, doc) {
            if (err) return res.send(500, {error: err});
            return res.send('Succesfully saved.');
        });
    }

    })

module.exports = router;
