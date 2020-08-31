import Vue from 'vue'
import Vuex from 'vuex'
import tags from './modules/tags'
import message from './modules/message'
import music from './modules/music'
import categories from '@/store/modules/categories'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    tags,
    categories,
    message,
    music
  }
})
