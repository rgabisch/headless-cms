import Vue from 'vue'
import VueRouter from 'vue-router'

import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login'),
        meta: {
            requiresVisitor: true
        }
    },
    {   path: '/',
        name: 'index',
        component: () => import('../views/Index'),
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


router.beforeEach((to, from, next) =>{
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiresVisitor = to.matched.some(record => record.meta.requiresVisitor);
    const currentUser = firebase.auth().currentUser;

    if (requiresAuth && !currentUser) {
        next('login');
    }
    else if (requiresVisitor && currentUser) {
        next('/');
    }
    else {
        next();
    }
})

export default router;
