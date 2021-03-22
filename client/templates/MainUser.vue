<template>
<div id="app">
    <v-app>
    <tablausuarios></tablausuarios>
    </v-app>
    <CompUsuarios></CompUsuarios>
    
</div>
</template>

<script>
import CompUsuarios from "./components/CompUsuarios.vue";
import Tablausuarios from './components/tablausuarios.vue';

export default {
    name: "App",
    components: {
        CompUsuarios,
        Tablausuarios
    }
};
</script>
    