<template>
  <div id="EditAudioannotations">
    <div v-if="this.audioannotations_info.data">
      <div>Archivo Cargado: {{ this.audioannotations.eaf }}</div>
      <div>
        <div>
          <label for="mp3_url">MP3</label>
          <label>Cargado: {{ this.audioannotations.mp3_url }}</label>
          <br /><br />
        </div>

        <div>
          <label for="duracion">Duracion {{ this.audioannotations.duration }}</label>
          <br /><br />
        </div>

        <div>
          <label for="titulo">Titulo:</label>
          <input
            type="text"
            id="titulo"
            v-model="audioannotations.title"
            name="title"
          /><br /><br />
        </div>

        <div>
          <label for="descripcion">Descripcion:</label>
          <input
            type="text"
            id="description"
            name="audioannotations.description"
            v-model="audioannotations.description"
          /><br /><br />
        </div>
      </div>
 Coleccion:
      <select v-model="selected" @change="changeColeccion($event)">
        <option disabled value="">Selecciona una opción</option>
        <option
          v-for="(item3, index) in colecciones"
          :key="'item3' + index"
          v-bind:value="item3._id"
        >
          {{ item3.name }}
        </option>
      </select><br /><br />
      Lengua Terminal y Grupo de lenguas
      <select @change="changeLenguaje($event)">
        <option
          v-for="(item4, index) in lenguage"
          :key="'item4' + index"
          v-bind:value="item4._id"
        >
          {{ item4.language.name }} {{ item4.LanguageGroup.name }}
        </option>
      </select><br /><br />
      Comunidad a la que pertenece
      <select @change="changeComunidad($event)">
        <option
          v-for="(item5, index) in comunidad"
          :key="'item5' + index"
          v-bind:value="item5._id"
        >
          {{ item5.Nom_Loc }}-{{ item5.Nom_Mun }}-{{ item5.Nom_Ent }}
        </option>
      </select><br /><br />
      <div v-for="(item2, index) in tier_participante" :key="'item' + index">
        <table>
          <tr>
            <th>Canal Hablante</th>
            <th>Mostrar</th>
            <th>Visualiza en</th>
            <th>Color de Tipográfia</th>
          </tr>
          <tr>
            <td>✔ Canal de Hablante: {{ item2 }}</td>
            <td>
              <input
                type="checkbox"
                :id="item2"
                checked
                @change="selecion_todos_onoff($event)"
              />
            </td>
            <td>
              <select :id="item2" @change="selecion_todos_visualizacion_options($event)">
                <option value="B">Scrolling</option>
                <option value="A" selected>On-Line-Display</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                :id="item2"
                value="#000000"
                @change="seleccion_todos_color($event)"
              />
            </td>
          </tr>

          <div v-for="(item, index) in tier_acomodado" :key="'item' + index">
            <tr v-if="item2 == item.PARTICIPANT">
              <td>{{ item.TIER_ID }}</td>

              <td>
                <input
                  type="checkbox"
                  :id="item.TIER_ID"
                  v-model="item.Visible"
                  :value="item.Visible"
                  @change="seleccion_onoff($event)"
                />
              </td>

              <td>
                <select
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
              </td>

              <td>
                <input
                  name="color"
                  type="text"
                  :id="item.TIER_ID"
                  :value="item.color"
                  @change="seleccion_color($event)"
                />
              </td>
            </tr>
          </div>
        </table>
      </div>
    </div>
    <button v-on:click="enviardatos()">Enviar</button>
  </div>
