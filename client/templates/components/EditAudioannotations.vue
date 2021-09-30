<template>
  <div id="EditAudioannotations">
    <div v-if="this.audioannotations_info.data">
      <section class="container">
        <div
          class="col-sm-12 contenedor-90vh"
          id="contenedor_general_agregar_audioanotacion"
        >
          <div class="contenedor_establecer_origen_archivos_audioanotacion">
            <div class="contenedor_input_seleciona_origen_audioanotacion">
              <label
                class="label label_al_100"
                id="selecciona_archivo_eaf"
                for="selecciona_archivo_eaf_input"
                >
                {{ $t('lang.EDIT_AUDIOANNOTATION.FILE') }}
                </label>
              <input
                class="input_flexible"
                type="text"
                id="selecciona_archivo_eaf_input"
                v-model="audioannotations.eaf"
                name="selecciona_archivo_eaf_input"
                readonly
              />
              <div class="contenedor_icono_correcto_input">
                <p>
                  <span class="icono_correcto_input icon-check_circle"></span>
                </p>
              </div>
              <div class="contenedor_icono_error_input">
                <p><span class="icono_error_input icon-error"></span></p>
              </div>
            </div>
            <div class="contenedor_input_seleciona_origen_audioanotacion">
              <label
                class="label"
                id="selecciona_url_mp3"
                for="selecciona_url_mp3_input"
                >{{ $t('lang.EDIT_AUDIOANNOTATION.URL') }}</label
              >
              <input
                class="input_flexible"
                type="url"
                id="selecciona_url_mp3_input"
                v-model="audioannotations.mp3_url"
                name="selecciona_url_mp3_input"
                required
              />
              <div class="contenedor_icono_correcto_input">
                <p>
                  <span class="icono_correcto_input icon-check_circle"></span>
                </p>
              </div>
              <div class="contenedor_icono_error_input">
                <p><span class="icono_error_input icon-error"></span></p>
              </div>
            </div>
          </div>
          <div class="contenedor_input_agregar_audioanotacion">
            <label
              class="label label_al_100"
              id="titulo_audioanotacion"
              for="titulo_audioanotacion_input"
              > {{ $t('lang.EDIT_AUDIOANNOTATION.TITLE')}} </label
            >
            <input
              class="input_flexible"
              type="text"
              id="titulo"
              v-model="audioannotations.title"
              name="title"
              placeholder="Titulo breve (max 120 carácteres)"
              maxlength="120"
              required
            />
            <div class="contenedor_icono_correcto_input">
              <p>
                <span class="icono_correcto_input icon-check_circle"></span>
              </p>
            </div>
            <div class="contenedor_icono_error_input">
              <p><span class="icono_error_input icon-error"></span></p>
            </div>
          </div>
          <div class="contenedor_input_agregar_audioanotacion">
            <label
              class="label label_al_100"
              id="descripcion_de_la_audioanotacion"
              for="descripcion_audioanotacion_input"
              >{{ $t('lang.EDIT_AUDIOANNOTATION.DESC') }}</label
            >
            <textarea
              id="description"
              name="audioannotations.description"
              v-model="audioannotations.description"
              class="input_flexible"
              type="textarea"
              placeholder="Breve descripcion (max 200 carácteres)"
              maxlength="200"
              rows="5"
              required
            ></textarea>
          </div>
          <div class="contenedor_input_agregar_audioanotacion">
            <label
              class="label label_al_100"
              id="seleccion_coleccion_audioanotacion_label"
              for="seleccion_coleccion_audioanotacion_input"
              >{{ $t('lang.EDIT_AUDIOANNOTATION.COLLEC') }}</label
            >
            <select
              class="input_flexible"
              id="idcoleccion"
              v-model="audioannotations.collection_id.name"
              ref="coleccion"
              @change="changeColeccion($event)"
            >
              <option disabled :value="audioannotations.collection_id.name">
                <span v-html="audioannotations.collection_id.name"></span>
              </option>
              <option
                v-for="(item3, index) in colecciones"
                :key="'item3' + index"
                v-bind:value="item3.name"
                :id="item3._id"
                v-html="item3.name"
              >
                {{ item3.name }}
              </option>
            </select>
            <div class="contenedor_icono_correcto_input">
              <p>
                <span class="icono_correcto_input icon-check_circle"></span>
              </p>
            </div>
            <div class="contenedor_icono_error_input">
              <p><span class="icono_error_input icon-error"></span></p>
            </div>
          </div>
          <div class="contenedor_flex_audioanotacion">
            <div class="contenedor_flex_tercio_audioanotacion">
              <label
                class="label label_al_100"
                id="seleccion_comunidad_audioanotacion_label"
                for="seleccion_comunidad_audioanotacion_input"
                >{{ $t('lang.EDIT_AUDIOANNOTATION.COMMU') }}</label
              >
              <select
                class="input_flexible"
                id="comunidad"
                ref="comunidad"
                @change="changeComunidad($event)"
              >
                <option disabled :value="audioannotations.location.Nom_Loc">
                  {{ audioannotations.location.Nom_Loc }}-{{
                    audioannotations.location.Nom_Mun
                  }}
                  {{ audioannotations.location.Nom_Mun }}
                </option>
                <option
                  v-for="(item5, index) in comunidad"
                  :key="'item5' + index"
                  v-bind:value="
                    'item5.NomLoc' +
                      '-' +
                      'item5.Nom_Mun' +
                      '-' +
                      'item5.Nom_Ent'
                  "
                  :id="item5._id"
                >
                  {{ item5.Nom_Loc }}-{{ item5.Nom_Mun }}-{{ item5.Nom_Ent }}
                </option>
              </select>
              <div class="contenedor_icono_correcto_input">
                <p>
                  <span class="icono_correcto_input icon-check_circle"></span>
                </p>
              </div>
              <div class="contenedor_icono_error_input">
                <p><span class="icono_error_input icon-error"></span></p>
              </div>
            </div>
            <div class="contenedor_flex_tercio_audioanotacion">
              <label
                class="label label_al_100"
                id="seleccion_lengua_terminal_audioanotacion_label"
                for="seleccion_lengua_terminal_audioanotacion_input"
                >{{ $t('lang.EDIT_AUDIOANNOTATION.LANG_TERM') }}</label
              >
              <select
                class="input_flexible"
                id="lengua"
                ref="lengua"
                @change="changeLenguaje($event)"
              >
                <option disabled :value="audioannotations.gid.language.name">
                  {{ audioannotations.gid.language.name }}
                  {{ audioannotations.gid.LanguageGroup.name }}
                </option>
                <option
                  v-for="(item4, index) in lenguaje"
                  :key="'item4' + index"
                  v-bind:value="item4.name + '-' + item4.LanguageGroup.name"
                  :id="item4._id"
                >
                  {{ item4.language.name }} {{ item4.LanguageGroup.name }}
                </option>
              </select>

              <div class="contenedor_icono_correcto_input">
                <p>
                  <span class="icono_correcto_input icon-check_circle"></span>
                </p>
              </div>
              <div class="contenedor_icono_error_input">
                <p><span class="icono_error_input icon-error"></span></p>
              </div>
            </div>
            <div class="contenedor_flex_tercio_audioanotacion">
              <label
                class="label label_al_100"
                id="seleccion_genero_audioanotacion_label"
                for="seleccion_lengua_terminal_audioanotacion_input"
                >{{ $t('lang.EDIT_AUDIOANNOTATION.GENRE') }}</label
              >

              <select class="input_flexible" ref="genero">
                <option disabled :value="audioannotations.genre.name">
                  {{ audioannotations.genre.name }}
                </option>
                <option
                  v-for="(item6, index) in genero"
                  :key="'item6' + index"
                  v-bind:value="item6.name"
                  :id="'item6' + index"
                >
                  <!-- v-bind:value="item6._id"-->
                  {{ item6.name }}
                </option>
              </select>
              <div class="contenedor_icono_correcto_input">
                <p>
                  <span class="icono_correcto_input icon-check_circle"></span>
                </p>
              </div>
              <div class="contenedor_icono_error_input">
                <p><span class="icono_error_input icon-error"></span></p>
              </div>
            </div>
          </div>
          <p class="label" id="opciones_visuales_predeterminadas">
            {{ $t('lang.EDIT_AUDIOANNOTATION.OPC') }}
          </p>

          <div class="contenedor_opciones_visuales_predeterminadas">
            <div
              v-for="(item2, index) in tier_participante"
              :key="'item' + index"
            >
              <div class="contenedor_canal_audioanotacion">
                <div class="contenedor_canal_padre">
                  <div class="contenedor_hablante">
                    <p class="label label_al_100">{{ $t('lang.EDIT_AUDIOANNOTATION.CHANNEL') }}</p>
                    <input
                      type="text"
                      class="hablante_canal_padre_input"
                      :value="item2"
                      disabled
                    />
                    <button class="btn_accion_tabla">
                      <span class="icono_accion_tabla icon-edit"></span>
                    </button>
                  </div>
                  <div class="contenedor_opciones_visuales_canal1_viewer">
                    <div
                      class="contenedor_etiqueta_propiedad_opciones_visuales_agregar_audioanotacion contenedor_mostrar_canal"
                    >
                      <label class="label label_al_100">{{ $t('lang.EDIT_AUDIOANNOTATION.SHOW') }}</label>
                      <div class="contenedor_switch_canal_audioanotacion">
                        <label
                          class="swich_etiqueta_opcion1"
                          for="checkbox"
                          id="switch_canal1_off"
                          >OFF</label
                        >
                        <label class="switch_general">
                          <input
                            type="checkbox"
                            :id="item2"
                            @change="selecion_todos_onoff($event)"
                            class="checkbox_canal1"
                            checked/>
                          <span class="slider_general round"></span
                        ></label>
                        <label
                          class="swich_etiqueta_opcion2"
                          for="checbox_canal_1"
                          id="switch_usuario_canal1_on"
                          >ON</label
                        >
                      </div>
                    </div>
                    <div
                      class="contenedor_etiqueta_propiedad_opciones_visuales_agregar_audioanotacion contenedor_visualizar_canal_en"
                    >
                      <label class="label label_al_100">{{ $t('lang.EDIT_AUDIOANNOTATION.VISU') }}</label>
                      <select
                        class="opciones_despliegue_viewer input_flexible"
                        :id="item2"
                        @change="selecion_todos_visualizacion_options($event)"
                      >
                        <option value="B">Scrolling</option>
                        <option value="A" selected>On-Line-Display</option>
                      </select>
                    </div>
                    <div
                      class="contenedor_etiqueta_propiedad_opciones_visuales_agregar_audioanotacion color_audioanotacion"
                    >
                      <label class="label label_al_100"
                        >{{ $t('lang.EDIT_AUDIOANNOTATION.COLOR') }}</label
                      >
                      <input
                        type="text"
                        :id="item2"
                        v-bind:style="colorclase('#c60000')"
                        value="#c60000"
                        class="inp input_flexible"
                        :data-did="'A' + (index + 55) + '-colorPicker'"
                        name="colorMaster"
                        @change="seleccion_todos_color($event)"
                        @click="metodocolor(index + 55, $event, 0)"
                        @blur="metodoblur(index + 55, $event, 0)"
                        autocomplete="off"
                      />
                      <div
                        class="palette"
                        :data-did="'A' + (index + 55) + '-colorPalette'"
                        :id="'A' + (index + 55) + '-colorPalette'"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="contenedor_canal_audioanotacion"
                v-for="(item, index) in tier_acomodado"
                :key="'item' + index"
              >
                <div
                  class="contenedor_canal_hijo"
                  v-if="item2 == item.PARTICIPANT"
                >
                  <div class="contenedor_hablante_hijo">
                    <h6 class="canal_hijo">{{ item.TIER_ID }}</h6>
                  </div>
                  <div class="contenedor_opciones_visuales_canal1_viewer">
                    <div
                      class="contenedor_etiqueta_propiedad_opciones_visuales_agregar_audioanotacion contenedor_mostrar_canal"
                    >
                      <div class="contenedor_switch_canal_audioanotacion_hijo">
                        <label
                          class="swich_etiqueta_opcion1"
                          for="checkbox"
                          id="switch_canal1_off"
                          >OFF</label
                        >
                        <label class="switch_general">
                          <input
                            type="checkbox"
                            :id="item.TIER_ID"
                            class="checkbox_canal1"
                            v-model="item.Visible"
                            :value="item.Visible"
                            @change="seleccion_onoff($event)"/>
                          <span class="slider_general round"></span
                        ></label>
                        <label
                          class="swich_etiqueta_opcion2"
                          for="checbox_canal_1"
                          id="switch_usuario_canal1_on"
                          >ON</label
                        >
                      </div>
                    </div>
                    <div
                      class="contenedor_etiqueta_propiedad_opciones_visuales_agregar_audioanotacion contenedor_visualizar_canal_en"
                    >
                      <select
                        class="opciones_despliegue_viewer input_flexible"
                        name="value"
                        :id="item.TIER_ID"
                        @change="seleccion_visualizacion_options($event)"
                        v-model="item.value"
                      >
                        <option value="B">Scrolling</option>
                        <option value="A" selected>On-Line-Display</option>
                      </select>
                      <!--checar https://stackoverflow.com/questions/43839066/how-can-i-set-selected-option-selected-in-vue-js-2 -->
                      <!--No funciona (no actualiza de manera automatica )<select v-model="tier_acomodado.value">
                        <option  v-bind:value="item.value" v-for="(c, index) in display" :key="index" :id="item.TIER_ID">{{ c.name }}</option>
                    </select>-->
                    </div>
                    <div
                      class="contenedor_etiqueta_propiedad_opciones_visuales_agregar_audioanotacion color_audioanotacion"
                    >
                      <input
                        class="inp input_flexible"
                        autocomplete="off"
                        name="color"
                        type="text"
                        v-model="item.color"
                        :id="'color_' + item.TIER_ID"
                        v-bind:style="colorclase(item.color)"
                        :data-did="'A' + (index + 1) + '-colorPicker'"
                        @change="seleccion_color($event)"
                        @click="metodocolor(index, $event, 1)"
                        @blur="metodoblur(index, $event, 1)"
                      />
                      <div
                        class="palette"
                        :data-did="'A' + (index + 1) + '-colorPalette'"
                        :id="'A' + (index + 1) + '-colorPalette'"
                      ></div>
                      <!--PENDIENTE COLOR PICKET-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="botones_agregar_audioanotacion">
            <div class="contenedor_botones">
              <button
                v-on:click="enviardatos()"
                class="btn btn-primario"
                id="boton_guardar_agregar_audioanotacion"
              >
                {{ $t('lang.EDIT_AUDIOANNOTATION.SAVE') }}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EditAudioannotations',
  //  props:{idParametro:{
  //     type: String,
  //     default: '0',
  // 	}},
  props: ['idParametro'],
  data() {
    return {
      who: 'world',
      json: {},
      ruta: 'otro valor',
      audioannotations_info: [],
      audioannotations: [],
      tier_participante: [],
      tier_acomodado: [],
      colecciones: [],
      selected: 'Selecciona una opción',
      coleccion: [],
      lenguaje: [],
      comunidad: [],
      genero: [],
      id_coleccionparametro: '',
      id_lenguajeparametro: '',
      id_comunidadparametro: '',
    }
  },
  methods: {
    colorclase: function(color) {
      return 'border-right: 2rem solid ' + color
    },
    quitarcolor_id: function(e) {
      var color_name = e
      return color_name.replace('color_', '')
    },
    cambiarcolor: function(e) {
      console.log('-------------cambiar color-------------------')
      console.log(
        'valor original es ' +
          this.tier_acomodado.find(
            x => x.TIER_ID == this.quitarcolor_id(e.target.id)
          ).color
      )

      console.log('---------Valor-----------------------')
      console.log(e.target.value)
      console.log('--------id------------------------')
      console.log(e.target.id)
      this.tier_acomodado.find(
        x => x.TIER_ID == this.quitarcolor_id(e.target.id)
      ).color = e.target.value
      return e.target.value
    },
    metodocolor: function(parametro, e, valor) {
      var valorpaleta, valorcolor
      valorcolor = 'A' + (parametro + valor) + '-colorPicker'
      valorpaleta = 'A' + (parametro + valor) + '-colorPalette'
      // -LOGS
      console.log(
        `<metodocolor> Idx: ${parametro} - Paleta: ${valorpaleta} - Picker: ${valorcolor}`
      )
      console.log(`<metodocolor> Target ID: ${e.target.id}`)
      let tierId = e.target.id
      // Mostrando paleta de color
      showColorPalette(valorcolor, valorpaleta, tierId)
    },
    metodoblur: function(parametro, e, valor) {
      var valorpaleta, valorcolor
      valorcolor = 'A' + (parametro + valor) + '-colorPicker'
      valorpaleta = 'A' + (parametro + valor) + '-colorPalette'
      // - LOGS
      console.log(
        `<metodoblur> TierIdx: ${parametro} - Paleta: ${valorpaleta} - Picker: ${valorcolor}`
      )
      // Oculta la paleta
      hideColorPalette(valorcolor, valorpaleta)
    },

    traer_color: function(tier_id) {
      var valor_color = this.options.find(x => x.TIER_ID == tier_id).color
      return valor_color
    },
    changeColeccion: function(e) {
      var colecTemporal = []
      var id_coleccion
      var id_lenguaje
      var id_comunidad
      colecTemporal = this.colecciones
      if (e.target.options.selectedIndex > -1) {
        console.log(e.target.options[e.target.options.selectedIndex].id)
        id_coleccion = e.target.options[e.target.options.selectedIndex].id
        this.id_coleccionparametro = id_coleccion
      } else {
        console.log('No esta encontrado la colecccion')
      }
      if (e.target.options.selectedIndex > -1) {
        this.coleccion = colecTemporal.find(x => x._id == id_coleccion)
        this.lenguaje = colecTemporal.find(x => x._id == id_coleccion).languages
        this.comunidad = colecTemporal.find(
          x => x._id == id_coleccion
        ).localities
        this.id_lenguajeparametro = this.lenguaje[0]._id
        this.id_comunidadparametro = this.comunidad[0]._id
      }
    },
    changeLenguaje: function(e) {
      // console.log('valor changeLenguaje' + e.target.value)
      // console.log('valor changeLenguaje' + e.target.id)

      if (e.target.options.selectedIndex > -1) {
        console.log(e.target.options[e.target.options.selectedIndex].id)
        this.id_lenguajeparametro =
          e.target.options[e.target.options.selectedIndex].id
      } else {
        console.log('No esta encontrado el lenguaje')
      }
    },
    changeComunidad: function(e) {
      console.log('valor changeComunidad' + e.target.value)

      if (e.target.options.selectedIndex > -1) {
        console.log(e.target.options[e.target.options.selectedIndex].id)
        this.id_comunidadparametro =
          e.target.options[e.target.options.selectedIndex].id
      } else {
        console.log('No esta encontrado el lenguaje')
      }
    },
    formaraudioannotation: function() {
      var pGenero, pColeccion, pLengua, pLocalidad
      var p_lenguaje = []
      var p_Comunidad = []
      var p_Genero = []

      //traer los datos
      //borrar _v y _id
      //obtiene los valores del DOM
      pColeccion = this.id_coleccionparametro
      pLengua = this.id_lenguajeparametro
      pLocalidad = this.id_comunidadparametro

      // pColeccion = this.$refs.coleccion.id;
      // pLengua = this.$refs.lengua.id;
      // pLocalidad = this.$refs.comunidad.id;
      //     id_coleccionparametro:"",
      // id_lenguajeparametro:"",
      // id_comunidadparametro:""

      pGenero = this.$refs.genero.value
      // console.log(this.$refs.genero.value);
      // console.log(this.$refs.coleccion.id);
      // console.log(this.$refs.lengua.id);
      // console.log(this.$refs.comunidad.id);

      //limpiar coleccion y leng []
      this.coleccion = this.colecciones.find(x => x._id == pColeccion)
      console.log('Error en coleccion' + pColeccion)
      console.log(this.coleccion)
      console.log('Error en lenguaje' + pLengua)
      this.p_lenguaje = this.coleccion.languages.find(x => x._id == pLengua)
      console.log(this.p_lenguaje)
      this.p_Comunidad = this.coleccion.localities.find(
        x => x._id == pLocalidad
      )
      console.log('Error en comunidad' + pLocalidad)
      console.log(this.p_Comunidad)
      this.p_Genero = this.genero.find(x => x.name == pGenero)
      console.log('Error en comunidad' + pGenero)
      console.log(this.p_Genero)
      this.coleccion.languages = this.p_lenguaje
      this.coleccion.localities = this.p_Comunidad

      this.audioannotations.collection_id = this.coleccion
      this.audioannotations.gid = this.coleccion.languages
      this.audioannotations.location = this.coleccion.localities
      this.audioannotations.genre = this.p_Genero

      delete this.audioannotations.__v
      delete this.audioannotations._id
    },
    enviardatos: async function() {
      this.formaraudioannotation()
      console.log('Enviando datos')
      let res = await this.axios.post(
        '/audioannotations/api/update/' + this.ruta,
        this.audioannotations
      )
      if (res) {
        if(res.data.userRole === 'su')
        return window.location.href = '/suAudiosDashboard'
        return window.location.href = `/collections/index/${this.audioannotations.collection_id._id}`
      } else {
        // TODO: USAR MEJOR UNA ALERTA DE SWEET ALERT
        alert('ERROR AL SALVAR')
      }
    },
    leerTierBD: function() {
      //for (var i in this.audioannotations_info.data) {
      this.audioannotations = this.audioannotations_info.data
      this.audioannotations.title = String.raw`${this.audioannotations.title}` 
      //Valor para inicializar el select
      this.id_coleccionparametro = this.audioannotations.collection_id._id
      this.id_lenguajeparametro = this.audioannotations.gid._id
      this.id_comunidadparametro = this.audioannotations.location._id

      this.agrupar_tier_acomodado()
      this.tier_acomodado = this.audioannotations.TIER
      //5f66395f6620c52fea0c5360
      this.axios
        .get('/collections/api/index/' + this.audioannotations.user._id)
        .then(response => {
          //self.axios.get("/collections/api/index/5f66395f6620c52fea0c5360").then((response) => {
          this.colecciones = response.data.collectionDocs
          //Inicializa select de languages y localities
          var audioTemporal
          audioTemporal = this.audioannotations.collection_id
          this.lenguaje = audioTemporal.languages
          this.comunidad = audioTemporal.localities
        })
      // }
    },
    agrupar_tier_acomodado: function() {
      for (var indice in this.audioannotations.TIER) {
        this.tier_participante.push(
          this.audioannotations.TIER[indice].PARTICIPANT
        )
      }
      const myUniqueArray = [...new Set(this.tier_participante)]
      this.tier_participante = myUniqueArray
    },
    selecion_todos_onoff: function(e) {
      console.log('valor ' + e.target.value)
      console.log('id ' + event.target.id)
      console.log('checado ' + e.target.checked)
      if (e.target.checked) {
        console.log('si esta en on')
        //this.tier_acomodado.find((x) => x.TIER_ID == e.target.id).Visible = true;
        //cambiar todos
        for (var indice in this.tier_acomodado) {
          if (this.tier_acomodado[indice].PARTICIPANT == e.target.id) {
            console.log(
              'Encontro a ' +
                this.tier_acomodado[indice].PARTICIPANT +
                ' ' +
                indice
            )
            this.tier_acomodado[indice].Visible = true
          }
        }
      } else {
        //this.tier_acomodado.find((x) => x.TIER_ID == e.target.id).Visible = false;
        console.log('si los hace off')
        for (var indice in this.tier_acomodado) {
          if (this.tier_acomodado[indice].PARTICIPANT == e.target.id) {
            console.log(
              'Encontro a ' +
                this.tier_acomodado[indice].PARTICIPANT +
                ' ' +
                indice
            )
            this.tier_acomodado[indice].Visible = false
          }
        }
      }
    },
    seleccion_onoff: function(e) {
      console.log('valor ' + e.target.value)
      console.log('id ' + event.target.id)
      console.log('checado ' + e.target.checked)
      if (e.target.checked) {
        console.log('si esta en on')
        this.tier_acomodado.find(x => x.TIER_ID == e.target.id).Visible = true
      } else {
        this.tier_acomodado.find(x => x.TIER_ID == e.target.id).Visible = false
        console.log('si lo off')
      }
    },
    seleccion_visualizacion_options: function(e) {
      if (
        this.tier_acomodado.find(x => x.TIER_ID == event.target.id).value !=
        event.target.value
      ) {
        this.tier_acomodado.find(x => x.TIER_ID == event.target.id).value =
          event.target.value
      }
    },
    selecion_todos_visualizacion_options: function(e) {
      console.log('valor ' + e.target.value)
      console.log('id ' + event.target.id)
      if (e.target.value == 'A') {
        console.log('si esta en online display')
        //this.tier_acomodado.find((x) => x.TIER_ID == e.target.id).Visible = true;
        //cambiar todos
        for (var indice in this.tier_acomodado) {
          if (this.tier_acomodado[indice].PARTICIPANT == e.target.id) {
            console.log(
              'Encontro a ' +
                this.tier_acomodado[indice].PARTICIPANT +
                ' ' +
                indice
            )
            this.tier_acomodado[indice].value = 'A'
          }
        }
      } else {
        //this.tier_acomodado.find((x) => x.TIER_ID == e.target.id).Visible = false;
        console.log('esta Multi-line display')
        for (var indice in this.tier_acomodado) {
          if (this.tier_acomodado[indice].PARTICIPANT == e.target.id) {
            console.log(
              'Encontro a ' +
                this.tier_acomodado[indice].PARTICIPANT +
                ' ' +
                indice
            )
            this.tier_acomodado[indice].value = 'B'
          }
        }
      }
    },
    seleccion_color: function(e) {
      console.log('---------seleccion_color ln 821-----------------------')
      // console.log(
      //   'valor original es ' +
      //     this.tier_acomodado.find(
      //       x => x.TIER_ID == this.quitarcolor_id(event.target.id)
      //     ).color
      // )
      // console.log(e.target.value)
      // console.log(e.target.id)
      if (
        this.tier_acomodado.find(
          x => x.TIER_ID == this.quitarcolor_id(event.target.id)
        ).color != event.target.value
      ) {
        //console.log("Si lo encontro "+this.options.find(x=>x.tier_id==event.target.id).value)
        this.tier_acomodado.find(
          x => x.TIER_ID == this.quitarcolor_id(event.target.id)
        ).color = event.target.value
      }
      // console.log(
      //   'Cambio el valor a ' +
      //     this.tier_acomodado.find(
      //       x => x.TIER_ID == this.quitarcolor_id(event.target.id)
      //     ).color
      // )
    },
    seleccion_todos_color: function(e) {
      // console.log(
      //   '----------El valor original del cambio de todos es----------------------' +
      //     e.target.id
      // )
      // console.log(
      //   'valor original es ' +
      //     this.tier_acomodado.find(x => x.TIER_ID == e.target.id).color
      // )
      // console.log('----------El valor q se pasa es----')
      // console.log(e.target.value)
      for (var indice in this.tier_acomodado) {
        if (this.tier_acomodado[indice].PARTICIPANT == e.target.id) {
          // console.log(
          //   'Encontro a ' +
          //     this.tier_acomodado[indice].PARTICIPANT +
          //     ' ' +
          //     indice
          // )
          this.tier_acomodado[indice].color = e.target.value
        }
      }
    },
  },
  computed: {},
  created() {
    var currentUrl = window.location.pathname
    this.ruta = currentUrl
    //console.log(currentUrl);
    var ultimoSlash = this.ruta.lastIndexOf('/')
    this.ruta = this.ruta.substring(ultimoSlash + 1)
  },
  beforeMount() {},
  mounted() {
    var self = this;
    self.axios.get('/audioannotations/index/' + self.ruta).then(response => {
      self.audioannotations_info = response
      //falta hacer algo self.leerTier();
      self.leerTierBD()
    })
    self.axios.get('/genres/api').then(response => {
      self.genero = response.data
      //falta hacer algo self.leerTier();
    })
    //this.agregar_tier_acomodado();colecciones

    // Internationalitation page with i18n
    self.axios.get('/i18n')
    .then((res) => {
      self.idioma = res.data.LANGUAGE;
      if(self.idioma === 'es') {
        // console.log('esta en español');
        this.$i18n.locale = 'es'
      } else if(self.idioma === 'en') {
        // console.log('esta en ingles');
        this.$i18n.locale = 'en'
      }
      
    })
  },
}
</script>

<style></style>
