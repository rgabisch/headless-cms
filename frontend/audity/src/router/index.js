import Vue from 'vue'
import VueRouter from 'vue-router'
//import * as firebase from "firebase";

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
                name: 'openSpace',
                component: () => import('../components/Space'),
            },
            {
                path: '/create-content',
                name: 'createContent',
                component: () => import('../components/CreateContent'),
            },
            {
                path: '/spaces/:sid/contents',
                name: 'listAllContents',
                props: true,
                component: () => import('../components/AllContents'),
            },
            {
                path: '/spaces/:sid/contents/:cid',
                name: 'content',
                props: true,
                component: () => import('../components/Content')
            },
            {
                path: '/create-contenttyp',
                name: 'createSchema',
                component: () => import('../components/CreateSchema'),
            },
            {
                path: '/schemas',
                name: 'listAllSchemas',
                component: () => import('../components/AllSchemas'),
            },
            {
                path: '/schemas/:id',
                name: 'schema',
                props: true,
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

/*router.beforeEach((to, from, next) =>{
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) next('login');
    else if (!requiresAuth && currentUser) next('Dashboard');
    else next();
});*/

export default router
