"use strict";var _dotenv=_interopRequireDefault(require("dotenv"));Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}_dotenv["default"].config();// Exporting env
var _default={homeUrl:process.env.APP_URL,databaseUrl:process.env.DATABASE_URL,port:process.env.PORT,ip:process.env.IP,mailUserName:process.env.MAIL_USERNAME,mailPassword:process.env.MAIL_PASSWORD,authMail:process.env.AUTH_MAIL};exports["default"]=_default;