import axios from 'axios'
import authHeader from './authheader'
import ApiService from './apiService'

const API_URL = ApiService.nootebook('fautility')
// const API_URL = 'http://localhost:6189/api/sanqua_fautility/v1'

class InvoiceService {
    batchSaveInvoice (pParam) {
        return axios
            .post(API_URL + '/invoice/save', pParam, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data
            })
    }

    getInvoiceList (pParam) {
        var xStrQuery = `?keyword=${pParam.keyword}&offset=${pParam.offset}&limit=${pParam.limit}&order_by=${pParam.order_by}&order_type=${pParam.order_type}`
        return axios
            .get(API_URL + '/invoice/list' + xStrQuery, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data
            })
    }

    deleteInvoice (pParam) {
        return axios
            .post(API_URL + '/invoice/delete', pParam, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data
            })
    }
}

export default new InvoiceService()
