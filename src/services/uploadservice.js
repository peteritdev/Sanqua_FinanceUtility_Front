import axios from 'axios'

const BASE_URL = 'http://localhost:6189/api/sanqua_fautility/v1'

const user = JSON.parse(localStorage.getItem('user'))

class UploadService {
    uploadVendorFromTemplate (pFile, onUploadProgress) {
        const xFormData = new FormData()
        xFormData.append('file', pFile)

        return axios
            .post(BASE_URL + '/master/vendor/upload', xFormData, {
                headers: { 'x-token': user.token, 'x-method': 'conventional', 'Content-Type': 'multipart/form-data' },
                onUploadProgress,
            })
    }

    uploadInvoiceFromTemplate (pFile, onUploadProgress) {
        const xFormData = new FormData()
        xFormData.append('file', pFile)

        return axios
            .post(BASE_URL + '/invoice/upload', xFormData, {
                headers: { 'x-token': user.token, 'x-method': 'conventional', 'Content-Type': 'multipart/form-data' },
                onUploadProgress,
            })
    }
}

export default new UploadService()