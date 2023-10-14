import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () =>
            import(/* webpackChunkName: "home" */ '../views/home.vue'),
    },
    {
        path: '/auth/sign-up',
        name: 'sign-up',
        component: () =>
            import(
                /* webpackChunkName: "sign_up" */ '../views/user/sign_up/sign_up.vue'
            ),
    },
    {
        path: '/auth/login',
        name: 'login',
        component: () =>
            import(
                /* webpackChunkName: "login" */ '../views/user/login/login.vue'
            ),
    },
    {
        path: '/auth/social-login/:type',
        name: 'socialLogin',
        component: () =>
            import(
                /* webpackChunkName: "socialLogin" */ '../views/user/social_login_loading/social_login_loading.vue'
            ),
    },
    {
        path: '/admin',
        name: 'admin',
        component: () =>
            import(
                /* webpackChunkName: "admin" */ '../components/admin/dash_board/dash_board.vue'
            ),
    },
];
export const router = createRouter({
    history: createWebHistory(),
    routes,
});
