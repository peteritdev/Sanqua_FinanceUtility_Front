import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './authmodule'
import { report } from './reportmodule'
import { user } from './usermodule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth, report, user,
  },
  getters: {
    getLoggedUserInfo () {
      return JSON.parse(localStorage.getItem('user'))
    },
  },
  // From store.js
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
  },
  actions: {

  },
})
