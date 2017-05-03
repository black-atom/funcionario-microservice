const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const utils = require('./utils/utils');
const authenticationMiddleware = require('./middleware/authentication');
const jwt = require('jwt-then');

// import controllers here
const usersRoute = require('./routes/usersRoute');
const authenticationRoute = require('./routes/authenticationRoute');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware 
app.use('/api', authenticationMiddleware.authVerification);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//import routers here
app.use('/', usersRoute);
app.use('/', authenticationRoute);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


//listen to events
process.once('SIGUSR2', () => {
	utils.gracefulShutdown('App restarting', () => {
		process.kill(process.pid, 'SIGUSR2');
	});
});

process.on('SIGINT', () => {
	utils.gracefulShutdown('App termination', () => {
		process.exit(0);
	});
});
process.on('SIGTERM', () => {
	utils.gracefulShutdown('App shutdown', () => {
		process.exit(0);
	});
});

module.exports = app;