</template>
<script>
export default {
  name: "EditAudioannotations",
  //  props:{idParametro:{
  //     type: String,
  //     default: '0',
  // 	}},
  props: ["idParametro"],
  data() {
    return {
      who: "world",
      json: {},
      ruta: "otro valor",
      audioannotations_info: [],
      audioannotations: [],
      tier_participante: [],
      tier_acomodado: [],
      colecciones: [],
      selected: "Selecciona una opción",
      coleccion:[],
      lenguage: [],
      comunidad: [],
    };
  },
  methods: {
    changeColeccion: function (e) {
      console.log("valor " + e.target.value);
      console.log(this.colecciones.find((x) => x._id == e.target.value));
      if (e.target.value === undefined) {
        this.lenguage = [];
        console.log("Esta entrando al undefined colection")
      } else {
        this.coleccion=this.colecciones.find((x) => x._id == e.target.value)
        this.lenguage = this.colecciones.find((x) => x._id == e.target.value).languages;
        console.log("++++++++Lenguajes++++++++")
        console.log(this.lenguage)
        this.comunidad = this.colecciones.find((x) => x._id == e.target.value).localities;
        console.log("++++++++localities++++++++")
        console.log(this.comunidad)
        //Aqui me quede quitando el error cuando entra por primera vez deja 2 localities y
        //dos lenguajes
        //this.coleccion.languages=[]
        //this.coleccion.languages.push(this.lenguage[0])        
        //this.coleccion.localities=[]
        //this.coleccion.localities.push(this.comunidad[0])
      }
    },
    changeLenguaje: function (e) {
     // console.log("valor " + e.target.value);
      //console.log(this.lenguage.find((x) => x._id == e.target.value));
      if (e.target.value === undefined) {
        this.coleccion.lenguage = [];
        console.log("Esta entrando al undefined changeLenguaje")
      } else {
        this.coleccion.languages=[]
        this.coleccion.languages.push(this.lenguage.find((x) => x._id == e.target.value))
        console.log("cambia el valor de changeLenguaje")       
      }
    },
     changeComunidad: function (e) {
      // console.log("valor " + e.target.value);
      // console.log(this.comunidad.find((x) => x._id == e.target.value));
      if (e.target.value === undefined) {
        this.coleccion.localities = [];
        console.log("Esta entrando al undefined changeComunidad")
      } else {
        this.coleccion.localities=[]
        this.coleccion.localities.push(this.comunidad.find((x) => x._id == e.target.value)) 
        console.log("cambia el valor de changeComunidad")        
      }
    },
    enviardatos: function (parametro) {
      this.audioannotations.TIER = this.tier_acomodado;
      console.log(parametro);
      //     axios.post('https://api.com/v1/resource',
      // formData,
      // {
      // 	// Config
      // })

      window.location.href = "/audioannotations/create";
    },
    leerTierBD: function () {
      //for (var i in this.audioannotations_info.data) {
      this.audioannotations = this.audioannotations_info.data;
      this.agrupar_tier_acomodado();
      this.tier_acomodado = this.audioannotations.TIER;
      //5f66395f6620c52fea0c5360
      this.axios
        .get("/collections/api/index/" + this.audioannotations.user._id)
        .then((response) => {
          //self.axios.get("/collections/api/index/5f66395f6620c52fea0c5360").then((response) => {
          this.colecciones = response.data.collectionDocs;
          //falta hacer algo self.leerTier();
        });
      // }
    },
    agrupar_tier_acomodado: function () {
      for (var indice in this.audioannotations.TIER) {
        this.tier_participante.push(this.audioannotations.TIER[indice].PARTICIPANT);
      }
      const myUniqueArray = [...new Set(this.tier_participante)];
      this.tier_participante = myUniqueArray;
    },
    selecion_todos_onoff: function (e) {
      console.log("valor " + e.target.value);
      console.log("id " + event.target.id);
      console.log("checado " + e.target.checked);
      if (e.target.checked) {
        console.log("si esta en on");
        //this.tier_acomodado.find((x) => x.TIER_ID == e.target.id).Visible = true;
        //cambiar todos
        for (var indice in this.tier_acomodado) {
          if (this.tier_acomodado[indice].PARTICIPANT == e.target.id) {
            console.log(
              "Encontro a " + this.tier_acomodado[indice].PARTICIPANT + " " + indice
            );
            this.tier_acomodado[indice].Visible = true;
          }
        }
      } else {
        //this.tier_acomodado.find((x) => x.TIER_ID == e.target.id).Visible = false;
        console.log("si los hace off");
        for (var indice in this.tier_acomodado) {
          if (this.tier_acomodado[indice].PARTICIPANT == e.target.id) {
            console.log(
              "Encontro a " + this.tier_acomodado[indice].PARTICIPANT + " " + indice
            );
            this.tier_acomodado[indice].Visible = false;
          }
        }
      }
    },
    seleccion_onoff: function (e) {
      console.log("valor " + e.target.value);
      console.log("id " + event.target.id);
      console.log("checado " + e.target.checked);
      if (e.target.checked) {
        console.log("si esta en on");
        this.tier_acomodado.find((x) => x.TIER_ID == e.target.id).Visible = true;
      } else {
        this.tier_acomodado.find((x) => x.TIER_ID == e.target.id).Visible = false;
        console.log("si lo off");
      }
    },
    selecion_todos_visualizacion_options: function (e) {
      console.log("valor " + e.target.value);
      console.log("id " + event.target.id);
      if (e.target.value == "A") {
        console.log("si esta en online display");
        //this.tier_acomodado.find((x) => x.TIER_ID == e.target.id).Visible = true;
        //cambiar todos
        for (var indice in this.tier_acomodado) {
          if (this.tier_acomodado[indice].PARTICIPANT == e.target.id) {
            console.log(
              "Encontro a " + this.tier_acomodado[indice].PARTICIPANT + " " + indice
            );
            this.tier_acomodado[indice].value = "A";
          }
        }
      } else {
        //this.tier_acomodado.find((x) => x.TIER_ID == e.target.id).Visible = false;
        console.log("esta Multi-line display");
        for (var indice in this.tier_acomodado) {
          if (this.tier_acomodado[indice].PARTICIPANT == e.target.id) {
            console.log(
              "Encontro a " + this.tier_acomodado[indice].PARTICIPANT + " " + indice
            );
            this.tier_acomodado[indice].value = "B";
          }
        }
      }
    },
    seleccion_color: function (e) {
      console.log("--------------------------------");
      console.log(
        "valor original es " +
          this.tier_acomodado.find((x) => x.TIER_ID == event.target.id).color
      );
      console.log(e.target.value);
      console.log(event.target.id);
      if (
        this.tier_acomodado.find((x) => x.TIER_ID == event.target.id).color !=
        event.target.value
      ) {
        //console.log("Si lo encontro "+this.options.find(x=>x.tier_id==event.target.id).value)
        this.tier_acomodado.find((x) => x.TIER_ID == event.target.id).color =
          event.target.value;
      }
      console.log(
        "Cambio el valor a " +
          this.tier_acomodado.find((x) => x.TIER_ID == event.target.id).color
      );
      //this.options.push({ tier_id:'2',tier_name:event.target.id, value: 'A' })
    },
    seleccion_todos_color: function (e) {
      console.log("--------------------------------");
      console.log(
        "valor original es " +
          this.tier_acomodado.find((x) => x.TIER_ID == event.target.id).color
      );
      console.log(e.target.value);
      console.log(event.target.id);
      for (var indice in this.tier_acomodado) {
        if (this.tier_acomodado[indice].PARTICIPANT == e.target.id) {
          console.log(
            "Encontro a " + this.tier_acomodado[indice].PARTICIPANT + " " + indice
          );
          this.tier_acomodado[indice].color = e.target.value;
        }
      }
      //this.options.push({ tier_id:'2',tier_name:event.target.id, value: 'A' })
    },
  },
  //   props:['idParametro'],
  computed: {

  },
  created() {
    var currentUrl = window.location.pathname;
    this.ruta = currentUrl;
    //console.log(currentUrl);
    var ultimoSlash = this.ruta.lastIndexOf("/");
    this.ruta = this.ruta.substring(ultimoSlash + 1);
  },
  beforeMount() {},
  mounted() {
    var self = this;
    self.axios.get("/audioannotations/index/" + self.ruta).then((response) => {
      self.audioannotations_info = response;
      //falta hacer algo self.leerTier();
      self.leerTierBD();
    });
    //this.agregar_tier_acomodado();colecciones
  },
};
</script>

<style></style>
