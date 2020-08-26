<template>
  <div>
    <audio id="audio"
           :src="currentSong"
           @ended="next"
           autoplay></audio>
    <v-speed-dial
      :disabled="!onLine"
      absolute
      v-model="music"
      bottom
      right
      direction="left"
    >
      <template v-slot:activator>
        <v-btn
          v-model="music"
          color="red darken-2"
          dark fab small
        >
          <v-icon v-if="music">mdi-close</v-icon>
          <v-icon v-else>mdi-music-clef-treble</v-icon>
        </v-btn>
      </template>
      <template v-if="login">
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
// eslint-disable-next-line import/named
import { CheckStatus } from '@/api/login';
import { playSong } from '@/api/music';

export default {
  name: 'Music',
  data() {
    return {
      login: false,
      music: false,
      onLine: window.navigator.onLine,
    };
  },
  computed: {
    currentSong() {
      return this.$store.state.currentSongUrl;
    },
    audio() {
      return document.getElementById('audio');
    },
  },
  methods: {
    pause() {
      console.log('暂停');
      this.audio.pause();
    },
    play() {
      console.log('播放');
      this.audio.play();
    },
    playSong(id) {
      return playSong({ id })
        .then((response) => {
          const { url } = response.data.data[0];
          this.$store.commit('setCurrentSongId', id);
          this.$store.commit('setCurrentSongUrl', url);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    next() {
      const currentId = this.$store.state.currentSongId;
      const currentIndex = this.$store.state.playList.indexOf(currentId);
      const nextId = this.$store.state.playList[currentIndex + 1];
      if (nextId) {
        this.playSong(nextId);
      } else {
        const info = { type: 'info', message: '播放列表中没歌了 :-(' };
        this.$store.commit('Notification', info);
      }
    },
  },
  created() {
    CheckStatus()
      .then((response) => {
        // eslint-disable-next-line no-unused-expressions
        response.status === 200 ? this.login = true : null;
      }).catch(() => {
        const info = { type: 'info', message: '您尚未登录' };
        this.$store.commit('Notification', info);
      });
  },
};
</script>

<style scoped>

</style>
