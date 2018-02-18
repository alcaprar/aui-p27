var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('cookie-session'),
    path = require('path'),
    cors = require('cors'),
    flash = require('connect-flash');

// Creating http server
var app = express();
var server = require('http').Server(app);

app.use(cors());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.send(200);
    }
    else {
        //move on
        next();
    }
});

app.use(express.static('public'));
app.use('/assets', express.static('assets'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// config file
var config = require('./config');

//mongodb connection
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.uri, {
    keepAlive: 1,
    connectTimeoutMS: 300000,
    socketTimeoutMS: 300000,
    promiseLibrary: global.Promise
}, function (err, db) {
    if (err){
        console.log('[MDB] Error while connecting to mongodb.', err);
        // TODO try to reconnect
    }else{
        console.log('[MDB] Successfully connected to MongoDB');
    }
});

//Middleware that puts request bodies into req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({keys: ['secretkey1', 'secretkey2']}));

// add the passport authentication strategies
app.use(flash());
var passport = require('passport');

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

// requires the model with Passport-Local Mongoose plugged in
const Therapist = require('./models/therapist');

// use static authenticate method of model in LocalStrategy
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(Therapist.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(Therapist.serializeUser());
passport.deserializeUser(Therapist.deserializeUser());

// Include the controllers folder, where there are all the routes handler
app.use(require('./routes'));

// Starting node server
server.listen(config.port, function () {
    console.log('Server listening on port: ' + config.port);
});