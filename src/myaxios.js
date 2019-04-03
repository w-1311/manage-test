// 导入axios
import axios from 'axios'
// 暴露出去 实现一个install方法
export default {
  install(Vue) {
    // 把axios的代码 迁移过来即可
    // console.log('myaxios的install方法被执行啦')
    // console.log(Vue)
    // 设置基地址
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
    // 设置axios拦截器
    // 请求拦截器 请求之前统一设置一些内容 比如 token
    axios.interceptors.request.use(
      function(config) {
        // Do something before request is sent
        // 统一设置token
        config.headers.Authorization = window.sessionStorage.getItem('token')
        return config
      },
      function(error) {
        // Do something with request error
        return Promise.reject(error)
      }
    )

    // 响应拦截器 统一处理响应
    axios.interceptors.response.use(
      function(response) {
        // Do something with response data
        console.log('响应拦截')
        console.log(response)
        // 统一进行弹框
        if ([200, 201, 204].indexOf(response.data.meta.status) != -1) {
          Vue.prototype.$message.success(response.data.meta.msg)
        } else {
          Vue.prototype.$message.warning(response.data.meta.msg)
        }
        return response
      },
      function(error) {
        // Do something with response error
        return Promise.reject(error)
      }
    )
    // 设置到原型上
    Vue.prototype.$axios = axios
  }
}
