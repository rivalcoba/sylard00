<template>
<div>
    <div v-if="this.info.data">
        <!--  <button v-on:click="agregar_tier_acomodado()"></button>-->
        <div v-for="(item2, index) in tier_participante" :key="'item' + index">
            <input hidden type="text" name="PARTICIPANT" :value="item2">
            <table>
                <tr>
                    <th> Canal Hablante </th>
                    <th>Mostrar</th>
                    <th>Visualiza en</th>
                    <th>Color de Tipográfia</th>
                </tr>
                <tr>
                    <td> ✔ Canal de Hablante: {{item2}}  </td>
                    <td><input type="checkbox" :id="item2" checked @change="selecion_todos_onoff($event)" /></td>
                    <td>
                        <select :id="item2" @change="selecion_todos_visualizacion_options($event)">
                            <option value="B">Scrolling</option>
                            <option value="A" selected>On-Line-Display</option>
                        </select>
                    </td>
                    <td><input type="text" :id="item2" value="#000000" @change="seleccion_todos_color($event)"></td>
                    <td><input type="text" value="header" hidden></td>
                    <td><input type="text" value="header" hidden></td>
                </tr>
            
            <div v-for="(item, index) in tier_acomodado" :key="'item' + index">

                <tr v-if="item2==item.PARTICIPANT ">
                     <input hidden type="text" name="LINGUISTIC_TYPE_REF" :value="item.LINGUISTIC_TYPE_REF">
                    <input hidden type="text" name="TIER_ID" :value="item.TIER_ID">
                    
                    <td>{{item.TIER_ID}} </td>

                    <td><input type="checkbox" :id="item.TIER_ID" checked @change="seleccion_onoff($event)" />
                    <input hidden type="text" :value="item.Visible" name="Visible" />
                    </td>
                    
                    <td>
                        <select  name="value" :id="item.TIER_ID" @change="seleccion_visualizacion_options($event)">
                            <option value="B">Scrolling</option>
                            <option value="A" selected>On-Line-Display</option>
                        </select>
                        <!--No funciona (no actualiza de manera automatica )<select v-model="tier_acomodado.value">
                        <option  v-bind:value="item.value" v-for="(c, index) in display" :key="index" :id="item.TIER_ID">{{ c.name }}</option>
                    </select>-->
                    </td>

                    <td><input name="color" type="text" :id="item.TIER_ID" value="#000000" @change="seleccion_color($event)"></td>

                </tr>
                
            </div>
            
                <!--  <tr> https://codepen.io/anon/pen/gBWWmM
              https://forum.vuejs.org/t/how-to-work-with-objects-as-select-option-values/45490/4
                    <td><select v-model="display">
                            <option v-for="(c, index) in display" :key="index" :id="c.value" :value="c.value">{{ c.name }}</option>
                        </select>
                    </td>
                </tr>-->
            </table>
        </div>
    </div>
<input hidden type="text" name="capas" :value="tier_acomodado.length">
</div>

</template>

