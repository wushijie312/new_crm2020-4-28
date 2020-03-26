import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import menu from './modules/menu'
import param from './modules/param'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    menu,
    param
  },
  getters
})

export default store
