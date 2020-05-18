import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

import Space from './components/Space.vue';
import Seite from './components/Seite.vue';


Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: '/spaces', component: Space },
  { path: '/seiten', component: Seite }
];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
