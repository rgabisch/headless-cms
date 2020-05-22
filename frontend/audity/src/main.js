import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import vuetify from '@/plugins/vuetify' // path to vuetify export

import Dashboard from './components/Dashboard.vue';
import Space from './components/Space.vue';
import Seite from './components/Seite.vue';
import Schema from './components/Schema.vue';


Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: '', component: Dashboard },
  { path: '/spaces', component: Space },
  { path: '/seiten', component: Seite },
  { path: '/create-contenttyp', component: Schema}
];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
