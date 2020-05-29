import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import vuetify from '@/plugins/vuetify' // path to vuetify export
import router from './router'
import axios from 'axios';
import * as firebase from "firebase";
import 'firebase/analytics';
import store from "./store";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(VueRouter);

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDgpHVICL0qqTaiNicKU5ysejCbuDs6UMI",
  authDomain: "headless-cms-15c61.firebaseapp.com",
  databaseURL: "https://headless-cms-15c61.firebaseio.com",
  projectId: "headless-cms-15c61",
  storageBucket: "headless-cms-15c61.appspot.com",
  messagingSenderId: "582836545438",
  appId: "1:582836545438:web:6ed2b833030587ceacd88f",
  measurementId: "G-CG498X230V"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
