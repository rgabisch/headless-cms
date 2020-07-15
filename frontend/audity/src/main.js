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

new Vue({
        router,
        vuetify,
        store,
        render: h => h(App),
    }).$mount('#app')