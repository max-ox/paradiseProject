var createError = require('http-errors');
var express = require('express');
var expressSession = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');

var config = require('./config');

var connection_str = config.database.dialect+'://' + config.database.host + '/' + config.database.db_name;

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({secret:'keyboard cat', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

//todo: move to other file
const VKontakteStrategy = require('passport-vkontakte').Strategy;

// User session support middlewares. Your exact suite might vary depending on your app's needs.

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

// User session support for our hypothetical `user` objects.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log('deserializeUser ', id);
  // User.findById(id)
  //     .then(function (user) { done(null, user); })
  //     .catch(done);
});

//This function will pass callback, scope and request new token
app.get('/auth/vkontakte', passport.authenticate('vkontakte'));

app.get('/auth/vkontakte/callback',
    passport.authenticate('vkontakte', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

app.get('/', function(req, res) {
    //Here you have an access to req.user
    res.json(req.user);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
console.log('connection_str', connection_str)
//Устанавливаем соединение с mongoose
var mongoose = require('mongoose');
mongoose.connect(connection_str, {useNewUrlParser: true,  useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
