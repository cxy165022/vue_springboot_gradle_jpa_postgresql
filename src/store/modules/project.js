/**
 * Created by GCH on 2018/9/13.
 */
import {getMyProjectList} from '@/services/manage/projects'

const state = {
  project: JSON.parse(sessionStorage.getItem('project')) || [], // 项目集合
  projectActive: JSON.parse(sessionStorage.getItem('projectActive')) || {} // 激活主菜单
}

const getters = {
  getProject: state => state.project,
  getProjectActive: state => state.projectActive
}

const mutations = {
  // 获取菜单
  PROJECT: (state, data) => {
    state.project = data // 获取菜单
    sessionStorage.setItem('project', JSON.stringify(data))
  },
  // 选择项目
  PROJECT_SELECT: (state, data) => {
    state.projectActive = data // 选择项目
    sessionStorage.setItem('projectActive', JSON.stringify(data))
  }
}

const actions = {
  // 获取菜单
  handleProject: ({commit}) => {
    setTimeout(() => {
      getMyProjectList().then(res => {
        if (res.data && res.data.length > 0) {
          commit('PROJECT', res.data)
          commit('PROJECT_SELECT', res.data[0])
        }
      })
    }, 800)
  }
}

export default {state, getters, mutations, actions}
