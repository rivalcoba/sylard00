<template>
<div id="app" class="container">
    <!-- <img alt="Vue logo" src="./assets/logo.png">-->
    <div id="contenedor">
        <div id="cabecera"></div>
        <div id="menu">
            <ul></ul>
        </div>
        <div id="contenido"></div>
        <div id="pie"></div>
    </div>
    <ReproduceEAF> </ReproduceEAF>
</div>
</template>

<script>
import ReproduceEAF from "./components/ReproduceEAF.vue";
export default {
    name: "App",
    components: {
        ReproduceEAF,
    },
};
</script>
