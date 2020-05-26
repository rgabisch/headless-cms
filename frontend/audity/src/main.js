import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import vuetify from '@/plugins/vuetify' // path to vuetify export

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: '/',
    component: () => import('./App'),
    children: [
      {
        path: '',
        component: () => import('./components/Dashboard'),
      },
      {
        path: '/spaces',
        component: () => import('./components/Space'),
      },
      {
        path: '/create-content',
        component: () => import('./components/Seite'),
      },
      {
        path: '/create-contenttyp',
        component: () => import('./components/Schema'),
      }
  ]
  },

];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
