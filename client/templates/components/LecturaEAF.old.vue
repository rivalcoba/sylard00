<template>
  <div>
    <button class="contenedor_acordeon">
      <span class="icono_acordeon icon-chevron-down"></span> Opciones visuales
    </button>
    <!-- https://www.youtube.com/watch?v=NPGkoOQPtJs
    min  9:05-->
    <div id="app">
      <!--  {{ info }} -->
      <div v-if="this.info.data">
        <table>
          <!--Si hay datos Linea por Linea
            {{$attrs.tiempo_parametro}} {{$attrs.longitud_tiempo}}
            <button v-on:click="leerTier">Saludar</button>
            <br />-->
          {{
            recorrer_todo($attrs.longitud_tiempo)
          }}

          <tr>
            <div v-for="(item, index) in options" :key="'item' + index">
              <td>
              <div class="contenedor_hablante_y_switch">
                <p class="label label_switch_horizontal">
                  Canal {{ index + 1 }} ({{ item.LINGUISTIC_TYPE_REF }})
                </p>
                <div class="contenedor_switch_canal">
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
                      v-model="item.Visible" />
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
              <!--<label for="checkbox" value="on" name="on" id="on"> </label>
               <input type="checkbox" :id="item.TIER_ID" checked @change="seleccion_onoff($event)" />
               -->

              <h5 class="nombre_hablante">{{ item.PARTICIPANT }} {{ item.TIER_ID }}</h5>
              <div class="contenedor_opciones_visuales_canal1_viewer">
                <!-- <select v-model="item.value" :id="item.TIER_ID" @change="seleccion_visualizacion_options($event)">
                -->
                <select
                  class="opciones_despliegue_viewer"
                  v-model="item.value"
                  :id="item.TIER_ID"
                >
                  <option value="B">Scrolling</option>
                  <option value="A" selected>On-Line-Display</option>
                </select>
                <!--  <input class="inp" name="color" type="text"  :id="item.TIER_ID" v-model="item.color" /> 
                cambiar data-id que sea unico-->

                <div
                  class="contenedor_etiqueta_propiedad_opciones_visuales_agregar_audioanotacion color_audioanotacion"
                >
                  <input
                    :class="[activeClass]"
                    v-bind:style="colorclase(item.color)"
                    :data-did="'A' + (index + 1) + '-colorPicker'"
                    name="color"
                    :id="'color_' + item.TIER_ID"
                    autocomplete="off"
                    type="text"
                    v-model="item.color"
                    v-on:input="cambiarcolor($event)"
                    @click="metodocolor(index, $event)"
                    @blur="metodoblur(index, $event)"
                  />
                  <div
                    class="palette"
                    :data-did="'A' + (index + 1) + '-colorPalette'"
                    :id="'A' + (index + 1) + '-colorPalette'"
                  ></div>
                </div>
              </div>
              </td>
            </div>

            <div
              class="contenedor_one_line_display"
              v-for="(item, index) in otro"
              :key="index"
            >
              <table class="table_one_line">
                <div v-if="options[index].Visible">
                  <div v-if="options[index].value == 'A'">
                    <!--{{computedColor=options[index].color}}-->
                    <div v-for="(item, index) in otro[index]" :key="index">
                      <div
                        v-if="
                          $attrs.tiempo_parametro >= item.TIME_SLOT_REF1 &&
                          $attrs.tiempo_parametro <= item.TIME_SLOT_REF2
                        "
                      >
                        <td>
                          <p class="canal_1_hablante_one_line_display_item">
                            <span v-bind:style="{ color: options[index].color }">
                              {{ item.ANNOTATION_VALUE }}
                            </span>
                            <!--  <span class="siglas_canal_item"></span>
                            {{ item.ANNOTATION_VALUE }}-->
                          </p>
                          <!--{{tier_temp}}:-->
                          <!--  me quede 
                                    {{sincronizar(7)}}
                                    -->
                          <!-- {{item.ANNOTATION_ID}} 
                {{item.TIME_SLOT_REF1}} {{item.TIME_SLOT_REF2}} -->
                        </td>
                      </div>
                      <div v-if="index == 0">
                        <!-- {{item.DEFAULT_LOCALE[index]}} ({{item.LINGUISTIC_TYPE_REF[index]}}) {{item.PARTICIPANT[index]}}
                {{tier_temp=item.TIER_ID[index]}}:-->
                        <p class="canal_1_hablante_one_line_display_item">
                          <span class="siglas_canal_item"
                            >{{ item.TIER_ID[index] }} :
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </table>
            </div>
          </tr>
        </table>
      </div>
      <p v-else>loading.....</p>
      <div v-if="this.info.data">
        <hr />
        <div class="contenedor_multilinea">
          <table class="tabla_multilinea">
            <!--<div v-for="(item, index) in otro" :key="index">
                <div v-if="options[index].Visible">
                    <div v-if="options[index].value=='B'">
                        <div v-for="(item, index) in otro[index]" :key="index">
                            <div v-if="
                    $attrs.tiempo_parametro >= item.TIME_SLOT_REF1 &&
                      $attrs.tiempo_parametro <= item.TIME_SLOT_REF2 - 1
                  ">
                                <b> {{ item.ANNOTATION_VALUE }} </b>
                            </div>
                            <p v-else>{{ item.ANNOTATION_VALUE }}</p>
                            <div v-if="index == 0">
                                <b> {{ item.TIER_ID[index] }} : </b>
                               este no va// {{item.DEFAULT_LOCALE[index]}} {{item.LINGUISTIC_TYPE_REF[index]}}  {{item.PARTICIPANT[index]}}
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            -->
            <div v-for="(item, index) in tempdata" :key="index">
              <div
                v-if="
                  $attrs.tiempo_parametro >= item.TIME_SLOT_REF1 &&
                  $attrs.tiempo_parametro <= item.TIME_SLOT_REF2
                "
              >
                <!-- $attrs.tiempo_parametro <= item.TIME_SLOT_REF2 -1 -->
                <tr class="row_multilinea">
                  <td rowspan="2" class="td_canal reproduccion">
                    <span class="bocina_reproduccion icon-volume-up"></span>
                  </td>
                  <td class="td_canal">
                    <!--<span :style="traer_color(item.TIER_ID)">
                     traer el color del item.TIER_ID de this.audioannotations traer_color(item.TIER_ID) -->
                    <span v-bind:style="{ color: traer_color(item.TIER_ID) }">
                      {{ item.TIER_ID }}:
                    </span>
                    {{ item.ANNOTATION_VALUE }}
                  </td>
                </tr>
              </div>
              <div v-else>
                <tr class="row_multilinea">
                  <td class="td_reproduccion">
                    <span></span>
                  </td>
                  <td>
                    <span v-on:click="mensaje_al_player(item.TIME_SLOT_REF1)">
                      {{ item.TIER_ID }}: </span
                    >{{ item.TIME_SLOT_REF1 }}
                    {{ item.ANNOTATION_VALUE }}
                  </td>
                </tr>
                <!--Aqui me quede arreglando el scroll    <button v-on:click="mensaje_al_player(item.TIME_SLOT_REF1)"></button>-->
              </div>
            </div>
          </table>
        </div>
      </div>
      <p v-else>Cargando.....</p>
    </div>
  </div>
