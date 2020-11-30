import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage.js'
Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 用户登录状态信息
    user: getItem(TOKEN_KEY)
    // user:null
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止刷新丢失 需要把数据备份到本地存储
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
