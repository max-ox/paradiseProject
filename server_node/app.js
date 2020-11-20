var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var passport = require('passport');
var MongoStore = require('connect-mongo')(session);

var authObject = require('./auth/index');
var userObject = require('./user/index');

var config = require('./config');

var connection_str = config.database.dialect+'://' + config.database.host + '/' + config.database.db_name;
console.log('connection_str', connection_str);
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: config.nodeAuthSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 15000, //1 Hour
    },
    // Место хранения можно выбрать из множества вариантов, это и БД и файлы и Memcached.
    store: new MongoStore({
        url: connection_str,
    })
}))

// app.use(session({secret:config.nodeAuthSecret, resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

authObject.init()
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', function(req, res) {
    res.send(200);
});
app.get('/api/login', function(req, res) {
    //Here you have an access to req.user
    res.send({data:'error'});
});

app.use('/api/auth', authObject.routers);
app.use('/api/user', userObject.routers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


console.log('config', config);

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
  res.send({'error': err});
});

module.exports = app;
