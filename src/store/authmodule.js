import AuthService from '../services/authservice'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const auth = {
  namespaced: true,
  state: initialState,

  actions: {
    login ({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          if (user.status_code === '-99') {
            commit('loginFailure')
            return Promise.reject(user.status_msg)
          } else {
            commit('loginSuccess', user)
            return Promise.resolve(user)
          }
        },
        error => {
          commit('loginFailure')
          return Promise.reject(error)
        },
      )
    },

    verifyToken ({ commit }) {
      return AuthService.verifyToken(user.token).then(
        response => {
          console.log(user.token)
          if (response.status_code === '-99') {
            commit('loginFailure')
            return Promise.reject(response.status_msg)
          }
        },
        error => {
          commit('loginFailure')
          return Promise.reject(error)
        },
      )
    },

    logout ({ commit }) {
      AuthService.logout()
      commit('logout')
    },
  },

  mutations: {
    loginSuccess (state, user) {
      state.status.loggedIn = true
      state.user = user
    },
    loginFailure (state) {
      state.status.loggedIn = false
      state.user = null
    },
    logout (state) {
      state.status.loggedIn = false
      state.user = null
    },
  },
}
