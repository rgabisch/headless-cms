import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

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
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/Register')
    },
    {
        path: '/',
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
                path: '/edit-content/:contentId/space/:spaceId',
                name: 'editContent',
                props: true,
                component: () => import('../components/EditContent'),
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
                path: '/create-schema',
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

    {
        path: '/template',
        name: 'template',
        props: true,
        component: () => import('../views/Template'),
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiresVisitor = to.matched.some(record => record.meta.requiresVisitor);
    const isLoggedIn = store.getters.isLoggedIn;

    if (requiresAuth && !isLoggedIn) {
        console.log(`in router; is not logged in = ${isLoggedIn}`)
        next('login');
    } else if (requiresVisitor && isLoggedIn) {
        console.log(`in router; is logged in = ${isLoggedIn}`)
        next('/');
    } else {
        console.log(`requires no auth`)
        next();
    }
})

export default router;
