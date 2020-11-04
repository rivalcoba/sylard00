<template>
<div>
    Hola vue

    <button v-on:click="agregar_tier_acomodado()"></button>
    <table v-if="this.info.data">
        <th> Canal Hablante </th>
        <th>Mostrar</th>
        <th>Visualiza en</th>
        <th>Color de Tipográfia</th>
        <!--Aqui me quede filtrando por tier_participante con un for  <tr v-for="(item, index) in this.info.data.tier" :key="'item' + index">
-->
        <tr v-for="(item, index) in this.tier_acomodado" :key="'item' + index">
            <div>
                {{item}}
                <!-- {{item[0]}}-->
            </div>
            <!-- <td>{{item[0].PARTICIPANT}} </td>-->
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>

    </table>

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
            // veggies: ['patata', 'tomate', 'chiles', 'pimientoverde']
        }

    },
    methods: {
        agregar_tier_acomodado: function () {
            for (var indice in this.info.data.tier) {
                //console.log(this.info.data.tier[indice][0])
                this.tier_acomodado.push(this.info.data.tier[indice][0])
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
        agrupar_tier_acomodado: function () {
            for (var indice in this.tier_acomodado) {
                // this.tier_acomodado[indice][0]
                //if (this.tier_acomodado[indice].PARTICIPANT != this.buscar_participante_value(this.tier_agrupado[indice].PARTICIPANT)) {

                //if (this.tier_agrupado.indexOf(this.tier_acomodado[indice].PARTICIPANT) === -1) {
                // this.tier_agrupado.push(this.tier_acomodado[indice].PARTICIPANT)
                this.tier_participante.push(this.tier_acomodado[indice].PARTICIPANT[0])
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
        }

    },

    activated() {
        //this.leerTier();
    },
    updated() {
        //this.leerTier();
    },
    mounted() {
        this.axios
            .get("/eaf/Nuevoeaf.json")
            .then((response) => (this.info = response));

    }
}
</script>
