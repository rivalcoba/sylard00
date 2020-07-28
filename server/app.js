import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

// Import config
import netConfig from '@config/net'
import templateEngine from '@config/template-engine'
import appRoutes from '@routes/routes'
import dbConnection from '@database/odmconnect'

// -2. Importing Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// -1 Creating an instance of express
const app = express();

// 0. Connecting to the Database
dbConnection();

// Applying main App Configurations
// 1. Apply Network Configurations
netConfig(app)

// 2. Setup Template Engine
templateEngine(app)

// 3. Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 4. Registering Routes
appRoutes(app)

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

//module.exports = app;
export default app;
