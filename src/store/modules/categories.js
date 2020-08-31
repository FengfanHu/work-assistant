import db from '@/utils/db'

export default {
  namespaced: true,
  state: {
    categories: db.read().get('categories').value()
  },
  mutations: {
    refreshCategories (state) {
      state.categories = db.read().get('categories').value()
    }
  }
}
