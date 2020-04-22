import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      tarot: [
          {img: 'img/1.jpg', rim: 'I'},
          {img: 'img/2.jpg', rim: 'II'},
          {img: 'img/3.jpg', rim: 'III'},
          {img: 'img/4.jpg', rim: 'IV'},
          {img: 'img/5.jpg', rim: 'V'},
          {img: 'img/6.jpg', rim: 'VI'},
          {img: 'img/7.jpg', rim: 'VII'},
          {img: 'img/8.jpg', rim: 'VIII'},
          {img: 'img/9.jpg', rim: 'IX'},
          {img: 'img/10.jpg', rim: 'X'},
          {img: 'img/11.jpg', rim: 'XI'},
          {img: 'img/12.jpg', rim: 'XII'},
          {img: 'img/13.jpg', rim: 'XIII'},
          {img: 'img/14.jpg', rim: 'XIV'},
          {img: 'img/15.jpg', rim: 'XV'},
          {img: 'img/16.jpg', rim: 'XVI'},
          {img: 'img/17.jpg', rim: 'XVII'},
          {img: 'img/18.jpg', rim: 'XVIII'},
          {img: 'img/19.jpg', rim: 'IX'},
          {img: 'img/20.jpg', rim: 'XX'},
          {img: 'img/21.jpg', rim: 'XXI'},
          {img: 'img/22.jpg', rim: 'XXII'}
      ]
  },
  getters:{
    tarot(state){ return state.tarot }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
