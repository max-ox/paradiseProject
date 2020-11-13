var express = require('express');
var router = express.Router();
var User = require('../db/models/user');
const isLogin = require('../auth/middleware')

router.get('/:id', isLogin(),
    function(req, res) {
        if(req.params && req.params.id) {
            User.findById(req.params.id, function (err, user) {
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

module.exports = router;
