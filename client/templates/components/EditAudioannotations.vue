<template>
  <div id="EditAudioannotations">
    Hola {{ who }}

    {{ ruta }}

    <div v-if="this.audioannotations_info.data">
      <!--  <button v-on:click="agregar_tier_acomodado()"></button>-->
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
                >
                  <option value="B">Scrolling</option>
                  <option value="A" selected>On-Line-Display</option>
                </select>
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
    };
  },
  methods: {
    leerTierBD: function () {
      //for (var i in this.audioannotations_info.data) {
      this.audioannotations = this.audioannotations_info.data;
      this.agrupar_tier_acomodado();
      this.tier_acomodado=this.audioannotations.TIER
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
      //aqui me quede seleccionando por participante para que desbloquee todos
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
    // imprimir(){
    //   console.log("Ruta")
    //   // const path = require('path');
    //   // console.log(path.basename())
    //   // console.log(this.idParametro)
    //   // return this.idParametro
    //  console.log(this.$route.query.test)
    // }
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
    this.axios.get("/audioannotations/index/" + self.ruta).then((response) => {
      this.audioannotations_info = response;
      //falta hacer algo self.leerTier();
      self.leerTierBD();
    });
    //this.agregar_tier_acomodado();
  },
};
</script>

<style></style>
