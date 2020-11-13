import VendorService from '../services/vendorservice'

export const vendor = {
    namespaced: true,
    state: {
        vendors: [],
        response: [],
    },

    actions: {
        getVendorList ({ commit }, pParam) {
            return VendorService.getVendorList(pParam).then(
                _response => {
                    commit('getVendorList', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

        getVendorDropDown ({ commit }, pParam) {
            return VendorService.getVendorDropDownList(pParam).then(
                _response => {
                    commit('getVendorList', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

        saveVendor ({ commit }, pParam) {
            return VendorService.saveVendor(pParam).then(
                _response => {
                    commit('saveVendor', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

        deleteVendor ({ commit }, pParam) {
            return VendorService.deleteVendor(pParam).then(
                _response => {
                    commit('deleteVendor', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

        batchSaveVendor ({ commit }, pParam) {
            return VendorService.batchSaveVendor(pParam).then(
                _response => {
                    commit('batchSaveVendor', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

    },

    mutations: {
        getVendorList (state, data) {
            state.vendors = data
        },

        saveVendor (state, data) {
            state.response = data
        },

        deleteVendor (state, data) {
            state.response = data
        },

        batchSaveVendor (state, data) {
            state.response = data
        },
    },
}
