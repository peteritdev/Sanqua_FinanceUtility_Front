import axios from 'axios'
import authHeader from './authheader'
import ApiService from './apiService'

const API_URL = ApiService.private('fautility')
// const API_URL = 'http://localhost:6189/api/sanqua_fautility/v1'

class CompanyService {
    getCompanyDropDownList (pParam) {
        var xQueryStr = `?keyword=${pParam.keyword}`
        return axios
            .get(API_URL + '/master/company/list_dropdown' + xQueryStr, {
                headers: authHeader(),
            })
            .then(response => {
                return response.data.data
            })
    }
}

export default new CompanyService()
