/**
 * @Description 音乐播放共用方法
 * @Author Frank
 * @Date 2020/8/27
 */
import { playSong } from '@/api/music'

const { ipcRenderer } = window.require('electron')

export default {
  methods: {
    playSong (id, coverUrl, name) {
      return playSong({ id })
        .then((response) => {
          const { url } = response.data.data[0]
          this.$store.commit('music/setCurrentSongId', id)
          if (!url) {
            const info = { type: 'danger', message: '该歌曲不能播放，已为您播放下一首' }
            this.$store.commit('message/Notification', info)
            this.next()
          } else {
            this.$store.commit('music/setCurrentSongUrl', url)
            this.$store.commit('music/setCurrentSongCover', coverUrl)
            ipcRenderer.send('music-title', name)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    next () {
      const currentId = this.$store.state.music.currentSongId
      const currentIndex = this.$store.state.music.playList.indexOf(currentId)
      const nextId = this.$store.state.music.playList[currentIndex + 1]
      if (nextId) {
        const { coverUrl, name } = this.$store.state.music.listDetail[currentIndex + 1]
        this.playSong(nextId, coverUrl, name)
        this.$store.commit('music/setItem', currentIndex + 1)
      } else {
        const info = { type: 'info', message: '播放列表中没歌了 :-(' }
        this.$store.commit('message/Notification', info)
      }
    }
  }
}
