<template>
  <div>
    Audio annotations
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
        <td>
          <input type="text" id="titulo" name="titulo" v-model="titulo" />
          <input
            type="checkbox"
            name="bandera_titulo"
            value="true"
            v-model="bandera_titulo"
            id="bandera_titulo"
            @change="ordenar_ascendente()"
          />
          <input
            type="checkbox"
            name="bandera_titulo"
            value="false"
            v-model="bandera_titulo"
            id="bandera_titulo2"
            @change="ordenar_descendente()"
          />
        </td>
        <td>
          <input type="text" id="lengua" name="lengua" v-model="lengua" />
          <input
            type="checkbox"
            name="bandera_lengua"
            value="true"
            v-model="bandera_lengua"
            id="bandera_lengua"
            @change="ordenar_ascendente()"
          />
          <input
            type="checkbox"
            name="bandera_lengua"
            value="false"
            v-model="bandera_lengua"
            id="bandera_lengua2"
            @change="ordenar_descendente()"
          />
        </td>
        <td>
          <input type="text" id="gpo_lengua" name="gpo_lengua" v-model="gpo_lengua" />
          <input
            type="checkbox"
            name="bandera_gpo_lengua"
            value="true"
            v-model="bandera_gpo_lengua"
            id="bandera_gpo_lengua"
            @change="ordenar_ascendente()"
          />
          <input
            type="checkbox"
            name="bandera_gpo_lengua2"
            value="false"
            v-model="bandera_gpo_lengua"
            id="bandera_gpo_lengua2"
            @change="ordenar_descendente()"
          />
        </td>
        <td>
          <input type="text" id="comunidad" name="comunidad" v-model="comunidad" />
          <input
            type="checkbox"
            name="bandera_comunidad"
            value="true"
            v-model="bandera_comunidad"
            id="bandera_comunidad"
            @change="ordenar_ascendente()"
          />
          <input
            type="checkbox"
            name="bandera_comunidad2"
            value="false"
            v-model="bandera_comunidad"
            id="bandera_comunidad2"
            @change="ordenar_descendente()"
          />
        </td>
        <td>
          <input type="text" id="hablantes" name="hablantes" v-model="hablantes" />
          <input
            type="checkbox"
            name="bandera_hablantes"
            value="true"
            v-model="bandera_hablantes"
            id="bandera_hablantes"
            @change="ordenar_ascendente()"
          />
          <input
            type="checkbox"
            name="bandera_hablantes2"
            value="false"
            v-model="bandera_hablantes"
            id="bandera_hablantes2"
            @change="ordenar_descendente()"
          />
        </td>
        <td>
          <input type="text" id="genero" name="genero" v-model="genero" />
          <input
            type="checkbox"
            name="bandera_genero"
            value="true"
            v-model="bandera_genero"
            id="bandera_genero"
            @change="ordenar_ascendente()"
          />
          <input
            type="checkbox"
            name="bandera_genero2"
            value="false"
            v-model="bandera_genero"
            id="bandera_genero2"
            @change="ordenar_descendente()"
          />
        </td>
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
          <td>
            <div v-for="(item3, index) in item2.TIER" :key="'item' + index">
              {{ item3.PARTICIPANT }} Hablante {{ index + 1 }} <br />
            </div>
          </td>
          <td>{{ item2.genre.name }} {{ item2.duration }}</td>
          <td rowspan="3">
            <!-- <a v-bind:href="'/audioannotations/delete/' + item2._id">Delete</a>-->
            <a href="/audioannotations/create"> Añadir Audioannotations</a>
            <a href="" @click.prevent="borrarAudioanotacion(item2._id)">Delete </a>
            <a v-bind:href="'/audioannotations/vuetest/' + item2._id"
              >Reproducir Audioannotations</a
            >
            <a v-bind:href="'/audioannotations/edit/' + item2._id"
              >Editar Audioannotations</a
            >
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
    borrarAudioanotacion(audioannotation_id) {
      var currentUrl = window.location.pathname;
      const url = `${currentUrl}/delete/${audioannotation_id}`;
      // /audioannotations/delete/{{_id}}?_method=DELETE
      this.axios.delete(url,audioannotation_id).then(
        (response) => {
          console.log("si se borro");
          console.log(url);
        },
        (error) => {
          console.log("no se borro " + "/audioannotations/delete/" + audioannotation_id);
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
      }else if (this.bandera_comunidad) {
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
      }else if (this.bandera_genero) {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.genre.name  > b.genre.name ) {
            return -1;
          }
          if (a.genre.name  < b.genre.name ) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
      }else if (this.bandera_hablantes) {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.TIER[0].PARTICIPANT  > b.TIER[0].PARTICIPANT ) {
            return -1;
          }
          if (a.TIER[0].PARTICIPANT  < b.TIER[0].PARTICIPANT ) {
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
      }else if (this.bandera_comunidad) {
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
      }else if (this.bandera_genero) {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.genre.name  > b.genre.name ) {
            return 1;
          }
          if (a.genre.name  < b.genre.name ) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }else if (this.bandera_hablantes) {
        return this.notas_audioannotations.sort(function (a, b) {
          if (a.TIER[0].PARTICIPANT  > b.TIER[0].PARTICIPANT ) {
            return 1;
          }
          if (a.TIER[0].PARTICIPANT  < b.TIER[0].PARTICIPANT ) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }
    },
  },
  mounted() {
    var self = this;
    self.axios.get("audioannotations/filter").then((response) => {
      self.notas_audioannotations = response.data;
      //console.log(response.data)
    });
  },
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
