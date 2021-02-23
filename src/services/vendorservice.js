import axios from 'axios'
import authHeader from './authheader'
import ApiService from './apiService'

const API_URL = ApiService.local('fautility')
// const API_URL = 'http://localhost:6189/api/sanqua_fautility/v1'

class VendorService {
    getVendorList (pParam) {
        var xStrQuery = `?keyword=${pParam.keyword}&offset=${pParam.offset}&limit=${pParam.limit}&order_by=${pParam.order_by}&order_type=${pParam.order_type}`
        return axios
            .get(API_URL + '/master/vendor/list' + xStrQuery, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data
            })
    }

    getVendorDropDownList (pParam) {
        var xQueryStr = `?keyword=${pParam.keyword}&offset=0&limit=100&order_type=&order_by=`
        return axios
            .get(API_URL + '/master/vendor/list_dropdown' + xQueryStr, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data.data
            })
    }

    saveVendor (pParam) {
        console.log(pParam)
        return axios
            .post(API_URL + '/master/vendor/single_save', pParam, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data
            })
    }

    deleteVendor (pParam) {
        return axios
            .post(API_URL + '/master/vendor/delete', pParam, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data
            })
    }

    batchSaveVendor (pParam) {
        return axios
            .post(API_URL + '/master/vendor/save', pParam, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data
            })
    }
}

export default new VendorService()
