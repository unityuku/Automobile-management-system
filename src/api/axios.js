import axios from 'axios'
import { message } from 'antd'

axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://localhost:7001' : 'http://localhost:7001'
axios.defaults.withCredentials = false
axios.defaults.headers['X-Request-Width'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        message.error('服务端异常')
        return Promise.reject(res)
    }
    if (res.data.status !== 200) {
        if (res.data.message) message.error(res.data.message)
        return Promise.reject(res.data)
    }
    return res.data
})

export default axios