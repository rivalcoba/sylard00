"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=_default;var _index=_interopRequireDefault(require("./index")),_auth=_interopRequireDefault(require("./auth"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Importing index router
function _default(a){// Other Routes
return a.use("/",_index["default"]),a.use("/auth",_auth["default"]),a}