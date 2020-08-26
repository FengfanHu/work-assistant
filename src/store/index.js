import Vue from 'vue';
import Vuex from 'vuex';
import tags from './modules/tags';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 消息提示
    snackbar: false,
    snackbarType: 'success',
    snackbarMessage: '',
    // 音乐
    currentSongId: 0,
    currentSongUrl: '',
    playList: [],
  },
  mutations: {
    // 发送消息
    Notification(state, info) {
      state.snackbarType = info.type;
      state.snackbarMessage = info.message;
      state.snackbar = true;
    },
    // 初始化消息（主要是snackbar需要调整为false）
    refreshNoti(state) {
      state.snackbarType = 'success';
      state.snackbarMessage = '';
      state.snackbar = false;
    },
    setCurrentSongId(state, id) {
      state.currentSongId = id;
    },
    setCurrentSongUrl(state, url) {
      state.currentSongUrl = url;
    },
    // 加载播放列表
    setPlayList(state, list) {
      state.playList = list;
    },
  },
  actions: {
  },
  modules: {
    tags,
  },
});
