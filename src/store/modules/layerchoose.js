import qs from 'qs'
import {Modal} from 'iview'

const state = {
  layerchoose: ""
}

const getters = {
  getLayerchoose: state => state.layerchoose
}

const mutations = {
  // 更新加载状态
  setchoose: (state, data) => {
    state.layerchoose = data
  }
}

export default {state, getters, mutations}
