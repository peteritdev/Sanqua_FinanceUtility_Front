import DownloadService from '../services/downloadservice'

export const download = {
    namespaced: true,
    state: {
        response: [],
    },

    actions: {
        getTemplate ({ commit }, pParam) {
            return DownloadService.getTemplate(pParam).then(
                _response => {
                    commit('getTemplate', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    console.log('>>> Response Error')
                    return Promise.reject(_error)
                },
            )
        },
    },

    mutations: {
        getTemplate (state, data) {
            state.response = data
        },
    },
}
