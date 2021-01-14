<template>
  <div class="container-fluid" id="contenedor_catalogo">
    <div class="container">
      <div class="col-sm-12 contenedor_cabezal_catalogo" id="">
        <img
          src="images/leon_catalogo.svg"
          alt="Imagen ornamental de textil de Huichapan"
          class=""
          id="imagen_de_catalogo"
        />
        <div class="" id="contenedor_texto_cabezal_catalogo">
          <h1 class="">Bienvenido a nuestro catálogo</h1>
          <h2 class="llamada" id="llamada_catalogo">
            ¡Disfruta de la diversidad de nuestras audioanotaciones!
          </h2>
        </div>
      </div>

      <section class="container contenedor-90vh" id="contenedor_listado_catalogo">
        <div class="contenedor_switch_visualizar_por_en_catalogo">
          <label class="label" for="" id="">Visualizar por:</label>
          <div class="contenedor_switch_visualizacion_catalogo">
            <label
              class="swich_etiqueta_opcion1"
              for="checkbox_coleccion"
              id="switch_visualizar_por_audioanotacion"
              >Audioanotación</label
            >
            <label class="switch_general">
              <input
                type="checkbox"
                onclick="window.location.href ='/dashboard'"
                class="checkbox_coleccion"
                id="checbox_coleccion"
                unchecked />
              <span class="slider_general round"></span
            ></label>
            <label
              class="swich_etiqueta_opcion2"
              for="checkbox_coleccion"
              id="switch_visualizar_por_coleccion"
              >Colección</label
            >
          </div>

          <div class="contenedor_tabla_catalogo_audioanotaciones">
            <table class="tabla_catalogo_audianotaciones">
              <thead>
                <th class="cabezal_columnas_th" id="th_titulo_por_audioanotacion">
                  <div class="contenedor_etiquetas_barras_busqueda">
                    <label class="label label_junto_flechas">Título</label>
                    <button
                      id="titulo_on"
                      @click="ordenar_ascendente('titulo_on')"
                      class="flecha_orden_ascendente"
                    >
                      <span class="icon-arrow-up"></span>
                    </button>
                    <!--PENDIENTE TOÑO LA INSTRUCCIÓN DE VUE V-MODEL NO FUNCIONA PARA BUTTONS-->
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
                    placeholder="Búsqueda"
                    class="input_busqueda"
                    type="search"
                  />
                </th>
                <th class="cabezal_columnas_th" id="th_coleccion_por_audioanotacion">
                  <div class="contenedor_etiquetas_barras_busqueda">
                    <label class="label label_junto_flechas">Colección</label>
                    <button class="flecha_orden_ascendente">
                      <span class="icon-arrow-up"></span>
                    </button>
                    <button class="flecha_orden_descendente">
                      <span class="icon-arrow-down"></span>
                    </button>
                  </div>
                  <input class="input_busqueda" type="search" placeholder="Búsqueda" />
                </th>
                <th class="cabezal_columnas_th">
                  <div class="contenedor_etiquetas_barras_busqueda">
                    <label class="label label_junto_flechas">Lengua terminal</label>
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
                    <label class="label label_junto_flechas">Gpos. de lenguas</label>
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
                    class="input_busqueda"
                    type="text"
                    id="comunidad"
                    name="comunidad"
                    v-model="comunidad"
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
                    class="input_busqueda"
                    type="text"
                    id="hablantes"
                    name="hablantes"
                    v-model="hablantes"
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
                    class="input_busqueda"
                    type="text"
                    id="genero"
                    name="genero"
                    v-model="genero"
                    placeholder="Búsqueda"
                  />
                </th>
              </thead>
              <tbody v-for="(item2, index) in search_titulo" :key="'item' + index">
                <tr>
                  <td class="titulo_audioanotacion_tabla" data-label="titulo">
                    <a class="link_audioanotacion_tabla_catalogo" @click="showAudio">{{
                      item2.title
                    }}</a
                    ><button class="btn_info_coleccion_tabla">
                      <span class="icono_info_coleccion_tabla icon-info1"></span></button
                    ><span class="unique_id" data-label="unique_id"
                      >UID:xxx xxxxxxx xx</span
                    >
                  </td>
                  <td class="">
                    <a @click="showCollect" class="link_coleccion_tabla_catalogo"
                      ><i>{{ arreglo_coleccion[index] }} </i></a
                    >
                    <button class="btn_info_coleccion_tabla">
                      <span class="icono_info_coleccion_tabla icon-info1"></span>
                    </button>
                  </td>
                  <td class="" data-label="Lengua terminal (glottocode)">
                    {{ item2.gid.language.gid
                    }}<span
                      class="lengua_term_comun"
                      data-label="Lengua terminal (nombre común)"
                      >{{ item2.gid.language.name }}</span
                    >
                  </td>
                  <td class="" data-label="Grupo de lenguas (glottocode)">
                    {{ item2.gid.LanguageGroup.gid
                    }}<span
                      class="grupo_lengua_comun"
                      data-label="Grupo de lenguas (nombre común)"
                      >{{ item2.gid.LanguageGroup.name }}</span
                    >
                  </td>
                  <td>
                    <span class="comunidad_2">{{ item2.location.Nom_Loc }}</span
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
                      <span class="hablante">{{ item3.PARTICIPANT }}</span
                      ><br /><span class="canal">Canal {{ index + 1 }}</span>
                    </div>
                  </td>
                  <td>
                    <span class="genero">{{ item2.genre.name }}</span>
                    <span class="duracion">{{ item2.duration }}</span>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "Audioannotations",
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
      coleccion: "",
      arreglo_coleccion: [],
    };
  },
  methods: {
    async get_nameColeccion(id) {
      var name;
      //console.log("la ruta"+"collections/api/read/"+id)
      this.axios.get("collections/api/read/" + id).then((response) => {
        //this.coleccion = response.data
        //console.log(response.data.name)
        name = response.data.name;
        this.arreglo_coleccion.push(response.data.name);
      });
      //console.log("este es el nombre de la coleccion "+ this.coleccion.name)
      return name;
    },
    showAudio() {
      //Aqui se utiizan las funciones o estilos de SweetAlert
      this.$swal({
        title: "Aqui va el titulo de la audioanotación",
        text: "Aquí la descripción de la audioanotación",
        showCloseButton: true,
      });
    },
    showCollect() {
      //Aqui se utiizan las funciones o estilos de SweetAlert
      this.$swal({
        title: "Aqui va el titulo de la colección",
        text: "Aquí la descripción de la colección",
        showCloseButton: true,
      });
    },
    /*borrarAudioanotacion(audioannotation_id) {
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
    },*/

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
      console.log(
        "******************Esta entrando ordenar_descendente ******** " +
          e +
          " ************ " +
          e
      );
      if (e == "titulo_off") {
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
      } else if (e == "lengua_off") {
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
      } else if (e == "gpo_lenguas_off") {
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
      } else if (e == "comunidad_off") {
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
          if (a.title > b.title) {
            return 1;
          }
          if (a.title < b.title) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      } else if (e == "lengua_on") {
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
      } else if (e == "gpo_lenguas_on") {
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
      } else if (e == "comunidad_on") {
        console.log("Entrando comunidad_on en el on");
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
      self.axios.get("/audioannotations/filter/" + page).then((response) => {
        self.notas_audioannotations = response.data.itemsList;
        self.paginacion = response.data.paginator;
        self.pagina = self.paginacion;
      });
      this.arreglo_coleccion = [];
      self.notas_audioannotations.forEach((element) => {
        //console.log("la coleccion "+element.collection_id)
        this.get_nameColeccion(element.collection_id);
      });
      console.log("se longitud2 ");
      console.log(this.arreglo_coleccion.length);
      // this.arreglo_coleccion.forEach(element => {
      //   console.log("indice "+element.index + "valor "+element)
      //   self.notas_audioannotations[element.index].push(element)
      // });
    },
  },
  mounted() {
    var self = this;
    self.axios.get("/audioannotations/filter/1").then((response) => {
      self.notas_audioannotations = response.data.itemsList;
      self.paginacion = response.data.paginator;
      self.pagina = self.paginacion;
      self.notas_audioannotations.forEach((element) => {
        //console.log("la coleccion "+element.collection_id)
        this.get_nameColeccion(element.collection_id);
      });

      // this.arreglo_coleccion.forEach(element => {
      //   console.log("indice "+element.index + "valor "+element)
      //   self.notas_audioannotations[element.index].push(element)
      // });
      // console.log("se vacia ")

      //console.log(response.data)
    });
    console.log("se longitud ");
    console.log(this.arreglo_coleccion.length);
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
