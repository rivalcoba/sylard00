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
// Admin the register form
//import formsManager from '@chelpers/formsManager'
import register from '@client/pages/auth/register.js'
// Collections Create Scripts
import collectionsCreate from '@client/pages/collections/create'
// Collections Edit Scripts
import editCollectionScripts from '@client/pages/collections/edit'
//Collections Index Scripts
import IndexCollectionsScripts from '@client/pages/collections/index'
// ./Test scripts
import indexTestScripts from '@client/pages/index/test'
// Audioannotations Scripts
import createAudioAnnotationsScripts from '@client/pages/audioannotations/create'
// User scripts
import userScriptsIndex from '@client/pages/users/index'

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
import IndexCollections from "@client/templates/components/IndexCollections.vue";
import App3 from '@client/templates/main3.vue'
import Main31 from '@client/templates/main31.vue'
import Main7 from '@client/templates/main7.vue'
import App4 from '@client/templates/main4.vue'
import App5 from '@client/templates/main5.vue'
import App6 from '@client/templates/main6.vue'
import MainUser from '@client/templates/MainUser.vue'
import Genres from '@client/templates/genres.vue'
//AQUÍ TERMINAN
import en from '@client/templates/lang/locals/en_US'
import es from '@client/templates/lang/locals/es_MX'

//data tables
import ElementUI from 'element-ui'
import vuetify from './plugins/vuetify';
import '../node_modules/element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

//----

//Intern
import VueI18n from "vue-i18n";
Vue.use(VueI18n);


const messages = {
    en: {
        lang: en
    },
    es: {
        lang: es
    },
    //  xx:requestURL 

}

// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: "es", // set locale
    fallbackLocale: 'es',
    messages // set locale messages
});

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
    // Improving script loader
switch (window.location.pathname) {
    case `/auth/register`:
        register.init();
        window.register = register;
        break;
}
if (window.location.pathname == `/locations/index`) {
    window.locations = locations_index
}

if (window.location.pathname == `/collections/create`) {
    collectionsCreate.init();
    window.pageScripts = collectionsCreate
}

if (window.location.pathname === '/user' || window.location.pathname === '/users') {
    window.pageScripts = userScriptsIndex
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
        i18n,
        render: h => h(App)
    })
}

//if(window.location.pathname == `/audioannotations/create`){  
if (window.location.pathname == `/audioannotations/uploadfile`) {
    // window.Vue = Vue
    Vue.use(VueAxios, axios, colorPicker);
    Vue.component("LecturaTierEAF", LecturaTierEAF, );
    window.vm = new Vue({
        el: '#app2',
        i18n,
        render: h => h(App2)
            //aqui
            //https://stackoverrun.com/es/q/1064113 pasar parametro converttojson
            //ejemplo http://plnkr.co/edit/iE0Vr7sszfqrrDIsR8Wi?p=preview&preview 
    })

    // Desde aqui poder ejecutar createAudioAnotation() del componente "LecturaTierEAF"
    window.pageScripts = createAudioAnnotationsScripts
}

if (window.location.pathname.match(/\/collections\/index\//)) {
    Vue.use(VueAxios, axios);
    //Vue.component("AudioAnnotationsByCollection", AudioAnnotationsByCollection);
    window.vm = new Vue({
        el: '#main31',
        i18n,
        render: h => h(Main31) // h stands for hyperscript
    })
}

//Dashboard Collections
if (window.location.pathname.match(/\/audioannotations\/index\/readonly\//)) {
    Vue.use(VueAxios, axios);
    //Vue.component("AudioAnnotationsByCollection", AudioAnnotationsByCollection);
    window.vm = new Vue({
        el: '#main7',
        i18n,
        render: h => h(Main7) // h stands for hyperscript
    })
}

if (window.location.pathname == `/audioannotations`) {
    // window.Vue = Vue
    Vue.use(VueAxios, axios);
    Vue.component("FiltroAudioannotations", FiltroAudioannotations);
    window.vm = new Vue({
        el: '#app3',
        i18n,
        render: h => h(App3)
    })
}

//Aquí redirige a la nueva vista de dashboard
if (window.location.pathname == '/dashboard') {
    // window.Vue = Vue
    Vue.use(VueAxios, axios);
    Vue.component("Dashboard", Dashboard);
    window.vm = new Vue({
        el: '#app4',
        i18n,
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
        i18n,
        render: h => h(App5)
            //aqui
            //https://stackoverrun.com/es/q/1064113 pasar parametro converttojson
            //ejemplo http://plnkr.co/edit/iE0Vr7sszfqrrDIsR8Wi?p=preview&preview 
    })
}
//AQUI TERMINA DASHBOARD
//Inicia Index para colecciones
if (window.location.pathname == '/collections') {
    IndexCollectionsScripts.count_items_collections();
    window.IndexCollectionsScript = IndexCollectionsScripts
        // window.Vue = Vue
    Vue.use(VueAxios, axios);
    Vue.component("IndexCollections", IndexCollections);
    window.vm = new Vue({
        el: '#app6',
        i18n,
        render: h => h(App6)
            //aqui
            //https://stackoverrun.com/es/q/1064113 pasar parametro converttojson
            //ejemplo http://plnkr.co/edit/iE0Vr7sszfqrrDIsR8Wi?p=preview&preview 
    })
}
if (window.location.pathname.match(/\/audioannotations\/edit\//)) {
    // window.Vue = Vue
    Vue.use(VueAxios, axios, colorPicker);
    Vue.component("EditAudioannotations", EditAudioannotations);
    window.vm = new Vue({
        el: '#EditAudioannotations',
        i18n,
        render: h => h(EditAudioannotations)
            //aqui
            //https://stackoverrun.com/es/q/1064113 pasar parametro converttojson
            //ejemplo http://plnkr.co/edit/iE0Vr7sszfqrrDIsR8Wi?p=preview&preview 
    })
}

if (window.location.pathname == `/genres/`) {
    //if(window.location.pathname == /audioannotations/vuetest){ 
    // window.Vue = Vue

    console.log("ruta valida");
    Vue.config.productionTip = false
    Vue.use(VueAxios, axios);
    //Vue.component("Usuarios", Usuarios);
    window.vm = new Vue({
        vuetify,
        el: '#appgenres',
        i18n,
        render: h => h(Genres)
    })
}

if (window.location.pathname == `/user`) {
    //if(window.location.pathname == /audioannotations/vuetest){ 
    // window.Vue = Vue

    console.log("ruta valida");
    Vue.config.productionTip = false
    Vue.use(VueAxios, axios);
    //Vue.component("Usuarios", Usuarios);
    window.vm = new Vue({
        vuetify,
        el: '#appmainuser',
        i18n,
        render: h => h(MainUser)
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