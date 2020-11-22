const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
var config = require('../config');
var User = require('../db/models/user');

const VKontakteStrategy = require('passport-vkontakte').Strategy;

const authenticationMiddleware = require('./middleware')

// Generate Password
const saltRounds = 10
const myPlaintextPassword = 'my-password'
const salt = bcrypt.genSaltSync(saltRounds)
const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt)

function findUser (id, callback) {
    User.findById(id, function (err, user) {
        console.log('findById user', user)
        callback(err, user);
    });
}

passport.serializeUser(function (user, cb) {
    console.log('serializeUser user', user)
    cb(null, user._id)
})

passport.deserializeUser(function (id, cb) {
    console.log('deserializeUser id', id)
    findUser(id, cb)
})


function initPassport () {
    passport.use(new VKontakteStrategy(
        {
            clientID:     config.VK_APP_ID,
            clientSecret: config.VK_APP_SECRET,
            callbackURL:  config.VK_callbackURL,
            scope: ['email'] ,
            profileFields: ['email']
        },
        function myVerifyCallbackFn(accessToken, refreshToken, params, profile, done) {
            console.log('myVerifyCallbackFn profile', profile)
            User.findOne({
                'email':  profile.emails[0].value
            }, function(err, user) {
                console.log('err, user', err, user);
                if (err) {
                    return done(err);
                }
                //No user was found... so create a new user with values from Facebook (all the profile. stuff)
                if (!user) {
                    user = new User({
                        login: profile.displayName,
                        nickname: profile.username,
                        email: profile.emails[0].value,
                        contactLink: profile.profileUrl,
                        vkontakteId: profile.id,
                        isActive: false
                    });
                    user.save(function(err) {
                        if (err) console.log('user.save err ', err);
                        return done(err, user);
                    });
                } else {
                    console.log('found user user', user)
                    //found user. Return
                    return done(err, user);
                }
            });
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
    passport.findUser = findUser
}

module.exports = initPassport
