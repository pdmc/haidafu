/*
 *	PK4YO Co. Ltd.
 *  Author: Zhang Hui <spacetiller@163.com>
 *  Time: 2018-12-19
 *  All Copyrights Reserved.
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users/users');
var projectsRouter = require('./routes/projects/projects');
var activityRouter = require('./routes/activity/activity');
var myactivityRouter = require('./routes/myactivity/myactivity');
var favoritesRouter = require('./routes/favorites/favorites');
var reservationsRouter = require('./routes/reservations/reservations');
var hongbaosRouter = require('./routes/hongbaos/hongbaos');
var typesRouter = require('./routes/types/types');
var fitmentsRouter = require('./routes/fitments/fitments');
var prightsRouter = require('./routes/prights/prights');
var areasRouter = require('./routes/areas/areas');

var app = express();
/*
// configure https
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('/etc/nginx/dmc.pk4yo.com.gworg.key', 'utf8');
var certificate = fs.readFileSync('/etc/nginx/dmc.pk4yo.com.gworg.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var PORT = 18080;
var SSLPORT = 18081;

httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});

// Welcome
app.get('/', function(req, res) {
    if(req.protocol === 'https') {
        res.status(200).send('Welcome to Safety Land!');
    }
    else {
        res.status(200).send('Welcome!');
    }
});
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

app.use(logger('dev',{stream: accessLogStream}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/activity', activityRouter);
app.use('/myactivity', myactivityRouter);
app.use('/favorites', favoritesRouter);
app.use('/reservations', reservationsRouter);
app.use('/hongbaos', hongbaosRouter);
app.use('/types', typesRouter);
app.use('/fitments', fitmentsRouter);
app.use('/prights', prightsRouter);
app.use('/areas', areasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
