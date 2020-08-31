export default {
  namespaced: true,
  state: {
    snackbar: false,
    snackbarType: 'success',
    snackbarMessage: ''
  },
  mutations: {
    // 发送消息
    Notification (state, info) {
      state.snackbarType = info.type
      state.snackbarMessage = info.message
      state.snackbar = true
    },
    // 初始化消息（主要是snackbar需要调整为false）
    refreshNoti (state) {
      state.snackbarType = 'success'
      state.snackbarMessage = ''
      state.snackbar = false
    }
  },
  actions: {},
  getters: {}
}
