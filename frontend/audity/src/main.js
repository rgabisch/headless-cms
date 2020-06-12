import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import vuetify from '@/plugins/vuetify' // path to vuetify export
import router from './router'
import axios from 'axios';
import store from "./store";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(VueRouter);


// Initialize the app only when we are sure Firebase Auth object is ready to use
// Now when refreshing the page, or trying to access view from url, won't redirect to /login
let app = '';

if (!app) {
    app = new Vue({
        router,
        vuetify,
        store,
        render: h => h(App),
    }).$mount('#app')
}