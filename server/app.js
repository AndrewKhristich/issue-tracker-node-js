var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
require('./conf/passport');
var conf = require('./conf/GlobalConf');
var cors = require('cors');


mongoose.Promise = global.Promise;
mongoose.connect(conf.mongoUrl)
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err));

var authRouter = require('./routes/auth');
var articlesRouter = require('./routes/articles');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/articles', articlesRouter);

module.exports = app;
