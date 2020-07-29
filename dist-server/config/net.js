"use strict";var _keys=_interopRequireDefault(require("./keys"));Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Import config
// Exporting env
var _default=function(a){// 1. Get port from environment and store in Express
var b=normalizePort(_keys["default"].port),c=_keys["default"].ip;return a.set("port",b),a.set("ip",c),a};exports["default"]=_default;function normalizePort(a){var b=parseInt(a,10);return isNaN(b)?a:!!(0<=b)&&b}