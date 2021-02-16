import PayReqService from '../services/payreqservice'

export const payreq = {
    namespaced: true,
    state: {
        response: [],
    },

    actions: {
        savePayReqHeader ({ commit }, pParam) {
            return PayReqService.savePayReqHeaderSave(pParam).then(
                _response => {
                    commit('savePayReqHeader', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

        getPayReqHeaderById ({ commit }, pParam) {
            return PayReqService.getPayReqHeaderById(pParam).then(
                _response => {
                    commit('getPayReqHeaderById', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

        getPayReqHeader ({ commit }, pParam) {
            return PayReqService.getPayReqHeader(pParam).then(
                _response => {
                    commit('getPayReqHeader', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

        getPayReqDetail ({ commit }, pParam) {
            return PayReqService.getPayReqDetail(pParam).then(
                _response => {
                    commit('getPayReqDetail', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

        savePayReqDetail ({ commit }, pParam) {
            return PayReqService.savePayReqDetail(pParam).then(
                _response => {
                    commit('savePayReqDetail', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

        deletePayReqDetail ({ commit }, pParam) {
            return PayReqService.deletePayReqDetail(pParam).then(
                _response => {
                    commit('deletePayReqDetail', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

        exportToPDF ({ commit }, pParam) {
            return PayReqService.exportToPDF(pParam).then(
                _response => {
                    commit('exportToPDF', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },
    },

    mutations: {
        savePayReqHeader (state, data) {
            state.response = data
        },
        getPayReqHeaderById (state, data) {
            state.response = data
        },
        getPayReqHeader (state, data) {
            state.response = data
        },

        savePayReqDetail (state, data) {
            state.response = data
        },
        getPayReqDetail (state, data) {
            state.response = data
        },
        deletePayReqDetail (state, data) {
            state.response = data
        },
        exportToPDF (state, data) {
            state.response = data
        },
    },
}
