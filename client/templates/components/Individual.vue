<template>
 	<div class="container-fluid" id="contenedor_catalogo_coleccion_individual">
			<div class="container-fluid" id="cabezal_catalogo_coleccion_individual">
				<div class="container">
					<div class="col-sm-12" id="contenedor_items_cabezal_catalogo_coleccion_individual">
						<div  class="" id="contenedor_titulos_cabezal_catalogo_coleccion_individual">
							<h1 id="titulo_catalogo_coleccion_individual">Contenido</h1>
							<h4 class="blanco" id="etiqueta_coleccion_catalogo_coleccion_individual">De la colección</h4>
							<h3 class="nombre_coleccion_audioanotaciones blanco"><span v-html="collectionName"></span><button class="btn_info_coleccion_cabezal_coleccion_audioanotaciones" id="coleccion_info_general_cabezal"><span @click="showCollection(collectionName, collectionDescription)" class="icono_info_coleccion_audioanotacion  icon-info1"></span></button></h3>
							<h4 class="blanco gpo_lenguas_audioanotaciones">Grupo de lenguas: <strong>{{languageGroupName}} <span class="gpo_lenguas_glottocode_info">[{{languageGroupId}}]</span></strong></h4>
						</div>	
						<div class="contenedor_imagen_cabezal_catalogo_coleccion_individual">
							<img src="/images/leon_catalogo.svg" class="imagen_reflejada">				
						</div>	
					</div>	
				</div>
			</div>
			<section class="container">
				<div class="col-sm-12 contenedor-90vh " id="contenedor_general_catalogo_coleccion_individual">
					<div class="contenedor_tabla_catalogo_coleccion_individual">
						<table class="tabla_catalogo_audianotaciones_coleccion_individual">
       					 	<thead>
								<th class="cabezal_columnas_th" id="th_titulo_por_audioanotacion">
									<div class="contenedor_etiquetas_barras_busqueda" >
										<label class="label label_junto_flechas">Título</label>
										  <button
                    id="titulo_on"
                    @click="ordenar_ascendente('titulo_on')"
                    class="flecha_orden_ascendente"
                  ><span class="icon-arrow-up"></span></button>
									 <button id="titulo_off" @click="ordenar_descendente('titulo_off')" class="flecha_orden_descendente"><span class="icon-arrow-down"></span></button>
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
									<div class="contenedor_etiquetas_barras_busqueda" >
										<label class="label label_junto_flechas">Lengua terminal</label>
									<button
                    id="lengua_on"
                    @click="ordenar_ascendente('lengua_on')"
                    class="flecha_orden_ascendente"
                  ><span class="icon-arrow-up"></span></button>
										 <button
                    id="lengua_off"
                    @click="ordenar_descendente('lengua_off')"
                    class="flecha_orden_descendente"
                  ><span class="icon-arrow-down"></span></button>
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
									<div class="contenedor_etiquetas_barras_busqueda" >
										<label class="label label_junto_flechas">Comunidad</label>
										<button
                    id="comunidad_on"
                    @click="ordenar_ascendente('comunidad_on')"
                    class="flecha_orden_ascendente"
                  ><span class="icon-arrow-up"></span></button>
										<button
                    id="comunidad_off"
                    @click="ordenar_descendente('comunidad_off')"
                    class="flecha_orden_descendente"
                  ><span class="icon-arrow-down"></span></button>
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
									<div class="contenedor_etiquetas_barras_busqueda" >
										<label class="label label_junto_flechas">Hablantes</label>
									 <button
                    id="hablantes_on"
                    @click="ordenar_ascendente('hablantes_on')"
                    class="flecha_orden_ascendente"
                  ><span class="icon-arrow-up"></span></button>
										 <button
                    id="hablantes_off"
                    @click="ordenar_descendente('hablantes_off')"
                    class="flecha_orden_descendente"
                  ><span class="icon-arrow-down"></span></button>
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
									<div class="contenedor_etiquetas_barras_busqueda" >
										<label class="label label_junto_flechas">Género y duracion</label>
									 <button
                    id="genero_on"
                    @click="ordenar_ascendente('genero_on')"
                    class="flecha_orden_ascendente"
                  ><span class="icon-arrow-up"></span></button>
									<button
                    id="genero_off"
                    @click="ordenar_descendente('genero_off')"
                    class="flecha_orden_descendente"
                  ><span class="icon-arrow-down"></span></button>
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
								<th class="" id="th_acciones">
									
								</th>
        					</thead>
							<tbody
              v-for="(item2, index) in search_titulo"
              :key="'item' + index">
    					    <tr>
								
								<td class="titulo_audioanotacion_tabla" data-label="titulo">
								 <span v-html="item2.title"></span><span class="unique_id" data-label="unique_id">UID:xxx xxxxxxx xx</span>
								</td>
            													 
            					<td class="" data-label="Lengua terminal (glottocode)">
								 {{ item2.gid.language.gid
                  }}<span class="lengua_term_comun" data-label="Lengua terminal (nombre común)">{{ item2.gid.language.name }}</span>
								</td>
            					
								<td>
            					<!--td class=""><span class="pais">México</span><span class="estado">Guerrero</span--><span class="comunidad_2">{{ item2.location.Nom_Loc }}</span><br><span class="estado_tabla_catalogo">{{
                    item2.location.Nom_Ent
                  }}</span><!--span class="municipio_tabla">San Luis Acatlán</span><span class="localizacion">16.816020, -98.685990</span-->
								</td>
								<td class="">
									<div 
                   v-for="(item3, index) in item2.header"
                   :key="'item' + index"
                  class="contenedor_hablantes">
										<span class="hablante">{{ item3 }}</span><br><span class="canal">Canal 1 {{ index + 1 }}</span>
										
									</div>
								</td>
								<td>
									<span class="genero">{{ item2.genre.name }}</span>
									<span class="duracion">{{ item2.duration }}</span>
								</td>
								<td class="td_acciones ">
									<div class="contenedor_botones_accion">
										<button  @click="showAudio(item2.title, item2.description)" class="btn_accion_tabla" id="coleccion_info"><span class="icono_accion_tabla  icon-info1"></span></button>
										<button class="btn_accion_tabla"><a v-bind:href="'/audioannotations/vuetest/' + item2._id"><span class="icono_accion_tabla  icon-launch"></span></a></button>
									</div>
								</td>							
        					</tr>
							<tr>			
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
                ><span
                  v-if="paginacion.hasPrevPage"
                  class="icon-first_page"
                ></span
              ></a>
              <a
                v-if="paginacion.hasPrevPage"
                class="icono_paginacion"
                href="#"
                @click.prevent="getPage(pagina.prev)"
                ><span
                  v-if="paginacion.hasPrevPage"
                  class="icon-angle-left"
                ></span
              ></a>
              <a
                v-for="(pag, index) in pagesNumber"
                :key="index"
                v-bind:class="[
                  pag == isActived
                    ? 'numero_paginacion active'
                    : 'numero_paginacion',
                ]"
                href="#"
                @click.prevent="getPage(pag)"
                >{{ pag }}</a
              >

              <!--<a v-if="paginacion.hasNextPage" class="ultima_pagina" href="#" @click.prevent="getPage(pagina.pageCount)"
                >...{{ paginacion.pageCount }}</a
              >-->
              <a
                class="icono_paginacion"
                href="#"
                @click.prevent="getPage(pagina.next)"
                ><span
                  v-if="paginacion.hasNextPage"
                  class="icon-angle-right"
                ></span
              ></a>
              <a
                v-if="paginacion.hasNextPage"
                class="icono_paginacion"
                href="#"
                @click.prevent="getPage(pagina.pageCount)"
                ><span
                  v-if="paginacion.hasNextPage"
                  class="icon-last_page"
                ></span
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
  name: 'Individual',
  props: {
    parametro: Object,
  },
  data() {
    return {
      collectionName: '',
      collectionDescription:'',
      languageGroupName: '',
      languageGroupId: '',
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

      bandera_titulo: false,
      bandera_lengua: false,
      bandera_gpo_lengua: false,
      bandera_comunidad: false,
      bandera_hablantes: false,
      bandera_genero: false,
      pagina_buscar: '',

      valor_buscar: false,
      collectionId:""
    }
  },
  methods: {
    showAudio(title, text) {
      //Aqui se utiizan las funciones o estilos de SweetAlert
      this.$swal({
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
     showCollection(collectionName, collectionDescription) {
      //Aqui se utiizan las funciones o estilos de SweetAlert
      this.$swal({
       html:
        `<h3 class="sa_titulo_coleccion"><code>${collectionName}</code></h3>` +
        `<p class="sa_parrafo_grande"><code>${collectionDescription}</code></p>`,
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

    borrarAudioanotacion(audioannotation_id) {
      var currentUrl = window.location.pathname
      const url = `${currentUrl}/delete/${audioannotation_id}`
      // /audioannotations/delete/{{_id}}?_method=DELETE
      console.log(url)
      this.axios
        .delete(url)
        // .then(res => {
        //               if (res.data === 'ok')
        //                   commit('DELETE_POST', audioannotation_id)
        //           }).catch(err => {
        //           console.log(err)
        //       })
        .then(
          response => {
            console.log('si se borro ' + audioannotation_id)
            let index = this.notas_audioannotations.findIndex(
              item => item._id === audioannotation_id
            )
            console.log(index)
            this.notas_audioannotations.splice(index, 1)
            console.log(url)
          },
          error => {
            console.log(
              'no se borro ' + '/audioannotations/delete/' + audioannotation_id
            )
            console.log(url)
            console.log(error)
          }
        )
    },

    cambiovalor(e) {
      console.log('valor ' + e.target.value)
    },
    sacarTierParticipant() {
      this.notas_audioannotations.TIER.forEach(element => {
        tier.push(element)
      })
    },
    getTodos() {
      this.axios.get('audioannotations/filter').then(response => {
        this.notas_audioannotations = response.data
        //console.log(response.data)
      })
    },
    ordenar_descendente: function(e) {
      //falta ordenar
      console.log(
        '******************Esta entrando ordenar_descendente ******** ' +
          e +
          ' ************ ' +
          e
      )
      if (e == 'titulo_off') {
        return this.notas_audioannotations.sort(function(a, b) {
          if (a.title > b.title) {
            return -1
          }
          if (a.title < b.title) {
            return 1
          }
          // a must be equal to b
          return 0
        })
      } else if (e == 'lengua_off') {
        return this.notas_audioannotations.sort(function(a, b) {
          if (a.gid.language.name > b.gid.language.name) {
            return -1
          }
          if (a.gid.language.name < b.gid.language.name) {
            return 1
          }
          // a must be equal to b
          return 0
        })
      } else if (this.bandera_gpo_lengua) {
        return this.notas_audioannotations.sort(function(a, b) {
          if (a.gid.LanguageGroup.name > b.gid.LanguageGroup.name) {
            return -1
          }
          if (a.gid.LanguageGroup.name < b.gid.LanguageGroup.name) {
            return 1
          }
          // a must be equal to b
          return 0
        })
      } else if (e == 'comunidad_off') {
        return this.notas_audioannotations.sort(function(a, b) {
          if (a.location.Nom_Loc > b.location.Nom_Loc) {
            return -1
          }
          if (a.location.Nom_Loc < b.location.Nom_Loc) {
            return 1
          }
          // a must be equal to b
          return 0
        })
      } else if (e == 'genero_off') {
        console.log('Entrando en el off')
        return this.notas_audioannotations.sort(function(a, b) {
          if (a.genre.name > b.genre.name) {
            return -1
          }
          if (a.genre.name < b.genre.name) {
            return 1
          }
          // a must be equal to b
          return 0
        })
      } else if (e == 'hablantes_off') {
        return this.notas_audioannotations.sort(function(a, b) {
          if (a.TIER[0].PARTICIPANT > b.TIER[0].PARTICIPANT) {
            return -1
          }
          if (a.TIER[0].PARTICIPANT < b.TIER[0].PARTICIPANT) {
            return 1
          }
          // a must be equal to b
          return 0
        })
      }
    },
    ordenar_ascendente: function(e) {
      //falta ordenar
      console.log(
        '******************Esta entrando ordenar_ascendente ******** ' +
          e +
          ' ************ ' +
          e
      )

      if (e == 'titulo_on') {
        return this.notas_audioannotations.sort(function(a, b) {
          if (a.title > b.title) {
            return 1
          }
          if (a.title < b.title) {
            return -1
          }
          // a must be equal to b
          return 0
        })
      } else if (e == 'lengua_on') {
        return this.notas_audioannotations.sort(function(a, b) {
          if (a.gid.language.name > b.gid.language.name) {
            return 1
          }
          if (a.gid.language.name < b.gid.language.name) {
            return -1
          }
          // a must be equal to b
          return 0
        })
      } else if (this.bandera_gpo_lengua) {
        return this.notas_audioannotations.sort(function(a, b) {
          if (a.gid.LanguageGroup.name > b.gid.LanguageGroup.name) {
            return 1
          }
          if (a.gid.LanguageGroup.name < b.gid.LanguageGroup.name) {
            return -1
          }
          // a must be equal to b
          return 0
        })
      } else if (e == 'comunidad_on') {
        console.log('Entrando comunidad_on en el on')
        return this.notas_audioannotations.sort(function(a, b) {
          if (a.location.Nom_Loc > b.location.Nom_Loc) {
            return 1
          }
          if (a.location.Nom_Loc < b.location.Nom_Loc) {
            return -1
          }
          // a must be equal to b
          return 0
        })
      } else if (e == 'genero_on') {
        console.log('Entrando genero en el on')
        return this.notas_audioannotations.sort(function(a, b) {
          if (a.genre.name > b.genre.name) {
            return 1
          }
          if (a.genre.name < b.genre.name) {
            return -1
          }
          // a must be equal to b
          return 0
        })
      } else if (e == 'hablantes_on') {
        return this.notas_audioannotations.sort(function(a, b) {
          if (a.TIER[0].PARTICIPANT > b.TIER[0].PARTICIPANT) {
            return 1
          }
          if (a.TIER[0].PARTICIPANT < b.TIER[0].PARTICIPANT) {
            return -1
          }
          // a must be equal to b
          return 0
        })
      }
    },
    getPage: function(page) {
      if (page > this.paginacion.pageCount) {
        page = this.paginacion.pageCount
      }
      if (page <= 0) {
        page = 1
      }

      var self = this
      
      self.axios.get(`/audioannotations/api/index/`+self.collectionId+`/${page}`).then(response => {
        self.notas_audioannotations = response.data.itemsList
        self.paginacion = response.data.paginator
        self.pagina = self.paginacion
        //console.log(response.data)
      })
    },
  },
  async mounted() {
     var self = this;
      self.axios.get("i18n").then((response) => {
      self.idioma = response.data.LANGUAGE;
      if (self.idioma === "es") {
        console.log("esta en español");
        this.$i18n.locale = "es";
      } else if (self.idioma === "en") {
        console.log("esta en ingles");
        this.$i18n.locale = "en";
      }
    });
    let collectionId = window.location.pathname.split('/').pop();
    self.collectionId =collectionId;
    try {
      let response = await this.axios.get(`/collections/api/read/${collectionId}`)
      this.collectionName = response.data.name
      this.collectionDescription = response.data.description
      this.languageGroupName = response.data.languages[0].LanguageGroup.name
      this.languageGroupId = response.data.languages[0].LanguageGroup.gid

      response = await this.axios.get(`/audioannotations/api/index/${collectionId}/1`)
      this.notas_audioannotations = response.data.itemsList
      this.paginacion = response.data.paginator
      this.pagina = this.paginacion
    } catch (error) {
      console.log(`Error requesting: /audioannotations/api/index/${collectionId}/1`)
      throw error
    }
    
  },
  computed: {
    isActived: function() {
      return this.paginacion.currentPage
    },
    pagesNumber: function() {
      if (!this.paginacion.pageCount) {
        return []
      }
      var from = this.paginacion.currentPage - 2 //TODO offset
      if (from < 1) {
        from = 1
      }
      var to = from + 2 * 2 //todo
      if (to >= this.paginacion.pageCount) {
        to = this.paginacion.pageCount
      }
      var pagesArray = []
      while (from <= to) {
        pagesArray.push(from)
        from++
      }
      return pagesArray
    },
    search_titulo: function() {
      if (this.titulo.length > 2) {
        return this.notas_audioannotations.filter(item =>
          item.title.toLowerCase().includes(this.titulo.toLowerCase())
        )
      } else if (this.lengua.length > 2) {
        return this.notas_audioannotations.filter(item =>
          item.gid.language.name
            .toLowerCase()
            .includes(this.lengua.toLowerCase())
        )
      } else if (this.gpo_lengua.length > 2) {
        return this.notas_audioannotations.filter(item =>
          item.gid.LanguageGroup.name
            .toLowerCase()
            .includes(this.gpo_lengua.toLowerCase())
        )
      } else if (this.comunidad.length > 2) {
        return this.notas_audioannotations.filter(item =>
          item.location.Nom_Loc.toLowerCase().includes(
            this.comunidad.toLowerCase()
          )
        )
      } else if (this.hablantes.length > 2) {
        return this.notas_audioannotations.filter(item =>
          item.TIER[0].PARTICIPANT.toLowerCase().includes(
            this.hablantes.toLowerCase()
          )
        ) //sacarTierParticipant
      } else if (this.genero.length > 2) {
        return this.notas_audioannotations.filter(item =>
          item.genre.name.toLowerCase().includes(this.genero.toLowerCase())
        )
      }
      return this.notas_audioannotations
    },
  },
}
</script>