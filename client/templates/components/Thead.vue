<template>
    <div id="thead">
        <table class="tabla_mis_colecciones">
            <thead>
                <th class="cabezal_columnas_th" id="th_coleccion">
                    <div class="contenedor_etiquetas_barras_busqueda">
                        <label class="label label_junto_flechas">
                            {{$t('lang.tabla_coleccion.coleccion')}}
                        </label>
                                    
                        <button class="flecha_orden_ascendente"
                        id="titulo_on">
                            <span class="icon-arrow-up"></span>
                        </button>

                        <button class="flecha_orden_descendente"
                        id="titulo_off">
                            <span class="icon-arrow-down"></span>
                        </button>
                    </div>

                    <input class="input_busqueda" type="search" id="titulo"
                    name="titulo" placeholder="Búsqueda" v-model="titulo"
                    @input="searching_by_collection()">
                </th>

                <th class="cabezal_columnas_th">
                    <div class="contenedor_etiquetas_barras_busqueda">
                        <label class="label label_junto_flechas">
                            {{$t('lang.tabla_coleccion.Lenguaterminal')}}
                        </label>

                        <button class="flecha_orden_ascendente"
                        id="titulo_on">
                            <span class="icon-arrow-up"></span>
                        </button>

                        <button class="flecha_orden_descendente"
                        id="titulo_off">
                            <span class="icon-arrow-down"></span>
                        </button>
                    </div>

                    <input class="input_busqueda" type="search" id="titulo"
                    name="titulo" placeholder="Búsqueda" v-model="titulo"
                    @input="searching_by_collection()">
                </th>

                <th class="cabezal_columnas_th">
                    <div class="contenedor_etiquetas_barras_busqueda">
                        <label class="label label_junto_flechas">
                            {{$t('lang.tabla_coleccion.gpoLengua')}}
                        </label>

                        <button class="flecha_orden_ascendente"
                        id="titulo_on">
                            <span class="icon-arrow-up"></span>
                        </button>

                        <button class="flecha_orden_descendente"
                        id="titulo_off">
                            <span class="icon-arrow-down"></span>
                        </button>
                    </div>

                    <input class="input_busqueda" type="search" id="titulo"
                    name="titulo" placeholder="Búsqueda" v-model="titulo"
                    @input="searching_by_collection()">
                </th>

                <th class="cabezal_columnas_th">
                    <div class="contenedor_etiquetas_barras_busqueda">
                        <label class="label label_junto_flechas">
                            {{$t('lang.tabla_coleccion.comunidades')}}
                        </label>

                        <button class="flecha_orden_ascendente"
                        id="titulo_on">
                            <span class="icon-arrow-up"></span>
                        </button>

                        <button class="flecha_orden_descendente"
                        id="titulo_off">
                            <span class="icon-arrow-down"></span>
                        </button>
                    </div>

                    <input class="input_busqueda" type="search" id="titulo"
                    name="titulo" placeholder="Búsqueda" v-model="titulo"
                    @input="searching_by_collection()">
                </th>
            </thead>
        </table>
    </div>
</template>