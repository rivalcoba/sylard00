<template>

  <v-card class="pa-2" outlined>
     <button
      :disabled="dialog"
      :loading="dialog"
      @click="watch_error_dialog"
      hidden
    >
    probador
    </button>
    <v-dialog
      v-model="error_dialog"
      hide-overlay
      persistent
      width="400"
    >
            <v-alert
      border="right"
      colored-border
      type="error"
      elevation="2"
    >
         <center><h3> {{$t("lang.messages.wrong")}}</h3>
         </center> 
         <center>
          <v-progress-circular
      :width="3"
      color="red"
      indeterminate
    ></v-progress-circular>
        </center>
         </v-alert>
    </v-dialog>
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
      {{$t("lang.messages.delete")}}
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
    {{$t("lang.messages.yes")}}
    </v-btn>
    </v-alert>
       </v-dialog>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css"
      rel="stylesheet"
    />
    <h1>{{$t("lang.locations_edit.title")}}</h1>
    <v-col>
      <h3>{{$t("lang.locations_edit.entity")}}</h3>
      <v-select
        v-model="select_list"
        :items="data_list"
        item-text="state"
        item-value=""
        label="Select"
        @change="upgrade_list_munc()"
        return-object
        single-line
      ></v-select>
    </v-col>
    <v-col>
      <h3>{{$t("lang.locations_edit.munc")}}</h3>
      <v-select
        v-model="select_list2"
        :items="data_list_munc"
        item-text="state"
        item-value=""
        label="Select"
        @change="new_query()"
        return-object
        single-line
      ></v-select>
    </v-col>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-subtitle>     <v-btn
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
        dense
        :loading="table_loader"
        v-model="selected"
        :headers="headers"
        :items="arreglo_datos"
        :search="search"
        item-key="_id"
        show-select
        class="elevation-1"
        :footer-props="{
          'items-per-page-options': [5, 10, 20, 30, 40, 50, 80, 100, 200, 500],
        }"
        :items-per-page="5"
        loading-text="Cargando por favor espere..."
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="icon-edit" @click="show_edit(item)"> </v-icon>
          <p></p>

          <v-icon small @click="acivate_del_dialog(item._id, item)">
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
          {{$t("lang.messages.delete")}}
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn   @click="close_dialogs()">No</v-btn>
            <v-btn color="error" @click="deleteItem()">{{$t("lang.messages.yes")}}</v-btn>
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
            <v-toolbar color="primary" dark>{{$t("lang.locations_edit.edit_title")}}</v-toolbar>
            <v-card-text>
              <div>
                <table>
                  <tr>
                    <td>
                    <v-text-field
                        label="Nombre de la entidad"
                        persistent-hint
                        id="edit_Nom_Ent"
                        name="edit_Nom_Ent"
                        v-model="edit_Nom_Ent"
                        required
                      ></v-text-field>
                    </td>
                    <td>
                       <v-text-field
                        label="Nombre de Municipio"
                        persistent-hint
                        id="edit_Nom_Mun"
                        name="edit_Nom_Mun"
                        v-model="edit_Nom_Mun"
                        required
                      ></v-text-field>
                    </td>
                    <td>
                      <v-text-field
                        label="Nombre Localidad"
                        persistent-hint
                        id="edit_Nom_Loc"
                        name="edit_Nom_Loc"
                        v-model="edit_Nom_Loc"
                        required
                      ></v-text-field>
                    </td>
                    <td>
                         <v-text-field
                        label="edit_Latitud Decimal"
                        persistent-hint
                        id="edit_Lat_Decimal"
                        name="edit_Lat_Decimal"
                        v-model="edit_Lat_Decimal"
                        required
                      ></v-text-field>
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <v-text-field
                        label="Longitud Decimal"
                        persistent-hint
                        id="edit_Lon_Decimal"
                        name="edit_Lon_Decimal"
                        v-model="edit_Lon_Decimal"
                        required
                      ></v-text-field>
                    </td>
                    <td>
                   
                    </td>
                    <td>
                 
                    </td>
                    <td>
                     
                    </td>
                  </tr>
                  <tr>
                  
                    <td>
                  
                    </td>
                    <td>
                  
                    </td>
                    <td>
                
                    </td>
                     <td>
                     
                    </td>
                  </tr>
                  <tr>
                   
                    <td>
                     
                    </td>
                    <td>
                      
                    </td>
                    <td>
                     
                    </td>
                     <td>
                      
                    </td>
                  </tr>
                  <tr>
                      <td colspan="4">
                      
                    </td>
                  </tr>
                </table>

                
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="close_edit()">{{$t("lang.messages.close")}}</v-btn>
              <v-btn text @click="save_edit()">{{$t("lang.messages.save")}}</v-btn>
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
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            + {{$t("lang.locations_edit.button_add")}}
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="close_add_new_genre()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{$t("lang.locations_edit.window_add_title")}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="save_add_new_location()">
                {{$t("lang.messages.save")}}
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-list three-line subheader>
            <v-subheader><h1>{{$t("lang.locations_edit.data_new_title")}}:</h1> </v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>
                  <table>
                    <tr>
                      <td>
                           <v-text-field
                          label="Nombre de la entidad"
                          persistent-hint
                          id="Nom_Ent"
                          name="Nom_Ent"
                          v-model="Nom_Ent"
                          required
                        ></v-text-field>
                      </td>
                      <td>
                       <v-text-field
                          label="Nombre de Municipio"
                          persistent-hint
                          id="Nom_Mun"
                          name="Nom_Mun"
                          v-model="Nom_Mun"
                          required
                        ></v-text-field>
                      </td>
                      <td>
                     <v-text-field
                          label="Nombre Localidad"
                          persistent-hint
                          id="Nom_Loc"
                          name="Nom_Loc"
                          v-model="Nom_Loc"
                          required
                        ></v-text-field>
                      </td>
                      <td>
                           <v-text-field
                          label="Latitud Decimal"
                          persistent-hint
                          id="Lat_Decimal"
                          name="Lat_Decimal"
                          v-model="Lat_Decimal"
                          required
                        ></v-text-field>
                      </td>
                    </tr>
                    <tr>
                      <td>
                           <v-text-field
                          label="Longitud Decimal"
                          persistent-hint
                          id="Lon_Decimal"
                          name="Lon_Decimal"
                          v-model="Lon_Decimal"
                          required
                        ></v-text-field>
                      </td>
                      <td>
                    
                      </td>
                      <td>
                     
                      </td>
                      <td>
                      
                      </td>
                    </tr>
                    <tr>
                    
                      <td>
                      
                      </td>
                      <td>
                        
                      </td>
                      <td>
                   
                      </td>
                       <td>
                    
                      </td>
                    </tr>
                    <tr>
                      <td>
                     
                      </td>
                      <td>
                       
                      </td>
                      <td>
                      
                      </td>
                 <td>
                      
                      </td>
                    </tr>
                    <tr>
                     
                            <td colspan="4">
                     
                      </td>
                    </tr>
                  </table>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list three-line subheader> </v-list>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>
