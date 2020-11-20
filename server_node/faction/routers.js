var express = require('express');
var router = express.Router();
var Faction = require('../db/models/faction');

router.get('/',
function(req, res) {
    Faction.find({}, function (err, factions) {
        if(err) {
            res.status(500).send({data:err});
        } else {
            res.status(200).send({factions});
        }
    });
});

router.get('/save',
    function(req, res) {
        let faction = new Faction({
            name:" faction3"
        })
        faction.save(function(err) {

            if (err) console.log('faction.save err ', err);
            res.status(200).send({faction});
        });
    });

module.exports = router;
