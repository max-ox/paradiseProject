function authenticationMiddleware () {
    return function (req, res, next) {
        console.log('req.isAuthenticated()', req.isAuthenticated())
        if (req.isAuthenticated()) {
            return next()
        }
        res.status(401).send({err: 'non auth'})
    }
}

module.exports = authenticationMiddleware
