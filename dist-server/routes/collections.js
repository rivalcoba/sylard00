"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _express=require("express"),_ensureAuth=_interopRequireDefault(require("../helpers/ensureAuth")),_ensureColabUser=_interopRequireDefault(require("../validators/ensureColabUser")),_collections=_interopRequireDefault(require("../controllers/collections")),_collection=_interopRequireDefault(require("../validators/collections/collection")),_collectionsEdition=_interopRequireDefault(require("../validators/collections/collectionsEdition"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Imporntando el Enrutador
// Creating an instance from the express router
const router=new _express.Router;// Authorization Check Middleware
router.get("/",_ensureAuth.default,_ensureColabUser.default,_collections.default.index),router.get("/create",_ensureAuth.default,_ensureColabUser.default,_collections.default.createCollection),router.post("/add",_ensureAuth.default,_ensureColabUser.default,_collection.default,_collections.default.addCollection),router.get("/index/:collectionId",_ensureAuth.default,_ensureColabUser.default,_collections.default.indexCollection),router.get("/edit/:collection_id",_ensureAuth.default,_ensureColabUser.default,_collections.default.editCollectionForm),router.put("/edit/:collection_id",_ensureAuth.default,_ensureColabUser.default,_collectionsEdition.default,_collections.default.editCollection),router.delete("/delete/:collection_id",_ensureAuth.default,_ensureColabUser.default,_collections.default.deleteCollection),router.get("/api/read/:collection_id",/*ensureAuthenticated,
    ensureColabUser,*/ // TODO: Uncomment to protect route
<<<<<<< HEAD
_collections.default.api_getCollectionById),router.get("/api/read_all/",/*ensureAuthenticated,
=======
_collections.default.api_getCollectionById),router.get("/api/read_all/:page",/*ensureAuthenticated,
>>>>>>> d22c384ba90a65779076259bca90b46f7e94f1e7
    ensureColabUser,*/ // TODO: Uncomment to protect route
_collections.default.api_getCollectionAll),router.get("/api/index/:userId",/*ensureAuthenticated,
      ensureColabUser,*/ // TODO: Uncomment to protect route
_collections.default.api_getCollectionByUser);// Se exportan rutas
var _default=router;exports.default=_default;