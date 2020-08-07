"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;// Se asegura de que el usuario sea un
// colaborador
var _default=function(a,b,c){"colaborator"==b.locals.user.role?c():(a.flash("error_msg","Se requiere ser colaborador para acceder a esta secci\xF3n"),b.redirect("/dashboard"))};exports["default"]=_default;