import axios from 'axios'
import authHeader from './authheader'
import ApiService from './apiService'

const API_URL = ApiService.nootebook('fautility')
// const API_URL = 'http://localhost:6189/api/sanqua_fautility/v1'

class CurrencyService {
    getCurrencyList (pParam) {
        console.log(pParam)
        var xStrQuery = `?keyword=${pParam.keyword}&offset=${pParam.offset}&limit=${pParam.limit}`
        return axios
            .get(API_URL + '/master/currency/list' + xStrQuery, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data
            })
    }

    getCurrencyDropDownList (pParam) {
        var xQueryStr = `?keyword=${pParam.keyword}&offset=0&limit=100&order_type=&order_by=`
        return axios
            .get(API_URL + '/master/currency/list_dropdown' + xQueryStr, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data.data
            })
    }

    saveCurrency (pParam) {
        console.log(pParam)
        return axios
            .post(API_URL + '/master/currency/save', pParam, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data
            })
    }

    deleteCurrency (pParam) {
        return axios
            .delete(API_URL + '/master/currency/delete/' + pParam.id, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data
            })
    }
}

export default new CurrencyService()
