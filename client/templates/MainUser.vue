<template>
<div id="app">
    <v-app>
    <tablausuarios></tablausuarios>
    <genresview></genresview>
   
    
    </v-app>
   
    
</div>
</template>

<script>
import Genresview from './components/Genresview.vue';

//import CompUsuarios from "./components/CompUsuarios.vue";
import Tablausuarios from './components/tablausuarios.vue';
//import Tablausuariosprop from './components/tablausuariosprop.vue';

export default {
    name: "App",
    components: {
       
        Tablausuarios,
        Genresview,
        
    }
};
</script>
    