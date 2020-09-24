<template>
<div>
    <h1>Lectura EAF</h1>
    <!-- https://www.youtube.com/watch?v=NPGkoOQPtJs
    min  9:05-->
    <div id="app">
        <!--  {{ info }} -->
        <div v-if="this.info.data">
            Si hay datos Linea por Linea
            {{$attrs.tiempo_parametro}} {{$attrs.longitud_tiempo}}
            <button v-on:click="leerTier">Saludar</button>
            <br />
            {{recorrer_todo($attrs.longitud_tiempo)}}
            <div v-for="(item, index) in options" :key="'item' + index">
                Canal {{ index + 1 }}
                <input type="checkbox" :id="item.tier_id" checked @change="seleccion_onoff($event)" />
                <label for="checkbox" value="on" name="on" id="on"> </label>
                {{ item.tier_participant }} {{ item.tier_id }}

                <select :id="item.tier_id" @change="seleccion_visualizacion_options($event)">
                    <option value="B">Scrolling</option>
                    <option value="A" selected>On-Line-Display</option>
                </select>
            </div>

            <div v-for="(item, index) in otro" :key="index">
                <div v-if="options[index].Visible">
                    <div v-if="options[index].value=='A'">
                        <div v-for="(item, index) in otro[index]" :key="index">
                            <div v-if="
                    $attrs.tiempo_parametro >= item.TIME_SLOT_REF1 &&
                      $attrs.tiempo_parametro <= item.TIME_SLOT_REF2 - 1
                  ">
                                <b>
                                    <!--{{tier_temp}}:-->
                                    {{ item.ANNOTATION_VALUE }}
                                    <!--  me quede 
                                    {{sincronizar(7)}}
                                    -->
                                    <!-- {{item.ANNOTATION_ID}} 
                {{item.TIME_SLOT_REF1}} {{item.TIME_SLOT_REF2}} -->
                                </b>
                            </div>
                            <div v-if="index == 0">
                                <!-- {{item.DEFAULT_LOCALE[index]}} ({{item.LINGUISTIC_TYPE_REF[index]}}) {{item.PARTICIPANT[index]}}
                {{tier_temp=item.TIER_ID[index]}}:-->{{ item.TIER_ID[index] }} :
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p v-else>loading.....</p>
        <div v-if="this.info.data">
            ----------------------------------------------------------------- Si hay
            datos Multiples Lineas ------------------
            <br />
            <!--<div v-for="(item, index) in otro" :key="index">
                <div v-if="options[index].Visible">
                    <div v-if="options[index].value=='B'">
                        <div v-for="(item, index) in otro[index]" :key="index">
                            <div v-if="
                    $attrs.tiempo_parametro >= item.TIME_SLOT_REF1 &&
                      $attrs.tiempo_parametro <= item.TIME_SLOT_REF2 - 1
                  ">
                                <b> {{ item.ANNOTATION_VALUE }} </b>
                            </div>
                            <p v-else>{{ item.ANNOTATION_VALUE }}</p>
                            <div v-if="index == 0">
                                <b> {{ item.TIER_ID[index] }} : </b>
                               este no va// {{item.DEFAULT_LOCALE[index]}} {{item.LINGUISTIC_TYPE_REF[index]}}  {{item.PARTICIPANT[index]}}
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            -->
            <div v-for="(item,index) in tempdata" :key="index">
                <div v-if="
                    $attrs.tiempo_parametro >= item.TIME_SLOT_REF1 &&
                      $attrs.tiempo_parametro <= item.TIME_SLOT_REF2 - 1
                  ">
                    <b> {{ item.tier_id}} : {{ item.ANNOTATION_VALUE }} </b>
                </div>
                <p v-else> <button v-on:click="mensaje_al_player(item.TIME_SLOT_REF1)"> </button> {{ item.tier_id}} :{{item.TIME_SLOT_REF1}} {{ item.ANNOTATION_VALUE }}</p>
            </div>
        </div>
        <p v-else>Cargando.....</p>
    </div>
