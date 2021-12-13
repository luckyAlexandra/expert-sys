import axios from 'axios'
// const { Message } = ElementPlus
import store from '@/store'
// import settings from '@/settings'
// import { getToken } from '@/utils/auth'

// create an axios instance

console.warn('process.env', process.env)

const service = axios.create({ // settings.baseApi, // process.env.VUE_APP_BASE_API
  baseURL: process.env.NODE_ENV === 'development' ? '/dev' : process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  // headers: { 'x-cronman-auth-type': 'local', 'content-type': 'application/json', 'Access-Control-Allow-Origin': 'http://192.168.50.112:8080' },
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['authorization'] = store.getters.token
      config.headers['X-Requested-With'] = 'XMLHttpRequest'
    }
    return config
  },
  error => {
    // do something with request error
    console.log('onRejected', error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    console.warn('response', response)
    const method = response.config.method
    const res = response.data
    // console.warn('d_data', d_data)
    // console.warn('res', res)
    // if the custom code is not 20000, it is judged as an error.
    //   || (res.data && res.data.code !== undefined && res.data.code !== 1)
    const d_data = res.data || {}
    if (res.code !== 1 || (method !== 'get' && d_data.subCode && d_data.subCode !== 'OK') || (method !== 'get' && d_data.code && d_data.subCode && d_data.code !== '10000')) {
      const err_msg = res.message || res.mesaage || res.msg || d_data.subMsg || d_data.msg || '系统错误1'
      Message({
        message: err_msg,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error(err_msg))
    } else {
      return res
    }
  },
  error => {
    console.log('err', error.response) // for debug
    const repose = error.response
    let err_msg = repose.data.message || repose.data.mesaage || repose.data.subMsg || '系统错误2'
    if (repose.status === 422 && err_msg === '系统错误2') {
      err_msg = ''
      Object.keys(repose.data).forEach(i => {
        err_msg += repose.data[i] + '<br>'
      })
    }
    Message({
      message: err_msg,
      dangerouslyUseHTMLString: true,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
