function authenticationMiddleware () {
    return function (req, res, next) {
        console.log('isAuthenticated req.isAuthenticated()', req.isAuthenticated())
        if (req.isAuthenticated()) {
            return next()
        }
        res.status(500).send({err: 'non auth'})
    }
}

module.exports = authenticationMiddleware
