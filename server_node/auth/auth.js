const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
var config = require('../config');

const VKontakteStrategy = require('passport-vkontakte').Strategy;

const authenticationMiddleware = require('./middleware')

// Generate Password
const saltRounds = 10
const myPlaintextPassword = 'my-password'
const salt = bcrypt.genSaltSync(saltRounds)
const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt)

const user = {
    username: 'test-user',
    passwordHash,
    id: 1
}

function findUser (username, callback) {
    if (username === user.username) {
        return callback(null, user)
    }
    return callback(null)
}

passport.serializeUser(function (user, cb) {
    cb(null, user.username)
})

passport.deserializeUser(function (username, cb) {
    findUser(username, cb)
})

function initPassport () {

    passport.use(new VKontakteStrategy(
        {
            clientID:     config.VK_APP_ID,
            clientSecret: config.VK_APP_SECRET,
            callbackURL:  config.VK_callbackURL
        },
        function myVerifyCallbackFn(accessToken, refreshToken, params, profile, done) {
            console.log('myVerifyCallbackFn profile', profile)
            // Now that we have user's `profile` as seen by VK, we can
            // use it to find corresponding database records on our side.
            // Also we have user's `params` that contains email address (if set in
            // scope), token lifetime, etc.
            // Here, we have a hypothetical `User` class which does what it says.
            // User.findOrCreate({ vkontakteId: profile.id })
            //     .then(function (user) { done(null, user); })
            //     .catch(done);
        }
    ));

    passport.use(new LocalStrategy(
        (username, password, done) => {
            findUser(username, (err, user) => {
                if (err) {
                    return done(err)
                }

                // User not found
                if (!user) {
                    console.log('User not found')
                    return done(null, false)
                }

                // Always use hashed passwords and fixed time comparison
                bcrypt.compare(password, user.passwordHash, (err, isValid) => {
                    if (err) {
                        return done(err)
                    }
                    if (!isValid) {
                        return done(null, false)
                    }
                    return done(null, user)
                })
            })
        }
    ))

    passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport