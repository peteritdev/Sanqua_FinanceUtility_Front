import ReportService from '../services/reportservice'

export const report = {
    namespaced: true,
    state: {
        dailyAttendances: [],
        summaryAttendances: [],
        accessDoorLog: [],
        attendanceDeviceLog: [],
        recapitulationAttendances: [],
    },

    actions: {
        getDailyAttendance ({ commit }, pParam) {
            return ReportService.reportDailyAttendance(pParam).then(
                _response => {
                    commit('getDailyAttendance', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    commit('getDailyAttendance_Failed')
                    return Promise.reject(_error)
                },
            )
        },

        getRecapitulationAttendance ({ commit }, pParam) {
            return ReportService.reportRecapitulationAttendance(pParam).then(
                _response => {
                    commit('getRecapitulationAttendance', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

        getSummaryAttendance ({ commit }, pParam) {
            return ReportService.reportSummaryAttendance(pParam).then(
                _response => {
                    commit('getSummaryAttendance', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

        getAccessDoorLog ({ commit }, pParam) {
            return ReportService.reportAccessDoor(pParam).then(
                _response => {
                    commit('getAccessDoorLog', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },

        getAttendanceDeviceLog ({ commit }, pParam) {
            return ReportService.reportAttendanceDevice(pParam).then(
                _response => {
                    commit('getAttendanceDeviceLog', _response)
                    return Promise.resolve(_response)
                },
                _error => {
                    return Promise.reject(_error)
                },
            )
        },
    },

    mutations: {
        getDailyAttendance (state, data) {
            state.dailyAttendances = data
        },
        getSummaryAttendance (state, data) {
            state.summaryAttendances = data
        },
        getAccessDoorLog (state, data) {
            state.accessDoorLog = data
        },
        getAttendanceDeviceLog (state, data) {
            state.attendanceDeviceLog = data
        },
        getDailyAttendance_Failed (state) {
        },
        getRecapitulationAttendance (state, data) {
            state.recapitulationAttendances = data
        },
    },
}
