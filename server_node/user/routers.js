var express = require('express');
var router = express.Router();
var User = require('../db/models/user');
const isLogin = require('../auth/middleware')

router.get('/:nickname', isLogin(),
    function(req, res) {

        if(req.params && (req.params.nickname || req.params._id)) {
            User.findOne(req.params).
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
