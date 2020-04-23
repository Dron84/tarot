import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        title: 'Индивидуальный портрет',
        component: Home
    },
    {
        path: '/duble',
        name: 'Duble',
        title: 'Парный портрет',
        component: () => import(/* webpackChunkName: "about" */ '../views/Duble.vue')
    },
    {
        path: '/arkan',
        name: 'arkan',
        title: 'Прогноз на месяц/год',
        component: () => import(/* webpackChunkName: "about" */ '../views/Arkan.vue')
    },
    {
        path: '/arkanduble',
        name: 'arkanduble',
        title: 'Парный Прогноз на месяц/год',
        component: () => import(/* webpackChunkName: "about" */ '../views/ArkanDuble.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