<script>
export default {
    name: "LecturaTierEAF",
    data() {
        return {
            //data here
            info: [],
            valor: "hello",
            archivo: "",
            tier_acomodado: [],
            tier_agrupado: [],
            tier_participante: [],
            display: [{
                    value: "A",
                    name: 'On-Line-Display'
                },
                {
                    value: "B",
                    name: 'Scrolling'
                }
            ]
        }

    },
    methods: {
        agregar_tier_acomodado: function () {
            for (var indice in this.info.data.tier) {
                //console.log(this.info.data.tier[indice][0])
                this.tier_acomodado.push({
                    DEFAULT_LOCALE: this.info.data.tier[indice][0].DEFAULT_LOCALE[0],
                    PARTICIPANT: this.info.data.tier[indice][0].PARTICIPANT[0],
                    LINGUISTIC_TYPE_REF: this.info.data.tier[indice][0].LINGUISTIC_TYPE_REF[0],
                    TIER_ID: this.info.data.tier[indice][0].TIER_ID[0],
                    value: "A",
                    Visible: true,
                    Color: "#000000",
                })
                //  this.info.data.tier[indice].forEach(x => {
                //        console.log(x)
                //  if (indice == 0) {
                //    this.tier_acomodado.push(x.PARTICIPANT)
                //}

                //})
            }
            this.ordenar_tier_acomodado(this.tier_acomodado, "PARTICIPANT")
            console.log(this.tier_acomodado);
            console.log("Ya lo ordeno")
            this.agrupar_tier_acomodado()
            console.log("Ya lo Acomodo")
        },
        ordenar_tier_acomodado: function (p_array_json, p_key) {
            p_array_json.sort(function (a, b) {
                return a[p_key] > b[p_key];
            });
        },
        buscar_participante_value: function (item) {
            var valor = this.tier_agrupado.find((x) => x.PARTICIPANT == item);
            //console.log("Aqui "+item)
            //console.log("otro "+valor)
            return valor;
        },
        seleccion_visualizacion_options: function (e) {
            console.log("--------------------------------");
            console.log(
                "valor original es " +
                this.tier_acomodado.find((x) => x.TIER_ID == event.target.id).value
            );
            console.log(e.target.value);
            console.log(event.target.id);
            // console.log(arreglo_ref_tiempo.find(x=>x.ANNOTATION_ID===ts).TIME_SLOT_REF1)
            //console.log("Si lo encontro "+this.options.find(x=>x.tier_id==event.target.id).value)
            if (
                this.tier_acomodado.find((x) => x.TIER_ID == event.target.id).value !=
                event.target.value
            ) {
                //console.log("Si lo encontro "+this.options.find(x=>x.tier_id==event.target.id).value)
                this.tier_acomodado.find((x) => x.TIER_ID == event.target.id).value =
                    event.target.value;
            }
            console.log(
                "Cambio el valor a " +
                this.tier_acomodado.find((x) => x.TIER_ID == event.target.id).value
            );
            //this.options.push({ tier_id:'2',tier_name:event.target.id, value: 'A' })
        },
        selecion_todos_visualizacion_options: function (e) {
            //aqui me quede seleccionando por participante para que desbloquee todos
            console.log("valor " +
                e.target.value);
            console.log("id " +
                event.target.id);
            if (e.target.value == "A") {
                console.log("si esta en online display");
                //this.tier_acomodado.find((x) => x.TIER_ID == e.target.id).Visible = true;
                //cambiar todos
                for (var indice in this.tier_acomodado) {
                    if (this.tier_acomodado[indice].PARTICIPANT == e.target.id) {
                        console.log("Encontro a " + this.tier_acomodado[indice].PARTICIPANT + " " + indice)
                        this.tier_acomodado[indice].value = "A";
                    }

                }

            } else {
                //this.tier_acomodado.find((x) => x.TIER_ID == e.target.id).Visible = false;
                console.log("esta Multi-line display");
                for (var indice in this.tier_acomodado) {
                    if (this.tier_acomodado[indice].PARTICIPANT == e.target.id) {
                        console.log("Encontro a " + this.tier_acomodado[indice].PARTICIPANT + " " + indice)
                        this.tier_acomodado[indice].value = "B";
                    }
                }
            }

        },
        agrupar_tier_acomodado: function () {
            for (var indice in this.tier_acomodado) {
                // this.tier_acomodado[indice][0]
                //if (this.tier_acomodado[indice].PARTICIPANT != this.buscar_participante_value(this.tier_agrupado[indice].PARTICIPANT)) {

                //if (this.tier_agrupado.indexOf(this.tier_acomodado[indice].PARTICIPANT) === -1) {
                // this.tier_agrupado.push(this.tier_acomodado[indice].PARTICIPANT)
                //antes this.tier_participante.push(this.tier_acomodado[indice].PARTICIPANT[0])

                this.tier_participante.push(this.tier_acomodado[indice].PARTICIPANT)
                //  console.log("No lo encontro")
                //} else if (this.tier_agrupado.indexOf(this.tier_acomodado[indice].PARTICIPANT) > -1) {
                //console.log("Ya lo encontro")
                // console.log("si lo encontro" +
                //this.buscar_participante_value(this.tier_agrupado[indice].PARTICIPANT))

                //}
            }
            const myUniqueArray = [...new Set(this.tier_participante)]; // myArray = [...new Set(myArray)];
            this.tier_participante = myUniqueArray
            //recorrer para agrupar

            //for (var indice in this.tier_acomodado) {
            //for (var i in this.tier_participante) {
            //    if (this.tier_acomodado[indice].PARTICIPANT[0] == this.tier_participante[i]) {
            //this.tier_agrupado.push(this.tier_acomodado[indice].PARTICIPANT[0])
            // }

            // }
            // }
            //console.log(myUniqueArray); // console.log(myArray)
        },
        selecion_todos_onoff: function (e) {
            //aqui me quede seleccionando por participante para que desbloquee todos
            console.log("valor " +
                e.target.value);
            console.log("id " +
                event.target.id);
            console.log("checado " +
                e.target.checked);
            if (e.target.checked) {
                console.log("si esta en on");
                //this.tier_acomodado.find((x) => x.TIER_ID == e.target.id).Visible = true;
                //cambiar todos
                for (var indice in this.tier_acomodado) {
                    if (this.tier_acomodado[indice].PARTICIPANT == e.target.id) {
                        console.log("Encontro a " + this.tier_acomodado[indice].PARTICIPANT + " " + indice)
                        this.tier_acomodado[indice].Visible = true;
                    }

                }

            } else {
                //this.tier_acomodado.find((x) => x.TIER_ID == e.target.id).Visible = false;
                console.log("si los hace off");
                for (var indice in this.tier_acomodado) {
                    if (this.tier_acomodado[indice].PARTICIPANT == e.target.id) {
                        console.log("Encontro a " + this.tier_acomodado[indice].PARTICIPANT + " " + indice)
                        this.tier_acomodado[indice].Visible = false;
                    }

                }
            }

        },
        seleccion_onoff: function (e) {
            console.log("valor " +
                e.target.value);
            console.log("id " +
                event.target.id);
            console.log("checado " +
                e.target.checked);
            if (e.target.checked) {
                console.log("si esta en on");
                this.tier_acomodado.find((x) => x.TIER_ID == e.target.id).Visible = true;
            } else {
                this.tier_acomodado.find((x) => x.TIER_ID == e.target.id).Visible = false;
                console.log("si lo off");
            }

        },
        seleccion_color: function (e) {
            console.log("--------------------------------");
            console.log(
                "valor original es " +
                this.tier_acomodado.find((x) => x.TIER_ID == event.target.id).Color
            );
            console.log(e.target.value);
            console.log(event.target.id);
            if (
                this.tier_acomodado.find((x) => x.TIER_ID == event.target.id).Color !=
                event.target.value
            ) {
                //console.log("Si lo encontro "+this.options.find(x=>x.tier_id==event.target.id).value)
                this.tier_acomodado.find((x) => x.TIER_ID == event.target.id).Color =
                    event.target.value;
            }
            console.log(
                "Cambio el valor a " +
                this.tier_acomodado.find((x) => x.TIER_ID == event.target.id).Color
            );
            //this.options.push({ tier_id:'2',tier_name:event.target.id, value: 'A' })
        },
        seleccion_todos_color: function (e) {
            console.log("--------------------------------");
            console.log(
                "valor original es " +
                this.tier_acomodado.find((x) => x.TIER_ID == event.target.id).Color
            );
            console.log(e.target.value);
            console.log(event.target.id);
             for (var indice in this.tier_acomodado) {
                    if (this.tier_acomodado[indice].PARTICIPANT == e.target.id) {
                        console.log("Encontro a " + this.tier_acomodado[indice].PARTICIPANT + " " + indice)
                        this.tier_acomodado[indice].Color = e.target.value;
                    }

                }
            //this.options.push({ tier_id:'2',tier_name:event.target.id, value: 'A' })
        },
    },

    activated() {
        //this.leerTier();
    },
    updated() {
        //this.leerTier();
    },
    mounted() {
        var self = this;
        this.axios
            .get("/eaf/tmp/Nuevoeaf.json")
            //.then((response) => (this.info = response));
            .then((response) => {this.info = response;
            self.agregar_tier_acomodado();
            });
            //this.agregar_tier_acomodado();

    }
}
</script>
