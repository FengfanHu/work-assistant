/**
 * @Description 音乐播放共用方法
 * @Author Frank
 * @Date 2020/8/27
 */
import { playSong } from '@/api/music';

const { ipcRenderer } = window.require('electron');

export default {
  methods: {
    playSong(id, coverUrl, name) {
      return playSong({ id })
        .then((response) => {
          const { url } = response.data.data[0];
          this.$store.commit('setCurrentSongId', id);
          if (!url) {
            const info = { type: 'danger', message: '该歌曲不能播放，已为您播放下一首' };
            this.$store.commit('Notification', info);
            this.next();
          } else {
            this.$store.commit('setCurrentSongUrl', url);
            this.$store.commit('setCurrentSongCover', coverUrl);
            ipcRenderer.send('music-title', name);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    next() {
      const currentId = this.$store.state.currentSongId;
      const currentIndex = this.$store.state.playList.indexOf(currentId);
      const nextId = this.$store.state.playList[currentIndex + 1];
      const { coverUrl, name } = this.$store.state.listDetail[currentIndex + 1];
      if (nextId) {
        this.playSong(nextId, coverUrl, name);
      } else {
        const info = { type: 'info', message: '播放列表中没歌了 :-(' };
        this.$store.commit('Notification', info);
      }
    },
  },
};
