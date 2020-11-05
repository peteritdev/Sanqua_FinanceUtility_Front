import UserService from '../services/userservice'

export const user = {
    namespaced: true,
    state: {
        users: [],
        response: [],
    },

    actions: {
        getUserList ({ commit }, pParam) {
            return UserService.userList(pParam).then(
                _response => {
                    commit('getUserList', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

        saveUser ({ commit }, pParam) {
            return UserService.saveUser(pParam).then(
                _response => {
                    commit('saveUser', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

        deleteUser ({ commit }, pParam) {
            return UserService.deleteUser(pParam).then(
                _response => {
                    commit('deleteUser', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

    },

    mutations: {
        getUserList (state, data) {
            state.users = data
        },
        saveUser (state, data) {
            state.response = data
        },
        deleteUser (state, data) {
            state.response = data
        },
    },
}
