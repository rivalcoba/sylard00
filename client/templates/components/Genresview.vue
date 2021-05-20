<template>

  <v-card class="pa-2" outlined>
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
<v-card-subtitle>
<v-btn color="secondary" @click="delete_all()">
   <v-icon
        small
        
      >
        mdi-delete
      </v-icon>
</v-btn>

</v-card-subtitle>
<v-card-text>

      <v-data-table
     v-model="selected"
      :headers="headers"
      :items="arreglo_datos"
      :search="search"
      item-key="_id"
      show-select
     class="elevation-1"
    >
    
    
     <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="icon-edit"
        @click="editItem(item._id)"
      >
      </v-icon>
        <p></p>

      <v-icon
        small
        @click="acivate_del_dialog(item._id,item)"
      >
        mdi-delete
      </v-icon>
    </template>
    </v-data-table>
    </v-card-text>    
     <v-layout row justify-center>
    <v-dialog v-model="dialog_del" persistent max-width="600px">
      <v-card>
        <v-card-title class="headline">Esta seguro que desea eliminar este usuario?</v-card-title>
        <v-card-text><h2>{{nameofuser}}</h2> </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text  @click="close_dialogs()">No</v-btn>
          <v-btn color="orange"  @click="deleteItem()">Si</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
 <v-row justify="end">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          + Agregar nuevo genero
        </v-btn>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Crear nuevo genero</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="dialog = false"
            >
              Guardar
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list
          three-line
          subheader
        >
          <v-subheader>Datos de nuevo genero</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Nombre</v-list-item-title>
             <v-list-item-subtitle><v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Nombre de nuevo genero"
                  hint="Ejemplo:TERROR"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Descripcion</v-list-item-title>
              <v-list-item-subtitle><v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Descripcion de nuevo genero"
                  hint="Ejemplo: da mucho miedo"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list
          three-line
          subheader
        >
      
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
  </v-card>
  


</template>

<script>
//import 'vuetify/dist/vuetify.min.css';
import axios from "axios";

  export default {
    data () {
      return {
         dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        dialog_del:false,
        thing:[],
        nameofuser:"",
        id:"",
        checkbox: true,
        arreglo_datos:[],
        arreglo_datos_boleanos:[],
        search: '',
        selected: [],
         switch1: [],
        headers: [
            { text:'Nombre', value:'name', sortable:true},
          { text: 'Descripcion', value: 'description' },
           { text: 'Actions', value: 'actions', sortable: false },
        //   { text: 'algosaurio', value: 'switch_toggle', sortable: false },
        ],
        
      }
    },
      created() {
       
    axios.get("/genres/api").then((result) => {
      this.arreglo_datos=this.result = result.data;
      let objson_arr = this.arreglo_datos;
    
    })
    
  },
  methods:{
    acivate_del_dialog(id,thing){
      this.dialog_del=true;
      this.thing=thing;
      this.id=id;
      this.nameofuser=thing.name;
    },
    close_dialogs(){
      this.dialog_del=false;
    },
    deleteItem(){
    const index = this.arreglo_datos.indexOf(this.thing);//busca objeto  en el arreglo y retorna su posicion en el 
    this.arreglo_datos.splice(index,1);
    axios.delete('genres/api/delete/'+this.id);
    console.log("eliminado: "+this.id);
     this.dialog_del=false;
  },
  delete_all(){ 
    let arreglo = this.selected;
    let question = confirm("¿esta seguro de eliminar los usuarios seleccionados?");
    if(question==true){
    arreglo.forEach(element => {
    const index = this.arreglo_datos.indexOf(element);//busca objeto  en el arreglo y retorna su posicion en el 
   this.arreglo_datos.splice(index,1);
      axios.delete('genres/api/delete/'+element._id);
    console.log("eliminado: "+element._id);
    });
    }
  },
  editItem(id){
    axios.get('/user/su/edit/'+id);
    window.location.href='/user/su/edit/'+id;
   // console.log('/user/su/edit/'+id);
  }
  }
  
  
  }
</script>