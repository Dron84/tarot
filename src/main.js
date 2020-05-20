import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'

const exp = new RegExp('localhost', 'i')
const exp1 = new RegExp('0.0.0.0')
const exp2 = new RegExp('127.0.0.1')
const exp3 = new RegExp('taroportret.ru')

if (!exp.test(location.host) && !exp1.test(location.host) && !exp2.test(location.host) && exp3.test(location.host)) {
    Vue.config.productionTip = false

    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
} else {
    alert(`Вы пытаетесь украсть программное обеспечение которое охраняется авторским правом! Ваш IP Отправлен нам в виде доказательства вшашей вины! Так что немедленно прекратите или Мы обратимся в полицию! Также мы сняли образ Вашего браузера`)
    const head = document.querySelector('head')
    const body = document.querySelector('body')
    head.innerHTML = ''
    body.innerHTML = ''
}
