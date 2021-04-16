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
    >
      <template v-slot:item.name="{ item }">
      <p><label for="">{{item.name}}</label></p>
      <p><label for="">{{item.email}}</label></p>
     
    </template>
    <template v-slot:item.switch="{ item }">
      <v-switch
      :key="item._id"
      color="info"
      v-model="item.switch_toggle"
      :label="` ${item.switch_toggle.toString()}`"
      @click="switch_toggle_role(item.switch_toggle,item._id);"
    ></v-switch>
    <label for="">{{item.switch_toggle}}</label>
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
        @click="deleteItem(item._id)"
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
          //{ text: 'Privilegios', value: 'role' },
          { text: 'Vis-Privilegios-Col' , value: 'switch', sortable:false},
          { text: 'Descripcion', value: 'about' },
          { text: 'Collecciones' , value: 'collections_concat'},
           { text: 'Actions', value: 'actions', sortable: false },
        //   { text: 'algosaurio', value: 'switch_toggle', sortable: false },
        ],
        
      }
    },
      created() {
    axios.get("/user/api/getuserscollections").then((result) => {
      this.arreglo_datos=this.result = result.data;
      let objson_arr = this.arreglo_datos;
       let arreglo_concat_lenguajes = "";
        let jsonaumentado = [];
        for(let x = 0 ; x<objson_arr.length;x++){
           let temparrjson=objson_arr[x];
           let arreglo_concat_lenguajes="";//borrar por cada iteracion
           let arreglo_concat_collections="";
            for(let i=0; i< temparrjson.spokenLanguages.length ; i++ ){
                arreglo_concat_lenguajes =arreglo_concat_lenguajes +temparrjson.spokenLanguages[i].gid+" : "+ temparrjson.spokenLanguages[i].name + ", ";
                temparrjson.lenguajes_concat=arreglo_concat_lenguajes;
                jsonaumentado.push(temparrjson);
            }
            for(let n=0;n<temparrjson.collectionsDocs.length;n++){
              arreglo_concat_collections=arreglo_concat_collections+temparrjson.collectionsDocs[n].name+",";
              temparrjson.collections_concat=arreglo_concat_collections;
              jsonaumentado.push(temparrjson);
            }
            //condiciones para agregar en la vista un boleano para manipular
            if(temparrjson.role==="colaborator" ){
            temparrjson.switch_toggle=true;
            jsonaumentado.push(temparrjson);
            }
             if(temparrjson.role==="visitor"){
            temparrjson.switch_toggle=false;
            jsonaumentado.push(temparrjson);
            }
          
        }
        console.log( jsonaumentado);
        //this.arreglo_datos=jsonaumentado;
    })
    
  },
  methods:{
    deleteItem(id){
    
    axios.delete('/user/api/delusers'+id);
    console.log("eliminado: "+id);
  }
  ,
  switch_toggle_role(stat,id){
    let tipo_role="";
    //console.log("Estado: "+stat+" id:"+id);
    if(stat===false){
      tipo_role="visitor";
    }else{
      tipo_role="colaborator";
    }
     axios.put("/user/api/toggleUserPrivileges/"+id);
    console.log("El tipo ahora es: "+ tipo_role);
  }
  }
  
  
  }
</script>