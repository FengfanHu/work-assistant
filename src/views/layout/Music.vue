<template>
  <div>
    <audio id="audio"
           :src="$store.state.music.currentSongUrl"
           @ended="next"
           autoplay></audio>
    <v-speed-dial
      :disabled="!onLine"
      absolute
      v-model="open"
      bottom
      right
      direction="left"
    >
      <template v-slot:activator>
        <v-btn
          v-model="open"
          color="red darken-2"
          dark fab small elevation="2"
        >
          <v-icon v-if="open">mdi-close</v-icon>
          <v-list-item-avatar v-else class="ma-0">
            <!-- 因为需要激活组件才会刷新，所以class哪怕使用:class也需要激活 -->
            <v-img v-show="$store.state.music.currentSongCover"
                   :src="$store.state.music.currentSongCover"
                   class="spin">
            </v-img>
            <v-icon v-show="!$store.state.music.currentSongCover">mdi-music-clef-treble</v-icon>
          </v-list-item-avatar>
        </v-btn>
      </template>
      <template v-if="localStorage.getItem('uid')">
        <v-btn
          fab dark small
          color="red"
          :to="{ name: 'ShowUser' }"
        >
          <v-icon>mdi-account-check</v-icon>
        </v-btn>
        <v-btn
          fab dark small
          color="green"
          v-show="audio.paused"
          @click="play"
        >
          <v-icon>mdi-play</v-icon>
        </v-btn>
        <v-btn
          fab dark small
          color="indigo"
          v-show="!audio.paused"
          @click="pause"
        >
          <v-icon>mdi-pause</v-icon>
        </v-btn>
        <v-btn
          fab dark small
          color="warning"
          @click="next"
        >
          <v-icon>mdi-skip-next</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          fab dark small
          color="green"
          :to="{ name: 'LoginMusic' }"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
    </v-speed-dial>
  </div>
</template>

<script>
import playMethod from '@/views/music/playMethod'

const { ipcRenderer } = window.require('electron')

export default {
  mixins: [playMethod],
  name: 'Music',
  data () {
    return {
      audio: {},
      open: false,
      onLine: window.navigator.onLine,
      localStorage
    }
  },
  methods: {
    pause () {
      console.log('暂停')
      this.audio.pause()
    },
    play () {
      console.log('播放')
      this.audio.play()
    }
  },
  created () {
    if (!this.localStorage.getItem('uid')) {
      const info = { type: 'info', message: '您尚未登录' }
      this.$store.commit('message/Notification', info)
    }
    ipcRenderer.on('music', (event, message) => {
      switch (message) {
        case 'playOrPause':
          // eslint-disable-next-line no-unused-expressions
          this.audio.paused ? this.play() : this.pause()
          break
        case 'next':
          this.next()
          break
        default:
          console.log('ipcRenderer-music receive wrong message')
      }
    })
  },
  // el挂载完成之后 赋值 Audio
  mounted () {
    this.audio = document.getElementById('audio')
  }
}
</script>

<style scoped>
  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  .spin {
    -webkit-animation: spin 10s linear infinite;
    animation: spin 10s linear infinite;
  }
</style>