</div>
</template>

props:['tiempo_parametro','tiempo_longitud'],

<script>
export default {
    name: "LecturaEAF",

    data() {
        return {
            info: [],
            otro: [],
            selected: "A",
            tier_temp: "",
            options: [],
            results: [],
            tempdata: [],
            contador: 0
            //tiempo_parametro:"8"
        };
    },
    computed: {
        get: () => {},
        set: () => {},
    },
    methods: {
        mensaje_al_player: function (tiempo) {
            console.log("Se envia un msg al player " + tiempo)
            this.$emit('mensaje_scroll', tiempo)
        },
        recorrer_todo: function (longitud) {

            for (var i = 0; i <= longitud; i++) {
                this.recorrer(i)

            }
            //this.recorrer(7)
            console.log("Este el  ultimo contador" + this.contador)
        },
        recorrer: function (item) {

            //https://stackoverflow.com/questions/38618088/how-to-find-multiple-elements-in-array-javascript-es6

            for (var indice in this.otro) {
                this.otro[indice].forEach(x => {
                    //  var temp = ((x.TIME_SLOT_REF1 == item) || (x.TIME_SLOT_REF2 == item))
                    //console.log("temporal " + temp)
                    //if (this.results.find(((x) => x == ((x.TIME_SLOT_REF1 == item) || (x.TIME_SLOT_REF2 == item))))) {

                    //console.log("+++++rrrrr+++" + this.otro[indice][0].PARTICIPANT)

                    //if (this.results.find(((x) => x.TIME_SLOT_REF1 >= item) && ((x) => x.TIME_SLOT_REF2 <= item))) {
                    if (((x.TIME_SLOT_REF1 == item) || (x.TIME_SLOT_REF2 == item)) && (this.results.indexOf(x) === -1)) {
                        this.results.push(x)
                        //aqui me quede arreglando el multilinea
                        //checar https://stackoverflow.com/questions/7858385/how-to-add-values-to-an-array-of-objects-dynamically-in-javascript
                        this.tempdata[this.contador] = {};
                        this.tempdata[this.contador] = {
                            tier_id: this.otro[indice][0].TIER_ID[0],
                            ANNOTATION_ID: x.ANNOTATION_ID,
                            ANNOTATION_VALUE: x.ANNOTATION_VALUE,
                            TIME_SLOT_REF1: x.TIME_SLOT_REF1,
                            TIME_SLOT_REF2: x.TIME_SLOT_REF2,
                            // valor: "valor " + indice
                        }

                        console.log("+++++rrrrr+++" + this.otro[indice][0].TIER_ID)
                        console.log("anotatio id" + x.ANNOTATION_ID)
                        console.log("value " + x.ANNOTATION_VALUE)
                        console.log("value TIME_SLOT_REF1 y 2:" + x.TIME_SLOT_REF1 + " " + x.TIME_SLOT_REF2)
                        console.log("-----Este es el contador" + this.contador + "-----")
                        this.contador++
                        //this.results.push(tempdata)
                        //console.log("el valor " + this.otro[indice][0].TIER_ID[0])

                        //
                    }
                    //if ((x.TIME_SLOT_REF2 <= item)) results.push(x)

                    //}
                })

            }

            //this.results.push(data)
            //console.log("Estos son los arreglos" + tempdata)

        },
        sincronizar: function (item) {
            // me quede
            //chechar https://www.geeksforgeeks.org/indexof-method-in-an-object-array-in-javascript/
            console.log("--Aqui--" + item)
            var valor = this.otro[1].find(((x) => x.TIME_SLOT_REF1 >= item) && ((x) => x.TIME_SLOT_REF2 <= item));
            //var valor = this.otro[1].find((x) => x.TIME_SLOT_REF1 >= item);
            console.log("--Aqui--" + valor)
            return valor;
        },
        buscar_option_value: function (item) {
            var valor = this.options.find((x) => x.tier_id == item);
            //console.log("Aqui "+item)
            //console.log("otro "+valor)
            return valor;
        },
        seleccion_onoff: function (e) {
            console.log(e.target.value);
            console.log(event.target.id);
            console.log(e.target.checked);
            if (e.target.checked) {
                console.log("si esta en on");
                this.options.find((x) => x.tier_id == e.target.id).Visible = true;
            } else {
                this.options.find((x) => x.tier_id == e.target.id).Visible = false;
                console.log("si lo off");
            }
            console.log(
                "Lo dejo en " +
                event.target.id +
                " " +
                this.options.find((x) => x.tier_id == e.target.id).Visible
            );
        },
        seleccion_visualizacion_options: function (e) {
            console.log("--------------------------------");
            console.log(
                "valor original es " +
                this.options.find((x) => x.tier_id == event.target.id).value
            );
            console.log(e.target.value);
            console.log(event.target.id);
            // console.log(arreglo_ref_tiempo.find(x=>x.ANNOTATION_ID===ts).TIME_SLOT_REF1)
            //console.log("Si lo encontro "+this.options.find(x=>x.tier_id==event.target.id).value)
            if (
                this.options.find((x) => x.tier_id == event.target.id).value !=
                event.target.value
            ) {
                //console.log("Si lo encontro "+this.options.find(x=>x.tier_id==event.target.id).value)
                this.options.find((x) => x.tier_id == event.target.id).value =
                    event.target.value;
            }
            console.log(
                "Cambio el valor a " +
                this.options.find((x) => x.tier_id == event.target.id).value
            );
            //this.options.push({ tier_id:'2',tier_name:event.target.id, value: 'A' })
        },
        leerTier: function () {
            // var i=0;
            console.log("esta leyendo la tier");
            for (var i in this.info.data.tier) {
                console.log("aqui si entro 1");
                //console.log(this.info.data.tier[i]);
                console.log("aqui si entro 2");
                //7/08/2020 aqui no puedo quitar infinite loop
                this.otro.push(this.info.data.tier[i]);
                //console.log("aqui si entro 3")
                console.log("Tier num " + i);
                // console.log(this.info.data.ANNOTATION_DOCUMENT.tier[1]);
                //console.log(this.info.data);
            }
            for (var j in this.otro) {
                //Agrega al vector options para mostrar una linea o multiples
                this.options.push({
                    //id: i,
                    tier_id: this.otro[j][0].TIER_ID[0],
                    tier_participant: this.otro[j][0].PARTICIPANT[0],
                    value: "A",
                    Visible: true,
                });
            }
            //return true;
        },

        saveFileJSon: function () {
            const data = JSON.stringify(this.otro);
            window.localStorage.setItem("otro", data);
            //console.log(JSON.parse(window.localStorage.getItem('info')))
            //console.log("se creo el json");
            return "ok";
        },
        time_order_sub: function (text) {
            //       var parser, xmlDoc;
            //parser = new DOMParser();
            //xmlDoc = parser.parseFromString(text,"text/xml");
            //document.getElementById("demo").innerHTML =
            //xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
            return text;
        },
        add: function (valor) {
            this.otro.push({
                first: "1",
                lastn: "3"
            });
            console.log(valor);
            console.log(1);
        },
    },
    created() {
        //      console.log("Aqui se creo el json");
        //this.saveFileJSon();
        //this.leerTier();
    },
    activated() {
        //this.leerTier();
    },
    updated() {
        //this.leerTier();
    },
    mounted() {
        // var parseString = require('xml2js').parseString;
        //estaba montando el xml
        // this.axios
        //.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        //.then(response => (this.info = response))

        //this.axios.get('/eaf/asset01.eaf')
        //       .then(response =>  (this.info = response)          );

        this.axios
            .get("/eaf/Nuevoeaf.json")
            .then((response) => (this.info = response));

        //this.saveFileJSon();
        //console.log("Aqui se esta añadiendo al json");
        //this.add("hola");
        //this.leerTier();
    },
};
</script>
