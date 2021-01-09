<template>
  <div class="container-fluid" id="contenedor_catalogo">
				<div class="container">
					<div class="col-sm-12 contenedor_cabezal_catalogo" id="">
						<img src="images/leon_catalogo.svg" alt="Imagen ornamental de textil de Huichapan" class="" id="imagen_de_catalogo">
						<div class="" id="contenedor_texto_cabezal_catalogo">
							<h1 class="">Bienvenido a nuestro catálogo</h1>
							<h2 class="llamada " id="llamada_catalogo">¡Disfruta de la diversidad de nuestras colecciones!</h2>
						</div>
					</div>	
				
			
			<section class="container contenedor-90vh" id="contenedor_listado_catalogo">
				<div class="contenedor_switch_visualizar_por_en_catalogo">
								<label class="label" for="" id="">Visualizar por:</label>
								<div class="contenedor_switch_visualizacion_catalogo">
									<label class="swich_etiqueta_opcion1" for="checkbox_coleccion" id="switch_visualizar_por_audioanotacion">Audioanotacion</label>
									<label class="switch_general">
									<input type="checkbox" onclick="window.location.href ='/audioannotation'" class="checkbox_coleccion" id="checbox_coleccion" checked>
                   					<span class="slider_general round"></span></label>
									<label class="swich_etiqueta_opcion2" for="checkbox_coleccion" id="switch_visualizar_por_coleccion">Colección</label>
								</div>
				<div class="contenedor_tabla_catalogo_colecciones">
						<table class="tabla_catalogo_colecciones">
       					 	<thead>
                				<th class="cabezal_columnas_th" id="th_coleccion">
									<div class="contenedor_etiquetas_barras_busqueda" >
										<label class="label label_junto_flechas">Colección</label>
										<button class="flecha_orden_ascendente "><span class="icon-arrow-up"></span></button>
										<button class="flecha_orden_descendente"><span class="icon-arrow-down"></span></button>
									</div>
									<input id="titulo" name="titulo" v-model="titulo" class="input_busqueda" type="search" placeholder="Búsqueda">
								</th>
								<th class="cabezal_columnas_th">
									<div class="contenedor_etiquetas_barras_busqueda" >
										<label class="label label_junto_flechas">Lengua terminal</label>
										<button class="flecha_orden_ascendente active"><span class="icon-arrow-up"></span></button>
										<button class="flecha_orden_descendente"><span class="icon-arrow-down"></span></button>
									</div>
									<input class="input_busqueda" type="search" placeholder="Búsqueda">
								</th>
								<th class="cabezal_columnas_th">
									<div class="contenedor_etiquetas_barras_busqueda" >
										<label class="label label_junto_flechas">Gpos. de lenguas</label>
										<button class="flecha_orden_ascendente "><span class="icon-arrow-up"></span></button>
										<button class="flecha_orden_descendente"><span class="icon-arrow-down"></span></button>
									</div>
									<input class="input_busqueda" type="search" placeholder="Búsqueda">
								</th>
								<th class="cabezal_columnas_th">
									<div class="contenedor_etiquetas_barras_busqueda" >
										<label class="label label_junto_flechas">Comunidades</label>
										<button class="flecha_orden_ascendente "><span class="icon-arrow-up"></span></button>
										<button class="flecha_orden_descendente"><span class="icon-arrow-down"></span></button>
									</div>
									<input class="input_busqueda" type="search" placeholder="Búsqueda">
								</th>
								<th class="" id="th_acciones">
									
								</th>
                				
        					</thead>
    					    <tr v-for="(item2, index) in search_titulo" :key="'item' + index">
            					<td>
									<strong><i> {{ item2.title }}</i></strong><p class="primeras_palabras_descripcion_collect"></p>
								</td>
            					<td class="" data-label="Lengua terminal (glottocode)">
									yolo1241<span class="lengua_term_comun" data-label="Lengua terminal (nombre común)">Yoloxóchitl Mixtec</span><br>yolo1241<span class="lengua_term_comun" data-label="Lengua terminal (nombre común)">Yoloxóchitl Mixtec</span>
								</td>
            					<td class="" data-label="Grupo de lenguas (glottocode)">
									amuz1253<span class="grupo_lengua_comun" data-label="Grupo de lenguas (nombre común)" >Amuzgo-mixtecan</span><br>amuz1253<span class="grupo_lengua_comun" data-label="Grupo de lenguas (nombre común)" >Amuzgo-mixtecan</span>
								</td>
            					<td class="comunidades"><span class="pais">
									México</span><span class="estado">Guerrero</span><span class="comunidad">Yoloxóchitl</span><span class="municipio_tabla">San Luis Acatlán</span><span class="localizacion">16.816020, -98.685990</span><hr class="hr_divisor_comunidad"><span class="pais">México</span><span class="estado">Guerrero</span><span class="comunidad">Cuanacaxtitlán</span><span class="municipio_tabla">San Luis Acatlán</span><span class="localizacion">16.816020, -98.685990</span><hr class="hr_divisor_comunidad"><span class="pais">México</span><span class="estado">Guerrero</span><span class="comunidad">Arroyo Cumiapa</span><span class="municipio_tabla">San Luis Acatlán</span><span class="localizacion">16.816020, -98.685990</span><hr class="hr_divisor_comunidad"><span class="pais">México</span><span class="estado">Guerrero</span><span class="comunidad">Buena Vista</span><span class="municipio_tabla">San Luis Acatlán</span><span class="localizacion">16.816020, -98.685990</span>
								</td>
								<td class="td_acciones ">
									<div class="contenedor_botones_accion">
										<button class="btn_accion_tabla" id="coleccion_info"><span class="icono_accion_tabla  icon-info1"></span></button>
										<button class="btn_accion_tabla"><span class="icono_accion_tabla  icon-launch"></span></button>
									</div>
								</td>
        					</tr>
						</table>
						<div class="contenedor_paginacion">
							<div class="contenedor_input_paginacion">
								<input class="" id="busqueda_paginacion" type="text" placeholder="Pag.">
								<button class="btn_lateral_input" for="busqueda_paginacion"><span class="icono_pagina_busqueda  icon-chevron-right"></span></button>

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
		</div>
	</div>		



</template>

<script>
export default {
  name: "Dashboard",
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

      valor_buscar: false,
    };
  },
  methods: {
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
    },*/
  },
  mounted(){
    var self = this;
    self.axios.get("/audioannotations/filter/1").then((response) => {
      self.notas_audioannotations = response.data.itemsList;
      //console.log(response.data)
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
