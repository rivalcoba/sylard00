<template>
  <section class="container">
    <div class="col-sm-12 contenedor-90vh" id="contenedor_general_mis_colecciones">
      <div class="contenedor_tabla_mis_colecciones">
        <table class="tabla_mis_colecciones">
          <thead>
            <th class="cabezal_columnas_th" id="th_coleccion">
              <div class="contenedor_etiquetas_barras_busqueda">
                <label class="label label_junto_flechas">{{
                  $t("lang.tabla_coleccion.coleccion")
                }}</label>
                <!--<h1>{{ $t('message.myComponent') }}</h1>-->

                <button
                  id="titulo_on"
                  @click="ordenar_ascendente('titulo_on')"
                  class="flecha_orden_ascendente"
                >
                  <span class="icon-arrow-up"></span>
                </button>
                <button
                  id="titulo_off"
                  @click="ordenar_descendente('titulo_off')"
                  class="flecha_orden_descendente"
                >
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
                <label class="label label_junto_flechas">{{
                  $t("lang.tabla_coleccion.Lenguaterminal")
                }}</label>

                <button
                  id="lengua_on"
                  @click="ordenar_ascendente('lengua_on')"
                  class="flecha_orden_ascendente"
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
                class="input_busqueda"
                type="text"
                id="lengua"
                name="lengua"
                v-model="lengua"
                placeholder="Busqueda"
              />
            </th>
            <th class="cabezal_columnas_th">
              <div class="contenedor_etiquetas_barras_busqueda">
                <label class="label label_junto_flechas">{{$t("lang.tabla_coleccion.gpoLengua")}}</label>
                <button
                  id="lengua_on"
                  @click="ordenar_ascendente('gpo_lenguas_on')"
                  class="flecha_orden_ascendente"
                >
                  <span class="icon-arrow-up"></span>
                </button>
                <button
                  id="lengua_on"
                  @click="ordenar_descendente('gpo_lenguas_off')"
                  class="flecha_orden_descendente"
                >
                  <span class="icon-arrow-down"></span>
                </button>
              </div>
              <input
                class="input_busqueda"
                type="text"
                id="gpo_lengua"
                name="gpo_lengua"
                v-model="gpo_lengua"
                placeholder="Búsqueda"
              />
            </th>
            <th class="cabezal_columnas_th">
              <div class="contenedor_etiquetas_barras_busqueda">
                <label class="label label_junto_flechas">{{$t("lang.tabla_coleccion.comunidades")}}</label>
                <button
                  id="comunidades_on"
                  @click="ordenar_ascendente('comunidades_on')"
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
                class="input_busqueda"
                type="text"
                id="comunidad"
                name="comunidad"
                v-model="comunidad"
                placeholder="Búsqueda"
              />
            </th>
            <th class="" id="th_acciones"></th>
          </thead>
          <tr v-for="(item2, index) in search_titulo" :key="'item' + index">
            <td>
              <strong
                ><i>{{ item2.name }}</i></strong
              >
            </td>
            <td class="" data-label="Lengua terminal (glottocode)">
              <div v-for="(item3, index3) in item2.languages" :key="'item3' + index3">
                {{ item3.language.gid }}
                <span
                  class="lengua_term_comun"
                  data-label="Lengua terminal (nombre común)"
                >
                  {{ item3.language.name }} </span
                ><br />
              </div>
            </td>
            <td class="grupo_lenguas" data-label="Grupo de lenguas (glottocode)">
              <div v-for="(item4, index4) in item2.languages" :key="'item4' + index4">
                {{ item4.LanguageGroup.gid
                }}<span
                  class="grupo_lengua_comun"
                  data-label="Grupo de lenguas (nombre común)"
                  >{{ item4.LanguageGroup.name }}</span
                ><br />
              </div>
            </td>
            <td id="mostrar-hr" class="comunidades">
              <div v-for="(item5, index5) in item2.localities" :key="'item5' + index5">
                <span class="pais"> {{ item5.Nom_Ent }}</span
                ><span class="comunidad">{{ item5.Nom_Loc }}</span
                ><span class="municipio_tabla">{{ item5.Nom_Mun }}</span
                ><span class="localizacion">
                  {{ item5.Lat_Decimal }}, {{ item5.Lon_Decimal }}</span
                >
                <hr class="hr_divisor_comunidad" />
              </div>
            </td>
            <td class="td_acciones">
              <div class="contenedor_botones_accion">
                <button
                  @click="showCollect(item2.name, item2.description)"
                  aria-hidden="true"
                  class="btn_accion_tabla"
                >
                  <span class="icono_accion_tabla icon-info1"></span>
                </button>
                <a
                  class="btn_accion_tabla"
                  v-bind:href="'/collections/index/' + item2._id"
                  ><span class="icono_accion_tabla icon-launch"></span
                ></a>
                <button class="dropdown-trigger" @click="elipsis(index)">
                  <span class="icono_accion_tabla icon-ellipsis-v"></span>
                </button>
                <!--<div class="contenedor_opciones_elipsis">
                  <a
                    v-bind:href="'/collections/delete/' + item2._id"
                    class="btn_opciones_ellipsis_mis_colecciones"
                    ><span class="icono_opcion_elipsis icon-edit"></span> Eliminar</a
                  >
                </div>-->
                <!--TODO FALTA APLICAR LAS RUTAS DE CARGA, EDICIÓN, ELIMINANCIÓN Y HABILITAR EL ELIPISIS
              <div v-if="bandera_elipsiss">    bandera_elipsiss:false,
      activeClass: 'contenido_modal_elipsis',  
                <div v-if=elipsis"> -->
               <div v-if="item_index==index"  v-bind:class="{ contenido_modal_elipsis: bandera_elipsiss }" v-bind:style="contenido_modal_elipsis">
                  <span v-on:click="elipsis($event)" class="icono_cerrar_modal_elipsis icon-close"></span>
                  <div class="contenedor_opciones_elipsis">
                    <a v-bind:href="'/audioannotations/create'" class="btn_opciones_ellipsis_mis_colecciones"
                      ><span class="icono_opcion_elipsis icon-file_upload"></span> Cargar
                      audioanotación</a
                    >
                    <a v-bind:href="'/collections/edit/' + item2._id" class="btn_opciones_ellipsis_mis_colecciones"
                      ><span class="icono_opcion_elipsis icon-edit"></span> Editar
                      metadatos</a
                    >
                      <a
                      v-bind:href="'/collections/delete/' + item2._id"
                        class="btn_opciones_ellipsis_mis_colecciones"
                        ><span class="icono_opcion_elipsis icon-delete"></span>
                        Eliminar</a
                      >
                  </div>
                </div>
               </div>
            <!--   </div>-->
            </td>
          </tr>
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
              v-bind:class="[
                pag == isActived ? 'numero_paginacion active' : 'numero_paginacion',
              ]"
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
</template>

