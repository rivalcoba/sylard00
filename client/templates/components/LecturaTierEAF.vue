<template>
  <div>
    <div v-if="this.info.data">
      <p class="label" id="opciones_visuales_predeterminadas">
        {{ $t('lang.Default_visual_options') }}
      </p>
      <div class="contenedor_opciones_visuales_predeterminadas">
        <div v-for="(item2, index) in tier_participante" :key="'item' + index">
          <input hidden type="text" name="header" :value="item2" />
          <div class="contenedor_canal_audioanotacion">
            <div class="contenedor_canal_padre">
              <div class="contenedor_hablante">
                <p class="label label_al_100">
                  {{ $t('lang.reproductor_audioannotation.Hablante') }}
                </p>
                <input
                  type="text"
                  class="hablante_canal_padre_input"
                  :value="item2"
                  disabled
                />
                <button class="btn_accion_tabla" hidden>
                  <span class="icono_accion_tabla icon-edit"></span>
                </button>
              </div>
              <div class="contenedor_opciones_visuales_canal1_viewer">
                <div
                  class="contenedor_etiqueta_propiedad_opciones_visuales_agregar_audioanotacion contenedor_mostrar_canal"
                >
                  <label class="label label_al_100">{{
                    $t('lang.reproductor_audioannotation.mostrar')
                  }}</label>
                  <div class="contenedor_switch_canal_audioanotacion">
                    <label
                      class="swich_etiqueta_opcion1"
                      for="checkbox"
                      id="switch_canal1_off"
                      >{{ $t('lang.OPT_EDIT_AUDIOANNOTATION.OFF')}}</label
                    >
                    <label class="switch_general">
                      <input
                        type="checkbox"
                        :id="item2"
                        checked
                        @change="selecion_todos_onoff($event)"
                        class="checkbox_canal1"/>
                      <span class="slider_general round"></span 
                    ></label>
                    <label
                      class="swich_etiqueta_opcion2"
                      for="checbox_canal_1"
                      id="switch_usuario_canal1_on"
                      >{{ $t('lang.OPT_EDIT_AUDIOANNOTATION.ON')}}</label
                    >
                  </div>
                </div>
                <div
                  class="contenedor_etiqueta_propiedad_opciones_visuales_agregar_audioanotacion contenedor_visualizar_canal_en"
                >
                  <label class="label label_al_100">{{
                    $t('lang.reproductor_audioannotation.visualizar')
                  }}</label>

                  <select
                    class="opciones_despliegue_viewer input_flexible"
                    :id="item2"
                    @change="selecion_todos_visualizacion_options($event)"
                  >
                    <option value="B">{{ $t('lang.OPT_EDIT_AUDIOANNOTATION.VISU_SCROLL') }}</option>
                    <option value="A" selected>{{ $t('lang.OPT_EDIT_AUDIOANNOTATION.VISU_DIS') }}</option>
                  </select>
                </div>
                <div
                  class="contenedor_etiqueta_propiedad_opciones_visuales_agregar_audioanotacion color_audioanotacion"
                >
                  <label class="label label_al_100">{{
                    $t('lang.reproductor_audioannotation.colorTipo')
                  }}</label>
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
                  /><!--PENDIENTE COLOR-PICKET Inicio create-->
                  <input type="text" value="header" hidden />
                  <input type="text" value="header" hidden />
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
            <div class="contenedor_canal_hijo" v-if="item2 == item.PARTICIPANT">
              <div class="contenedor_hablante_hijo">
                <input
                  hidden
                  type="text"
                  name="LINGUISTIC_TYPE_REF"
                  :value="item.LINGUISTIC_TYPE_REF"
                />
                <input
                  hidden
                  type="text"
                  name="TIER_ID"
                  :value="item.TIER_ID"
                />
                <input
                  hidden
                  type="text"
                  name="PARTICIPANT"
                  :value="item.PARTICIPANT"
                />
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
                      >{{ $t('lang.OPT_EDIT_AUDIOANNOTATION.OFF') }}</label
                    >
                    <label class="switch_general">
                      <!-- CHECKBOX QUE CONTROLA VISUALIZACION DE CADA HABLABTE -->
                      <!-- TODO: Aqui  @change="seleccion_onoff($event)" no es necesario, verificar -->
                      <!-- Si se puede remover con seguridad -->
                      <input
                        type="checkbox"
                        :id="item.TIER_ID"
                        @change="seleccion_onoff($event)"
                        v-model="item.Visible"
                        class="checkbox_canal1"/>
                      <span class="slider_general round"></span
                    ></label>
                    <label
                      class="swich_etiqueta_opcion2"
                      for="checbox_canal_1"
                      id="switch_usuario_canal1_on"
                      >{{ $t('lang.OPT_EDIT_AUDIOANNOTATION.ON') }}</label
                    >
                    <input
                      hidden
                      type="text"
                      :value="item.Visible"
                      name="Visible"
                    />
                  </div>
                </div>
                <div
                  class="contenedor_etiqueta_propiedad_opciones_visuales_agregar_audioanotacion contenedor_visualizar_canal_en"
                >
                  <select
                    class="opciones_despliegue_viewer input_flexible"
                    name="value"
                    :id="item.TIER_ID"
                    v-model="item.value"
                    @change="seleccion_visualizacion_options($event)"
                  >
                    <option value="B">{{ $t('lang.OPT_EDIT_AUDIOANNOTATION.VISU_SCROLL') }}</option>
                    <option value="A" selected>{{ $t('lang.OPT_EDIT_AUDIOANNOTATION.VISU_DIS') }}</option>
                  </select>
                </div>
                <div
                  class="contenedor_etiqueta_propiedad_opciones_visuales_agregar_audioanotacion color_audioanotacion"
                >
                  <!--<input type="text" class="inp input_flexible" id="colorPicker" autocomplete="off">-->
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
                  /><!--PENDIENTE PICKET-->
                  <div
                    class="palette"
                    :data-did="'A' + (index + 1) + '-colorPalette'"
                    :id="'A' + (index + 1) + '-colorPalette'"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <input hidden type="text" name="capas" :value="tier_acomodado.length" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'LecturaTierEAF',
  data() {
    return {
      //data here
      info: [],
      valor: 'hello',
      archivo: '',
      tier_acomodado: [],
      tier_agrupado: [],
      tier_participante: [],
      display: [
        {
          value: 'A',
          name: 'On-Line-Display',
        },
        {
          value: 'B',
          name: 'Scrolling',
        },
      ],
    }
  },created(){
    /*
    setTimeout(() => {
       axios.get("/cleaneafs");
    }, 7000);
    */
  }
  ,
  methods: {
    colorclase: function(color) {
      return 'border-right: 2rem solid ' + color
    },
    metodocolor: function(parametro, e, valor) {
      //this.quitarcolor_id(event.target.id)

      var valorpaleta, valorcolor
      valorcolor = 'A' + (parametro + valor) + '-colorPicker'
      valorpaleta = 'A' + (parametro + valor) + '-colorPalette'
      // LOGS
      console.log(`<metodocolor> Idx: ${parametro} - Paleta: ${valorpaleta} - Picker: ${valorcolor}`);
      console.log(`<metodocolor> Target ID: ${e.target.id}`);
      let tierId = e.target.id;
      showColorPalette(valorcolor, valorpaleta, tierId)
      //  this.cambiarcolor(e)
      //return parametro
    },
    metodoblur: function(parametro, e, valor) {
      //"hideColorPalette('A1-colorPicker','A1-colorPalette')"
      var valorpaleta, valorcolor
      valorcolor = 'A' + (parametro + valor) + '-colorPicker'
      valorpaleta = 'A' + (parametro + valor) + '-colorPalette'

      console.log(
        'este es el parametro del blur ' +
          parametro +
          ' p ' +
          valorpaleta +
          ' c ' +
          valorcolor
      )
      hideColorPalette(valorcolor, valorpaleta)
      //this.cambiarcolor(e);
    },
    agregar_tier_acomodado: function() {
      for (var indice in this.info.data.tier) {
        //console.log(this.info.data.tier[indice][0])
        let state = true;
        let defLoc='none';
        try{
          this.info.data.tier[indice][0].DEFAULT_LOCALE[0];
        }catch{
          state=false;
        }
        if(state){
          defLoc=this.info.data.tier[indice][0].DEFAULT_LOCALE[0];
        }
        this.tier_acomodado.push({
          DEFAULT_LOCALE: defLoc,
          PARTICIPANT: this.info.data.tier[indice][0].PARTICIPANT[0],
          LINGUISTIC_TYPE_REF: this.info.data.tier[indice][0]
            .LINGUISTIC_TYPE_REF[0],
          TIER_ID: this.info.data.tier[indice][0].TIER_ID[0],
          value: 'A',
          Visible: true,
          color: '#000000',
        })
        //  this.info.data.tier[indice].forEach(x => {
        //        console.log(x)
        //  if (indice == 0) {
        //    this.tier_acomodado.push(x.PARTICIPANT)
        //}

        //})
      }
      this.ordenar_tier_acomodado(this.tier_acomodado, 'PARTICIPANT')
      console.log(this.tier_acomodado)
      console.log('Ya lo ordeno')
      this.agrupar_tier_acomodado()
      console.log('Ya lo Acomodo')
    },
    ordenar_tier_acomodado: function(p_array_json, p_key) {
      p_array_json.sort(function(a, b) {
        return a[p_key] > b[p_key]
      })
    },
    buscar_participante_value: function(item) {
      var valor = this.tier_agrupado.find(x => x.PARTICIPANT == item)
      //console.log("Aqui "+item)
      //console.log("otro "+valor)
      return valor
    },
    seleccion_visualizacion_options: function(e) {
      console.log('--------------------------------')
      console.log(
        'valor original es ' +
          this.tier_acomodado.find(x => x.TIER_ID == event.target.id).value
      )
      console.log(e.target.value)
      console.log(event.target.id)
      // console.log(arreglo_ref_tiempo.find(x=>x.ANNOTATION_ID===ts).TIME_SLOT_REF1)
      //console.log("Si lo encontro "+this.options.find(x=>x.tier_id==event.target.id).value)
      if (
        this.tier_acomodado.find(x => x.TIER_ID == event.target.id).value !=
        event.target.value
      ) {
        //console.log("Si lo encontro "+this.options.find(x=>x.tier_id==event.target.id).value)
        this.tier_acomodado.find(x => x.TIER_ID == event.target.id).value =
          event.target.value
      }
      console.log(
        'Cambio el valor a ' +
          this.tier_acomodado.find(x => x.TIER_ID == event.target.id).value
      )
      //this.options.push({ tier_id:'2',tier_name:event.target.id, value: 'A' })
    },
    selecion_todos_visualizacion_options: function(e) {
      //aqui me quede seleccionando por participante para que desbloquee todos
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
    agrupar_tier_acomodado: function() {
      for (var indice in this.tier_acomodado) {
        // this.tier_acomodado[indice][0]
        //if (this.tier_acomodado[indice].PARTICIPANT != this.buscar_participante_value(this.tier_agrupado[indice].PARTICIPANT)) {

        //if (this.tier_agrupado.indexOf(this.tier_acomodado[indice].PARTICIPANT) === -1) {
        // this.tier_agrupado.push(this.tier_acomodado[indice].PARTICIPANT)
        //antes this.tier_participante.push(this.tier_acomodado[indice].PARTICIPANT[0])

        this.tier_participante.push(this.tier_acomodado[indice].PARTICIPANT)
        //  console.log("No lo encontro")
        //} else if (this.tier_agrupado.indexOf(this.tier_acomodado[indice].PARTICIPANT) > -1) {
        //console.log("Ya lo encontro")
        // console.log("si lo encontro" +
        //this.buscar_participante_value(this.tier_agrupado[indice].PARTICIPANT))

        //}
      }
      const myUniqueArray = [...new Set(this.tier_participante)] // myArray = [...new Set(myArray)];
      this.tier_participante = myUniqueArray
      //recorrer para agrupar

      //for (var indice in this.tier_acomodado) {
      //for (var i in this.tier_participante) {
      //    if (this.tier_acomodado[indice].PARTICIPANT[0] == this.tier_participante[i]) {
      //this.tier_agrupado.push(this.tier_acomodado[indice].PARTICIPANT[0])
      // }

      // }
      // }
      //console.log(myUniqueArray); // console.log(myArray)
    },
    selecion_todos_onoff: function(e) {
      //aqui me quede seleccionando por participante para que desbloquee todos
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
    seleccion_color: function(e) {
      console.log('--------------------------------')
      console.log(
        'valor original es ' +
          this.tier_acomodado.find(x => x.TIER_ID == event.target.id).color
      )
      console.log(e.target.value)
      console.log(event.target.id)
      if (
        this.tier_acomodado.find(x => x.TIER_ID == event.target.id).color !=
        event.target.value
      ) {
        //console.log("Si lo encontro "+this.options.find(x=>x.tier_id==event.target.id).value)
        this.tier_acomodado.find(x => x.TIER_ID == event.target.id).color =
          event.target.value
      }
      console.log(
        'Cambio el valor a ' +
          this.tier_acomodado.find(x => x.TIER_ID == event.target.id).color
      )
      //this.options.push({ tier_id:'2',tier_name:event.target.id, value: 'A' })
    },
    seleccion_todos_color: function(e) {
      console.log('--------------------------------')
      console.log(
        'valor original es ' +
          this.tier_acomodado.find(x => x.TIER_ID == event.target.id).color
      )
      console.log(e.target.value)
      console.log(event.target.id)
      for (var indice in this.tier_acomodado) {
        if (this.tier_acomodado[indice].PARTICIPANT == e.target.id) {
          console.log(
            'Encontro a ' +
              this.tier_acomodado[indice].PARTICIPANT +
              ' ' +
              indice
          )
          this.tier_acomodado[indice].color = e.target.value
        }
      }
    },
  },

  activated() {
    //this.leerTier();
  },
  updated() {
    //this.leerTier();
  },
  mounted() {
    var self = this
    this.axios
      .get('/eaf/tmp/Nuevoeaf.json')
      //.then((response) => (this.info = response));
      .then(response => {
        this.info = response
        self.agregar_tier_acomodado()
      })
    //INTERNATIONALITATION PAGE WITH I18N
    self.axios.get('/i18n').then(response => {
      self.idioma = response.data.LANGUAGE
      if (self.idioma === 'es') {
        //console.log("esta en español");
        this.$i18n.locale = 'es'
      } else if (self.idioma === 'en') {
        //console.log("esta en ingles");
        this.$i18n.locale = 'en'
      }
    }).catch(error => {
      console.log(`LecturaTierEAF.vue: LN523: Error al cargar internacionalización: ${error}`);
    });
    //this.agregar_tier_acomodado();
  },
}
</script>
