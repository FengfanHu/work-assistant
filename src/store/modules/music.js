export default {
  namespaced: true,
  state: {
    item: '',
    currentSongId: 0,
    currentSongUrl: '',
    currentSongCover: '',
    playList: [],
    listDetail: []
  },
  mutations: {
    setItem (state, item) {
      state.item = item
    },
    setCurrentSongId (state, id) {
      state.currentSongId = id
    },
    setCurrentSongUrl (state, url) {
      state.currentSongUrl = url
    },
    setCurrentSongCover (state, url) {
      state.currentSongCover = url
    },
    // 加载播放列表
    setPlayList (state, list) {
      state.playList = list
    },
    setListDetail (state, list) {
      state.listDetail = list
    }
  }
}
