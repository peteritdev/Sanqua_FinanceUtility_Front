import CurrencyService from '../services/currencyservice'

export const currency = {
    namespaced: true,
    state: {
        currencies: [],
        response: [],
        act: 'add',
        detail: {},
    },

    actions: {
        getCurrencyList ({ commit }, pParam) {
            return CurrencyService.getCurrencyList(pParam).then(
                _response => {
                    commit('getCurrencyList', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

        getCurrencyDropDown ({ commit }, pParam) {
            return CurrencyService.getCurrencyDropDownList(pParam).then(
                _response => {
                    commit('getCurrenciesDropDown', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

        saveCurrency ({ commit }, pParam) {
            return CurrencyService.saveCurrency(pParam)
            .then(
                _response => {
                    commit('saveCurrency', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

        deleteCurrency ({ commit }, pParam) {
            return CurrencyService.deleteCurrency(pParam).then(
                _response => {
                    commit('deleteCurrency', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

    },

    mutations: {
        getCurrencyList (state, data) {
            state.currencies = data
        },

        getCurrenciesDropDown (state, data) {
            state.currencies = data
        },

        saveCurrency (state, data) {
            state.response = data
        },

        deleteCurrency (state, data) {
            state.response = data
        },

        actFormCurrency (state, data) {
            state.act = data
        },

        detailCurrency (state, data) {
            state.detail = data
        },
    },
}
