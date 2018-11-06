/* eslint-disable key-spacing,quotes */
// 系统参数配置
let url = {
  production: 'http://192.168.1.124:8085',
  release: 'http://localhost:8081',
  test: 'http://localhost:8081',
  development: 'http://localhost:8083'
}
let baseURL
let env = process.env.NODE_ENV
switch (env) {
  case 'production':
    baseURL = url[env]
    break
  case 'release':
    baseURL = url[env]
    break
  case 'test':
    baseURL = url[env]
    break
  default:
    baseURL = url[env]
}

export default {
  url: url, // 接口地址
  baseURL: baseURL, // 基础地址
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  // headers: {
  //   ContentType: 'application/x-www-form-urlencoded'
  // },
  timeout: 10000, // 请求超时
  version: '1.3.0' // 应用版本
}
