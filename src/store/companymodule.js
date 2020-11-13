import CompanyService from '../services/companyservice'

export const company = {
    namespaced: true,
    state: {
        companies: [],
        response: [],
    },

    actions: {

        getCompanyDropDown ({ commit }, pParam) {
            return CompanyService.getCompanyDropDownList(pParam).then(
                _response => {
                    commit('getCompanyDropDown', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

    },

    getters: {
        getCompany: state => {
            return state.companies
        },
    },

    mutations: {
        getCompanyDropDown (state, data) {
            state.companies = data
        },
    },
}
