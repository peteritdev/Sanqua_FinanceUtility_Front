import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './authmodule'
import { vendor } from './vendormodule'
import { invoice } from './invoicemodule'
import { user } from './usermodule'
import { download } from './downloadmodule'
import { payreq } from './payreqmodule'
import { company } from './companymodule'
import { report } from './reportmodule'
import { currency } from './currencymodule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth, vendor, user, download, invoice, payreq, company, report, currency,
  },
  getters: {
    getLoggedUserInfo () {
      return JSON.parse(localStorage.getItem('user'))
    },
    getInfo () {
      return company.getters.getCompany()
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
