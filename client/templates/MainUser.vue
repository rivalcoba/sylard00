<template>
<div id="app">
    <v-app>
    <tablausuarios></tablausuarios>
    <tablausuariosprop></tablausuariosprop>
    </v-app>
   
    
</div>
</template>

<script>
//import CompUsuarios from "./components/CompUsuarios.vue";
import Tablausuarios from './components/tablausuarios.vue';
import Tablausuariosprop from './components/tablausuariosprop.vue';

export default {
    name: "App",
    components: {
       
        Tablausuarios,
        Tablausuariosprop
    }
};
</script>
    