</template>

props:['tiempo_parametro','tiempo_longitud'],

<script>
export default {
  name: "LecturaEAF",

  data() {
    return {
      info: [],
      audioannotations_info: [],
      otro: [],
      selected: "A",
      tier_temp: "",
      options: [],
      results: [],
      tempdata: [],
      contador: 0,
      audioannotations: [],
      mp3Audio: "",
      tituloAudioannotation: "",
      ruta: "otro valor",
      color_tier: "#000000",
    };
  },
  computed: {
    get: () => {},
    set: () => {},
  },
  methods: {
    colorclase: function (color) {
      return "border-right: 2rem solid " + color;
    },
    quitarcolor_id: function (e) {
      var color_name = e;
      // console.log("---------original-----------------------");
      // console.log(color_name);
      // console.log("----------sin color_----------------------");
      // console.log(color_name.replace("color_", ""));
      return color_name.replace("color_", "");
    },
    cambiarcolor: function (e) {
      console.log("-------------cambiar color-------------------");
      console.log(
        "valor original es " +
          this.options.find((x) => x.TIER_ID == this.quitarcolor_id(e.target.id)).color
      );

      console.log("---------Valor-----------------------");
      console.log(e.target.value);
      console.log("--------id------------------------");
      console.log(e.target.id);
      this.options.find((x) => x.TIER_ID == this.quitarcolor_id(e.target.id)).color =
        e.target.value;
      return e.target.value;
    },
    metodocolor: function (parametro, e) {
      //this.quitarcolor_id(event.target.id)

      var valorpaleta, valorcolor;
      valorcolor = "A" + (parametro + 1) + "-colorPicker";
      valorpaleta = "A" + (parametro + 1) + "-colorPalette";
      showColorPalette(valorcolor, valorpaleta);
      // console.log(
      //   "este es el parametro del colorpicker " +
      //     parametro +
      //     " p " +
      //     valorpaleta +
      //     " c " +
      //     valorcolor
      // );
      //  this.cambiarcolor(e)
      //return parametro
    },
    metodoblur: function (parametro, e) {
      //"hideColorPalette('A1-colorPicker','A1-colorPalette')"
      var valorpaleta, valorcolor;
      valorcolor = "A" + (parametro + 1) + "-colorPicker";
      valorpaleta = "A" + (parametro + 1) + "-colorPalette";
      hideColorPalette(valorcolor, valorpaleta);
      console.log(
        "este es el parametro del blur " +
          parametro +
          " p " +
          valorpaleta +
          " c " +
          valorcolor
      );
      this.cambiarcolor(e);
    },

    traer_color: function (tier_id) {
      // return "color:"+this.audioannotations.find(x => x.TIER_ID == tier_id).color

      //this.options.find((x) => x.TIER_ID == event.target.id).value = event.target.value;
      //return color aqui me quede trayendo el color de audioannotations por id
      var valor_color = this.options.find((x) => x.TIER_ID == tier_id).color;
      return valor_color;
    },
    mensaje_al_player: function (tiempo) {
      console.log("Se envia un msg al player " + tiempo);
      this.$emit("mensaje_scroll", tiempo);
      //this.$emit('nombre_mp3',this.mp3Audio)
    },
    recorrer_todo: function (longitud) {
      for (var i = 0; i <= longitud; i++) {
        this.recorrer(i);
      }
      //this.recorrer(7)
      //+ console.log("Este el  ultimo contador" + this.contador)
    },
    recorrer: function (item) {
      //https://stackoverflow.com/questions/38618088/how-to-find-multiple-elements-in-array-javascript-es6

      for (var indice in this.otro) {
        this.otro[indice].forEach((x) => {
          //  var temp = ((x.TIME_SLOT_REF1 == item) || (x.TIME_SLOT_REF2 == item))
          //console.log("temporal " + temp)
          //if (this.results.find(((x) => x == ((x.TIME_SLOT_REF1 == item) || (x.TIME_SLOT_REF2 == item))))) {

          //console.log("+++++rrrrr+++" + this.otro[indice][0].PARTICIPANT)

          //if (this.results.find(((x) => x.TIME_SLOT_REF1 >= item) && ((x) => x.TIME_SLOT_REF2 <= item))) {
          if (
            (x.TIME_SLOT_REF1 == item || x.TIME_SLOT_REF2 == item) &&
            this.results.indexOf(x) === -1
          ) {
            this.results.push(x);
            //aqui me quede arreglando el multilinea
            //checar https://stackoverflow.com/questions/7858385/how-to-add-values-to-an-array-of-objects-dynamically-in-javascript
            this.tempdata[this.contador] = {};
            this.tempdata[this.contador] = {
              TIER_ID: this.otro[indice][0].TIER_ID[0],
              ANNOTATION_ID: x.ANNOTATION_ID,
              ANNOTATION_VALUE: x.ANNOTATION_VALUE,
              TIME_SLOT_REF1: x.TIME_SLOT_REF1,
              TIME_SLOT_REF2: x.TIME_SLOT_REF2,
              // valor: "valor " + indice
            };

            //+ console.log("+++++rrrrr+++" + this.otro[indice][0].TIER_ID)
            //+ console.log("anotatio id" + x.ANNOTATION_ID)
            //+ console.log("value " + x.ANNOTATION_VALUE)
            //+ console.log("value TIME_SLOT_REF1 y 2:" + x.TIME_SLOT_REF1 + " " + x.TIME_SLOT_REF2)
            //+ console.log("-----Este es el contador" + this.contador + "-----")
            this.contador++;
            //this.results.push(tempdata)
            //console.log("el valor " + this.otro[indice][0].TIER_ID[0])

            //
          }
          //if ((x.TIME_SLOT_REF2 <= item)) results.push(x)

          //}
        });
      }

      //this.results.push(data)
      //console.log("Estos son los arreglos" + tempdata)
    },
    sincronizar: function (item) {
      // me quede
      //chechar https://www.geeksforgeeks.org/indexof-method-in-an-object-array-in-javascript/
      //+console.log("--Aqui--" + item)
      var valor = this.otro[1].find(
        ((x) => x.TIME_SLOT_REF1 >= item) && ((x) => x.TIME_SLOT_REF2 <= item)
      );
      //var valor = this.otro[1].find((x) => x.TIME_SLOT_REF1 >= item);
      //+console.log("--Aqui--" + valor)
      return valor;
    },
    buscar_option_value: function (item) {
      var valor = this.options.find((x) => x.TIER_ID == item);
      //console.log("Aqui "+item)
      //console.log("otro "+valor)
      return valor;
    },
    seleccion_onoff: function (e) {
      //+console.log(e.target.value);
      //+console.log(event.target.id);
      //+console.log(e.target.checked);
      if (e.target.checked) {
        //+console.log("si esta en on");
        this.options.find((x) => x.TIER_ID == e.target.id).Visible = true;
      } else {
        this.options.find((x) => x.TIER_ID == e.target.id).Visible = false;
        //+console.log("si lo off");
      }
      //+  console.log(
      //+     "Lo dejo en " +
      //+       event.target.id +
      //+      " " +
      //+      this.options.find((x) => x.tier_id == e.target.id).Visible
      //+   );
    },
    seleccion_visualizacion_options: function (e) {
      //+  console.log("--------------------------------");
      //+   console.log(
      //+       "valor original es " +
      //+      this.options.find((x) => x.tier_id == event.target.id).value
      //+    );
      //+    console.log(e.target.value);
      //+     console.log(event.target.id);
      // console.log(arreglo_ref_tiempo.find(x=>x.ANNOTATION_ID===ts).TIME_SLOT_REF1)
      //console.log("Si lo encontro "+this.options.find(x=>x.tier_id==event.target.id).value)
      if (
        this.options.find((x) => x.TIER_ID == event.target.id).value != event.target.value
      ) {
        //console.log("Si lo encontro "+this.options.find(x=>x.tier_id==event.target.id).value)
        this.options.find((x) => x.TIER_ID == event.target.id).value = event.target.value;
      }
      //+   console.log(
      //+      "Cambio el valor a " +
      //+     this.options.find((x) => x.tier_id == event.target.id).value
      //+    );
      //this.options.push({ tier_id:'2',tier_name:event.target.id, value: 'A' })
    }, //audioannotations
    leerAudioannotationsMp3: function () {
      // var i=0;
      console.log("esta leyendo la mp3");

      this.mp3Audio = this.audioannotations_info.data.mp3_url;
      console.log(this.mp3Audio);
      //return true;
    },
    leerTierBD: function () {
      for (var i in this.audioannotations_info.data.TIER) {
        // console.log("----------Tier de BD ---------"+i)
        // console.log (this.audioannotations_info.data.TIER[i].LINGUISTIC_TYPE_REF)
        // console.log (this.audioannotations_info.data.TIER[i].PARTICIPANT)
        // console.log(this.audioannotations_info.data.TIER[i].TIER_ID)
        // console.log(this.audioannotations_info.data.TIER[i].Visible)
        // console.log(this.audioannotations_info.data.TIER[i].color)
        // console.log(this.audioannotations_info.data.TIER[i].value)
        this.audioannotations.push(this.audioannotations_info.data.TIER[i]);
      }
    },
    leerTier: function () {
      // var i=0;
      console.log("esta leyendo la tier");
      for (var i in this.info.data.tier) {
        //+   console.log("aqui si entro 1");
        //console.log(this.info.data.tier[i]);
        //+   console.log("aqui si entro 2");
        //7/08/2020 aqui no puedo quitar infinite loop
        this.otro.push(this.info.data.tier[i]);
        //console.log("aqui si entro 3")
        //+    console.log("Tier num " + i);
        // console.log(this.info.data.ANNOTATION_DOCUMENT.tier[1]);
        //console.log(this.info.data);
      }
      for (var j in this.otro) {
        //Agrega al vector options para mostrar una linea o multiples
        this.options.push({
          _id: j,
          TIER_ID: this.otro[j][0].TIER_ID[0],
          PARTICIPANT: this.otro[j][0].PARTICIPANT[0],
          value: "A",
          Visible: true,
          color: "#000000",
          LINGUISTIC_TYPE_REF: "Transcripción",
        });
      }
      // for (var j in this.audioannotations) {
      //   //Agrega al vector options para mostrar una linea o multiples
      //   this.options.push({
      //     _id: this.audioannotations[j]._id,
      //     TIER_ID: this.audioannotations[j].TIER_ID,
      //     PARTICIPANT: this.audioannotations[j].PARTICIPANT,
      //     value: this.audioannotations[j].value,
      //     Visible: this.audioannotations[j].Visible,
      //     color: this.audioannotations[j].color,
      //     LINGUISTIC_TYPE_REF:this.audioannotations[j].LINGUISTIC_TYPE_REF
      //   });
      // }
      // console.log("se asigno el vector audioannotations a options")
      // se asigno el vector audioannotations a options
      //this.options = this.audioannotations;
      //return true;
    },

    saveFileJSon: function () {
      const data = JSON.stringify(this.otro);
      window.localStorage.setItem("otro", data);
      //console.log(JSON.parse(window.localStorage.getItem('info')))
      //console.log("se creo el json");
      return "ok";
    },
    time_order_sub: function (text) {
      //       var parser, xmlDoc;
      //parser = new DOMParser();
      //xmlDoc = parser.parseFromString(text,"text/xml");
      //document.getElementById("demo").innerHTML =
      //xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
      return text;
    },
    add: function (valor) {
      this.otro.push({
        first: "1",
        lastn: "3",
      });
      //+   console.log(valor);
      //+   console.log(1);
    },
  },
  created() {
    //      console.log("Aqui se creo el json");
    //this.saveFileJSon();
    //this.leerTier();
  },
  activated() {
    //this.leerTier();
  },
  updated() {
    //this.leerTier();
  },
  created() {
    var currentUrl = window.location.pathname;
    this.ruta = currentUrl;
    //console.log(currentUrl);
    var ultimoSlash = this.ruta.lastIndexOf("/");
    this.ruta = this.ruta.substring(ultimoSlash + 1);
  },
  computed: {
    computedColor: {
      set(value) {
        this.color_tier = value;
      },
      get() {
        return this.color_tier;
      },
    },
  },
  mounted() {
    // var parseString = require('xml2js').parseString;
    //estaba montando el xml
    // this.axios
    //.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    //.then(response => (this.info = response))

    //this.axios.get('/eaf/asset01.eaf')
    //       .then(response =>  (this.info = response)          );
    var self = this;
    this.axios.get("/eaf/tmp/Nuevoeaf.json").then((response) => {
      this.info = response;
      self.leerTier();
    });
    this.axios.get("/audioannotations/index/" + self.ruta).then((response) => {
      this.audioannotations_info = response;
      //falta hacer algo self.leerTier();
      self.leerAudioannotationsMp3();
      self.$root.$emit("valor_mp3", self.mp3Audio);
      self.leerTierBD();
      self.tituloAudioannotation = self.audioannotations_info.data.title;
      self.$root.$emit("tituloAudioannotation", self.tituloAudioannotation);
      self.options = self.audioannotations;
    });
    //this.saveFileJSon();
    //console.log("Aqui se esta añadiendo al json");
    //this.add("hola");
    //this.leerTier();
    //leer script color picker
    // let la_colorScript = document.createElement('script')
    // la_colorScript.setAttribute('src', 'https://cdn.glitch.com/120f087f-0e29-4163-9f0b-687d6b040d37%2Fla_color_picker.js')
    // document.head.appendChild(la_colorScript)
  },
};
</script>
