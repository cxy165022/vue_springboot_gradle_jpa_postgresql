/* eslint-disable no-unused-vars,camelcase */
import axios from 'axios'
import qs from 'qs'
import {Message} from 'iview'
import config from '@/config'
import store from '@/store'

// 创建 axios 实例
const {baseURL, timeout, headers} = config
let env = process.env.NODE_ENV
axios.defaults.withCredentials = true
const ax = axios.create({
  // 是否跨站点访问控制请求使用凭证(Cookie)
  withCredentials: true,
  baseURL: localStorage.getItem('newURL') || baseURL, // 配置接口地址
  // 修改请求的数据再发送到服务器
  transformRequest: [
     (data, headers) => qs.stringify(data) // 序列化请求的数据
  ],
  // 请求头信息
  headers: headers,
  timeout: timeout // 配置请求超时
})
// 配置默认请求头
// ax.defaults.headers.post['Content-Type'] = headers.ContentType
// 添加请求拦截器(发送前拦截)
ax.interceptors.request.use(function (config) {
  // eslint-disable-next-line camelcase
  let user_token = sessionStorage.getItem('auth_token')
  let projectId = ''
  let data = JSON.parse(sessionStorage.getItem('projectActive')) || {}
  if (data) {
    projectId = data.projectid
  }
  if (user_token) {
    let reqData = config.data
    if (!reqData) {
      reqData = {}
    }
    config.data = Object.assign(reqData, { 'user_token': user_token, 'currentProjectId': projectId })
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加 axios 实例响应拦截器
ax.interceptors.response.use(response => {
  const {code, msg} = response.data
  // 用户 TOKEN 失效
  if (code === 401) {
    Message.error(msg) // 提示错误信息
    store.commit('MENU_RESET') // 重置菜单
    return false
  }
  // 判断开发环境
  if (env === 'development' || env === 'test') {
    if (code === 0) {
      return response.data // 响应正确的数据
    }
    Message.error(msg) // 提示错误信息
    store.commit('RES_ERROR', response) // 响应错误数据
  } else if (code === 0) {
    return response.data // 响应正确的数据
  } else {
    Message.error(msg) // 提示错误信息
  }
}, error => {
  const {response, message, config} = error
  if (response) {
    if (env === 'development' || env === 'test') {
      store.commit('RES_ERROR', response) // 响应错误数据
    } else {
      Message.error({content: message})
    }
  // } else if (request) {
  //   console.log(request)
  } else {
    Message.error({content: message})
  }
  console.log(config)
})

/*
  // 配置默认参数
  const ConfigDefaults = AUTH_TOKEN => {
    // 配置用户 AUTH_TOKEN
    ax.defaults.headers.common['Authorization'] = AUTH_TOKEN
  }

  // 刷新重新配置默认参数
  const user = JSON.parse(sessionStorage.getItem('user'))
  if (user) {
    ConfigDefaults(user['auth_token'])
  }
 */

export default ax
