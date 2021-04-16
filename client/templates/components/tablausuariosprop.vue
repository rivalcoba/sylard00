<template>
  <v-card>
<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-card-title>
      <h1>Propuesta</h1>
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
    >
      <template v-slot:item.name="{ item }">
      <p><label for="">{{item.name}}</label></p>
      <p><label for="">{{item.email}}</label></p>
     
    </template>
    <template v-slot:item.role="{ item }">
      <v-radio-group
      v-model="item.role"
      column>
      <v-radio
      label="Colaborador"
      color="red"
      value="colaborator"
      ></v-radio>
      <v-radio
      label="Visitante"
      color="orange"
      value="visitor"
      ></v-radio>
      </v-radio-group>
    </template>
     <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="icon-edit"
        @click="editItem(item)"
      >
      </v-icon>
        <p></p>

      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    </v-data-table>
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
        arreglo_datos_boleanos:[],
        search: '',
        selected: [],
         switch1: [],
        headers: [
            { text:'Usuario', value:'name', sortable:true},
          { text: 'Lenguajes', value: 'lenguajes_concat' },
          { text: 'Privilegios', value: 'role' },
          //{ text: 'Vis-Privilegios-Col' , value: 'switch', sortable:false},
          { text: 'Descripcion', value: 'about' },
          { text: 'Collecciones' , value: 'collections'},
           { text: 'Actions', value: 'actions', sortable: false },
        //   { text: 'algosaurio', value: 'switch_toggle', sortable: false },
        ],
        
      }
    },
      created() {
    axios.get("/user/api/getusers").then((result) => {
      this.arreglo_datos=this.result = result.data;
      let objson_arr = this.arreglo_datos;
       let arreglo_concat = "";
        let jsonaumentado = [];
        let temparrjson=[];
        for(let x = 0 ; x<objson_arr.length;x++){
            temparrjson=objson_arr[x];
           let arreglo_concat="";//borrar por cada iteracion
            for(let i=0; i< temparrjson.spokenLanguages.length ; i++ ){
                arreglo_concat =arreglo_concat +temparrjson.spokenLanguages[i].gid+" : "+ temparrjson.spokenLanguages[i].name + ", ";
                temparrjson.lenguajes_concat=arreglo_concat;
                
            }
            //condiciones para agregar en la vista un boleano para manipular
            if(temparrjson.role==="colaborator"){
            temparrjson.switch_toggle=true;
            jsonaumentado.push(temparrjson);
            }
             if(temparrjson.role==="visitor"){
            temparrjson.switch_toggle=false;
            jsonaumentado.push(temparrjson);
            }

        }
        //eliminar super usuario
        for(let i=0;i<jsonaumentado.length;i++){
          
          console.log( jsonaumentado[i].role+" n = " +i);
        }
        console.log( jsonaumentado);
        jsonaumentado.push(temparrjson);
        //this.arreglo_datos=jsonaumentado;
    })
    
  }
  
  
  }
</script>