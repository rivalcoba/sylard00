<template>

  <v-card class="pa-2" outlined>
     <v-dialog
      v-model="eraser_dialog"
      persistent
      max-width="290"
    >
     <v-alert
      border="bottom"
      colored-border
      type="warning"
      elevation="2"
    >
      Seguro que desea eliminar los datos seleccionados?
      <v-btn
      :disabled="dialog"
      :loading="dialog"
      @click="close_eraser_dialog"
      
    >
    No
    </v-btn>
     <v-btn
      :disabled="dialog"
      :loading="dialog"
      @click="delete_all"
      color="error"
      
    >
    Si
    </v-btn>
    </v-alert>
       </v-dialog>
<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
  <h1>Editar Generos</h1>
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
 <v-btn
      :disabled="dialog"
      :loading="dialog"
      @click="watch_eraser_dialog"
      color="secondary"
    >
      <v-icon small>
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
        @click="show_edit(item)"
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
    <v-dialog v-model="dialog_del" persistent max-width="290px">
      <v-alert
      border="bottom"
      colored-border
      type="warning"
      elevation="2"
    >
            Esta seguro que desea eliminar {{nameofuser}} ?
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn   @click="close_dialogs()">No</v-btn>
            <v-btn color="error" @click="deleteItem()">Si</v-btn>
          </v-card-actions>
         </v-alert>
    </v-dialog>
  </v-layout>
    <v-col cols="auto">
      <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        v-model="dialog_edit"
      >

        <template v-slot:default="dialog_edit">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Editar Genero</v-toolbar>
            <v-card-text>
              <div >
 <v-text-field
                  label="Nombre"
                  hint="Ejemplo:TERROR"
                  persistent-hint
                  id="name"
                  name="name"
                  v-model="name_edit"
                  required
                ></v-text-field>
                 <v-text-field
                  label="Descripcion"
                  hint="Ejemplo:TERROR"
                  persistent-hint
                  id="desc"
                  name="desc"
                  v-model="description_edit"
                  required
                ></v-text-field>
                  <input type="text" v-model="id_edit" hidden>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="close_edit()"
              >Cerrar</v-btn>
                        <v-btn
                text
                @click="save_edit()"
              >Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
    
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
            @click="close_add_new_genre()"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Crear nuevo genero</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="save_add_new_genre()"
            >
              Guardar
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list
          three-line
          subheader
        >
          <v-subheader><h1>Datos de nuevo genero:</h1> </v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> <h3> Nombre:{{name}}</h3></v-list-item-title>
             <v-list-item-subtitle><v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Nombre de nuevo genero"
                  hint="Ejemplo:TERROR"
                  persistent-hint
                  id="name"
                  name="name"
                  v-model="name"
                  required
                ></v-text-field>
              </v-col></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title><h3>Descripcion: {{description}} </h3> </v-list-item-title>
              <v-list-item-subtitle><v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Descripcion de nuevo genero"
                  hint="Ejemplo: da mucho miedo"
                  persistent-hint
                  id="description"
                  name="description"
                  v-model="description"
                  required
                ></v-text-field>
              </v-col>
              </v-list-item-subtitle>
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
        eraser_dialog:false,
        obj_on_table_edit:{},
        v:"",
        index_of_item_edit:"",
        id_edit:"",
        name_edit:"",
        description_edit:"",
        name:"",
        description:"",
        dialog_edit:false,
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
    watch:{
      dialog_edit(val){
        val||this.close_edit()
      }
    },
      created() {
       
    axios.get("/genres/api").then((result) => {
      this.arreglo_datos=this.result = result.data;
      let objson_arr = this.arreglo_datos;
    
    })
    //setInterval(this.update_all_data,3000) ;
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
    axios.delete('/genres/api/delete/'+this.id);
    console.log("eliminado: "+this.id);
     this.dialog_del=false;
     setTimeout(this.update_all_data,200) ;
  },
  delete_all(){ 
    let arreglo = this.selected;
  //  let question = confirm("¿esta seguro de eliminar los usuarios seleccionados?");
    //if(question==true){
    arreglo.forEach(element => {
    const index = this.arreglo_datos.indexOf(element);//busca objeto  en el arreglo y retorna su posicion en el 
   this.arreglo_datos.splice(index,1);
      axios.delete('/genres/api/delete/'+element._id);
    console.log("eliminado: "+element._id);
    
    });
    setTimeout(this.close_eraser_dialog, 200);
    setTimeout(this.update_all_data,200) ;
   //}
   
  },
  clean_all_fields(){
    this.name_edit="";
    this.description_edit="";
    this.name="";
    this.description="";
    this.id_edit="";
    this.index_of_item_edit="";
    this.obj_on_table_edit={};
    this.v="";
  },
  update_all_data(){
        axios.get("/genres/api").then((result) => {
      this.arreglo_datos=this.result = result.data;
    })
  },
save_add_new_genre() {
    axios.post('/genres/api/create',{
       name:this.name,
       description:this.description
     })
         // this.arreglo_datos.push(newitem);
        this.dialog=false;
     //this.update_all_data();
      this.clean_all_fields();
      setTimeout(this.update_all_data,200) ;
      
       
      },
      close_add_new_genre(){
        this.dialog=false;
        this.clean_all_fields;
      }      ,
      show_edit(item){
        this.dialog_edit=true;
        this.name_edit= item.name;
        this.description_edit=item.description;
        this.id_edit=item._id;
        this.v=item.__v;
        this.index_of_item_edit=this.arreglo_datos.indexOf(item);
        this.obj_on_table_edit= Object.assign({}, item);
        
      },
       save_edit(){
    var id = this.id_edit;
    axios.put('/genres/api/update/'+id,{
      name:this.name_edit,
      description:this.description_edit
    });
    var new_item_edit={_id:this.id_edit, name:this.name_edit,description:this.description_edit,__v:this.v};
    /*verifica retorno de objetos
    console.log(this.index_of_item_edit);
    console.log(this.obj_on_table_edit);
    console.log(new_item_edit);
    */
    Object.assign(this.arreglo_datos[this.index_of_item_edit], new_item_edit);
    this.close_edit();
    //window.location.href='/user/su/edit/'+id;
   // console.log('/user/su/edit/'+id);
  },
      close_edit(){
        this.dialog_edit = false;
        this.clean_all_fields();
      },
       watch_eraser_dialog(){
      this.eraser_dialog=true;
  },
  close_eraser_dialog(){
    this.eraser_dialog=false;
  }
  
  },
  }
</script>