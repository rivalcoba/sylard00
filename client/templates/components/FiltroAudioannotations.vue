<template>
  <div class="container-fluid" id="contenedor_audioanotaciones">
    <div class="container-fluid" id="cabezal_audioanotaciones">
      <div class="container">
        <div class="col-sm-12" id="contenedor_items_cabezal_audioanotaciones">
          <div class="" id="contenedor_titulos_cabezal_audioanotaciones">
            <h1 id="titulo_audioanotaciones">
              <span class="icono_cabezal icon-file-sound-o"></span> Audioanotaciones
            </h1>
            <h4
              class="etiqueta_nombre_coleccion_audioanotaciones"
              id="etiqueta_coleccion_audioanotaciones"
            >
              De la colección
            </h4>
            <!--NOMBRE DE LA COLECCIÓN EN ENCABEZADO-->
            <h3 class="nombre_coleccion_audioanotaciones blanco">
              Estudio Florístico y Etnobotánico de Comunidades Mixtecas en el Municipio de
              San Luis Acatlán<button
                class="btn_info_coleccion_cabezal_coleccion_audioanotaciones"
                id="coleccion_info_general_cabezal"
              >
                <span class="icono_info_coleccion_audioanotacion icon-info1"></span>
              </button>
            </h3>
            <h4 class="blanco gpo_lenguas_audioanotaciones">
              Grupo de lenguas:
              <strong
                >Amuzgo-mixtecan
                <span class="gpo_lenguas_glottocode_info">[amuz1253]</span></strong
              >
            </h4>
          </div>
          <div class="" id="contenedor_botones_cabezal">
            <button class="btn btn-predeterminado">
              Editar colección <span class="icono_boton icon-edit"></span>
            </button>
            <button
              onclick="window.location.href = '/audioannotations/create'"
              class="btn btn-primario"
            >
              Cargar audioanotacion <span class="icono_boton icon-file_upload"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <section class="container">
      <div class="col-sm-12 contenedor-90vh" id="contenedor_general_mis_colecciones">
        <div class="contenedor_tabla_mis_colecciones">
          <table class="tabla_catalogo_audianotaciones">
            <thead>
              <th class="cabezal_columnas_th" id="th_acciones_generales">
                <div class="contenedor_acciones_generales">
                  <input type="checkbox" class="input_checkbox_cabezal_columna prueba" />
                  <button class="btn-eliminar_seleccionados prueba">
                    <span
                      class="icono_boton_eliminar_audioanotaciones icon-delete"
                    ></span>
                  </button>
                </div>
              </th>
              <th class="cabezal_columnas_th" id="th_titulo_por_audioanotacion">
                <div class="contenedor_etiquetas_barras_busqueda">
                  <label class="label label_junto_flechas">Título</label>
                     <button
                    id="titulo_on"
                    @click="ordenar_ascendente('titulo_on')"
                    class="flecha_orden_ascendente"
                  >
                    <span class="icon-arrow-up"></span></button
                  >
                  <!--PENDIENTE TOÑO LA INSTRUCCIÓN DE VUE V-MODEL NO FUNCIONA PARA BUTTONS-->
                  <button id="titulo_off" @click="ordenar_descendente('titulo_off')" class="flecha_orden_descendente">
                    <span class="icon-arrow-down"></span>
                  </button>
                </div>
                <input
                  id="titulo"
                  name="titulo"
                  v-model="titulo"
                  class="input_busqueda"
                  type="search"
                  placeholder="Búsqueda"
                />
              </th>

             <th class="cabezal_columnas_th">
                <div class="contenedor_etiquetas_barras_busqueda">
                  <label class="label label_junto_flechas">Lengua terminal</label>
                  <button
                    id="lengua_on"
                    @click="ordenar_ascendente('lengua_on')"
                    class="flecha_orden_ascendente active"
                  >
                    <span class="icon-arrow-up"></span>
                  </button>
                  <button
                    id="lengua_off"
                    @click="ordenar_descendente('lengua_off')"
                    class="flecha_orden_descendente"
                  >
                    <span class="icon-arrow-down"></span>
                  </button>
                </div>
                <input
                  type="text"
                  id="lengua"
                  name="lengua"
                  v-model="lengua"
                  class="input_busqueda"
                  placeholder="Búsqueda"
                />
              </th>
              <th class="cabezal_columnas_th">
                <div class="contenedor_etiquetas_barras_busqueda">
                  <label class="label label_junto_flechas">Comunidad</label>
                  <button
                    id="comunidad_on"
                    @click="ordenar_ascendente('comunidad_on')"
                    class="flecha_orden_ascendente"
                  >
                    <span class="icon-arrow-up"></span>
                  </button>
                  <button
                    id="comunidad_off"
                    @click="ordenar_descendente('comunidad_off')"
                    class="flecha_orden_descendente"
                  >
                    <span class="icon-arrow-down"></span>
                  </button>
                </div>
                <input
                  type="text"
                  id="comunidad"
                  name="comunidad"
                  v-model="comunidad"
                  class="input_busqueda"
                  placeholder="Búsqueda"
                />
              </th>
          <th class="cabezal_columnas_th" id="th_hablantes">
                <div class="contenedor_etiquetas_barras_busqueda">
                  <label class="label label_junto_flechas">Hablantes</label>
                  <button
                    id="hablantes_on"
                    @click="ordenar_ascendente('hablantes_on')"
                    class="flecha_orden_ascendente"
                  >
                    <span class="icon-arrow-up"></span>
                  </button>
                  <button
                    id="hablantes_off"
                    @click="ordenar_descendente('hablantes_off')"
                    class="flecha_orden_descendente"
                  >
                    <span class="icon-arrow-down"></span>
                  </button>
                </div>
                <input
                  id="hablantes"
                  name="hablantes"
                  v-model="hablantes"
                  class="input_busqueda"
                  type="search"
                  placeholder="Búsqueda"
                />
              </th>
              <th class="cabezal_columnas_th">
                <div class="contenedor_etiquetas_barras_busqueda">
                  <label class="label label_junto_flechas">Género y duracion</label>
                  <button
                    id="genero_on"
                    @click="ordenar_ascendente('genero_on')"
                    class="flecha_orden_ascendente"
                  >
                    <span class="icon-arrow-up"></span>
                  </button>
                  <button
                    id="genero_off"
                    @click="ordenar_descendente('genero_off')"
                    class="flecha_orden_descendente"
                  >
                    <span class="icon-arrow-down"></span>
                  </button>
                </div>
                <input
                  id="genero"
                  name="genero"
                  v-model="genero"
                  class="input_busqueda"
                  type="search"
                  placeholder="Búsqueda"
                />
              </th>
              <th class="contenedor_btn_regresar_th" id="th_acciones">
                <div class="contenedor_boton_accion_cabeza_tabla_audioanotaciones">
                  <button
                    class="btn-regresar_audioanotaciones"
                    id="btn-regresar_audioanotaciones"
                  >
                    <span onclick="window.location.href = '/dashboard'" class="icono_boton_eliminar_audioanotaciones icon-back"><!--TODO AQUI---></span>
                  </button>
                </div>
              </th>
            </thead>

            <tbody v-for="(item2, index) in search_titulo" :key="'item' + index">
              <tr>
                <td>
                  <label class="contenedor_checkbox">
                    <input type="checkbox" class="checkbox_personalizada" />
                    <span class="marca_check"></span>
                  </label>
                </td>
                <td class="titulo_audioanotacion_tabla" data-label="titulo">
                  {{ item2.title
                  }}<!--<i>(Malvaceae: Guazuma ulmifolia Lam. var.  ulmifolia)</i>--><span
                    class="unique_id"
                    data-label="unique_id"
                    >UID:xxx xxxxxxx xx</span
                  >
                </td>

                <td class="" data-label="Lengua terminal (glottocode)">
                  {{ item2.gid.language.gid
                  }}<span
                    class="lengua_term_comun"
                    data-label="Lengua terminal (nombre común)"
                    >{{ item2.gid.language.name }}</span
                  >
                </td>

                <td>
                  <!--td class=""><span class="pais">México</span><span class="estado">Guerrero</span--><span
                    class="comunidad_2"
                    >{{ item2.location.Nom_Loc }}</span
                  ><br /><span class="estado_tabla_catalogo">{{
                    item2.location.Nom_Ent
                  }}</span
                  ><!--span class="municipio_tabla">San Luis Acatlán</span><span class="localizacion">16.816020, -98.685990</span-->
                </td>
                <td class="">
                  <div
                    v-for="(item3, index) in item2.TIER"
                    :key="'item' + index"
                    class="contenedor_hablantes"
                  >
                    <span class="hablante"> {{ item3.PARTICIPANT }}</span
                    ><br /><span class="canal">Canal {{ index + 1 }}</span>
                  </div>
                </td>
                <td>
                  <span class="genero">{{ item2.genre.name }}</span>
                  <span class="duracion">{{ item2.duration }}</span>
                </td>
                <td class="td_acciones">
                  <div class="contenedor_botones_accion">
                    <button
                      aria-hidden="true"
                      class="btn_accion_tabla"
                      id="coleccion_info"
                      @click="showAudio(item2.title,item2.description)">
                      <span class="icono_accion_tabla icon-info1"></span>
                    </button>
                   
                    <button class="btn_accion_tabla">
                      <span class="icono_accion_tabla icon-launch"></span>
                    </button>
                     <button class='dropdown-trigger'><span
                    class="icono_accion_tabla icon-ellipsis-v"></span></button>
                    <div class=''><!--TODO FALTA PONER LA CLASE MODAL-->
                  <span class="icono_cerrar_modal_elipsis icon-close "></span>
                  <div class="contenedor_opciones_elipsis">
                    <a v-bind:href="'/audioannotations/vuetest/' + item2._id" class="btn_opciones_ellipsis_mis_colecciones"><span
                        class="icono_opcion_elipsis icon-file_upload"></span> Reproducir Audioanotación</a>
                    <a v-bind:href="'/audioannotations/edit/' + item2._id" class="btn_opciones_ellipsis_mis_colecciones"><span
                        class="icono_opcion_elipsis icon-edit"></span> Editar Audioanotación</a>
                  </div>
                </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="contenedor_paginacion">
            <div class="contenedor_input_paginacion">
              <input
                class=""
                id="busqueda_paginacion"
                v-model="pagina_buscar"
                type="text"
                placeholder="Pag."
              />
              <button
                class="btn_lateral_input"
                for="busqueda_paginacion"
                @click="getPage(pagina_buscar)"
              >
                <span class="icono_pagina_busqueda icon-chevron-right"></span>
              </button>
            </div>
            <div class="contenedor_numeros_paginacion">
              <a
                v-if="paginacion.hasPrevPage"
                class="icono_paginacion"
                href="#"
                @click.prevent="getPage(1)"
                ><span v-if="paginacion.hasPrevPage" class="icon-first_page"></span
              ></a>
              <a
                v-if="paginacion.hasPrevPage"
                class="icono_paginacion"
                href="#"
                @click.prevent="getPage(pagina.prev)"
                ><span v-if="paginacion.hasPrevPage" class="icon-angle-left"></span
              ></a>
              <a
                v-for="(pag, index) in pagesNumber"
                :key="index"
                 v-bind:class="[pag== isActived ? 'numero_paginacion active':  'numero_paginacion'  ]" 
               href="#"
                @click.prevent="getPage(pag)"
                >{{ pag }}</a
              >
         
              <!--<a v-if="paginacion.hasNextPage" class="ultima_pagina" href="#" @click.prevent="getPage(pagina.pageCount)"
                >...{{ paginacion.pageCount }}</a
              >-->
              <a class="icono_paginacion" href="#" @click.prevent="getPage(pagina.next)"
                ><span v-if="paginacion.hasNextPage" class="icon-angle-right"></span
              ></a>
              <a
                v-if="paginacion.hasNextPage"
                class="icono_paginacion"
                href="#"
                @click.prevent="getPage(pagina.pageCount)"
                ><span v-if="paginacion.hasNextPage" class="icon-last_page"></span
              ></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "FiltroAudioannotations",
  props: {
    parametro: Object,
  },
  data() {
    return {
      participantOrdenado: [],
      tier: [],
      result: null,
      otro: "nuevo",
      notas_audioannotations: [],
      paginacion: "",
      pagina: "",
      titulo: "",
      lengua: "",
      gpo_lengua: "",
      comunidad: "",
      hablantes: "",
      genero: "",

      bandera_titulo: false,
      bandera_lengua: false,
      bandera_gpo_lengua: false,
      bandera_comunidad: false,
      bandera_hablantes: false,
      bandera_genero: false,
      pagina_buscar: "",

      valor_buscar: false,
    };
  },
  methods: {
    showAudio(title,text) {
      //Aqui se utiizan las funciones o estilos de SweetAlert
      this.$swal({
        title: title,
        text: text,
        showCloseButton: true,
      })
    },
    borrarAudioanotacion(audioannotation_id) {
      var currentUrl = window.location.pathname;
      const url = `${currentUrl}/delete/${audioannotation_id}`;
      // /audioannotations/delete/{{_id}}?_method=DELETE
      console.log(url);
      this.axios
        .delete(url)
        // .then(res => {
        //               if (res.data === 'ok')
        //                   commit('DELETE_POST', audioannotation_id)
        //           }).catch(err => {
        //           console.log(err)
        //       })
        .then(
          (response) => {
            console.log("si se borro " + audioannotation_id);
            let index = this.notas_audioannotations.findIndex(
              (item) => item._id === audioannotation_id
            );
            console.log(index);
            this.notas_audioannotations.splice(index, 1);
            console.log(url);
          },
          (error) => {
            console.log(
              "no se borro " + "/audioannotations/delete/" + audioannotation_id
            );
            console.log(url);
            console.log(error);
          }
        );
    },

    cambiovalor(e) {
      console.log("valor " + e.target.value);
    },
    sacarTierParticipant() {
      this.notas_audioannotations.TIER.forEach((element) => {
        tier.push(element);
      });
    },
    getTodos() {
      this.axios.get("audioannotations/filter").then((response) => {
        this.notas_audioannotations = response.data;
        //console.log(response.data)
      });
    },
  ordenar_descendente: function (e) {
      //falta ordenar
      console.log("******************Esta entrando ordenar_descendente ******** "+e+" ************ "+e)
      if (e=="titulo_off") {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.title > b.title) {
            return -1;
          }
          if (a.title < b.title) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
      } else if (e=="lengua_off") {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.gid.language.name > b.gid.language.name) {
            return -1;
          }
          if (a.gid.language.name < b.gid.language.name) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
      } else if (this.bandera_gpo_lengua) {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.gid.LanguageGroup.name > b.gid.LanguageGroup.name) {
            return -1;
          }
          if (a.gid.LanguageGroup.name < b.gid.LanguageGroup.name) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
      } else if (e=="comunidad_off") {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.location.Nom_Loc > b.location.Nom_Loc) {
            return -1;
          }
          if (a.location.Nom_Loc < b.location.Nom_Loc) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
      } else if (e=="genero_off") {
        console.log("Entrando en el off")
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.genre.name > b.genre.name) {
            return -1;
          }
          if (a.genre.name < b.genre.name) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
      } else if (e=="hablantes_off") {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.TIER[0].PARTICIPANT > b.TIER[0].PARTICIPANT) {
            return -1;
          }
          if (a.TIER[0].PARTICIPANT < b.TIER[0].PARTICIPANT) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
      }
    },
    ordenar_ascendente: function (e) {
      //falta ordenar
      console.log("******************Esta entrando ordenar_ascendente ******** "+e+" ************ "+e)

      if (e=="titulo_on") {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.title > b.title) {
            return 1;
          }
          if (a.title < b.title) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      } else if (e=="lengua_on") {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.gid.language.name > b.gid.language.name) {
            return 1;
          }
          if (a.gid.language.name < b.gid.language.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      } else if (this.bandera_gpo_lengua) {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.gid.LanguageGroup.name > b.gid.LanguageGroup.name) {
            return 1;
          }
          if (a.gid.LanguageGroup.name < b.gid.LanguageGroup.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      } else if (e=="comunidad_on") {
         console.log("Entrando comunidad_on en el on")
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.location.Nom_Loc > b.location.Nom_Loc) {
            return 1;
          }
          if (a.location.Nom_Loc < b.location.Nom_Loc) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      } else if (e=="genero_on") {
          console.log("Entrando genero en el on")
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.genre.name > b.genre.name) {
            return 1;
          }
          if (a.genre.name < b.genre.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      } else if (e=="hablantes_on") {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.TIER[0].PARTICIPANT > b.TIER[0].PARTICIPANT) {
            return 1;
          }
          if (a.TIER[0].PARTICIPANT < b.TIER[0].PARTICIPANT) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }
    },
    getPage: function (page) {
      if (page > this.paginacion.pageCount) {
        page = this.paginacion.pageCount;
      }
      if (page <= 0) {
        page = 1;
      }

      var self = this;
      self.axios.get("/audioannotations/filter/" + page).then((response) => {
        self.notas_audioannotations = response.data.itemsList;
        self.paginacion = response.data.paginator;
        self.pagina = self.paginacion;
        //console.log(response.data)
      });
    },
  },
  mounted() {
    var self = this;
    self.axios.get("/audioannotations/filter/1").then((response) => {
      self.notas_audioannotations = response.data.itemsList;
      self.paginacion = response.data.paginator;
      self.pagina = self.paginacion;
      //console.log(response.data)
    });
  },
  computed: {
    // bandera_titulo: false,
    //       bandera_lengua: false,
    //       bandera_gpo_lengua: false,
    //       bandera_comunidad: false,
    //       bandera_hablantes: false,
    //       bandera_genero: false,
    isActived: function () {
      return this.paginacion.currentPage;
    },
    pagesNumber: function () {
      if (!this.paginacion.pageCount) {
        return [];
      }
      var from = this.paginacion.currentPage - 2; //TODO offset
      if (from < 1) {
        from = 1;
      }
      var to = from + 2 * 2; //todo
      if (to >= this.paginacion.pageCount) {
        to = this.paginacion.pageCount;
      }
      var pagesArray = [];
      while (from <= to) {
        pagesArray.push(from);
        from++;
      }
      return pagesArray;
    },
    search_titulo: function () {
      if (this.titulo.length > 2) {
        return this.notas_audioannotations.filter((item) =>
          item.title.toLowerCase().includes(this.titulo.toLowerCase())
        );
      } else if (this.lengua.length > 2) {
        return this.notas_audioannotations.filter((item) =>
          item.gid.language.name.toLowerCase().includes(this.lengua.toLowerCase())
        );
      } else if (this.gpo_lengua.length > 2) {
        return this.notas_audioannotations.filter((item) =>
          item.gid.LanguageGroup.name
            .toLowerCase()
            .includes(this.gpo_lengua.toLowerCase())
        );
      } else if (this.comunidad.length > 2) {
        return this.notas_audioannotations.filter((item) =>
          item.location.Nom_Loc.toLowerCase().includes(this.comunidad.toLowerCase())
        );
      } else if (this.hablantes.length > 2) {
        return this.notas_audioannotations.filter((item) =>
          item.TIER[0].PARTICIPANT.toLowerCase().includes(this.hablantes.toLowerCase())
        ); //sacarTierParticipant
      } else if (this.genero.length > 2) {
        return this.notas_audioannotations.filter((item) =>
          item.genre.name.toLowerCase().includes(this.genero.toLowerCase())
        );
      }
      return this.notas_audioannotations;
    },
  },
};
</script>
