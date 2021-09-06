<template>
    <div id="body">
        <table class="tabla_mis_colecciones">
            <tr v-for="(item2, index) in search_titulo" :key="'item' + index">
              <td>
                <span v-html="item2.name"></span>
              </td>

              <td class="" data-label="Lengua terminal (glottocode)">
                <div v-for="(item3, index3) in item2.languages" :key="'item3' + index3">
                    {{ item3.language.gid }}
                    <span class="lengua_term_comun" data-label="Lengua terminal (nombre común)">
                        {{ item3.language.name }} 
                    </span>
                    
                    <br />
                </div>
              </td>

              <td class="grupo_lenguas" data-label="Grupo de lenguas (glottocode)">
                <div v-for="(item4, index4) in item2.languages" :key="'item4' + index4">
                    {{ item4.LanguageGroup.gid}}
                    <span class="grupo_lengua_comun" data-label="Grupo de lenguas (nombre común)">
                        {{ item4.LanguageGroup.name }}
                    </span>

                    <br />
                </div>
              </td>

              <td id="mostrar-hr" class="comunidades">
                <div v-for="(item5, index5) in item2.localities" :key="'item5' + index5">
                    <span class="pais">
                        {{ item5.Nom_Ent }}
                    </span>
                    
                    <span class="comunidad">
                        {{ item5.Nom_Loc }}
                    </span>
                    
                    <span class="municipio_tabla">
                        {{ item5.Nom_Mun }}
                    </span>
                    
                    <span class="localizacion">
                        {{ item5.Lat_Decimal }}, {{ item5.Lon_Decimal }}
                    </span>

                    <hr class="hr_divisor_comunidad" />
                </div>
              </td>
              
              <td> 
                <Acc />
              </td>
            </tr>
        </table>
    </div>
</template>

