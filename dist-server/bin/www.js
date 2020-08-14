#!/usr/bin/env node
/**
 * Module dependencies.
 */"use strict";var _app=_interopRequireDefault(require("../app")),_debug=_interopRequireDefault(require("debug")),_http=_interopRequireDefault(require("http")),_colors=_interopRequireDefault(require("colors"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}_colors.default.setTheme({silly:"rainbow",input:"grey",verbose:"cyan",prompt:"grey",info:"green",data:"grey",help:"cyan",warn:"yellow",debug:"blue",error:"red"});const debug=(0,_debug.default)("myapp:server");/**
 * Create HTTP server.
 */var server=_http.default.createServer(_app.default);/**
 * Listen on provided port, on all network interfaces.
 */const IP=_app.default.get("ip"),PORT=_app.default.get("port");server.listen(PORT,IP),server.on("error",onError),server.on("listening",onListening);/**
 * Event listener for HTTP server "error" event.
 */function onError(a){if("listen"!==a.syscall)throw a;var b="string"==typeof port?"Pipe "+port:"Port "+port;// handle specific listen errors with friendly messages
switch(a.code){case"EACCES":console.error(b+" requires elevated privileges"),process.exit(1);break;case"EADDRINUSE":console.error(b+" is already in use"),process.exit(1);break;default:throw a;}}/**
 * Event listener for HTTP server "listening" event.
 */function onListening(){var a=server.address(),b="string"==typeof a?"pipe "+a:"port "+a.port;debug("Listening on "+b),console.log(`Ln79@www.js> Listen @ http://${_app.default.get("ip")}:${a.port}`.info)}