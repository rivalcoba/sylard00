// Importando los estilos
import './styles/main.css';
import './styles/estilos_menu.css'
import './styles/bootstrap-grid.css'
import './styles/simple-scrollbar.css'
// Importando Scripts
//import greeting from '@chelpers/greeting'
import flashLib from '@chelpers/flashLib'
// Setting language helper
import myI18n from '@chelpers/myI18n'
// Modals
import syModals from '@chelpers/modals'
// Admin the register form
import formsManager from '@chelpers/formsManager'
// Admin for view
import locations_index from '@client/pages/locations/index'
// Collections Create Scripts
import collectionsCreate from '@client/pages/collections/create'
// Collections Edit Scripts
import editCollectionScripts from '@client/pages/collections/edit'
// ./Test scripts
import indexTestScripts from '@client/pages/index/test'

import App from '@client/templates/main.vue'
import axios from "axios";
import VueAxios from "vue-axios";
import LecturaEAF from "@client/templates/components/LecturaEAF.vue";
import LecturaTierEAF from "@client/templates/components/LecturaTierEAF.vue";
import App2 from '@client/templates/main2.vue'


import Vue from 'vue'

// Loading function to the global variable
//window.greeting = greeting
window.myI18n = myI18n
window.formsManager = formsManager
window.syModals = syModals

if (window.location.pathname == `/locations/index`) {
  window.locations = locations_index
}

if(window.location.pathname == `/collections/create`){
    window.pageScripts = collectionsCreate
}

if(window.location.pathname == `/test`){
    //window.VueCdn = VueCdn
    window.app = indexTestScripts.getVueApp()
}
if(window.location.pathname == `/audioannotations/vuetest`){
    // window.Vue = Vue
    Vue.use(VueAxios, axios);
    Vue.component("LecturaEAF", LecturaEAF);
    window.vm = new Vue({
      el: '#app',
      render: h => h(App)
    })
}

if(window.location.pathname == `/audioannotations/uploadfile`){
    // window.Vue = Vue
    Vue.use(VueAxios, axios);
    Vue.component("LecturaTierEAF", LecturaTierEAF);
    window.vm = new Vue({
      el: '#app2',
      render: h => h(App2)
      //aqui
     //https://stackoverrun.com/es/q/1064113 pasar parametro converttojson
     //ejemplo http://plnkr.co/edit/iE0Vr7sszfqrrDIsR8Wi?p=preview&preview 
    })
}


if(window.location.pathname == `/audioannotations`){
    // window.Vue = Vue
 //   Vue.use(VueAxios, axios);
 //   Vue.component("LecturaEAF", LecturaEAF);
 //   window.vm = new Vue({
 //     el: '#app',
 //     render: h => h(App)
 //   })
}


// No se puede cargar script condicionalmente
if(window.location.pathname.match(/\/collections\/edit\//)){
  window.editCollectionScripts = editCollectionScripts
  window.editCollectionScripts.fillLangList(app)
  window.editCollectionScripts.fillEntitiesList(app)
}

// Flashea mensaje si lo hay
flashLib.flashManager()