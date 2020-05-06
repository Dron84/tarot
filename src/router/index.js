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
        title: 'Парный портрет',
        meta:{title: 'Парный портрет',},
        component: () => import(/* webpackChunkName: "about" */ '../views/Duble.vue')
    },
    {
        path: '/prognoz',
        name: 'prognoz',
        title: 'Индивидуальный прогноз на месяц / год',
        meta: {title: 'Индивидуальный прогноз на месяц / год',},
        component: () => import(/* webpackChunkName: "about" */ '../views/Arkan.vue')
    },
    {
        path: '/prognozdouble',
        name: 'prognozdouble',
        title: 'Парный прогноз на месяц / год',
        meta: {title: 'Парный прогноз на месяц / год',},
        component: () => import(/* webpackChunkName: "about" */ '../views/ArkanDuble.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
