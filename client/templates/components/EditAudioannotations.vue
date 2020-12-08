<template>
  <div id="EditAudioannotations"  >Hola {{who}} 

{{ruta}}
  </div> 
</template>
<script>
export default {
  name: 'EditAudioannotations',
  //  props:{idParametro:{
  //     type: String,
  //     default: '0',
  // 	}},
  props:['idParametro'],
  data() {
    return {
        who:"world",
        json: {},
        ruta:"otro valor"
    };
  },
  methods: {

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
    
  },  created() {
    var currentUrl = window.location.pathname;
        this.ruta=currentUrl  
        //console.log(currentUrl);
        var ultimoSlash = this.ruta.lastIndexOf("/"); 
        this.ruta=this.ruta.substring(ultimoSlash+1)
  },
    beforeMount() {
    },
  
};
</script>

<style></style>
