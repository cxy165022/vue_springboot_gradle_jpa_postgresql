import qs from 'qs'
import {Modal} from 'iview'
import {
  logout
} from '@/services/app'

const state = {
  loading: false, // 加载状态
  resError: '', // 错误数据
  showlist: false // 地图模式
}

const getters = {
  getLoading: state => state.loading,
  getResError: state => state.resError,
  getShowlist: state => state.showlist
}

const mutations = {
  // 更新加载状态
  LOADING: (state, data) => {
    state.loading = data
  },
  // 更新地图模式
  SETSHOWLIST: (state, data) => {
    state.showlist = data
  },
  // 更新错误数据
  RES_ERROR: (state, data) => {
    state.resError = data
      ? {
        status: data.status,
        statusText: data.statusText,
        statusCode: `${data.status} ${data.statusText}`,
        error: {
          'Response Data': data.data,
          'Request URL': data.config.url,
          'Request Method': data.config.method.toUpperCase(),
          'Form Data': qs.parse(data.config.data)
        }
      }
      : ''
  }
}
const actions = {
  // 退出系统
  logOut: ({commit}) => {
    Modal.confirm({
     title: '提示',
     content: '确认退出系统?',
     okText: '确定',
     cancelText: '取消',
     onOk: () => {
       setTimeout(() => {
         logout().then(res => {
           commit('MENU_RESET') // 重置菜单
         }).catch(() => {
         })
       }, 500)
     }
   })
  }
}

export default {state, getters, mutations, actions}