<script>
export default {
  name: "IndexCollections",
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
      idioma: "es",
      bandera_elipsiss:true,
      activeClass: 'contenido_modal_elipsis',
      item_index:"",
       contenido_modal_elipsis:{
      background: '#fefefe',
      width: '13rem !important',
      position: 'absolute !important',
      top: '-34px !important',
      left: '-8.25rem !important',
      border: '2px solid var(--color-primario-principal)',
      "border-radius": '.375rem',
      "z-index": '1'
      } 
    };
  },
  methods: {
    elipsis: function(index, event) {
      if (this.bandera_elipsiss) {
        if (event) event.preventDefault()
        this.bandera_elipsiss=false
          this.item_index=index 
        

      } else 
      {
      this.bandera_elipsiss=true
    this.item_index=""
      }
      
     
    },
    borrarCollection(collection_id) {
      var currentUrl = window.location.pathname;
      const url = `${currentUrl}/delete/${collection_id}`;
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
            console.log("si se borro " + collection_id);
            let index = this.notas_audioannotations.findIndex(
              (item) => item._id === collection_id
            );
            console.log(index);
            this.notas_audioannotations.splice(index, 1);
            console.log(url);
          },
          (error) => {
            console.log("no se borro " + "/collections/delete/" + collection_id);
            console.log(url);
            console.log(error);
          }
        );
    },
    showCollect(title,  text) {
      //Aqui se utiizan las funciones o estilos de SweetAlert
      console.log("title " + title + "text " + text);
      this.$swal({
        //title: title,
        //text: text,
        html:
        `<h3 class="sa_titulo_coleccion"><code>${title}</code></h3>` + 
        `<p class="sa_parrafo_grande"><code>${text}</code></p>`,
        icon: 'info',
        showCloseButton: true,
        showConfirmButton: true,
        buttonsStyling:false,
        confirmButtonText:
        'Entiendo',
        confirmButtonAriaLabel: 'Entendido',
        customClass: {
        container: '',
        popup:'sa-popup',
        //header: 'sa_header',
        title: 'sa_title',
        icon:'sa_icon',
        text: 'sa_parrafo_grande',
        confirmButton: 'btn btn-predeterminado sa_btn_confirm', //resolver focus en css,
        cancelButton: 'btn btn-secundario sa_btn',
        footer: 'secundario'
  },
      });
    },
    ordenar_descendente: function (e) {
      //falta ordenar
      console.log(
        "******************Esta entrando ordenar_descendente ******** " +
          e +
          " ************ " +
          e
      );
      if (e == "titulo_off") {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
      } else if (e == "lengua_off") {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.languages[0].language.name > b.languages[0].language.name) {
            return -1;
          }
          if (a.languages[0].language.name < b.languages[0].language.name) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
      } else if (e == "gpo_lenguas_off") {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.languages[0].LanguageGroup.name > b.languages[0].LanguageGroup.name) {
            return -1;
          }
          if (a.languages[0].LanguageGroup.name < b.languages[0].LanguageGroup.name) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
      } else if (e == "comunidad_off") {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.localities[0].Nom_Loc > b.localities[0].Nom_Loc) {
            return -1;
          }
          if (a.localities[0].Nom_Loc < b.localities[0].Nom_Loc) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
      } else if (e == "genero_off") {
        console.log("Entrando en el off");
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
      } else if (e == "hablantes_off") {
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
      console.log(
        "******************Esta entrando ordenar_ascendente ******** " +
          e +
          " ************ " +
          e
      );

      if (e == "titulo_on") {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      } else if (e == "lengua_on") {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.languages[0].language.name > b.languages[0].language.name) {
            return 1;
          }
          if (a.languages[0].language.name < b.languages[0].language.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      } else if (e == "gpo_lenguas_on") {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.languages[0].LanguageGroup.name > b.languages[0].LanguageGroup.name) {
            return 1;
          }
          if (a.languages[0].LanguageGroup.name < b.languages[0].LanguageGroup.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      } else if (e == "comunidades_on") {
        console.log("Entrando comunidades_on en el on");
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.localities[0].Nom_Loc > b.localities[0].Nom_Loc) {
            return 1;
          }
          if (a.localities[0].Nom_Loc < b.localities[0].Nom_Loc) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      } else if (e == "genero_on") {
        console.log("Entrando genero en el on");
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
      } else if (e == "hablantes_on") {
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
      self.axios.get("collections/api/read_all/" + page).then((response) => {
        self.notas_audioannotations = response.data.itemsList;
        self.paginacion = response.data.paginator;
        self.pagina = self.paginacion;
        //console.log(response.data)
      });
    },
  },
  mounted() {
    var self = this;
    self.axios.get("collections/api/read_all/1").then((response) => {
      self.notas_audioannotations = response.data.itemsList;
      self.paginacion = response.data.paginator;
      self.pagina = self.paginacion;
      //console.log(response.data)
    });
    self.axios.get("i18n").then((response) => {
      self.idioma = response.data.LANGUAGE;
      if (self.idioma === "es") {
        //console.log("esta en español");
        this.$i18n.locale = "es";
      } else if (self.idioma === "en") {
        //console.log("esta en ingles");
        this.$i18n.locale = "en";
      }
    });
  },
  //ESTA FUNCIÓN ES LA QUE SE ENCARGA DE HACER LA BÚSQUEDA EN LA TABLA
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
          item.name.toLowerCase().includes(this.titulo.toLowerCase())
        );
      } else if (this.lengua.length > 2) {
        return this.notas_audioannotations.filter((item) =>
          item.languages[0].language.name
            .toLowerCase()
            .includes(this.lengua.toLowerCase())
        );
      } else if (this.gpo_lengua.length > 2) {
        return this.notas_audioannotations.filter((item) =>
          item.languages[0].LanguageGroup.name
            .toLowerCase()
            .includes(this.gpo_lengua.toLowerCase())
        );
      } else if (this.comunidad.length > 2) {
        return this.notas_audioannotations.filter((item) =>
          item.localities[0].Nom_Loc.toLowerCase().includes(this.comunidad.toLowerCase())
        );
      }
      return this.notas_audioannotations;
    },
  },
};
</script>
