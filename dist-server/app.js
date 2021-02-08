"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _httpErrors=_interopRequireDefault(require("http-errors")),_express=_interopRequireDefault(require("express")),_path=_interopRequireDefault(require("path")),_fs=_interopRequireDefault(require("fs")),_cookieParser=_interopRequireDefault(require("cookie-parser")),_morgan=_interopRequireDefault(require("morgan")),_passport=_interopRequireDefault(require("./config/passport")),_passport2=_interopRequireDefault(require("passport")),_expressSession=_interopRequireDefault(require("express-session")),_methodOverride=_interopRequireDefault(require("method-override")),_connectFlash=_interopRequireDefault(require("connect-flash")),_i18nExpress=_interopRequireDefault(require("i18n-express")),_connectMongo=_interopRequireDefault(require("connect-mongo")),_mongoose=_interopRequireDefault(require("mongoose")),_multer=_interopRequireDefault(require("multer")),_net=_interopRequireDefault(require("./config/net")),_templateEngine=_interopRequireDefault(require("./config/template-engine")),_odmconnect=_interopRequireDefault(require("./database/odmconnect")),_routes=_interopRequireDefault(require("./routes/routes"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// import 'core-js/stable'
// import 'regenerator-runtime'
// import bodyparser from 'body-parser'
// Import config
// -4 Creatting eaf path
let eafPath=_path.default.join(__dirname,"public","eaf");_fs.default.existsSync(eafPath)||(console.log(">> Creating eafpath"),_fs.default.mkdirSync(eafPath)),(0,_passport.default)(_passport2.default);// -1 Creating an instance of express
const app=(0,_express.default)();// 0. Connecting to the Database
(0,_odmconnect.default)(),(0,_net.default)(app),(0,_templateEngine.default)(app),app.use((0,_morgan.default)("dev")),app.use(_express.default.json()),app.use(_express.default.urlencoded({extended:!1})),app.use((0,_cookieParser.default)()),app.use(_express.default.static(_path.default.join(__dirname,"public"))),app.use((0,_methodOverride.default)("_method"));// 8. Enabling Sessions for Passport
var Mongo_Store=(0,_connectMongo.default)(_expressSession.default);app.use((0,_expressSession.default)({secret:"s_|/14rd",resave:!0,saveUninitialized:!0,store:new Mongo_Store({mongooseConnection:_mongoose.default.connection,ttl:86400// save session 1 days
})})),app.use(_passport2.default.initialize()),app.use(_passport2.default.session()),app.use((0,_connectFlash.default)()),app.use((a,b,c)=>{// Access to flash variables
// Made for passport
// Se calcula la inicial del apellido
"en"==a.cookies.langbisquet?b.locals.en=!0:b.locals.es=!0,b.locals.success_msg=a.flash("success_msg"),b.locals.error_msg=a.flash("error_msg"),b.locals.passportError=a.flash("error"),a.user&&(b.locals.user=a.user.toJSON(),b.locals.user.lnInitial=b.locals.user.lastName[0]),c()}),app.use((0,_i18nExpress.default)({// where to store json files - defaults to './locales'
translationsPath:_path.default.join(__dirname,"locales"),// setup some locales - other locales default to en silently
siteLangs:["en","es"],defaultLang:"es",textsVarName:"translation",paramLangName:"slang",// sets a custom cookie name to parse locale settings from
cookieLangName:"langbisquet"})),(0,_routes.default)(app),app.use(function(a,b,c){c((0,_httpErrors.default)(404))}),app.use(function(a,b,c){// set locals, only providing error in development
// render the error page
c.locals.message=a.message,c.locals.error="development"===b.app.get("env")?a:{},c.status(a.status||500),c.render("error")}),app.use((0,_multer.default)({dest:"./uploads/"}).single("myFile"));//app.use(function(req, res, next) {
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
var _default=app;exports.default=_default;