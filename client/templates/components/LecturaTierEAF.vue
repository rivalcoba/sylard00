<template>
<div>
    Hola vue
</div>
</template>

<script>
export default {
    name: "LecturaTierEAF",
    data() {
        return {
            //data here
            info: [],
            valor: "hello "
        }

    },
    activated() {
        //this.leerTier();
    },
    updated() {
        //this.leerTier();
    },
    mounted() {
        this.axios
            .get("/eaf/Nuevoeaf.json")
            .then((response) => (this.info = response));

    }
}
</script>
