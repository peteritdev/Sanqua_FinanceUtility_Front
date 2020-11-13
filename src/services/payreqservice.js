import axios from 'axios'
import authHeader from './authheader'

const API_URL = 'http://localhost:6189/api/sanqua_fautility/v1'

class PayReqService {
    // Header

    getPayReqHeaderList (pParam) {

    }

    savePayReqHeaderSave (pParam) {
        return axios
            .post(API_URL + '/payreqheader/save', pParam, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data
            })
    }

    getPayReqHeaderById (pParam) {
        return axios
            .get(API_URL + '/payreqheader/id/' + pParam.id, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data
            })
    }

    getPayReqHeader (pParam) {
        var xStrQuery = `?keyword=${pParam.keyword}&offset=${pParam.offset}&limit=${pParam.limit}&order_by=${pParam.order_by}&order_type=${pParam.order_type}`
        console.log(xStrQuery)
        return axios
            .get(API_URL + '/payreqheader/list' + xStrQuery, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data
            })
    }
}

export default new PayReqService()
