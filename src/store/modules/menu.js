/* eslint-disable indent */

import { pathshow } from '@/api/config'

const state = {
  menus: []
}

const mutations = {
  SET_MENUS: (state, menus) => {
    state.menus = menus
  }
}

const actions = {
  menus ({ commit }) {
    return new Promise((resolve, reject) => {
        pathshow().then(res => {
        const list = res.data
        var menus = []
        console.log(list)
        commit('SET_MENUS', list)
        console.log(list)
        resolve(menus)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
