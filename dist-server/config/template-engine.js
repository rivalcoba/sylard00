"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _expressHandlebars=_interopRequireDefault(require("express-handlebars")),_path=_interopRequireDefault(require("path"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var _default=function(a){return a.engine("hbs",(0,_expressHandlebars["default"])({extname:".hbs",defaultLayout:"main"// helpers:{
//     truncate: truncate,
//     scriptTags: scriptTags,
//     formatDate : formatDate,
//     select: select,
//     editIcon: editIcon
// }
})),a.set("view engine","hbs"),a.set("views",_path["default"].join(__dirname,"../","views")),a};exports["default"]=_default;