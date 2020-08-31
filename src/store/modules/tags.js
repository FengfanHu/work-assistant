import db from '@/utils/db'

export default {
  namespaced: true,
  state: {
    tags: db.read().get('tags').value()
  },
  mutations: {
    refreshTags (state) {
      state.tags = db.read().get('tags').value()
    }
  },
  actions: {},
  getters: {}
}
