"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;function asyncGeneratorStep(a,b,c,d,e,f,g){try{var h=a[f](g),i=h.value}catch(a){return void c(a)}h.done?b(i):Promise.resolve(i).then(d,e)}function _asyncToGenerator(a){return function(){var b=this,c=arguments;return new Promise(function(d,e){function f(a){asyncGeneratorStep(h,d,e,f,g,"next",a)}function g(a){asyncGeneratorStep(h,d,e,f,g,"throw",a)}var h=a.apply(b,c);f(void 0)})}}// import User from '@models/User'
// import keys from '@config/keys'
// import path from 'path'
// import jsonReader from '@helpers/jsonReader'
var edit=/*#__PURE__*/function(){var a=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(b,c){return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:// let nativeLanguages = jsonReader.readFileSync(path.join(__dirname,'..','assets','languages.json'))
// let countries = jsonReader.readFileSync(path.join(__dirname,'..','assets','countries.json'))
// res.render('users/edit',{
//     nativeLanguages: nativeLanguages,
//     countries : countries
// })
c.send("Editar Usuarios");case 1:case"end":return a.stop();}},a)}));return function(){return a.apply(this,arguments)}}(),_default={edit:edit};exports["default"]=_default;