import axios from 'axios'
import ApiService from './apiService'
// import authHeader from './authheader'

const API_URL = ApiService.private('fautility') + '/download'
// const API_URL = 'http://localhost:6189/api/sanqua_fautility/v1/download'

class DownloadService {
    getTemplate (pParam) {
        var xQueryStr = `/template/${pParam.module}`
        /* alert(API_URL + xQueryStr)
        return axios
            .get(API_URL + xQueryStr, {
                headers: authHeader(),
            })
            .then(response => {
                return response
            }) */

        axios({
            url: API_URL + xQueryStr,
            method: 'GET',
            responseType: 'blob',
        })
        .then((response) => {
            return response
        })
    }
}

export default new DownloadService()
