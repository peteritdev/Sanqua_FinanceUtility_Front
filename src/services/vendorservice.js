import axios from 'axios'
import authHeader from './authheader'

const API_URL = 'http://localhost:6189/api/sanqua_fautility/v1'

class VendorService {
    getVendorList (pParam) {
        var xQueryStr = `?keyword=${pParam.keyword}`
        return axios
            .get(API_URL + '/master/vendor/list' + xQueryStr, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data.data
            })
    }

    getVendorDropDownList (pParam) {
        var xQueryStr = `?keyword=${pParam.keyword}`
        return axios
            .get(API_URL + '/master/vendor/list_dropdown' + xQueryStr, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data.data
            })
    }

    saveVendor (pParam) {
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
