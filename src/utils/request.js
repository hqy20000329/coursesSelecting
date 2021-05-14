/* eslint-disable */
import axios from 'axios'
import store from '../store/index.js'
import qs from 'qs'
// axios.defaults.baseURL= '/api'
axios.defaults.baseURL= 'http://localhost:8080'

//创建 axios 实例
const service = axios.create({
  // baseURL: '/api',  //api的base_url
  timeout: 10000 //请求超时时间
})


// response拦截器
service.interceptors.response.use(response => {
  console.log('响应的数据为',response)
  switch (response.data.code) {
    case 200:
      return response;
    case 400:
      response.message = '请求失败'
      break;
    case 401:
      response.message = '用户名或密码错误'
      break;
    default:
      response.message = `发生错误${response.data.code}`
  }
  return Promise.reject(response);

}, error => {
  // endLoading()
  console.log(error)

})

//request拦截器
service.interceptors.request.use(config => {
  // 从vuex中取出token
  console.log('请求信息为',config)
  const token = store.getters.token
  // 如果有token则 添加到headers中
  if (token) {
    config.headers['X-Token'] = token
  }
  config.data=qs.stringify(config.data, {indices: false});
  console.log('发送的数据为',config.data)
  return config
}, error => {
  return Promise.reject(error)
})

export default service