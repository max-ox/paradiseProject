var createError = require('http-errors');
var express = require('express');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(session)

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var passport = require('passport');

var authObject = require('./auth/index');
var dbObject = require('./db/index');
var userObject = require('./user/index');

var config = require('./config');

var connection_str = config.database.dialect+'://' + config.database.host + '/' + config.database.db_name;

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'nhbyflwfnm',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: require('mongoose').connection })
}));
app.use(bodyParser.urlencoded({extended: true}));
// app.use(expressSession({secret:'keyboard cat', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

authObject.init()

app.use('/auth', authObject.routers);
// app.use('/users', userObject.routers);


app.get('/', function(req, res) {
    //Here you have an access to req.user
    res.json(req.user);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//connect to mongoose
dbObject.init(connection_str)

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
