"use strict";var _Location=_interopRequireDefault(require("../models/Location"));Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Import Model
const index=(a,b)=>{b.render("locations/index")},indexNomLoc=async(a,b)=>{console.log(`Nomloc: ${a.params.nom_loc}`);const{nom_loc:c}=a.params;var d=new RegExp(c,"i");const e=await _Location.default.find({Nom_Loc:d}).exec();let f=e.map(a=>a.toJSON());return b.json(f);// List all the collections
//   res.json({
//     'Mapa': '010010144',
//     'Cve_Ent': '01',
//     'Nom_Ent': 'Aguascalientes',
//     'Nom_Abr': 'Ags.',
//     'Cve_Mun': '001',
//     'Nom_Mun': 'Aguascalientes',
//     'Cve_Loc': '0144',
//     'Nom_Loc': 'El Colorado (El Soyatal)',
//     'Latitud': '21°54´15.960 N',
//     'Longitud': '102°10´05.610 W',
//     'Lat_Decimal': 21.904433,
//     'Lon_Decimal': -102.168225,
//     'Altitud': 2023,
//   })
};var _default={indexNomLoc,index};exports.default=_default;