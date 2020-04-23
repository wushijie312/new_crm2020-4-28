/* eslint-disable indent */


const state = {
  is_hide:false,
  is_ok:false,//弹出提示框
  is_pfbz:false
}

const mutations = {
  CHANGE_OVERFLOW_HIDE: (state, val) => {
    state.is_hide = val;
  },
  TIP_SURE:(state,val)=>{
    state.is_ok=val;
  },
  PFBZ_SURE:(state,val)=>{
    state.is_pfbz=val;
  }
  
}

const actions = {
  
}

export default {
  state,
  mutations,
  actions
}
