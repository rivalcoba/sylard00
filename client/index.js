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
// Audioannotations Scripts
import createAudioAnnotationsScripts from '@client/pages/audioannotations/create'

import Vue from 'vue'
import App from '@client/templates/main.vue'
import axios from "axios";
import VueAxios from "vue-axios";
import LecturaEAF from "@client/templates/components/LecturaEAF.vue";
import LecturaTierEAF from "@client/templates/components/LecturaTierEAF.vue";
import App2 from '@client/templates/main2.vue'
import FiltroAudioannotations from "@client/templates/components/FiltroAudioannotations.vue";
import EditAudioannotations from "@client/templates/components/EditAudioannotations.vue";
import Audioannotations from "@client/templates/components/Audioannotations.vue";
//AQUÍ SE IMPORTAN LAS NUEVAS VISTAS PARA EL DASHBOARD DE COLLECTIONS
import Dashboard from "@client/templates/components/Dashboard.vue";
import App3 from '@client/templates/main3.vue'
import App4 from '@client/templates/main4.vue'
import App5 from '@client/templates/main5.vue'
//AQUÍ TERMINAN
import colorPicker from '@chelpers/colorPicker'
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);


// Loading function to the global variable
//window.greeting = greeting
window.myI18n = myI18n
window.formsManager = formsManager
window.syModals = syModals
window.showColorPalette = colorPicker.showColorPalette
window.hideColorPalette = colorPicker.hideColorPalette

if (window.location.pathname == `/locations/index`) {
    window.locations = locations_index
}

if (window.location.pathname == `/collections/create`) {
    window.pageScripts = collectionsCreate
}

if (window.location.pathname == `/test`) {
    //window.VueCdn = VueCdn
    window.app = indexTestScripts.getVueApp()
}


//if(window.location.pathname == `/audioannotations/vuetest/:id`){
if (window.location.pathname.match(/\/audioannotations\/vuetest\//)) {
    //if(window.location.pathname == `/audioannotations/vuetest`){ 
    // window.Vue = Vue
    Vue.use(VueAxios, axios, colorPicker);
    Vue.component("LecturaEAF", LecturaEAF);
    window.vm = new Vue({
        el: '#app',
        render: h => h(App)
    })
}

//if(window.location.pathname == `/audioannotations/create`){  
if (window.location.pathname == `/audioannotations/uploadfile`) {
    // window.Vue = Vue
    Vue.use(VueAxios, axios,colorPicker);
    Vue.component("LecturaTierEAF", LecturaTierEAF,);
    window.vm = new Vue({
        el: '#app2',
        render: h => h(App2)
            //aqui
            //https://stackoverrun.com/es/q/1064113 pasar parametro converttojson
            //ejemplo http://plnkr.co/edit/iE0Vr7sszfqrrDIsR8Wi?p=preview&preview 
    })

    // Desde aqui poder ejecutar createAudioAnotation() del componente "LecturaTierEAF"
    window.pageScripts = createAudioAnnotationsScripts
}

if (window.location.pathname == `/audioannotations` ) {
    // window.Vue = Vue
    Vue.use(VueAxios, axios);
    Vue.component("FiltroAudioannotations", FiltroAudioannotations);
    window.vm = new Vue({
        el: '#app3',
        render: h => h(App3)
            //aqui
            //https://stackoverrun.com/es/q/1064113 pasar parametro converttojson
            //ejemplo http://plnkr.co/edit/iE0Vr7sszfqrrDIsR8Wi?p=preview&preview 
    })
}

//Aquí redirige a la nueva vista de dashboard
if (window.location.pathname == '/dashboard' || window.location.pathname.match(/\/collections\/index\//)) {
    // window.Vue = Vue
    Vue.use(VueAxios, axios);
    Vue.component("Dashboard", Dashboard);
    window.vm = new Vue({
        el: '#app4',
        render: h => h(App4)
            //aqui
            //https://stackoverrun.com/es/q/1064113 pasar parametro converttojson
            //ejemplo http://plnkr.co/edit/iE0Vr7sszfqrrDIsR8Wi?p=preview&preview 
    })
}

if (window.location.pathname == '/audioannotation') {
    // window.Vue = Vue
    Vue.use(VueAxios, axios);
    Vue.component("Audioannotations", Audioannotations);
    window.vm = new Vue({
        el: '#app5',
        render: h => h(App5)
            //aqui
            //https://stackoverrun.com/es/q/1064113 pasar parametro converttojson
            //ejemplo http://plnkr.co/edit/iE0Vr7sszfqrrDIsR8Wi?p=preview&preview 
    })
}
//AQUI TERMINA DASHBOARD
if (window.location.pathname.match(/\/audioannotations\/edit\//)) {
    // window.Vue = Vue
    Vue.use(VueAxios, axios,colorPicker);
    Vue.component("EditAudioannotations", EditAudioannotations);
    window.vm = new Vue({
        el: '#EditAudioannotations',
        render: h => h(EditAudioannotations)
            //aqui
            //https://stackoverrun.com/es/q/1064113 pasar parametro converttojson
            //ejemplo http://plnkr.co/edit/iE0Vr7sszfqrrDIsR8Wi?p=preview&preview 
    })
}



// No se puede cargar script condicionalmente
if (window.location.pathname.match(/\/collections\/edit\//)) {
    window.editCollectionScripts = editCollectionScripts
    window.editCollectionScripts.fillLangList(app)
    window.editCollectionScripts.fillEntitiesList(app)
}

// Flashea mensaje si lo hay
flashLib.flashManager()