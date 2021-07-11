import axios from 'axios'
import authHeader from './authheader'
import ApiService from './apiService'

const API_URL = ApiService.local('fautility')
// const API_URL = 'http://localhost:6189/api/sanqua_fautility/v1'

class PayReqService {
    // Header
    savePayReqHeaderSave (pParam) {
        console.log(pParam)
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
        // console.log(xStrQuery)
        return axios
            .get(API_URL + '/payreqheader/list' + xStrQuery, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data
            })
    }

    // Detail
    savePayReqDetail (pParam) {
        return axios
            .post(API_URL + '/payreqdetail/save', pParam, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data
            })
    }

    getPayReqDetail (pParam) {
        var xStrQuery = `?header_id=${pParam.header_id}&keyword=${pParam.keyword}&offset=${pParam.offset}&limit=${pParam.limit}&order_by=${pParam.order_by}&order_type=${pParam.order_type}`
        return axios
            .get(API_URL + '/payreqdetail/list' + xStrQuery, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data
            })
    }

    deletePayReqDetail (pParam) {
        return axios
            .delete(API_URL + '/payreqdetail/delete/' + pParam.id, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data
            })
    }

    // exportToPDF (pParam) {
    //     console.log('ID : ' + pParam.id)
    //     return axios
    //         .get(API_URL + '/payreq/exportToPDF/' + pParam.id, {
    //             headers: authHeader(),
    //         })
    //         .then(response => {
    //             return response.data
    //         })
    // }
    exportToPDF (pParam) {
        console.log('ID : ' + pParam.id)
        return axios({
            url: API_URL + '/payreq/exportToPDF/' + pParam.id,
            method: 'GET',
            headers: authHeader(),
            responseType: 'blob',
          })
            .then(response => {
                console.log(response)
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', 'payreq-' + pParam.no + '.pdf')
                document.body.appendChild(link)
                link.click()
                return response.data
            })
    }

    updateStatusTreasury (pParam) {
        console.log(pParam)
        return axios
            .post(API_URL + '/payreqheader/process_to_treasury', pParam, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data
            })
    }
}

export default new PayReqService()
