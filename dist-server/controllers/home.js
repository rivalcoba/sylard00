"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;// Home Controllers
var index=function(a,b){b.locals.user?b.redirect("/dashboard"):b.render("index/welcome",{})},contact=function(a,b){b.render("index/contact",{title:"Contact",content:"Contact the administrator"})},credits=function(a,b){b.render("index/contact",{title:"Credits",content:"Site builded by Drako-YonceCe"})},dashboard=function(a,b){b.render("index/dashboard",{title:"Sylard Dashboard",content:"Audio Collections from diferent Authors"})},documentation=function(a,b){b.render("index/documentation",{title:"Sylard Documentation",content:"You can find the instructions to use Sylard in this place."})},usermanual=function(a,b){b.render("index/register",{title:"User Manual",content:"Terms and conditions are presenting bellow...."})},terms=function(a,b){b.render("index/register",{title:"Terms",content:"Terms and conditions are presenting bellow...."})},_default={index:index,contact:contact,credits:credits,dashboard:dashboard,documentation:documentation,usermanual:usermanual,terms:terms};exports["default"]=_default;