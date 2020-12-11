"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _express=require("express"),_genre=_interopRequireDefault(require("../controllers/genre")),_genre2=_interopRequireDefault(require("../validators/genres/genre"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Creating an instance from the express router
const router=new _express.Router;// Import Controller
router.post("/api/create",_genre2.default.genrePost,_genre.default.api_postGenres),router.get("/api/index",_genre.default.api_getGenres),router.get("/api",_genre.default.api_getGenres),router.put("/api/update/:genre_id",_genre2.default.genrePut,_genre.default.api_putGenres),router.delete("/api/delete/:genre_id",_genre.default.api_deleteGenres);//   ___  ______ _____ 
//  / _ \ | ___ \_   _|
// / /_\ \| |_/ / | |  
// |  _  ||  __/  | |  
// | | | || |    _| |_ 
// \_| |_/\_|    \___/ 
var _default=router;exports.default=_default;