//import 'vuetify/dist/vuetify.min.css';
import axios from 'axios'

export default {
  data() {
    return {
      count_q:1,
      eraser_dialog:false,
      error_dialog:false,
      table_loader: true,
      Mapa: '',
      Cve_Ent: '',
      Nom_Ent: '',
      Nom_Abr: '',
      Cve_Mun: '',
      Nom_Mun: '',
      Cve_Loc: '',
      Nom_Loc: '',

      Latitud: '',
      Longitud: '',
      Lat_Decimal: '',
      Lon_Decimal: '',
      Altitud: '',
      Cve_Carta: '',
      Pob_Total: '',
      Pob_Masculina: '',
      Pob_Femenina: '',
      edit_Mapa: '',
      edit_Cve_Ent: '',
      edit_Nom_Ent: '',
      edit_Nom_Abr: '',
      edit_Cve_Mun: '',
      edit_Nom_Mun: '',
      edit_Cve_Loc: '',
      edit_Nom_Loc: '',
      
      edit_Latitud: '',
      edit_Longitud: '',
      edit_Lat_Decimal: '',
      edit_Lon_Decimal: '',
      edit_Altitud: '',
      edit_Cve_Carta: '',
      edit_Pob_Total: '',
      edit_Pob_Masculina: '',
      edit_Pob_Femenina: '',

      obj_list: {},
      item_list: [],
      data_list: [],
      data_list_munc:[],
      select_list:'Aguascalientes',
      select_list2: 'Aguascalientes',
      obj_on_table_edit: {},
      index_of_item_edit: '',
      id_edit: '',
      name_edit: '',
      description_edit: '',
      dialog_edit: false,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      dialog_del: false,
      thing: [],
      nameofuser: '',
      id: '',
      checkbox: true,
      arreglo_datos: [],
      arreglo_datos_boleanos: [],
      search: '',
      selected: [],
      switch1: [],
      headers: [
        //{ text: 'Mapa', value: 'Mapa', sortable: true },
        //{ text: 'Cve_Ent', value: 'Cve_Ent' },
        { text: 'Entidad', value: 'Nom_Ent', sortable: true },
        //{ text: 'Nom_Abr', value: 'Nom_Abr', sortable: true },
        //{ text: 'Cve_Mun', value: 'Cve_Mun' },
        { text: 'Municipio', value: 'Nom_Mun', sortable: true },
        //{ text: 'Cve_Loc', value: 'Cve_Loc', sortable: true },
        { text: 'Localidad', value: 'Nom_Loc' },
       // { text: 'Ámbito', value: 'Ámbito', sortable: true },
        //{ text: 'Latitud', value: 'Latitud', sortable: true },
        //{ text: 'Longitud', value: 'Longitud' },
        { text: 'Latitud Decimal', value: 'Lat_Decimal', sortable: true },
        { text: 'Longitud Decimal', value: 'Lon_Decimal', sortable: true },
        //{ text: 'Altitud', value: 'Altitud' },
        //{ text: 'Cve_Carta', value: 'Cve_Carta', sortable: true },
        //{ text: 'Pob_Masculina', value: 'Pob_Masculina' },
        //{ text: 'Pob_Femenina', value: 'Pob_Femenina', sortable: true },
         //{ text: 'Pob_Total', value: 'Pob_Total', sortable: true },
       /* {   text: 'Total De Viviendas Habitadas',
          value: 'Total De Viviendas Habitadas',
          sortable: true,
        },*/
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  watch: {
    dialog_edit(val) {
      val || this.close_edit()
    }
    ,
    arreglo_datos: function(datos) {
      if (datos.length <= 0) {
        this.table_loader = true
      } else {
        this.table_loader = false
      }
    },
  },
  created() {
       axios.get('/locations/entities').then(result => {
      this.data_list = this.result = result.data
    })
     axios.get('/locations/index/municipalitiesOf/'+this.select_list).then(result => {
      this.data_list_munc = this.result = result.data
    })
    axios
      .get('/locations/index/getAllEntities/' + this.select_list+"+"+this.select_list2)
      .then(result => {
        this.arreglo_datos = this.result = result.data
      })
 
    //setInterval(this.update_all_data,3000) ;
  },

  computed:{
    Pob_Total_computado(){     
      this.Pob_Total=parseInt(this.Pob_Masculina)+parseInt(this.Pob_Femenina);
      return this.Pob_Total;
    },
    edit_Pob_Total_computado(){
      this.edit_Pob_Total=parseInt(this.edit_Pob_Masculina)+parseInt(this.edit_Pob_Femenina);
      return this.edit_Pob_Total;
    }
  },
  methods: {
      upgrade_list_munc(){
  axios.get('/locations/index/municipalitiesOf/'+this.select_list).then(result => {
      this.data_list_munc = this.result = result.data
    })
  },
    acivate_del_dialog(id, thing) {
      this.dialog_del = true
      this.thing = thing
      this.id = id
      this.nameofuser = thing.name
    },
    close_dialogs() {
      this.dialog_del = false
    },
    deleteItem() {
      const index = this.arreglo_datos.indexOf(this.thing) //busca objeto  en el arreglo y retorna su posicion en el
      this.arreglo_datos.splice(index, 1)
      axios.delete('/locations/api/delete/' + this.id)
      console.log('eliminado: ' + this.id)
      this.dialog_del = false
      setTimeout(this.update_all_data, 200)
    },
    delete_all() {
      let arreglo = this.selected
    //  let question = confirm(
       // '¿esta seguro de eliminar los usuarios seleccionados?'
     // )
      //if (question == true) {
        arreglo.forEach(element => {
          const index = this.arreglo_datos.indexOf(element) //busca objeto  en el arreglo y retorna su posicion en el
          this.arreglo_datos.splice(index, 1)
          axios.delete('/locations/api/delete/' + element._id)
          console.log('eliminado: ' + element._id)
        })
        setTimeout(this.close_eraser_dialog, 200);
        setTimeout(this.update_all_data, 200);
     // }
    },
    clean_all_fields() {
      this.name_edit = ''
      this.description_edit = ''

      this.Mapa = ''
      this.Cve_Ent = ''
      this.Nom_Ent = ''
      this.Nom_Abr = ''
      this.Cve_Mun = ''
      this.Nom_Mun = ''
      this.Cve_Loc = ''
      this.Nom_Loc = ''
    
      this.Latitud = ''
      this.Longitud = ''
      this.Lat_Decimal = ''
      this.Lon_Decimal = ''
      this.Altitud = ''
      this.Cve_Carta = ''
      this.Pob_Total = ''
      this.Pob_Masculina = ''
      this.Pob_Femenina = ''

      this.edit_Mapa = ''
      this.edit_Cve_Ent = ''
      this.edit_Nom_Ent = ''
      this.edit_Nom_Abr = ''
      this.edit_Cve_Mun = ''
      this.edit_Nom_Mun = ''
      this.edit_Cve_Loc = ''
      this.edit_Nom_Loc = ''
      
      this.edit_Latitud = ''
      this.edit_Longitud = ''
      this.edit_Lat_Decimal = ''
      this.edit_Lon_Decimal = ''
      this.edit_Altitud = ''
      this.edit_Cve_Carta = ''
      this.edit_Pob_Total = ''
      this.edit_Pob_Masculina = ''
      this.edit_Pob_Femenina = ''

      this.id_edit = ''
      this.index_of_item_edit = ''
      this.obj_on_table_edit = {}
    },
    update_all_data() {
        axios.get('/locations/entities').then(result => {
      this.data_list = this.result = result.data
    })
     axios.get('/locations/index/municipalitiesOf/'+this.select_list).then(result => {
      this.data_list_munc = this.result = result.data
    })
    axios
      .get('/locations/index/getAllEntities/' + this.select_list+"+"+this.select_list2)
      .then(result => {
        this.arreglo_datos = this.result = result.data
      })
    },
    new_query() {
      this.arreglo_datos = []
      axios
      .get('/locations/index/getAllEntities/' + this.select_list+"+"+this.select_list2)
      .then(result => {
        this.arreglo_datos = this.result = result.data
      })
    },
    async save_add_new_location() {
      let location = {
        Mapa: this.Mapa,
        Cve_Ent: this.Cve_Ent,
        Nom_Ent: this.Nom_Ent,
        Nom_Abr: this.Nom_Abr,
        Cve_Mun: this.Cve_Mun,
        Nom_Mun: this.Nom_Mun,
        Cve_Loc: this.Cve_Loc ,
        Nom_Loc: this.Nom_Loc,
       
        Latitud: this.Latitud,
        Longitud: this.Longitud,
        Lat_Decimal: parseInt(this.Lat_Decimal),
        Lon_Decimal: parseInt(this.Lon_Decimal),
        Altitud: parseInt( this.Altitud),
        Cve_Carta: this.Cve_Carta,
        Pob_Total: parseInt( this.Pob_Total),
        Pob_Masculina: parseInt( this.Pob_Masculina),
        Pob_Femenina: parseInt( this.Pob_Femenina),
        'Total De Viviendas Habitadas': 1,
      }
      try {
        const response = await axios.post('/locations/api/create', {location});
        // this.arreglo_datos.push(newitem);
        console.log(`data: ${JSON.stringify(response.data)}`);
        this.dialog = false
        this.update_all_data();
        this.clean_all_fields();
      } catch (error) {
        // TODO: Usar una alerta con diseño o flash message.
        //alert("Error al agregar nuevo registro");
         this.watch_error_dialog();
      }
    },
    close_add_new_genre() {
      this.dialog = false
      this.clean_all_fields
    },
    show_edit(item) {
      this.dialog_edit = true
      this.edit_Mapa = item.Mapa
      this.edit_Cve_Ent = item.Cve_Ent
      this.edit_Nom_Ent = item.Nom_Ent
      this.edit_Nom_Abr = item.Nom_Abr
      this.edit_Cve_Mun = item.Cve_Mun
      this.edit_Nom_Mun = item.Nom_Mun
      this.edit_Cve_Loc = item.Cve_Loc
      this.edit_Nom_Loc = item.Nom_Loc
      
      this.edit_Latitud = item.Latitud
      this.edit_Longitud = item.Longitud
      this.edit_Lat_Decimal = item.Lat_Decimal
      this.edit_Lon_Decimal = item.Lon_Decimal
      this.edit_Altitud = item.Altitud
      this.edit_Cve_Carta = item.Cve_Carta
      this.edit_Pob_Masculina = item.Pob_Masculina
      this.edit_Pob_Femenina = item.Pob_Femenina

      this.id_edit = item._id
      this.index_of_item_edit = this.arreglo_datos.indexOf(item)
      this.obj_on_table_edit = Object.assign({}, item)
    },
     save_edit() {
      var id = this.id_edit
      console.log(id);
     let location = {
        Mapa: this.edit_Mapa,
        Cve_Ent: this.edit_Cve_Ent,
        Nom_Ent: this.edit_Nom_Ent,
        Nom_Abr: this.edit_Nom_Abr,
        Cve_Mun: this.edit_Cve_Mun,
        Nom_Mun: this.edit_Nom_Mun,
        Cve_Loc: this.edit_Cve_Loc ,
        Nom_Loc: this.edit_Nom_Loc,
        Ámbito:"no data",
        Latitud: this.edit_Latitud,
        Longitud: this.edit_Longitud,
        Lat_Decimal: parseInt(this.edit_Lat_Decimal),
        Lon_Decimal: parseInt(this.edit_Lon_Decimal),
        Altitud: parseInt( this.edit_Altitud),
        Cve_Carta: this.edit_Cve_Carta,
        Pob_Total: parseInt( this.edit_Pob_Total),
        Pob_Masculina: parseInt( this.edit_Pob_Masculina),
        Pob_Femenina: parseInt( this.edit_Pob_Femenina),
        'Total De Viviendas Habitadas': 1,
      }
   
        try {
       axios.put('/locations/api/update/'+id, location);
        // this.arreglo_datos.push(newitem);
        //console.log(`data: ${JSON.stringify(response2.data)}`);
        this.close_edit();
       this.update_all_data();
      } catch (error) {
        // TODO: Usar una alerta con diseño o flash message.
        //alert("Error al editar");
          this.watch_error_dialog();
      }
      //verifica retorno de objetos
      /*
    console.log(this.index_of_item_edit);
    console.log(this.obj_on_table_edit);
    console.log(location);
  */
   
    /*
      Object.assign(this.arreglo_datos[this.index_of_item_edit], location)
      this.close_edit()*/
      //window.location.href='/user/su/edit/'+id;
      // console.log('/user/su/edit/'+id);
    },
    close_edit() {
      this.dialog_edit = false
      this.clean_all_fields()
    },
    watch_error_dialog(){
      this.error_dialog=true;
      setTimeout(()=>(this.error_dialog=false),4000);
    },
    watch_eraser_dialog(){
      this.eraser_dialog=true;
  },
  close_eraser_dialog(){
    this.eraser_dialog=false;
  }
    
  },
    mounted() {
        //INTERNATIONALITATION PAGE WITH I18N
        var self=this;
         self.axios.get("../i18n").then((response) => {
      self.idioma = response.data.LANGUAGE;
      if (self.idioma === "es") {
        //console.log("esta en español");
        this.$i18n.locale = "es";
      } else if (self.idioma === "en") {
       // console.log("esta en ingles");
        this.$i18n.locale = "en";
      }
    });
    },
}
</script>
