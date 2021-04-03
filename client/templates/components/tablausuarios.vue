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
//import 'vuetify/dist/vuetify.min.css';
import axios from "axios";

  export default {
    data () {
      return {
        checkbox: true,
        arreglo_datos:[],
        arreglo_datos_temp:[],
        search: '',
        selected: [],
        headers: [
          { text: 'Usuarios', value: 'name' },
          { text: 'email', value: 'email' },
          { text: 'Lenguajes', value: 'lenguajes_concat' },
          { text: 'Privilegios', value: 'role' },
          { text: 'Descripcios', value: 'about' },
          { text: 'Collecciones' , value: 'collections'}
        ],
        
      }
    },
      created() {
    axios.get("/user/api/getusers").then((result) => {
      this.arreglo_datos=this.result = result.data;
      let objson_arr = this.arreglo_datos;
       let arreglo_concat = "";
        let jsonaumentado = [];
        for(let x = 0 ; x<objson_arr.length;x++){
           let temparrjson=objson_arr[x];
            arreglo_concat="";//borrar por cada iteracion
            for(let i=0; i< temparrjson.spokenLanguages.length ; i++ ){
                arreglo_concat =arreglo_concat +temparrjson.spokenLanguages[i].gid+" : "+ temparrjson.spokenLanguages[i].name + ", ";
                temparrjson.lenguajes_concat=arreglo_concat;
                jsonaumentado.push(temparrjson);
            }
            
        }
        console.log( jsonaumentado);
        //this.arreglo_datos=jsonaumentado;
    })
    
  }
  
  
  }
</script>