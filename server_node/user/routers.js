var express = require('express');
var router = express.Router();
var User = require('../db/models/user');
const isLogin = require('../auth/middleware')
var config = require('../config');
var jwt = require('jsonwebtoken');


router.get('/isLogin', isLogin());

router.get('/:nickname',
    function(req, res) {
        if(req.params && req.params.nickname) {
            User.findOne(req.params).
                populate('faction').
                exec(function (err, user) {
                    console.log('get profile user', user);
                    if(err) {
                        res.status(500).send({data:err});
                    } else {
                        let currentUserId = '';
                        let isCurrent;
                        console.log('req.session.passport', req.session);
                        if(req.session && req.session.passport && req.session.passport.user) {
                            const decoded = jwt.verify(req.session.passport.user, config.nodeAuthSecret);
                            currentUserId = decoded._id;
                        }
                        // console.log('currentUserId', currentUserId);
                        // console.log('currentUserId', user._id);
                        if(currentUserId && user && currentUserId == user._id) {
                            isCurrent = true;
                        } else {
                            isCurrent = false;
                        }
                        res.status(200).send({user, isCurrent});
                    }
                })
        } else {
            res.status(500).send({data:'some server error'});
        }
});

async function isExist(query) {
    return User.exists(query)
}

router.put('/', isLogin(),
    async function (req, res) {
    if(req.body && req.body.user) {
        const isNicknameInvalid = await isExist({nickname: req.body.user.nickname, _id: { $ne: req.body.user._id }});
        const isItsPINInvalid = await isExist({itsPIN: req.body.user.itsPIN, _id: { $ne: req.body.user._id }});
        if(isNicknameInvalid || isItsPINInvalid ){
            res.send(409, {isNicknameInvalid, isItsPINInvalid});
        } else {
            const faction_id = req.body.user.faction ? req.body.user.faction._id : '';
            req.body.user.faction = faction_id;
            User.findOneAndUpdate({_id: req.body.user._id}, req.body.user, {upsert: true})
                .populate('faction')
                .exec(function(err, doc) {
                    if (err) return res.send(500, {error: err});
                    return res.send(200, {user: doc});
                });
        }

    }

    })

module.exports = router;
