<template>
    <div id="paginacion">
        <div class="contenedor_paginacion">
            <div class="contenedor_input_paginacion">
                <input type="text" id="busqueda_paginacion"
                placeholder="Pag."/>
              
                <button class="btn_lateral_input" for="busqueda_paginacion">
                    <span class="icono_pagina_busqueda icon-chevron-right"></span>
                </button>
            </div>

            <div class="contenedor_numeros_paginacion">
                <a class="icono_paginacion">
                    <span class="icon-first_page"></span>
                </a>
              
                <a class="icono_paginacion">
                    <span class="icon-angle-left"></span>
                </a>
              
                <a>
                    {{pag}}
                </a>

              
                <a class="icono_paginacion" >
                    <span class="icon-angle-right"></span>
                </a>
                
                <a class="icono_paginacion">
                    <span class="icon-last_page"></span>
                </a>
            </div>
          </div>
    </div>
</template>

<script>
export default {
    name: 'Paginacion',
    setup() {
        
    },
}
</script>