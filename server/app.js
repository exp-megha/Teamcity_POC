var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var restful = require('node-restful');

var http = require('http');
var xdom = require('./utils/crossdomain');
var async = require("async");       // async module
var request = require("request"); // request module
var fs = require("fs");         // fs module
var failure = require('./middleware/responsehelpers').failure;
var mongoose = restful.mongoose;

/*
 * Possible values for enviroment :
 * development, testing, production
 */

var config = require('./config');
config = new config('testing');


var app = express();

app.set('config', config);


// Database connection
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connect(config.db.host, config.db.name, config.db.port, {
    user: config.db.user,
    pass: config.db.pass
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(xdom);
var routes = require('./routes')(app);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.json(failure(err.message, err.status));
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.json(failure(err.message, err.status));
});

module.exports = app;
