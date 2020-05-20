import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        title: 'Индивидуальный портрет',
        meta:{title: 'Индивидуальный портрет',},
        component: Home
    },
    {
        path: '/doubleportret',
        name: 'doubleportret',
        title: 'Парный портрет (композит)',
        meta:{title: 'Парный портрет (композит)',},
        component: () => import(/* webpackChunkName: "about" */ '../views/Duble.vue')
    },
    {
        path: '/prognoz',
        name: 'prognoz',
        title: 'Индивидуальный прогноз на день / месяц / год',
        meta: {title: 'Индивидуальный прогноз на день / месяц / год',},
        component: () => import(/* webpackChunkName: "about" */ '../views/Arkan.vue')
    },
    {
        path: '/doubleprognoz',
        name: 'doubleprognoz',
        title: 'Парный прогноз на день / месяц / год',
        meta: {title: 'Парный прогноз на день / месяц / год',},
        component: () => import(/* webpackChunkName: "about" */ '../views/ArkanDuble.vue')
    },
    {
        path: '/info',
        name: 'info',
        title: 'Значения позиций',
        meta: {title: 'Значения позиций',},
        component: () => import(/* webpackChunkName: "about" */ '../views/positionInfo.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
