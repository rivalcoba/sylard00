"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=_default;var _index=_interopRequireDefault(require("./index")),_auth=_interopRequireDefault(require("./auth")),_user=_interopRequireDefault(require("./user")),_collections=_interopRequireDefault(require("./collections")),_locations=_interopRequireDefault(require("./locations")),_glottolog=_interopRequireDefault(require("./glottolog"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Importing index router
function _default(a){// Other Routes
return a.use("/",_index.default),a.use("/auth",_auth.default),a.use("/user",_user.default),a.use("/collections",_collections.default),a.use("/locations",_locations.default),a.use("/glottolog",_glottolog.default),a}