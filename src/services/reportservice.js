import axios from 'axios'
import authHeader from './authheader'
import ApiService from './apiService'
// import moment from 'moment'

const API_URL = ApiService.local('hr')
// const API_URL = 'http://10.10.20.8:2189/api/hr/v1'
// const API_URL = 'http://localhost:2189/api/hr/v1'
// const user = JSON.parse(localStorage.getItem('user'))

class ReportService {
  reportDailyAttendance (pParam) {
    if (pParam.company_id === '') {
      pParam.company_id = null
    }
    if (pParam.department_id === '') {
      pParam.department_id = null
    }

    return axios
      .post(API_URL + '/report/attendance/daily_attendance', pParam, {
        headers: authHeader(),
      })
      .then(response => {
        return response.data.data
      })
  }

  reportRecapitulationAttendance (pParam) {
    if (pParam.company_id === '') {
      pParam.company_id = null
    }

    return axios
      .post(API_URL + '/report/attendance/generateToExcel', pParam, {
        headers: authHeader(),
      })
      .then(response => {
        return response.data
      })
  }

  reportSummaryAttendance (pParam) {
    // var xYesterday = moment().subtract(1, 'days').format('YYYY-MM-DD').toString()
    // console.log(user.sanqua_company_id)
    var xCompanyId = pParam.company_id // user.sanqua_company_id
    var xDate = '2020-08-28'

    pParam = {
      company_id: xCompanyId,
      date: xDate,
    }

    return axios
      .post(API_URL + '/report/attendance/summary', pParam, {
        headers: authHeader(),
      })
      .then(response => {
        return response.data.data
      })
  }

  reportAccessDoor (pParam) {
    var xStrQuery = `?start_date=${pParam.start_date}&end_date=${pParam.end_date}&company_id=${pParam.company_id}&keyword=${pParam.keyword}`

    return axios
      .get(API_URL + '/access_door/log/list' + xStrQuery, {
        headers: authHeader(),
      })
      .then(response => {
        return response.data.data
      })
  }

  reportAttendanceDevice (pParam) {
    var xStrQuery = `?start_date=${pParam.start_date}&end_date=${pParam.end_date}&mask=${pParam.mask}&keyword=${pParam.keyword}&company_id=${pParam.company_id.id}&temperature_type=${pParam.temperature_type.id}`

    return axios
      .get(API_URL + '/attendance_device/log/list' + xStrQuery, {
        headers: authHeader(),
      })
      .then(response => {
        return response.data.data
      })
  }
}

export default new ReportService()
