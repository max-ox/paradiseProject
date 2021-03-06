const passport = require('passport')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
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

passport.serializeUser(function (res, cb) {
    console.log('serializeUser user', res)
    const token = jwt.sign({ _id: res.user._id, accessToken: res.accessToken }, config.nodeAuthSecret);
    cb(null, token)
})

passport.deserializeUser(function (token, cb) {

    const decoded = jwt.verify(token, config.nodeAuthSecret);
    console.log('deserializeUser decoded', decoded)
    findUser(decoded._id, cb)
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
            console.log('myVerifyCallbackFn accessToken', accessToken)
            console.log('myVerifyCallbackFn profile', profile)
            // todo: when add email\password registration add search by email;
            User.findOne({
                vkontakteId: profile.id
            }, async function(err, user) {
                console.log('err, user', err, user);
                if (err) {
                    return done(err);
                }
                //No user was found... so create a new user with values from Facebook (all the profile. stuff)
                if (!user) {
                    const isUserExit = await User.exists({ nickname: profile.username });
                    user = new User({
                        login: profile.displayName,
                        nickname: isUserExit ? profile.id : profile.username,
                        email: profile.emails[0].value,
                        avatar: profile.photos[0].value,
                        contactLink: profile.profileUrl,
                        vkontakteId: profile.id,
                        isActive: false
                    });
                    // let adminEmails = ['maximovaoxana@gmail.com', 'santyago.kor@gmail.com'];
                    const isAdmin = config.adminEmails.indexOf(profile.emails[0].value) ;
                    if(isAdmin != -1) {
                        user.role = 'admin'
                    }
                    user.save(function(err) {
                        if (err) console.log('user.save err ', err);
                        return done(err, {user, accessToken});
                    });
                } else {
                    console.log('found user user', user)
                    //found user. Return
                    return done(err, {user, accessToken});
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
