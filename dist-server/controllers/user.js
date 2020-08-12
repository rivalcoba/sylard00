"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _path=_interopRequireDefault(require("path")),_jsonReader=_interopRequireDefault(require("../helpers/jsonReader")),_bcryptjs=_interopRequireDefault(require("bcryptjs"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function asyncGeneratorStep(a,b,c,d,e,f,g){try{var h=a[f](g),i=h.value}catch(a){return void c(a)}h.done?b(i):Promise.resolve(i).then(d,e)}function _asyncToGenerator(a){return function(){var b=this,c=arguments;return new Promise(function(d,e){function f(a){asyncGeneratorStep(h,d,e,f,g,"next",a)}function g(a){asyncGeneratorStep(h,d,e,f,g,"throw",a)}var h=a.apply(b,c);f(void 0)})}}// DELETE async
var edit=/*#__PURE__*/function(){var a=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(b,c){var d,e,f;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:d=_jsonReader["default"].readFileSync(_path["default"].join(__dirname,"..","assets","languages.json")),e=_jsonReader["default"].readFileSync(_path["default"].join(__dirname,"..","assets","countries.json")),f="",b.user.spokenLanguages.forEach(function(a){f=f.concat("".concat(a.name," | ").concat(a.gid,"\n"))}),f=f.trim(),console.log(f),c.render("user/edit",{spokenLang:f,nativeLanguages:d,countries:e});case 7:case"end":return a.stop();}},a)}));return function(){return a.apply(this,arguments)}}(),editUser=/*#__PURE__*/function(){var a=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(b,c){var d,e,f,g,h,i,j,k;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return d=b.body,e=d.name,f=d.lastName,g=d.secLastName,h=d.email,i=d.spokenLanguages,j=d.country,k=d.about,a.next=3,b.user.editUser({name:e,lastName:f,secLastName:g,email:h,spokenLanguages:i,country:j,about:k});case 3:b.flash("success_msg","Sus cambios se han guardado"),c.redirect("/dashboard");case 5:case"end":return a.stop();}},a)}));return function(){return a.apply(this,arguments)}}(),editPassword=function(a,b){b.render("user/editPassword")},editUserPassword=/*#__PURE__*/function(){var a=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(b,c){var d;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return d=b.body.password,a.next=3,b.user.editPassword(d);case 3:b.flash("success_msg","Password editado con exito"),c.redirect("/dashboard");case 5:case"end":return a.stop();}},a)}));return function(){return a.apply(this,arguments)}}(),_default={edit:edit,editUser:editUser,editPassword:editPassword,editUserPassword:editUserPassword};exports["default"]=_default;