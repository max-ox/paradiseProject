const express = require('express');

// const authRouter = require('./auth');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
// module.exports = authRouter;
