<template>
  <v-card>
<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
     v-model="selected"
      :headers="headers"
      :items="arreglo_datos"
      :search="search"
      item-key="_id"
      show-select
     class="elevation-1"
    ></v-data-table>
    <v-checkbox
      v-model="checkbox"
      :label="`Checkbox 1: ${checkbox.toString()}`"
    ></v-checkbox>
  </v-card>
</template>
<script>
import 'vuetify/dist/vuetify.min.css';
import axios from "axios";
  export default {
    data () {
      return {
        checkbox: true,
        arreglo_datos:[],
        search: '',
        selected: [],
        headers: [
          { text: 'Usuarios', value: 'name' },
          { text: 'email', value: 'email' },
          { text: 'Lenguajes', value: 'spokenLanguages[0].name' },
          { text: 'Privilegios', value: 'role' },
          { text: 'Descripcios', value: 'about' }
        ],
        
      }
    },
      created() {
    axios.get("/user/api/getusers").then((result) => {
      this.arreglo_datos=this.result = result.data;
      
      for(let i=0;i<this.arreglo_datos.length;i++){
        console.log(this.arreglo_datos[i].spokenLanguages[0]);
      }
    })
  }
  }
</script>