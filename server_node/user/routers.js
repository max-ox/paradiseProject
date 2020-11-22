var express = require('express');
var router = express.Router();
var User = require('../db/models/user');
const isLogin = require('../auth/middleware')

router.get('/:nickname', isLogin(),
    function(req, res) {
        if(req.params && req.params.nickname) {
            User.findOne({ nickname: req.params.nickname}, function (err, user) {
                if(err) {
                    res.status(500).send({data:err});
                } else {
                    res.status(200).send({user});
                }
            });
        } else {
            res.status(500).send({data:'some server error'});
        }
});

router.put('/', isLogin(),
    function (req, res) {
        console.log('req.body', req.body);
    if(req.body && req.body.data) {
        User.findOneAndUpdate({_id: req.body.data._id}, req.body.data, {upsert: true}, function(err, doc) {
            if (err) return res.send(500, {error: err});
            return res.send('Succesfully saved.');
        });
        // let updatingUser = new User(req.body.data);
        // console.log('updatingUser', updatingUser)
        // updatingUser.save();
        // User.findOne({ nickname: req.body.user.nickname}, function (err, user) {
        //     if(err) {
        //         res.status(500).send({data:err});
        //     } else {
        //         res.status(200).send({user});
        //     }
        // });
    }

    })

module.exports = router;
