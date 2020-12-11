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
      <select  v-model="audioannotations.collection_id.name" ref="coleccion" @change="changeColeccion($event)">
        <option disabled :value="audioannotations.collection_id.name">
          {{ audioannotations.collection_id.name }}
        </option>
        <option
          v-for="(item3, index) in colecciones"
          :key="'item3' + index"
          v-bind:value="item3.name"
          :id="item3._id"
        >
          {{ item3.name }}
        </option></select
      ><br /><br />
      Lengua Terminal y Grupo de lenguas
      <select  ref="lengua" @change="changeLenguaje($event)">
        <option disabled :value="audioannotations.gid.language.name">
          {{ audioannotations.gid.language.name }}
          {{ audioannotations.gid.LanguageGroup.name }}
        </option>
        <option
          v-for="(item4, index) in lenguaje"
          :key="'item4' + index"
          v-bind:value="item4.name+'-'+item4.LanguageGroup.name"
          :id="item4._id"
        >
          {{ item4.language.name }} {{ item4.LanguageGroup.name }}
        </option></select
      ><br /><br />
      Comunidad a la que pertenece
      <select  ref="comunidad" @change="changeComunidad($event)">
        <option disabled :value="audioannotations.location.Nom_Loc">
          {{ audioannotations.location.Nom_Loc }}-{{ audioannotations.location.Nom_Mun }}
          {{ audioannotations.location.Nom_Mun }}
        </option>
        <option
          v-for="(item5, index) in comunidad"
          :key="'item5' + index"
          v-bind:value="'item5.NomLoc'+'-'+'item5.Nom_Mun'+'-'+'item5.Nom_Ent'"
          :id="item5._id"
        >
          {{ item5.Nom_Loc }}-{{ item5.Nom_Mun }}-{{ item5.Nom_Ent }}
        </option></select
      ><br /><br />
      Genero
      <select  ref="genero">
        <option  disabled :value="audioannotations.genre.name">
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
      coleccion: [],
      lenguaje: [],
      comunidad: [],
      genero: [],
    };
  },
  methods: {
    changeColeccion: function (e) {
      var colecTemporal = [];
      var id_coleccion;
      var id_lenguaje;
      var id_comunidad;
      colecTemporal = this.colecciones;
        if(e.target.options.selectedIndex > -1) {
          console.log(e.target.options[e.target.options.selectedIndex].id)
          id_coleccion=e.target.options[e.target.options.selectedIndex].id
        }else {
          console.log("No esta encontrado la colecccion")
        }
      //console.log("id "+event.target.id)
      //console.log("valor " + e.target.value);
      //console.log(colecTemporal.find((x) => x._id == e.target.value));
      if (e.target.options.selectedIndex > -1) {
        this.coleccion = colecTemporal.find((x) => x._id == id_coleccion);
        this.lenguaje = colecTemporal.find((x) => x._id == id_coleccion).languages;
        //   console.log("++++++++Lenguajes++++++++")
        //   console.log(this.lenguaje)
        this.comunidad = colecTemporal.find((x) => x._id == id_coleccion).localities;
        //   console.log("++++++++localities++++++++")
        //   console.log(this.comunidad)
        //   this.coleccion.languages=[]
        //   this.coleccion.languages.push(this.lenguaje[0])
        //   this.coleccion.localities=[]
        //   this.coleccion.localities.push(this.comunidad[0])
      }
    },
    changeLenguaje: function (e) {
      //   //Aqui me quede quitando el error quitar los metodos  changeLenguaje y changeComunidad
      //   //dos lenguajes
      console.log("valor changeLenguaje" + e.target.value);
       console.log("valor changeLenguaje" + e.target.id);
      //console.log(this.lenguage.find((x) => x._id == e.target.value));
      // if (e.target.value === undefined) {
      //   //this.coleccion.lenguage = [];
      //   console.log("Esta entrando al undefined changeLenguaje")
      // } else {
      //   this.coleccion.languages=[]
      //   var leng = this.lenguaje.find(x => x._id == e.target.value)
      //   this.coleccion.languages.push(leng)
      //   console.log("cambia el valor de changeLenguaje")
      //   console.log("cambia el valor de changeLenguaje"+this.coleccion.languages[0].language.name+" "+this.coleccion.languages[0].LanguageGroup.name)
      // }
    },
    changeComunidad: function (e) {
      console.log("valor changeComunidad" + e.target.value);
      // console.log(this.comunidad.find((x) => x._id == e.target.value));
      // if (e.target.value === undefined) {
      //   //this.coleccion.localities = [];
      //   console.log("Esta entrando al undefined changeComunidad")
      // } else {
      //   this.coleccion.localities=[]
      //   var local=this.comunidad.find(x => x._id == e.target.value)
      //   this.coleccion.localities.push(local)
      //   console.log("cambia el valor de changeComunidad")
      //    console.log("cambia el valor de changeLenguaje"+this.coleccion.localities[0].Nom_Loc+" "+this.coleccion.localities[0].Nom_Mun)

      // }
    },
    formaraudioannotation: function () {
      var pGenero, pColeccion, pLengua, pLocalidad;
      var p_lenguaje = [];
      var p_Comunidad = [];
      var p_Genero = [];
      //traer los datos
      //borrar _v y _id
      //obtiene los valores del DOM
      pColeccion = this.$refs.coleccion.id;
      pLengua = this.$refs.lengua.id;
      pLocalidad = this.$refs.comunidad.id;
      pGenero = this.$refs.genero.value;
      console.log(this.$refs.genero.value);
      console.log(this.$refs.coleccion.id);
      console.log(this.$refs.lengua.id);
      console.log(this.$refs.comunidad.id);

      //limpiar coleccion y leng []
      this.coleccion = this.colecciones.find((x) => x._id == pColeccion);
      console.log("Error en coleccion" + pColeccion);
      console.log(this.coleccion);
      console.log("Error en lenguaje" + pLengua);
      this.p_lenguaje = this.coleccion.languages.find((x) => x._id == pLengua);
      console.log(this.p_lenguaje);
      this.p_Comunidad = this.coleccion.localities.find((x) => x._id == pLocalidad);
      console.log("Error en comunidad" + pLocalidad);
      console.log(this.p_Comunidad);
      this.p_Genero = this.genero.find((x) => x.name == pGenero);
      console.log("Error en comunidad" + pGenero);
      console.log(this.p_Genero);
      this.coleccion.languages = this.p_lenguaje;
      this.coleccion.localities = this.p_Comunidad;

      this.audioannotations.collection_id = this.coleccion;
      this.audioannotations.gid = this.coleccion.languages;
      this.audioannotations.location = this.coleccion.localities;
      this.audioannotations.genre = this.p_Genero;
      delete this.audioannotations.__v;
      delete this.audioannotations._id;
    },
    enviardatos: function () {
      //this.audioannotations.TIER = this.tier_acomodado;
      this.formaraudioannotation();
      console.log();
      //     axios.post('https://api.com/v1/resource',
      // formData,
      // {
      // 	// Config
      // })

      // window.location.href = "/audioannotations/create";
    },
    leerTierBD: function () {
      //for (var i in this.audioannotations_info.data) {
      this.audioannotations = this.audioannotations_info.data;
      //Valor para inicializar el select

      this.agrupar_tier_acomodado();
      this.tier_acomodado = this.audioannotations.TIER;
      //5f66395f6620c52fea0c5360
      this.axios
        .get("/collections/api/index/" + this.audioannotations.user._id)
        .then((response) => {
          //self.axios.get("/collections/api/index/5f66395f6620c52fea0c5360").then((response) => {
          this.colecciones = response.data.collectionDocs;
          //Inicializa select de languages y localities
          var audioTemporal;
          audioTemporal = this.audioannotations.collection_id;
          this.lenguaje = audioTemporal.languages;
          this.comunidad = audioTemporal.localities;
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
  computed: {},
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
    self.axios.get("/genres/api").then((response) => {
      self.genero = response.data;
      //falta hacer algo self.leerTier();
    });
    //this.agregar_tier_acomodado();colecciones
  },
};
</script>

<style></style>
