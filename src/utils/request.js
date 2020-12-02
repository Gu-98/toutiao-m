/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store/index'
import jsonBig from 'json-bigint'
//JSONBig 可以处理数据中超出JavaScript安全整数范围的问题
//1.JSONBig.parse() 把JSON格式的字符串转为JavaScript对象
//1.1使用时 需要把BigNumber类型的数据转为字符串来使用 .toString()
//JSONBig.stringify()把JavaScript对象转为JSON格式的字符串

const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
  baseURL: 'http://toutiao-app.itheima.net/',
  // transformResponse 允许自定义原始的响应数据（字符串）
  //data 后端返回的原始数据  就是JSON格式字符串
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]

})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // config ：本次请求的配置对象
  // config 里面有一个属性：headers
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
export default request
