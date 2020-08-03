import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import passportConfig from '@config/passport'
import passport from 'passport'
import session from 'express-session'
import methodOverride from 'method-override'
import flash from 'connect-flash'

// Import config
import netConfig from '@config/net'
import templateEngine from '@config/template-engine'
import dbConnection from '@database/odmconnect'

// -2. Importing Routes
import addAppRoutes from '@routes/routes'

// -3 Passport Config
passportConfig(passport)

// -1 Creating an instance of express
const app = express();

// 0. Connecting to the Database
dbConnection();

// Applying main App Configurations
// 1. Apply Network Configurations
netConfig(app)

// 2. Setup Template Engine
templateEngine(app)

// 3. Global Middleware
app.use(morgan('dev'));

// 4. Used instead of Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 5. Manejo de cookies
app.use(cookieParser());

// 6. Archivos Estaticos
app.use(express.static(path.join(__dirname, 'public')));

// 7. Falta Override
app.use(methodOverride('_method'));

// 8. Enabling Sessions for Passport
app.use(session({
  secret: 's_|/14rd',
  resave: true,
  saveUninitialized: true
}));

// 9. PASSPORT middleware for used with sessions
app.use(passport.initialize());
app.use(passport.session());

// 10. Flashing
app.use(flash())

// 11. Variables Globales
app.use((req, res, next)=>{
  // Access to flash variables
  res.locals.succes_msg= req.flash('sucess_msg')
  res.locals.error_msg= req.flash('error_msg')
  // Made for passport
  res.locals.error= req.flash('error')
  // To Keep de loged user info
  res.locals.user = req.user || null;
  next()
})

// 12. Registering Routes
addAppRoutes(app)

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
