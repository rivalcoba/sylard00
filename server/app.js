// import 'core-js/stable'
// import 'regenerator-runtime'

import createError from 'http-errors'
import express from 'express'
import path from 'path'
import fs from 'fs'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import passportConfig from '@config/passport'
import passport from 'passport'
import session from 'express-session'
import methodOverride from 'method-override'
import flash from 'connect-flash'
import i18n from 'i18n-express'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'

import multer from 'multer'
// import bodyparser from 'body-parser'

// Import config
import netConfig from '@config/net'
import templateEngine from '@config/template-engine'
import dbConnection from '@database/odmconnect'

// -4 Creatting eaf path
let eafPath = path.join(__dirname,'public','eaf')
if (!fs.existsSync(eafPath)){
  console.log(">> Creating eafpath");
  fs.mkdirSync(eafPath);
}

// -3. Importing Routes
import addAppRoutes from '@routes/routes'

// -2 Passport Config
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
var Mongo_Store = MongoStore(session)
app.use(session({
  secret: 's_|/14rd',
  resave: true,
  saveUninitialized: true,
  store: new Mongo_Store({
    mongooseConnection : mongoose.connection,
    ttl: 1 * 24 * 60 * 60, // save session 1 days
  })
}));

// 9. PASSPORT middleware for used with sessions
app.use(passport.initialize());
app.use(passport.session());

// 10. Flashing
app.use(flash())

// 11. Variables Globales
app.use((req, res, next)=>{
  // Quering Language
  if(req.cookies.langbisquet == 'en')
  {
    res.locals.en = true
  }else{
    res.locals.es = true
  }
  // Access to flash variables
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  // Made for passport
  res.locals.passportError= req.flash('error')
  // To Keep de loged user info  
  // Se requiere parsear de mongoose obj a objeto
  // json y solo se puede hacer si el user existe
  // el user existe si se ha logeado el usuario  
  res.locals.user = req.user ? req.user.toJSON() : null;
  // Se calcula la inicial del apellido
  res.locals.user.lnInitial = res.locals.user.lastName[0]
  next()
})

// 12. i18n
app.use(
  i18n({
    // where to store json files - defaults to './locales'
    translationsPath: path.join(__dirname, 'locales'),
    // setup some locales - other locales default to en silently
    siteLangs: ['en', 'es'],
    defaultLang: 'es',
    textsVarName: 'translation',
    paramLangName: 'slang',
    // sets a custom cookie name to parse locale settings from
    cookieLangName: 'langbisquet',
  })
)

// 13. Registering Routes
addAppRoutes(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//multer
// app.use(bodyparser.urlencoded({extended: true}));
//app.use(multer({ dest: './uploads/'}).single('myFile')); // added the single() method
app.use(multer({ dest: './uploads/'}).single('myFile'));
//app.use(function(req, res, next) {

//var storage = multer.diskStorage({
//  destination: function (req, file, cb) {
//    cb(null, 'uploads')
//  },
//  filename: function (req, file, cb) {
//    cb(null, file.fieldname + '-' + Date.now())
//  }
//})
 
//var upload = multer({ storage: storage })

//})


//module.exports = app;
export default app;