<script>
import Acc from './Acciones.vue'
export default {
  name: 'Body',
  props: [
    'text'
  ],
  components: {
    Acc
  },
  data() {
    return {
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
  methods: {
    async sync_names() {
      await this.notas_audioannotations.forEach((element) => {
        this.names.forEach((name) => {
          if (element.user == name._id) {
            element.user = name.name
          }
        })
      })
    },
    async search_by_name() {
      var self = this
      let found = this.names.filter(
        (element) => element.name == this.names_director
      )
      try {
        // console.log(found[0]._id);
        await this.axios
          .get('collections/api/byuserid/' + found[0]._id)
          .then((response) => {
            this.notas_audioannotations = response.data.itemsList
            this.sync_names()
            this.paginacion = response.data.paginator
            this.pagina = this.paginacion
            //console.log(response.data)
          })
      } catch (e) {
        //console.log("not match")
      }
      if (this.names_director.length <= 0) {
        await self.axios.get('collections/api/read_all/1').then((response) => {
          self.notas_audioannotations = response.data.itemsList
          this.sync_names()
          self.paginacion = response.data.paginator
          self.pagina = self.paginacion
          //console.log(response.data)
        })
      }
    },
    async searching_by_collection() {
      var self = this
      if (this.titulo.length > 0) {
        await self.axios
          .get('collections/api/bycollection/' + this.titulo)
          .then((response) => {
            self.notas_audioannotations = response.data.itemsList
            this.sync_names()
            self.paginacion = response.data.paginator
            self.pagina = self.paginacion
            //console.log(response.data)
          })
      }

      if (this.titulo.length <= 0) {
        await self.axios.get('collections/api/read_all/1').then((response) => {
          self.notas_audioannotations = response.data.itemsList
          this.sync_names()
          self.paginacion = response.data.paginator
          self.pagina = self.paginacion
          //console.log(response.data)
        })
      }
    },
    async searching_by_lang() {
      var self = this
      if (this.lengua.length > 0) {
        await self.axios
          .get('collections/api/byLenguages/' + this.lengua)
          .then((response) => {
            self.notas_audioannotations = response.data.itemsList
            this.sync_names()
            self.paginacion = response.data.paginator
            self.pagina = self.paginacion
            //console.log(response.data)
          })
      }

      if (this.lengua.length <= 0) {
        self.axios.get('collections/api/read_all/1').then((response) => {
          self.notas_audioannotations = response.data.itemsList
          this.sync_names()
          self.paginacion = response.data.paginator
          self.pagina = self.paginacion
          //console.log(response.data)
        })
      }
    },
    async searching_by_GpoL() {
      var self = this
      if (this.gpo_lengua.length > 0) {
        await self.axios
          .get('collections/api/byGposL/' + this.gpo_lengua)
          .then((response) => {
            self.notas_audioannotations = response.data.itemsList
            this.sync_names()
            self.paginacion = response.data.paginator
            self.pagina = self.paginacion
            //console.log(response.data)
          })
      }

      if (this.gpo_lengua.length <= 0) {
        self.axios.get('collections/api/read_all/1').then((response) => {
          self.notas_audioannotations = response.data.itemsList
          this.sync_names()
          self.paginacion = response.data.paginator
          self.pagina = self.paginacion
          //console.log(response.data)
        })
      }
    },
    async searching_by_Community() {
      var self = this
      if (this.comunidad.length > 0) {
        await self.axios
          .get('collections/api/bycommu/' + this.comunidad)
          .then((response) => {
            self.notas_audioannotations = response.data.itemsList
            this.sync_names()
            self.paginacion = response.data.paginator
            self.pagina = self.paginacion
            //console.log(response.data)
          })
      }

      if (this.comunidad.length <= 0) {
        self.axios.get('collections/api/read_all/1').then((response) => {
          self.notas_audioannotations = response.data.itemsList
          this.sync_names()
          self.paginacion = response.data.paginator
          self.pagina = self.paginacion
          //console.log(response.data)
        })
      }
    },
    elipsis: function (index, event) {
      if (this.bandera_elipsiss) {
        if (event) event.preventDefault()
        this.bandera_elipsiss = false
        this.item_index = index
      } else {
        this.bandera_elipsiss = true
        this.item_index = ''
      }
    },
    borrarCollection(collection_id) {
      var currentUrl = window.location.pathname
      const url = `${currentUrl}/api/delete/${collection_id}`
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
          (response) => {
            console.log('si se borro ' + collection_id)
            let index = this.notas_audioannotations.findIndex(
              (item) => item._id === collection_id
            )
            console.log(index)
            this.notas_audioannotations.splice(index, 1)
            console.log(url)
          },
          (error) => {
            console.log('no se borro ' + '/collections/delete/' + collection_id)
            console.log(url)
            console.log(error)
          }
        )
    },
    showCollect(title, text) {
      //Aqui se utiizan las funciones o estilos de SweetAlert
      console.log('title ' + title + 'text ' + text)
      this.$swal({
        //title: title,
        //text: text,
        html:
          `<h3 class="sa_titulo_coleccion"><code>${title}</code></h3>` +
          `<p class="sa_parrafo_grande"><code>${text}</code></p>`,
        icon: 'info',
        showCloseButton: true,
        showConfirmButton: true,
        buttonsStyling: false,
        confirmButtonText: 'Entiendo',
        confirmButtonAriaLabel: 'Entendido',
        customClass: {
          container: '',
          popup: 'sa-popup',
          //header: 'sa_header',
          title: 'sa_title',
          icon: 'sa_icon',
          text: 'sa_parrafo_grande',
          confirmButton: 'btn btn-predeterminado sa_btn_confirm', //resolver focus en css,
          cancelButton: 'btn btn-secundario sa_btn',
          footer: 'secundario',
        },
      })
    },
    ordenar_descendente: function (e) {
      //falta ordenar
      console.log(
        '******************Esta entrando ordenar_descendente ******** ' +
          e +
          ' ************ ' +
          e
      )
      if (e == 'user') {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.user > b.user) {
            return -1
          }
          if (a.user < b.user) {
            return 1
          }
          // a must be equal to b
          return 0
        })
      } else if (e == 'titulo_off') {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.name > b.name) {
            return -1
          }
          if (a.name < b.name) {
            return 1
          }
          // a must be equal to b
          return 0
        })
      } else if (e == 'lengua_off') {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.languages[0].language.name > b.languages[0].language.name) {
            return -1
          }
          if (a.languages[0].language.name < b.languages[0].language.name) {
            return 1
          }
          // a must be equal to b
          return 0
        })
      } else if (e == 'gpo_lenguas_off') {
        return this.notas_audioannotations.sort(function (a, b) {
          if (
            a.languages[0].LanguageGroup.name >
            b.languages[0].LanguageGroup.name
          ) {
            return -1
          }
          if (
            a.languages[0].LanguageGroup.name <
            b.languages[0].LanguageGroup.name
          ) {
            return 1
          }
          // a must be equal to b
          return 0
        })
      } else if (e == 'comunidad_off') {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.localities[0].Nom_Loc > b.localities[0].Nom_Loc) {
            return -1
          }
          if (a.localities[0].Nom_Loc < b.localities[0].Nom_Loc) {
            return 1
          }
          // a must be equal to b
          return 0
        })
      } else if (e == 'genero_off') {
        console.log('Entrando en el off')
        return this.notas_audioannotations.sort(function (a, b) {
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
        return this.notas_audioannotations.sort(function (a, b) {
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
    ordenar_ascendente: function (e) {
      //falta ordenar
      console.log(
        '******************Esta entrando ordenar_ascendente ******** ' +
          e +
          ' ************ ' +
          e
      )
      if (e == 'user') {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.user > b.user) {
            return 1
          }
          if (a.user < b.user) {
            return -1
          }
          // a must be equal to b
          return 0
        })
      } else if (e == 'titulo_on') {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.name > b.name) {
            return 1
          }
          if (a.name < b.name) {
            return -1
          }
          // a must be equal to b
          return 0
        })
      } else if (e == 'lengua_on') {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.languages[0].language.name > b.languages[0].language.name) {
            return 1
          }
          if (a.languages[0].language.name < b.languages[0].language.name) {
            return -1
          }
          // a must be equal to b
          return 0
        })
      } else if (e == 'gpo_lenguas_on') {
        return this.notas_audioannotations.sort(function (a, b) {
          if (
            a.languages[0].LanguageGroup.name >
            b.languages[0].LanguageGroup.name
          ) {
            return 1
          }
          if (
            a.languages[0].LanguageGroup.name <
            b.languages[0].LanguageGroup.name
          ) {
            return -1
          }
          // a must be equal to b
          return 0
        })
      } else if (e == 'comunidades_on') {
        console.log('Entrando comunidades_on en el on')
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.localities[0].Nom_Loc > b.localities[0].Nom_Loc) {
            return 1
          }
          if (a.localities[0].Nom_Loc < b.localities[0].Nom_Loc) {
            return -1
          }
          // a must be equal to b
          return 0
        })
      } else if (e == 'genero_on') {
        console.log('Entrando genero en el on')
        return this.notas_audioannotations.sort(function (a, b) {
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
        return this.notas_audioannotations.sort(function (a, b) {
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
    getPage: function (page) {
      if (page > this.paginacion.pageCount) {
        page = this.paginacion.pageCount
      }
      if (page <= 0) {
        page = 1
      }

      var self = this
      var API_Route = ''
      if (superusuario === true) {
        API_Route = 'collections/api/read_all/' + page
      } else {
        API_Route = 'collections/api/pag/' + page
      }
      self.axios.get(API_Route).then((response) => {
        self.notas_audioannotations = response.data.itemsList
        this.sync_names()
        self.paginacion = response.data.paginator
        self.pagina = self.paginacion
        //console.log(response.data)
      })
    },
  },
  async mounted() {
    //console.log(superusuario);
    var self = this
    var API_Route = ''
    if (superusuario === true) {
      this.status_super_user = true
      API_Route = 'collections/api/read_all/1'
    } else {
      API_Route = 'collections/api/pag/1'
    }
    await this.axios.get('/user/api/getusersnames').then((result) => {
      this.names = this.result = result.data
      self.axios.get(API_Route).then((response) => {
        self.notas_audioannotations = response.data.itemsList
        self.notas_audioannotations.forEach((element) => {
          this.names.forEach((name) => {
            if (element.user == name._id) {
              element.user = name.name
            }
          })
        })
        self.paginacion = response.data.paginator
        self.pagina = self.paginacion
        //console.log(response.data)
      })
    })

    self.axios.get('i18n').then((response) => {
      self.idioma = response.data.LANGUAGE
      if (self.idioma === 'es') {
        //console.log("esta en español");
        this.$i18n.locale = 'es'
      } else if (self.idioma === 'en') {
        //console.log("esta en ingles");
        this.$i18n.locale = 'en'
      }
    })
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
      return this.paginacion.currentPage
    },
    pagesNumber: function () {
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
    search_titulo: function () {
      if (this.names_director.length > 1) {
        return this.notas_audioannotations.filter((item) =>
          item.user.toLowerCase().includes(this.names_director.toLowerCase())
        )
      }
      return this.notas_audioannotations
    },
  },
}
</script>