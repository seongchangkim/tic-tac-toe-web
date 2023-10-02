import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
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
];
export const router = createRouter({
    history: createWebHistory(),
    routes,
});
