<template>
<div id="app">
    <v-app>
    <genresview></genresview>
    <locations></locations>
    </v-app>
   
    
</div>
</template>

<script>

import Genresview from './components/Genresview.vue';
import Locations from './components/Locations.vue';
export default {
    name: "App",
    components: {
   Genresview,
        Locations
    }
};

     </script>
 