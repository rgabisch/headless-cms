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
        name: 'dashboard',
        component: () => import('./components/Dashboard'),
      },
      {
        path: '/spaces',
        name: 'openSpace',
        component: () => import('./components/Space'),
      },
      {
        path: '/create-content',
        name: 'createContent',
        component: () => import('./components/CreateContent'),
      },
      {
        //path: '/spaces/:sid/contents',
        path: '/spaces/a8a42e70-a127-11ea-9054-05581f9d528d/contents',
        name: 'listAllContents',
        props: true,
        component: () => import('./components/AllContents'),
      },
      {
        //path: '/spaces/:sid/contents/:cid',
        path: '/spaces/a8a42e70-a127-11ea-9054-05581f9d528d/contents/:cid',
        name: 'content',
        props: true,
        component: () => import('./components/Content')
      },
      {
        path: '/create-contenttyp',
        name: 'create',
        component: () => import('./components/CreateSchema'),
      },
      {
        path: '/schemas',
        name: 'listAllSchemas',
        component: () => import('./components/AllSchemas'),
      },
      {
        path: '/schemas/:id',
        name: 'schema',
        props: true,
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
