<template>
    <div id="Collection">
        <section class="container">
            <div class="col-sm-12 contenedor-90vh" id="contenedor_general_mis_colecciones">
                <div class="contenedor_tabla_mis_colecciones">
                    <table>
                        <Thead />
                    </table>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Thead from './components/Thead.vue'
export default {
    name: 'Collection',
    components: {
        Thead
    },
    setup() {
        
    },
}
</script>