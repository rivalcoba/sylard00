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
import TBody from './components/Cuerpo.vue'
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
        return {
            title1: 'Naruto',
            names: {},
            names_director: '',
            participantOrdenado: [],
            tier: [],
            result: null,
            otro: 'nuevo',
            notas_audioannotations: [],
            paginacion: '',
            pagina: '',
            titulo: '',
            lengua: '',
            gpo_lengua: '',
            comunidad: '',
            hablantes: '',
            genero: '',
            status_super_user: false,
            bandera_titulo: false,
            bandera_lengua: false,
            bandera_gpo_lengua: false,
            bandera_comunidad: false,
            bandera_hablantes: false,
            bandera_genero: false,
            pagina_buscar: '',
            valor_buscar: false,
            idioma: 'es',
            bandera_elipsiss: true,
            activeClass: 'contenido_modal_elipsis',
            item_index: '',
            contenido_modal_elipsis: {
                background: '#fefefe',
                width: '13rem !important',
                position: 'absolute !important',
                top: '-34px !important',
                left: '-8.25rem !important',
                border: '2px solid var(--color-primario-principal)',
                'border-radius': '.375rem',
                'z-index': '1',
            },
        }
    },
}
</script>