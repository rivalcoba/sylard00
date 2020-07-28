import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import keys from '@config/keys'
import mongoose from 'mongoose'
// Import config
import netConfig from '@config/net'
import templateEngine from '@config/template-engine'

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const app = express();

// 0. Connectitng to Database
// Map Global promise - get ride of warning
// To use global promises
mongoose.Promise = global.Promise;
// todo...
console.log(`LN17@s/app.js: ${keys.databaseUrl}`)

// Applying main App Configurations
// 1. Apply Network Configurations
netConfig(app)

// 2. Setup Template Engine
templateEngine(app)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
