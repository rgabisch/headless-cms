import Vue from 'vue'
import VueRouter from 'vue-router'
import * as firebase from "firebase";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login')
    },
    { path: '/',
        component: () => import('../App'),
        meta: {
            requiresAuth: true
        },
        children: [

            {
                path: '',
                name: 'Dashboard',
                component: () => import('../components/Dashboard'),
            },
            {
                path: '/spaces',
                component: () => import('../components/Space'),
            },
            {
                path: '/create-content',
                component: () => import('../components/Seite'),
            },
            {
                path: '/create-contenttyp',
                component: () => import('../components/Schema'),
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) =>{
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) next('login');
    else if (!requiresAuth && currentUser) next('Dashboard');
    else next();
});

export default router
