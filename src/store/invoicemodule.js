import InvoiceService from '../services/invoiceservice'

export const invoice = {
    namespaced: true,
    state: {
        invoices: [],
        response: [],
    },

    actions: {
        batchSaveInvoice ({ commit }, pParam) {
            return InvoiceService.batchSaveInvoice(pParam).then(
                _response => {
                    commit('batchSaveInvoice', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

        getInvoiceList ({ commit }, pParam) {
            return InvoiceService.getInvoiceList(pParam).then(
                _response => {
                    commit('getInvoiceList', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

        deleteInvoice ({ commit }, pParam) {
            return InvoiceService.deleteInvoice(pParam).then(
                _response => {
                    commit('deleteInvoice', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

        saveInvoice ({ commit }, pParam) {
            return InvoiceService.saveInvoice(pParam)
            .then(
                _response => {
                    commit('saveInvoice', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },
    },

    mutations: {
        batchSaveInvoice (state, data) {
            state.response = data
        },
        deleteInvoice (state, data) {
            state.response = data
        },
        getInvoiceList (state, data) {
            state.response = data
        },
        saveInvoice (state, data) {
            state.response = data
        },
    },
}
