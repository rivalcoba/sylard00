<template>
  <div id ="app">
    <br>
    <a class="waves-effect waves-light btn">{{message}}</a>
    <br>
    <br>
  </div>
</template>

<script>
export default {
  name: "App",
  data: ()=>({
    message: "Vue con Componentes"
  })
}
</script>