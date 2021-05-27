import Vue from 'vue';
import Vuetify from 'vuetify';
//import Vuetify from 'vuetify/lib/framework';
if (window.location.pathname == `/user` || window.location.pathname == `/genres/`) {
    import ('vuetify/dist/vuetify.min.css').then()
}
Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#15C1D1',
                secondary: '#7EBFCC',
                orange: '#FF9E00',
                dark: '#4C4C4C'
            }


        }

    }
});