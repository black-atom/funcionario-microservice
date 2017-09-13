const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const utils = require('./utils/utils');
const authenticationMiddleware = require('./middleware/authentication');
const cors = require("cors");
const jwt = require('express-jwt');
const authConfig = require('./config/authConfig')();

// import controllers here
const funcionarioRoute = require('./routes/funcionarioRoute');
const authenticationRoute = require('./routes/authenticationRoute');
const app = express();

app.use(cors());
app.use("/api", 
  jwt({
    secret: authConfig.secret,
    credentialsRequired: !authConfig.bypass
  }), 
  (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') { 
      return(res.status(401).send('Invalid authorization token'));
    }
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", (req, res, next) => {

  req.body.createdBy = (req.user && req.user._doc.login.username) ? req.user._doc.login.username : 'Ambiente de Test';
  req.body.updatedBy = (req.user && req.user._doc.login.username) ? req.user._doc.login.username : 'Ambiente de Test';
  
   next();
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//import routers here
app.use('/', funcionarioRoute);
app.use('/', authenticationRoute);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use((err, req, res, next) => {
	if(err.name === 'MongoError'){
		err.status = 500;
	}
	next(err);
})


// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
// 	app.use((err, req, res, next) => {
// 		res.status(err.status || 500);
// 		res.send('error', {
// 			message: err.message,
// 			error: err
// 		});
// 	});
// }

// production error handler
// no stacktraces leaked to user
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : err;

  console.error(err.stack || err)
  // render the error page
  res.status(err.status || 500);
  res.json(res.locals.error);
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
