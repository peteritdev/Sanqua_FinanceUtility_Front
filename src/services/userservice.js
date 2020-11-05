import axios from 'axios'
import authHeader from './authheader'
// import moment from 'moment'

// Prod
// const API_URL = 'http://10.10.20.8:1189/api/oauth/v1'

// Localhost
const API_URL = 'http://localhost:1189/api/oauth/v1'

class UserService {
    userList (pParam) {
        var xStrQuery = `?keyword=${pParam.keyword}&company_id=${pParam.company_id}`

        return axios
            .get(API_URL + '/user/list' + xStrQuery,
                    {
                        headers: authHeader(),
                    })
            .then(response => {
                return response.data.data
            })
    }

    saveUser (pParam) {
        var apiPath = ''
        if (pParam.act === 'add') {
            apiPath = '/user/register'
        } else {
            apiPath = '/user/save'
        }

        return axios
            .post(API_URL + apiPath,
                    pParam,
                    {
                        headers: authHeader(),
                    })
            .then(response => {
                return response.data
            })
    }

    deleteUser (pParam) {
        return axios
            .post(API_URL + '/user/delete',
                    pParam,
                    {
                        headers: authHeader(),
                    })
            .then(response => {
                return response.data
            })
    }
}

export default new UserService()
