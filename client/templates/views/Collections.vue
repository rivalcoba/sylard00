<template>
    <div id="Collections">
        <section class="container">
            <div class="col-sm-12 contenedor-90vh" id="contenedor_general_mis_colecciones">
                <div class="contenedor_tabla_mis_colecciones">
                    <!-- <Title :text="titulo"/> -->
                    <Thead />
                    <TBody :text="anime" />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Title from '@client/templates/components/Title.vue'
import Thead from '@client/templates/components/Cabecera.vue'
import TBody from '@client/templates/components/Cuerpo.vue'
export default {
    name: 'collections',
    components: {
        Title,
        Thead,
        TBody
    },
    data () {
        return {
            anime: "Naruto Shippuden"
        }   
    }
}
</script>

