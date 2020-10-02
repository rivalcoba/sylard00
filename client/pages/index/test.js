import Vue from '@node_modules/vue/dist/vue'

const getVueApp = function() {
  return new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue from Module!',
    },
  })
}

export default {
  getVueApp
}
