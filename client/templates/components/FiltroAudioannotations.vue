<template>
  <div>
    Audio annotations Aqui

    {{ otro }}
    <!--<button v-on:click="getTodos()"></button>-->
    <table>
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Lengua Terminal</th>
          <th>Gpo de Lenguas</th>
          <th>Comunidad</th>
          <th>Hablantes</th>
          <th>Genero y Duración</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tr>
        <td><input type="text" id="titulo" name="titulo" v-model="titulo" /></td>
        <td><input type="text" id="lengua" name="lengua" v-model="lengua" /></td>
        <td>
          <input type="text" id="gpo_lengua" name="gpo_lengua" v-model="gpo_lengua" />
        </td>
        <td><input type="text" id="comunidad" name="comunidad" v-model="comunidad" /></td>
        <td><input type="text" id="hablantes" name="hablantes" v-model="hablantes" /></td>
        <td><input type="text" id="genero" name="genero" v-model="genero" /></td>
        <td></td>
      </tr>
      <div v-for="(item2, index) in search_titulo" :key="'item' + index">
        <tr>
          <td>{{ item2.title }}</td>
          <td>{{ item2.gid.language.gid }} {{ item2.gid.language.name }}</td>
          <td>{{ item2.gid.LanguageGroup.gid }} {{ item2.gid.LanguageGroup.name }}</td>
          <td>
            {{ item2.location.Nom_Loc }} {{ item2.location.Nom_Mun }}
            {{ item2.location.Nom_Ent }} {{ item2.location.Lat_Decimal }}
            {{ item2.location.Lon_Decimal }}
          </td>
          <td><div v-for="(item3, index) in item2.TIER" :key="'item' + index"> {{item3.PARTICIPANT}} Hablante {{index+1}} <br> </div></td>
          <td>{{ item2.genre.name }} {{ item2.duration }}</td>
          <td rowspan="3">
            Delete
            <a href="/audioannotations/create"> Añadir Audioannotations</a>
            <a href="/audioannotations/vuetest">Reproducir Audioannotations</a>
          </td>
        </tr>
      </div>
    </table>
  </div>
</template>

<script>
export default {
  name: "FiltroAudioannotations",
  props: {
    parametro: Object,
  },
  data() {
    return {
      json: {},
      result: null,
      otro: "nuevo",
      notas_audioannotations: [],
      titulo: "",
      lengua: "",
      gpo_lengua: "",
      comunidad: "",
      hablantes: "",
      genero: "",
      valor_buscar: "",
    };
  },
  methods: {
    cambiovalor(e) {
      console.log("valor " + e.target.value);
    },
    setJson(payload) {
      this.json = payload;
    },
    getTodos() {
      this.axios.get("audioannotations/filter").then((response) => {
        this.notas_audioannotations = response.data;
        //console.log(response.data)
      });
    },
  },
  mounted() {
    var self = this;
    this.axios.get("audioannotations/filter").then((response) => {
      this.notas_audioannotations = response.data;
      //console.log(response.data)
    });
  },
  computed: {
    ordenar_ascendente: function () {
      //falta ordenar
      return this.notas_audioannotations.sort(function (a, b) {
        if (a.titulo > b.titulo) {
          return 1;
        }
        if (a.titulo < b.titulo) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
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
      }
      return this.notas_audioannotations;
    },
  },
};
</script>
