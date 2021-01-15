<template>
  <section class="container">
    <div class="col-sm-12 contenedor-90vh " id="contenedor_general_mis_colecciones">
      <div class="contenedor_tabla_mis_colecciones">
        <table class="tabla_mis_colecciones">
          <thead>
            <th class="cabezal_columnas_th" id="th_coleccion">
              <div class="contenedor_etiquetas_barras_busqueda">
                <label class="label label_junto_flechas">Colección</label>
                <button class="flecha_orden_ascendente "><span class="icon-arrow-up"></span></button>
                <button class="flecha_orden_descendente"><span class="icon-arrow-down"></span></button>
              </div>
              <input class="input_busqueda" type="search" placeholder="Búsqueda">
            </th>
            <th class="cabezal_columnas_th">
              <div class="contenedor_etiquetas_barras_busqueda">
                <label class="label label_junto_flechas">Lengua terminal</label>
                <button class="flecha_orden_ascendente active"><span class="icon-arrow-up"></span></button>
                <button class="flecha_orden_descendente"><span class="icon-arrow-down"></span></button>
              </div>
              <input class="input_busqueda" type="search" placeholder="Búsqueda">
            </th>
            <th class="cabezal_columnas_th">
              <div class="contenedor_etiquetas_barras_busqueda">
                <label class="label label_junto_flechas">Gpos. de lenguas</label>
                <button class="flecha_orden_ascendente "><span class="icon-arrow-up"></span></button>
                <button class="flecha_orden_descendente"><span class="icon-arrow-down"></span></button>
              </div>
              <input class="input_busqueda" type="search" placeholder="Búsqueda">
            </th>
            <th class="cabezal_columnas_th">
              <div class="contenedor_etiquetas_barras_busqueda">
                <label class="label label_junto_flechas">Comunidades</label>
                <button class="flecha_orden_ascendente "><span class="icon-arrow-up"></span></button>
                <button class="flecha_orden_descendente"><span class="icon-arrow-down"></span></button>
              </div>
              <input class="input_busqueda" type="search" placeholder="Búsqueda">
            </th>
            <th class="" id="th_acciones">

            </th>

          </thead>
          <!--{{#each collections}}-->
          <tr>
            <td>
              <strong><i><!--{{name}}--></i></strong>
            </td>
            <td class="" data-label="Lengua terminal (glottocode)">
              <!--{{#each languages}}-->
              <!--{{language.gid}}--><span class="lengua_term_comun"
                data-label="Lengua terminal (nombre común)"><!--{{language.name}}--></span><br>
              <!--{{/each}}-->
            </td>
            <td class="grupo_lenguas" data-label="Grupo de lenguas (glottocode)">
              <!--{{#each languages}}-->
              <!--{{LanguageGroup.gid}}--><span class="grupo_lengua_comun"
                data-label="Grupo de lenguas (nombre común)"><!--{{LanguageGroup.name}}--></span><br>
            </td>
            <td id="mostrar-hr" class="comunidades"><span class="pais">
               <!--{{Nom_Ent}}--></span><!--{{!--<span class="estado">{{Nom_Ent}}</span>--}}--><span class="comunidad"><!--{{Nom_Loc}}--></span><span
                class="municipio_tabla"><!--{{Nom_Mun}}--> </span><span class="localizacion"> <!--{{Lat_Decimal}}-->
                <!--{{Lon_Decimal}}--></span>
              <hr class="hr_divisor_comunidad">
            </td>
            <td class="td_acciones">
              <div class="contenedor_botones_accion">
                <button onclick="" aria-hidden="true"
                  class="btn_accion_tabla"><span class="icono_accion_tabla  icon-info1"></span></button>
                <a class="btn_accion_tabla" href=""><span class="icono_accion_tabla  icon-launch"></span></a>
                <button class='dropdown-trigger'><span
                    class="icono_accion_tabla icon-ellipsis-v"></span></button>
                <div id='' class='contenido_modal_elipsis'>
                  <span class="icono_cerrar_modal_elipsis icon-close "></span>
                  <div class="contenedor_opciones_elipsis">
                    <a class="btn_opciones_ellipsis_mis_colecciones" href="#"><span
                        class="icono_opcion_elipsis icon-file_upload"></span> Cargar audioanotación</a>
                    <a class="btn_opciones_ellipsis_mis_colecciones" href=""><span
                        class="icono_opcion_elipsis icon-edit"></span> Editar metadatos</a>
                    <form class="center" action="" method="POST">
                      <input type="hidden" name="_method" value="DELETE">
                      <a onclick="this.parentNode.submit()" class="btn_opciones_ellipsis_mis_colecciones" href="#"><span
                          class="icono_opcion_elipsis icon-delete"></span> Eliminar</a></form>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <div class="contenedor_paginacion">
          <div class="contenedor_input_paginacion">
            <input class="" id="busqueda_paginacion" type="text" placeholder="Pag.">
            <button class="btn_lateral_input" for="busqueda_paginacion"><span
                class="icono_pagina_busqueda  icon-chevron-right"></span></button>

          </div>
          <div class="contenedor_numeros_paginacion">
            <a class="icono_paginacion" href="#"><span class="icon-first_page"></span></a>
            <a class="icono_paginacion" href="#"><span class="icon-angle-left"></span></a>
            <a class="numero_paginacion" href="#">2</a>
            <a class="numero_paginacion" href="#">3</a>
            <a class="numero_paginacion" href="#">4</a>
            <a class="numero_paginacion active" href="#">5</a>
            <a class="numero_paginacion" href="#">6</a>
            <a class="numero_paginacion" href="#">7</a>
            <a class="ultima_pagina" href="#">...29</a>
            <a class="icono_paginacion" href="#"><span class="icon-angle-right"></span></a>
            <a class="icono_paginacion" href="#"><span class=" icon-last_page"></span></a>
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
    };
  },
  methods: {
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
    ordenar_descendente: function () {
      //falta ordenar
      if (this.bandera_titulo) {
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
      } else if (this.bandera_lengua) {
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
      } else if (this.bandera_comunidad) {
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
      } else if (this.bandera_genero) {
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
      } else if (this.bandera_hablantes) {
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
    ordenar_ascendente: function () {
      //falta ordenar
      if (this.bandera_titulo) {
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
      } else if (this.bandera_lengua) {
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
      } else if (this.bandera_comunidad) {
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
      } else if (this.bandera_genero) {
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
      } else if (this.bandera_hablantes) {
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
