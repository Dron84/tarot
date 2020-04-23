import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        title: 'Индивидуальный',
        component: Home
    },
    {
        path: '/duble',
        name: 'Duble',
        title: 'Парный',
        component: () => import(/* webpackChunkName: "about" */ '../views/Duble.vue')
    },
    {
        path: '/arkan',
        name: 'arkan',
        title: 'Прогноза на месяц/год',
        component: () => import(/* webpackChunkName: "about" */ '../views/Arkan.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
