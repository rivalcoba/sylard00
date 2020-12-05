<template>
<div id="app" >
    <ReproduceEAF parametro="hola"></ReproduceEAF>
</div>
</template>
props:['parametro'],
<script>
import ReproduceEAF from "./components/ReproduceEAF.vue";

export default {
    name: "App",
    components: {
        ReproduceEAF,
    },
};
</script>
