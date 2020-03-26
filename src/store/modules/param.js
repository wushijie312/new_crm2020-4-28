/* eslint-disable indent */


const state = {
  is_hide:false
}

const mutations = {
  CHANGE_OVERFLOW_HIDE: (state, val) => {
    state.is_hide = val;
    console.log(state,val);
  }
}

const actions = {
  
}

export default {
  state,
  mutations,
  actions
}
