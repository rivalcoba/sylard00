<template>
    <div id="Collection">
        <section class="container">
            <div class="col-sm-12 contenedor-90vh" id="contenedor_general_mis_colecciones">
                <div class="contenedor_tabla_mis_colecciones">
                    <table>
                        <Thead />
                        <TBody />
                    </table>
                    <Paginacion />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Thead from './components/Thead.vue'
import TBody from './components/TBody.vue'
import Acciones from './components/Acciones.vue'
import Paginacion from './components/Paginacion.vue'

export default {
    name: 'Collection',
    components: {
        Thead,
        TBody,
        Acciones,
        Paginacion
    },
    setup() {
        
    },
}
</script>