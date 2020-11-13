import axios from 'axios'

// const API_URL = 'http://10.10.20.8:1189/api/oauth/v1'
const API_URL = 'http://localhost:1189/api/oauth/v1'

class AuthService {
  login (user) {
    return axios
      .post(API_URL + '/user/login', {
        email: user.email,
        password: user.password,
      })
      .then(response => {
        if (response.data.status_code) {
          console.log(JSON.stringify(response.data))
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
      })
  }

  verifyToken (pToken) {
    return axios
      .get(
        API_URL + '/user/verify_token?token=' + pToken + '&method=conventional',
      )
      .then(response => {
        return response.data
      })
  }

  logout () {
    localStorage.removeItem('user')
  }
}

export default new AuthService()
