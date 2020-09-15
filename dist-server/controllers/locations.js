"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _Location=_interopRequireDefault(require("../models/Location")),_regexhelp=_interopRequireDefault(require("../helpers/regexhelp"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Import Model
// Helpers
const index=async(a,b)=>{// Getting the Entities list
const c=await _Location.default.distinct("Nom_Ent");// Render page
b.render("locations/index",{entities:c})},indexNomLoc=async(a,b)=>{// Getting the query parameter
let{nom_loc:c}=a.params,d=0;// Limiting the values delivered
switch(c.length){case 0:return b.status(200).json({error:"Necesita ingresar mas de un caracter"});case 1:case 2:case 3:case 4:case 5:d=10*c.length;break;default:d=0;}console.log(`limte de query>${d}`),c=_regexhelp.default.diacriticSensitiveRegex(c),console.log(`> nom_loc: ${c}`);var e=new RegExp(c,"i");console.log(`> regex: ${e}`);//Working
const f=await _Location.default.find({Nom_Loc:{$regex:e}}).limit(d).exec();let g=f.map(a=>a.toJSON());return b.json(g);// List all the collections
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
},getEntities=async(a,b)=>{try{const a=await _Location.default.distinct("Nom_Ent");return b.status(200).json(a)}catch(a){return b.status(404).json({error:"no se encontraron entidades"})}},getMunicipalities=async(a,b)=>{// Getting the fielName
const{nom_ent:c}=a.params,d=await _Location.default.distinct("Nom_Mun",{Nom_Ent:c});return b.status(200).json(d)},getLocalities=async(a,b)=>{// Getting the fielName
const{nom_ent:c,nom_mun:d}=a.params,e=await _Location.default.distinct("Nom_Loc",{Nom_Ent:c,Nom_Mun:d});return b.status(200).json(e)},findLocality=async(a,b)=>{// Getting the fielName
const{nom_ent:c,nom_mun:d,nom_loc:e}=a.params,f=await _Location.default.findOne({Nom_Ent:c,Nom_Mun:d,Nom_Loc:e},"Nom_Ent Nom_Mun Nom_Loc Lat_Decimal Lon_Decimal").exec();f?b.status(200).json(f):b.status(404).send("Not Found")};var _default={indexNomLoc,index,getMunicipalities,getLocalities,findLocality,getEntities};exports.default=_default;